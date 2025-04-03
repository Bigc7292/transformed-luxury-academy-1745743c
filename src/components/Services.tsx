
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { serviceCategories, BOOKING_URL } from '../data/serviceCategories';

const Services = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  // Get featured services from different categories
  const featuredServices = [
    serviceCategories[1].services[1], // Advanced Lip Filler
    serviceCategories[0].services[0], // Hair Extensions
    serviceCategories[2].services[0], // Facial Sculpting
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-salon-pink-400 font-medium">Our Services</span>
          <h2 className="text-3xl md:text-4xl font-serif text-salon-pink-800 mt-2">Premium Aesthetic Treatments</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Discover our range of luxurious aesthetic treatments designed to enhance your natural beauty and boost your confidence.
          </p>
        </div>

        {/* Display just a preview of services - limited to 3 from different categories */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {featuredServices.map((service, index) => (
            <motion.div key={index} variants={itemVariants} className="group">
              <div className="service-card h-full flex flex-col">
                <div className="relative overflow-hidden rounded-t-lg h-48">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  {index === 0 && (
                    <div className="absolute top-4 right-4 bg-salon-pink-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Special Offer
                    </div>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-serif text-salon-pink-700 mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-6 flex-grow">{service.description}</p>
                  
                  {index === 0 && (
                    <div className="mb-4 bg-salon-pink-50 p-3 rounded-md">
                      <p className="text-salon-pink-700 font-medium">Kayla's Signature Lips Masterclass - Now £499</p>
                      <div className="flex items-center mt-1">
                        <span className="line-through text-gray-500 text-sm mr-2">£799</span>
                        <span className="text-salon-pink-600 font-bold">£499</span>
                      </div>
                    </div>
                  )}
                  
                  <a 
                    href={BOOKING_URL} 
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="btn-primary text-center"
                  >
                    BOOK NOW
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-12">
          <Link to="/services" className="btn-secondary">
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;
