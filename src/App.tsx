import React, { useState } from 'react';
import { Message } from './types';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { SuggestedActions } from './components/SuggestedActions';
import { generateResponse } from './utils/chatbot';

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: JSON.stringify({
        text: "Hello! I'm your restaurant recommendation assistant. I can help you discover great places to eat based on cuisine, price range, or specific preferences. How can I assist you today?",
        restaurants: []
      }),
      role: 'assistant',
      timestamp: new Date(),
    },
  ]);

  const handleSendMessage = (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content: content,
      role: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);

    // Show typing indicator
    const typingMessage: Message = {
      id: 'typing',
      content: '',
      role: 'assistant',
      timestamp: new Date(),
      isTyping: true,
    };
    
    setMessages(prev => [...prev, typingMessage]);

    // Generate and add bot response
    setTimeout(() => {
      setMessages(prev => prev.filter(msg => msg.id !== 'typing'));
      const response = generateResponse(content);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: JSON.stringify(response),
        role: 'assistant',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1500);
  };

  const showSuggestedActions = messages.length === 1;

  return (
    <div className="min-h-screen bg-[#343541] flex flex-col text-gray-100 overflow-hidden">
      <header className="bg-[#202123] border-b border-gray-600/50">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <h1 className="text-xl font-semibold">Restaurant Recommendation Assistant</h1>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto pb-40">
        {messages.map(message => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {showSuggestedActions && <SuggestedActions onActionClick={handleSendMessage} />}
      </div>

      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
}

export default App;