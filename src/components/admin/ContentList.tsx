
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
import ResponsiveTable from "./ResponsiveTable";
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
    <Card className="border-gold-500/10 bg-zinc-950/20">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-zinc-100 font-serif">Content List</CardTitle>
        <Button
          className="bg-gold-500 hover:bg-gold-400 text-black font-semibold flex items-center gap-2"
          onClick={() => setIsCreateDialogOpen(true)}
        >
          <Plus size={16} /> Add New Content
        </Button>
      </CardHeader>
      <CardContent>
        <ResponsiveTable>
          <div className="rounded-md border overflow-hidden">
            <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[180px] md:w-auto">Title</TableHead>
                <TableHead className="hidden md:table-cell">Type</TableHead>
                <TableHead className="hidden md:table-cell">Category</TableHead>
                <TableHead className="hidden lg:table-cell">Placement</TableHead>
                <TableHead className="hidden md:table-cell">Status</TableHead>
                <TableHead className="hidden lg:table-cell">Stats</TableHead>
                <TableHead className="hidden md:table-cell">Created</TableHead>
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
                        <div>
                          <div>{item.title}</div>
                          <div className="md:hidden text-xs text-zinc-400 mt-1">
                            <div className="flex items-center gap-1 mb-1">
                              {item.media_type === "image" ? (
                                <><Image className="h-3 w-3 text-zinc-400" /> <span>Image</span></>
                              ) : (
                                <><Video className="h-3 w-3 text-zinc-400" /> <span>Video</span></>
                              )}
                              <span className="mx-1">•</span>
                              <span className="capitalize">{item.category}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              {item.active !== false ? (
                                <Badge variant="outline" className="text-[10px] h-4 bg-green-950/30 text-green-400 border-green-500/20">
                                  <Check className="h-2 w-2 mr-1" /> Active
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="text-[10px] h-4 bg-zinc-800/50 text-zinc-400 border-zinc-700/50">
                                  <X className="h-2 w-2 mr-1" /> Hidden
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
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
                    <TableCell className="hidden md:table-cell">
                      <span className="capitalize">{item.category}</span>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {item.page_location ? (
                        <div className="flex flex-col">
                          <span className="text-xs font-medium">
                            {getPageLocationLabel(item.page_location)}
                          </span>
                          {item.page_section && (
                            <span className="text-xs text-zinc-400">
                              {getPageSectionLabel(item.page_section)}
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-xs text-zinc-500">Not placed</span>
                      )}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {item.active !== false ? (
                        <Badge variant="outline" className="bg-green-950/30 text-green-400 border-green-500/20">
                          <Check className="h-3 w-3 mr-1" /> Active
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-zinc-800/50 text-zinc-400 border-zinc-700/50">
                          <X className="h-3 w-3 mr-1" /> Hidden
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <div className="flex space-x-3 text-xs text-zinc-400">
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
                    <TableCell className="hidden md:table-cell">{new Date(item.created_at).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex space-x-2 justify-end">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(item)}
                          className="text-zinc-400 hover:text-gold-500 hover:bg-zinc-900/50"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-500/70 hover:text-red-500 hover:bg-red-950/20"
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
        </ResponsiveTable>
      </CardContent>
    </Card>
  );
};

export default ContentList;
