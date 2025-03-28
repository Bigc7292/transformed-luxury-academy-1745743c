
import React from "react";
import { ContentCategory, MediaType } from "@/types/content";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import ContentForm from "./ContentForm";

interface CreateContentDialogProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  newContent: {
    title: string;
    description: string;
    category: ContentCategory;
    media_type: MediaType;
    url: string;
    thumbnail_url: string;
    is_featured: boolean;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSelectChange: (value: string, name: string) => void;
  handleSwitchChange: (checked: boolean, name: string) => void;
  handleCreate: () => void;
  handleMediaUploadComplete: (url: string) => void;
  handleThumbnailUploadComplete: (url: string) => void;
  isCreating: boolean;
}

const CreateContentDialog: React.FC<CreateContentDialogProps> = ({
  isOpen,
  setIsOpen,
  newContent,
  handleInputChange,
  handleSelectChange,
  handleSwitchChange,
  handleCreate,
  handleMediaUploadComplete,
  handleThumbnailUploadComplete,
  isCreating,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add New Content</DialogTitle>
          <DialogDescription>
            Create a new content item to be displayed on the website.
          </DialogDescription>
        </DialogHeader>
        <ContentForm 
          content={newContent}
          handleInputChange={handleInputChange}
          handleSelectChange={handleSelectChange}
          handleSwitchChange={handleSwitchChange}
          handleMediaUploadComplete={handleMediaUploadComplete}
          handleThumbnailUploadComplete={handleThumbnailUploadComplete}
          isNew={true}
        />
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleCreate} 
            className="bg-salon-pink-600 hover:bg-salon-pink-700"
            disabled={isCreating}
          >
            {isCreating ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : 'Create Content'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateContentDialog;
