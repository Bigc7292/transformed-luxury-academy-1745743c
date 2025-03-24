
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Define heart shapes and sizes
const heartShapes = [
  "M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z",
  "M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z",
];

// Define pink color variants
const pinkShades = [
  '#FFDEE2', // Soft Pink
  '#FF83AD', // Medium Pink
  '#FF6499', // Bright Pink
  '#FFB6C1', // Light Pink
  '#FFC0CB', // Pink
  '#DB5584', // Dark Pink
];

type GlitterParticle = {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  rotation: number;
  delay: number;
  duration: number;
  isHeart: boolean;
  path?: string;
};

const GlitterHearts: React.FC = () => {
  const [particles, setParticles] = useState<GlitterParticle[]>([]);

  // Create initial particles
  useEffect(() => {
    const generateParticles = () => {
      const newParticles: GlitterParticle[] = [];
      const count = 160; // Doubled from 80 to 160 total particles

      for (let i = 0; i < count; i++) {
        // Determine if this will be a heart or a glitter particle
        const isHeart = Math.random() > 0.6; // 40% chance of being a heart
        
        newParticles.push({
          id: i,
          x: Math.random() * 100, // Random position across the screen (%)
          y: -10 - Math.random() * 100, // Start above the viewport
          size: isHeart ? 3 + Math.random() * 10 : 1 + Math.random() * 3, // Hearts are bigger
          color: pinkShades[Math.floor(Math.random() * pinkShades.length)],
          rotation: Math.random() * 360,
          delay: Math.random() * 10, // Random delay for staggered animation
          duration: 7 + Math.random() * 15, // Random duration for varied falling speed
          isHeart,
          path: isHeart ? heartShapes[Math.floor(Math.random() * heartShapes.length)] : undefined,
        });
      }
      
      return newParticles;
    };

    setParticles(generateParticles());

    // Regenerate particles every 20 seconds for continuous effect
    const interval = setInterval(() => {
      setParticles(generateParticles());
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{ 
              x: `${particle.x}vw`, 
              y: `${particle.y}vh`, 
              opacity: 0,
              rotate: particle.rotation 
            }}
            animate={{ 
              y: '120vh', 
              opacity: [0, 1, 1, 0],
              rotate: particle.rotation + 360
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: particle.duration,
              delay: particle.delay,
              ease: "linear",
              repeat: Infinity,
              repeatDelay: Math.random() * 5
            }}
            style={{
              position: 'absolute',
              width: particle.isHeart ? `${particle.size}px` : `${particle.size}px`,
              height: particle.isHeart ? `${particle.size}px` : `${particle.size}px`,
              background: particle.isHeart ? 'transparent' : particle.color,
              borderRadius: particle.isHeart ? '0' : '50%',
              boxShadow: particle.isHeart ? 'none' : `0 0 ${particle.size * 2}px ${particle.color}`,
            }}
          >
            {particle.isHeart && (
              <svg 
                viewBox="0 0 24 24" 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  fill: particle.color
                }}
              >
                <path d={particle.path} />
              </svg>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default GlitterHearts;
