import React from 'react';
import Image from 'next/image';
import { StarIcon, MapPinIcon, HomeModernIcon, UserIcon, HeartIcon } from '@heroicons/react/24/solid';
import { Property } from '../../types/property';
import { cn, formatPrice, getRatingColor } from '../../lib/utils';

interface PropertyCardProps {
  property: Property & { featured?: boolean; isFavorite?: boolean };
  onClick?: () => void;
  className?: string;
  isFavorite?: boolean;
  onFavoriteToggle?: (id: string) => void;
}

export default function PropertyCard({
  property,
  onClick,
  className = '',
  isFavorite = false,
  onFavoriteToggle,
}: PropertyCardProps) {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFavoriteToggle?.(property.id);
  };

  return (
    <div
      className={cn(
        'group bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer border border-gray-100',
        className
      )}
      onClick={onClick}
    >
      <div className="relative h-64 w-full">
        <Image
          src={property.images?.[0] || property.imageUrl || '/placeholder-property.jpg'}
          alt={property.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
        />
        
        {/* Image overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
        
        {/* Favorite button */}
        <button
          type="button"
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 p-2 bg-white/90 rounded-full shadow-md hover:bg-white transition-colors"
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <HeartIcon
            className={`h-5 w-5 ${isFavorite ? 'text-red-500 fill-current' : 'text-gray-400'}`}
          />
        </button>
        
        {/* Price badge */}
        <div className="absolute bottom-0 left-0 p-4 w-full">
          <div className="flex justify-between items-end">
            <h3 className="text-xl font-bold text-white drop-shadow-md line-clamp-1">
              {property.title}
            </h3>
            <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg shadow-sm">
              <p className="text-lg font-bold text-gray-900">
                {formatPrice(property.price)}
                <span className="text-sm font-normal text-gray-500">/night</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        {/* Location */}
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <MapPinIcon className="h-4 w-4 mr-1.5 flex-shrink-0" />
          <span className="truncate">{property.location.city}, {property.location.country}</span>
        </div>
        
        {/* Property details */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <div className="flex items-center">
            <HomeModernIcon className="h-4 w-4 mr-1.5 flex-shrink-0" />
            <span className="capitalize">{property.type}</span>
          </div>
          <div className="flex items-center">
            <UserIcon className="h-4 w-4 mr-1.5 flex-shrink-0" />
            <span>{property.maxGuests} {property.maxGuests === 1 ? 'guest' : 'guests'}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          {/* Rating */}
          <div className="flex items-center">
            <div className={cn(
              "flex items-center px-2 py-1 rounded-full",
              getRatingColor(property.rating),
              Number(property.rating) >= 4.5 ? 'bg-green-50' : 'bg-blue-50'
            )}>
              <StarIcon className="h-4 w-4 fill-current mr-1" />
              <span className="text-sm font-medium">
                {property.rating?.toFixed?.(1) || 'N/A'}
              </span>
            </div>
            <span className="mx-2 text-gray-300">•</span>
            <span className="text-sm text-gray-500">
              {property.reviewCount || 0} {property.reviewCount === 1 ? 'review' : 'reviews'}
            </span>
          </div>
          
          {/* Beds & Baths */}
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span>{property.bedrooms} {property.bedrooms === 1 ? 'bed' : 'beds'}</span>
            <span>•</span>
            <span>{property.bathrooms} {property.bathrooms === 1 ? 'bath' : 'baths'}</span>
          </div>
        </div>
        
        {/* Amenities */}
        {property.amenities && property.amenities.length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="flex flex-wrap gap-2">
              {property.amenities.slice(0, 3).map((amenity, index) => (
                <span 
                  key={index}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                >
                  {amenity}
                </span>
              ))}
              {property.amenities.length > 3 && (
                <span className="text-xs text-gray-500 self-center">
                  +{property.amenities.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
