import React from 'react';
import { Restaurant } from '../types';
import { List, Map as MapIcon } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapViewProps {
  restaurants: Restaurant[];
  viewMode: 'list' | 'map';
  onViewModeChange: (mode: 'list' | 'map') => void;
}

export const MapView: React.FC<MapViewProps> = ({ restaurants, viewMode, onViewModeChange }) => {
  // Calculate center point from restaurants or default to Toronto
  const center = restaurants.length > 0
    ? [restaurants[0].location.lat, restaurants[0].location.lng]
    : [43.6532, -79.3832];

  return (
    <div className="relative">
      <div className="absolute top-2 right-2 bg-[#2C2D35] rounded-lg overflow-hidden flex z-10">
        <button
          className={`px-4 py-2 flex items-center gap-2 ${
            viewMode === 'list' ? 'bg-[#40414F]' : ''
          }`}
          onClick={() => onViewModeChange('list')}
        >
          <List className="w-4 h-4" />
          <span>List</span>
        </button>
        <button
          className={`px-4 py-2 flex items-center gap-2 ${
            viewMode === 'map' ? 'bg-[#40414F]' : ''
          }`}
          onClick={() => onViewModeChange('map')}
        >
          <MapIcon className="w-4 h-4" />
          <span>Map</span>
        </button>
      </div>
      
      <div className="w-full h-[400px] rounded-lg overflow-hidden">
        <MapContainer
          center={center as [number, number]}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {restaurants.map((restaurant, index) => (
            <Marker
              key={index}
              position={[restaurant.location.lat, restaurant.location.lng]}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-semibold">{restaurant.name}</h3>
                  <p className="text-sm text-gray-600">{restaurant.cuisine} • {restaurant.priceRange}</p>
                  <p className="text-sm text-yellow-600">⭐ {restaurant.rating}/5</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};