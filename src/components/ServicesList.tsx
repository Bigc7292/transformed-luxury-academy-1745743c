
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
              <h2 className="text-3xl font-serif text-gold-700 mb-2">{category.name}</h2>
              {category.description && (
                <p className="text-gray-600 max-w-2xl mx-auto">{category.description}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.services.map((service) => (
                <motion.div
                  key={service.id}
                  variants={itemVariants}
                  className="bg-white rounded-lg shadow-lg overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:translate-y-[-2px]"
                >
                  {service.image && (
                    <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                      {service.id === 'coloring' ? (
                        <img
                          src="https://content-for-services-chose-by-nik.s3.eu-north-1.amazonaws.com/color_mixologist.png"
                          alt="Color Mixologist Service"
                          className="w-full h-full object-cover"
                          loading="lazy"
                          width="400"
                          height="300"
                        />
                      ) : service.id === 'lip-filler' ? (
                        <img
                          src="https://content-for-services-chose-by-nik.s3.eu-north-1.amazonaws.com/lip_fillers_image.jpg"
                          alt="Lip Fillers Service"
                          className="w-full h-full object-cover"
                          loading="lazy"
                          width="400"
                          height="300"
                        />
                      ) : service.id === 'body-sculpting' ? (
                        <img
                          src="https://content-for-services-chose-by-nik.s3.eu-north-1.amazonaws.com/body_sculpting.png"
                          alt="Body Sculpting Service"
                          className="w-full h-full object-cover"
                          loading="lazy"
                          width="400"
                          height="300"
                        />
                      ) : service.id === 'facial-profiling' ? (
                        <img
                          src="https://content-for-services-chose-by-nik.s3.eu-north-1.amazonaws.com/facial_profiling.jpg"
                          alt="Facial Profiling Service"
                          className="w-full h-full object-cover"
                          loading="lazy"
                          width="400"
                          height="300"
                        />
                      ) : service.id === 'dermal-filler' ? (
                        <img
                          src="https://content-for-services-chose-by-nik.s3.eu-north-1.amazonaws.com/WhatsApp+Image+2025-04-08+at+18.22.46.jpeg"
                          alt="Cannula Dermal Filler Service"
                          className="w-full h-full object-cover"
                          loading="lazy"
                          width="400"
                          height="300"
                        />
                      ) : service.id === 'skin' ? (
                        <img
                          src="https://content-for-services-chose-by-nik.s3.eu-north-1.amazonaws.com/skin.png"
                          alt="Skin Treatment Service"
                          className="w-full h-full object-cover"
                          loading="lazy"
                          width="400"
                          height="300"
                        />
                      ) : service.id === 'booty-lifts' ? (
                        <div className="relative w-full h-full">
                          <video
                            src="https://transformed-academy-and-salon-videos.s3.eu-north-1.amazonaws.com/videos/WhatsApp+Video+2025-03-27+at+13.20.37.mp4"
                            className="w-full h-full object-cover"
                            autoPlay
                            loop
                            muted
                            playsInline
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-12 h-12 rounded-full bg-white bg-opacity-50 flex items-center justify-center">
                              <div className="w-0 h-0 border-y-8 border-y-transparent border-l-12 border-l-gold-500 ml-1" aria-hidden="true" />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <>
                          <img
                            src={service.image}
                            alt={service.title}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                            loading="lazy"
                            width="400"
                            height="300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                        </>
                      )}
                    </div>
                  )}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl md:text-2xl font-serif text-gold-700 mb-3">{service.title}</h3>
                    <p className="text-gray-600 mb-4 flex-grow leading-relaxed">{service.description}</p>

                    {service.services && service.services.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gold-600 mb-2">Includes:</h4>
                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
                          {service.services.map((subService, idx) => (
                            <li key={`service-${service.id}-item-${idx}`}>{subService}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {service.price && (
                      <div className="mb-4">
                        <span className="text-gold-600 font-bold text-lg">{service.price}</span>
                      </div>
                    )}

                    <a
                      href={BOOKING_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary text-center mt-auto py-3 font-medium tracking-wide hover:scale-105 transition-transform"
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
