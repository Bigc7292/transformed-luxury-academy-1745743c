
import { Database } from "@/integrations/supabase/types";

export type ContentItem = Database["public"]["Tables"]["content"]["Row"];

// Define the database category type for direct DB operations
export type DatabaseContentCategory = Database["public"]["Enums"]["content_category"];

// Define the content category that includes frontend-only categories
export type ContentCategory = DatabaseContentCategory | "partner" | "videos";

export type MediaType = Database["public"]["Enums"]["media_type"];

export interface ContentFilter {
  category?: ContentCategory;
  mediaType?: MediaType;
  featured?: boolean;
  limit?: number;
}
