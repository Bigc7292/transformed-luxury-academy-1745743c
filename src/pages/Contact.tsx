import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SeoHead from '../components/SeoHead';
import Chatbot from '../components/Chatbot';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Button } from '../components/ui/button';
import { useToast } from '../components/ui/use-toast';
import { customerService } from '../services/customerService';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    topic: 'General Inquiry',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Form Incomplete",
        description: "Please fill out all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await customerService.submitInquiry({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        topic: formData.topic,
        message: formData.message,
        status: 'new',
        session_id: null
      });

      if (result.success) {
        toast({
          title: "Direct Message Sent",
          description: "Thank you for your message. Our team will respond to you as soon as possible!",
        });

        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          topic: 'General Inquiry',
          message: ''
        });
      } else {
        toast({
          title: "Error",
          description: result.error || "There was a problem sending your message. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
      console.error("Contact form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <SeoHead
        title="Contact Us - Transformed Academy & Salon"
        description="Get in touch with Transformed Academy & Salon. Contact us for appointments, inquiries, or information about our services and training programs."
      />
      <Navbar />

      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-serif text-salon-pink-700 mb-4">
              Contact Us
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We'd love to hear from you. Reach out with any questions about our services or training programs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-salon-pink-50 rounded-lg p-8"
            >
              <h2 className="text-2xl font-serif text-salon-pink-600 mb-2">Direct Message</h2>
              <p className="text-gray-600 mb-4">Send a message directly to our team. We'll respond to your inquiry as soon as possible.</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your Name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone (Optional)
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Your Phone Number"
                  />
                </div>

                <div>
                  <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-1">
                    Topic
                  </label>
                  <select
                    id="topic"
                    name="topic"
                    value={formData.topic}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-salon-pink-500 focus:outline-none focus:ring-1 focus:ring-salon-pink-500"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Booking">Booking</option>
                    <option value="Services">Services</option>
                    <option value="Training">Training</option>
                    <option value="Partnership">Partnership</option>
                    <option value="Career">Career Opportunities</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="How can we help you?"
                    rows={5}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-salon-pink-500 hover:bg-salon-pink-600"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Send size={16} className="mr-2" />
                      Send Direct Message
                    </span>
                  )}
                </Button>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col justify-between"
            >
              <div>
                <h2 className="text-2xl font-serif text-salon-pink-600 mb-6">Contact Information</h2>

                <div className="space-y-6 mb-12">
                  <div className="flex items-start">
                    <MapPin size={24} className="text-salon-pink-500 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-gray-800 mb-1">Our Locations</h3>
                      <p className="text-gray-600">
                        SALONS IN HEREFORD AND CARDIFF<br />
                        38 WIDEMARSH STREET<br />
                        HEREFORD HR4 9EP
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Phone size={24} className="text-salon-pink-500 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-gray-800 mb-1">Phone</h3>
                      <p className="text-gray-600">
                        <a href="tel:+447716402303" className="hover:text-salon-pink-500 transition-colors">
                          +44 7716 402303
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Mail size={24} className="text-salon-pink-500 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-gray-800 mb-1">Email</h3>
                      <p className="text-gray-600">
                        <a href="mailto:info@transformedacademy.co.uk" className="hover:text-salon-pink-500 transition-colors">
                          info@transformedacademy.co.uk
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-salon-pink-100/50 rounded-lg p-6">
                <h3 className="text-xl font-serif text-salon-pink-600 mb-3">Business Hours</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span className="text-gray-700">Monday - Friday</span>
                    <span className="font-medium text-gray-800">9:00 AM - 7:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-700">Saturday</span>
                    <span className="font-medium text-gray-800">9:00 AM - 5:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-700">Sunday</span>
                    <span className="font-medium text-gray-800">Closed</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="rounded-lg overflow-hidden h-96 shadow-lg"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2456.0988247211237!2d-2.7177494!3d52.0587377!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4870427e1b54d62f%3A0x9a1f9b9c0c25fb4c!2s38%20Widemarsh%20St%2C%20Hereford%20HR4%209EP!5e0!3m2!1sen!2suk!4v1712509321784!5m2!1sen!2suk"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Transformed Academy Location"
            ></iframe>
          </motion.div>
        </div>
      </div>

      <Footer />
      <Chatbot />
    </div>
  );
};

export default Contact;
