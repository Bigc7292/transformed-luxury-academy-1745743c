
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, Inbox } from "lucide-react";

interface AdminHeaderProps {
  title: string;
  handleLogout: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ title, handleLogout }) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-4xl font-serif text-salon-pink-700">
        {title}
      </h1>
      <div className="flex space-x-4">
        <Button
          onClick={() => navigate("/admin/inbox")}
          className="bg-salon-pink-600 hover:bg-salon-pink-700 flex items-center gap-2"
        >
          <Inbox size={16} /> Customer Inquiries
        </Button>
        <Button
          onClick={handleLogout}
          variant="outline"
          className="border-red-500 text-red-600 hover:bg-red-50 flex items-center gap-2"
        >
          <LogOut size={16} /> Logout
        </Button>
      </div>
    </div>
  );
};

export default AdminHeader;
