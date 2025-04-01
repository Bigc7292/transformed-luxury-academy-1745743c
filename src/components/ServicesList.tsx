
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ContentItem } from '@/types/content';
import { serviceCategories, BOOKING_URL, ServiceCategory, Service } from '../data/serviceCategories';

// Helper function to find a category by ID
const findCategoryById = (categoryId: string): ServiceCategory | undefined => {
  return serviceCategories.find(cat => cat.id === categoryId);
};

// Helper function to safely parse metadata
const getMetadataValue = (item: ContentItem, key: string, defaultValue: any = undefined) => {
  try {
    if (!item.metadata) return defaultValue;
    const metadata = typeof item.metadata === 'string' 
      ? JSON.parse(item.metadata) 
      : item.metadata;
    return metadata[key] ?? defaultValue;
  } catch {
    return defaultValue;
  }
};

interface ServicesListProps {
  categoryId?: string; // Optional: to filter and show only specific category
  contentItems?: ContentItem[]; // Content items from database
}

const ServicesList: React.FC<ServicesListProps> = ({ categoryId, contentItems }) => {
  if (!contentItems || contentItems.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-gray-500">No services available at the moment. Please check back later.</p>
      </div>
    );
  }

  // Filter content items by category if specified
  const filteredItems = categoryId 
    ? contentItems.filter(item => {
        const itemCategory = getMetadataValue(item, 'category', '');
        return itemCategory === categoryId;
      })
    : contentItems;

  // Group services by category for display
  const groupedServices = filteredItems.reduce((acc: Record<string, ContentItem[]>, item) => {
    const category = getMetadataValue(item, 'category', 'other');
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {});

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

  // Render content using the grouped items
  return (
    <div className="py-8">
      {Object.entries(groupedServices).map(([catId, items]) => {
        const category = findCategoryById(catId) || { id: catId, name: catId.charAt(0).toUpperCase() + catId.slice(1) };
        
        return (
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
                {items.map((item) => {
                  // Get any additional metadata
                  const additionalImages = getMetadataValue(item, 'additionalImages', []);
                  const price = getMetadataValue(item, 'price', '');
                  const services = getMetadataValue(item, 'services', []);
                  
                  return (
                    <motion.div
                      key={item.id}
                      variants={itemVariants}
                      className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col"
                    >
                      {item.url && (
                        <div className="relative h-64 overflow-hidden">
                          <img 
                            src={item.url} 
                            alt={item.title} 
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                          />
                          {additionalImages && additionalImages.length > 0 && (
                            <div className="absolute inset-0 animate-slideshow">
                              {additionalImages.map((img: string, index: number) => (
                                <div 
                                  key={index} 
                                  className="absolute inset-0 opacity-0 animation-delay"
                                  style={{animationDelay: `${(index + 1) * 5}s`}}
                                >
                                  <img 
                                    src={img} 
                                    alt={`${item.title} ${index + 1}`} 
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              ))}
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                        </div>
                      )}
                      <div className="p-5 flex flex-col flex-grow">
                        <h3 className="text-xl font-serif text-salon-pink-700 mb-2">{item.title}</h3>
                        <p className="text-gray-600 mb-4 flex-grow">
                          {item.description}
                        </p>
                        
                        {services && services.length > 0 && (
                          <div className="mb-4">
                            <h4 className="text-sm font-medium text-gray-700 mb-2">Includes:</h4>
                            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                              {services.map((service: string, idx: number) => (
                                <li key={idx}>{service}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {price && (
                          <div className="mb-4">
                            <span className="text-salon-pink-600 font-bold">{price}</span>
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
                  );
                })}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default ServicesList;
