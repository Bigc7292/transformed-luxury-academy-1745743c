
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { contentService } from "@/services/contentService";
import { useToast } from "@/hooks/use-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Import custom hooks
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useContentMutations } from "@/hooks/useContentMutations";
import { useContentFilters } from "@/hooks/useContentFilters";
import { useContentForm } from "@/hooks/useContentForm";
import { useContentDialogs } from "@/hooks/useContentDialogs";

// Import admin components
import AdminHeader from "@/components/admin/AdminHeader";
import AdminFilterBar from "@/components/admin/AdminFilterBar";
import ContentList from "@/components/admin/ContentList";
import CreateContentDialog from "@/components/admin/CreateContentDialog";
import EditContentDialog from "@/components/admin/EditContentDialog";
import DeleteContentDialog from "@/components/admin/DeleteContentDialog";
import BulkUploadDialog from "@/components/admin/BulkUploadDialog";

const AdminContentPage: React.FC = () => {
  const { toast } = useToast();
  const { handleLogout } = useAdminAuth();
  const { createContentMutation, updateContentMutation, deleteContentMutation } = useContentMutations();
  
  const { data: content, isLoading, error } = useQuery({
    queryKey: ["admin-content"],
    queryFn: () => contentService.getContent(),
  });

  const { filters, filteredContent } = useContentFilters(content);
  const { selectedContent, setSelectedContent, newContent, setNewContent, handlers } = useContentForm();
  const { dialogState, dialogHandlers } = useContentDialogs();
  
  // Connect the setSelectedContent function from useContentDialogs to the actual function from useContentForm
  React.useEffect(() => {
    dialogHandlers.setSelectedContent(setSelectedContent);
  }, [dialogHandlers, setSelectedContent]);

  const handleUpdate = () => {
    if (!selectedContent || !selectedContent.id) return;
    
    updateContentMutation.mutate({ 
      id: selectedContent.id, 
      content: selectedContent 
    });
  };

  const handleCreate = () => {
    if (!newContent.title || !newContent.url) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields (title and URL).",
        variant: "destructive",
      });
      return;
    }
    
    createContentMutation.mutate(newContent);
    setNewContent({
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
    dialogState.setIsCreateDialogOpen(false);
  };

  const handleConfirmDelete = (confirmText: string) => {
    if (!dialogState.contentToDelete || !dialogState.contentToDelete.id) return;
    if (confirmText.toLowerCase() !== 'delete') {
      toast({
        title: "Confirmation Failed",
        description: "Please type 'delete' to confirm.",
        variant: "destructive",
      });
      return;
    }
    
    deleteContentMutation.mutate(dialogState.contentToDelete.id);
  };

  const handleBulkUploadComplete = () => {
    // We don't need to do anything special here, as the useContentMutations hook handles the queries invalidation
    toast({
      title: "Bulk Upload Complete",
      description: "Your content has been uploaded successfully.",
    });
  };

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="container mx-auto pt-32 pb-20 px-4">
          <div className="text-center text-red-500">
            Error loading content. Please try again later.
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto pt-32 pb-20 px-4">
        <AdminHeader title="Content Management" handleLogout={handleLogout} />
        
        <AdminFilterBar 
          {...filters}
          setIsBulkUploadDialogOpen={dialogState.setIsBulkUploadDialogOpen}
        />

        <ContentList
          content={content}
          isLoading={isLoading}
          error={error}
          filteredContent={filteredContent}
          handleEdit={dialogHandlers.handleEdit}
          handleDelete={dialogHandlers.handleDelete}
          setIsCreateDialogOpen={dialogState.setIsCreateDialogOpen}
        />

        <CreateContentDialog
          isOpen={dialogState.isCreateDialogOpen}
          setIsOpen={dialogState.setIsCreateDialogOpen}
          newContent={newContent}
          handleInputChange={(e) => handlers.handleInputChange(e, true)}
          handleSelectChange={(value, name) => handlers.handleSelectChange(value, name, true)}
          handleSwitchChange={(checked, name) => handlers.handleSwitchChange(checked, name, true)}
          handleCreate={handleCreate}
          handleMediaUploadComplete={handlers.handleMediaUploadComplete}
          handleThumbnailUploadComplete={handlers.handleThumbnailUploadComplete}
          isCreating={createContentMutation.isPending}
        />

        <EditContentDialog
          isOpen={dialogState.isEditDialogOpen && !!selectedContent}
          setIsOpen={dialogState.setIsEditDialogOpen}
          selectedContent={selectedContent}
          handleInputChange={(e) => handlers.handleInputChange(e, false)}
          handleSelectChange={(value, name) => handlers.handleSelectChange(value, name, false)}
          handleSwitchChange={(checked, name) => handlers.handleSwitchChange(checked, name, false)}
          handleUpdate={handleUpdate}
          handleMediaUploadComplete={handlers.handleEditMediaUploadComplete}
          handleThumbnailUploadComplete={handlers.handleEditThumbnailUploadComplete}
          isUpdating={updateContentMutation.isPending}
        />

        <DeleteContentDialog
          isOpen={dialogState.isDeleteDialogOpen && !!dialogState.contentToDelete}
          setIsOpen={dialogState.setIsDeleteDialogOpen}
          contentToDelete={dialogState.contentToDelete}
          handleConfirmDelete={handleConfirmDelete}
          isDeleting={deleteContentMutation.isPending}
        />

        <BulkUploadDialog
          isOpen={dialogState.isBulkUploadDialogOpen}
          setIsOpen={dialogState.setIsBulkUploadDialogOpen}
          onUploadComplete={handleBulkUploadComplete}
        />
      </div>
      <Footer />
    </div>
  );
};

export default AdminContentPage;
