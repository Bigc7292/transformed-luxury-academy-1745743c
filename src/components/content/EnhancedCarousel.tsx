import React, { useState, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { contentService } from "@/services/contentService";
import { ContentItem, PageSection } from "@/types/content";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Maximize2, Play } from "lucide-react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface EnhancedCarouselProps {
  pageLocation: string;
  pageSection: PageSection;
  title?: string;
  description?: string;
  autoPlay?: boolean;
  interval?: number;
  fullWidth?: boolean;
  showControls?: boolean;
  height?: string;
  effect?: "fade" | "slide" | "zoom";
}

const EnhancedCarousel: React.FC<EnhancedCarouselProps> = ({
  pageLocation,
  pageSection,
  title,
  description,
  autoPlay = true,
  interval = 5000,
  fullWidth = false,
  showControls = true,
  height = "500px",
  effect = "fade"
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  const { data: content, isLoading, error } = useQuery({
    queryKey: ["content", "enhanced-carousel", pageLocation, pageSection],
    queryFn: () => contentService.getContentForPageSection(pageLocation, pageSection),
  });

  const nextSlide = useCallback(() => {
    if (!content?.length) return;
    setActiveIndex((prev) => (prev + 1) % content.length);
  }, [content]);

  const prevSlide = useCallback(() => {
    if (!content?.length) return;
    setActiveIndex((prev) => (prev - 1 + content.length) % content.length);
  }, [content]);

  useEffect(() => {
    if (!isPlaying || !content?.length) return;
    
    const timer = setInterval(() => {
      nextSlide();
    }, interval);
    
    return () => clearInterval(timer);
  }, [isPlaying, content, interval, nextSlide]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const openItemDetail = (item: ContentItem) => {
    setSelectedItem(item);
  };

  const getAnimationVariants = () => {
    switch (effect) {
      case "fade":
        return {
          enter: { opacity: 0 },
          center: { opacity: 1 },
          exit: { opacity: 0 }
        };
      case "slide":
        return {
          enter: { x: 300, opacity: 0 },
          center: { x: 0, opacity: 1 },
          exit: { x: -300, opacity: 0 }
        };
      case "zoom":
        return {
          enter: { scale: 0.8, opacity: 0 },
          center: { scale: 1, opacity: 1 },
          exit: { scale: 1.2, opacity: 0 }
        };
      default:
        return {
          enter: { opacity: 0 },
          center: { opacity: 1 },
          exit: { opacity: 0 }
        };
    }
  };

  const renderCarouselItem = (item: ContentItem, isActive: boolean) => {
    if (item.media_type === "video") {
      return (
        <div className="relative w-full h-full overflow-hidden rounded-lg">
          <video 
            className="w-full h-full object-cover"
            src={item.url}
            poster={item.thumbnail_url || undefined}
            controls={false}
            autoPlay={isActive}
            muted
            loop
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
            <h3 className="text-2xl md:text-3xl font-serif text-white mb-2">{item.title}</h3>
            {item.description && <p className="text-sm md:text-base text-white/90 max-w-2xl">{item.description}</p>}
            <div className="flex mt-4 space-x-3">
              <Dialog>
                <DialogTrigger asChild>
                  <button className="flex items-center px-4 py-2 bg-gold-500 text-white rounded-full hover:bg-gold-600 transition-colors">
                    <Play size={16} className="mr-2" /> Watch Video
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl p-2 bg-black/90">
                  <video 
                    src={item.url}
                    className="max-h-[80vh] max-w-full"
                    controls
                    autoPlay
                  />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      );
    }
    
    return (
      <div className="relative w-full h-full overflow-hidden rounded-lg">
        <img 
          src={item.url} 
          alt={item.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
          <h3 className="text-2xl md:text-3xl font-serif text-white mb-2">{item.title}</h3>
          {item.description && <p className="text-sm md:text-base text-white/90 max-w-2xl">{item.description}</p>}
          <div className="flex mt-4">
            <Dialog>
              <DialogTrigger asChild>
                <button className="flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition-colors">
                  <Maximize2 size={16} className="mr-2" /> View Full Size
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-5xl p-2 bg-black/90">
                <img 
                  src={item.url} 
                  alt={item.title} 
                  className="max-h-[80vh] max-w-full object-contain"
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className={fullWidth ? "w-full" : "container mx-auto px-4"}>
        {title && <Skeleton className="h-10 w-1/3 mb-2" />}
        {description && <Skeleton className="h-6 w-2/3 mb-6" />}
        <Skeleton className={`w-full rounded-lg`} style={{ height }} />
      </div>
    );
  }

  if (error || !content?.length) {
    return null; // Don't show anything if there's an error or no content
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={fullWidth ? "w-full" : "container mx-auto px-4 py-10"}
    >
      {title && (
        <h2 className="text-3xl font-serif text-gold-700 mb-2">{title}</h2>
      )}
      {description && (
        <p className="text-muted-foreground mb-6">{description}</p>
      )}
      
      <div 
        className="relative overflow-hidden rounded-lg"
        style={{ height }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial="enter"
            animate="center"
            exit="exit"
            variants={getAnimationVariants()}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            {renderCarouselItem(content[activeIndex], true)}
          </motion.div>
        </AnimatePresence>
        
        {showControls && content.length > 1 && (
          <>
            <button 
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/50 transition-colors z-10"
              aria-label="Previous slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6"/>
              </svg>
            </button>
            <button 
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/50 transition-colors z-10"
              aria-label="Next slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </button>
            <button
              onClick={togglePlayPause}
              className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/50 transition-colors z-10"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="6" y="4" width="4" height="16"/>
                  <rect x="14" y="4" width="4" height="16"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3"/>
                </svg>
              )}
            </button>
          </>
        )}
      </div>
      
      {/* Thumbnail Navigation */}
      {content.length > 1 && (
        <div className="flex justify-center mt-4 space-x-2 overflow-x-auto py-2">
          {content.map((item, index) => (
            <button
              key={index}
              className={`relative rounded-md overflow-hidden transition-all ${
                index === activeIndex 
                  ? 'ring-2 ring-gold-500 ring-offset-2' 
                  : 'opacity-70 hover:opacity-100'
              }`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            >
              <div className="w-16 h-12 md:w-20 md:h-14">
                {item.media_type === "video" ? (
                  <div className="relative w-full h-full">
                    <img 
                      src={item.thumbnail_url || item.url} 
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <Play size={16} className="text-white" />
                    </div>
                  </div>
                ) : (
                  <img 
                    src={item.url} 
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default EnhancedCarousel;
