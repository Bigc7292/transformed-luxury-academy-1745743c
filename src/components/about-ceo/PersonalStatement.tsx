
import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface PersonalStatementProps {
  statement: string;
  name: string;
  title: string;
}

const PersonalStatement: React.FC<PersonalStatementProps> = ({ statement, name, title }) => {
  return (
    <section className="max-w-4xl mx-auto mb-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-salon-pink-50 to-salon-beige-50 p-8 rounded-2xl border border-salon-pink-100"
      >
        <div className="flex items-center justify-center mb-6">
          <Star className="h-6 w-6 text-salon-pink-500 mr-2" />
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-salon-pink-800">
            Commitment to Excellence
          </h2>
          <Star className="h-6 w-6 text-salon-pink-500 ml-2" />
        </div>
        
        <blockquote className="italic text-gray-700 text-lg text-center mb-6">
          {statement}
        </blockquote>
        
        <p className="text-right font-serif text-salon-pink-700 font-medium">
          — {name}, {title}
        </p>
      </motion.div>
    </section>
  );
};

export default PersonalStatement;
