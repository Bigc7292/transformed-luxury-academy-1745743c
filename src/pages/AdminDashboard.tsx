import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdminHeader from "@/components/admin/AdminHeader";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Image as ImageIcon, FileText, Activity, Users, Star, TrendingUp, Clock, Users as UsersIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const AdminDashboard: React.FC = () => {
  const { handleLogout } = useAdminAuth();
  const navigate = useNavigate();

  // Fetch quick stats
  // Fetch content stats for dashboard cards
  const { data: contentStats, isLoading: isContentLoading } = useQuery({
    queryKey: ["admin-dashboard-content-stats"],
    queryFn: async () => {
      // Get total content and count of featured content
      const { count: contentCount } = await supabase
        .from("content")
        .select("id", { count: "exact", head: true });
      
      const { data: featuredContent } = await supabase
        .from("content")
        .select("id")
        .eq("is_featured", true);

      return {
        total: contentCount || 0,
        featured: featuredContent?.length || 0,
      };
    },
  });

  // Fetch chat analytics
  const { data: chatStats, isLoading: isChatLoading } = useQuery({
    queryKey: ["admin-dashboard-chat-stats"],
    queryFn: async () => {
      // Get session count (unique chats)
      const { data: sessions, error: sessionError } = await supabase
        .from("chat_history")
        .select("session_id, user_email, created_at")
        .order("created_at", { ascending: false });

      if (sessionError) throw sessionError;

      // Get recent chats (last 24 hours)
      const oneDayAgo = new Date();
      oneDayAgo.setHours(oneDayAgo.getHours() - 24);
      
      const recentSessions = sessions?.filter(session => 
        new Date(session.created_at) > oneDayAgo
      ) || [];

      return {
        totalSessions: sessions?.length || 0,
        recentSessions: recentSessions.length || 0,
        uniqueUsers: [...new Set(sessions?.map(s => s.user_email).filter(Boolean))].length || 0,
      };
    },
  });

  // Fetch inquiry analytics
  const { data: inquiryStats, isLoading: isInquiryLoading } = useQuery({
    queryKey: ["admin-dashboard-inquiry-stats"],
    queryFn: async () => {
      const { data: inquiries } = await supabase
        .from("customer_inquiries")
        .select("id, status, created_at")
        .order("created_at", { ascending: false });

      if (!inquiries) return { total: 0, byStatus: {} };

      // Count by status
      const byStatus = inquiries.reduce((acc, curr) => {
        acc[curr.status] = (acc[curr.status] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      // Get recent inquiries (last 7 days)
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      
      const recentInquiries = inquiries.filter(inquiry => 
        new Date(inquiry.created_at) > sevenDaysAgo
      );

      return {
        total: inquiries.length,
        byStatus,
        recent: recentInquiries.length,
      };
    },
  });

  // Combine loading states
  const isLoading = isContentLoading || isChatLoading || isInquiryLoading;

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

        {/* Admin Insights */}
        <div className="mb-8 p-6 rounded-lg bg-zinc-950/40 border border-zinc-800">
          <h3 className="text-xl font-serif text-gold-500 mb-4">Quick Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Chat Activity Chart */}
            <Card className="bg-zinc-950/40 border-zinc-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-zinc-200 text-lg font-medium">Chat Activity Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {chatStats ? (
                    <>
                      <div className="flex justify-between items-center">
                        <span className="text-zinc-400">Total Sessions</span>
                        <span className="text-zinc-100 font-medium">{chatStats.totalSessions}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-zinc-400">New Sessions (Last 24h)</span>
                        <span className="text-green-400 font-medium">{chatStats.recentSessions}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-zinc-400">Unique Users</span>
                        <span className="text-zinc-100 font-medium">{chatStats.uniqueUsers}</span>
                      </div>
                    </>
                  ) : (
                    <div className="text-zinc-500">Loading...</div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Inquiry Status */}
            <Card className="bg-zinc-950/40 border-zinc-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-zinc-200 text-lg font-medium">Inquiry Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {inquiryStats ? (
                    <>
                      <div className="flex justify-between items-center">
                        <span className="text-zinc-400">Total Inquiries</span>
                        <span className="text-zinc-100 font-medium">{inquiryStats.total}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-zinc-400">Recent (Last 7 days)</span>
                        <span className="text-blue-400 font-medium">{inquiryStats.recent}</span>
                      </div>
                      {Object.keys(inquiryStats.byStatus || {}).map((status) => (
                        <div key={status} className="flex justify-between items-center">
                          <span className="capitalize text-zinc-400">{status}</span>
                          <span className={`font-medium ${status === 'new' ? 'text-blue-400' : 
                                               status === 'inprogress' ? 'text-yellow-400' :
                                               status === 'completed' ? 'text-green-400' :
                                               'text-red-400'}`}>
                            {inquiryStats.byStatus[status]}
                          </span>
                        </div>
                      ))}
                    </>
                  ) : (
                    <div className="text-zinc-500">Loading...</div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-zinc-950/40 border-zinc-800 hover:border-gold-500/30 transition-colors">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-zinc-200 text-lg font-medium">Total Content</CardTitle>
              <ImageIcon className="text-gold-500 h-5 w-5" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-zinc-100 mb-2">
                {isLoading ? "..." : contentStats?.total}
              </div>
              <CardDescription className="text-zinc-500">
                <div>Photos & videos</div>
                {contentStats?.featured > 0 && (
                  <div className="text-gold-400 mt-1">• {contentStats.featured} featured items</div>
                )}
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-zinc-950/40 border-zinc-800 hover:border-gold-500/30 transition-colors">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-zinc-200 text-lg font-medium">Chat Sessions</CardTitle>
              <MessageSquare className="text-gold-500 h-5 w-5" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-zinc-100 mb-2">
                {isLoading ? "..." : chatStats?.totalSessions}
              </div>
              <CardDescription className="text-zinc-500">
                <div>• {chatStats?.recentSessions} recent (24h)</div>
                <div>• {chatStats?.uniqueUsers} unique users</div>
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-zinc-950/40 border-zinc-800 hover:border-gold-500/30 transition-colors">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-zinc-200 text-lg font-medium">Inquiries</CardTitle>
              <Users className="text-gold-500 h-5 w-5" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-zinc-100 mb-2">
                {isLoading ? "..." : inquiryStats?.total}
              </div>
              <CardDescription className="text-zinc-500">
                <div>• {inquiryStats?.recent} recent (7d)</div>
                {inquiryStats?.byStatus?.new > 0 && (
                  <div className="text-blue-400 mt-1">• {inquiryStats.byStatus.new} new</div>
                )}
              </CardDescription>
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
