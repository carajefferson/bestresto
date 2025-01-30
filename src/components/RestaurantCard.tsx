import React, { useState } from 'react';
import { Restaurant } from '../types';
import { Navigation, Globe, Phone, Image } from 'lucide-react';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="bg-[#2C2D35] rounded-lg overflow-hidden mb-4">
      <div className="flex">
        <div className="w-48 h-48 flex-shrink-0 bg-[#40414F] relative">
          {!imageError ? (
            <img 
              src={restaurant.imageUrl} 
              alt={restaurant.name}
              className="w-full h-full object-cover"
              onError={handleImageError}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Image className="w-8 h-8 text-gray-400" />
            </div>
          )}
        </div>
        <div className="flex-1 p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold">{restaurant.name}</h3>
              <p className="text-green-400 text-sm">
                Open now • {restaurant.cuisine} • {restaurant.priceRange}
              </p>
            </div>
            <div className="text-right">
              <div className="text-yellow-400 font-semibold">
                ⭐ {restaurant.rating}/5
              </div>
            </div>
          </div>
          
          <p className="text-gray-300 my-2">{restaurant.description}</p>
          
          <div className="flex gap-2 mt-4">
            <button className="flex items-center gap-1 px-3 py-1 rounded bg-[#40414F] hover:bg-[#4A4B5A] transition-colors">
              <Navigation className="w-4 h-4" />
              <span>Directions</span>
            </button>
            <button className="flex items-center gap-1 px-3 py-1 rounded bg-[#40414F] hover:bg-[#4A4B5A] transition-colors">
              <Globe className="w-4 h-4" />
              <span>Website</span>
            </button>
            <button className="flex items-center gap-1 px-3 py-1 rounded bg-[#40414F] hover:bg-[#4A4B5A] transition-colors">
              <Phone className="w-4 h-4" />
              <span>Call</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};