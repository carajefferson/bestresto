import React, { useState } from 'react';
import { Message } from '../types';
import { Bot, User } from 'lucide-react';
import { RestaurantCard } from './RestaurantCard';
import { MapView } from './MapView';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const isBot = message.role === 'assistant';

  if (message.isTyping) {
    return (
      <div className="bg-[#444654] py-6">
        <div className="max-w-3xl mx-auto px-4 flex gap-6">
          <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center flex-shrink-0">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // For user messages, just show the content directly
  if (!isBot) {
    return (
      <div className="bg-[#343541] py-6">
        <div className="max-w-3xl mx-auto px-4 flex gap-6">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
            <User className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-gray-100 leading-relaxed whitespace-pre-line">
              {message.content}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Parse the response for bot messages
  let responseData;
  try {
    responseData = JSON.parse(message.content);
  } catch {
    responseData = { text: message.content, restaurants: [] };
  }

  return (
    <div className="bg-[#444654] py-6">
      <div className="max-w-3xl mx-auto px-4 flex gap-6">
        <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center flex-shrink-0">
          <Bot className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <p className="text-gray-100 leading-relaxed whitespace-pre-line mb-4">
            {responseData.text}
          </p>
          
          {responseData.restaurants && responseData.restaurants.length > 0 && (
            <div className="mt-4">
              <MapView
                restaurants={responseData.restaurants}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
              />
              
              {viewMode === 'list' && (
                <div className="mt-4 space-y-4">
                  {responseData.restaurants.map((restaurant, index) => (
                    <RestaurantCard key={index} restaurant={restaurant} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};