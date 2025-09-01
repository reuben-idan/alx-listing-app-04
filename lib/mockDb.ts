// Mock database implementation for development

// Mock data
const properties: any[] = [
  {
    id: '1',
    title: 'Modern Apartment in Downtown',
    description: 'A beautiful modern apartment in the heart of the city.',
    price: 120,
    imageUrl: '/images/property1.jpg',
    images: ['/images/property1-1.jpg', '/images/property1-2.jpg'],
    rating: 4.8,
    reviewCount: 124,
    type: 'Apartment',
    bedrooms: 2,
    bathrooms: 1,
    maxGuests: 4,
    location: {
      address: '123 Main St',
      city: 'New York',
      country: 'USA',
      coordinates: [40.7128, -74.0060]
    },
    amenities: ['Wifi', 'Kitchen', 'Washer', 'TV', 'Air conditioning'],
    host: {
      id: 'host1',
      name: 'John Doe',
      avatar: '/images/avatar1.jpg',
      isSuperhost: true
    },
    reviews: [
      {
        id: 'rev1',
        userId: 'user1',
        userName: 'Jane Smith',
        userAvatar: '/images/avatar2.jpg',
        rating: 5,
        comment: 'Great place to stay!',
        date: '2023-05-15',
        createdAt: '2023-05-15T10:00:00Z'
      }
    ],
    availableFrom: '2023-06-01',
    availableTo: '2023-12-31',
    featured: true,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-04-01T00:00:00Z'
  },
  // Add more mock properties as needed
];

// Mock database methods
const db = {
  async connect() {
    console.log('Connected to mock database');
    return { connection: { readyState: 1 } };
  },

  async disconnect() {
    console.log('Disconnected from mock database');
  },

  // Property methods
  async getProperties() {
    return properties;
  },

  async getPropertyById(id: string) {
    return properties.find(property => property.id === id) || null;
  },

  async getPropertyReviews(propertyId: string) {
    const property = properties.find(p => p.id === propertyId);
    return property ? property.reviews || [] : [];
  },

  // Add more methods as needed
};

export default db;
