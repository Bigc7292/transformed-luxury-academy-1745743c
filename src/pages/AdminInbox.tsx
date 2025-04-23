
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
  new: "bg-blue-500",
  inprogress: "bg-yellow-500",
  completed: "bg-green-500",
  cancelled: "bg-red-500"
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
          <p className="text-gray-500">No chat sessions found.</p>
        </div>
      ) : (
        <div>
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Select a Chat Session</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {chatSessions.map((session) => (
                <Button
                  key={session.session_id}
                  variant={selectedSession === session.session_id ? "default" : "outline"}
                  className="justify-start overflow-hidden"
                  onClick={() => {
                    setSelectedSession(session.session_id);
                    fetchChatHistory(session.session_id);
                  }}
                >
                  <div className="truncate">
                    <span className="font-medium">Session:</span> {session.session_id.substring(0, 8)}...
                    <div className="text-xs">{formatChatDate(session.created_at)}</div>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          {selectedSession && (
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Chat Conversation</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedSession(null)}
                >
                  Close
                </Button>
              </div>

              {chatMessages.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-gray-500">No messages found for this session.</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[400px] overflow-y-auto p-2">
                  {chatMessages.map((msg, index) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
<div key={index} className="border-b pb-3">
                      <div className="text-xs text-gray-500 mb-1">{formatChatDate(msg.created_at)}</div>
                      {msg.user_message && (
                        <div className="bg-gray-100 p-3 rounded-lg mb-2">
                          <div className="text-xs font-medium mb-1">User:</div>
                          <div>{msg.user_message}</div>
                        </div>
                      )}
                      {msg.bot_response && (
                        <div className="bg-salon-pink-100 p-3 rounded-lg">
                          <div className="text-xs font-medium mb-1">Bot:</div>
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
      <div className="min-h-screen bg-white">
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
    <div className="min-h-screen bg-white admin-page">
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
            className="flex items-center gap-2"
          >
            <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
            Refresh Inquiries
          </Button>
        </div>

        {/* No inquiries fallback */}
        {!isLoading && inquiries.length === 0 && (
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="text-center py-6">
                <AlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No Customer Inquiries Found</h3>
                <p className="text-gray-500 mb-6">There are no customer inquiries in the database yet.</p>
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
                  className="mx-auto"
                >
                  Create Test Inquiry
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="new" className="w-full">
          <TabsList className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-0 w-full">
            <TabsTrigger value="new" className="flex items-center gap-2">
              <Mail size={16} /> New <Badge className="ml-1 bg-blue-500">{newInquiries.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="inprogress" className="flex items-center gap-2">
              <Clock size={16} /> In Progress <Badge className="ml-1 bg-yellow-500">{inProgressInquiries.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="completed" className="flex items-center gap-2">
              <CheckCircle size={16} /> Completed <Badge className="ml-1 bg-green-500">{completedInquiries.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="cancelled" className="flex items-center gap-2">
              <XCircle size={16} /> Cancelled <Badge className="ml-1 bg-red-500">{cancelledInquiries.length}</Badge>
            </TabsTrigger>
          </TabsList>

          {["new", "inprogress", "completed", "cancelled"].map((status) => (
            <TabsContent key={status} value={status}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {status === "new" && <Mail className="h-5 w-5" />}
                    {status === "inprogress" && <Clock className="h-5 w-5" />}
                    {status === "completed" && <CheckCircle className="h-5 w-5" />}
                    {status === "cancelled" && <XCircle className="h-5 w-5" />}
                    {status.charAt(0).toUpperCase() + status.slice(1)} Inquiries
                  </CardTitle>
                  <CardDescription>
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
                                        >
                                          View
                                        </Button>
                                      </DialogTrigger>
                                      <DialogContent className="sm:max-w-md">
                                        <DialogHeader>
                                          <DialogTitle>Customer Inquiry</DialogTitle>
                                          <DialogDescription>
                                            Received on {inquiry.created_at && formatDate(inquiry.created_at)}
                                          </DialogDescription>
                                        </DialogHeader>
                                        {selectedInquiry && (
                                          <div className="space-y-4">
                                            <div className="grid grid-cols-2 gap-4">
                                              <div>
                                                <h4 className="text-sm font-medium text-gray-500">Name</h4>
                                                <p>{selectedInquiry.name}</p>
                                              </div>
                                              <div>
                                                <h4 className="text-sm font-medium text-gray-500">Email</h4>
                                                <p>{selectedInquiry.email}</p>
                                              </div>
                                            </div>
                                            {selectedInquiry.phone && (
                                              <div>
                                                <h4 className="text-sm font-medium text-gray-500">Phone</h4>
                                                <p>{selectedInquiry.phone}</p>
                                              </div>
                                            )}
                                            <div>
                                              <h4 className="text-sm font-medium text-gray-500">Topic</h4>
                                              <p>{selectedInquiry.topic}</p>
                                            </div>
                                            <div>
                                              <h4 className="text-sm font-medium text-gray-500">Message</h4>
                                              <p className="whitespace-pre-wrap">{selectedInquiry.message}</p>
                                            </div>
                                            <div>
                                              <h4 className="text-sm font-medium text-gray-500">Status</h4>
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
                                                <SelectTrigger className="w-full">
                                                  <SelectValue placeholder="Select status" />
                                                </SelectTrigger>
                                                <SelectContent>
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
                                      <SelectTrigger className="w-32">
                                        <SelectValue placeholder="Change status" />
                                      </SelectTrigger>
                                      <SelectContent>
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

        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Chat History
            </CardTitle>
            <CardDescription>
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
