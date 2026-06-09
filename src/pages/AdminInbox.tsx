
import React, { useState, useEffect } from "react";
import ResponsiveTable from "@/components/admin/ResponsiveTable";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { customerService, type CustomerInquiry } from "@/services/customerService";
import { getAllChatSessions, getChatHistory } from "@/services/chatbotService";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, MessageSquare, Clock, CheckCircle, XCircle, RefreshCw, AlertCircle } from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminInstructions from "@/components/admin/AdminInstructions";

const statusColors = {
  new: "bg-blue-950/40 text-blue-400 border border-blue-500/20",
  inprogress: "bg-yellow-950/40 text-yellow-400 border border-yellow-500/20",
  completed: "bg-green-950/40 text-green-400 border border-green-500/20",
  cancelled: "bg-red-950/40 text-red-400 border border-red-500/20"
};

// Chat History Section Component
const ChatHistorySection: React.FC = () => {
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<{user_message: string; bot_response: string; created_at: string}[]>([]);

  // Fetch all chat sessions
  const { data: chatSessions = [], isLoading: isLoadingSessions } = useQuery({
    queryKey: ["chatSessions"],
    queryFn: getAllChatSessions,
    refetchOnWindowFocus: true,
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  // Fetch chat history for selected session
  const fetchChatHistory = async (sessionId: string) => {
    try {
      const history = await getChatHistory(sessionId);
      setChatMessages(history);
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };

  // Format date for display
  const formatChatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div>
      {isLoadingSessions ? (
        <div className="flex justify-center items-center py-8">
          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
          Loading chat sessions...
        </div>
      ) : chatSessions.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-zinc-500">No chat sessions found.</p>
        </div>
      ) : (
        <div>
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2 text-zinc-100 font-serif">Select a Chat Session</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {chatSessions.map((session) => (
                <Button
                  key={session.session_id}
                  variant={selectedSession === session.session_id ? "default" : "outline"}
                  className={`justify-start overflow-hidden ${selectedSession === session.session_id ? 'bg-gold-500 hover:bg-gold-400 text-black font-semibold' : 'border-zinc-800 text-zinc-400 hover:bg-gold-500/10 hover:text-gold-400'}`}
                  onClick={() => {
                    setSelectedSession(session.session_id);
                    fetchChatHistory(session.session_id);
                  }}
                >
                  <div className="truncate text-left">
                    <span className="font-medium">Session:</span> {session.session_id.substring(0, 8)}...
                    <div className="text-xs text-zinc-500">{formatChatDate(session.created_at)}</div>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          {selectedSession && (
            <div className="border border-zinc-800 rounded-lg p-4 bg-zinc-950/40">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-zinc-100 font-serif">Chat Conversation</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedSession(null)}
                  className="border-zinc-800 text-zinc-400 hover:bg-zinc-900/50 hover:text-zinc-200"
                >
                  Close
                </Button>
              </div>

              {chatMessages.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-zinc-500">No messages found for this session.</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[400px] overflow-y-auto p-2">
                  {chatMessages.map((msg, index) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                    <div key={index} className="border-b border-zinc-800/50 pb-3">
                      <div className="text-xs text-zinc-500 mb-1">{formatChatDate(msg.created_at)}</div>
                      {msg.user_message && (
                        <div className="bg-zinc-800/80 p-3 rounded-lg mb-2 text-zinc-200 border border-zinc-700/30">
                          <div className="text-xs font-medium mb-1 text-zinc-400">User:</div>
                          <div>{msg.user_message}</div>
                        </div>
                      )}
                      {msg.bot_response && (
                        <div className="bg-gold-950/25 p-3 rounded-lg border border-gold-500/20 text-gold-300">
                          <div className="text-xs font-medium mb-1 text-gold-500">Bot:</div>
                          <div>{msg.bot_response}</div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const AdminInbox: React.FC = () => {
  const [selectedInquiry, setSelectedInquiry] = useState<CustomerInquiry | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Check if user is authenticated and is an admin
  React.useEffect(() => {
    const checkAdmin = async () => {
      const { data } = await supabase.auth.getSession();

      if (!data.session) {
        toast({
          title: "Authentication Required",
          description: "Please login to access the admin area.",
          variant: "destructive",
        });
        navigate("/admin/auth");
        return;
      }

      // Check if user is an admin
      const { data: adminData, error } = await supabase
        .from("admin_users")
        .select("*")
        .eq("user_id", data.session.user.id)
        .single();

      if (error || !adminData) {
        toast({
          title: "Access Denied",
          description: "You do not have permission to access this area.",
          variant: "destructive",
        });
        navigate("/");
      }
    };

    checkAdmin();
  }, [navigate, toast]);

  // Fetch inquiries with query
  const { data: inquiries = [], isLoading, error, refetch } = useQuery({
    queryKey: ["inquiries"],
    queryFn: () => customerService.getInquiries(),
    refetchOnWindowFocus: true,
    refetchInterval: 30000, // Refetch every 30 seconds
    retry: 3, // Retry 3 times if the query fails
    retryDelay: 1000, // Wait 1 second between retries
  });

  // Force a refetch when the component mounts
  useEffect(() => {
    // Wait a moment for authentication to complete
    const timer = setTimeout(() => {
      refetch();
      console.log('Forced refetch of inquiries');
    }, 2000);

    return () => clearTimeout(timer);
  }, [refetch]);

  // Update inquiry status mutation
  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      customerService.updateInquiryStatus(id, status),
    onSuccess: () => {
      toast({
        title: "Status Updated",
        description: "The inquiry status has been updated successfully."
      });
      queryClient.invalidateQueries({ queryKey: ["inquiries"] });
    },

    onError: (error: unknown) => {
      toast({
        title: "Update Failed",
        description: error instanceof Error ? error.message : "Failed to update status. Please try again.",
        variant: "destructive"
      });
    }
  });

  const handleStatusChange = (id: string, status: string) => {
    updateStatusMutation.mutate({ id, status });
  };

  // Filter inquiries by status
  const newInquiries = inquiries.filter(item => item.status === "new");
  const inProgressInquiries = inquiries.filter(item => item.status === "inprogress");
  const completedInquiries = inquiries.filter(item => item.status === "completed");
  const cancelledInquiries = inquiries.filter(item => item.status === "cancelled");

  if (error) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <div className="container mx-auto pt-32 pb-20 px-4">
          <div className="text-center text-red-500">
            Error loading inquiries. Please try again later.
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-background text-foreground admin-page">
      <Navbar />
      <div className="container mx-auto pt-32 pb-20 px-4 admin-container">
        <AdminHeader
          title="Customer Inquiries"
          handleLogout={() => {
            supabase.auth.signOut();
            navigate("/admin/auth");
            toast({
              title: "Logged Out",
              description: "You have been successfully logged out."
            });
          }}
        />

        <div className="flex justify-between items-center mb-4">
          <AdminInstructions />
          <Button
            onClick={() => {
              refetch();
              toast({
                title: "Refreshed",
                description: "Customer inquiries have been refreshed."
              });

              // Also check localStorage for any inquiries
              try {
                const storedInquiries = JSON.parse(localStorage.getItem('customerInquiries') || '[]');
                if (storedInquiries.length > 0) {
                  console.log('Found', storedInquiries.length, 'inquiries in localStorage');
                }
              } catch (err) {
                console.error('Error checking localStorage:', err);
              }
            }}
            variant="outline"
            className="flex items-center gap-2 border-zinc-800 text-zinc-400 hover:bg-gold-500/10 hover:text-gold-400"
          >
            <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
            Refresh Inquiries
          </Button>
        </div>

        {/* No inquiries fallback */}
        {!isLoading && inquiries.length === 0 && (
          <Card className="mb-6 border-gold-500/10 bg-zinc-950/20">
            <CardContent className="pt-6">
              <div className="text-center py-6">
                <AlertCircle className="h-12 w-12 text-yellow-500/80 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2 text-zinc-200 font-serif">No Customer Inquiries Found</h3>
                <p className="text-zinc-400 mb-6">There are no customer inquiries in the database yet.</p>
                <Button
                  onClick={async () => {
                    // Create a test inquiry
                    const testInquiry = {
                      name: 'Test Customer',
                      email: 'test@example.com',
                      phone: '123-456-7890',
                      topic: 'Test Inquiry',
                      message: 'This is a test inquiry created from the admin panel.',
                      status: 'new'
                    };

                    // Store it in localStorage
                    try {
                      const storedInquiries = JSON.parse(localStorage.getItem('customerInquiries') || '[]');
                      storedInquiries.push({
                        ...testInquiry,
                        id: `local-${Date.now()}`,
                        created_at: new Date().toISOString(),
                        updated_at: new Date().toISOString()
                      });
                      localStorage.setItem('customerInquiries', JSON.stringify(storedInquiries));

                      // Refresh the inquiries
                      refetch();

                      toast({
                        title: "Test Inquiry Created",
                        description: "A test inquiry has been created and should now be visible."
                      });
                    } catch (err) {
                      console.error('Error creating test inquiry:', err);
                      toast({
                        title: "Error",
                        description: "Failed to create test inquiry.",
                        variant: "destructive"
                      });
                    }
                  }}
                  variant="outline"
                  className="mx-auto border-zinc-800 text-zinc-400 hover:bg-zinc-900/50 hover:text-zinc-200"
                >
                  Create Test Inquiry
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="new" className="w-full">
          <TabsList className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-0 w-full bg-zinc-900/50 border border-zinc-800 p-1">
            <TabsTrigger value="new" className="flex items-center gap-2 data-[state=active]:bg-gold-500 data-[state=active]:text-black text-zinc-400">
              <Mail size={16} /> New <Badge className="ml-1 bg-blue-950 text-blue-400 border border-blue-500/20 hover:bg-blue-950">{newInquiries.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="inprogress" className="flex items-center gap-2 data-[state=active]:bg-gold-500 data-[state=active]:text-black text-zinc-400">
              <Clock size={16} /> In Progress <Badge className="ml-1 bg-yellow-950 text-yellow-400 border border-yellow-500/20 hover:bg-yellow-950">{inProgressInquiries.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="completed" className="flex items-center gap-2 data-[state=active]:bg-gold-500 data-[state=active]:text-black text-zinc-400">
              <CheckCircle size={16} /> Completed <Badge className="ml-1 bg-green-950 text-green-400 border border-green-500/20 hover:bg-green-950">{completedInquiries.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="cancelled" className="flex items-center gap-2 data-[state=active]:bg-gold-500 data-[state=active]:text-black text-zinc-400">
              <XCircle size={16} /> Cancelled <Badge className="ml-1 bg-red-950 text-red-400 border border-red-500/20 hover:bg-red-950">{cancelledInquiries.length}</Badge>
            </TabsTrigger>
          </TabsList>

          {["new", "inprogress", "completed", "cancelled"].map((status) => (
            <TabsContent key={status} value={status}>
              <Card className="border-gold-500/10 bg-zinc-950/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-zinc-100 font-serif">
                    {status === "new" && <Mail className="h-5 w-5" />}
                    {status === "inprogress" && <Clock className="h-5 w-5" />}
                    {status === "completed" && <CheckCircle className="h-5 w-5" />}
                    {status === "cancelled" && <XCircle className="h-5 w-5" />}
                    {status.charAt(0).toUpperCase() + status.slice(1)} Inquiries
                  </CardTitle>
                  <CardDescription className="text-zinc-400">
                    {status === "new" && "Recently received customer inquiries that need attention."}
                    {status === "inprogress" && "Inquiries currently being handled by the team."}
                    {status === "completed" && "Successfully resolved customer inquiries."}
                    {status === "cancelled" && "Inquiries that were cancelled or couldn't be processed."}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveTable>
                    <div className="rounded-md border overflow-hidden">
                      <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[120px] md:w-auto">Date</TableHead>
                          <TableHead className="w-[120px] md:w-auto">Name</TableHead>
                          <TableHead className="hidden md:table-cell">Email</TableHead>
                          <TableHead className="hidden md:table-cell">Topic</TableHead>
                          <TableHead className="hidden md:table-cell">Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {isLoading ? (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center py-8">
                              <div className="flex justify-center items-center">
                                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                                Loading inquiries...
                              </div>
                            </TableCell>
                          </TableRow>
                        ) : inquiries.filter(item => item.status === status).length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center py-8">
                              No {status} inquiries found.
                            </TableCell>
                          </TableRow>
                        ) : (
                          inquiries
                            .filter(item => item.status === status)
                            .map((inquiry) => (
                              <TableRow key={inquiry.id}>
                                {/* biome-ignore lint/style/noNonNullAssertion: <explanation> */}
<TableCell>{formatDate(inquiry.created_at!).split(',')[0]}</TableCell>
                                <TableCell className="font-medium">
                                  <div>{inquiry.name}</div>
                                  <div className="md:hidden text-xs text-gray-500 mt-1">
                                    <div className="truncate">{inquiry.email}</div>
                                    <div className="flex items-center gap-1 mt-1">
                                      <Badge className={`text-[10px] h-4 ${statusColors[inquiry.status as keyof typeof statusColors]}`}>
                                        {inquiry.status}
                                      </Badge>
                                      <span className="mx-1">•</span>
                                      <span className="truncate">{inquiry.topic}</span>
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">{inquiry.email}</TableCell>
                                <TableCell className="hidden md:table-cell">{inquiry.topic}</TableCell>
                                <TableCell className="hidden md:table-cell">
                                  <Badge className={statusColors[inquiry.status as keyof typeof statusColors]}>
                                    {inquiry.status}
                                  </Badge>
                                </TableCell>
                                <TableCell>
                                  <div className="flex space-x-2">
                                    <Dialog>
                                      <DialogTrigger asChild>
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          onClick={() => setSelectedInquiry(inquiry)}
                                          className="border-zinc-800 text-zinc-300 hover:bg-gold-500/10 hover:text-gold-400"
                                        >
                                          View
                                        </Button>
                                      </DialogTrigger>
                                      <DialogContent className="sm:max-w-md bg-black border-gold-500/20 text-zinc-200">
                                        <DialogHeader>
                                          <DialogTitle className="text-gold-500 font-serif text-2xl">Customer Inquiry</DialogTitle>
                                          <DialogDescription className="text-zinc-400">
                                            Received on {inquiry.created_at && formatDate(inquiry.created_at)}
                                          </DialogDescription>
                                        </DialogHeader>
                                        {selectedInquiry && (
                                          <div className="space-y-4">
                                            <div className="grid grid-cols-2 gap-4">
                                              <div>
                                                <h4 className="text-sm font-medium text-zinc-450">Name</h4>
                                                <p className="text-zinc-200">{selectedInquiry.name}</p>
                                              </div>
                                              <div>
                                                <h4 className="text-sm font-medium text-zinc-450">Email</h4>
                                                <p className="text-zinc-200">{selectedInquiry.email}</p>
                                              </div>
                                            </div>
                                            {selectedInquiry.phone && (
                                              <div>
                                                <h4 className="text-sm font-medium text-zinc-450">Phone</h4>
                                                <p className="text-zinc-200">{selectedInquiry.phone}</p>
                                              </div>
                                            )}
                                            <div>
                                              <h4 className="text-sm font-medium text-zinc-450">Topic</h4>
                                              <p className="text-zinc-200">{selectedInquiry.topic}</p>
                                            </div>
                                            <div>
                                              <h4 className="text-sm font-medium text-zinc-450">Message</h4>
                                              <p className="whitespace-pre-wrap text-zinc-300">{selectedInquiry.message}</p>
                                            </div>
                                            <div>
                                              <h4 className="text-sm font-medium text-zinc-450 mb-1">Status</h4>
                                              <Select
                                                value={selectedInquiry.status}
                                                onValueChange={(value) => {
                                                  if (selectedInquiry.id) {
                                                    handleStatusChange(selectedInquiry.id, value);
                                                    setSelectedInquiry({
                                                      ...selectedInquiry,
                                                      status: value
                                                    });
                                                  }
                                                }}
                                              >
                                                <SelectTrigger className="w-full bg-zinc-900 border-zinc-800 text-zinc-200 focus:ring-gold-500">
                                                  <SelectValue placeholder="Select status" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-black border-zinc-800 text-zinc-200">
                                                  <SelectItem value="new">New</SelectItem>
                                                  <SelectItem value="inprogress">In Progress</SelectItem>
                                                  <SelectItem value="completed">Completed</SelectItem>
                                                  <SelectItem value="cancelled">Cancelled</SelectItem>
                                                </SelectContent>
                                              </Select>
                                            </div>
                                          </div>
                                        )}
                                      </DialogContent>
                                    </Dialog>
                                    <Select
                                      value={inquiry.status}
                                      onValueChange={(value) => {
                                        if (inquiry.id) {
                                          handleStatusChange(inquiry.id, value);
                                        }
                                      }}
                                    >
                                      <SelectTrigger className="w-32 bg-zinc-900 border-zinc-800 text-zinc-200 focus:ring-gold-500">
                                        <SelectValue placeholder="Change status" />
                                      </SelectTrigger>
                                      <SelectContent className="bg-black border-zinc-800 text-zinc-200">
                                        <SelectItem value="new">New</SelectItem>
                                        <SelectItem value="inprogress">In Progress</SelectItem>
                                        <SelectItem value="completed">Completed</SelectItem>
                                        <SelectItem value="cancelled">Cancelled</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))
                        )}
                      </TableBody>
                      </Table>
                    </div>
                  </ResponsiveTable>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        <Card className="mt-8 border-gold-500/10 bg-zinc-950/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-zinc-150 font-serif">
              <MessageSquare className="h-5 w-5 text-gold-500" />
              Chat History
            </CardTitle>
            <CardDescription className="text-zinc-400">
              View saved chat conversations from the chatbot.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChatHistorySection />
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default AdminInbox;
