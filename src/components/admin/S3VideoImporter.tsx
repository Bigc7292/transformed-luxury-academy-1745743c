import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { contentService } from '@/services/contentService';
import { Loader2, Plus, Video } from 'lucide-react';

interface S3VideoImporterProps {
  onVideoAdded: () => void;
}

const S3VideoImporter: React.FC<S3VideoImporterProps> = ({ onVideoAdded }) => {
  const { toast } = useToast();
  const [isAdding, setIsAdding] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [videoData, setVideoData] = useState({
    title: '',
    description: '',
    url: '',
    thumbnail_url: '',
    category: 'promotional',
    is_featured: false,
    active: true
  });
  
  const [batchUrls, setBatchUrls] = useState('');
  const [isBatchAdding, setIsBatchAdding] = useState(false);
  const [showBatchForm, setShowBatchForm] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setVideoData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (value: string, name: string) => {
    setVideoData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSwitchChange = (checked: boolean, name: string) => {
    setVideoData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleAddVideo = async () => {
    if (!videoData.title || !videoData.url) {
      toast({
        title: "Missing Information",
        description: "Please provide at least a title and URL for the video.",
        variant: "destructive"
      });
      return;
    }

    setIsAdding(true);

    try {
      const result = await contentService.createContent({
        ...videoData,
        media_type: 'video',
        page_location: 'media',
        page_section: 'media_videos'
      });

      if (result.success) {
        toast({
          title: "Video Added",
          description: `Successfully added video: ${videoData.title}`
        });
        
        // Reset form
        setVideoData({
          title: '',
          description: '',
          url: '',
          thumbnail_url: '',
          category: 'promotional',
          is_featured: false,
          active: true
        });
        
        // Notify parent component
        onVideoAdded();
        
        // Hide form
        setShowForm(false);
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to add video. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
      console.error("Error adding video:", error);
    } finally {
      setIsAdding(false);
    }
  };

  const handleBatchAdd = async () => {
    if (!batchUrls.trim()) {
      toast({
        title: "No URLs Provided",
        description: "Please enter at least one video URL.",
        variant: "destructive"
      });
      return;
    }

    const urls = batchUrls.split(',').map(url => url.trim()).filter(url => url);
    
    if (urls.length === 0) {
      toast({
        title: "No Valid URLs",
        description: "Please enter valid video URLs separated by commas.",
        variant: "destructive"
      });
      return;
    }

    setIsBatchAdding(true);
    let successCount = 0;
    let errorCount = 0;

    try {
      for (const [index, url] of urls.entries()) {
        try {
          const result = await contentService.createContent({
            title: `S3 Video ${index + 1}`,
            description: `Imported video from S3 bucket`,
            url,
            thumbnail_url: '',
            category: 'promotional',
            media_type: 'video',
            page_location: 'media',
            page_section: 'media_videos',
            is_featured: false,
            active: true
          });

          if (result.success) {
            successCount++;
          } else {
            errorCount++;
            console.error(`Failed to add video ${index + 1}:`, result.error);
          }
        } catch (error) {
          errorCount++;
          console.error(`Error adding video ${index + 1}:`, error);
        }
      }

      if (successCount > 0) {
        toast({
          title: "Videos Added",
          description: `Successfully added ${successCount} videos. ${errorCount > 0 ? `Failed to add ${errorCount} videos.` : ''}`
        });
        
        // Reset form
        setBatchUrls('');
        
        // Notify parent component
        onVideoAdded();
        
        // Hide form
        setShowBatchForm(false);
      } else {
        toast({
          title: "Error",
          description: "Failed to add any videos. Please check the console for details.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
      console.error("Error in batch add:", error);
    } finally {
      setIsBatchAdding(false);
    }
  };

  return (
    <Card className="mb-8">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>S3 Video Importer</CardTitle>
          <CardDescription>
            Add videos from your AWS S3 bucket to the media showcase
          </CardDescription>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            onClick={() => {
              setShowForm(!showForm);
              setShowBatchForm(false);
            }}
            className="flex items-center gap-1"
          >
            <Video size={16} /> {showForm ? 'Hide Form' : 'Add Single Video'}
          </Button>
          <Button 
            variant="outline" 
            onClick={() => {
              setShowBatchForm(!showBatchForm);
              setShowForm(false);
            }}
            className="flex items-center gap-1"
          >
            <Plus size={16} /> {showBatchForm ? 'Hide Batch' : 'Batch Add Videos'}
          </Button>
        </div>
      </CardHeader>
      
      {showForm && (
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Video Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={videoData.title}
                  onChange={handleInputChange}
                  placeholder="Enter video title"
                />
              </div>
              
              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  value={videoData.category}
                  onValueChange={(value) => handleSelectChange(value, 'category')}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="promotional">Promotional</SelectItem>
                    <SelectItem value="staff">Staff</SelectItem>
                    <SelectItem value="training">Training</SelectItem>
                    <SelectItem value="ceo">CEO</SelectItem>
                    <SelectItem value="founder">Founder</SelectItem>
                    <SelectItem value="awards">Awards</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={videoData.description}
                onChange={handleInputChange}
                placeholder="Enter video description"
                rows={3}
              />
            </div>
            
            <div>
              <Label htmlFor="url">Video URL</Label>
              <Input
                id="url"
                name="url"
                value={videoData.url}
                onChange={handleInputChange}
                placeholder="Enter S3 video URL"
              />
            </div>
            
            <div>
              <Label htmlFor="thumbnail_url">Thumbnail URL (Optional)</Label>
              <Input
                id="thumbnail_url"
                name="thumbnail_url"
                value={videoData.thumbnail_url}
                onChange={handleInputChange}
                placeholder="Enter thumbnail URL"
              />
            </div>
            
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <Switch
                  id="is_featured"
                  checked={videoData.is_featured}
                  onCheckedChange={(checked) => handleSwitchChange(checked, 'is_featured')}
                />
                <Label htmlFor="is_featured">Featured</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="active"
                  checked={videoData.active}
                  onCheckedChange={(checked) => handleSwitchChange(checked, 'active')}
                />
                <Label htmlFor="active">Active</Label>
              </div>
            </div>
            
            <Button 
              onClick={handleAddVideo} 
              disabled={isAdding}
              className="w-full"
            >
              {isAdding ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding Video...
                </>
              ) : (
                'Add Video to Database'
              )}
            </Button>
          </div>
        </CardContent>
      )}
      
      {showBatchForm && (
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="batchUrls">Video URLs (Comma Separated)</Label>
              <Textarea
                id="batchUrls"
                value={batchUrls}
                onChange={(e) => setBatchUrls(e.target.value)}
                placeholder="Enter S3 video URLs separated by commas"
                rows={5}
              />
            </div>
            
            <p className="text-sm text-gray-500">
              Note: Videos will be added with default titles and descriptions. You can edit them later.
            </p>
            
            <Button 
              onClick={handleBatchAdd} 
              disabled={isBatchAdding}
              className="w-full"
            >
              {isBatchAdding ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding Videos...
                </>
              ) : (
                'Add All Videos to Database'
              )}
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default S3VideoImporter;
