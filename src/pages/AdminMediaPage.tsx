import React from "react";
import { useQuery } from "@tanstack/react-query";
import { contentService } from "@/services/contentService";
import { useToast } from "@/hooks/use-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MobileScrollFix from "@/components/admin/MobileScrollFix";

// Import custom hooks
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useContentMutations } from "@/hooks/useContentMutations";
import { useContentForm } from "@/hooks/useContentForm";
import { useContentDialogs } from "@/hooks/useContentDialogs";

// Import admin components
import AdminHeader from "@/components/admin/AdminHeader";
import AdminMediaShowcase from "@/components/admin/AdminMediaShowcase";
import AdminInstructions from "@/components/admin/AdminInstructions";
import S3VideoImporter from "@/components/admin/S3VideoImporter";
import CreateContentDialog from "@/components/admin/CreateContentDialog";
import EditContentDialog from "@/components/admin/EditContentDialog";
import DeleteContentDialog from "@/components/admin/DeleteContentDialog";

const AdminMediaPage: React.FC = () => {
  const { toast } = useToast();
  const { handleLogout } = useAdminAuth();
  const { createContentMutation, updateContentMutation, deleteContentMutation } = useContentMutations();

  // Fetch all content for reference
  const { data: content, isLoading, error } = useQuery({
    queryKey: ["admin-content"],
    queryFn: () => contentService.getContent(),
  });

  const { selectedContent, setSelectedContent, newContent, setNewContent, handlers } = useContentForm();
  const { dialogState, dialogHandlers } = useContentDialogs();

  // Connect the setSelectedContent function from useContentDialogs to the actual function from useContentForm
  React.useEffect(() => {
    dialogHandlers.setSelectedContent(setSelectedContent);
  }, [dialogHandlers, setSelectedContent]);

  // Set default values for new content specific to media showcase
  const handleCreateMediaContent = () => {
    setNewContent({
      title: '',
      description: '',
      category: 'promotional',
      media_type: 'image',
      url: '',
      thumbnail_url: '',
      is_featured: false,
      page_location: 'media', // Pre-set to media page
      page_section: 'gallery_featured', // Default to featured section
      active: true
    });
    dialogState.setIsCreateDialogOpen(true);
  };

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
      page_location: 'media',
      page_section: 'gallery_featured',
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
    <div className="min-h-screen bg-white" style={{ height: 'auto', minHeight: '100vh', overflow: 'visible' }}>
      <MobileScrollFix />
      <Navbar />
      <div className="container mx-auto pt-32 pb-20 px-4" style={{ overflow: 'visible' }}>
        <AdminHeader title="Content & Media Management" handleLogout={handleLogout} />

        <AdminInstructions />

        <S3VideoImporter onVideoAdded={() => {
          // Refetch content when a new video is added
          window.location.reload();
        }} />

        <AdminMediaShowcase
          onCreateContent={handleCreateMediaContent}
          onEditContent={dialogHandlers.handleEdit}
          onDeleteContent={dialogHandlers.handleDelete}
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
      </div>
      <Footer />
    </div>
  );
};

export default AdminMediaPage;
