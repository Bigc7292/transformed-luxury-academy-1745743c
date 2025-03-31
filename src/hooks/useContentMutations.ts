
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { contentService } from "@/services/contentService";
import { ContentItem, ContentCategory, MediaType, PageSection } from "@/types/content";
import { useToast } from "@/hooks/use-toast";

// Define a simple type for form state to avoid recursive type issues
export type ContentFormState = {
  title: string;
  description: string;
  category: ContentCategory;
  media_type: MediaType;
  url: string;
  thumbnail_url: string;
  is_featured: boolean;
  page_location?: string;
  page_section?: PageSection;
  active?: boolean;
};

// Define update params type
export interface UpdateParams {
  id: string;
  content: Partial<ContentItem>;
}

export const useContentMutations = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const createContentMutation = useMutation({
    mutationFn: (contentData: ContentFormState) => contentService.createContent(contentData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-content"] });
      toast({
        title: "Content Created",
        description: "The content has been successfully created.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Creation Failed",
        description: error.message || "There was an error creating the content.",
        variant: "destructive",
      });
    }
  });

  const updateContentMutation = useMutation({
    mutationFn: (params: UpdateParams) => contentService.updateContent(params.id, params.content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-content"] });
      toast({
        title: "Content Updated",
        description: "The content has been successfully updated.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Update Failed",
        description: error.message || "There was an error updating the content.",
        variant: "destructive",
      });
    }
  });

  const deleteContentMutation = useMutation({
    mutationFn: (id: string) => contentService.deleteContent(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-content"] });
      toast({
        title: "Content Deleted",
        description: "The content has been successfully deleted.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Deletion Failed",
        description: error.message || "There was an error deleting the content.",
        variant: "destructive",
      });
    }
  });

  return {
    createContentMutation,
    updateContentMutation,
    deleteContentMutation
  };
};
