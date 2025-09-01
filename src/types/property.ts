export interface Property {
  id: string;
  title: string;
  description: string;
  address: string;
  price: number;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  type: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  amenities: string[];
  featured?: boolean;
}
