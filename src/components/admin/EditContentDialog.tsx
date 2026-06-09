
import React from "react";
import { ContentItem } from "@/types/content";
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

interface EditContentDialogProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  selectedContent: ContentItem | null;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSelectChange: (value: string, name: string) => void;
  handleSwitchChange: (checked: boolean, name: string) => void;
  handleUpdate: () => void;
  handleMediaUploadComplete: (url: string) => void;
  handleThumbnailUploadComplete: (url: string) => void;
  isUpdating: boolean;
}

const EditContentDialog: React.FC<EditContentDialogProps> = ({
  isOpen,
  setIsOpen,
  selectedContent,
  handleInputChange,
  handleSelectChange,
  handleSwitchChange,
  handleUpdate,
  handleMediaUploadComplete,
  handleThumbnailUploadComplete,
  isUpdating,
}) => {
  if (!selectedContent) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-lg bg-black border-gold-500/20 text-zinc-200">
        <DialogHeader>
          <DialogTitle className="text-gold-500 font-serif text-2xl">Edit Content</DialogTitle>
          <DialogDescription className="text-zinc-400">
            Make changes to the content item.
          </DialogDescription>
        </DialogHeader>
        <ContentForm 
          content={selectedContent}
          handleInputChange={handleInputChange}
          handleSelectChange={handleSelectChange}
          handleSwitchChange={handleSwitchChange}
          handleMediaUploadComplete={handleMediaUploadComplete}
          handleThumbnailUploadComplete={handleThumbnailUploadComplete}
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
            onClick={handleUpdate} 
            className="bg-gold-500 hover:bg-gold-400 text-black font-semibold"
            disabled={isUpdating}
          >
            {isUpdating ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : 'Save Changes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditContentDialog;
