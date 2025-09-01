interface Review {
  id: string;
  comment: string;
  rating: number;
  userId: string;
  createdAt: string;
}

interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  type: string;
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  amenities: string[];
  location: {
    address: string;
    city: string;
    country: string;
    coordinates: [number, number];
  };
  reviews: Review[];
  host: {
    id: string;
    name: string;
    avatar: string;
    isSuperhost: boolean;
  };
  availableFrom: string;
  availableTo: string;
  createdAt: string;
  updatedAt: string;
}

export type { Property, Review };
