
import { Database } from "@/integrations/supabase/types";

export type ContentItem = Database["public"]["Tables"]["content"]["Row"];

// Define the database category type for direct DB operations
export type DatabaseContentCategory = Database["public"]["Enums"]["content_category"];

// Define the content category that includes frontend-only categories
export type ContentCategory = DatabaseContentCategory | "partner" | "videos";

export type MediaType = Database["public"]["Enums"]["media_type"];

// Define the page section type
export type PageSection = Database["public"]["Enums"]["page_section"];

export interface ContentFilter {
  category?: ContentCategory;
  mediaType?: MediaType;
  featured?: boolean;
  pageLocation?: string;
  pageSection?: PageSection;
  active?: boolean;
  limit?: number;
}

// Type for the content placement in the admin section
export interface ContentPlacement {
  id: string;
  pageLocation: string;
  pageSection: PageSection;
  active: boolean;
}

export const PAGE_LOCATIONS = [
  { value: "home", label: "Home Page" },
  { value: "about", label: "About Page" },
  { value: "services", label: "Services Page" },
  { value: "gallery", label: "Gallery Page" },
  { value: "content", label: "Content Page" }
];

export const PAGE_SECTIONS: Record<PageSection, string> = {
  home_hero: "Home Hero Banner",
  home_featured: "Home Featured Content",
  home_carousel: "Home Carousel",
  about_gallery: "About Page Gallery",
  services_showcase: "Services Showcase",
  gallery_main: "Main Gallery",
  gallery_featured: "Featured Gallery Items",
  content_page_featured: "Content Page Featured"
};
