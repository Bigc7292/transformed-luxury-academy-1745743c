
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { customerService, CustomerInquiry } from "@/services/customerService";
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
  DialogFooter,
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
import { Mail, MessageSquare, Clock, CheckCircle, XCircle, RefreshCw } from "lucide-react";

const statusColors = {
  new: "bg-blue-500",
  inprogress: "bg-yellow-500",
  completed: "bg-green-500",
  cancelled: "bg-red-500"
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
  const { data: inquiries = [], isLoading, error } = useQuery({
    queryKey: ["inquiries"],
    queryFn: () => customerService.getInquiries(),
  });

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
    onError: (error: any) => {
      toast({
        title: "Update Failed",
        description: error.message || "Failed to update status. Please try again.",
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
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto pt-32 pb-20 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-serif text-salon-pink-700">
            Admin Inbox
          </h1>
          <Button
            onClick={() => navigate("/admin/content")}
            variant="outline"
            className="border-salon-pink-500 text-salon-pink-700 hover:bg-salon-pink-50"
          >
            Go to Content Management
          </Button>
        </div>

        <Tabs defaultValue="new" className="w-full">
          <TabsList className="mb-6 grid grid-cols-4 w-full">
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
                  <div className="rounded-md border overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Topic</TableHead>
                          <TableHead>Status</TableHead>
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
                                <TableCell>{formatDate(inquiry.created_at!)}</TableCell>
                                <TableCell className="font-medium">{inquiry.name}</TableCell>
                                <TableCell>{inquiry.email}</TableCell>
                                <TableCell>{inquiry.topic}</TableCell>
                                <TableCell>
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
            <div className="text-center py-4">
              <p>Chat history functionality will be implemented in the next phase.</p>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default AdminInbox;
