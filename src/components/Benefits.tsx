
import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const Benefits = () => {
  const benefits = [
    {
      id: 1,
      title: "Expert Practitioners",
      description: "All treatments performed by certified aesthetic practitioners with years of experience."
    },
    {
      id: 2,
      title: "Premium Products",
      description: "We use only the highest quality, FDA-approved products for all our treatments."
    },
    {
      id: 3,
      title: "Personalized Care",
      description: "Each treatment plan is customized to your unique features and desired outcomes."
    },
    {
      id: 4,
      title: "Safe Environment",
      description: "Our clinic adheres to the highest standards of safety and hygiene."
    },
  ];

  return (
    <section className="py-20 bg-salon-pink-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-12 lg:mb-0">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-salon-pink-200 rounded-full opacity-50"></div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-salon-beige-200 rounded-full opacity-50"></div>
              
              <div className="relative z-10 bg-white p-1 rounded-xl shadow-xl">
                <img 
                  src="/lovable-uploads/3c7bd4cf-0544-4f55-9e75-b320ceda3772.png" 
                  alt="Benefits of our treatments" 
                  className="rounded-lg h-auto object-cover"
                />
              </div>
              
              <div className="absolute top-1/2 right-0 transform translate-x-1/4 -translate-y-1/2 bg-white p-4 rounded-lg shadow-lg max-w-[200px]">
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 rounded-full bg-salon-pink-100 flex items-center justify-center">
                    <Check className="w-5 h-5 text-salon-pink-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-salon-pink-700">100% Satisfaction</p>
                    <p className="text-xs text-gray-500">Guaranteed results</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          <div className="lg:w-1/2 lg:pl-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <span className="text-salon-pink-400 font-medium">Why Choose Us</span>
              <h2 className="text-3xl md:text-4xl font-serif text-salon-pink-800 mt-2">Benefits of Transformed Academy</h2>
              <p className="mt-4 text-gray-600 mb-8">
                At Transformed Academy and Salon, we're committed to providing exceptional aesthetic treatments that enhance your natural beauty with the highest standards of care.
              </p>
            </motion.div>
            
            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <motion.div 
                  key={benefit.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex"
                >
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-10 h-10 rounded-full bg-salon-pink-100 flex items-center justify-center">
                      <Check className="w-5 h-5 text-salon-pink-500" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-salon-pink-700">{benefit.title}</h3>
                    <p className="text-gray-600 mt-1">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-10"
            >
              <a href="/about" className="btn-primary">
                Learn More About Us
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
