
import { supabase } from "@/integrations/supabase/client";
import { ContentFilter, ContentItem, ContentCategory } from "@/types/content";

export const contentService = {
  async getContent(filter: ContentFilter = {}): Promise<ContentItem[]> {
    let query = supabase
      .from("content")
      .select("*")
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (filter.category) {
      query = query.eq("category", filter.category);
    }

    if (filter.mediaType) {
      query = query.eq("media_type", filter.mediaType);
    }

    if (filter.featured !== undefined) {
      query = query.eq("is_featured", filter.featured);
    }

    if (filter.limit) {
      query = query.limit(filter.limit);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching content:", error);
      throw error;
    }

    return data || [];
  },

  async getContentByCategory(category: ContentCategory): Promise<ContentItem[]> {
    return this.getContent({ category });
  },

  async getFeaturedContent(): Promise<ContentItem[]> {
    return this.getContent({ featured: true });
  },

  async incrementViewCount(id: string): Promise<void> {
    const { error } = await supabase.rpc('increment_view_count', { content_id: id });
    
    if (error) {
      console.error("Error incrementing view count:", error);
    }
  }
};
