
import React from "react";
import { ContentCategory, MediaType, ContentItem } from "@/types/content";
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
      <DialogContent className="sm:max-w-lg bg-black border-gold-500/20 text-zinc-200">
        <DialogHeader>
          <DialogTitle className="text-gold-500 font-serif text-2xl">Add New Content</DialogTitle>
          <DialogDescription className="text-zinc-400">
            Create a new content item to be displayed on the website.
          </DialogDescription>
        </DialogHeader>
        <ContentForm 
          content={newContent as Partial<ContentItem>}
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
            className="border-zinc-800 text-zinc-400 hover:bg-zinc-900/50 hover:text-zinc-200"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleCreate} 
            className="bg-gold-500 hover:bg-gold-400 text-black font-semibold"
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
