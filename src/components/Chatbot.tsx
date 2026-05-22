
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Plus, Phone, Mail, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';
import { findBestResponse, saveChatConversation } from '../services/chatbotService';
import { customerService, CustomerInquiry } from '../services/customerService';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerClose,
} from "@/components/ui/drawer";

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
  const [sessionId, setSessionId] = useState("");
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactForm, setContactForm] = useState<CustomerInquiry>({
    name: '',
    email: '',
    phone: '',
    topic: '',
    message: ''
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Generate a unique session ID if not exists
    if (!sessionId) {
      const storedSessionId = localStorage.getItem('chatSessionId');
      if (storedSessionId) {
        setSessionId(storedSessionId);
      } else {
        const newSessionId = uuidv4();
        setSessionId(newSessionId);
        localStorage.setItem('chatSessionId', newSessionId);
      }
    }
  }, [sessionId]);

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

      // Save the conversation to the database
      if (sessionId) {
        saveChatConversation(userQuestion, botResponse, sessionId);
      }

      // If user mentions contact or form, suggest the contact form
      if (userQuestion.toLowerCase().includes('contact') ||
          userQuestion.toLowerCase().includes('form') ||
          userQuestion.toLowerCase().includes('inquiry') ||
          userQuestion.toLowerCase().includes('get in touch') ||
          userQuestion.toLowerCase().includes('email') ||
          userQuestion.toLowerCase().includes('phone')) {
        setTimeout(() => {
          const contactMessage = "Would you like to fill out our contact form to get in touch with our team directly?";
          setMessages(prev => [...prev, { id: prev.length + 1, text: contactMessage, isBot: true }]);

          // Add a button message to show the form
          setTimeout(() => {
            const buttonMessage = "<button-message>Show Contact Form</button-message>";
            setMessages(prev => [...prev, { id: prev.length + 1, text: buttonMessage, isBot: true }]);

            // Save these messages
            if (sessionId) {
              saveChatConversation("", contactMessage, sessionId);
              saveChatConversation("", "[Contact Form Button Displayed]", sessionId);
            }
          }, 500);
        }, 1000);
      }
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds to simulate typing
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!contactForm.name || !contactForm.email || !contactForm.topic || !contactForm.message) {
      toast({
        title: "Form Incomplete",
        description: "Please fill out all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Add session ID to the inquiry
    const inquiryWithSession = {
      ...contactForm,
      session_id: sessionId
    };

    // Submit the inquiry
    const { success, error } = await customerService.submitInquiry(inquiryWithSession);

    if (success) {
      toast({
        title: "Inquiry Submitted",
        description: "Thank you for your inquiry. We'll get back to you soon!",
      });

      // Add confirmation message to chat
      setMessages(prev => [
        ...prev,
        {
          id: prev.length + 1,
          text: "Thank you for submitting your inquiry. Our team will get back to you soon!",
          isBot: true
        }
      ]);

      // Close the form and reset it
      setShowContactForm(false);
      setContactForm({
        name: '',
        email: '',
        phone: '',
        topic: '',
        message: ''
      });

      // Save this confirmation message
      if (sessionId) {
        saveChatConversation("", "Thank you for submitting your inquiry. Our team will get back to you soon!", sessionId);
      }
    } else {
      toast({
        title: "Submission Failed",
        description: error || "There was an error submitting your inquiry. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, showContactForm]);

  return (
    <div className="chatbot-container fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-xl w-[90vw] max-w-[360px] sm:w-96 h-[70vh] max-h-[500px] mb-4 overflow-hidden flex flex-col border border-gold-100"
          >
            <div className="bg-gold-500 text-white p-4 flex justify-between items-center">
              <h3 className="font-medium">Beauty Assistant</h3>
              <div className="flex items-center space-x-2">
                <Drawer>
                  <DrawerTrigger asChild>
                    <button type="button" className="text-white hover:bg-gold-600 rounded-full p-1 transition-colors" aria-label="Additional options">
                      <Plus size={18} />
                    </button>
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader>
                      <DrawerTitle>Contact Us</DrawerTitle>
                      <DrawerDescription>
                        Fill out this form to get in touch with our team.
                      </DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4">
                      <form onSubmit={handleContactSubmit} className="space-y-4">
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-sm font-medium">Name</label>
                          <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              id="name"
                              name="name"
                              value={contactForm.name}
                              onChange={handleInputChange}
                              className="pl-10"
                              placeholder="Your Name"
                              required
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="email" className="text-sm font-medium">Email</label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={contactForm.email}
                              onChange={handleInputChange}
                              className="pl-10"
                              placeholder="your.email@example.com"
                              required
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="phone" className="text-sm font-medium">Phone (Optional)</label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              id="phone"
                              name="phone"
                              value={contactForm.phone}
                              onChange={handleInputChange}
                              className="pl-10"
                              placeholder="Your Phone Number"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="topic" className="text-sm font-medium">Topic</label>
                          <Input
                            id="topic"
                            name="topic"
                            value={contactForm.topic}
                            onChange={handleInputChange}
                            placeholder="What is your inquiry about?"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="message" className="text-sm font-medium">Message</label>
                          <Textarea
                            id="message"
                            name="message"
                            value={contactForm.message}
                            onChange={handleInputChange}
                            placeholder="Tell us more about your inquiry..."
                            rows={4}
                            required
                          />
                        </div>
                        <div className="flex justify-between">
                          <DrawerClose asChild>
                            <Button variant="outline">Cancel</Button>
                          </DrawerClose>
                          <Button type="submit" className="bg-gold-500 text-white">Submit</Button>
                        </div>
                      </form>
                    </div>
                  </DrawerContent>
                </Drawer>
                <button type="button" onClick={toggleChat} className="text-white hover:bg-gold-600 rounded-full p-1 transition-colors" aria-label="Close chat">
                  <X size={18} />
                </button>
              </div>
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
                        ? 'bg-gold-100 text-gray-800'
                        : 'bg-gold-500 text-white'
                    }`}
                  >
                    {message.text.startsWith('<button-message>') ? (
                      <Button
                        onClick={() => setShowContactForm(true)}
                        className="bg-gold-500 text-white hover:bg-gold-600"
                        size="sm"
                      >
                        {message.text.replace('<button-message>', '').replace('</button-message>', '')}
                      </Button>
                    ) : (
                      message.text
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="mb-4 flex justify-start">
                  <div className="bg-gold-100 text-gray-800 max-w-[80%] rounded-lg p-3">
                    <div className="flex space-x-1 items-center">
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} aria-hidden="true" />
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} aria-hidden="true" />
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} aria-hidden="true" />
                    </div>
                  </div>
                </div>
              )}

              {showContactForm && (
                <div className="mt-4 mb-4 bg-white rounded-lg border border-gold-200 p-4">
                  <h4 className="font-medium text-gold-700 mb-2">Contact Form</h4>
                  <form onSubmit={handleContactSubmit} className="space-y-3">
                    <div>
                      <label htmlFor="chatbot-name" className="text-xs font-medium">Name</label>
                      <Input
                        id="chatbot-name"
                        name="name"
                        value={contactForm.name}
                        onChange={handleInputChange}
                        placeholder="Your Name"
                        size={1}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="chatbot-email" className="text-xs font-medium">Email</label>
                      <Input
                        id="chatbot-email"
                        name="email"
                        type="email"
                        value={contactForm.email}
                        onChange={handleInputChange}
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="chatbot-phone" className="text-xs font-medium">Phone (Optional)</label>
                      <Input
                        id="chatbot-phone"
                        name="phone"
                        value={contactForm.phone}
                        onChange={handleInputChange}
                        placeholder="Your Phone Number"
                      />
                    </div>
                    <div>
                      <label htmlFor="chatbot-topic" className="text-xs font-medium">Topic</label>
                      <Input
                        id="chatbot-topic"
                        name="topic"
                        value={contactForm.topic}
                        onChange={handleInputChange}
                        placeholder="What is your inquiry about?"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="chatbot-message" className="text-xs font-medium">Message</label>
                      <Textarea
                        id="chatbot-message"
                        name="message"
                        value={contactForm.message}
                        onChange={handleInputChange}
                        placeholder="Tell us more about your inquiry..."
                        rows={3}
                        required
                      />
                    </div>
                    <div className="flex justify-between">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setShowContactForm(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        className="bg-gold-500 text-white"
                        size="sm"
                      >
                        Submit
                      </Button>
                    </div>
                  </form>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSendMessage} className="border-t border-gold-100 p-3 flex sticky bottom-0 bg-white">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-grow border border-gold-200 rounded-l-lg px-3 py-3 md:py-2 text-base md:text-sm focus:outline-none focus:border-gold-300"
              />
              <button
                type="submit"
                className="bg-gold-500 text-white rounded-r-lg px-4 py-3 md:py-2 hover:bg-gold-600 transition-colors"
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
        className="bg-gold-500 text-white rounded-full w-12 h-12 md:w-14 md:h-14 flex items-center justify-center shadow-lg hover:bg-gold-600 transition-colors"
      >
        <MessageCircle size={20} className="md:size-[24px]" />
      </motion.button>
    </div>
  );
};

export default Chatbot;
