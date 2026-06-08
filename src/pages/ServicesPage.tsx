import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Chatbot from '../components/Chatbot';
import { serviceCategories, BOOKING_URL } from '../data/serviceCategories';
import SEO from '../components/SEO';

const ServicesPage = () => {
  // State to track active category
  const [activeCategory, setActiveCategory] = useState('hair');

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Get the active category data
  const activeCategoryData = serviceCategories.find(cat => cat.id === activeCategory);

  return (
    <div className="bg-white min-h-screen">
      <SEO
        title="Our Services - Beauty & Aesthetic Treatments"
        description="Explore our comprehensive range of beauty and aesthetic services including hair treatments, facials, lip fillers, anti-wrinkle treatments, and professional training courses."
        keywords="beauty services, aesthetic treatments, hair salon, facial treatments, lip fillers, anti-wrinkle treatments, beauty training, Hereford salon"
        schema={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          "itemListElement": serviceCategories.map((category, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
              "@type": "Service",
              "name": category.name,
              "description": category.description || `Premium ${category.name.toLowerCase()} services`,
              "provider": {
                "@type": "BeautySalon",
                "name": "Transformed Academy & Salon",
                "url": "https://transformedacademyhq.co.uk"
              },
              "url": `https://transformedacademyhq.co.uk/services#${category.id}`
            }
          }))
        }}
      />
      <Navbar />

      {/* Hero Section */}
      <div className="pt-32 pb-8 bg-gradient-to-b from-gold-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h1 className="text-4xl md:text-5xl font-serif text-gold-700 mb-4">Our Services</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover our comprehensive range of premium treatments and services designed to enhance your natural beauty and boost your confidence.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="bg-white shadow-md py-4 mb-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2 pb-2">
            {serviceCategories.map(category => (
              <button
                type="button"
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`whitespace-nowrap px-4 py-4 mx-1 rounded-md text-sm md:text-base font-medium min-w-[160px] md:min-w-[180px] transition-colors focus:outline-none focus:ring-2 focus:ring-gold-300 ${
                  activeCategory === category.id
                    ? 'bg-gold-500 text-white shadow-md'
                    : 'bg-gold-50 text-gold-700 hover:bg-gold-100'
                }`}
                aria-label={`View ${category.name} services`}
              >
                {category.name === "Beauty Treatments" ? (
                  <>Beauty<br />Treatments</>
                ) : category.name === "Training Services" ? (
                  <>Training<br />Services</>
                ) : (
                  category.name
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Active Category Content */}
      <div className="container mx-auto px-4 pb-20">
        <AnimatePresence mode="wait">
          {activeCategoryData && (
            <motion.div
              key={activeCategoryData.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              {/* Category Header */}
              <div className="relative h-64 md:h-80 bg-gold-100 overflow-hidden">
                <img
                  src={activeCategoryData.image || "/logo.jpg"}
                  alt={activeCategoryData.name}
                  className="w-full h-full object-cover gold-tint-filter"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-6 md:p-8 w-full">
                    <h2 className="text-3xl md:text-4xl font-serif text-white mb-2">{activeCategoryData.name}</h2>
                    <p className="text-white/90 text-lg max-w-3xl">
                      {activeCategoryData.description || `Our premium ${activeCategoryData.name.toLowerCase()} services designed to enhance your natural beauty.`}
                    </p>
                  </div>
                </div>
              </div>

              {/* Services Grid */}
              <div className="p-6 md:p-8">
                <h3 className="text-2xl font-serif text-gold-700 mb-6">Available Services</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {activeCategoryData.services.map(service => (
                    <div
                      key={service.id}
                      className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1"
                    >
                      <div className="h-48 bg-gold-100 overflow-hidden">
                        {service.isVideo ? (
                          <video
                            src={service.image}
                            className="w-full h-full object-cover"
                            controls
                            muted
                            loop
                            autoPlay
                            playsInline
                          />
                        ) : (
                          <img
                            src={service.image || "/logo.jpg"}
                            alt={service.title}
                            className="w-full h-full object-cover transition-transform hover:scale-105 gold-tint-filter"
                          />
                        )}
                      </div>
                      <div className="p-4">
                        <h4 className="text-xl font-serif text-gold-700 mb-2">{service.title}</h4>
                        <p className="text-gray-600 mb-4">{service.description}</p>

                        {service.price && (
                          <div className="mb-4">
                            <span className="text-gold-600 font-bold text-lg">{service.price}</span>
                          </div>
                        )}

                        {service.services && service.services.length > 0 && (
                          <div className="mb-4">
                            <h5 className="text-sm font-medium text-gold-600 mb-2">Includes:</h5>
                            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                              {service.services.map((subService, idx) => (
                                <li key={`${service.id}-service-${idx}`}>{subService}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <a
                          href={BOOKING_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full text-center bg-gold-500 text-white py-3 rounded-md hover:bg-gold-600 transition-colors mt-4"
                        >
                          Book Now
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center">
                  <a
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-gold-500 text-white px-8 py-4 rounded-full hover:bg-gold-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gold-300 focus:ring-offset-2 text-lg font-medium"
                  >
                    Book {activeCategoryData.name} Services
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Call to Action */}
        <div className="bg-gold-50 rounded-lg p-8 text-center mt-16">
          <h2 className="text-2xl font-serif text-gold-700 mb-4">Ready to Transform Your Look?</h2>
          <p className="text-gray-600 mb-6">
            Experience the difference with our premium treatments.
          </p>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gold-500 text-white px-6 py-3 rounded-full hover:bg-gold-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gold-300 focus:ring-offset-2"
          >
            Book Your Appointment
          </a>
        </div>
      </div>

      <Footer />
      <Chatbot />
    </div>
  );
};

export default ServicesPage;
