import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { RefreshCw, Download, Upload, AlertTriangle, CheckCircle } from "lucide-react";
import { parseCsvContent, uploadBulkContent, getCsvTemplate } from "@/utils/bulkContentUpload";

interface BulkUploadDialogProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  onUploadComplete: () => void;
}

const BulkUploadDialog: React.FC<BulkUploadDialogProps> = ({
  isOpen,
  setIsOpen,
  onUploadComplete,
}) => {
  const [csvContent, setCsvContent] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [uploadResult, setUploadResult] = useState<{
    success: boolean;
    count: number;
    errors: string[];
  } | null>(null);

  const handleValidateAndUpload = async () => {
    // Reset previous results
    setValidationErrors([]);
    setUploadResult(null);
    
    // Parse and validate CSV
    const { items, errors } = parseCsvContent(csvContent);
    
    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }
    
    // Proceed with upload
    setIsUploading(true);
    
    try {
      const result = await uploadBulkContent(items);
      setUploadResult(result);
      
      if (result.success) {
        // If successful, clear the textarea
        if (result.errors.length === 0) {
          setCsvContent("");
        }
        
        // Refresh the content list
        onUploadComplete();
      }
    } catch (error: any) {
      setUploadResult({
        success: false,
        count: 0,
        errors: [error.message || "An unknown error occurred"],
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDownloadTemplate = () => {
    const template = getCsvTemplate();
    const blob = new Blob([template], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "content_upload_template.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleClose = () => {
    setIsOpen(false);
    setValidationErrors([]);
    setUploadResult(null);
    // Keep the CSV content in case the user wants to try again
  };

  const handleClear = () => {
    setCsvContent("");
    setValidationErrors([]);
    setUploadResult(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Bulk Upload Content</DialogTitle>
          <DialogDescription>
            Upload multiple content items at once using CSV format.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex justify-end mb-2">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
            onClick={handleDownloadTemplate}
          >
            <Download className="h-4 w-4" /> Download Template
          </Button>
        </div>
        
        <Textarea
          value={csvContent}
          onChange={(e) => setCsvContent(e.target.value)}
          placeholder="Paste your CSV content here..."
          className="min-h-[200px] font-mono text-sm"
        />
        
        <div className="text-sm text-muted-foreground">
          <p>CSV format should include headers: title, description, category, media_type, url, thumbnail_url, is_featured</p>
          <p>Categories: promotional, staff, awards, ceo, founder</p>
          <p>Media types: image, video</p>
        </div>
        
        {validationErrors.length > 0 && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Validation Errors</AlertTitle>
            <AlertDescription>
              <ul className="list-disc pl-5 mt-2">
                {validationErrors.slice(0, 5).map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
                {validationErrors.length > 5 && (
                  <li>...and {validationErrors.length - 5} more errors</li>
                )}
              </ul>
            </AlertDescription>
          </Alert>
        )}
        
        {uploadResult && (
          <Alert variant={uploadResult.success ? "default" : "destructive"}>
            {uploadResult.success ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              <AlertTriangle className="h-4 w-4" />
            )}
            <AlertTitle>
              {uploadResult.success
                ? `Successfully uploaded ${uploadResult.count} items`
                : "Upload Failed"}
            </AlertTitle>
            {uploadResult.errors.length > 0 && (
              <AlertDescription>
                <ul className="list-disc pl-5 mt-2">
                  {uploadResult.errors.slice(0, 5).map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                  {uploadResult.errors.length > 5 && (
                    <li>...and {uploadResult.errors.length - 5} more errors</li>
                  )}
                </ul>
              </AlertDescription>
            )}
          </Alert>
        )}
        
        <DialogFooter className="gap-2">
          <Button 
            variant="outline" 
            onClick={handleClear}
          >
            Clear
          </Button>
          <Button 
            variant="outline" 
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleValidateAndUpload} 
            className="bg-salon-pink-600 hover:bg-salon-pink-700"
            disabled={!csvContent.trim() || isUploading}
          >
            {isUploading ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Upload Content
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BulkUploadDialog;
