import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdminHeader from "@/components/admin/AdminHeader";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Image as ImageIcon, FileText, Activity, Users, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const AdminDashboard: React.FC = () => {
  const { handleLogout } = useAdminAuth();
  const navigate = useNavigate();

  // Fetch quick stats
  const { data: stats, isLoading } = useQuery({
    queryKey: ["admin-dashboard-stats"],
    queryFn: async () => {
      const [
        { count: contentCount },
        { count: chatCount },
        { count: inquiryCount }
      ] = await Promise.all([
        supabase.from("content").select("*", { count: "exact", head: true }),
        supabase.from("chat_history").select("session_id", { count: "exact", head: true }),
        supabase.from("customer_inquiries").select("*", { count: "exact", head: true })
      ]);

      return {
        content: contentCount || 0,
        chats: chatCount || 0, // Note: this is total messages, unique sessions might be less, but gives a rough idea
        inquiries: inquiryCount || 0,
      };
    },
  });

  return (
    <div className="min-h-screen bg-background text-foreground admin-page">
      <Navbar />
      <div className="container mx-auto pt-32 pb-20 px-4 admin-container">
        <AdminHeader title="Admin Dashboard" handleLogout={handleLogout} />

        <div className="mb-8 p-6 rounded-lg bg-gold-950/20 border border-gold-500/20">
          <h2 className="text-2xl font-serif text-gold-500 mb-2">Welcome back, Niki!</h2>
          <p className="text-zinc-400">
            This is your central hub for managing the Transformed Luxury Academy website. From here, you can review what the AI has been telling your customers, swap out your promo pictures, and manage inquiries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-zinc-950/40 border-zinc-800 hover:border-gold-500/30 transition-colors">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-zinc-200 text-lg font-medium">Active Content</CardTitle>
              <ImageIcon className="text-gold-500 h-5 w-5" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-zinc-100 mb-2">
                {isLoading ? "..." : stats?.content}
              </div>
              <CardDescription className="text-zinc-500">Photos & videos live on site</CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-zinc-950/40 border-zinc-800 hover:border-gold-500/30 transition-colors">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-zinc-200 text-lg font-medium">AI Chat Logs</CardTitle>
              <MessageSquare className="text-gold-500 h-5 w-5" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-zinc-100 mb-2">
                {isLoading ? "..." : stats?.chats}
              </div>
              <CardDescription className="text-zinc-500">Total messages processed</CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-zinc-950/40 border-zinc-800 hover:border-gold-500/30 transition-colors">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-zinc-200 text-lg font-medium">Customer Inquiries</CardTitle>
              <Users className="text-gold-500 h-5 w-5" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-zinc-100 mb-2">
                {isLoading ? "..." : stats?.inquiries}
              </div>
              <CardDescription className="text-zinc-500">Form submissions received</CardDescription>
            </CardContent>
          </Card>
        </div>

        <h3 className="text-xl font-serif text-zinc-100 mb-4 mt-12">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button 
            onClick={() => navigate('/admin/media')}
            className="h-24 justify-start p-6 bg-zinc-900 border border-zinc-800 hover:border-gold-500 hover:bg-zinc-900 text-left flex gap-4"
          >
            <div className="bg-gold-500/10 p-3 rounded-full">
              <Star className="h-6 w-6 text-gold-500" />
            </div>
            <div>
              <div className="text-lg font-medium text-zinc-100">Upload New Promos</div>
              <div className="text-sm text-zinc-400 font-normal">Add pictures or videos to the media showcase</div>
            </div>
          </Button>

          <Button 
            onClick={() => navigate('/admin/inbox')}
            className="h-24 justify-start p-6 bg-zinc-900 border border-zinc-800 hover:border-gold-500 hover:bg-zinc-900 text-left flex gap-4"
          >
            <div className="bg-blue-500/10 p-3 rounded-full">
              <Activity className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <div className="text-lg font-medium text-zinc-100">Review AI Chats</div>
              <div className="text-sm text-zinc-400 font-normal">See exactly what the AI has been telling clients</div>
            </div>
          </Button>

          <Button 
            onClick={() => navigate('/admin/content')}
            className="h-24 justify-start p-6 bg-zinc-900 border border-zinc-800 hover:border-gold-500 hover:bg-zinc-900 text-left flex gap-4 md:col-span-2"
          >
            <div className="bg-green-500/10 p-3 rounded-full">
              <FileText className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <div className="text-lg font-medium text-zinc-100">Manage General Content</div>
              <div className="text-sm text-zinc-400 font-normal">Edit text, team members, or other standard website content</div>
            </div>
          </Button>
        </div>

      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
