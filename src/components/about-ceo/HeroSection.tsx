
import React from 'react';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  name: string;
  title: string;
  description: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ name, title, description }) => {
  return (
    <div className="text-center mb-12">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-salon-pink-800 mb-4">
        Meet <span className="text-salon-pink-500">{name}</span>
      </h1>
      <h2 className="text-2xl md:text-3xl font-serif text-salon-pink-600 mb-6">
        {title}
      </h2>
      <div className="max-w-3xl mx-auto">
        <p className="text-lg text-gray-700 mb-8">
          {description}
        </p>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center justify-center p-4 mb-10 bg-salon-pink-50 rounded-full"
      >
        <Trophy className="h-6 w-6 text-salon-pink-500 mr-2" />
        <span className="text-salon-pink-700 font-medium">Award-Winning Aesthetics Expert & Educator</span>
      </motion.div>
    </div>
  );
};

import { Trophy } from 'lucide-react';

export default HeroSection;
