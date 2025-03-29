import { supabase } from "@/integrations/supabase/client";
import { ContentFilter, ContentItem, ContentCategory, DatabaseContentCategory } from "@/types/content";
import { Database } from "@/integrations/supabase/types";

type CreateContentPayload = {
  category: ContentCategory;
  media_type: ContentItem['media_type'];
  title: string;
  url: string;
} & Partial<Omit<ContentItem, 'category' | 'media_type' | 'title' | 'url'>>;

// Helper to map frontend categories to database categories
const mapToDatabaseCategory = (category: ContentCategory): DatabaseContentCategory => {
  if (category === "partner") return "founder";
  if (category === "videos") return "promotional";
  return category as DatabaseContentCategory;
};

// Helper to filter content items based on frontend-specific categories
const filterByFrontendCategory = (items: ContentItem[], category?: ContentCategory): ContentItem[] => {
  if (!category) return items;
  
  if (category === "videos") {
    return items.filter(item => item.media_type === "video");
  } else if (category === "partner") {
    return items.filter(item => item.category === "founder");
  }
  
  return items.filter(item => item.category === category);
};

export const contentService = {
  async getContent(filter: ContentFilter = {}): Promise<ContentItem[]> {
    let query = supabase
      .from("content")
      .select("*")
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: false });

    // Handle standard database categories
    if (filter.category && filter.category !== "videos") {
      const dbCategory = mapToDatabaseCategory(filter.category);
      query = query.eq("category", dbCategory);
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

    // Post-process for frontend-specific categories
    return filterByFrontendCategory(data || [], filter.category);
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
  
  async createContent(content: CreateContentPayload): Promise<{ success: boolean; data?: ContentItem; error?: string }> {
    // Map frontend categories to database categories
    const dbCategory = mapToDatabaseCategory(content.category);

    const { data, error } = await supabase
      .from("content")
      .insert({
        ...content,
        category: dbCategory
      })
      .select()
      .single();
      
    if (error) {
      console.error("Error creating content:", error);
      return { success: false, error: error.message };
    }
    
    return { success: true, data };
  },
  
  async updateContent(id: string, content: Partial<ContentItem>): Promise<{ success: boolean; data?: ContentItem; error?: string }> {
    // Handle category mapping for updates
    let updateData = { ...content };
    
    if (content.category) {
      updateData.category = mapToDatabaseCategory(content.category as ContentCategory);
    }

    const { data, error } = await supabase
      .from("content")
      .update(updateData)
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
    const { data, error: fetchError } = await supabase
      .from("content")
      .select("view_count")
      .eq("id", id)
      .single();
    
    if (fetchError) {
      console.error("Error fetching view count:", fetchError);
      return;
    }
    
    const currentCount = data.view_count || 0;
    const newCount = currentCount + 1;
    
    const { error: updateError } = await supabase
      .from("content")
      .update({ view_count: newCount })
      .eq("id", id);
    
    if (updateError) {
      console.error("Error incrementing view count:", updateError);
    }
  },

  async uploadMediaFile(file: File, path: string): Promise<{ success: boolean; url?: string; error?: string }> {
    try {
      // Generate a unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}-${Date.now()}.${fileExt}`;
      const filePath = `${path}/${fileName}`;
      
      // Upload the file to Supabase storage
      const { data, error } = await supabase.storage
        .from('content-media')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });
      
      if (error) {
        console.error('Error uploading file:', error);
        return { success: false, error: error.message };
      }
      
      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('content-media')
        .getPublicUrl(data.path);
      
      return { success: true, url: publicUrl };
    } catch (error: any) {
      console.error('Error in file upload:', error);
      return { success: false, error: error.message || 'Failed to upload file' };
    }
  }
};
