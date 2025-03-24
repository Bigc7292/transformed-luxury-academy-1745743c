
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
    setInput("");
    
    // Simulate bot response
    setTimeout(() => {
      const botResponses = [
        "I'd be happy to help you with that! Our aesthetic treatments are designed to enhance your natural beauty.",
        "That's a great question about our services. Would you like me to book you a consultation with one of our experts?",
        "We offer a wide range of treatments including lip fillers, botox, and dermal fillers. Which one are you interested in?",
        "Our treatments are performed by certified professionals with years of experience in aesthetic medicine.",
        "Would you like to know more about pricing or schedule a consultation?",
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      setMessages(prev => [...prev, { id: prev.length + 1, text: randomResponse, isBot: true }]);
    }, 1000);
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="chatbot-container">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-xl w-80 sm:w-96 h-96 mb-4 overflow-hidden flex flex-col border border-salon-pink-100"
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
