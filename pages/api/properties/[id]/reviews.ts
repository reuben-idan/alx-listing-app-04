import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/db';
import Review, { IReview } from '@/models/Review';
import { ReviewApiResponse } from '@/types/review';

// Type guard to check if a value is a valid IReview
export function isIReview(review: any): review is IReview {
  return (
    review &&
    typeof review.propertyId === 'string' &&
    typeof review.userId === 'string' &&
    typeof review.userName === 'string' &&
    typeof review.rating === 'number' &&
    typeof review.comment === 'string' &&
    review.createdAt instanceof Date
  );
}

// Helper to convert MongoDB document to plain object
const toPlainObject = (doc: any) => {
  if (!doc) return null;
  if (Array.isArray(doc)) {
    return doc.map(d => toPlainObject(d));
  }
  return JSON.parse(JSON.stringify(doc));
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ReviewApiResponse | { message: string }>
) {
  const { id: propertyId } = req.query;

  // Connect to database
  try {
    await dbConnect();
  } catch (error) {
    console.error('Database connection error:', error);
    return res.status(500).json({
      success: false,
      message: 'Database connection error',
      data: []
    });
  }

  // Handle GET request
  if (req.method === 'GET') {
    if (!propertyId) {
      return res.status(400).json({ 
        success: false,
        message: 'Property ID is required',
        data: []
      });
    }

    try {
      const reviews = await Review.find({ 
        propertyId: Array.isArray(propertyId) ? propertyId[0] : propertyId 
      })
      .sort({ createdAt: -1 }) // Most recent first
      .lean()
      .exec();

      return res.status(200).json({
        success: true,
        data: reviews as unknown as IReview[],
      });
    } catch (error) {
      console.error('Error fetching reviews:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch reviews',
        data: []
      });
    }
  }
  
  // Handle POST request
  if (req.method === 'POST') {
    const { userId, userName, userImage, rating, comment } = req.body;
    const id = Array.isArray(propertyId) ? propertyId[0] : propertyId;

    // Input validation
    if (!id || !userId || !userName || rating === undefined || !comment) {
      return res.status(400).json({ 
        success: false,
        message: 'Missing required fields',
        data: []
      });
    }

    try {
      // Check for existing review from this user for this property
      const existingReview = await Review.findOne({ propertyId: id, userId });
      
      if (existingReview) {
        return res.status(400).json({
          success: false,
          message: 'You have already reviewed this property',
          data: []
        });
      }

      // Create new review
      const reviewData = {
        propertyId: id,
        userId,
        userName,
        ...(userImage && { userImage }),
        rating: Number(rating),
        comment,
      };

      const review = new Review(reviewData);
      const savedReview = await review.save();

      // Get the updated list of reviews
      const reviews = await Review.find({ propertyId: id })
        .sort({ createdAt: -1 })
        .lean()
        .exec();

      return res.status(201).json({
        success: true,
        data: [toPlainObject(savedReview), ...reviews] as unknown as IReview[],
        message: 'Review submitted successfully'
      });
    } catch (error: any) {
      console.error('Error creating review:', error);
      
      // Handle validation errors
      if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map((e: any) => e.message);
        return res.status(400).json({
          success: false,
          message: `Validation error: ${messages.join(', ')}`,
          data: []
        });
      }

      // Handle duplicate key error
      if (error.code === 11000) {
        return res.status(400).json({
          success: false,
          message: 'You have already reviewed this property',
          data: []
        });
      }

      return res.status(500).json({
        success: false,
        message: 'Failed to create review',
        data: []
      });
    }
  }

  // Handle unsupported HTTP methods
  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).json({ 
    success: false,
    message: `Method ${req.method} not allowed`,
    data: []
  });
}
