import React from 'react';
import { motion } from 'framer-motion';
import { claireContentItems } from '@/data/claireContent';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.4 }
  }
};

const ClaireContentShowcase: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <span className="text-gold-400 font-medium">Claire's Portfolio</span>
          <h2 className="text-3xl md:text-4xl font-serif text-gold-800 mt-2">
            Recent Transformations
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Explore our latest work showcasing advanced aesthetic treatments and beautiful results from our Cardiff clinic.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {claireContentItems.map((item) => (
            <motion.div key={item.id} variants={itemVariants} className="group">
              <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="relative aspect-[4/5] overflow-hidden bg-gold-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    width="400"
                    height="500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="inline-block bg-gold-500 text-white text-xs font-medium px-3 py-1 rounded-full mb-2">
                      {item.category}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-serif text-gold-700 mb-2 group-hover:text-gold-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gold-600 font-medium">{item.location}</span>
                    <a
                      href={item.ctaLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm bg-gold-500 text-white px-4 py-2 rounded-full hover:bg-gold-600 transition-colors"
                    >
                      {item.ctaText}
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ClaireContentShowcase;
