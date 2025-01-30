import { Restaurant } from '../types';

export const restaurants: Restaurant[] = [
  {
    name: "La Piazza",
    cuisine: "Italian",
    rating: 4.5,
    priceRange: "$$$",
    description: "Authentic Italian cuisine featuring handmade pasta and wood-fired pizzas.",
    imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=400&h=300",
    location: {
      lat: 43.6532,
      lng: -79.3832
    }
  },
  {
    name: "Sakura Garden",
    cuisine: "Japanese",
    rating: 4.7,
    priceRange: "$$$$",
    description: "High-end Japanese restaurant known for its fresh sushi and omakase experience.",
    imageUrl: "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=400&h=300",
    location: {
      lat: 43.6547,
      lng: -79.3847
    }
  },
  {
    name: "The Grill House",
    cuisine: "American",
    rating: 4.3,
    priceRange: "$$",
    description: "Classic American steakhouse with a modern twist.",
    imageUrl: "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=400&h=300",
    location: {
      lat: 43.6512,
      lng: -79.3832
    }
  },
  {
    name: "Spice Route",
    cuisine: "Indian",
    rating: 4.6,
    priceRange: "$$",
    description: "Authentic Indian cuisine with a wide variety of vegetarian options.",
    imageUrl: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=400&h=300",
    location: {
      lat: 43.6552,
      lng: -79.3822
    }
  },
  {
    name: "Le Petit Bistro",
    cuisine: "French",
    rating: 4.8,
    priceRange: "$$$",
    description: "Cozy French bistro serving classic dishes and fine wines.",
    imageUrl: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=400&h=300",
    location: {
      lat: 43.6522,
      lng: -79.3812
    }
  }
];