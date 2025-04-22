import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Chatbot from '../components/Chatbot';
import ServicesList from '../components/ServicesList';
import { serviceCategories, BOOKING_URL } from '../data/serviceCategories';

const ServicesPage = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<string>('all');
  const servicesRef = useRef<HTMLDivElement>(null);
  const categoryRefs = useRef<{[key: string]: React.RefObject<HTMLDivElement>}>({});

  // Initialize refs for each category
  useEffect(() => {
    // Create a ref for 'all'
    categoryRefs.current = {
      all: React.createRef<HTMLDivElement>()
    };

    // Create refs for each service category
    serviceCategories.forEach(category => {
      categoryRefs.current[category.id] = React.createRef<HTMLDivElement>();
    });
  }, []);

  // Function to handle tab selection
  const handleTabClick = (categoryId: string) => {
    setActiveTab(categoryId);

    // Update URL hash for better navigation
    window.location.hash = categoryId;

    // Scroll to the selected category section
    const sectionId = `${categoryId}-section`;
    const section = document.getElementById(sectionId);

    if (section) {
      // Check if this is a mobile device
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      const scrollDelay = isMobile ? 800 : 100; // Longer delay for mobile
      const scrollOffset = isMobile ? -150 : -120; // Larger offset for mobile

      // Use scrollIntoView for better browser compatibility
      section.scrollIntoView({ behavior: 'smooth' });

      // Add a small delay and then scroll up slightly to ensure the section is visible
      setTimeout(() => {
        // Scroll up a bit to account for the fixed header
        window.scrollBy(0, scrollOffset);
      }, scrollDelay);
    }
  };

  // Handle URL hash changes and sessionStorage
  useEffect(() => {
    // Check if there's a hash in the URL and set the tab accordingly
    if (location.hash) {
      const categoryId = location.hash.substring(1); // Remove the # from the hash
      setActiveTab(categoryId);

      // Wait for the DOM to be ready
      setTimeout(() => {
        const sectionId = `${categoryId}-section`;
        const section = document.getElementById(sectionId);

        if (section) {
          // Check if this is a mobile device
          const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
          const scrollDelay = isMobile ? 800 : 100; // Longer delay for mobile
          const scrollOffset = isMobile ? -150 : -120; // Larger offset for mobile

          section.scrollIntoView({ behavior: 'smooth' });
          // Adjust scroll position to account for fixed header
          setTimeout(() => window.scrollBy(0, scrollOffset), scrollDelay);
        }
      }, window.innerWidth < 768 ? 800 : 200); // Longer delay for mobile devices
    } else {
      // Check if there's a pending hash in sessionStorage
      const pendingHash = sessionStorage.getItem('pendingHash');
      if (pendingHash) {
        // Clear the pending hash
        sessionStorage.removeItem('pendingHash');
        setActiveTab(pendingHash);

        // Wait for the DOM to be ready
        setTimeout(() => {
          const sectionId = `${pendingHash}-section`;
          const section = document.getElementById(sectionId);

          if (section) {
            // Check if this is a mobile device
            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            const scrollDelay = isMobile ? 800 : 100; // Longer delay for mobile
            const scrollOffset = isMobile ? -150 : -120; // Larger offset for mobile

            section.scrollIntoView({ behavior: 'smooth' });
            // Adjust scroll position to account for fixed header
            setTimeout(() => window.scrollBy(0, scrollOffset), scrollDelay);
          }
        }, window.innerWidth < 768 ? 800 : 200); // Longer delay for mobile devices
      }
    }
  }, [location.hash]);

  // Add an additional effect to handle direct navigation from mobile menu
  useEffect(() => {
    // This will run once when the component mounts
    const handleInitialScroll = () => {
      if (location.hash) {
        const categoryId = location.hash.substring(1);
        const sectionId = `${categoryId}-section`;
        const section = document.getElementById(sectionId);

        if (section) {
          // Check if this is a mobile device
          const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
          const scrollDelay = isMobile ? 1000 : 200; // Even longer delay for initial load on mobile
          const scrollOffset = isMobile ? -150 : -120; // Larger offset for mobile

          // For mobile devices, use a longer delay
          setTimeout(() => {
            section.scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => window.scrollBy(0, scrollOffset), scrollDelay);
          }, isMobile ? 1200 : 300); // Even longer initial delay for mobile
        }
      }
    };

    handleInitialScroll();
  }, [location.hash]); // Add location.hash as a dependency

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h1 className="text-4xl md:text-5xl font-serif text-salon-pink-700 mb-4">Our Services</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover our comprehensive range of premium treatments and services designed to enhance your natural beauty and boost your confidence.
            </p>
          </motion.div>

          {/* Services Navigation */}
          <div className="mb-10" ref={servicesRef}>
            <div className="flex justify-center mb-8 overflow-x-auto">
              <div className="bg-salon-pink-50 p-1 rounded-md inline-flex">
                <button
                  className={`px-4 py-2 rounded-sm text-sm font-medium transition-colors ${activeTab === 'all' ? 'bg-salon-pink-100 text-salon-pink-800' : 'text-salon-pink-600 hover:text-salon-pink-700'}`}
                  onClick={() => handleTabClick('all')}
                >
                  All Services
                </button>
                {serviceCategories.map(category => (
                  <button
                    key={category.id}
                    className={`px-4 py-2 rounded-sm text-sm font-medium transition-colors ${activeTab === category.id ? 'bg-salon-pink-100 text-salon-pink-800' : 'text-salon-pink-600 hover:text-salon-pink-700'}`}
                    onClick={() => handleTabClick(category.id)}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Service Sections with Anchors */}
            <div className="relative">
              {/* Anchor points positioned at the top of each section */}
              <div id="all-section" ref={categoryRefs.current.all} className="absolute" style={{ top: '-150px' }}></div>
              {serviceCategories.map(category => (
                <div
                  key={`anchor-${category.id}`}
                  id={`${category.id}-section`}
                  ref={categoryRefs.current[category.id]}
                  className="absolute"
                  style={{ top: '-150px' }}
                ></div>
              ))}

              {/* Content sections */}
              {activeTab === 'all' ? (
                <div>
                  <ServicesList />
                </div>
              ) : (
                <div>
                  <ServicesList categoryId={activeTab} />
                </div>
              )}
            </div>
          </div>

          <div className="bg-salon-pink-50 rounded-lg p-8 text-center mt-16">
            <h2 className="text-2xl font-serif text-salon-pink-700 mb-4">Ready to Transform Your Look?</h2>
            <p className="text-gray-600 mb-6">
              Experience the difference with our premium treatments.
            </p>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Book Your Appointment
            </a>
          </div>
        </div>
      </div>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default ServicesPage;
