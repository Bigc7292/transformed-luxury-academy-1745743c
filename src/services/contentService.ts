
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

  async getContentById(id: string): Promise<ContentItem | null> {
    const { data, error } = await supabase
      .from("content")
      .select("*")
      .eq("id", id)
      .single();
      
    if (error) {
      console.error("Error fetching content item:", error);
      return null;
    }
    
    return data;
  },
  
  async createContent(content: Partial<ContentItem>): Promise<{ success: boolean; data?: ContentItem; error?: string }> {
    const { data, error } = await supabase
      .from("content")
      .insert(content)
      .select()
      .single();
      
    if (error) {
      console.error("Error creating content:", error);
      return { success: false, error: error.message };
    }
    
    return { success: true, data };
  },
  
  async updateContent(id: string, content: Partial<ContentItem>): Promise<{ success: boolean; data?: ContentItem; error?: string }> {
    const { data, error } = await supabase
      .from("content")
      .update(content)
      .eq("id", id)
      .select()
      .single();
      
    if (error) {
      console.error("Error updating content:", error);
      return { success: false, error: error.message };
    }
    
    return { success: true, data };
  },
  
  async deleteContent(id: string): Promise<{ success: boolean; error?: string }> {
    const { error } = await supabase
      .from("content")
      .delete()
      .eq("id", id);
      
    if (error) {
      console.error("Error deleting content:", error);
      return { success: false, error: error.message };
    }
    
    return { success: true };
  },

  async incrementViewCount(id: string): Promise<void> {
    // First, get the current view_count
    const { data, error: fetchError } = await supabase
      .from("content")
      .select("view_count")
      .eq("id", id)
      .single();
    
    if (fetchError) {
      console.error("Error fetching view count:", fetchError);
      return;
    }
    
    // Increment the view_count
    const currentCount = data.view_count || 0;
    const newCount = currentCount + 1;
    
    // Update with the new count
    const { error: updateError } = await supabase
      .from("content")
      .update({ view_count: newCount })
      .eq("id", id);
    
    if (updateError) {
      console.error("Error incrementing view count:", updateError);
    }
  }
};
