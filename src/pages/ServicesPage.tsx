
import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Chatbot from '../components/Chatbot';
import ServicesList from '../components/ServicesList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { contentService } from '@/services/contentService';
import ContentGrid from '@/components/content/ContentGrid';

const ServicesPage = () => {
  // Fetch content for services showcase
  const { data: serviceContent, isLoading } = useQuery({
    queryKey: ['content', 'services', 'services_showcase'],
    queryFn: () => contentService.getContentForPageSection('services', 'services_showcase'),
  });

  // Group content items by category (derived from description field)
  const contentByCategory = React.useMemo(() => {
    if (!serviceContent) return {};
    
    const grouped: Record<string, typeof serviceContent> = {};
    
    // Create an "all" category that contains all items
    grouped['all'] = serviceContent;
    
    // Group items by their category (from description field)
    serviceContent.forEach(item => {
      const category = item.description?.toLowerCase() || 'uncategorized';
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(item);
    });
    
    return grouped;
  }, [serviceContent]);
  
  // Get unique categories for tab navigation
  const categories = React.useMemo(() => {
    return Object.keys(contentByCategory).filter(category => category !== 'all');
  }, [contentByCategory]);

  return (
    <div className="bg-white min-h-screen">
      <style>
        {`
          @keyframes slideshow {
            0%, 20% {
              opacity: 1;
            }
            25%, 95% {
              opacity: 0;
            }
            100% {
              opacity: 1;
            }
          }
          
          .animate-slideshow > div {
            animation: slideshow 15s infinite;
          }
          
          .animation-delay:nth-child(2) {
            animation-delay: 5s;
          }
          
          .animation-delay:nth-child(3) {
            animation-delay: 10s;
          }
        `}
      </style>
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

          {/* Display content from Supabase if available */}
          {serviceContent && serviceContent.length > 0 && (
            <ContentGrid 
              pageLocation="services"
              pageSection="services_showcase"
              title="Featured Services"
              columns={3}
              className="mb-16"
            />
          )}

          <div className="mb-10">
            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="animate-pulse h-12 w-12 rounded-full bg-salon-pink-200"></div>
              </div>
            ) : serviceContent && serviceContent.length > 0 ? (
              <Tabs defaultValue="all" className="w-full">
                <div className="flex justify-center mb-8 overflow-x-auto">
                  <TabsList className="bg-salon-pink-50 p-1">
                    <TabsTrigger 
                      value="all"
                      className="data-[state=active]:bg-salon-pink-100 data-[state=active]:text-salon-pink-800"
                    >
                      All Services
                    </TabsTrigger>
                    {categories.map(category => (
                      <TabsTrigger 
                        key={category} 
                        value={category}
                        className="data-[state=active]:bg-salon-pink-100 data-[state=active]:text-salon-pink-800"
                      >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>
                
                <TabsContent value="all">
                  <ServicesList contentItems={contentByCategory['all']} />
                </TabsContent>
                
                {categories.map(category => (
                  <TabsContent key={category} value={category}>
                    <ServicesList contentItems={contentByCategory[category]} />
                  </TabsContent>
                ))}
              </Tabs>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No services found. Please add services in the admin panel.</p>
              </div>
            )}
          </div>

          <div className="bg-salon-pink-50 rounded-lg p-8 text-center mt-16">
            <h2 className="text-2xl font-serif text-salon-pink-700 mb-4">Ready to Transform Your Look?</h2>
            <p className="text-gray-600 mb-6">
              Book your appointment today and experience the difference with our premium treatments.
            </p>
            <a 
              href="https://www.fresha.com/a/transformed-hereford-38-widemarsh-st-gh3qgstr/all-offer?menu=true&pId=599120&fbclid=PAY2xjawJXeAJleHRuA2FlbQIxMAABpvlpT-VQQGYbYv93RnUCRlhDR9gHhghMheKxtpaUQT5xzr4OyeadmXfrtQ_aem_PwxPudY-AdMqXQ9vBM2JDw" 
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
