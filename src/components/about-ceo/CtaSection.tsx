
import React from 'react';
import { motion } from 'framer-motion';

interface CtaSectionProps {
  phone: string;
}

const CtaSection: React.FC<CtaSectionProps> = ({ phone }) => {
  return (
    <section className="text-center mb-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-salon-pink-500 text-white py-12 px-6 rounded-2xl"
      >
        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
          Begin Your Aesthetics Journey Today
        </h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Take the first step towards a successful career in aesthetics with expert training from Kayla.
          Limited spots available for one-to-one training sessions.
        </p>
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          href={`tel:${phone}`}
          className="inline-flex items-center justify-center px-8 py-3 bg-white text-salon-pink-600 font-medium rounded-full hover:bg-salon-pink-50 transition-colors"
        >
          Contact Now: {phone}
        </motion.a>
      </motion.div>
    </section>
  );
};

export default CtaSection;
