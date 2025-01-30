import React, { useState } from 'react';
import { Send, Mic, MicOff, Loader2 } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const startListening = async () => {
    try {
      const recognition = new (window.webkitSpeechRecognition || window.SpeechRecognition)();
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (error) {
      console.error('Speech recognition not supported:', error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      setIsProcessing(true);
      onSendMessage(input);
      setInput('');
      setTimeout(() => setIsProcessing(false), 1500);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 w-full border-t border-gray-600/50 bg-[#343541] py-4">
      <div className="max-w-3xl mx-auto px-4 relative">
        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Message the restaurant assistant..."
            className="w-full rounded-xl border border-gray-600/50 px-4 py-3 bg-[#40414F] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent min-h-[44px] pr-20"
            disabled={isProcessing}
          />
          <div className="absolute right-2 bottom-1.5 flex items-center gap-1">
            <button
              type="button"
              onClick={startListening}
              disabled={isListening || isProcessing}
              className="p-1.5 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-600/50"
            >
              {isListening ? (
                <MicOff className="w-5 h-5 text-red-500" />
              ) : (
                <Mic className="w-5 h-5" />
              )}
            </button>
            <button
              type="submit"
              disabled={!input.trim() || isProcessing}
              className="p-1.5 text-gray-400 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-lg hover:bg-gray-600/50"
            >
              {isProcessing ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </div>
        </form>
        <div className="mt-2 text-xs text-center text-gray-500">
          The assistant can help you find restaurants, explore cuisines, and get recommendations.
        </div>
      </div>
    </div>
  );
};