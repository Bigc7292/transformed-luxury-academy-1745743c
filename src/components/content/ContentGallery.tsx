
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { contentService } from "@/services/contentService";
import { ContentFilter, ContentItem } from "@/types/content";
import ContentCard from "./ContentCard";
import { Skeleton } from "@/components/ui/skeleton";

interface ContentGalleryProps {
  filter?: ContentFilter;
  title?: string;
  description?: string;
  columns?: 1 | 2 | 3 | 4;
}

const ContentGallery: React.FC<ContentGalleryProps> = ({
  filter = {},
  title,
  description,
  columns = 3,
}) => {
  const { data: content, isLoading, error } = useQuery({
    queryKey: ["content", filter],
    queryFn: () => contentService.getContent(filter),
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

  const renderContent = () => {
    if (isLoading) {
      return Array(6).fill(0).map((_, i) => (
        <div key={i} className="flex flex-col space-y-3">
          <Skeleton className="h-[250px] w-full rounded-lg" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      ));
    }

    if (error) {
      return (
        <div className="col-span-full text-center py-12">
          <p className="text-red-500">Error loading content. Please try again later.</p>
        </div>
      );
    }

    if (!content?.length) {
      return (
        <div className="col-span-full text-center py-12">
          <p className="text-muted-foreground">No content found.</p>
        </div>
      );
    }

    return content.map((item) => (
      <ContentCard key={item.id} item={item} />
    ));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {title && (
        <h2 className="text-3xl font-serif text-salon-pink-700 mb-2">{title}</h2>
      )}
      {description && (
        <p className="text-muted-foreground mb-6">{description}</p>
      )}
      <div className={`grid ${getGridClass()} gap-6`}>
        {renderContent()}
      </div>
    </div>
  );
};

export default ContentGallery;
