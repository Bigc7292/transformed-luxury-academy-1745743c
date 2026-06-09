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
      <DialogContent className="sm:max-w-3xl bg-black border-gold-500/20 text-zinc-200">
        <DialogHeader>
          <DialogTitle className="text-gold-500 font-serif text-2xl">Bulk Upload Content</DialogTitle>
          <DialogDescription className="text-zinc-400">
            Upload multiple content items at once using CSV format.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex justify-end mb-2">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1 border-zinc-800 text-zinc-400 hover:bg-zinc-900/50 hover:text-zinc-200"
            onClick={handleDownloadTemplate}
          >
            <Download className="h-4 w-4" /> Download Template
          </Button>
        </div>
        
        <Textarea
          value={csvContent}
          onChange={(e) => setCsvContent(e.target.value)}
          placeholder="Paste your CSV content here..."
          className="min-h-[200px] font-mono text-sm bg-zinc-900 border-zinc-800 text-zinc-200 placeholder-zinc-650 focus:ring-gold-500"
        />
        
        <div className="text-sm text-zinc-400 space-y-1">
          <p>CSV format should include headers: title, description, category, media_type, url, thumbnail_url, is_featured</p>
          <p>Categories: promotional, staff, awards, ceo, founder</p>
          <p>Media types: image, video</p>
        </div>
        
        {validationErrors.length > 0 && (
          <Alert variant="destructive" className="bg-red-950/20 border-red-500/20 text-red-400">
            <AlertTriangle className="h-4 w-4 text-red-400" />
            <AlertTitle>Validation Errors</AlertTitle>
            <AlertDescription>
              <ul className="list-disc pl-5 mt-2 text-zinc-300">
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
          <Alert variant={uploadResult.success ? "default" : "destructive"} className={uploadResult.success ? "bg-zinc-900 border-gold-500/20 text-gold-400" : "bg-red-950/20 border-red-500/20 text-red-400"}>
            {uploadResult.success ? (
              <CheckCircle className="h-4 w-4 text-gold-500" />
            ) : (
              <AlertTriangle className="h-4 w-4 text-red-400" />
            )}
            <AlertTitle className="font-serif">
              {uploadResult.success
                ? `Successfully uploaded ${uploadResult.count} items`
                : "Upload Failed"}
            </AlertTitle>
            {uploadResult.errors.length > 0 && (
              <AlertDescription className="text-zinc-300">
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
            className="border-zinc-800 text-zinc-400 hover:bg-zinc-900/50 hover:text-zinc-200"
          >
            Clear
          </Button>
          <Button 
            variant="outline" 
            onClick={handleClose}
            className="border-zinc-800 text-zinc-400 hover:bg-zinc-900/50 hover:text-zinc-200"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleValidateAndUpload} 
            className="bg-gold-500 hover:bg-gold-400 text-black font-semibold"
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
