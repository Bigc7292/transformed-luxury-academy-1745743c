
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, Inbox, Image, FileText, KeyRound } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface AdminHeaderProps {
  title: string;
  handleLogout: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ title, handleLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      toast({
        title: "Password too short",
        description: "Password must be at least 6 characters.",
        variant: "destructive",
      });
      return;
    }

    setIsUpdating(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) throw error;

      toast({
        title: "Password updated!",
        description: "Your permanent password has been successfully set.",
      });
      setIsPasswordModalOpen(false);
      setNewPassword("");
    } catch (error: any) {
      toast({
        title: "Error setting password",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  // Determine which page we're on to highlight the active nav item
  const isContentPage = location.pathname === '/admin/content';
  const isMediaPage = location.pathname === '/admin/media';
  const isInboxPage = location.pathname === '/admin/inbox';

  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <h1 className="text-3xl md:text-4xl font-serif text-gold-500">
          {title}
        </h1>
        <div className="flex gap-2">
          <Button
            onClick={() => setIsPasswordModalOpen(true)}
            variant="outline"
            className="border-gold-500/30 text-gold-500 hover:bg-gold-500/10 hover:text-gold-400 flex items-center gap-2"
          >
            <KeyRound size={16} /> Set Password
          </Button>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-red-500/40 text-red-400 hover:bg-red-500/10 hover:text-red-300 flex items-center gap-2"
          >
            <LogOut size={16} /> Logout
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 border-b border-zinc-800 pb-2">
        <Button
          onClick={() => navigate("/admin/content")}
          variant={isContentPage ? "default" : "ghost"}
          className={`flex items-center gap-2 ${isContentPage ? 'bg-gold-500 hover:bg-gold-400 text-black font-semibold' : 'text-zinc-400 hover:text-gold-500 hover:bg-zinc-900/50'}`}
        >
          <FileText size={16} /> General Content
        </Button>
        <Button
          onClick={() => navigate("/admin/media")}
          variant={isMediaPage ? "default" : "ghost"}
          className={`flex items-center gap-2 ${isMediaPage ? 'bg-gold-500 hover:bg-gold-400 text-black font-semibold' : 'text-zinc-400 hover:text-gold-500 hover:bg-zinc-900/50'}`}
        >
          <Image size={16} /> Media Showcase
        </Button>
        <Button
          onClick={() => navigate("/admin/inbox")}
          variant={isInboxPage ? "default" : "ghost"}
          className={`flex items-center gap-2 ${isInboxPage ? 'bg-gold-500 hover:bg-gold-400 text-black font-semibold' : 'text-zinc-400 hover:text-gold-500 hover:bg-zinc-900/50'}`}
        >
          <Inbox size={16} /> Customer Inquiries
        </Button>
      </div>

      <Dialog open={isPasswordModalOpen} onOpenChange={setIsPasswordModalOpen}>
        <DialogContent className="sm:max-w-md bg-black border-gold-500/20 text-zinc-200">
          <DialogHeader>
            <DialogTitle className="text-gold-500 font-serif text-2xl">Set Permanent Password</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdatePassword} className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="new-password" className="text-gold-400">New Password</Label>
              <Input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={6}
                placeholder="••••••••"
                className="bg-zinc-900 border-gold-500/20 text-zinc-200 placeholder-zinc-500 focus:ring-gold-500"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" className="border-gold-500/20 text-gold-500 hover:bg-gold-500/10" onClick={() => setIsPasswordModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-gold-500 text-black hover:bg-gold-400 font-semibold" disabled={isUpdating}>
                {isUpdating ? "Saving..." : "Save Password"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminHeader;
