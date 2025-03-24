
import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Chatbot from '../components/Chatbot';
import GlitterHearts from '../components/GlitterHearts';

const PriceList = () => {
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
              Our Price List
            </motion.h1>
            <motion.p variants={itemVariants} className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover our range of premium treatments designed to enhance your natural beauty and boost your confidence.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <motion.div 
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img 
                src="/lovable-uploads/ce69ddac-6f4c-4cb7-b591-5dbba81af027.png" 
                alt="Price List" 
                className="w-full h-auto"
              />
            </motion.div>
            <motion.div 
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img 
                src="/lovable-uploads/743b6640-23a9-4d20-a013-f22057993267.png" 
                alt="Kayla's Signature Lips" 
                className="w-full h-auto"
              />
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <motion.div 
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img 
                src="/lovable-uploads/25674aa6-db90-4635-9083-d20f0a04a266.png" 
                alt="Sculpting The Body Of Dreams" 
                className="w-full h-auto"
              />
            </motion.div>
            <motion.div 
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img 
                src="/lovable-uploads/9adc42fb-5f82-4bfe-8397-c5b42685de06.png" 
                alt="Post Op Aftercare" 
                className="w-full h-auto"
              />
            </motion.div>
            <motion.div 
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img 
                src="/lovable-uploads/51fa7eec-6b73-4b98-819b-d2575ce05fcb.png" 
                alt="Investing In A Happier & Confident You" 
                className="w-full h-auto"
              />
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img 
                src="/lovable-uploads/7a78c101-3725-41bf-b715-8db6d3d78668.png" 
                alt="Foods - Best for Lymphatic Drainage" 
                className="w-full h-auto"
              />
            </motion.div>
            <motion.div 
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img 
                src="/lovable-uploads/f9ad279c-c69d-4621-992f-ceb06912b33a.png" 
                alt="Treatable Body Areas" 
                className="w-full h-auto"
              />
            </motion.div>
            <motion.div 
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img 
                src="/lovable-uploads/c1bc6ba4-d386-4e0b-9d64-c526363e2f65.png" 
                alt="Lymphatic Massage Do's and Don'ts" 
                className="w-full h-auto"
              />
            </motion.div>
          </div>
          
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <a href="/booking" className="btn-primary inline-block">
              Book Your Treatment Now
            </a>
          </motion.div>
        </div>
      </div>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default PriceList;
