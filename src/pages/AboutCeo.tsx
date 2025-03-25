
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import GlitterHearts from '../components/GlitterHearts';
import HeroSection from '../components/about-ceo/HeroSection';
import ProfileImage from '../components/about-ceo/ProfileImage';
import AwardCarousel from '../components/about-ceo/AwardCarousel';
import TrainingCourses from '../components/about-ceo/TrainingCourses';
import PersonalStatement from '../components/about-ceo/PersonalStatement';
import CtaSection from '../components/about-ceo/CtaSection';
import { 
  awardsData, 
  trainingCourses, 
  personalStatement, 
  ceoDetails 
} from '../components/about-ceo/data';

const AboutCeo = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-pink-50 to-white">
      <Navbar />
      <GlitterHearts />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <HeroSection 
            name={ceoDetails.name}
            title={ceoDetails.title}
            description={ceoDetails.description}
          />
          
          {/* Main Image with Rotating Awards */}
          <ProfileImage 
            imgSrc={ceoDetails.image}
            animatedAwards={awardsData.slice(0, 4)}
          />
          
          {/* Awards Carousel */}
          <AwardCarousel awards={awardsData} />
          
          {/* Training Courses Section */}
          <TrainingCourses courses={trainingCourses} />
          
          {/* Personal Statement */}
          <PersonalStatement 
            statement={personalStatement}
            name={ceoDetails.name}
            title={ceoDetails.title.split(' of ')[0]}
          />
          
          {/* CTA Section */}
          <CtaSection phone="07716402303" />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutCeo;
