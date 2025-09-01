import Image from 'next/image';
import { StarIcon } from '@heroicons/react/24/solid';
import { Property } from '@/types/property';

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 w-full">
        <Image
          src={property.image}
          alt={property.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
        />
        {property.featured && (
          <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">
            Featured
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-900">{property.title}</h3>
          <p className="text-lg font-bold text-blue-600">${property.price}<span className="text-sm font-normal text-gray-500">/night</span></p>
        </div>
        
        <p className="text-gray-600 text-sm mt-1">{property.location}</p>
        
        <div className="flex items-center mt-2">
          <div className="flex items-center">
            <StarIcon className="h-5 w-5 text-yellow-400" />
            <span className="ml-1 text-sm font-medium text-gray-900">
              {property.rating}
            </span>
            <span className="mx-1 text-gray-300">•</span>
            <span className="text-sm text-gray-500">
              {property.reviewCount} reviews
            </span>
          </div>
        </div>
        
        <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between text-sm text-gray-500">
          <span>{property.type}</span>
          <span>{property.beds} beds</span>
          <span>{property.baths} baths</span>
          <span>{property.area} m²</span>
        </div>
      </div>
    </div>
  );
}
