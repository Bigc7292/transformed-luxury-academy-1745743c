
import React, { useState } from "react";
import { ContentItem } from "@/types/content";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface DeleteContentDialogProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  contentToDelete: ContentItem | null;
  handleConfirmDelete: (confirmText: string) => void;
  isDeleting: boolean;
}

const DeleteContentDialog: React.FC<DeleteContentDialogProps> = ({
  isOpen,
  setIsOpen,
  contentToDelete,
  handleConfirmDelete,
  isDeleting,
}) => {
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  
  if (!contentToDelete) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      setIsOpen(open);
      if (!open) setDeleteConfirmText("");
    }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-5 w-5" /> Delete Content
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the content from the system.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="mb-4">
            Please type <span className="font-semibold">delete</span> to confirm.
          </p>
          <Input 
            value={deleteConfirmText} 
            onChange={(e) => setDeleteConfirmText(e.target.value)} 
            placeholder="Type 'delete' to confirm" 
          />
        </div>
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => {
              setIsOpen(false);
              setDeleteConfirmText('');
            }}
          >
            Cancel
          </Button>
          <Button 
            variant="destructive" 
            onClick={() => handleConfirmDelete(deleteConfirmText)}
            disabled={deleteConfirmText.toLowerCase() !== 'delete' || isDeleting}
          >
            {isDeleting ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : 'Delete Content'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteContentDialog;
