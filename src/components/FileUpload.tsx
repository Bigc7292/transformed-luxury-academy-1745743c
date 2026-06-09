
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { UploadCloud, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FileUploadProps {
  onUploadComplete: (url: string) => void;
  accept?: string;
  label?: string;
  className?: string;
  uploadPath?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onUploadComplete,
  accept = "image/*,video/*",
  label = "Upload File",
  className = "",
  uploadPath = "general"
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setIsUploading(true);
    setError(null);
    
    // Simulate progress for better UX
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return prev;
        }
        return prev + 10;
      });
    }, 300);
    
    try {
      // Import here to avoid circular dependencies
      const { contentService } = await import("@/services/contentService");
      
      const result = await contentService.uploadMediaFile(file, uploadPath);
      
      clearInterval(progressInterval);
      
      if (result.success && result.url) {
        setUploadProgress(100);
        onUploadComplete(result.url);
        toast({
          title: "Upload Complete",
          description: "Your file has been uploaded successfully.",
        });
      } else {
        setError(result.error || "Upload failed");
        setUploadProgress(0);
        toast({
          title: "Upload Failed",
          description: result.error || "There was an error uploading your file.",
          variant: "destructive",
        });
      }
    } catch (err: any) {
      clearInterval(progressInterval);
      setError(err.message || "Upload failed");
      setUploadProgress(0);
      toast({
        title: "Upload Failed",
        description: err.message || "There was an error uploading your file.",
        variant: "destructive",
      });
    } finally {
      setTimeout(() => {
        setIsUploading(false);
        setUploadProgress(0);
      }, 1000);
    }
  };
  
  return (
    <div className={`w-full ${className}`}>
      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer border-zinc-800 bg-zinc-900/40 hover:bg-zinc-900/80 hover:border-gold-500/30 transition-colors">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          {isUploading ? (
            <div className="w-full px-4">
              <p className="mb-2 text-sm text-center text-zinc-400">Uploading...</p>
              <Progress value={uploadProgress} className="w-full bg-zinc-950 [&>[data-state=progress]]:bg-gold-500" />
            </div>
          ) : error ? (
            <div className="text-center">
              <AlertCircle className="mx-auto h-8 w-8 text-red-400 mb-2" />
              <p className="text-sm text-red-400">{error}</p>
              <p className="text-xs text-zinc-500 mt-1">Click to try again</p>
            </div>
          ) : uploadProgress === 100 ? (
            <div className="text-center">
              <CheckCircle className="mx-auto h-8 w-8 text-green-400 mb-2" />
              <p className="text-sm text-green-400">Upload Complete</p>
              <p className="text-xs text-zinc-500 mt-1">Click to upload another file</p>
            </div>
          ) : (
            <>
              <UploadCloud className="w-8 h-8 mb-2 text-gold-500/80" />
              <p className="mb-1 text-sm text-zinc-350">{label}</p>
              <p className="text-xs text-zinc-550">Click to upload (Max 10MB)</p>
            </>
          )}
        </div>
        <input 
          type="file" 
          className="hidden" 
          accept={accept} 
          onChange={handleFileChange}
          disabled={isUploading}
        />
      </label>
    </div>
  );
};

export default FileUpload;
