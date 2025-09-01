import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Property } from '../types/property';
import MainLayout from '../components/layout/MainLayout';
import PropertyGrid from '../components/property/PropertyGrid';
import { MagnifyingGlassIcon, FunnelIcon, MapPinIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/20/solid';
import { cn } from '../lib/utils';

// Define filter options
const propertyTypes = [
  { value: '', label: 'All Types' },
  { value: 'apartment', label: 'Apartment' },
  { value: 'house', label: 'House' },
  { value: 'villa', label: 'Villa' },
  { value: 'cabin', label: 'Cabin' },
];

const Home: React.FC = () => {
  const router = useRouter();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    propertyType: '',
    bedrooms: '',
    minRating: '',
  });
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // Fetch properties based on filters and search query
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        
        // Add search query if exists
        if (searchQuery) params.append('search', searchQuery);
        
        // Add filters if they exist
        Object.entries(filters).forEach(([key, value]) => {
          if (value) params.append(key, value);
        });
        
        const response = await axios.get<Property[]>(
          `/api/properties?${params.toString()}`
        );
        
        setProperties(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching properties:', err);
        setError('Failed to load properties. Please try again later.');
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      fetchProperties();
    }, 300); // Debounce the API call

    return () => clearTimeout(timeoutId);
  }, [searchQuery, filters, router.query]);

  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The useEffect will handle the actual search when searchQuery or filters change
  };

  // Handle filter changes
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // Toggle favorite status
  const handleFavoriteToggle = (propertyId: string, isFavorite: boolean) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (isFavorite) {
        newFavorites.add(propertyId);
      } else {
        newFavorites.delete(propertyId);
      }
      return newFavorites;
    });
  };

  // Navigate to property details
  const handlePropertyClick = (property: Property) => {
    router.push(`/property/${property.id}`);
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      minPrice: '',
      maxPrice: '',
      propertyType: '',
      bedrooms: '',
      minRating: '',
    });
    setSearchQuery('');
  };

  // Check if any filters are active
  const hasActiveFilters = Object.values(filters).some(value => value !== '') || searchQuery !== '';

  return (
    <MainLayout 
      title="Find Your Perfect Stay | ALX Stays"
      description="Discover and book unique accommodations around the world. Find the perfect place to stay for your next adventure."
    >
      {/* Hero Section with Search */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Find your perfect stay</h1>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Discover and book unique accommodations around the world
          </p>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPinIcon className="h-5 w-5 text-blue-300" />
              </div>
              <input
                type="text"
                placeholder="Search by location, property, or host"
                className="block w-full pl-10 pr-12 py-4 border-0 rounded-lg bg-white/10 text-white placeholder-blue-200 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 transition-colors"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  backdropFilter: 'blur(4px)',
                  WebkitBackdropFilter: 'blur(4px)',
                }}
              />
              <button
                type="submit"
                className="absolute inset-y-0 right-0 px-6 flex items-center bg-white text-blue-700 font-medium rounded-r-lg hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <MagnifyingGlassIcon className="h-5 w-5 mr-2" />
                <span>Search</span>
              </button>
            </div>
          </form>
          
          <button
            type="button"
            className="mt-4 inline-flex items-center text-sm font-medium text-white hover:text-blue-100 transition-colors"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FunnelIcon className="h-4 w-4 mr-1" />
            {showFilters ? 'Hide filters' : 'Show filters'}
          </button>
        </div>
      </section>

      {/* Filters Section */}
      {showFilters && (
        <section className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h2 className="text-sm font-medium text-gray-900">Filters</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 w-full md:w-auto">
                {/* Property Type */}
                <div>
                  <label htmlFor="propertyType" className="sr-only">Property Type</label>
                  <select
                    id="propertyType"
                    name="propertyType"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                    value={filters.propertyType}
                    onChange={handleFilterChange}
                  >
                    {propertyTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Min Price */}
                <div>
                  <label htmlFor="minPrice" className="sr-only">Min Price</label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      name="minPrice"
                      id="minPrice"
                      className="block w-full rounded-md border-gray-300 pl-7 pr-3 focus:border-blue-500 focus:ring-blue-500 text-sm"
                      placeholder="Min price"
                      value={filters.minPrice}
                      onChange={handleFilterChange}
                    />
                  </div>
                </div>

                {/* Max Price */}
                <div>
                  <label htmlFor="maxPrice" className="sr-only">Max Price</label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      name="maxPrice"
                      id="maxPrice"
                      className="block w-full rounded-md border-gray-300 pl-7 pr-3 focus:border-blue-500 focus:ring-blue-500 text-sm"
                      placeholder="Max price"
                      value={filters.maxPrice}
                      onChange={handleFilterChange}
                    />
                  </div>
                </div>

                {/* Bedrooms */}
                <div>
                  <label htmlFor="bedrooms" className="sr-only">Bedrooms</label>
                  <select
                    id="bedrooms"
                    name="bedrooms"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                    value={filters.bedrooms}
                    onChange={handleFilterChange}
                  >
                    <option value="">Any bedrooms</option>
                    <option value="1">1+ bedroom</option>
                    <option value="2">2+ bedrooms</option>
                    <option value="3">3+ bedrooms</option>
                    <option value="4">4+ bedrooms</option>
                    <option value="5">5+ bedrooms</option>
                  </select>
                </div>

                {/* Rating */}
                <div>
                  <label htmlFor="minRating" className="sr-only">Rating</label>
                  <div className="flex items-center">
                    <select
                      id="minRating"
                      name="minRating"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                      value={filters.minRating}
                      onChange={handleFilterChange}
                    >
                      <option value="">Any rating</option>
                      <option value="4.5">4.5+ stars</option>
                      <option value="4">4+ stars</option>
                      <option value="3">3+ stars</option>
                    </select>
                    {filters.minRating && (
                      <div className="ml-2 flex items-center">
                        <StarIcon className="h-4 w-4 text-yellow-400" />
                        <span className="text-xs text-gray-600 ml-1">+</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
                >
                  <XMarkIcon className="h-4 w-4 mr-1" />
                  Clear all
                </button>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          {/* Active Filters */}
          {hasActiveFilters && (
            <div className="mb-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-gray-500">Filters:</span>
                {searchQuery && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {searchQuery}
                    <button
                      type="button"
                      className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full bg-blue-200 text-blue-800 hover:bg-blue-300 focus:outline-none"
                      onClick={() => setSearchQuery('')}
                    >
                      <span className="sr-only">Remove filter</span>
                      <XMarkIcon className="h-3 w-3" />
                    </button>
                  </span>
                )}
                
                {Object.entries(filters).map(([key, value]) => {
                  if (!value) return null;
                  
                  let displayValue = value;
                  if (key === 'propertyType') {
                    displayValue = propertyTypes.find(t => t.value === value)?.label || value;
                  } else if (key === 'minRating') {
                    displayValue = `${value}+ stars`;
                  } else if (key === 'bedrooms') {
                    displayValue = `${value}+ ${value === '1' ? 'bedroom' : 'bedrooms'}`;
                  } else if (key === 'minPrice' || key === 'maxPrice') {
                    displayValue = `$${value}`;
                  }
                  
                  return (
                    <span 
                      key={key}
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                    >
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).trim()}: {displayValue}
                      <button
                        type="button"
                        className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 focus:outline-none"
                        onClick={() => {
                          setFilters(prev => ({
                            ...prev,
                            [key]: ''
                          }));
                        }}
                      >
                        <span className="sr-only">Remove filter</span>
                        <XMarkIcon className="h-3 w-3" />
                      </button>
                    </span>
                  );
                })}
              </div>
            </div>
          )}
          
          {/* Property Grid */}
          <div className="mb-8">
            <PropertyGrid
              properties={properties}
              loading={loading}
              error={error}
              onPropertyClick={handlePropertyClick}
              onFavoriteToggle={handleFavoriteToggle}
              favorites={favorites}
            />
          </div>
          
          {/* Empty State - Show when no filters are applied and no properties exist */}
          {!loading && properties.length === 0 && !hasActiveFilters && (
            <div className="text-center py-12">
              <div className="mx-auto h-24 w-24 text-gray-400">
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-full h-full"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h3 className="mt-2 text-lg font-medium text-gray-900">No properties available</h3>
              <p className="mt-1 text-sm text-gray-500">
                There are currently no properties listed. Please check back later.
              </p>
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  );
};

export default Home;
