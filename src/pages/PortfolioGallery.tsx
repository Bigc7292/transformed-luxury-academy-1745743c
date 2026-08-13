import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Chatbot from '../components/Chatbot';
import SEO from '../components/SEO';
import SignaturePortfolioShowcase from '@/components/content/SignaturePortfolioShowcase';

const PortfolioGallery = () => {
  return (
    <div className="bg-white min-h-screen">
      <SEO
        title="Signature Portfolio - Aesthetic Transformations Cardiff"
        description="Explore our signature aesthetic transformations at Transformed Academy & Salon in Cardiff. Advanced dermal fillers, lip fillers, polynucleotides, and signature lip artistry results."
        keywords="aesthetic transformations Cardiff, lip filler results Cardiff, dermal filler Cardiff, polynucleotides results, signature lips Cardiff, aesthetic clinic Cardiff, South Wales aesthetics"
        schema={{
          "@context": "https://schema.org",
          "@type": "ImageGallery",
          "name": "Signature Portfolio - Transformed Academy & Salon",
          "description": "Recent aesthetic transformations and treatment results from our Cardiff clinic",
          "url": "https://transformedacademyhq.co.uk/portfolio",
          "location": {
            "@type": "Place",
            "name": "Transformed Academy & Salon",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Cardiff",
              "addressRegion": "South Wales",
              "addressCountry": "UK"
            }
          }
        }}
      />
      <Navbar />

      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-gold-400 font-medium">Portfolio</span>
            <h1 className="text-4xl md:text-5xl font-serif text-gold-700 mb-4">
              Signature Transformations
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              A curated collection of our latest aesthetic treatments and results from our Cardiff clinic.
              Each transformation reflects our commitment to natural, beautiful outcomes.
            </p>
          </div>

          <SignaturePortfolioShowcase />

          <div className="text-center mt-16 bg-gold-50 rounded-lg p-8">
            <h2 className="text-2xl font-serif text-gold-700 mb-4">
              Ready for Your Transformation?
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Book a consultation at our Cardiff clinic to discuss your aesthetic goals.
              Our expert team is here to help you achieve the look you desire.
            </p>
            <a
              href="https://that-time.co.uk/transformed-academy-hq"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gold-500 text-white px-8 py-4 rounded-full hover:bg-gold-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gold-300 focus:ring-offset-2 text-lg font-medium"
            >
              Book Your Consultation
            </a>
          </div>
        </div>
      </div>

      <Footer />
      <Chatbot />
    </div>
  );
};

export default PortfolioGallery;
