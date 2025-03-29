
import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Benefits from '../components/Benefits';
import Testimonials from '../components/Testimonials';
import Cta from '../components/Cta';
import Footer from '../components/Footer';
import Chatbot from '../components/Chatbot';
import ContentCarousel from '@/components/content/ContentCarousel';
import ContentGrid from '@/components/content/ContentGrid';
import { PageSection } from '@/types/content';

const Index = () => {
  return (
    <div className="bg-white">
      <Navbar />
      <Hero />
      
      {/* Dynamic featured section with content from admin */}
      <ContentCarousel 
        pageLocation="home"
        pageSection="home_carousel"
        title="Experience the Transformation"
        description="See our latest transformations and special offers"
        autoPlay={true}
        interval={5000}
      />
      
      <Services />
      
      {/* Content grid showing featured items managed by admin */}
      <ContentGrid 
        pageLocation="home"
        pageSection="home_featured"
        title="Featured Content"
        description="Explore our featured content showcasing our best services and results"
        columns={3}
        limit={3}
      />
      
      <Benefits />
      <Testimonials />
      <Cta />
      <Footer />
      <Chatbot />
    </div>
  );
};

export default Index;
