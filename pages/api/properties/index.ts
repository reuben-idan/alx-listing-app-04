import { NextApiRequest, NextApiResponse } from 'next';
import { Property } from '@/types/property';

// Mock data - in a real app, this would come from a database
const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Modern Apartment in Downtown',
    description: 'Beautiful modern apartment located in the heart of the city. Perfect for couples or solo travelers.',
    price: 120,
    imageUrl: 'https://images.unsplash.com/photo-1494526585095-c41746248156?ixlib=rb-4.0.3',
    rating: 4.8,
    reviewCount: 124,
    type: 'apartment',
    bedrooms: 2,
    bathrooms: 1,
    maxGuests: 4,
    amenities: ['Wifi', 'Kitchen', 'Washer', 'Air conditioning', 'TV'],
    location: {
      address: '123 Main St',
      city: 'New York',
      country: 'USA',
      coordinates: [40.7128, -74.0060]
    },
    reviews: [],
    host: {
      id: 'host1',
      name: 'John Doe',
      avatar: '',
      isSuperhost: true
    },
    availableFrom: '2023-06-01',
    availableTo: '2023-12-31',
    createdAt: '2023-01-15T10:00:00Z',
    updatedAt: '2023-01-15T10:00:00Z'
  },
  // Add more mock properties as needed
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { search, minPrice, maxPrice, propertyType, bedrooms } = req.query;
  
  try {
    let filteredProperties = [...mockProperties];

    // Apply filters
    if (search) {
      const searchTerm = search.toString().toLowerCase();
      filteredProperties = filteredProperties.filter(
        (property) =>
          property.title.toLowerCase().includes(searchTerm) ||
          property.description.toLowerCase().includes(searchTerm) ||
          property.location.city.toLowerCase().includes(searchTerm) ||
          property.location.country.toLowerCase().includes(searchTerm)
      );
    }

    if (minPrice) {
      const min = Number(minPrice);
      filteredProperties = filteredProperties.filter((property) => property.price >= min);
    }

    if (maxPrice) {
      const max = Number(maxPrice);
      filteredProperties = filteredProperties.filter((property) => property.price <= max);
    }

    if (propertyType) {
      filteredProperties = filteredProperties.filter(
        (property) => property.type === propertyType.toString().toLowerCase()
      );
    }

    if (bedrooms) {
      const minBedrooms = Number(bedrooms);
      filteredProperties = filteredProperties.filter(
        (property) => property.bedrooms >= minBedrooms
      );
    }

    res.status(200).json(filteredProperties);
  } catch (error) {
    console.error('Error fetching properties:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
