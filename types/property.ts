export interface Location {
  address: string;
  city: string;
  country: string;
  coordinates: [number, number];
}

export interface Host {
  id: string;
  name: string;
  avatar: string;
  isSuperhost: boolean;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
  createdAt: string;
  user: {
    name: string;
    avatar: string;
  };
}

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  images?: string[];
  rating: number;
  reviewCount: number;
  type: string;
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  location: Location;
  amenities: string[];
  host: Host;
  reviews: Review[];
  availableFrom: string;
  availableTo: string;
  featured?: boolean;
  createdAt: string;
  updatedAt: string;
}
