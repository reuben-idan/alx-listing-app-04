import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../../lib/db';
import { Review, ReviewApiResponse } from '../../../../types/review';

// Type guard to check if a value is a valid Review
function isReview(review: any): review is Review {
  return (
    review &&
    typeof review.id === 'string' &&
    typeof review.propertyId === 'string' &&
    typeof review.userId === 'string' &&
    typeof review.userName === 'string' &&
    typeof review.rating === 'number' &&
    typeof review.comment === 'string' &&
    (typeof review.createdAt === 'string' || review.createdAt instanceof Date)
  );
}

// Helper to convert date to string if it's a Date object
const formatDate = (date: string | Date): string => {
  return date instanceof Date ? date.toISOString() : date;
};

// Helper to convert review data to Review type
const toReview = (data: any): Review | null => {
  if (!isReview(data)) return null;
  return {
    id: data.id,
    propertyId: data.propertyId,
    userId: data.userId,
    userName: data.userName,
    userImage: data.userImage,
    rating: data.rating,
    comment: data.comment,
    createdAt: formatDate(data.createdAt),
    updatedAt: data.updatedAt ? formatDate(data.updatedAt) : undefined
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ReviewApiResponse | { message: string }>
) {
  const { id: propertyId } = req.query as { id: string };

  if (!propertyId) {
    return res.status(400).json({
      success: false,
      message: 'Property ID is required'
    });
  }

  if (req.method === 'GET') {
    try {
      // Get reviews for the property
      const reviews = await db.getPropertyReviews(propertyId);
      
      // Convert to Review type and filter out invalid reviews
      const validReviews = reviews
        .map(toReview)
        .filter((review): review is Review => review !== null);

      return res.status(200).json({
        success: true,
        data: validReviews
      });
    } catch (error) {
      console.error('Error fetching reviews:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch reviews'
      });
    }
  } 
  
  if (req.method === 'POST') {
    try {
      const { userId, userName, userImage, rating, comment } = req.body;
      
      if (!userId || !userName || typeof rating !== 'number' || !comment) {
        return res.status(400).json({
          success: false,
          message: 'Missing required fields'
        });
      }

      const newReview = {
        id: Date.now().toString(),
        propertyId,
        userId,
        userName,
        userImage,
        rating,
        comment,
        createdAt: new Date().toISOString()
      };

      // In a real implementation, this would save to the database
      // For now, we'll just return the new review
      const createdReview = toReview(newReview);
      
      if (!createdReview) {
        throw new Error('Failed to create review');
      }

      return res.status(201).json({
        success: true,
        data: [createdReview]
      });
    } catch (error) {
      console.error('Error creating review:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to create review'
      });
    }
  }

  // Method not allowed
  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).json({ 
    success: false,
    message: `Method ${req.method} not allowed` 
  });
}
