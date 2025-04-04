import React, { useState } from "react";
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
import { motion } from "framer-motion";

interface ContentCarouselProps {
  pageLocation: string;
  pageSection: PageSection;
  title?: string;
  description?: string;
  autoPlay?: boolean;
  interval?: number;
}

const ContentCarousel: React.FC<ContentCarouselProps> = ({
  pageLocation,
  pageSection,
  title,
  description,
  autoPlay = true,
  interval = 5000
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const { data: content, isLoading, error } = useQuery({
    queryKey: ["content", "carousel", pageLocation, pageSection],
    queryFn: () => contentService.getContentForPageSection(pageLocation, pageSection),
  });

  React.useEffect(() => {
    if (!autoPlay || !content?.length) return;
    
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % (content.length || 1));
    }, interval);
    
    return () => clearInterval(timer);
  }, [autoPlay, content, interval]);

  const renderCarouselItem = (item: ContentItem) => {
    if (item.media_type === "video") {
      return (
        <div className="relative h-96 w-full overflow-hidden rounded-lg">
          <video 
            className="w-full h-full object-cover"
            src={item.url}
            poster={item.thumbnail_url || undefined}
            controls={false}
            autoPlay
            muted
            loop
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent">
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <h3 className="text-2xl font-serif mb-2">{item.title}</h3>
              {item.description && <p className="text-sm text-white/80">{item.description}</p>}
            </div>
          </div>
        </div>
      );
    }
    
    return (
      <div className="relative h-96 w-full overflow-hidden rounded-lg">
        <img 
          src="public/lovable-uploads/decb2b79-3774-449a-b7b7-479a89096676.png" 
          alt="Treatment Image" 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent">
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <h3 className="text-2xl font-serif mb-2">{item.title}</h3>
            {item.description && <p className="text-sm text-white/80">{item.description}</p>}
          </div>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-10">
        {title && <Skeleton className="h-10 w-1/3 mb-2" />}
        {description && <Skeleton className="h-6 w-2/3 mb-6" />}
        <Skeleton className="h-96 w-full rounded-lg" />
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
      className="container mx-auto px-4 py-10"
    >
      {title && (
        <h2 className="text-3xl font-serif text-salon-pink-700 mb-2">{title}</h2>
      )}
      {description && (
        <p className="text-muted-foreground mb-6">{description}</p>
      )}
      
      <Carousel className="mx-auto">
        <CarouselContent>
          {content.map((item, index) => (
            <CarouselItem key={item.id}>
              {renderCarouselItem(item)}
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>
      
      <div className="flex justify-center mt-4 space-x-2">
        {content.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === activeIndex ? "bg-salon-pink-500" : "bg-salon-pink-200"
            }`}
            onClick={() => setActiveIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default ContentCarousel;
