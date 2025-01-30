export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  isTyping?: boolean;
}

export interface Restaurant {
  name: string;
  cuisine: string;
  rating: number;
  priceRange: string;
  description: string;
  imageUrl: string;
  location: {
    lat: number;
    lng: number;
  };
}

export interface RestaurantResponse {
  text: string;
  restaurants: Restaurant[];
}