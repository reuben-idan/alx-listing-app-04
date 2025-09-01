export interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  image: string;
  rating: number;
  reviewCount: number;
  type: string;
  beds: number;
  baths: number;
  area: number;
  featured?: boolean;
}
