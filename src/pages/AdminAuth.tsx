
import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// List of authorized admin emails
const AUTHORIZED_ADMIN_EMAILS = [
  "drivendatadynamics@gmail.com",
  "transformwiththecolourist@gmail.com"
];

const AdminAuth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Check if user is already logged in and redirect to admin page
  useEffect(() => {
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (data.session) {
        // Check if user's email is in the authorized list
        if (AUTHORIZED_ADMIN_EMAILS.includes(data.session.user.email || "")) {
          navigate("/admin/content");
        } else {
          // Unauthorized user, sign them out
          await supabase.auth.signOut();
          toast({
            title: "Access Denied",
            description: "Your email is not authorized for admin access.",
            variant: "destructive",
          });
        }
      }
    };
    
    checkSession();
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session && event === "SIGNED_IN") {
          // Check if the signed-in user's email is authorized
          if (AUTHORIZED_ADMIN_EMAILS.includes(session.user.email || "")) {
            navigate("/admin/content");
          } else {
            // User is not authorized, sign them out
            await supabase.auth.signOut();
            toast({
              title: "Access Denied",
              description: "Your email is not authorized for admin access.",
              variant: "destructive",
            });
          }
        }
      }
    );
    
    return () => subscription.unsubscribe();
  }, [navigate, toast]);
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // First check if the email is authorized
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
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      if (data.user) {
        toast({
          title: "Login successful",
          description: "Welcome to the admin panel",
        });
      }
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
  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if the email is authorized before attempting registration
    if (!AUTHORIZED_ADMIN_EMAILS.includes(email)) {
      toast({
        title: "Registration Denied",
        description: "Only authorized emails can register for admin access.",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (error) throw error;
      
      toast({
        title: "Registration successful",
        description: "Please check your email to confirm your account.",
      });
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
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
              This area is restricted to authorized administrators only.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="admin@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-medium">Password</label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="••••••••"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-salon-pink-600 hover:bg-salon-pink-700" 
                    disabled={loading}
                  >
                    {loading ? "Logging in..." : "Login"}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="reg-email" className="text-sm font-medium">Email Address</label>
                    <Input
                      id="reg-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="admin@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="reg-password" className="text-sm font-medium">Password</label>
                    <Input
                      id="reg-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="••••••••"
                      minLength={6}
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-salon-pink-600 hover:bg-salon-pink-700" 
                    disabled={loading}
                  >
                    {loading ? "Registering..." : "Register"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2 text-sm text-gray-500">
            <p>Note: Admin access is restricted to authorized emails only.</p>
            <div className="text-xs bg-gray-100 p-2 rounded-md w-full">
              <p className="font-medium text-gray-700">Authorized emails:</p>
              <ul className="mt-1 list-disc pl-5">
                {AUTHORIZED_ADMIN_EMAILS.map((email, index) => (
                  <li key={index}>{email}</li>
                ))}
              </ul>
            </div>
          </CardFooter>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default AdminAuth;
