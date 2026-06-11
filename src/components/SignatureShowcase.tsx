import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Maximize2, X, ChevronLeft, ChevronRight, Sparkles, Eye } from 'lucide-react';

interface MediaItem {
  id: number;
  type: 'video' | 'image';
  src: string;
  title: string;
  subtitle: string;
  category: string;
  spanClass: string;
}

const SignatureShowcase: React.FC = () => {
  const [activeMediaIndex, setActiveMediaIndex] = useState<number | null>(null);

  const mediaItems: MediaItem[] = [
    {
      id: 1,
      type: 'video',
      src: '/WhatsApp Video 2026-06-09 at 12.17.03 AM.mp4',
      title: 'Real Clinical Journey',
      subtitle: 'Experience the premium care and meticulous technique behind our signature results.',
      category: 'Video Tour',
      spanClass: 'lg:col-span-2 lg:row-span-2 aspect-[4/3] lg:aspect-auto h-full min-h-[320px]'
    },
    {
      id: 2,
      type: 'image',
      src: '/luxury_lip_filler.png',
      title: 'Signature Lip Artistry',
      subtitle: 'Custom-designed lips focusing on border crispness, symmetry, and natural volume.',
      category: 'Lip Enhancements',
      spanClass: 'aspect-[4/5] sm:aspect-square lg:aspect-auto min-h-[240px]'
    },
    {
      id: 3,
      type: 'image',
      src: '/WhatsApp Image 2026-06-09 at 12.14.46 AM.png',
      title: 'Luxe Clinical Suite',
      subtitle: 'Relax in our state-of-the-art Cardiff Bay medical aesthetics studio.',
      category: 'Clinic Experience',
      spanClass: 'aspect-[4/5] sm:aspect-square lg:aspect-auto min-h-[240px]'
    },
    {
      id: 4,
      type: 'image',
      src: '/WhatsApp Image 2026-06-09 at 12.15.07 AM.png',
      title: 'Facial Contouring',
      subtitle: 'Defining jawlines, lifting cheeks, and restoring facial balance for a sculpted profile.',
      category: 'Facial Contouring',
      spanClass: 'aspect-[4/5] sm:aspect-square lg:aspect-auto min-h-[240px]'
    },
    {
      id: 5,
      type: 'image',
      src: '/WhatsApp Image 2026-06-09 at 12.15.45 AM.png',
      title: 'Liquid Rhinoplasty',
      subtitle: 'Non-surgical profile correction to smooth bumps, elevate the tip, and refine symmetry.',
      category: 'Liquid Rhinoplasty',
      spanClass: 'aspect-[4/5] sm:aspect-square lg:aspect-auto min-h-[240px]'
    }
  ];

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeMediaIndex !== null) {
      setActiveMediaIndex((activeMediaIndex + 1) % mediaItems.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeMediaIndex !== null) {
      setActiveMediaIndex((activeMediaIndex - 1 + mediaItems.length) % mediaItems.length);
    }
  };

  // Stagger animation container
  const gridContainerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const gridItemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 15
      }
    }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gold-50/30 overflow-hidden border-t border-gold-200/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Elegant Section Header */}
        <div className="text-center mb-16 relative">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-gold-500 font-serif italic text-lg mb-2 block tracking-wider"
          >
            The Art of Refinement
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-serif text-gold-900 font-medium tracking-tight mb-4"
          >
            Signature Transformations
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mb-6"
          />
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed"
          >
            Witness the synthesis of medical expertise and bespoke aesthetics. Every treatment is custom-tailored to enhance and harmonize your natural features.
          </motion.p>
        </div>

        {/* Premium Bento Grid */}
        <motion.div
          variants={gridContainerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch"
        >
          {mediaItems.map((item, index) => (
            <motion.div
              key={item.id}
              variants={gridItemVariants}
              onClick={() => setActiveMediaIndex(index)}
              className={`group relative rounded-2xl overflow-hidden cursor-pointer shadow-xl border border-gold-500/10 bg-black flex flex-col justify-between ${item.spanClass}`}
            >
              {/* Gold Ambient Glow on Card Border */}
              <div className="absolute inset-0 bg-gradient-to-tr from-gold-500/0 via-gold-500/0 to-gold-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
              
              {/* Media Content */}
              <div className="relative w-full h-full overflow-hidden flex-1">
                {item.type === 'video' ? (
                  <>
                    <video
                      className="w-full h-full object-cover opacity-80 group-hover:scale-102 transition-transform duration-700 ease-out"
                      src={item.src}
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                    {/* Centered Pulse Button */}
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <div className="w-14 h-14 rounded-full bg-gold-500/90 text-black flex items-center justify-center shadow-lg shadow-gold-500/20 group-hover:scale-110 transition-all duration-300">
                        <Play className="w-5 h-5 fill-current ml-0.5 text-black" />
                      </div>
                    </div>
                  </>
                ) : (
                  <img
                    className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700 ease-out"
                    src={item.src}
                    alt={item.title}
                    loading="lazy"
                  />
                )}
                
                {/* Immersive Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-100 transition-all duration-500 group-hover:from-black/95 z-0" />

                {/* Floating Category Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="text-[10px] sm:text-xs font-semibold tracking-wider text-gold-300 uppercase bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-gold-500/20 flex items-center gap-1.5 shadow-md">
                    <Sparkles className="w-3 h-3 text-gold-400" />
                    {item.category}
                  </span>
                </div>

                {/* Card Title & Subtitle */}
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 z-10 text-white flex flex-col justify-end">
                  <h3 className="text-xl sm:text-2xl font-serif text-gold-100 group-hover:text-gold-300 transition-colors duration-300 mb-2 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-300 line-clamp-2 opacity-90 group-hover:text-white transition-colors duration-300 leading-relaxed max-w-md">
                    {item.subtitle}
                  </p>
                  
                  {/* Action Reveal Icon */}
                  <div className="mt-4 flex items-center gap-1.5 text-xs text-gold-400 font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    {item.type === 'video' ? 'Play Video' : 'View Details'}
                    <Eye className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Global Lightbox / Media Viewer */}
        <AnimatePresence>
          {activeMediaIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveMediaIndex(null)}
              className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 p-4 md:p-8 backdrop-blur-md select-none"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveMediaIndex(null)}
                className="absolute top-6 right-6 z-50 text-white/80 hover:text-gold-400 p-2.5 bg-black/50 border border-white/10 hover:border-gold-500/30 rounded-full transition-all"
                aria-label="Close viewer"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Navigation Controls */}
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-4 md:left-8 z-40 text-white/80 hover:text-gold-400 p-3 bg-black/40 border border-white/5 hover:border-gold-500/20 rounded-full transition-all"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
              </button>
              
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-4 md:right-8 z-40 text-white/80 hover:text-gold-400 p-3 bg-black/40 border border-white/5 hover:border-gold-500/20 rounded-full transition-all"
                aria-label="Next slide"
              >
                <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
              </button>

              {/* Media Content Wrapper */}
              <div 
                onClick={(e) => e.stopPropagation()} 
                className="relative w-full max-w-4xl max-h-[75vh] rounded-2xl overflow-hidden border border-gold-500/30 shadow-2xl bg-zinc-950 flex flex-col items-center justify-center"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeMediaIndex}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full flex items-center justify-center aspect-[16/9] md:aspect-video"
                  >
                    {mediaItems[activeMediaIndex].type === 'video' ? (
                      <video
                        className="w-full h-full max-h-[75vh]"
                        src={mediaItems[activeMediaIndex].src}
                        controls
                        autoPlay
                        playsInline
                      />
                    ) : (
                      <img
                        className="w-full h-full max-h-[75vh] object-contain"
                        src={mediaItems[activeMediaIndex].src}
                        alt={mediaItems[activeMediaIndex].title}
                      />
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Lightbox Footer (Metadata) */}
              <div 
                onClick={(e) => e.stopPropagation()} 
                className="text-center mt-6 max-w-2xl px-4"
              >
                <span className="text-xs font-semibold tracking-wider text-gold-400 uppercase bg-gold-950/40 border border-gold-500/20 px-3 py-1 rounded-full mb-3 inline-block">
                  {mediaItems[activeMediaIndex].category}
                </span>
                <h3 className="text-2xl font-serif text-white mb-2 leading-tight">
                  {mediaItems[activeMediaIndex].title}
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {mediaItems[activeMediaIndex].subtitle}
                </p>
                <span className="text-[11px] text-gray-500 mt-3 block">
                  {activeMediaIndex + 1} of {mediaItems.length}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default SignatureShowcase;
