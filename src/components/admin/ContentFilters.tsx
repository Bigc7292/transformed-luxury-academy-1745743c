
import React from "react";
import { ContentCategory, MediaType } from "@/types/content";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
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
}

const ContentFilters: React.FC<ContentFiltersProps> = ({
  categoryFilter,
  setCategoryFilter,
  mediaTypeFilter,
  setMediaTypeFilter,
}) => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Content Filters</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/2">
          <label className="block text-sm font-medium mb-1">Category</label>
          <Select 
            value={categoryFilter} 
            onValueChange={(value) => setCategoryFilter(value as ContentCategory | 'all')}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="promotional">Promotional</SelectItem>
              <SelectItem value="staff">Staff</SelectItem>
              <SelectItem value="awards">Awards</SelectItem>
              <SelectItem value="ceo">CEO</SelectItem>
              <SelectItem value="founder">Founder</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full md:w-1/2">
          <label className="block text-sm font-medium mb-1">Media Type</label>
          <Select 
            value={mediaTypeFilter} 
            onValueChange={(value) => setMediaTypeFilter(value as MediaType | 'all')}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select media type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Media Types</SelectItem>
              <SelectItem value="image">Images</SelectItem>
              <SelectItem value="video">Videos</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContentFilters;
