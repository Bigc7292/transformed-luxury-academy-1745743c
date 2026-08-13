
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
import SEO from '../components/SEO';
import SignatureShowcase from '@/components/SignatureShowcase';
import TrustAccreditations from '@/components/TrustAccreditations';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import PrecisionLiftLaunch from '@/components/PrecisionLiftLaunch';
import SignaturePortfolioShowcase from '@/components/content/SignaturePortfolioShowcase';

const Index = () => {
  return (
    <div className="bg-white">
      <SEO
        title="Premium Aesthetic Treatments & Beauty Training in Cardiff"
        description="Transformed Academy & Salon offers premium aesthetic treatments and professional beauty training courses in Cardiff, South Wales. Expert lip fillers, dermal fillers, and advanced aesthetic training. Book your appointment today."
        keywords="Aesthetics Clinic Cardiff, Non-surgical treatments Cardiff, Medical Aesthetics Cardiff, Aesthetics Training Academy Cardiff, Advanced aesthetic courses UK, Botox and Filler training Cardiff, lip fillers Cardiff, dermal fillers South Wales, polynucleotides Cardiff, beauty training Cardiff"
        canonicalUrl="https://transformedacademyhq.co.uk"
        schema={{
          "@context": "https://schema.org",
          "@type": "MedicalClinic",
          "name": "Transformed Academy & Salon",
          "description": "Premium aesthetic treatments and beauty training courses in Cardiff, South Wales",
          "url": "https://transformedacademyhq.co.uk",
          "telephone": "",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Cardiff",
            "addressRegion": "South Wales",
            "addressCountry": "GB"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "addressLocality": "Cardiff",
            "addressRegion": "South Wales",
            "addressCountry": "GB"
          },
          "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            "opens": "09:00",
            "closes": "18:00"
          },
          "priceRange": "£££",
          "image": "https://transformedacademyhq.co.uk/logo-hq.jpg"
        }}
      />
      <Navbar />
      <Hero />
      <TrustAccreditations />

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
      <SignatureShowcase />
      <PrecisionLiftLaunch />

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
      <BeforeAfterSlider />
      <SignaturePortfolioShowcase />
      <Testimonials />
      <Cta />
      <Footer />
      <Chatbot />
    </div>
  );
};

export default Index;
