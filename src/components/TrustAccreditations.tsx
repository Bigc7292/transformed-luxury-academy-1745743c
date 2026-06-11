import React from 'react';
import { Sparkles, ShieldCheck, Award, MapPin, Star, Heart } from 'lucide-react';

interface TrustItem {
  icon: React.ReactNode;
  text: string;
}

const TrustAccreditations: React.FC = () => {
  const trustItems: TrustItem[] = [
    { icon: <Award className="w-4 h-4 text-gold-500" />, text: "Level 5 Qualified Educator" },
    { icon: <ShieldCheck className="w-4 h-4 text-gold-500" />, text: "Complications Management Trained" },
    { icon: <Heart className="w-4 h-4 text-gold-500" />, text: "Fully Licensed & Insured Clinic" },
    { icon: <MapPin className="w-4 h-4 text-gold-500" />, text: "Cardiff Bay CBBC Location" },
    { icon: <Star className="w-4 h-4 text-gold-500" />, text: "5-Star Rated Service" },
    { icon: <Sparkles className="w-4 h-4 text-gold-500" />, text: "Bespoke Facial Mapping" },
  ];

  // Duplicate items twice to ensure seamless infinite scroll regardless of viewport width
  const scrollItems = [...trustItems, ...trustItems, ...trustItems];

  return (
    <div className="w-full bg-black py-5 border-y border-gold-500/20 overflow-hidden relative z-20">
      {/* Self-contained CSS for marquee scroll effect */}
      <style>{`
        @keyframes marquee {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-33.333%, 0, 0); }
        }
        .animate-marquee-scroll {
          display: flex;
          width: max-content;
          animation: marquee 25s linear infinite;
        }
        .animate-marquee-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Shadow masks at the edges for luxury fade-in/fade-out */}
      <div className="absolute top-0 left-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

      <div className="animate-marquee-scroll flex items-center">
        {scrollItems.map((item, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          <div 
            key={index} 
            className="flex items-center gap-3 px-8 sm:px-12 text-gold-300 font-serif text-sm sm:text-base tracking-wider whitespace-nowrap cursor-default"
          >
            {item.icon}
            <span>{item.text}</span>
            {/* Divider element */}
            <span className="text-gold-500/30 ml-8 sm:ml-12 font-sans font-light">|</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustAccreditations;
