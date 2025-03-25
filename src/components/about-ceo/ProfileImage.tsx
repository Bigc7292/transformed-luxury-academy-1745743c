
import React from 'react';
import { motion } from 'framer-motion';
import { AwardType } from './types';

interface ProfileImageProps {
  imgSrc: string;
  animatedAwards: AwardType[];
}

const ProfileImage: React.FC<ProfileImageProps> = ({ imgSrc, animatedAwards }) => {
  // Define the positions for each award image
  const positions = [
    { angle: 0, distance: 350 },    // North position (previously East)
    { angle: 90, distance: 350 },   // East position (adjusted)
    { angle: 180, distance: 350 },  // South position (adjusted)
    { angle: 270, distance: 350 },  // West position
  ];

  return (
    <div className="relative mb-36"> {/* Increased bottom margin to prevent text overlap */}
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
      
      {/* Rotating Awards Around Main Image */}
      <div className="absolute inset-0 flex items-center justify-center">
        {positions.map((position, index) => (
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
                src={animatedAwards[index].image} 
                alt={animatedAwards[index].title}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProfileImage;
