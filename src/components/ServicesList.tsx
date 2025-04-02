
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { serviceCategories, BOOKING_URL, type ServiceCategory, type Service } from '../data/serviceCategories';

interface ServicesListProps {
  categoryId?: string; // Optional: to filter and show only specific category
}

const ServicesList: React.FC<ServicesListProps> = ({ categoryId }) => {
  // Filter categories if categoryId is provided
  const categories = categoryId 
    ? serviceCategories.filter(cat => cat.id === categoryId) 
    : serviceCategories;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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

  return (
    <div className="py-8">
      {categories.map((category) => (
        <motion.div
          key={category.id}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="mb-16"
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-serif text-salon-pink-700 mb-2">{category.name}</h2>
              {category.description && (
                <p className="text-gray-600 max-w-2xl mx-auto">{category.description}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.services.map((service) => (
                <motion.div
                  key={service.id}
                  variants={itemVariants}
                  className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col"
                >
                  {service.image && (
                    <div className="relative h-32 overflow-hidden">
                      <img 
                        src={service.image} 
                        alt={service.title} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                    </div>
                  )}
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-xl font-serif text-salon-pink-700 mb-2">{service.title}</h3>
                    <p className="text-gray-600 mb-4 flex-grow">{service.description}</p>
                    
                    {service.services && service.services.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Includes:</h4>
                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                          {service.services.map((subService, idx) => (
                            <li key={idx}>{subService}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {service.price && (
                      <div className="mb-4">
                        <span className="text-salon-pink-600 font-bold">{service.price}</span>
                      </div>
                    )}
                    
                    <a 
                      href={BOOKING_URL} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn-primary text-center mt-auto"
                    >
                      BOOK NOW
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ServicesList;
