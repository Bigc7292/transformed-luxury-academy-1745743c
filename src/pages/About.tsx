import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SeoHead from '../components/SeoHead';
import Chatbot from '../components/Chatbot';

const About = () => {
  return (
    <div className="bg-white min-h-screen">
      <SeoHead
        title="About Us - Transformed Academy & Salon"
        description="Learn about Transformed Academy & Salon, our mission, values, and commitment to excellence in beauty and aesthetics in Cardiff."
        keywords="about us, beauty salon, aesthetic clinic, beauty academy, Cardiff salon, beauty training, salon history, beauty professionals"
        schema={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "name": "About Transformed Academy & Salon",
          "description": "Learn about Transformed Academy & Salon, our mission, values, and commitment to excellence in beauty and aesthetics.",
          "url": "https://transformedacademyhq.co.uk/about",
          "mainEntity": {
            "@type": "BeautySalon",
            "name": "Transformed Academy & Salon",
            "description": "Premium beauty and aesthetic services and professional training in Cardiff",
            "url": "https://transformedacademyhq.co.uk",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Unit R05 Cardiff Bay Business Centre",
              "addressLocality": "Cardiff",
              "postalCode": "CF24 5BS",
              "addressCountry": "GB"
            },
            "telephone": "07716402303"
          }
        }}
      />
      <Navbar />

      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-serif text-gold-700 mb-4">
              About Transformed Academy
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Your premier destination for beauty and aesthetics in Cardiff.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <img
                src="/lovable-uploads/decb2b79-3774-449a-b7b7-479a89096676.png"
                alt="Transformed Academy Salon"
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col justify-center"
            >
              <h2 className="text-2xl font-serif text-gold-600 mb-4">Our Story</h2>
              <p className="text-gray-700 mb-4">
                Transformed Academy was founded with a vision to provide exceptional beauty and aesthetic services
                while also training the next generation of beauty professionals. Our journey began with a passion
                for transformation and a commitment to excellence.
              </p>
              <p className="text-gray-700">
                Today, we are proud to offer a wide range of services from our talented team of professionals,
                each bringing their unique expertise and creativity to every client experience.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gold-50 rounded-lg p-8 mb-16"
          >
            <h2 className="text-2xl font-serif text-gold-600 mb-4 text-center">Our Mission</h2>
            <p className="text-gray-700 text-center max-w-3xl mx-auto">
              At Transformed Academy, our mission is to empower individuals through beauty and education.
              We strive to create a welcoming environment where clients can enhance their natural beauty
              and aspiring professionals can develop their skills under expert guidance.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-white rounded-lg shadow-md p-6 text-center"
            >
              <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-gold-600 text-2xl">✨</span>
              </div>
              <h3 className="text-xl font-serif text-gold-600 mb-2">Excellence</h3>
              <p className="text-gray-600">
                We are committed to delivering the highest quality services and education,
                constantly evolving with industry trends and techniques.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="bg-white rounded-lg shadow-md p-6 text-center"
            >
              <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-gold-600 text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-serif text-gold-600 mb-2">Community</h3>
              <p className="text-gray-600">
                We foster a supportive community where clients and students feel valued,
                respected, and inspired to achieve their beauty goals.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="bg-white rounded-lg shadow-md p-6 text-center"
            >
              <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-gold-600 text-2xl">🌱</span>
              </div>
              <h3 className="text-xl font-serif text-gold-600 mb-2">Growth</h3>
              <p className="text-gray-600">
                We believe in continuous growth and development, both for our clients'
                transformations and our team's professional advancement.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl font-serif text-gold-600 mb-4">Visit Us Today</h2>
            <p className="text-gray-700 mb-6 max-w-3xl mx-auto">
              Experience the Transformed difference for yourself. Whether you're looking for a beauty
              treatment or interested in our training programs, we invite you to visit our salon.
            </p>
            <a
              href="/contact"
              className="bg-gold-500 text-white px-6 py-3 rounded-full hover:bg-gold-600 transition-colors inline-block"
            >
              Contact Us
            </a>
          </motion.div>
        </div>
      </div>

      <Footer />
      <Chatbot />
    </div>
  );
};

export default About;
