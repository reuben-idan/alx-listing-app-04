// Database utility functions that work with both mock and real databases

// Mock data for development
const mockProperties = [
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
  }
  // Add more mock properties as needed
];

// Database interface
export interface Database {
  connect(): Promise<void>;
  getProperties(): Promise<any[]>;
  getPropertyById(id: string): Promise<any | null>;
  getPropertyReviews(propertyId: string): Promise<any[]>;
}

// Mock database implementation for development
class MockDatabase implements Database {
  async connect() {
    console.log('Connected to mock database');
  }

  async getProperties() {
    return mockProperties;
  }

  async getPropertyById(id: string) {
    return mockProperties.find(property => property.id === id) || null;
  }

  async getPropertyReviews(propertyId: string) {
    const property = mockProperties.find(p => p.id === propertyId);
    return property?.reviews || [];
  }
}

// Real database implementation for production
class MongoDatabase implements Database {
  private mongoose: any;

  constructor(mongoose: any) {
    this.mongoose = mongoose;
  }

  async connect() {
    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined');
    }

    if (this.mongoose.connection.readyState === 1) {
      return;
    }

    await this.mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }

  async getProperties() {
    // In a real implementation, this would query the database
    return [];
  }

  async getPropertyById(id: string) {
    // In a real implementation, this would query the database
    return null;
  }

  async getPropertyReviews(propertyId: string) {
    // In a real implementation, this would query the database
    return [];
  }
}

// Create the appropriate database instance based on the environment
let dbInstance: Database = new MockDatabase(); // Default to mock database

// Initialize the database instance
const initDb = async () => {
  if (process.env.NODE_ENV === 'production') {
    try {
      // In production, use MongoDB
      const mongoose = await import('mongoose');
      dbInstance = new MongoDatabase(mongoose);
    } catch (error) {
      console.error('Failed to initialize MongoDB, falling back to mock database');
      // Keep the mock database as fallback
    }
  }
  // In development or if MongoDB fails, use the mock database
  return dbInstance;
};

// Initialize the database immediately
initDb().catch(err => {
  console.error('Failed to initialize database:', err);
  // Continue with mock database even if initialization fails
});

export default dbInstance;
