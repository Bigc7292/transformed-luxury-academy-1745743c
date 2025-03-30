import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { contentService } from "@/services/contentService";
import { ContentCategory, ContentItem, MediaType, PageSection } from "@/types/content";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { LogOut, Inbox, Upload } from "lucide-react";

// Import admin components
import ContentFilters from "@/components/admin/ContentFilters";
import ContentList from "@/components/admin/ContentList";
import CreateContentDialog from "@/components/admin/CreateContentDialog";
import EditContentDialog from "@/components/admin/EditContentDialog";
import DeleteContentDialog from "@/components/admin/DeleteContentDialog";
import BulkUploadDialog from "@/components/admin/BulkUploadDialog";

type ContentFormState = {
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

const AdminContentPage: React.FC = () => {
  const [categoryFilter, setCategoryFilter] = useState<ContentCategory | 'all'>('all');
  const [mediaTypeFilter, setMediaTypeFilter] = useState<MediaType | 'all'>('all');
  const [pageLocationFilter, setPageLocationFilter] = useState<string | 'all'>('all');
  const [activeFilter, setActiveFilter] = useState<boolean | 'all'>('all');
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isBulkUploadDialogOpen, setIsBulkUploadDialogOpen] = useState(false);
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
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [contentToDelete, setContentToDelete] = useState<ContentItem | null>(null);

  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    const checkAdmin = async () => {
      const { data } = await supabase.auth.getSession();
      
      if (!data.session) {
        toast({
          title: "Authentication Required",
          description: "Please login to access the admin area.",
          variant: "destructive",
        });
        navigate("/admin/auth");
        return;
      }
      
      const adminCheckQuery = await supabase
        .from("admin_users")
        .select("*")
        .eq("email", data.session.user.email)
        .single();
        
      if (adminCheckQuery.error || !adminCheckQuery.data) {
        toast({
          title: "Access Denied",
          description: "You do not have permission to access this area.",
          variant: "destructive",
        });
        navigate("/");
      }
    };
    
    checkAdmin();
  }, [navigate, toast]);

  const { data: content, isLoading, error } = useQuery({
    queryKey: ["admin-content"],
    queryFn: () => contentService.getContent(),
  });

  const createContentMutation = useMutation({
    mutationFn: (content: ContentFormState) => contentService.createContent(content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-content"] });
      setIsCreateDialogOpen(false);
      toast({
        title: "Content Created",
        description: "The content has been successfully created.",
      });
      
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
    },
    onError: (error: any) => {
      toast({
        title: "Creation Failed",
        description: error.message || "There was an error creating the content.",
        variant: "destructive",
      });
    }
  });

  const updateContentMutation = useMutation({
    mutationFn: ({ id, content }: { id: string; content: Partial<ContentItem> }) => 
      contentService.updateContent(id, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-content"] });
      setIsEditDialogOpen(false);
      toast({
        title: "Content Updated",
        description: "The content has been successfully updated.",
      });
    },
    onError: (error: any) => {
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
      setIsDeleteDialogOpen(false);
      setContentToDelete(null);
      toast({
        title: "Content Deleted",
        description: "The content has been successfully deleted.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Deletion Failed",
        description: error.message || "There was an error deleting the content.",
        variant: "destructive",
      });
    }
  });

  const filteredContent = content?.filter(item => {
    if (categoryFilter !== 'all' && item.category !== categoryFilter) return false;
    if (mediaTypeFilter !== 'all' && item.media_type !== mediaTypeFilter) return false;
    if (pageLocationFilter !== 'all') {
      if (pageLocationFilter === '' && item.page_location) return false;
      if (pageLocationFilter !== '' && item.page_location !== pageLocationFilter) return false;
    }
    if (activeFilter !== 'all' && item.active !== activeFilter) return false;
    return true;
  });

  const handleEdit = (item: ContentItem) => {
    setSelectedContent(item);
    setIsEditDialogOpen(true);
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
  };

  const handleDelete = (item: ContentItem) => {
    setContentToDelete(item);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = (confirmText: string) => {
    if (!contentToDelete || !contentToDelete.id) return;
    if (confirmText.toLowerCase() !== 'delete') {
      toast({
        title: "Confirmation Failed",
        description: "Please type 'delete' to confirm.",
        variant: "destructive",
      });
      return;
    }
    
    deleteContentMutation.mutate(contentToDelete.id);
  };

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

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out."
    });
    navigate("/admin/auth");
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

  const handleBulkUploadComplete = () => {
    queryClient.invalidateQueries({ queryKey: ["admin-content"] });
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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-serif text-salon-pink-700">
            Content Management
          </h1>
          <div className="flex space-x-4">
            <Button
              onClick={() => navigate("/admin/inbox")}
              className="bg-salon-pink-600 hover:bg-salon-pink-700 flex items-center gap-2"
            >
              <Inbox size={16} /> Customer Inquiries
            </Button>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-red-500 text-red-600 hover:bg-red-50 flex items-center gap-2"
            >
              <LogOut size={16} /> Logout
            </Button>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <ContentFilters 
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            mediaTypeFilter={mediaTypeFilter}
            setMediaTypeFilter={setMediaTypeFilter}
            pageLocationFilter={pageLocationFilter}
            setPageLocationFilter={setPageLocationFilter}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
          />
          
          <Button
            onClick={() => setIsBulkUploadDialogOpen(true)}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Upload size={16} /> Bulk Upload
          </Button>
        </div>

        <ContentList
          content={content}
          isLoading={isLoading}
          error={error}
          filteredContent={filteredContent}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          setIsCreateDialogOpen={setIsCreateDialogOpen}
        />

        <CreateContentDialog
          isOpen={isCreateDialogOpen}
          setIsOpen={setIsCreateDialogOpen}
          newContent={newContent}
          handleInputChange={(e) => handleInputChange(e, true)}
          handleSelectChange={(value, name) => handleSelectChange(value, name, true)}
          handleSwitchChange={(checked, name) => handleSwitchChange(checked, name, true)}
          handleCreate={handleCreate}
          handleMediaUploadComplete={handleMediaUploadComplete}
          handleThumbnailUploadComplete={handleThumbnailUploadComplete}
          isCreating={createContentMutation.isPending}
        />

        <EditContentDialog
          isOpen={isEditDialogOpen && !!selectedContent}
          setIsOpen={setIsEditDialogOpen}
          selectedContent={selectedContent}
          handleInputChange={(e) => handleInputChange(e, false)}
          handleSelectChange={(value, name) => handleSelectChange(value, name, false)}
          handleSwitchChange={(checked, name) => handleSwitchChange(checked, name, false)}
          handleUpdate={handleUpdate}
          handleMediaUploadComplete={handleEditMediaUploadComplete}
          handleThumbnailUploadComplete={handleEditThumbnailUploadComplete}
          isUpdating={updateContentMutation.isPending}
        />

        <DeleteContentDialog
          isOpen={isDeleteDialogOpen && !!contentToDelete}
          setIsOpen={setIsDeleteDialogOpen}
          contentToDelete={contentToDelete}
          handleConfirmDelete={handleConfirmDelete}
          isDeleting={deleteContentMutation.isPending}
        />

        <BulkUploadDialog
          isOpen={isBulkUploadDialogOpen}
          setIsOpen={setIsBulkUploadDialogOpen}
          onUploadComplete={handleBulkUploadComplete}
        />
      </div>
      <Footer />
    </div>
  );
};

export default AdminContentPage;
