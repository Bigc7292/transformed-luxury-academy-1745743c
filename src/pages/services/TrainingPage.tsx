import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Chatbot from '../../components/Chatbot';
import ServicesList from '../../components/ServicesList';
import { BOOKING_URL } from '../../data/serviceCategories';

const TrainingPage = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h1 className="text-4xl md:text-5xl font-serif text-gold-700 mb-4">Training Services</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover our professional training courses designed to elevate your skills in the beauty industry.
            </p>
          </motion.div>

          <div>
            <ServicesList categoryId="training" />
          </div>

          <div className="bg-gold-50 rounded-lg p-8 text-center mt-16">
            <h2 className="text-2xl font-serif text-gold-700 mb-4">Ready to Advance Your Career?</h2>
            <p className="text-gray-600 mb-6">
              Experience the difference with our premium training courses.
            </p>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Book Your Course
            </a>
          </div>
        </div>
      </div>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default TrainingPage;
