import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftRight, Sparkles, HelpCircle } from 'lucide-react';

const BeforeAfterSlider: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-gold-400 font-medium tracking-wider uppercase text-xs flex items-center justify-center gap-1.5 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-gold-500 animate-pulse" />
            Interactive Results
          </span>
          <h2 className="text-3xl md:text-4xl font-serif text-gold-900 font-medium tracking-tight mb-4">
            Visualise The Transformation
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mb-6" />
          <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Drag the gold slider handle left and right to compare the subtle details of our signature lip enhancement treatment.
          </p>
        </div>

        {/* Slider Frame Container */}
        <div className="max-w-2xl mx-auto relative select-none">
          
          {/* Note overlay to indicate client paired photo readiness */}
          <div className="absolute -top-12 right-0 flex items-center gap-1.5 text-xs text-gold-600 bg-gold-50/80 border border-gold-200/50 px-3 py-1.5 rounded-full shadow-sm z-10">
            <HelpCircle className="w-3.5 h-3.5 text-gold-500" />
            <span>Interactive Demo: drag gold bar</span>
          </div>

          <div 
            ref={containerRef}
            onMouseDown={() => setIsDragging(true)}
            onTouchStart={() => setIsDragging(true)}
            className="relative w-full aspect-[4/5] sm:aspect-[4/3] rounded-2xl overflow-hidden border-2 border-gold-500/20 shadow-2xl bg-zinc-950 cursor-ew-resize"
          >
            {/* 1. Bottom Image (After - Full View) */}
            <img 
              src="/luxury_lip_filler.png" 
              alt="After Treatment" 
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            />
            
            {/* After Badge Label */}
            <div className="absolute bottom-6 right-6 z-10 bg-black/60 backdrop-blur-sm border border-gold-500/30 text-gold-300 text-xs sm:text-sm font-semibold tracking-widest uppercase px-4 py-2 rounded-lg pointer-events-none">
              After Treatment
            </div>

            {/* 2. Top Image (Before - Clipped View) */}
            <div 
              className="absolute top-0 left-0 bottom-0 overflow-hidden z-0 pointer-events-none"
              style={{ width: `${sliderPosition}%` }}
            >
              {/* Image width matches parent container aspect, forced size to prevent stretch */}
              <img 
                src="/luxury_lip_filler.png" 
                alt="Before Treatment" 
                className="absolute top-0 left-0 w-full h-full object-cover max-w-none filter saturate-[0.65] contrast-[0.92] brightness-[0.95]"
                style={{ 
                  width: containerRef.current ? `${containerRef.current.offsetWidth}px` : '100vw',
                  height: '100%'
                }}
              />
              
              {/* Before Badge Label */}
              <div className="absolute bottom-6 left-6 z-10 bg-black/60 backdrop-blur-sm border border-white/20 text-white/80 text-xs sm:text-sm font-semibold tracking-widest uppercase px-4 py-2 rounded-lg">
                Before
              </div>
            </div>

            {/* 3. Gold Sliding Bar Handle */}
            <div 
              className="absolute top-0 bottom-0 w-0.5 bg-gradient-to-b from-gold-300 via-gold-500 to-gold-300 z-10 pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              {/* Pulsing Drag Circle */}
              <div 
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-2 border-gold-400 bg-black flex items-center justify-center shadow-lg transition-transform duration-300 ${
                  isDragging ? 'scale-115 border-gold-500 shadow-gold-500/20' : 'hover:scale-105'
                }`}
              >
                {/* Drag arrows */}
                <ArrowLeftRight className="w-5 h-5 text-gold-400 animate-pulse" />
              </div>
            </div>

          </div>

          {/* Quick instructions for drag trigger */}
          <p className="text-center text-xs text-gray-400 mt-4 italic">
            *Click/tap and slide the golden arrows to witness the lip filler transformation.
          </p>

        </div>

      </div>
    </section>
  );
};

export default BeforeAfterSlider;
