
import React from 'react';
import { motion } from 'framer-motion';
import { BOOKING_URL } from '../data/serviceCategories';

const Cta = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-gold-100 to-zinc-100 overflow-hidden">
      <div className="container mx-auto px-4 relative">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-gold-200 rounded-full blur-3xl opacity-30 transform rotate-45"></div>
        <div className="absolute -bottom-40 -left-20 w-80 h-80 bg-zinc-200 rounded-full blur-3xl opacity-30"></div>

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between bg-white rounded-2xl shadow-xl p-8 lg:p-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="lg:w-2/3 mb-8 lg:mb-0"
          >
            <h2 className="text-3xl md:text-4xl font-serif text-gold-800 mb-4">Ready for Your Transformation?</h2>
            <p className="text-gray-600 max-w-2xl">
              Book your consultation today and take the first step towards a more confident you. Our expert practitioners will help you discover the perfect treatments for your aesthetic goals.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center gap-6"
          >
            <div className="flex flex-col gap-4 w-full sm:w-auto">
              <a
                href={BOOKING_URL}
                className="btn-primary whitespace-nowrap text-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                Book Consultation
              </a>
              <a href="/contact" className="btn-secondary whitespace-nowrap text-center">
                Contact Us
              </a>
            </div>
            <div className="hidden sm:flex flex-col items-center border border-gold-200/50 p-2 rounded-lg bg-gold-50/20">
              <img
                src="/booking-qrcode.jpg"
                alt="Scan to book"
                className="w-20 h-20 rounded border border-gold-100"
              />
              <span className="text-[10px] text-gold-600 font-medium mt-1">Scan to Book</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Cta;
