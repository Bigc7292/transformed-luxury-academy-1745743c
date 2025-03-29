
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SeoHead from '../components/SeoHead';
import Chatbot from '../components/Chatbot';
import { motion } from 'framer-motion';
import ContentGrid from '@/components/content/ContentGrid';
import { PageSection } from '@/types/content';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ContentCarousel from '@/components/content/ContentCarousel';

const Gallery = () => {
  const [tabValue, setTabValue] = useState("all");
  
  return (
    <div className="bg-white min-h-screen">
      <SeoHead 
        title="Gallery - Transformed Academy & Salon | Before & After Results"
        description="Explore our gallery showcasing stunning transformations. See our client results and professional work at Transformed Academy & Salon."
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
              Our Gallery
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore our stunning transformations and get inspired for your own journey.
            </p>
          </motion.div>
          
          {/* Featured gallery carousel controlled by admin */}
          <ContentCarousel 
            pageLocation="gallery"
            pageSection="gallery_featured"
            title="Featured Transformations"
            description="Our most impressive results and transformations"
          />
          
          <div className="my-12">
            <Tabs 
              defaultValue="all" 
              value={tabValue}
              onValueChange={setTabValue}
              className="w-full"
            >
              <div className="flex justify-center mb-8">
                <TabsList>
                  <TabsTrigger value="all">All Media</TabsTrigger>
                  <TabsTrigger value="lips">Lips</TabsTrigger>
                  <TabsTrigger value="face">Face</TabsTrigger>
                  <TabsTrigger value="body">Body</TabsTrigger>
                  <TabsTrigger value="training">Training</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="all" className="mt-0">
                <ContentGrid 
                  pageLocation="gallery"
                  pageSection="gallery_main"
                  columns={3}
                />
              </TabsContent>
              
              <TabsContent value="lips" className="mt-0">
                <div className="text-center py-16">
                  <p className="text-lg text-gray-500">
                    Content for this section is managed through the admin panel.
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="face" className="mt-0">
                <div className="text-center py-16">
                  <p className="text-lg text-gray-500">
                    Content for this section is managed through the admin panel.
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="body" className="mt-0">
                <div className="text-center py-16">
                  <p className="text-lg text-gray-500">
                    Content for this section is managed through the admin panel.
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="training" className="mt-0">
                <div className="text-center py-16">
                  <p className="text-lg text-gray-500">
                    Content for this section is managed through the admin panel.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default Gallery;
