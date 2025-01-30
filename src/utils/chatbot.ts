import { restaurants } from '../data/restaurants';
import { RestaurantResponse } from '../types';

export const generateResponse = (message: string): RestaurantResponse => {
  const lowercaseMessage = message.toLowerCase();
  
  // Handle restaurant recommendations
  if (lowercaseMessage.includes('recommend') || lowercaseMessage.includes('suggestion') || 
      lowercaseMessage.includes('near me') || lowercaseMessage.includes('find')) {
    const randomRestaurants = [...restaurants]
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    
    return {
      text: "I'd be happy to recommend some excellent restaurants for you! Here are some top picks in the area:",
      restaurants: randomRestaurants
    };
  }
  
  // Handle cuisine inquiries
  if (lowercaseMessage.includes('cuisine') || lowercaseMessage.includes('food')) {
    const cuisines = [...new Set(restaurants.map(r => r.cuisine))];
    const cuisineRestaurants = restaurants.slice(0, 3);
    
    return {
      text: `I can help you explore various cuisines! Here are some popular restaurants featuring different cuisines:\n\nAvailable cuisines:\n${
        cuisines.map(cuisine => `• ${cuisine}`).join('\n')
      }`,
      restaurants: cuisineRestaurants
    };
  }
  
  // Handle price range inquiries
  if (lowercaseMessage.includes('price') || lowercaseMessage.includes('expensive') || 
      lowercaseMessage.includes('cheap') || lowercaseMessage.includes('cost')) {
    const priceRangeRestaurants = restaurants
      .sort((a, b) => a.priceRange.length - b.priceRange.length)
      .slice(0, 3);
    
    return {
      text: `Let me break down the price ranges and show you some options:\n\n` +
           `💰 $ - Budget-friendly (Under $15 per person)\n` +
           `💰💰 $$ - Moderate ($15-$30 per person)\n` +
           `💰💰💰 $$$ - Upscale ($31-$60 per person)\n` +
           `💰💰💰💰 $$$$ - Fine dining ($61+ per person)`,
      restaurants: priceRangeRestaurants
    };
  }
  
  // Handle rating inquiries
  if (lowercaseMessage.includes('rating') || lowercaseMessage.includes('best') || 
      lowercaseMessage.includes('top')) {
    const topRated = [...restaurants]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 3);
    
    return {
      text: "Here are our highest-rated restaurants in the area:",
      restaurants: topRated
    };
  }
  
  // Handle vague or unrecognized queries
  return {
    text: `I'm here to help you find the perfect restaurant! I can assist with:\n\n` +
         `• Personalized restaurant recommendations\n` +
         `• Information about specific cuisines\n` +
         `• Price range guidance\n` +
         `• Top-rated restaurants\n\n` +
         `What would you like to know more about?`,
    restaurants: restaurants.slice(0, 3)
  };
};