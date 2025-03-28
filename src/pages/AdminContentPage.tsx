
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { contentService } from "@/services/contentService";
import { ContentCategory, ContentItem, MediaType } from "@/types/content";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Image, Video } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const AdminContentPage: React.FC = () => {
  const [categoryFilter, setCategoryFilter] = useState<ContentCategory | 'all'>('all');
  const [mediaTypeFilter, setMediaTypeFilter] = useState<MediaType | 'all'>('all');

  const { data: content, isLoading, error } = useQuery({
    queryKey: ["admin-content"],
    queryFn: () => contentService.getContent(),
  });

  const filteredContent = content?.filter(item => {
    if (categoryFilter !== 'all' && item.category !== categoryFilter) return false;
    if (mediaTypeFilter !== 'all' && item.media_type !== mediaTypeFilter) return false;
    return true;
  });

  const handleEdit = (item: ContentItem) => {
    // In a real app, this would open an edit modal or navigate to an edit page
    toast({
      title: "Edit functionality",
      description: "Edit functionality would be implemented in a real app",
    });
  };

  const handleDelete = (item: ContentItem) => {
    // In a real app, this would confirm and then delete the item
    toast({
      title: "Delete functionality",
      description: "Delete functionality would be implemented in a real app",
      variant: "destructive",
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
        <h1 className="text-4xl font-serif text-salon-pink-700 mb-8 text-center">
          Content Management
        </h1>

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
            <Button className="bg-salon-pink-600 hover:bg-salon-pink-700">
              Add New Content
            </Button>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8">
                        Loading content...
                      </TableCell>
                    </TableRow>
                  ) : filteredContent?.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8">
                        No content found matching your filters.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredContent?.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.title}</TableCell>
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
                        <TableCell>{new Date(item.created_at).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(item)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-500 hover:text-red-700"
                            onClick={() => handleDelete(item)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
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
