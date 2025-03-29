
import { contentService } from "@/services/contentService";
import { ContentCategory, MediaType, PageSection } from "@/types/content";
import Papa from "papaparse";

// Type for validated CSV item
type ValidatedContentItem = {
  title: string;
  description?: string;
  category: ContentCategory;
  media_type: MediaType;
  url: string;
  thumbnail_url?: string;
  is_featured?: boolean;
  page_location?: string;
  page_section?: PageSection;
  active?: boolean;
};

// Parse and validate CSV content
export const parseCsvContent = (csvText: string): { 
  items: ValidatedContentItem[];
  errors: string[];
} => {
  const validCategories = [
    "promotional", "staff", "awards", "ceo", "founder", "partner", "videos"
  ];
  
  const validMediaTypes = ["image", "video"];
  
  const validPageSections = [
    "home_hero", "home_featured", "home_carousel", "about_gallery", 
    "services_showcase", "gallery_main", "gallery_featured", "content_page_featured"
  ];
  
  const errors: string[] = [];
  const items: ValidatedContentItem[] = [];
  
  let parseResult;
  try {
    parseResult = Papa.parse(csvText, { header: true, skipEmptyLines: true });
  } catch (e) {
    errors.push("Invalid CSV format. Please check your input.");
    return { items, errors };
  }
  
  if (parseResult.errors.length > 0) {
    errors.push(...parseResult.errors.map(err => `CSV parse error: ${err.message} at row ${err.row}`));
    return { items, errors };
  }
  
  parseResult.data.forEach((row: any, index: number) => {
    const rowNum = index + 2; // +2 because index is 0-based and we have headers
    
    // Validate required fields
    if (!row.title) {
      errors.push(`Row ${rowNum}: Missing title`);
      return;
    }
    
    if (!row.category) {
      errors.push(`Row ${rowNum}: Missing category`);
      return;
    }
    
    if (!validCategories.includes(row.category)) {
      errors.push(`Row ${rowNum}: Invalid category "${row.category}". Valid categories are: ${validCategories.join(", ")}`);
      return;
    }
    
    if (!row.media_type) {
      errors.push(`Row ${rowNum}: Missing media_type`);
      return;
    }
    
    if (!validMediaTypes.includes(row.media_type)) {
      errors.push(`Row ${rowNum}: Invalid media_type "${row.media_type}". Valid types are: ${validMediaTypes.join(", ")}`);
      return;
    }
    
    if (!row.url) {
      errors.push(`Row ${rowNum}: Missing url`);
      return;
    }
    
    // Validate page section if provided
    if (row.page_section && !validPageSections.includes(row.page_section)) {
      errors.push(`Row ${rowNum}: Invalid page_section "${row.page_section}". Valid sections are: ${validPageSections.join(", ")}`);
      return;
    }
    
    // Convert boolean values
    const is_featured = row.is_featured === "true" || row.is_featured === "yes" || row.is_featured === "1";
    const active = row.active !== "false" && row.active !== "no" && row.active !== "0";
    
    // Add validated item
    items.push({
      title: row.title,
      description: row.description || undefined,
      category: row.category as ContentCategory,
      media_type: row.media_type as MediaType,
      url: row.url,
      thumbnail_url: row.thumbnail_url || undefined,
      is_featured,
      page_location: row.page_location || undefined,
      page_section: row.page_section as PageSection || undefined,
      active
    });
  });
  
  return { items, errors };
};

// Upload bulk content
export const uploadBulkContent = async (items: ValidatedContentItem[]): Promise<{
  success: boolean;
  count: number;
  errors: string[];
}> => {
  if (!items.length) {
    return { success: false, count: 0, errors: ["No valid items to upload"] };
  }
  
  const uploadErrors: string[] = [];
  let successCount = 0;
  
  for (const item of items) {
    try {
      const result = await contentService.createContent(item);
      if (result.success) {
        successCount++;
      } else {
        uploadErrors.push(`Failed to upload "${item.title}": ${result.error}`);
      }
    } catch (e: any) {
      uploadErrors.push(`Error uploading "${item.title}": ${e.message}`);
    }
  }
  
  return {
    success: successCount > 0,
    count: successCount,
    errors: uploadErrors
  };
};

// Get CSV template
export const getCsvTemplate = (): string => {
  return `title,description,category,media_type,url,thumbnail_url,is_featured,page_location,page_section,active
"Example Title","Example description","promotional","image","https://example.com/image.jpg","https://example.com/thumbnail.jpg","false","home","home_featured","true"
"Another Example","Another description","staff","video","https://example.com/video.mp4","https://example.com/thumbnail.jpg","true","gallery","gallery_main","true"`;
};
