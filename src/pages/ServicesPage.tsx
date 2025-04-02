
import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Chatbot from '../components/Chatbot';
import ServicesList from '../components/ServicesList';
import { serviceCategories, BOOKING_URL } from '../data/serviceCategories';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ServicesPage = () => {
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

          <div className="mb-10">
            <Tabs defaultValue="all" className="w-full">
              <div className="flex justify-center mb-8 overflow-x-auto">
                <TabsList className="bg-salon-pink-50 p-1">
                  <TabsTrigger 
                    value="all"
                    className="data-[state=active]:bg-salon-pink-100 data-[state=active]:text-salon-pink-800"
                  >
                    All Services
                  </TabsTrigger>
                  {serviceCategories.map(category => (
                    <TabsTrigger 
                      key={category.id} 
                      value={category.id}
                      className="data-[state=active]:bg-salon-pink-100 data-[state=active]:text-salon-pink-800"
                    >
                      {category.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
              
              <TabsContent value="all">
                <ServicesList />
              </TabsContent>
              
              {serviceCategories.map(category => (
                <TabsContent key={category.id} value={category.id}>
                  <ServicesList categoryId={category.id} />
                </TabsContent>
              ))}
            </Tabs>
          </div>

          <div className="bg-salon-pink-50 rounded-lg p-8 text-center mt-16">
            <h2 className="text-2xl font-serif text-salon-pink-700 mb-4">Ready to Transform Your Look?</h2>
            <p className="text-gray-600 mb-6">
              Book your appointment today and experience the difference with our premium treatments.
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
