import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Label } from "@/components/ui/label";

const AUTHORIZED_ADMIN_EMAILS = [
  "drivendatadynamics@gmail.com",
  "admin@test.com",
  "transformedacademyandsalon@gmail.com"
];

const AdminAuth = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [killingProcesses, setKillingProcesses] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        navigate("/admin/content");
      }
    };

    checkSession();
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!AUTHORIZED_ADMIN_EMAILS.includes(email)) {
      toast({
        title: "Access Denied",
        description: "This email is not authorized for admin access.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
          emailRedirectTo: `${window.location.origin}/admin/content`,
        },
      });

      if (error) throw error;

      toast({
        title: "Magic link sent",
        description: "Please check your email for the login link",
      });
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKillProcesses = async () => {
    setKillingProcesses(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast({
        title: "Sessions terminated",
        description: "All active sessions have been killed",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to terminate sessions: " + error.message,
        variant: "destructive",
      });
    } finally {
      setKillingProcesses(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto pt-32 pb-20 px-4 flex justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-serif text-salon-pink-700 text-center">
              Admin Access
            </CardTitle>
            <CardDescription className="text-center">
              Enter your email to receive a magic link
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="admin@example.com"
                  className="w-full"
                  autoFocus
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-salon-pink-600 hover:bg-salon-pink-700"
                disabled={loading}
              >
                {loading ? "Sending magic link..." : "Send Magic Link"}
              </Button>
            </form>
            <div className="mt-4 pt-4 border-t">
              <Button 
                type="button" 
                variant="outline"
                className="w-full"
                onClick={handleKillProcesses}
                disabled={killingProcesses}
              >
                {killingProcesses ? "Terminating Sessions..." : "Terminate All Sessions"}
              </Button>
            </div>
          </CardContent>
          
          <div className="text-xs bg-gray-100 p-4 mx-6 mb-6 rounded-md">
            <p className="font-medium text-gray-700">Authorized emails:</p>
            <ul className="mt-1 list-disc pl-5">
              {AUTHORIZED_ADMIN_EMAILS.map((email, index) => (
                <li key={index}>{email}</li>
              ))}
            </ul>
          </div>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default AdminAuth;
