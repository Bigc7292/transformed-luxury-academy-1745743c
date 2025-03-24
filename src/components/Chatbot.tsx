
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { findBestResponse } from '../services/chatbotService';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hi there! I'm your beauty assistant. How can I help you today?", isBot: true }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === '') return;
    
    // Add user message
    const newId = messages.length + 1;
    setMessages([...messages, { id: newId, text: input, isBot: false }]);
    
    const userQuestion = input;
    setInput("");
    
    // Show typing indicator
    setIsTyping(true);
    
    // Process the response based on the user's input
    setTimeout(() => {
      const botResponse = findBestResponse(userQuestion);
      setIsTyping(false);
      setMessages(prev => [...prev, { id: prev.length + 1, text: botResponse, isBot: true }]);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds to simulate typing
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  return (
    <div className="chatbot-container fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-xl w-80 sm:w-96 h-[450px] mb-4 overflow-hidden flex flex-col border border-salon-pink-100"
          >
            <div className="bg-salon-pink-500 text-white p-4 flex justify-between items-center">
              <h3 className="font-medium">Beauty Assistant</h3>
              <button onClick={toggleChat} className="text-white hover:bg-salon-pink-600 rounded-full p-1 transition-colors">
                <X size={18} />
              </button>
            </div>
            
            <div className="flex-grow p-4 overflow-y-auto">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-4 flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.isBot
                        ? 'bg-salon-pink-100 text-gray-800'
                        : 'bg-salon-pink-500 text-white'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="mb-4 flex justify-start">
                  <div className="bg-salon-pink-100 text-gray-800 max-w-[80%] rounded-lg p-3">
                    <div className="flex space-x-1 items-center">
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
            
            <form onSubmit={handleSendMessage} className="border-t border-salon-pink-100 p-3 flex">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-grow border border-salon-pink-200 rounded-l-lg px-3 py-2 focus:outline-none focus:border-salon-pink-300"
              />
              <button
                type="submit"
                className="bg-salon-pink-500 text-white rounded-r-lg px-4 py-2 hover:bg-salon-pink-600 transition-colors"
              >
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleChat}
        className="bg-salon-pink-500 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-salon-pink-600 transition-colors"
      >
        <MessageCircle size={24} />
      </motion.button>
    </div>
  );
};

export default Chatbot;
