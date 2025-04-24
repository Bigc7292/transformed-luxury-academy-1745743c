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
    // biome-ignore lint/complexity/noForEach: <explanation>
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

      // Special handling for aesthetics and training categories
      const isSpecialCategory = categoryId === 'aesthetics' || categoryId === 'training';

      // Use different timing values based on device and category
      const scrollDelay = isMobile ? 100 : 100;
      const scrollOffset = isMobile ? -80 : -120;

      // For mobile devices and special categories, use a direct approach
      if (isMobile && isSpecialCategory) {
        // Get the position of the section relative to the document
        const sectionPosition = section.getBoundingClientRect().top + window.scrollY;

        // Calculate the target position with offset
        const targetPosition = sectionPosition + scrollOffset;

        // Scroll directly to the position without smooth behavior for immediate effect
        window.scrollTo(0, targetPosition);

        // Force a second scroll after a very short delay to ensure it takes effect
        setTimeout(() => {
          window.scrollTo(0, targetPosition);
        }, 50);
      } else {
        // Standard approach for other categories and desktop
        section.scrollIntoView({ behavior: 'smooth' });

        // Add a small delay and then scroll up slightly to ensure the section is visible
        setTimeout(() => {
          // Scroll up a bit to account for the fixed header
          window.scrollBy(0, scrollOffset);
        }, scrollDelay);
      }
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
      // Check for hash in URL or pendingHash in sessionStorage
      const hashFromUrl = location.hash ? location.hash.substring(1) : null;
      const pendingHash = sessionStorage.getItem('pendingHash');
      const categoryId = hashFromUrl || pendingHash || 'all';

      if (pendingHash) {
        sessionStorage.removeItem('pendingHash');
      }

      // Set the active tab
      setActiveTab(categoryId);

      // Special handling for aesthetics and training categories
      const isSpecialCategory = categoryId === 'aesthetics' || categoryId === 'training';

      // Wait for the DOM to be fully rendered
      setTimeout(() => {
        const sectionId = `${categoryId}-section`;
        const section = document.getElementById(sectionId);

        if (section) {
          // Check if this is a mobile device
          const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
          const scrollOffset = isMobile ? -80 : -120;

          // For mobile devices with special categories, use direct positioning
          if (isMobile && isSpecialCategory) {
            // Wait a bit longer for the DOM to be fully rendered
            setTimeout(() => {
              // Get the position of the section relative to the document
              const sectionPosition = section.getBoundingClientRect().top + window.scrollY;

              // Calculate the target position with offset
              const targetPosition = sectionPosition + scrollOffset;

              // Scroll directly to the position without smooth behavior for immediate effect
              window.scrollTo(0, targetPosition);

              // Force a second scroll after a very short delay to ensure it takes effect
              setTimeout(() => {
                window.scrollTo(0, targetPosition);
              }, 50);
            }, 300);
          } else if (isMobile) {
            // For other categories on mobile, use a simpler approach
            setTimeout(() => {
              // Get the position of the section relative to the document
              const sectionPosition = section.getBoundingClientRect().top + window.scrollY;

              // Calculate the target position with offset
              const targetPosition = sectionPosition + scrollOffset;

              // Scroll with smooth behavior
              window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
              });
            }, 200);
          } else {
            // For desktop, use the standard approach
            setTimeout(() => {
              section.scrollIntoView({ behavior: 'smooth' });
              setTimeout(() => window.scrollBy(0, scrollOffset), 200);
            }, 200);
          }
        }
      }, 100);
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
                  type="button"
                  className={`px-4 py-2 rounded-sm text-sm font-medium transition-colors ${activeTab === 'all' ? 'bg-salon-pink-100 text-salon-pink-800' : 'text-salon-pink-600 hover:text-salon-pink-700'}`}
                  onClick={() => handleTabClick('all')}
                >
                  All Services
                </button>
                {serviceCategories.map(category => (
                  <button
                    type="button"
                    key={category.id}
                    className={`px-4 py-2 rounded-sm text-sm font-medium transition-colors ${activeTab === category.id ? 'bg-salon-pink-100 text-salon-pink-800' : 'text-salon-pink-600 hover:text-salon-pink-700'}`}
                    onClick={() => {
                      // Special handling for aesthetics and training on mobile
                      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
                      const isSpecialCategory = category.id === 'aesthetics' || category.id === 'training';

                      if (isMobile && isSpecialCategory) {
                        // Set active tab immediately for visual feedback
                        setActiveTab(category.id);

                        // Find the section directly
                        const sectionId = `${category.id}-section`;
                        const section = document.getElementById(sectionId);

                        if (section) {
                          // Get the position and scroll directly without animation
                          const sectionPosition = section.getBoundingClientRect().top + window.scrollY;
                          const scrollOffset = -80; // Adjusted for mobile
                          window.scrollTo(0, sectionPosition + scrollOffset);

                          // Update URL hash after scrolling
                          setTimeout(() => {
                            window.location.hash = category.id;
                          }, 50);
                        }
                      } else {
                        // Use the standard approach for other categories
                        handleTabClick(category.id);
                      }
                    }}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Service Sections with Anchors */}
            <div className="relative">
              {/* Anchor points positioned at the top of each section */}
              <div id="all-section" ref={categoryRefs.current.all} className="absolute" style={{ top: '-150px' }} />
              {serviceCategories.map(category => (
                <div
                  key={`anchor-${category.id}`}
                  id={`${category.id}-section`}
                  ref={categoryRefs.current[category.id]}
                  className="absolute"
                  style={{ top: '-150px' }}
                />
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
