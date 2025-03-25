
import React from 'react';
import { motion } from 'framer-motion';
import { AwardType } from './types';

interface ProfileImageProps {
  imgSrc: string;
  animatedAwards: AwardType[];
}

const ProfileImage: React.FC<ProfileImageProps> = ({ imgSrc, animatedAwards }) => {
  // Define the positions for each award image - we'll only use two for the rotation now
  const positions = [
    { angle: 0, distance: 350 },    // North position
    { angle: 180, distance: 350 },  // South position
  ];

  // Get the specific award images we want to display statically
  const trainingAcademyAward = animatedAwards.find(award => 
    award.image === "/lovable-uploads/931de925-2945-4448-931f-b8cc65a64e27.png");
  
  const blondeSpecialistAward = animatedAwards.find(award => 
    award.image === "/lovable-uploads/e5f63014-1269-4f57-9add-853a574d10b0.png");
  
  // Filter out these two awards from the animatedAwards array
  const remainingAwards = animatedAwards.filter(award => 
    award.image !== "/lovable-uploads/931de925-2945-4448-931f-b8cc65a64e27.png" && 
    award.image !== "/lovable-uploads/e5f63014-1269-4f57-9add-853a574d10b0.png");

  return (
    <div className="relative mb-36"> {/* Increased bottom margin to prevent text overlap */}
      {/* Static award images that will be positioned at the top near the title */}
      <div className="absolute -top-16 left-0 right-0 flex justify-center space-x-4 z-20">
        {trainingAcademyAward && (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden w-24 h-24">
            <img 
              src={trainingAcademyAward.image} 
              alt={trainingAcademyAward.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        {blondeSpecialistAward && (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden w-24 h-24">
            <img 
              src={blondeSpecialistAward.image} 
              alt={blondeSpecialistAward.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>
      
      <div className="flex justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 rounded-full overflow-hidden border-8 border-gold shadow-2xl"
          style={{ 
            width: '320px', 
            height: '320px',
            borderColor: 'rgba(212, 175, 55, 0.8)'
          }}
        >
          <img 
            src={imgSrc} 
            alt="Founder & CEO" 
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>
      
      {/* Rotating Awards Around Main Image - now with only 2 positions */}
      <div className="absolute inset-0 flex items-center justify-center">
        {positions.map((position, index) => {
          const awardIndex = index % remainingAwards.length;
          return (
            <motion.div
              key={index}
              className="absolute"
              initial={{ 
                rotate: position.angle,
                x: Math.cos(position.angle * Math.PI/180) * position.distance,
                y: Math.sin(position.angle * Math.PI/180) * position.distance,
                opacity: 0 
              }}
              animate={{ 
                rotate: [position.angle, position.angle + 360],
                x: Math.cos(position.angle * Math.PI/180) * position.distance,
                y: Math.sin(position.angle * Math.PI/180) * position.distance,
                opacity: 1 
              }}
              transition={{ 
                rotate: { 
                  repeat: Infinity, 
                  duration: 60, 
                  ease: "linear",
                  delay: index * 0.5
                },
                opacity: { duration: 1, delay: 1 + index * 0.2 }
              }}
            >
              <motion.div
                whileHover={{ scale: 1.1, zIndex: 20 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden w-40 h-40"
              >
                <img 
                  src={remainingAwards[awardIndex].image} 
                  alt={remainingAwards[awardIndex].title}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ProfileImage;
