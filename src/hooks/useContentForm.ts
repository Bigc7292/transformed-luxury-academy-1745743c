
import { useState } from "react";
import { ContentItem } from "@/types/content";
import { ContentFormState } from "@/hooks/useContentMutations";

export const useContentForm = () => {
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);
  const [newContent, setNewContent] = useState<ContentFormState>({
    title: '',
    description: '',
    category: 'promotional',
    media_type: 'image',
    url: '',
    thumbnail_url: '',
    is_featured: false,
    page_location: '',
    page_section: undefined,
    active: true
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    isForNewContent: boolean = false
  ) => {
    const { name, value } = e.target;
    
    if (isForNewContent) {
      setNewContent(prev => ({ ...prev, [name]: value }));
    } else {
      setSelectedContent(prev => prev ? { ...prev, [name]: value } : null);
    }
  };

  const handleSwitchChange = (checked: boolean, name: string, isForNewContent: boolean = false) => {
    if (isForNewContent) {
      setNewContent(prev => ({ ...prev, [name]: checked }));
    } else {
      setSelectedContent(prev => prev ? { ...prev, [name]: checked } : null);
    }
  };

  const handleSelectChange = (
    value: string, 
    name: string, 
    isForNewContent: boolean = false
  ) => {
    if (isForNewContent) {
      setNewContent(prev => ({ ...prev, [name]: value }));
    } else {
      setSelectedContent(prev => prev ? { ...prev, [name]: value } : null);
    }
  };

  const handleMediaUploadComplete = (url: string) => {
    setNewContent(prev => ({ ...prev, url }));
  };

  const handleThumbnailUploadComplete = (url: string) => {
    setNewContent(prev => ({ ...prev, thumbnail_url: url }));
  };

  const handleEditMediaUploadComplete = (url: string) => {
    setSelectedContent(prev => prev ? { ...prev, url } : null);
  };

  const handleEditThumbnailUploadComplete = (url: string) => {
    setSelectedContent(prev => prev ? { ...prev, thumbnail_url: url } : null);
  };

  return {
    selectedContent,
    setSelectedContent,
    newContent,
    setNewContent,
    handlers: {
      handleInputChange,
      handleSwitchChange,
      handleSelectChange,
      handleMediaUploadComplete,
      handleThumbnailUploadComplete,
      handleEditMediaUploadComplete,
      handleEditThumbnailUploadComplete
    }
  };
};
