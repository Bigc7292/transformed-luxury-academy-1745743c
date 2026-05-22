
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, Inbox, Image, FileText } from "lucide-react";

interface AdminHeaderProps {
  title: string;
  handleLogout: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ title, handleLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine which page we're on to highlight the active nav item
  const isContentPage = location.pathname === '/admin/content';
  const isMediaPage = location.pathname === '/admin/media';
  const isInboxPage = location.pathname === '/admin/inbox';

  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <h1 className="text-3xl md:text-4xl font-serif text-gold-700">
          {title}
        </h1>
        <Button
          onClick={handleLogout}
          variant="outline"
          className="border-red-500 text-red-600 hover:bg-red-50 flex items-center gap-2"
        >
          <LogOut size={16} /> Logout
        </Button>
      </div>

      <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-2">
        <Button
          onClick={() => navigate("/admin/content")}
          variant={isContentPage ? "default" : "ghost"}
          className={`flex items-center gap-2 ${isContentPage ? 'bg-gold-600 hover:bg-gold-700' : 'text-gray-600 hover:text-gold-600'}`}
        >
          <FileText size={16} /> General Content
        </Button>
        <Button
          onClick={() => navigate("/admin/media")}
          variant={isMediaPage ? "default" : "ghost"}
          className={`flex items-center gap-2 ${isMediaPage ? 'bg-gold-600 hover:bg-gold-700' : 'text-gray-600 hover:text-gold-600'}`}
        >
          <Image size={16} /> Media Showcase
        </Button>
        <Button
          onClick={() => navigate("/admin/inbox")}
          variant={isInboxPage ? "default" : "ghost"}
          className={`flex items-center gap-2 ${isInboxPage ? 'bg-gold-600 hover:bg-gold-700' : 'text-gray-600 hover:text-gold-600'}`}
        >
          <Inbox size={16} /> Customer Inquiries
        </Button>
      </div>
    </div>
  );
};

export default AdminHeader;
