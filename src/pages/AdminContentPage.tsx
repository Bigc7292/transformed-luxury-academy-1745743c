import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { contentService } from "@/services/contentService";
import { ContentCategory, ContentItem, MediaType } from "@/types/content";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Pencil,
  Trash2,
  Image,
  Video,
  Eye,
  ThumbsUp,
  Download,
  AlertTriangle,
  Plus,
  RefreshCw,
  LogOut,
  Inbox
} from "lucide-react";

type ContentFormState = {
  title: string;
  description: string;
  category: ContentCategory;
  media_type: MediaType;
  url: string;
  thumbnail_url: string;
  is_featured: boolean;
};

const AdminContentPage: React.FC = () => {
  const [categoryFilter, setCategoryFilter] = useState<ContentCategory | 'all'>('all');
  const [mediaTypeFilter, setMediaTypeFilter] = useState<MediaType | 'all'>('all');
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);
  const [newContent, setNewContent] = useState<ContentFormState>({
    title: '',
    description: '',
    category: 'promotional',
    media_type: 'image',
    url: '',
    thumbnail_url: '',
    is_featured: false
  });
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
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
      
      const { data: adminData, error } = await supabase
        .from("admin_users")
        .select("*")
        .eq("user_id", data.session.user.id)
        .single();
        
      if (error || !adminData) {
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
        is_featured: false
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
      setDeleteConfirmText('');
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

  const confirmDelete = () => {
    if (!contentToDelete || !contentToDelete.id) return;
    if (deleteConfirmText.toLowerCase() !== 'delete') {
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

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Content Filters</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/2">
              <label className="block text-sm font-medium mb-1">Category</label>
              <Select 
                value={categoryFilter} 
                onValueChange={(value) => setCategoryFilter(value as ContentCategory | 'all')}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="promotional">Promotional</SelectItem>
                  <SelectItem value="staff">Staff</SelectItem>
                  <SelectItem value="awards">Awards</SelectItem>
                  <SelectItem value="ceo">CEO</SelectItem>
                  <SelectItem value="founder">Founder</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full md:w-1/2">
              <label className="block text-sm font-medium mb-1">Media Type</label>
              <Select 
                value={mediaTypeFilter} 
                onValueChange={(value) => setMediaTypeFilter(value as MediaType | 'all')}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select media type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Media Types</SelectItem>
                  <SelectItem value="image">Images</SelectItem>
                  <SelectItem value="video">Videos</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Content List</CardTitle>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-salon-pink-600 hover:bg-salon-pink-700 flex items-center gap-2">
                  <Plus size={16} /> Add New Content
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle>Add New Content</DialogTitle>
                  <DialogDescription>
                    Create a new content item to be displayed on the website.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">
                      Title
                    </Label>
                    <Input
                      id="title"
                      name="title"
                      value={newContent.title}
                      onChange={(e) => handleInputChange(e, true)}
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={newContent.description || ''}
                      onChange={(e) => handleInputChange(e, true)}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="category" className="text-right">
                      Category
                    </Label>
                    <Select
                      value={newContent.category}
                      onValueChange={(value) => handleSelectChange(value, 'category', true)}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="promotional">Promotional</SelectItem>
                        <SelectItem value="staff">Staff</SelectItem>
                        <SelectItem value="awards">Awards</SelectItem>
                        <SelectItem value="ceo">CEO</SelectItem>
                        <SelectItem value="founder">Founder</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="media_type" className="text-right">
                      Media Type
                    </Label>
                    <Select
                      value={newContent.media_type}
                      onValueChange={(value) => handleSelectChange(value, 'media_type', true)}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select media type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="image">Image</SelectItem>
                        <SelectItem value="video">Video</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="url" className="text-right">
                      Media URL
                    </Label>
                    <Input
                      id="url"
                      name="url"
                      value={newContent.url || ''}
                      onChange={(e) => handleInputChange(e, true)}
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="thumbnail_url" className="text-right">
                      Thumbnail URL
                    </Label>
                    <Input
                      id="thumbnail_url"
                      name="thumbnail_url"
                      value={newContent.thumbnail_url || ''}
                      onChange={(e) => handleInputChange(e, true)}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="is_featured" className="text-right">
                      Featured
                    </Label>
                    <div className="col-span-3 flex items-center space-x-2">
                      <Switch
                        id="is_featured"
                        checked={newContent.is_featured || false}
                        onCheckedChange={(checked) => handleSwitchChange(checked, 'is_featured', true)}
                      />
                      <Label htmlFor="is_featured">
                        {newContent.is_featured ? 'Yes' : 'No'}
                      </Label>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsCreateDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleCreate} 
                    className="bg-salon-pink-600 hover:bg-salon-pink-700"
                    disabled={createContentMutation.isPending}
                  >
                    {createContentMutation.isPending ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Creating...
                      </>
                    ) : 'Create Content'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Stats</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8">
                        <div className="flex justify-center items-center">
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          Loading content...
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : filteredContent?.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8">
                        No content found matching your filters.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredContent?.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center">
                            {item.is_featured && (
                              <span className="inline-block h-2 w-2 rounded-full bg-yellow-400 mr-2" title="Featured"></span>
                            )}
                            {item.title}
                          </div>
                        </TableCell>
                        <TableCell>
                          {item.media_type === "image" ? (
                            <span className="flex items-center">
                              <Image className="h-4 w-4 mr-1" /> Image
                            </span>
                          ) : (
                            <span className="flex items-center">
                              <Video className="h-4 w-4 mr-1" /> Video
                            </span>
                          )}
                        </TableCell>
                        <TableCell>
                          <span className="capitalize">{item.category}</span>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-3 text-xs text-gray-500">
                            <span className="flex items-center">
                              <Eye className="h-3 w-3 mr-1" /> {item.view_count || 0}
                            </span>
                            <span className="flex items-center">
                              <ThumbsUp className="h-3 w-3 mr-1" /> {item.likes || 0}
                            </span>
                            <span className="flex items-center">
                              <Download className="h-3 w-3 mr-1" /> {item.downloads || 0}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>{new Date(item.created_at).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex space-x-2 justify-end">
                            <Dialog open={isEditDialogOpen && selectedContent?.id === item.id} onOpenChange={setIsEditDialogOpen}>
                              <DialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleEdit(item)}
                                >
                                  <Pencil className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-lg">
                                <DialogHeader>
                                  <DialogTitle>Edit Content</DialogTitle>
                                  <DialogDescription>
                                    Make changes to the content item.
                                  </DialogDescription>
                                </DialogHeader>
                                {selectedContent && (
                                  <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label htmlFor="edit-title" className="text-right">
                                        Title
                                      </Label>
                                      <Input
                                        id="edit-title"
                                        name="title"
                                        value={selectedContent.title}
                                        onChange={handleInputChange}
                                        className="col-span-3"
                                      />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label htmlFor="edit-description" className="text-right">
                                        Description
                                      </Label>
                                      <Textarea
                                        id="edit-description"
                                        name="description"
                                        value={selectedContent.description || ''}
                                        onChange={handleInputChange}
                                        className="col-span-3"
                                      />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label htmlFor="edit-category" className="text-right">
                                        Category
                                      </Label>
                                      <Select
                                        value={selectedContent.category}
                                        onValueChange={(value) => handleSelectChange(value, 'category')}
                                      >
                                        <SelectTrigger className="col-span-3">
                                          <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="promotional">Promotional</SelectItem>
                                          <SelectItem value="staff">Staff</SelectItem>
                                          <SelectItem value="awards">Awards</SelectItem>
                                          <SelectItem value="ceo">CEO</SelectItem>
                                          <SelectItem value="founder">Founder</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label htmlFor="edit-media-type" className="text-right">
                                        Media Type
                                      </Label>
                                      <Select
                                        value={selectedContent.media_type}
                                        onValueChange={(value) => handleSelectChange(value, 'media_type')}
                                      >
                                        <SelectTrigger className="col-span-3">
                                          <SelectValue placeholder="Select media type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="image">Image</SelectItem>
                                          <SelectItem value="video">Video</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label htmlFor="edit-url" className="text-right">
                                        Media URL
                                      </Label>
                                      <Input
                                        id="edit-url"
                                        name="url"
                                        value={selectedContent.url}
                                        onChange={handleInputChange}
                                        className="col-span-3"
                                      />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label htmlFor="edit-thumbnail" className="text-right">
                                        Thumbnail URL
                                      </Label>
                                      <Input
                                        id="edit-thumbnail"
                                        name="thumbnail_url"
                                        value={selectedContent.thumbnail_url || ''}
                                        onChange={handleInputChange}
                                        className="col-span-3"
                                      />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label htmlFor="edit-featured" className="text-right">
                                        Featured
                                      </Label>
                                      <div className="col-span-3 flex items-center space-x-2">
                                        <Switch
                                          id="edit-featured"
                                          checked={selectedContent.is_featured || false}
                                          onCheckedChange={(checked) => handleSwitchChange(checked, 'is_featured')}
                                        />
                                        <Label htmlFor="edit-featured">
                                          {selectedContent.is_featured ? 'Yes' : 'No'}
                                        </Label>
                                      </div>
                                    </div>
                                  </div>
                                )}
                                <DialogFooter>
                                  <Button 
                                    variant="outline" 
                                    onClick={() => setIsEditDialogOpen(false)}
                                  >
                                    Cancel
                                  </Button>
                                  <Button 
                                    onClick={handleUpdate} 
                                    className="bg-salon-pink-600 hover:bg-salon-pink-700"
                                    disabled={updateContentMutation.isPending}
                                  >
                                    {updateContentMutation.isPending ? (
                                      <>
                                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                                        Saving...
                                      </>
                                    ) : 'Save Changes'}
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                            <Dialog open={isDeleteDialogOpen && contentToDelete?.id === item.id} onOpenChange={setIsDeleteDialogOpen}>
                              <DialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="text-red-500 hover:text-red-700"
                                  onClick={() => handleDelete(item)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle className="flex items-center gap-2 text-red-600">
                                    <AlertTriangle className="h-5 w-5" /> Delete Content
                                  </DialogTitle>
                                  <DialogDescription>
                                    This action cannot be undone. This will permanently delete the content from the system.
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="py-4">
                                  <p className="mb-4">
                                    Please type <span className="font-semibold">delete</span> to confirm.
                                  </p>
                                  <Input 
                                    value={deleteConfirmText} 
                                    onChange={(e) => setDeleteConfirmText(e.target.value)} 
                                    placeholder="Type 'delete' to confirm" 
                                  />
                                </div>
                                <DialogFooter>
                                  <Button 
                                    variant="outline" 
                                    onClick={() => {
                                      setIsDeleteDialogOpen(false);
                                      setDeleteConfirmText('');
                                    }}
                                  >
                                    Cancel
                                  </Button>
                                  <Button 
                                    variant="destructive" 
                                    onClick={confirmDelete}
                                    disabled={deleteConfirmText.toLowerCase() !== 'delete' || deleteContentMutation.isPending}
                                  >
                                    {deleteContentMutation.isPending ? (
                                      <>
                                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                                        Deleting...
                                      </>
                                    ) : 'Delete Content'}
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default AdminContentPage;
