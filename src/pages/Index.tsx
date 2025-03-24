
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Benefits from '../components/Benefits';
import Testimonials from '../components/Testimonials';
import Cta from '../components/Cta';
import Footer from '../components/Footer';
import Chatbot from '../components/Chatbot';

const Index = () => {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
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
