

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BOOKING_URL } from '../data/serviceCategories';
import { Play, X, Sparkles, Award } from 'lucide-react';

const AnimatedCounter = ({ value, duration = 1.5 }: { value: number; duration?: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrameId: number;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * value));
      
      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };
    
    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [value, duration]);

  return <>{count}</>;
};

const Hero = () => {
  const navigate = useNavigate();
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Animation variants for text sweep effect
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const wordVariants = {
    hidden: (i: number) => ({
      opacity: 0,
      x: i % 2 === 0 ? -50 : 50, // Even words come from left, odd from right
    }),
    show: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        damping: 12,
      }
    }
  };

  // The words to be animated
  const animatedText = [
    "Premium", "Advanced", "Aesthetics", "Treatments,", "Skin",
    "Analysis", "Specialist,", "Hair", "Care", "Treatments",
    "And", "Fully", "Qualified", "Level", "5", "Educator"
  ];

  return (
    <div className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-gold-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10 pt-28 pb-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-gold-800 mt-2 leading-tight">
                Transformed <span className="text-gold-500 block sm:inline">Academy and Salon</span>
              </h1>

              {/* Animated sweeping text */}
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="mt-6 flex flex-wrap justify-center lg:justify-start"
              >
                {animatedText.map((word, i) => (
                  <motion.span
                    key={i}
                    custom={i}
                    variants={wordVariants}
                    className="text-lg text-gray-600 mr-2 mb-1"
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <a
                href={BOOKING_URL}
                className="btn-primary flex items-center justify-center gap-2 shadow-lg shadow-gold-500/25 hover:shadow-gold-500/40"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Sparkles className="w-4 h-4 text-black animate-pulse" />
                Book Consultation
              </a>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => {
                  navigate('/services');
                }}
              >
                Explore Services
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-8"
            >
              <div className="text-center px-4">
                <p className="text-3xl font-serif text-gold-500">
                  <AnimatedCounter value={500} />+
                </p>
                <p className="text-sm text-gray-500">Happy Clients</p>
              </div>
              <div className="hidden sm:block h-10 w-px bg-gold-200"></div>
              <div className="text-center px-4">
                <p className="text-3xl font-serif text-gold-500">
                  <AnimatedCounter value={15} />+
                </p>
                <p className="text-sm text-gray-500">Expert Services</p>
              </div>
              <div className="hidden sm:block h-10 w-px bg-gold-200"></div>
              <div className="text-center px-4">
                <p className="text-3xl font-serif text-gold-500">
                  <AnimatedCounter value={10} />+
                </p>
                <p className="text-sm text-gray-500">Years Experience</p>
              </div>
            </motion.div>
          </div>

          <div className="lg:w-1/2 relative w-full px-4 sm:px-0">
            {/* Ambient Background Glows */}
            <div className="absolute top-1/3 -right-12 w-48 h-48 bg-gold-200 rounded-full blur-3xl opacity-40"></div>
            <div className="absolute bottom-1/4 -left-12 w-48 h-48 bg-zinc-200 rounded-full blur-3xl opacity-40"></div>

            {/* Main Interactive Video Card Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative z-10 mx-auto max-w-lg lg:max-w-none group"
            >
              {/* Gold border decorative shadow effect */}
              <div className="absolute inset-0 bg-gold-500/10 rounded-2xl blur-xl group-hover:bg-gold-500/15 transition-all duration-500" />
              
              <div className="relative rounded-2xl overflow-hidden border-2 border-gold-500/20 bg-black shadow-2xl aspect-[4/3] w-full">
                {/* Loop Video */}
                <video
                  className="w-full h-full object-cover opacity-80 group-hover:scale-102 transition-transform duration-700 ease-out"
                  src="/WhatsApp Video 2026-06-09 at 12.17.03 AM.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
                
                {/* Darker overlay on video for luxurious text/button contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/30 group-hover:from-black/70 transition-all duration-300" />

                {/* Central Pulse Button to open Lightbox */}
                <button
                  type="button"
                  onClick={() => setIsLightboxOpen(true)}
                  className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white transition-opacity duration-300 cursor-pointer"
                  aria-label="Watch Showreel"
                >
                  <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-gold-500/90 text-black shadow-lg shadow-gold-500/30 transform group-hover:scale-110 transition-transform duration-300">
                    {/* Ring animation */}
                    <div className="absolute -inset-2 rounded-full border-2 border-gold-500 animate-ping opacity-40" />
                    <Play className="w-6 h-6 fill-current ml-1" />
                  </div>
                  <span className="text-sm font-medium tracking-widest text-gold-100 uppercase bg-black/40 backdrop-blur-sm px-4 py-1.5 rounded-full border border-gold-500/30">
                    Watch Showreel
                  </span>
                </button>
              </div>

              {/* Floating Badge 1 - Top-Left: Lips Closeup */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-10 -left-4 sm:-top-10 sm:-left-12 z-20 w-20 sm:w-36 md:w-40 bg-black/80 backdrop-blur-md border border-gold-500/30 p-1.5 sm:p-2 rounded-xl shadow-xl hover:border-gold-500 hover:scale-105 transition-all duration-300"
              >
                <div className="relative aspect-[4/5] rounded-lg overflow-hidden bg-zinc-900 mb-1 sm:mb-1.5">
                  <img
                    src="/WhatsApp Image 2026-06-09 at 12.15.45 AM.png"
                    alt="Signature Lip Artistry"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center">
                  <span className="text-[8px] sm:text-xs font-semibold text-gold-400 tracking-wider flex items-center justify-center gap-0.5 sm:gap-1">
                    <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gold-500 inline" />
                    Signature Lips
                  </span>
                </div>
              </motion.div>

              {/* Floating Badge 2 - Bottom-Right: Face Treatment */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -bottom-12 -right-4 sm:-bottom-8 sm:-right-10 z-20 w-20 sm:w-36 md:w-40 bg-black/80 backdrop-blur-md border border-gold-500/30 p-1.5 sm:p-2 rounded-xl shadow-xl hover:border-gold-500 hover:scale-105 transition-all duration-300"
              >
                <div className="relative aspect-[4/5] rounded-lg overflow-hidden bg-zinc-900 mb-1 sm:mb-1.5">
                  <img
                    src="/WhatsApp Image 2026-06-09 at 12.15.07 AM.png"
                    alt="Precision Aesthetics"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center">
                  <span className="text-[8px] sm:text-xs font-semibold text-gold-400 tracking-wider flex items-center justify-center gap-0.5 sm:gap-1">
                    <Award className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gold-500 inline" />
                    Dermal Enhancements
                  </span>
                </div>
              </motion.div>

              {/* Floating Badge 3 - Top-Right: Experience */}
              <motion.div
                animate={{ y: [-5, 8, -5] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -top-8 -right-2 sm:-top-12 sm:-right-8 z-20 bg-black/85 backdrop-blur-md border border-gold-500/30 px-2 py-1 sm:px-3 sm:py-2 rounded-full shadow-lg flex items-center gap-1.5 sm:gap-2 hover:border-gold-500 transition-colors cursor-default scale-85 sm:scale-95 md:scale-100 origin-top-right"
              >
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full overflow-hidden border border-gold-500/40">
                  <img
                    src="/WhatsApp Image 2026-06-09 at 12.14.46 AM.png"
                    alt="Cardiff Clinic"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-[8px] sm:text-[9px] text-gray-400 font-medium leading-none uppercase">Location</p>
                  <p className="text-[9px] sm:text-xs font-semibold text-gold-300 leading-tight">Cardiff Bay CBBC</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Shadow */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />

      {/* Cinematic Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 md:p-8 backdrop-blur-md"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-6 right-6 z-50 text-white/80 hover:text-gold-400 p-2 bg-black/50 border border-white/10 hover:border-gold-500/30 rounded-full transition-all"
              aria-label="Close video"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Video Container inside Modal */}
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative w-full max-w-4xl max-h-[85vh] aspect-[16/9] md:aspect-video rounded-xl overflow-hidden border border-gold-500/30 shadow-2xl bg-zinc-950"
            >
              <video
                className="w-full h-full"
                src="/WhatsApp Video 2026-06-09 at 12.17.03 AM.mp4"
                controls
                autoPlay
                playsInline
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Hero;
