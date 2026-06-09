import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { contentService } from '@/services/contentService';
import { ContentCategory, ContentItem } from '@/types/content';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Loader2, Plus, Edit, Trash2, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AdminMediaShowcaseProps {
  onCreateContent: () => void;
  onEditContent: (content: ContentItem) => void;
  onDeleteContent: (content: ContentItem) => void;
}

const AdminMediaShowcase: React.FC<AdminMediaShowcaseProps> = ({
  onCreateContent,
  onEditContent,
  onDeleteContent
}) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>('all');

  // Fetch ALL content from the database for the admin media showcase
  const { data: mediaContent, isLoading, error } = useQuery({
    queryKey: ['admin-media-showcase'],
    queryFn: () => contentService.getContent(), // Fetch all content without filters
  });

  // Get content for a specific category or page location
  const getCategoryContent = (filter?: string): ContentItem[] => {
    if (!mediaContent) return [];

    if (!filter || filter === 'all') {
      return mediaContent;
    }

    // Handle page location filters
    if (filter.startsWith('page-')) {
      const pageLocation = filter.replace('page-', '');
      return mediaContent.filter(item => item.page_location === pageLocation);
    }

    // Handle category filters
    return mediaContent.filter(item => {
      if (filter === 'videos') {
        return item.media_type === 'video';
      }
      return item.category === filter as ContentCategory;
    });
  };

  // Handle view content
  const handleViewContent = (content: ContentItem) => {
    window.open(`/media-showcase#${content.category}`, '_blank');
  };

  // Categories for the media showcase
  const mediaCategories = [
    { id: 'all', name: 'All Content' },
    { id: 'promotional', name: 'Promotional' },
    { id: 'staff', name: 'Staff' },
    { id: 'awards', name: 'Awards' },
    { id: 'ceo', name: 'CEO' },
    { id: 'founder', name: 'Founder' },
    { id: 'videos', name: 'Videos' }
  ];

  // Page location filters
  const pageLocationFilters = [
    { id: 'page-home', name: 'Home Page' },
    { id: 'page-about', name: 'About Page' },
    { id: 'page-services', name: 'Services Page' },
    { id: 'page-gallery', name: 'Gallery Page' },
    { id: 'page-media', name: 'Media Page' },
    { id: 'page-content', name: 'Content Pages' }
  ];

  if (error) {
    return (
      <Card className="border-gold-500/10 bg-zinc-950/20">
        <CardHeader>
          <CardTitle className="text-zinc-100 font-serif">Media Showcase Management</CardTitle>
          <CardDescription className="text-red-500">
            Error loading media content. Please try again later.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="mb-8 max-w-full overflow-hidden border-gold-500/10 bg-zinc-950/20">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-zinc-100 font-serif">Content & Media Management</CardTitle>
          <CardDescription className="text-zinc-400">
            Manage all content and media from the entire website database
          </CardDescription>
        </div>
        <Button onClick={onCreateContent} className="bg-gold-500 hover:bg-gold-400 text-black font-semibold flex items-center gap-1">
          <Plus size={16} /> Add Content
        </Button>
      </CardHeader>
      <CardContent className="overflow-x-auto pt-2">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="mb-4">
            <h3 className="text-sm font-medium text-zinc-400 mb-2">Filter by Category</h3>
            <TabsList className="mb-6 flex flex-wrap gap-2 bg-zinc-900/50 border border-zinc-800">
              {mediaCategories.map(category => (
                <TabsTrigger key={category.id} value={category.id} className="data-[state=active]:bg-gold-500 data-[state=active]:text-black text-zinc-400">
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <div className="mb-4">
            <h3 className="text-sm font-medium text-zinc-400 mb-2">Filter by Page Location</h3>
            <TabsList className="mb-6 flex flex-wrap gap-2 bg-zinc-900/50 border border-zinc-800">
              {pageLocationFilters.map(filter => (
                <TabsTrigger key={filter.id} value={filter.id} className="data-[state=active]:bg-gold-500 data-[state=active]:text-black text-zinc-400">
                  {filter.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Category tabs content */}
          {mediaCategories.map(category => (
            <TabsContent key={category.id} value={category.id}>
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-gold-500" />
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-x-auto">
                  {getCategoryContent(category.id).length > 0 ? (
                    getCategoryContent(category.id).map(content => (
                      <Card key={content.id} className="overflow-hidden border-zinc-800 bg-zinc-900/30">
                        <div className="relative aspect-video bg-zinc-900/60 border-b border-zinc-800">
                          {content.media_type === 'video' ? (
                            <div className="absolute inset-0 flex items-center justify-center bg-black">
                              <video
                                src={content.url}
                                className="w-full h-full object-contain"
                                controls={false}
                                muted
                                poster={content.thumbnail_url || undefined}
                              />
                              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                                <div className="w-12 h-12 rounded-full bg-gold-500 flex items-center justify-center shadow-lg">
                                  <div className="w-0 h-0 border-y-8 border-y-transparent border-l-12 border-l-black ml-1" aria-hidden="true" />
                                </div>
                              </div>
                            </div>
                          ) : (
                            <img
                              src={content.url}
                              alt={content.title}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-medium text-lg mb-1 truncate text-zinc-100">{content.title}</h3>
                          <p className="text-sm text-zinc-400 mb-3 line-clamp-2">{content.description}</p>
                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                            <div className="flex flex-wrap gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onEditContent(content)}
                                className="border-zinc-800 text-zinc-300 hover:bg-gold-500/10 hover:text-gold-400 flex items-center gap-1"
                              >
                                <Edit size={14} /> Edit
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onDeleteContent(content)}
                                className="border-zinc-800 text-red-400 hover:bg-red-500/10 hover:text-red-300 flex items-center gap-1"
                              >
                                <Trash2 size={14} /> Delete
                              </Button>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewContent(content)}
                              className="text-zinc-400 hover:text-gold-500 hover:bg-zinc-900/50 flex items-center gap-1"
                            >
                              <Eye size={14} /> View
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="col-span-full py-8 text-center text-zinc-500">
                      No {category.id === 'all' ? '' : category.name} media content found.{' '}
                      <Button
                        variant="link"
                        onClick={onCreateContent}
                        className="text-gold-500 hover:text-gold-400 p-0 h-auto font-normal"
                      >
                        Add some now
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </TabsContent>
          ))}

          {/* Page location tabs content */}
          {pageLocationFilters.map(filter => (
            <TabsContent key={filter.id} value={filter.id}>
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-gold-500" />
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-x-auto">
                  {getCategoryContent(filter.id).length > 0 ? (
                    getCategoryContent(filter.id).map(content => (
                      <Card key={content.id} className="overflow-hidden border-zinc-800 bg-zinc-900/30">
                        <div className="relative aspect-video bg-zinc-900/60 border-b border-zinc-800">
                          {content.media_type === 'video' ? (
                            <div className="absolute inset-0 flex items-center justify-center bg-black">
                              <video
                                src={content.url}
                                className="w-full h-full object-contain"
                                controls={false}
                                muted
                                poster={content.thumbnail_url || undefined}
                              />
                              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                                <div className="w-12 h-12 rounded-full bg-gold-500 flex items-center justify-center shadow-lg">
                                  <div className="w-0 h-0 border-y-8 border-y-transparent border-l-12 border-l-black ml-1" aria-hidden="true" />
                                </div>
                              </div>
                            </div>
                          ) : (
                            <img
                              src={content.url}
                              alt={content.title}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-medium text-lg mb-1 truncate text-zinc-100">{content.title}</h3>
                          <p className="text-sm text-zinc-400 mb-3 line-clamp-2">{content.description}</p>
                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                            <div className="flex flex-wrap gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onEditContent(content)}
                                className="border-zinc-800 text-zinc-300 hover:bg-gold-500/10 hover:text-gold-400 flex items-center gap-1"
                              >
                                <Edit size={14} /> Edit
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onDeleteContent(content)}
                                className="border-zinc-800 text-red-400 hover:bg-red-500/10 hover:text-red-300 flex items-center gap-1"
                              >
                                <Trash2 size={14} /> Delete
                              </Button>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewContent(content)}
                              className="text-zinc-400 hover:text-gold-500 hover:bg-zinc-900/50 flex items-center gap-1"
                            >
                              <Eye size={14} /> View
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="col-span-full py-8 text-center text-zinc-500">
                      No content found for {filter.name}.{' '}
                      <Button
                        variant="link"
                        onClick={onCreateContent}
                        className="text-gold-500 hover:text-gold-400 p-0 h-auto font-normal"
                      >
                        Add some now
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AdminMediaShowcase;
