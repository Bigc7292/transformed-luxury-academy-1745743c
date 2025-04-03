
import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SeoHead from '../components/SeoHead';

const Partnership = () => {
  return (
    <>
      <SeoHead
        title="Partnership with Dr. Martin | Transformed Academy"
        description="Learn about our partnership with Dr. Martin, a highly qualified dental surgeon with expertise in facial aesthetics."
      />
      <Navbar />
      <div className="pt-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col lg:flex-row items-start gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:w-1/3"
            >
              <div className="rounded-xl overflow-hidden shadow-xl">
                <img 
                  src="/lovable-uploads/dd497299-2b17-4b24-891a-a81ad32eb2a0.png"
                  alt="Dr. Martin" 
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="mt-6 p-6 bg-salon-pink-50 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-salon-pink-800 mb-2">Dr. M E Wint</h3>
                <p className="text-sm text-gray-600">BDS DPDS PHD MCGDENT MFDSRCS MIAAFA</p>
                <div className="mt-4 flex items-center">
                  <div className="w-2 h-2 bg-salon-pink-500 rounded-full mr-2"></div>
                  <p className="text-sm text-gray-700">Specialist in Facial Aesthetics</p>
                </div>
                <div className="mt-2 flex items-center">
                  <div className="w-2 h-2 bg-salon-pink-500 rounded-full mr-2"></div>
                  <p className="text-sm text-gray-700">Non-Surgical Procedures</p>
                </div>
                <div className="mt-2 flex items-center">
                  <div className="w-2 h-2 bg-salon-pink-500 rounded-full mr-2"></div>
                  <p className="text-sm text-gray-700">Over 25 Years Experience</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:w-2/3"
            >
              <h1 className="text-3xl md:text-4xl font-serif font-medium text-salon-pink-800 mb-6">Partnership with Dr. Martin</h1>
              
              <div className="prose prose-pink max-w-none">
                <p className="mb-4 text-lg leading-relaxed">
                  Qualified in Dental surgery 1993, Dr. Martin had a part time hospital post at University Hospital Coventry from 1995 to 2007. His field was head and neck trauma and Maxillofacial Surgery. He has taught undergraduate final year Dental Students at Birmingham Dental School. He left in 2012 to continue his work as general dental practitioner as a partner in Warwick.
                </p>
                
                <p className="mb-4 text-lg leading-relaxed">
                  Dr. Martin has been trained by Prof Bob Khanna in facial aesthetics from Botox to Dermal fillers to fat dissolving and is now fully trained in non surgical face and neck lifts using Aptos threads which can last for over 2 years as compared to PDO threads of 6 to 9 months.
                </p>
                
                <p className="mb-4 text-lg leading-relaxed">
                  He is also trained in Xosomes and Polynucleotides for skin rejuvenation. Most if not all of his aesthetics work is undertaken via Cannula which is safer than needles, creates less bruising and in conjunction with brand Pluryal, creates amazing results.
                </p>
                
                <blockquote className="bg-salon-pink-50 border-l-4 border-salon-pink-300 p-4 my-6">
                  <p className="italic">
                    "In partnership with Transformed Academy, we are able to provide a comprehensive range of aesthetic treatments that combine my medical expertise with Kayla's professional beauty qualifications."
                  </p>
                </blockquote>
                
                <div className="bg-salon-beige-50 p-6 rounded-lg mt-8">
                  <h3 className="text-xl font-semibold text-salon-pink-800 mb-4">Specialized Training & Credentials</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>BDS - Bachelor of Dental Surgery</li>
                    <li>DPDS - Diploma in Postgraduate Dental Studies</li>
                    <li>PHD - Doctor of Philosophy</li>
                    <li>MCGDENT - Member of the College of General Dentistry</li>
                    <li>MFDSRCS - Member of the Faculty of Dental Surgery of the Royal College of Surgeons</li>
                    <li>MIAAFA - Member of the International Academy of Advanced Facial Aesthetics</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Partnership;
