
import React from "react";
import { ContentItem, MediaType, PAGE_LOCATIONS, PAGE_SECTIONS } from "@/types/content";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Eye,
  ThumbsUp,
  Download,
  Pencil,
  Trash2,
  Image,
  Video,
  Plus,
  RefreshCw,
  Check,
  X,
  Star,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ContentListProps {
  content: ContentItem[] | undefined;
  isLoading: boolean;
  error: Error | null;
  filteredContent: ContentItem[] | undefined;
  handleEdit: (item: ContentItem) => void;
  handleDelete: (item: ContentItem) => void;
  setIsCreateDialogOpen: (value: boolean) => void;
}

const ContentList: React.FC<ContentListProps> = ({
  isLoading,
  error,
  filteredContent,
  handleEdit,
  handleDelete,
  setIsCreateDialogOpen,
}) => {
  const getPageLocationLabel = (value: string | null | undefined) => {
    if (!value) return "Not Assigned";
    const location = PAGE_LOCATIONS.find(loc => loc.value === value);
    return location ? location.label : value;
  };
  
  const getPageSectionLabel = (value: string | null | undefined) => {
    if (!value) return "Not Assigned";
    return PAGE_SECTIONS[value as keyof typeof PAGE_SECTIONS] || value;
  };
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Content List</CardTitle>
        <Button 
          className="bg-salon-pink-600 hover:bg-salon-pink-700 flex items-center gap-2"
          onClick={() => setIsCreateDialogOpen(true)}
        >
          <Plus size={16} /> Add New Content
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
                <TableHead>Placement</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Stats</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8">
                    <div className="flex justify-center items-center">
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Loading content...
                    </div>
                  </TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-red-500">
                    Error loading content. Please try again later.
                  </TableCell>
                </TableRow>
              ) : filteredContent?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8">
                    No content found matching your filters.
                  </TableCell>
                </TableRow>
              ) : (
                filteredContent?.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        {item.is_featured && (
                          <Star className="h-4 w-4 text-yellow-400 mr-2" />
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
                      {item.page_location ? (
                        <div className="flex flex-col">
                          <span className="text-xs font-medium">
                            {getPageLocationLabel(item.page_location)}
                          </span>
                          {item.page_section && (
                            <span className="text-xs text-gray-500">
                              {getPageSectionLabel(item.page_section)}
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-xs text-gray-500">Not placed</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {item.active !== false ? (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          <Check className="h-3 w-3 mr-1" /> Active
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                          <X className="h-3 w-3 mr-1" /> Hidden
                        </Badge>
                      )}
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
  );
};

export default ContentList;
