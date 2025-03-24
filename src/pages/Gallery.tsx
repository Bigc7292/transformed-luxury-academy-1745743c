
import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Chatbot from '../components/Chatbot';
import GlitterHearts from '../components/GlitterHearts';

const Gallery = () => {
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

  const galleryItems = [
    {
      id: 1,
      image: "/lovable-uploads/d1f9d632-ee8c-4d3c-bd05-9ca3b9e5a83d.png",
      title: "Lip Filler Results",
      description: "Beautiful, natural-looking lip enhancement"
    },
    // Add more gallery items as needed
  ];

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <GlitterHearts />
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center mb-12"
          >
            <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl font-serif text-salon-pink-700 mb-4">
              Our Beauty Gallery
            </motion.h1>
            <motion.p variants={itemVariants} className="text-lg text-gray-600 max-w-3xl mx-auto">
              See the stunning results of our treatments and be inspired for your own transformation.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryItems.map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="overflow-hidden rounded-lg shadow-lg bg-white group"
              >
                <div className="relative overflow-hidden h-80">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 text-white">
                      <h3 className="text-xl font-serif">{item.title}</h3>
                      <p className="text-sm mt-2">{item.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <a href="/booking" className="btn-primary inline-block">
              Book Your Consultation
            </a>
          </motion.div>
        </div>
      </div>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default Gallery;
