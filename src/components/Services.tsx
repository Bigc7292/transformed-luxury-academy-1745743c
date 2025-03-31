
import React from 'react';
import { motion } from 'framer-motion';
import ServicesList from './ServicesList';
import { Link } from 'react-router-dom';

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

        {/* Display just a preview of services - limited to 3 from the first few categories */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {/* Featured services preview */}
          <motion.div variants={itemVariants} className="group">
            <div className="service-card h-full flex flex-col">
              <div className="relative overflow-hidden rounded-t-lg h-48">
                <img 
                  src="https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=2070&auto=format&fit=crop" 
                  alt="Lip Fillers" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-4 right-4 bg-salon-pink-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Special Offer
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-serif text-salon-pink-700 mb-2">Lip Fillers</h3>
                <p className="text-gray-600 mb-6 flex-grow">Enhance your lips with our premium dermal fillers for a naturally fuller look.</p>
                <div className="mb-4 bg-salon-pink-50 p-3 rounded-md">
                  <p className="text-salon-pink-700 font-medium">Kayla's Signature Lips Masterclass - Now £499</p>
                  <div className="flex items-center mt-1">
                    <span className="line-through text-gray-500 text-sm mr-2">£799</span>
                    <span className="text-salon-pink-600 font-bold">£499</span>
                  </div>
                </div>
                <a 
                  href="https://www.fresha.com/a/transformed-hereford-38-widemarsh-st-gh3qgstr/all-offer?menu=true&pId=599120&fbclid=PAY2xjawJXeAJleHRuA2FlbQIxMAABpvlpT-VQQGYbYv93RnUCRlhDR9gHhghMheKxtpaUQT5xzr4OyeadmXfrtQ_aem_PwxPudY-AdMqXQ9vBM2JDw" 
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="text-salon-pink-500 hover:text-salon-pink-600 font-medium inline-flex items-center mt-auto"
                >
                  BOOK NOW
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="group">
            <div className="service-card h-full flex flex-col">
              <div className="relative overflow-hidden rounded-t-lg h-48">
                <img 
                  src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2070&auto=format&fit=crop" 
                  alt="Botox Treatment" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-serif text-salon-pink-700 mb-2">Botox Treatment</h3>
                <p className="text-gray-600 mb-6 flex-grow">Reduce fine lines and wrinkles with our safe and effective Botox treatments.</p>
                <a 
                  href="https://www.fresha.com/a/transformed-hereford-38-widemarsh-st-gh3qgstr/all-offer?menu=true&pId=599120&fbclid=PAY2xjawJXeAJleHRuA2FlbQIxMAABpvlpT-VQQGYbYv93RnUCRlhDR9gHhghMheKxtpaUQT5xzr4OyeadmXfrtQ_aem_PwxPudY-AdMqXQ9vBM2JDw" 
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="text-salon-pink-500 hover:text-salon-pink-600 font-medium inline-flex items-center mt-auto"
                >
                  BOOK NOW
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="group">
            <div className="service-card h-full flex flex-col">
              <div className="relative overflow-hidden rounded-t-lg h-48">
                <img 
                  src="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=2070&auto=format&fit=crop" 
                  alt="Dermal Fillers" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-serif text-salon-pink-700 mb-2">Dermal Fillers</h3>
                <p className="text-gray-600 mb-6 flex-grow">Restore volume and youthfulness with our premium dermal fillers.</p>
                <a 
                  href="https://www.fresha.com/a/transformed-hereford-38-widemarsh-st-gh3qgstr/all-offer?menu=true&pId=599120&fbclid=PAY2xjawJXeAJleHRuA2FlbQIxMAABpvlpT-VQQGYbYv93RnUCRlhDR9gHhghMheKxtpaUQT5xzr4OyeadmXfrtQ_aem_PwxPudY-AdMqXQ9vBM2JDw" 
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="text-salon-pink-500 hover:text-salon-pink-600 font-medium inline-flex items-center mt-auto"
                >
                  BOOK NOW
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
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
