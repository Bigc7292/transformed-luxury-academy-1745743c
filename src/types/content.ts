
import { Database } from "@/integrations/supabase/types";

export type ContentItem = Database["public"]["Tables"]["content"]["Row"];

export type ContentCategory = Database["public"]["Enums"]["content_category"];

export type MediaType = Database["public"]["Enums"]["media_type"];

export interface ContentFilter {
  category?: ContentCategory;
  mediaType?: MediaType;
  featured?: boolean;
  limit?: number;
}
