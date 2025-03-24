
import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Star, Zap } from 'lucide-react';

const servicesList = [
  {
    id: 1,
    title: "Lip Fillers",
    description: "Enhance your lips with our premium dermal fillers for a naturally fuller look.",
    icon: <Heart className="w-8 h-8 text-salon-pink-400" />,
    image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=2070&auto=format&fit=crop",
    link: "/services/lip-fillers"
  },
  {
    id: 2,
    title: "Botox Treatment",
    description: "Reduce fine lines and wrinkles with our safe and effective Botox treatments.",
    icon: <Star className="w-8 h-8 text-salon-pink-400" />,
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2070&auto=format&fit=crop",
    link: "/services/botox"
  },
  {
    id: 3,
    title: "Dermal Fillers",
    description: "Restore volume and youthfulness with our premium dermal fillers.",
    icon: <Zap className="w-8 h-8 text-salon-pink-400" />,
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=2070&auto=format&fit=crop",
    link: "/services/dermal-fillers"
  }
];

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

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {servicesList.map((service) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              className="group"
            >
              <div className="service-card h-full flex flex-col">
                <div className="relative overflow-hidden rounded-t-lg h-48">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="mb-4">{service.icon}</div>
                  <h3 className="text-xl font-serif text-salon-pink-700 mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-6 flex-grow">{service.description}</p>
                  <a 
                    href={service.link} 
                    className="text-salon-pink-500 hover:text-salon-pink-600 font-medium inline-flex items-center mt-auto"
                  >
                    Learn More
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-12">
          <a href="/services" className="btn-secondary">
            View All Services
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;
