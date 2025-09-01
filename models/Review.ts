import mongoose, { Document, Schema } from 'mongoose';

export interface IReview extends Document {
  propertyId: string;
  userId: string;
  userName: string;
  userImage?: string;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt?: Date;
}

const ReviewSchema = new Schema<IReview>(
  {
    propertyId: {
      type: String,
      required: [true, 'Property ID is required'],
      index: true,
    },
    userId: {
      type: String,
      required: [true, 'User ID is required'],
    },
    userName: {
      type: String,
      required: [true, 'User name is required'],
    },
    userImage: {
      type: String,
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot be more than 5'],
    },
    comment: {
      type: String,
      required: [true, 'Comment is required'],
      trim: true,
      minlength: [10, 'Comment must be at least 10 characters long'],
      maxlength: [1000, 'Comment cannot be more than 1000 characters'],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Compound index for faster queries
ReviewSchema.index({ propertyId: 1, createdAt: -1 });

// Prevent duplicate reviews from the same user for the same property
ReviewSchema.index(
  { propertyId: 1, userId: 1 },
  { unique: true, name: 'unique_user_review' }
);

// Create model if it doesn't exist
export default mongoose.models.Review || 
       mongoose.model<IReview>('Review', ReviewSchema);
