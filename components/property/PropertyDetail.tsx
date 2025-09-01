import React from 'react';
import { Property } from '../../types/property';
import ReviewSection from './ReviewSection';

interface PropertyDetailProps {
  property: Property;
}

const PropertyDetail: React.FC<PropertyDetailProps> = ({ property }) => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{property.title}</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="bg-gray-200 h-64 rounded-lg mb-4 overflow-hidden">
            <img 
              src={property.imageUrl} 
              alt={property.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">About this property</h2>
            <p className="text-gray-700 mb-4">{property.description}</p>
            
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div>
                <p className="text-gray-500 text-sm">Type</p>
                <p className="font-medium">{property.type}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Bedrooms</p>
                <p className="font-medium">{property.bedrooms}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Bathrooms</p>
                <p className="font-medium">{property.bathrooms}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Price</p>
                <p className="font-medium">${property.price.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <div className="bg-white p-4 rounded-lg shadow mb-6">
            <h2 className="text-xl font-semibold mb-4">Location</h2>
            <p className="text-gray-700">{property.location.address}</p>
            <div className="mt-4 h-48 bg-gray-200 rounded">
              {/* Map would go here */}
              <div className="flex items-center justify-center h-full text-gray-500">
                Map View
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Amenities</h2>
            <div className="grid grid-cols-2 gap-2">
              {property.amenities?.map((amenity, index) => (
                <div key={index} className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Reviews</h2>
        <ReviewSection propertyId={property.id} />
      </div>
    </div>
  );
};

export default PropertyDetail;
