
import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Lock } from "lucide-react"; 

// List of authorized admin emails
const AUTHORIZED_ADMIN_EMAILS = [
  "drivendatadynamics@gmail.com",
  "admin@test.com",
  "transformedacademyandsalon@gmail.com"
];

const AdminAuth = () => {
  const [email, setEmail] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"email" | "pin">("email");
  const [openSheet, setOpenSheet] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Check if user is already logged in and redirect to admin page
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        navigate("/admin/content");
      }
    };
    
    checkSession();
  }, [navigate]);
  
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if the email is authorized
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
      // Check if email exists in admin_users table
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('email', email)
        .single();
      
      if (error) {
        throw error;
      }
      
      // If email is valid, move to PIN entry step
      setStep("pin");
    } catch (error: any) {
      toast({
        title: "Email verification failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handlePinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (pinCode.length < 4) {
      toast({
        title: "Invalid PIN",
        description: "PIN must be at least 4 digits long.",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    try {
      // Verify PIN against the admin_users table
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('email', email)
        .eq('otp', pinCode)
        .single();
      
      if (error || !data) {
        throw new Error("Invalid PIN code. Please try again.");
      }
      
      // When PIN is correct, manually set a session for admin
      // Since we're not using Supabase Auth directly, we'll implement a custom auth flow
      // Store admin info in localStorage for simplicity
      localStorage.setItem('adminUser', JSON.stringify({
        email: email,
        isAdmin: true,
        timestamp: new Date().getTime()
      }));
      
      toast({
        title: "Login successful",
        description: "Welcome to the admin panel",
      });
      
      navigate("/admin/content");
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
      // Reset PIN on failure
      setPinCode("");
    } finally {
      setLoading(false);
    }
  };
  
  const handleResetPin = () => {
    setOpenSheet(true);
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
              {step === "email" 
                ? "Enter your email to access the admin panel" 
                : "Enter your 4-digit PIN code"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === "email" ? (
              <form onSubmit={handleEmailSubmit} className="space-y-4">
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
                  {loading ? "Verifying..." : "Continue"}
                </Button>
              </form>
            ) : (
              <form onSubmit={handlePinSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="pin-code">PIN Code</Label>
                  <div className="flex justify-center">
                    <InputOTP 
                      maxLength={4}
                      value={pinCode}
                      onChange={setPinCode}
                      autoFocus
                      render={({ slots }) => (
                        <InputOTPGroup>
                          {slots.map((slot, index) => (
                            <InputOTPSlot 
                              key={index} 
                              {...slot} 
                              index={index} 
                              className="w-16 h-16 text-xl"
                            />
                          ))}
                        </InputOTPGroup>
                      )}
                    />
                  </div>
                  <div className="text-center text-sm text-gray-500 mt-2 flex items-center justify-center">
                    <Lock size={14} className="mr-1"/> Secured with encryption
                  </div>
                </div>
                
                <div className="space-y-4">
                  <Button 
                    type="submit" 
                    className="w-full bg-salon-pink-600 hover:bg-salon-pink-700" 
                    disabled={loading || pinCode.length < 4}
                  >
                    {loading ? "Verifying..." : "Login"}
                  </Button>
                  
                  <Button 
                    type="button"
                    variant="outline" 
                    className="w-full" 
                    onClick={() => setStep("email")}
                  >
                    Back to Email
                  </Button>
                </div>
              </form>
            )}
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
            {step === "pin" && (
              <Button 
                type="button" 
                variant="link" 
                className="text-salon-pink-600 hover:text-salon-pink-700 p-0 h-auto mt-2" 
                onClick={handleResetPin}
              >
                Forgot PIN?
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
      
      <Sheet open={openSheet} onOpenChange={setOpenSheet}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Reset PIN Code</SheetTitle>
            <SheetDescription>
              Please contact the system administrator to reset your PIN code. 
              Default PINs are set to "1234".
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6">
            <Button className="w-full" onClick={() => setOpenSheet(false)}>
              Close
            </Button>
          </div>
        </SheetContent>
      </Sheet>
      
      <Footer />
    </div>
  );
};

export default AdminAuth;
