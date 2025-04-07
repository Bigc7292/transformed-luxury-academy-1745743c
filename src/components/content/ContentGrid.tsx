import React from "react";
import { useQuery } from "@tanstack/react-query";
import { contentService } from "@/services/contentService";
import { ContentItem, PageSection } from "@/types/content";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import ContentCard from "./ContentCard";

interface ContentGridProps {
  pageLocation: string;
  pageSection: PageSection;
  title?: string;
  description?: string;
  columns?: 1 | 2 | 3 | 4;
  limit?: number;
  className?: string;
}

const ContentGrid: React.FC<ContentGridProps> = ({
  pageLocation,
  pageSection,
  title,
  description,
  columns = 3,
  limit,
  className
}) => {
  const { data: content, isLoading, error } = useQuery({
    queryKey: ["content", "grid", pageLocation, pageSection],
    queryFn: () => contentService.getContentForPageSection(pageLocation, pageSection),
  });

  const getGridClass = () => {
    switch (columns) {
      case 1: return "grid-cols-1";
      case 2: return "grid-cols-1 md:grid-cols-2";
      case 3: return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
      case 4: return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
      default: return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
    }
  };

  // Show limited content if specified
  const displayContent = limit ? content?.slice(0, limit) : content;

  if (isLoading) {
    return (
      <div className={`container mx-auto px-4 py-10 ${className}`}>
        {title && <Skeleton className="h-10 w-1/3 mb-2" />}
        {description && <Skeleton className="h-6 w-2/3 mb-6" />}
        <div className={`grid ${getGridClass()} gap-6`}>
          {Array(columns * 2).fill(0).map((_, i) => (
            <div key={i} className="flex flex-col space-y-3">
              <Skeleton className="h-[250px] w-full rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error || !displayContent?.length) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="relative h-96 w-full overflow-hidden rounded-lg">
          <img 
            src="public/lovable-uploads/decb2b79-3774-449a-b7b7-479a89096676.png" 
            alt="Treatment Image" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`container mx-auto px-4 py-10 ${className}`}
    >
      {title && (
        <h2 className="text-3xl font-serif text-salon-pink-700 mb-2">{title}</h2>
      )}
      {description && (
        <p className="text-muted-foreground mb-6">{description}</p>
      )}
      
      <div className={`grid ${getGridClass()} gap-6`}>
        {displayContent.map((item) => (
          <ContentCard key={item.id} item={item} />
        ))}
      </div>
    </motion.div>
  );
};

export default ContentGrid;
