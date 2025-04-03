import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SeoHead from '../components/SeoHead';
import Chatbot from '../components/Chatbot';
import { motion } from 'framer-motion';
import ContentCarousel from '@/components/content/ContentCarousel';
import ContentGallery from '@/components/content/ContentGallery';
import { PageSection, ContentCategory } from '@/types/content';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const MediaShowcase = () => {
  const [categoryTab, setCategoryTab] = useState<string>("all");
  
  // Map tab values to content categories
  const getCategoryFilter = (tab: string): ContentCategory | undefined => {
    switch(tab) {
      case "promotional": return "promotional";
      case "staff": return "staff";
      case "awards": return "awards";
      case "ceo": return "ceo";
      case "founder": return "founder";
      case "videos": return "videos";
      default: return undefined;
    }
  };
  
  return (
    <div className="bg-white min-h-screen">
      <SeoHead 
        title="Media Showcase - Transformed Academy & Salon"
        description="Explore our media showcase featuring our best work, staff, awards, and promotional content."
      />
      <Navbar />
      
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-serif text-salon-pink-700 mb-4">
              Media Showcase
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore our stunning visuals, videos, and transformations.
            </p>
          </motion.div>
          
          {/* Featured Carousel Section */}
          <section className="mb-16">
            <ContentCarousel 
              pageLocation="media"
              pageSection="gallery_featured"
              title="Featured Media"
              description="Our most impressive visuals and transformations"
              autoPlay={true}
              interval={5000}
            />
          </section>
          
          {/* Category Tabs and Gallery */}
          <section className="mb-16">
            <h2 className="text-3xl font-serif text-salon-pink-700 mb-8 text-center">
              Browse Our Media Collection
            </h2>
            
            <Tabs 
              defaultValue="all" 
              value={categoryTab}
              onValueChange={setCategoryTab}
              className="w-full"
            >
              <div className="flex justify-center mb-8 overflow-x-auto">
                <TabsList className="flex-wrap justify-center">
                  <TabsTrigger value="all">All Media</TabsTrigger>
                  <TabsTrigger value="promotional">Promotional</TabsTrigger>
                  <TabsTrigger value="staff">Staff</TabsTrigger>
                  <TabsTrigger value="awards">Awards</TabsTrigger>
                  <TabsTrigger value="ceo">CEO</TabsTrigger>
                  <TabsTrigger value="founder">Founder</TabsTrigger>
                  <TabsTrigger value="videos">Videos</TabsTrigger>
                </TabsList>
              </div>
              
              {/* All Media Tab */}
              <TabsContent value="all" className="mt-0">
                <ContentGallery 
                  filter={{
                    active: true
                  }}
                  columns={3}
                />
              </TabsContent>
              
              {/* Category-specific Tabs */}
              {["promotional", "staff", "awards", "ceo", "founder", "videos"].map((category) => (
                <TabsContent key={category} value={category} className="mt-0">
                  <ContentGallery 
                    filter={{
                      category: getCategoryFilter(category),
                      active: true
                    }}
                    columns={3}
                  />
                </TabsContent>
              ))}
            </Tabs>
          </section>
          
          {/* Video Carousel Section */}
          <section className="mb-16">
            <ContentCarousel 
              pageLocation="media"
              pageSection="home_carousel"
              title="Video Showcase"
              description="Watch our latest videos and transformations"
              autoPlay={false}
            />
          </section>
        </div>
      </div>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default MediaShowcase;
