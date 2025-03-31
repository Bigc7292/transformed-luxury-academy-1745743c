
import { useState } from "react";
import { ContentCategory, ContentItem, MediaType } from "@/types/content";

export const useContentFilters = (content: ContentItem[] | undefined) => {
  const [categoryFilter, setCategoryFilter] = useState<ContentCategory | 'all'>('all');
  const [mediaTypeFilter, setMediaTypeFilter] = useState<MediaType | 'all'>('all');
  const [pageLocationFilter, setPageLocationFilter] = useState<string | 'all'>('all');
  const [activeFilter, setActiveFilter] = useState<boolean | 'all'>('all');

  const filteredContent: ContentItem[] = content ? content.filter(item => {
    if (categoryFilter !== 'all' && item.category !== categoryFilter) return false;
    if (mediaTypeFilter !== 'all' && item.media_type !== mediaTypeFilter) return false;
    if (pageLocationFilter !== 'all') {
      if (pageLocationFilter === 'not_assigned' && item.page_location) return false;
      if (pageLocationFilter !== 'not_assigned' && item.page_location !== pageLocationFilter) return false;
    }
    if (activeFilter !== 'all' && item.active !== activeFilter) return false;
    return true;
  }) : [];

  return {
    filters: {
      categoryFilter,
      setCategoryFilter,
      mediaTypeFilter,
      setMediaTypeFilter,
      pageLocationFilter,
      setPageLocationFilter,
      activeFilter,
      setActiveFilter
    },
    filteredContent
  };
};
