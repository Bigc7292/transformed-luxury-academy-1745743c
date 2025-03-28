
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
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Content</DialogTitle>
          <DialogDescription>
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
          >
            Cancel
          </Button>
          <Button 
            onClick={handleUpdate} 
            className="bg-salon-pink-600 hover:bg-salon-pink-700"
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
