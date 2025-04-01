
import React from 'react';
import { motion } from 'framer-motion';
import { ContentItem } from '@/types/content';

// The booking URL for all services
const BOOKING_URL = 'https://www.fresha.com/a/transformed-hereford-38-widemarsh-st-gh3qgstr/all-offer?menu=true&pId=599120&fbclid=PAY2xjawJXeAJleHRuA2FlbQIxMAABpvlpT-VQQGYbYv93RnUCRlhDR9gHhghMheKxtpaUQT5xzr4OyeadmXfrtQ_aem_PwxPudY-AdMqXQ9vBM2JDw';

interface ServicesListProps {
  contentItems?: ContentItem[]; // Content items from database
}

const ServicesList: React.FC<ServicesListProps> = ({ contentItems }) => {
  if (!contentItems || contentItems.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No services found for this category.</p>
      </div>
    );
  }

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

  // Group services by their metadata.section if available
  const servicesBySection = React.useMemo(() => {
    const grouped: Record<string, ContentItem[]> = {};
    const defaultSection = "Services";
    
    contentItems.forEach(item => {
      // Safely access section from metadata
      const metadata = item.metadata as Record<string, unknown> || {};
      const section = (metadata.section as string) || defaultSection;
      
      if (!grouped[section]) {
        grouped[section] = [];
      }
      grouped[section].push(item);
    });
    
    return Object.keys(grouped).length > 0 ? grouped : { [defaultSection]: contentItems };
  }, [contentItems]);

  return (
    <div className="py-8">
      {Object.entries(servicesBySection).map(([section, items]) => (
        <motion.div
          key={section}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="mb-16"
        >
          <div className="container mx-auto px-4">
            {section !== "Services" && (
              <div className="text-center mb-10">
                <h2 className="text-3xl font-serif text-salon-pink-700 mb-2">{section}</h2>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((service) => {
                // Safely process thumbnail URLs from metadata if available
                const metadata = service.metadata as Record<string, unknown> || {};
                const thumbnails = (metadata.thumbnails as string[]) || [];
                
                return (
                  <motion.div
                    key={service.id}
                    variants={itemVariants}
                    className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col"
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        src={service.url} 
                        alt={service.title} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                      {thumbnails.length > 0 && (
                        <div className="absolute inset-0 animate-slideshow">
                          {thumbnails.map((img, index) => (
                            <div 
                              key={index} 
                              className="absolute inset-0 opacity-0 animation-delay"
                              style={{animationDelay: `${(index + 1) * 5}s`}}
                            >
                              <img 
                                src={img} 
                                alt={`${service.title} ${index + 1}`} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                    </div>
                    <div className="p-5 flex flex-col flex-grow">
                      <h3 className="text-xl font-serif text-salon-pink-700 mb-2">{service.title}</h3>
                      <p className="text-gray-600 mb-4 flex-grow">
                        {service.description}
                      </p>
                      
                      {/* Display included services if available in metadata */}
                      {metadata.includes && Array.isArray(metadata.includes) && (metadata.includes as string[]).length > 0 && (
                        <div className="mb-4">
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Includes:</h4>
                          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                            {(metadata.includes as string[]).map((subService, idx) => (
                              <li key={idx}>{subService}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {/* Display price if available in metadata */}
                      {metadata.price && (
                        <div className="mb-4">
                          <span className="text-salon-pink-600 font-bold">{metadata.price as string}</span>
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
      ))}
    </div>
  );
};

export default ServicesList;
