export interface Review {
  id: string;
  propertyId: string;
  userId: string;
  userName: string;
  userImage?: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt?: string;
}

export interface ReviewApiResponse {
  success: boolean;
  data: Review[];
  message?: string;
}
