
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Benefits from '../components/Benefits';
import Testimonials from '../components/Testimonials';
import Cta from '../components/Cta';
import Footer from '../components/Footer';
import Chatbot from '../components/Chatbot';
import GlitterHearts from '../components/GlitterHearts';

const Index = () => {
  const location = useLocation();
  
  // Only show GlitterHearts on home page and about-kayla page
  const showGlitterHearts = location.pathname === '/' || location.pathname === '/about-kayla';

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);

    // Add SEO meta tags dynamically
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Transformed Academy and Salon offers Premium Advanced Aesthetics Treatments, Skin Analysis Specialist, Hair Care Treatments And Fully Qualified Level 5 Educator. Book your consultation today.');
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', 'Discover Premium Advanced Aesthetics Treatments, Skin Analysis Specialist, Hair Care Treatments at Transformed Academy and Salon. Fully Qualified Level 5 Educator.');
    }
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      {showGlitterHearts && <GlitterHearts />}
      <main>
        <Hero />
        <Services />
        <Benefits />
        <Testimonials />
        <Cta />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default Index;
