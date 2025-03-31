
import React from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import ContentFilters from "@/components/admin/ContentFilters";
import { ContentCategory, MediaType } from "@/types/content";

interface AdminFilterBarProps {
  categoryFilter: ContentCategory | 'all';
  setCategoryFilter: (value: ContentCategory | 'all') => void;
  mediaTypeFilter: MediaType | 'all';
  setMediaTypeFilter: (value: MediaType | 'all') => void;
  pageLocationFilter: string | 'all';
  setPageLocationFilter: (value: string | 'all') => void;
  activeFilter: boolean | 'all';
  setActiveFilter: (value: boolean | 'all') => void;
  setIsBulkUploadDialogOpen: (value: boolean) => void;
}

const AdminFilterBar: React.FC<AdminFilterBarProps> = ({
  categoryFilter,
  setCategoryFilter,
  mediaTypeFilter,
  setMediaTypeFilter,
  pageLocationFilter,
  setPageLocationFilter,
  activeFilter,
  setActiveFilter,
  setIsBulkUploadDialogOpen
}) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <ContentFilters 
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        mediaTypeFilter={mediaTypeFilter}
        setMediaTypeFilter={setMediaTypeFilter}
        pageLocationFilter={pageLocationFilter}
        setPageLocationFilter={setPageLocationFilter}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />
      
      <Button
        onClick={() => setIsBulkUploadDialogOpen(true)}
        variant="outline"
        className="flex items-center gap-2"
      >
        <Upload size={16} /> Bulk Upload
      </Button>
    </div>
  );
};

export default AdminFilterBar;
