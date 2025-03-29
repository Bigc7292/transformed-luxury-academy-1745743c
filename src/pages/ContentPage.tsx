
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Chatbot from "../components/Chatbot";
import ContentGallery from "../components/content/ContentGallery";
import { ContentCategory, MediaType } from "@/types/content";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SeoHead from "@/components/SeoHead";
import { motion } from "framer-motion";

const ContentPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [mediaFilter, setMediaFilter] = useState<MediaType | undefined>(undefined);
  
  // Convert URL param to valid ContentCategory
  const getContentCategory = (): ContentCategory | undefined => {
    if (!category) return undefined;
    
    const validCategories: ContentCategory[] = [
      "promotional", "staff", "awards", "ceo", "partner", "videos"
    ];
    
    return validCategories.includes(category as ContentCategory) 
      ? (category as ContentCategory) 
      : undefined;
  };
  
  const contentCategory = getContentCategory();
  
  const getCategoryTitle = () => {
    switch (contentCategory) {
      case "promotional": return "Promotional Content";
      case "staff": return "Our Staff";
      case "awards": return "Awards & Recognition";
      case "ceo": return "CEO Spotlight";
      case "partner": return "Partner's Journey";
      case "videos": return "Videos Collection";
      default: return "All Content";
    }
  };
  
  const getCategoryDescription = () => {
    switch (contentCategory) {
      case "promotional": return "Explore our latest promotional materials and offers.";
      case "staff": return "Meet the talented team behind Transformed Academy & Salon.";
      case "awards": return "Celebrating our achievements and recognition in the industry.";
      case "ceo": return "Learn more about our visionary CEO.";
      case "partner": return "Discover the journey of our valued partners.";
      case "videos": return "Watch our collection of videos about our academy and salon.";
      default: return "Browse our complete media library.";
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <SeoHead 
        title={`${getCategoryTitle()} | Transformed Academy & Salon`}
        description={getCategoryDescription()}
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
              {getCategoryTitle()}
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {getCategoryDescription()}
            </p>
          </motion.div>

          <Tabs defaultValue="all" className="mb-8">
            <div className="flex justify-center">
              <TabsList>
                <TabsTrigger value="all" onClick={() => setMediaFilter(undefined)}>
                  All
                </TabsTrigger>
                <TabsTrigger value="image" onClick={() => setMediaFilter("image")}>
                  Images
                </TabsTrigger>
                <TabsTrigger value="video" onClick={() => setMediaFilter("video")}>
                  Videos
                </TabsTrigger>
              </TabsList>
            </div>
          </Tabs>

          <ContentGallery 
            filter={{
              category: contentCategory,
              mediaType: mediaFilter
            }}
          />
        </div>
      </div>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default ContentPage;
