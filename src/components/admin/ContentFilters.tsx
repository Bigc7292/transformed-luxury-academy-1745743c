
import React from 'react';
import { 
  ContentCategory, 
  MediaType, 
  PAGE_LOCATIONS
} from '@/types/content';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ContentFiltersProps {
  categoryFilter: ContentCategory | 'all';
  setCategoryFilter: (value: ContentCategory | 'all') => void;
  mediaTypeFilter: MediaType | 'all';
  setMediaTypeFilter: (value: MediaType | 'all') => void;
  pageLocationFilter?: string | 'all';
  setPageLocationFilter?: (value: string | 'all') => void;
  activeFilter?: boolean | 'all';
  setActiveFilter?: (value: boolean | 'all') => void;
}

const ContentFilters: React.FC<ContentFiltersProps> = ({
  categoryFilter,
  setCategoryFilter,
  mediaTypeFilter,
  setMediaTypeFilter,
  pageLocationFilter = 'all',
  setPageLocationFilter,
  activeFilter = 'all',
  setActiveFilter
}) => {
  return (
    <div className="flex flex-wrap gap-3">
      <div>
        <Select 
          value={categoryFilter} 
          onValueChange={(value) => setCategoryFilter(value as ContentCategory | 'all')}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="promotional">Promotional</SelectItem>
            <SelectItem value="staff">Staff</SelectItem>
            <SelectItem value="awards">Awards</SelectItem>
            <SelectItem value="ceo">CEO</SelectItem>
            <SelectItem value="partner">Partner</SelectItem>
            <SelectItem value="videos">Videos</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Select
          value={mediaTypeFilter}
          onValueChange={(value) => setMediaTypeFilter(value as MediaType | 'all')}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Media Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="image">Images</SelectItem>
            <SelectItem value="video">Videos</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {setPageLocationFilter && (
        <div>
          <Select
            value={pageLocationFilter}
            onValueChange={(value) => setPageLocationFilter(value as string | 'all')}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Page Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Pages</SelectItem>
              <SelectItem value="not_assigned">Not Assigned</SelectItem>
              {PAGE_LOCATIONS.map((location) => (
                <SelectItem key={location.value} value={location.value}>
                  {location.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
      
      {setActiveFilter && (
        <div>
          <Select
            value={String(activeFilter)}
            onValueChange={(value) => {
              if (value === 'all') {
                setActiveFilter('all');
              } else {
                setActiveFilter(value === 'true');
              }
            }}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="true">Active</SelectItem>
              <SelectItem value="false">Hidden</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
};

export default ContentFilters;
