
import { useState } from "react";
import { ContentItem } from "@/types/content";

export const useContentDialogs = () => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isBulkUploadDialogOpen, setIsBulkUploadDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [contentToDelete, setContentToDelete] = useState<ContentItem | null>(null);

  const handleEdit = (item: ContentItem) => {
    setSelectedContent(item);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (item: ContentItem) => {
    setContentToDelete(item);
    setIsDeleteDialogOpen(true);
  };

  // This needs to be initialized with a value that will be updated 
  // by the parent component
  let setSelectedContent: (item: ContentItem | null) => void = () => {};

  return {
    dialogState: {
      isEditDialogOpen,
      setIsEditDialogOpen,
      isCreateDialogOpen,
      setIsCreateDialogOpen,
      isBulkUploadDialogOpen,
      setIsBulkUploadDialogOpen,
      isDeleteDialogOpen,
      setIsDeleteDialogOpen,
      contentToDelete,
      setContentToDelete
    },
    dialogHandlers: {
      handleEdit,
      handleDelete,
      setSelectedContent: (fn: typeof setSelectedContent) => {
        setSelectedContent = fn;
      }
    }
  };
};
