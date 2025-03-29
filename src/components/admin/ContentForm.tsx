import React from "react";
import { ContentCategory, ContentItem, MediaType } from "@/types/content";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FileUpload from "@/components/FileUpload";
import { RefreshCw } from "lucide-react";

interface ContentFormProps {
  content: ContentItem | Partial<ContentItem>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSelectChange: (value: string, name: string) => void;
  handleSwitchChange: (checked: boolean, name: string) => void;
  handleMediaUploadComplete: (url: string) => void;
  handleThumbnailUploadComplete: (url: string) => void;
  isNew?: boolean;
}

const ContentForm: React.FC<ContentFormProps> = ({
  content,
  handleInputChange,
  handleSelectChange,
  handleSwitchChange,
  handleMediaUploadComplete,
  handleThumbnailUploadComplete,
  isNew = false,
}) => {
  const prefix = isNew ? "" : "edit-";
  
  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor={`${prefix}title`} className="text-right">
          Title
        </Label>
        <Input
          id={`${prefix}title`}
          name="title"
          value={content.title || ''}
          onChange={handleInputChange}
          className="col-span-3"
          required
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor={`${prefix}description`} className="text-right">
          Description
        </Label>
        <Textarea
          id={`${prefix}description`}
          name="description"
          value={content.description || ''}
          onChange={handleInputChange}
          className="col-span-3"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor={`${prefix}category`} className="text-right">
          Category
        </Label>
        <Select
          value={content.category}
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
            <SelectItem value="partner">Partner</SelectItem>
            <SelectItem value="videos">Videos</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor={`${prefix}media_type`} className="text-right">
          Media Type
        </Label>
        <Select
          value={content.media_type}
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
      <div className="grid grid-cols-4 items-start gap-4">
        <Label htmlFor={`${prefix}url`} className="text-right pt-2">
          Media
        </Label>
        <div className="col-span-3">
          <div className="flex flex-col gap-2">
            {content.url ? (
              <div className="relative group">
                {content.media_type === "image" ? (
                  <img 
                    src={content.url} 
                    alt="Preview" 
                    className="w-full h-40 object-cover rounded-md" 
                  />
                ) : (
                  <video 
                    src={content.url} 
                    className="w-full h-40 object-cover rounded-md" 
                    controls 
                  />
                )}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-white border-white hover:bg-white/20"
                    onClick={() => handleSelectChange("", 'url')}
                  >
                    Replace
                  </Button>
                </div>
              </div>
            ) : (
              <FileUpload 
                onUploadComplete={handleMediaUploadComplete}
                accept={content.media_type === "image" ? "image/*" : "video/*"}
                label={`Upload ${content.media_type === "image" ? "Image" : "Video"}`}
                uploadPath={content.category || "promotional"}
              />
            )}
            
            <p className="text-xs text-gray-500 mt-1">Or enter URL directly:</p>
            <Input
              id={`${prefix}url`}
              name="url"
              value={content.url || ''}
              onChange={handleInputChange}
              placeholder="https://"
            />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-4 items-start gap-4">
        <Label htmlFor={`${prefix}thumbnail_url`} className="text-right pt-2">
          Thumbnail
        </Label>
        <div className="col-span-3">
          <div className="flex flex-col gap-2">
            {content.thumbnail_url ? (
              <div className="relative group">
                <img 
                  src={content.thumbnail_url} 
                  alt="Thumbnail" 
                  className="w-full h-32 object-cover rounded-md" 
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-white border-white hover:bg-white/20"
                    onClick={() => handleSelectChange("", 'thumbnail_url')}
                  >
                    Replace
                  </Button>
                </div>
              </div>
            ) : (
              <FileUpload 
                onUploadComplete={handleThumbnailUploadComplete}
                accept="image/*"
                label="Upload Thumbnail"
                uploadPath="thumbnails"
              />
            )}
            
            <p className="text-xs text-gray-500 mt-1">Or enter URL directly:</p>
            <Input
              id={`${prefix}thumbnail_url`}
              name="thumbnail_url"
              value={content.thumbnail_url || ''}
              onChange={handleInputChange}
              placeholder="https://"
            />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor={`${prefix}is_featured`} className="text-right">
          Featured
        </Label>
        <div className="col-span-3 flex items-center space-x-2">
          <Switch
            id={`${prefix}is_featured`}
            checked={content.is_featured || false}
            onCheckedChange={(checked) => handleSwitchChange(checked, 'is_featured')}
          />
          <Label htmlFor={`${prefix}is_featured`}>
            {content.is_featured ? 'Yes' : 'No'}
          </Label>
        </div>
      </div>
    </div>
  );
};

export default ContentForm;
