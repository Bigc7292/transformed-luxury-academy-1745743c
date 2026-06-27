
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
import { Eye, EyeOff, Lock, User } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const AUTHORIZED_ADMIN_EMAILS = [
  "transformedacademyhq@gmail.com",
];
const DEFAULT_ADMIN_PASSWORD = "Fresha123!**";
const AdminAuth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        // Redirect to admin content page by default
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

    // If the entered password matches the hard‑coded default, try a normal sign‑in.
    // If that fails (e.g., user has never set this password), fall back to magic link.
    if (password === DEFAULT_ADMIN_PASSWORD) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        if (data.session) {
          toast({
            title: "Login successful",
            description: "Welcome to the admin panel",
          });
          navigate("/admin/content");
          return;
        }
      } catch (e) {
        // ignore and fall back to magic link below
      }
    }

    // Fallback: magic link login (covers non‑default passwords or failed default login)
    setLoading(true);
    try {
      const { error: magicLinkError } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: `${window.location.origin}/admin/content` },
      });
      if (magicLinkError) throw magicLinkError;
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

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!AUTHORIZED_ADMIN_EMAILS.includes(resetEmail)) {
      toast({
        title: "Access Denied",
        description: "This email is not authorized for password reset.",
        variant: "destructive",
      });
      return;
    }

    setResetLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
        redirectTo: `${window.location.origin}/admin/content`,
      });

      if (error) throw error;

      toast({
        title: "Password reset email sent",
        description: "Please check your email for the password reset link",
      });

      setIsResetModalOpen(false);
    } catch (error: any) {
      toast({
        title: "Reset failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black admin-page flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center pt-32 pb-20 px-4">
        <Card className="w-full max-w-md bg-black border-gold-500/20 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-2xl font-serif text-gold-500 text-center">
              Admin Access
            </CardTitle>
            <CardDescription className="text-center text-zinc-400">
              Enter your credentials to access the admin panel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gold-400">Email Address</Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="admin@transformedacademy.com"
                    className="bg-zinc-900 border-gold-500/20 text-zinc-200 placeholder-zinc-500 focus:ring-gold-500"
                    autoFocus
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gold-400">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pr-10 bg-zinc-900 border-gold-500/20 text-zinc-200 placeholder-zinc-500 focus:ring-gold-500"
                    placeholder="••••••••"
                  />
                  <div
                    className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gold-500 text-black hover:bg-gold-400 font-semibold"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign In"}
              </Button>

              <div className="text-center mt-4">
                <Button
                  type="button"
                  variant="link"
                  className="text-sm text-gold-500 hover:text-gold-400"
                  onClick={() => setIsResetModalOpen(true)}
                >
                  Forgot your password?
                </Button>
              </div>
            </form>
          </CardContent>


        </Card>
      </div>

      <Dialog open={isResetModalOpen} onOpenChange={setIsResetModalOpen}>
        <DialogContent className="sm:max-w-md bg-black border-gold-500/20 text-zinc-200">
          <DialogHeader>
            <DialogTitle className="text-gold-500">Reset Password</DialogTitle>
            <DialogDescription className="text-zinc-400">
              Enter your email to receive a password reset link.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="reset-email" className="text-gold-400">Email Address</Label>
              <Input
                id="reset-email"
                type="email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                required
                placeholder="admin@transformedacademy.com"
                className="bg-zinc-900 border-gold-500/20 text-zinc-200 placeholder-zinc-500 focus:ring-gold-500"
                autoFocus
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" className="border-gold-500/20 text-gold-500 hover:bg-gold-500/10" onClick={() => setIsResetModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-gold-500 text-black hover:bg-gold-400 font-semibold" disabled={resetLoading}>
                {resetLoading ? "Sending..." : "Send Reset Link"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default AdminAuth;
