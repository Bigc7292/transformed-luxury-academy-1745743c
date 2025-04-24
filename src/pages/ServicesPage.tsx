import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Chatbot from '../components/Chatbot';
import { serviceCategories, BOOKING_URL } from '../data/serviceCategories';

const ServicesPage = () => {
  const navigate = useNavigate();

  // Handle any pending hash from sessionStorage
  useEffect(() => {
    const pendingHash = sessionStorage.getItem('pendingHash');
    if (pendingHash) {
      // Clear the pending hash
      sessionStorage.removeItem('pendingHash');

      // Navigate to the appropriate service page
      if (pendingHash === 'all') {
        navigate('/services/all');
      } else {
        navigate(`/services/${pendingHash}`);
      }
    }
  }, [navigate]);

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
            <h1 className="text-4xl md:text-5xl font-serif text-salon-pink-700 mb-4">Our Services</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover our comprehensive range of premium treatments and services designed to enhance your natural beauty and boost your confidence.
            </p>
          </motion.div>

          {/* Services Navigation Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {/* All Services Card */}
            <Link
              to="/services/all"
              className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 hover:shadow-lg"
            >
              <div className="h-48 bg-salon-pink-100 flex items-center justify-center">
                <img
                  src="/lovable-uploads/6075830a-bd81-4f72-b6e1-dd8d15ae7518.png"
                  alt="All Services"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-serif text-salon-pink-700 mb-2">All Services</h3>
                <p className="text-gray-600 mb-4">View our complete range of premium services and treatments.</p>
                <div className="text-salon-pink-600 font-medium">View Services →</div>
              </div>
            </Link>

            {/* Category Cards */}
            {serviceCategories.map(category => (
              <Link
                key={category.id}
                to={`/services/${category.id}`}
                className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 hover:shadow-lg"
              >
                <div className="h-48 bg-salon-pink-100 flex items-center justify-center">
                  <img
                    src={category.image || `/lovable-uploads/6075830a-bd81-4f72-b6e1-dd8d15ae7518.png`}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif text-salon-pink-700 mb-2">{category.name}</h3>
                  <p className="text-gray-600 mb-4">{category.description || `View our ${category.name.toLowerCase()} services and treatments.`}</p>
                  <div className="text-salon-pink-600 font-medium">View {category.name} →</div>
                </div>
              </Link>
            ))}
          </div>

          <div className="bg-salon-pink-50 rounded-lg p-8 text-center mt-16">
            <h2 className="text-2xl font-serif text-salon-pink-700 mb-4">Ready to Transform Your Look?</h2>
            <p className="text-gray-600 mb-6">
              Experience the difference with our premium treatments.
            </p>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Book Your Appointment
            </a>
          </div>
        </div>
      </div>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default ServicesPage;
