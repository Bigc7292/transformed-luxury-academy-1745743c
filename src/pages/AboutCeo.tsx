
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import GlitterHearts from '../components/GlitterHearts';
import { Card, CardContent } from "@/components/ui/card";
import { Star, Award, Trophy } from 'lucide-react';

// Define award data
const awardsData = [
  {
    id: 1,
    title: "2023 Finalist - BEST FOR AESTHETICS",
    organization: "UK Hair and Beauty Awards",
    image: "/lovable-uploads/c20a0102-7efc-4503-9cc6-6107cef67eb4.png"
  },
  {
    id: 2,
    title: "HBA Finalist 2023",
    organization: "Health & Beauty Awards",
    image: "/lovable-uploads/0a19fcec-2207-4a8e-b6db-a24008e884d2.png"
  },
  {
    id: 3,
    title: "CPD Accredited Training Provider",
    organization: "CPD Certification Service",
    image: "/lovable-uploads/a58ca5da-7e1d-49cf-acde-e6bbaa2e47ad.png"
  },
  {
    id: 4,
    title: "UK Aesthetics & Beauty Awards Finalist",
    organization: "Aesthetics Practitioner of the Year 2023",
    image: "/lovable-uploads/bf300266-5a42-4d71-b7a6-ffe14b5c4c25.png"
  },
  {
    id: 5,
    title: "District Top 10 - Best Colour Salon",
    organization: "UK Hair and Beauty Awards",
    image: "/lovable-uploads/0af2a434-fccc-46d7-b9f6-0e338984c4ef.png"
  },
  {
    id: 6,
    title: "Beauty & Aesthetics Awards Nomination",
    organization: "Beauty & Aesthetics Awards 2023",
    image: "/lovable-uploads/dd497299-2b17-4b24-891a-a81ad32eb2a0.png"
  },
  {
    id: 7,
    title: "International Aesthetics Awards Entrant",
    organization: "International Aesthetics Awards 2023",
    image: "/lovable-uploads/b2095e89-c866-4d6a-b49e-c6dd7917c10e.png"
  },
  {
    id: 8,
    title: "Finalist Colourist Of The Year",
    organization: "Salon Awards - West Midlands 2023",
    image: "/lovable-uploads/e5265ce6-ce54-4f9c-8628-8039f70699f4.png"
  },
  {
    id: 9,
    title: "International Aesthetics Awards 2023",
    organization: "International Aesthetics Awards",
    image: "/lovable-uploads/e5b301a6-068e-4a8d-8dc1-bb23c603adba.png"
  },
  {
    id: 10,
    title: "Female Boss Awards Finalist 2024",
    organization: "Best Training Academy 2024",
    image: "/lovable-uploads/748df893-1f06-4522-8f79-7eb46864bf20.png"
  },
  {
    id: 11,
    title: "Official Female Boss Judge",
    organization: "Best Aesthetics Training Academy 2025",
    image: "/lovable-uploads/61f31930-d2fd-47db-8e01-72f2db80f078.png"
  }
];

// Define training courses
const trainingCourses = [
  {
    id: 1,
    title: "Start From Scratch One to One Training",
    description: "Personalized training for beginners looking to enter the aesthetics industry. Get hands-on experience with expert guidance.",
    image: "/lovable-uploads/6075830a-bd81-4f72-b6e1-dd8d15ae7518.png",
    contact: "07716402303"
  },
  {
    id: 2,
    title: "Skin Boosters Course",
    description: "Learn advanced techniques for skin rejuvenation and enhancement with our specialized skin boosters course.",
    image: "/lovable-uploads/e39c38e5-88c2-4732-aff5-8e3561694f5b.png",
    contact: "07716402303"
  }
];

const AboutCeo = () => {
  const [visibleAwards, setVisibleAwards] = useState<number[]>([]);

  useEffect(() => {
    // Initialize with no visible awards
    setVisibleAwards([]);
    
    // Stagger the appearance of awards
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setVisibleAwards(prev => {
          const nextIndex = prev.length;
          if (nextIndex < awardsData.length) {
            return [...prev, nextIndex];
          }
          clearInterval(interval);
          return prev;
        });
      }, 300); // 300ms between each award appearing
      
      return () => clearInterval(interval);
    }, 500); // Initial delay
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <GlitterHearts />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-salon-pink-800 mb-4">
              Meet <span className="text-salon-pink-500">Nikki Dee</span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-serif text-salon-pink-600 mb-6">
              Founder & CEO of Transformed Academy
            </h2>
            <div className="max-w-3xl mx-auto">
              <p className="text-lg text-gray-700 mb-8">
                With extensive experience and recognition in the beauty and aesthetics industry, 
                Nikki Dee has established herself as a leading figure and educator in the field. 
                Her passion for excellence and innovation has led to multiple awards and accolades.
              </p>
            </div>
            
            <div className="inline-flex items-center justify-center p-4 mb-10 bg-salon-pink-50 rounded-full">
              <Trophy className="h-6 w-6 text-salon-pink-500 mr-2" />
              <span className="text-salon-pink-700 font-medium">Award-Winning Aesthetics Expert & Educator</span>
            </div>
          </div>
          
          {/* Awards Section */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-salon-pink-800 mb-3">
                Awards & Recognition
              </h2>
              <p className="text-lg text-gray-600">
                Celebrating excellence and innovation in aesthetics and beauty
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {awardsData.map((award, index) => (
                <motion.div
                  key={award.id}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={visibleAwards.includes(index) ? 
                    { opacity: 1, y: 0, scale: 1 } : 
                    { opacity: 0, y: 50, scale: 0.9 }
                  }
                  transition={{ 
                    duration: 0.5,
                    type: "spring",
                    stiffness: 100,
                    damping: 15
                  }}
                  className="flex flex-col h-full"
                >
                  <Card className="h-full bg-white hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-salon-pink-100 hover:border-salon-pink-300">
                    <div className="relative pt-[100%] overflow-hidden bg-black">
                      <img 
                        src={award.image} 
                        alt={award.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-5 text-center">
                      <div className="flex items-center justify-center mb-3">
                        <Award className="h-5 w-5 text-salon-pink-500 mr-2" />
                        <h3 className="font-serif font-medium text-lg text-salon-pink-800">{award.title}</h3>
                      </div>
                      <p className="text-gray-600">{award.organization}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>
          
          {/* Training Courses Section */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-salon-pink-800 mb-3">
                Exclusive Training Courses
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Take your career to the next level with personalized training from an industry expert. 
                Nikki provides one-to-one courses designed to give you the skills and confidence needed to excel.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {trainingCourses.map((course) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, x: course.id % 2 === 0 ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <Card className="overflow-hidden border-2 border-salon-pink-200 hover:border-salon-pink-400 transition-all duration-300 h-full">
                    <div className="relative pt-[80%] overflow-hidden bg-salon-pink-100">
                      <img 
                        src={course.image} 
                        alt={course.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="font-serif text-xl font-bold text-salon-pink-700 mb-3">{course.title}</h3>
                      <p className="text-gray-700 mb-5">{course.description}</p>
                      <div className="flex flex-col sm:flex-row items-center justify-between mt-auto pt-4 border-t border-salon-pink-100">
                        <span className="text-salon-pink-600 font-medium mb-3 sm:mb-0">CPD Accredited</span>
                        <motion.a
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.98 }}
                          href={`tel:${course.contact}`}
                          className="px-6 py-2 bg-salon-pink-500 text-white rounded-full hover:bg-salon-pink-600 transition-colors"
                        >
                          Book Now: {course.contact}
                        </motion.a>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>
          
          {/* Personal Statement */}
          <section className="max-w-4xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-r from-salon-pink-50 to-salon-beige-50 p-8 rounded-2xl border border-salon-pink-100"
            >
              <div className="flex items-center justify-center mb-6">
                <Star className="h-6 w-6 text-salon-pink-500 mr-2" />
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-salon-pink-800">
                  Commitment to Excellence
                </h2>
                <Star className="h-6 w-6 text-salon-pink-500 ml-2" />
              </div>
              
              <blockquote className="italic text-gray-700 text-lg text-center mb-6">
                "My passion is to empower the next generation of aesthetics practitioners with the skills, 
                knowledge, and confidence they need to excel in this ever-evolving industry. I believe in 
                hands-on, personalized training that prepares you for real-world success."
              </blockquote>
              
              <p className="text-right font-serif text-salon-pink-700 font-medium">
                — Nikki Dee, Founder & CEO
              </p>
            </motion.div>
          </section>
          
          {/* CTA Section */}
          <section className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-salon-pink-500 text-white py-12 px-6 rounded-2xl"
            >
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                Begin Your Aesthetics Journey Today
              </h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto">
                Take the first step towards a successful career in aesthetics with expert training from Nikki Dee.
                Limited spots available for one-to-one training sessions.
              </p>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                href="tel:07716402303"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-salon-pink-600 font-medium rounded-full hover:bg-salon-pink-50 transition-colors"
              >
                Contact Now: 07716402303
              </motion.a>
            </motion.div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutCeo;
