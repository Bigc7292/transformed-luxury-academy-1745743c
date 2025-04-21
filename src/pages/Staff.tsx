import React from 'react';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SeoHead from '../components/SeoHead';
import { Card, CardContent } from '../components/ui/card';
import TeamMember from '../components/team/TeamMember';

const Staff = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Lee",
      role: "Makeup Artist",
      image: "/lovable-uploads/0ee68060-f085-4e57-84f8-ff9acf725159.png",
      bio: "I'm Lee, Award winning Makeup Artist and Beauty specialist of 10 years, I am so excited to bring my full glam make-up appointments, 1-1s and masterclasses to Hereford. I first started my journey working as MUA for Kik Milano before being head hunted by Charlotte Tilbury's Artistry Team, I was a pro artist and product specialist for 3 years working backstage during fashion week, back and forth London and high end, department stores, I then went onto being regional makeup artist for Lancome Paris.",
      specialties: ["Creative Makeup", "Eye Art", "Color Theory", "Bridal Makeup"]
    },
    {
      id: 2,
      name: "Lorell",
      role: "Junior Stylist",
      image: "/lovable-uploads/ab614c89-36fc-49c3-b517-5d56a36ced26.png",
      bio: "Hello! My name is Lorell and I am a Junior Stylist at Transformed Academy! I have been based at Transformed Academy for the last 2 years whilst being trained by Nickalea to acquire certification in Hairdressing and other treatments! I have since recently qualified in my Level 2 Foundation in Hairdressing as well as being a fully qualified Hair Extensionist. I am hoping to expand my skills into the beauty industry soon too! I love my job and I am very passionate about the work I do. I hope to specialise in balayage when I am fully qualified. A little about me as a person though! I have 3 cats called Popcorn, Luna and Onyx who keep me on my toes at home! I love cooking, like literally anything! And I also love going outdoors to explore. Hairdressing to me is another thing I love doing and I find it therapeutic if you'd like to call it that! I like to do things that make other people feel happy within themselves! I hope to see you all soon.",
      specialties: ["Hair Styling", "Hair Extensions", "Foundation Hairdressing", "Balayage"]
    },
    {
      id: 3,
      name: "Tina",
      role: "Skin Specialist",
      image: "/lovable-uploads/1c838eb7-7932-4d88-94a9-75f6a1e529b7.png",
      bio: "Working with Kayla for seven months now, Tina specializes in skincare treatments. She offers waxing, Hollywood and body treatments, and much more. She loves anything nature has to offer and dancing!",
      specialties: ["Skin Care", "Waxing", "Hollywood Treatments", "Body Treatments"]
    },
    {
      id: 4,
      name: "Stef",
      role: "Nail & Lash Technician",
      image: "/lovable-uploads/5baa32bf-0382-4a50-921c-2c274070c44e.png",
      bio: "A skilled nail technician offering lash lifts and tints, Stef has been with Transformed Academy for over a year. Outside of work, she absolutely loves salsa dancing and doughnuts.",
      specialties: ["Nail Art", "Lash Lifts", "Lash Tinting", "Manicures & Pedicures"]
    },
    {
      id: 5,
      name: "Hope",
      role: "Stylist",
      image: "https://content-for-services-chose-by-nik.s3.eu-north-1.amazonaws.com/hope.jpeg",
      bio: "Meet Hope, our talented stylist with a passion for creating beautiful transformations. With her keen eye for detail and dedication to staying current with the latest trends, Hope delivers exceptional results tailored to each client's unique style. She specializes in precision cutting, creative coloring, and styling techniques that enhance your natural beauty. When she's not behind the chair, Hope enjoys exploring new fashion trends and spending time outdoors.",
      specialties: ["Precision Cutting", "Creative Coloring", "Styling", "Hair Treatments"]
    }
  ];

  return (
    <>
      <SeoHead
        title="Meet Our Team | Transformed Academy"
        description="Meet the talented professionals at Transformed Academy offering a range of beauty and aesthetic services."
      />
      <Navbar />
      <div className="bg-gradient-to-b from-white to-salon-pink-50 min-h-screen pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center mb-4">
              <Users size={32} className="text-salon-pink-500 mr-2" />
              <h1 className="text-4xl md:text-5xl font-serif font-medium text-salon-pink-800">
                Meet Our Team
              </h1>
            </div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4">
              Our talented team of beauty professionals is dedicated to providing exceptional service and helping you look and feel your best.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <TeamMember member={member} />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-salon-pink-100/70 rounded-xl p-8 shadow-sm"
          >
            <div className="text-center">
              <h2 className="text-2xl font-serif font-medium text-salon-pink-800 mb-4">Join Our Team</h2>
              <p className="text-gray-700 mb-6">
                Are you passionate about beauty and aesthetics? We're always looking for talented professionals to join our growing team.
              </p>
              <a
                href="/contact"
                className="inline-block bg-salon-pink-500 text-white px-6 py-3 rounded-full hover:bg-salon-pink-600 transition-colors"
              >
                Contact Us About Opportunities
              </a>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Staff;
