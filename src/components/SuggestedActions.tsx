import React from 'react';
import { Search, DollarSign, UtensilsCrossed, Star } from 'lucide-react';

interface SuggestedActionsProps {
  onActionClick: (message: string) => void;
}

export const SuggestedActions: React.FC<SuggestedActionsProps> = ({ onActionClick }) => {
  const actions = [
    {
      icon: <Search className="w-4 h-4" />,
      text: "Find restaurants near me",
      query: "Can you recommend some restaurants?",
    },
    {
      icon: <DollarSign className="w-4 h-4" />,
      text: "Browse by price range",
      query: "What are the different price ranges available?",
    },
    {
      icon: <UtensilsCrossed className="w-4 h-4" />,
      text: "Explore cuisines",
      query: "What cuisines are available?",
    },
    {
      icon: <Star className="w-4 h-4" />,
      text: "Top-rated restaurants",
      query: "Show me the highest-rated restaurants",
    },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={() => onActionClick(action.query)}
            className="flex items-center gap-3 p-4 rounded-lg bg-[#40414F] hover:bg-[#4A4B5A] transition-colors text-left"
          >
            <div className="p-2 rounded-lg bg-gray-600/50">
              {action.icon}
            </div>
            <span>{action.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
};