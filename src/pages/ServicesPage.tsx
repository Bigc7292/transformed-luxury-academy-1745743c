import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Chatbot from '../components/Chatbot';
import { serviceCategories, BOOKING_URL } from '../data/serviceCategories';

const ServicesPage = () => {
  // State to track active category
  const [activeCategory, setActiveCategory] = useState('hair');

  // Refs for each section
  const sectionRefs = useRef<{ [key: string]: React.RefObject<HTMLDivElement> }>({});

  // Initialize section refs
  useEffect(() => {
    // Create refs for each category
    for (const category of serviceCategories) {
      sectionRefs.current[category.id] = React.createRef<HTMLDivElement>();
    }

    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    // Set up intersection observer to update active category based on scroll position
    const observerOptions = {
      root: null,
      rootMargin: '-100px 0px -70% 0px', // Adjust these values to control when a section is considered "active"
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const id = entry.target.id.replace('-section', '');
          setActiveCategory(id);
        }
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all section elements
    for (const key of Object.keys(sectionRefs.current)) {
      const ref = sectionRefs.current[key];
      if (ref.current) {
        observer.observe(ref.current);
      }
    }

    return () => {
      // Clean up observer
      observer.disconnect();
    };
  }, []);

  // Function to scroll to a section
  const scrollToSection = (categoryId: string) => {
    // Set active category immediately for visual feedback
    setActiveCategory(categoryId);

    const ref = sectionRefs.current[categoryId];
    if (ref?.current) {
      // Get the position of the section
      const sectionTop = ref.current.getBoundingClientRect().top;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      // Calculate target position with offset for header
      const targetPosition = sectionTop + scrollTop - 100; // 100px offset for header

      // Scroll to the section
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <div className="pt-32 pb-8 bg-gradient-to-b from-salon-pink-50 to-white">
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
        </div>
      </div>

      {/* Sticky Navigation */}
      <div className="sticky top-20 z-30 bg-white shadow-md py-3 mb-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-start overflow-x-auto hide-scrollbar pb-1">
            {serviceCategories.map(category => (
              <button
                type="button"
                key={category.id}
                onClick={() => scrollToSection(category.id)}
                className={`whitespace-nowrap px-4 py-3 mx-1 rounded-md text-sm font-medium min-w-[120px] transition-colors focus:outline-none focus:ring-2 focus:ring-salon-pink-300 ${
                  activeCategory === category.id
                    ? 'bg-salon-pink-500 text-white'
                    : 'bg-salon-pink-50 text-salon-pink-700 hover:bg-salon-pink-100'
                }`}
                aria-label={`Navigate to ${category.name} section`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Service Sections */}
      <div className="container mx-auto px-4 pb-20">
        {serviceCategories.map(category => (
          <motion.section
            key={category.id}
            id={`${category.id}-section`}
            ref={sectionRefs.current[category.id]}
            className="mb-20 scroll-mt-32"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="md:flex">
                {/* Category Image (larger on desktop, hidden on mobile) */}
                <div className="hidden md:block md:w-1/3 bg-salon-pink-100">
                  <img
                    src={category.image || "/lovable-uploads/6075830a-bd81-4f72-b6e1-dd8d15ae7518.png"}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Category Content */}
                <div className="md:w-2/3 p-6 md:p-8">
                  {/* Mobile Image (shown only on mobile) */}
                  <div className="md:hidden mb-4 h-48 overflow-hidden rounded-lg">
                    <img
                      src={category.image || "/lovable-uploads/6075830a-bd81-4f72-b6e1-dd8d15ae7518.png"}
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <h2 className="text-3xl font-serif text-salon-pink-700 mb-4">{category.name}</h2>
                  <p className="text-gray-600 mb-6">{category.description || `Our premium ${category.name.toLowerCase()} services designed to enhance your natural beauty.`}</p>

                  {/* Services Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    {category.services.map(service => (
                      <div key={service.id} className="bg-salon-pink-50 p-4 rounded-lg">
                        <h3 className="text-lg font-medium text-salon-pink-700 mb-2">{service.title}</h3>
                        <p className="text-sm text-gray-600 line-clamp-2">{service.description}</p>
                      </div>
                    ))}
                  </div>

                  <a
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-salon-pink-500 text-white px-6 py-3 rounded-full hover:bg-salon-pink-600 transition-colors focus:outline-none focus:ring-2 focus:ring-salon-pink-300 focus:ring-offset-2"
                    aria-label={`Book ${category.name} services`}
                  >
                    Book {category.name} Services
                  </a>
                </div>
              </div>
            </div>
          </motion.section>
        ))}

        {/* Call to Action */}
        <div className="bg-salon-pink-50 rounded-lg p-8 text-center mt-16">
          <h2 className="text-2xl font-serif text-salon-pink-700 mb-4">Ready to Transform Your Look?</h2>
          <p className="text-gray-600 mb-6">
            Experience the difference with our premium treatments.
          </p>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-salon-pink-500 text-white px-6 py-3 rounded-full hover:bg-salon-pink-600 transition-colors focus:outline-none focus:ring-2 focus:ring-salon-pink-300 focus:ring-offset-2"
          >
            Book Your Appointment
          </a>
        </div>
      </div>

      <Footer />
      <Chatbot />

      {/* Custom styles are applied via Tailwind classes */}
    </div>
  );
};

export default ServicesPage;
