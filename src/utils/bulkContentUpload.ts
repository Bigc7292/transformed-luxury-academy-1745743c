
import { supabase } from "@/integrations/supabase/client";
import { ContentCategory, ContentItem, MediaType, DatabaseContentCategory } from "@/types/content";
import { Database } from "@/integrations/supabase/types";

export interface BulkContentItem {
  title: string;
  description?: string;
  category: ContentCategory;
  media_type: MediaType;
  url: string;
  thumbnail_url?: string;
  is_featured?: boolean;
}

// Helper to map frontend categories to database categories
const mapToDatabaseCategory = (category: ContentCategory): DatabaseContentCategory => {
  if (category === "partner") return "founder";
  if (category === "videos") return "promotional";
  return category as DatabaseContentCategory;
};

export const uploadBulkContent = async (
  items: BulkContentItem[]
): Promise<{ success: boolean; count: number; errors: string[] }> => {
  if (!items.length) {
    return { success: false, count: 0, errors: ["No items provided"] };
  }

  const errors: string[] = [];
  let successCount = 0;

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    
    try {
      // Validate required fields
      if (!item.title || !item.url || !item.category || !item.media_type) {
        errors.push(`Item ${i + 1}: Missing required fields`);
        continue;
      }

      // Map frontend categories to database categories
      const dbCategory = mapToDatabaseCategory(item.category);

      // Insert into database
      const { data, error } = await supabase
        .from("content")
        .insert({
          title: item.title,
          description: item.description || null,
          category: dbCategory,
          media_type: item.media_type,
          url: item.url,
          thumbnail_url: item.thumbnail_url || null,
          is_featured: item.is_featured || false
        })
        .select()
        .single();

      if (error) {
        errors.push(`Item ${i + 1} (${item.title}): ${error.message}`);
      } else {
        successCount++;
        console.log(`Successfully uploaded item ${i + 1}: ${item.title}`);
      }
    } catch (err: any) {
      errors.push(`Item ${i + 1} (${item.title}): ${err.message || "Unknown error"}`);
    }
  }

  return {
    success: successCount > 0,
    count: successCount,
    errors: errors,
  };
};

// Helper function to parse and validate CSV content
export const parseCsvContent = (
  csvContent: string
): { items: BulkContentItem[]; errors: string[] } => {
  const lines = csvContent.split("\n").filter(line => line.trim());
  const errors: string[] = [];
  const items: BulkContentItem[] = [];

  // Expected header: title,description,category,media_type,url,thumbnail_url,is_featured
  const headerLine = lines[0];
  const expectedHeaders = ["title", "description", "category", "media_type", "url", "thumbnail_url", "is_featured"];
  const headers = headerLine.split(",").map(h => h.trim().toLowerCase());
  
  // Validate headers
  for (const expected of expectedHeaders) {
    if (!headers.includes(expected)) {
      errors.push(`Missing header: ${expected}`);
    }
  }
  
  if (errors.length) {
    return { items, errors };
  }

  // Process data rows
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    const values = line.split(",").map(v => v.trim());
    
    // Skip empty lines
    if (values.length < 5) {
      errors.push(`Line ${i + 1}: Not enough values`);
      continue;
    }

    // Map CSV values to object
    const headerIndexMap: { [key: string]: number } = {};
    headers.forEach((header, index) => {
      headerIndexMap[header] = index;
    });

    const validCategories: ContentCategory[] = ["promotional", "staff", "awards", "ceo", "partner", "videos"];
    const validMediaTypes: MediaType[] = ["image", "video"];

    const category = values[headerIndexMap["category"]] as ContentCategory;
    const mediaType = values[headerIndexMap["media_type"]] as MediaType;
    
    // Validate category and media_type
    if (!validCategories.includes(category)) {
      errors.push(`Line ${i + 1}: Invalid category "${category}". Valid options are: ${validCategories.join(", ")}`);
      continue;
    }
    
    if (!validMediaTypes.includes(mediaType)) {
      errors.push(`Line ${i + 1}: Invalid media_type "${mediaType}". Valid options are: ${validMediaTypes.join(", ")}`);
      continue;
    }

    const item: BulkContentItem = {
      title: values[headerIndexMap["title"]],
      description: values[headerIndexMap["description"]] || undefined,
      category: category,
      media_type: mediaType,
      url: values[headerIndexMap["url"]],
      thumbnail_url: values[headerIndexMap["thumbnail_url"]] || undefined,
      is_featured: values[headerIndexMap["is_featured"]]?.toLowerCase() === "true" || false
    };

    // Validate required fields
    if (!item.title) {
      errors.push(`Line ${i + 1}: Missing title`);
      continue;
    }
    
    if (!item.url) {
      errors.push(`Line ${i + 1}: Missing URL`);
      continue;
    }

    items.push(item);
  }

  return { items, errors };
};

// Helper function to create a CSV template
export const getCsvTemplate = (): string => {
  return "title,description,category,media_type,url,thumbnail_url,is_featured\n" +
         "Example Title,Description of content,promotional,image,https://example.com/image.jpg,https://example.com/thumbnail.jpg,false";
};
