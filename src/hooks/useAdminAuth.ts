
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const useAdminAuth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const { data: sessionData } = await supabase.auth.getSession();
        const session = sessionData.session;

        if (!session) {
          toast({
            title: "Authentication Required",
            description: "Please login to access the admin area.",
            variant: "destructive",
          });
          navigate("/admin/auth");
        }
        // If session exists, do nothing — user is already on the correct page
      } catch (error) {
        console.error("Admin auth error:", error);
        toast({
          title: "Authentication Error",
          description: "There was an error checking your permissions.",
          variant: "destructive",
        });
        navigate("/");
      }
    };

    checkAdmin();
  }, []); // empty deps — only run once on mount

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate("/admin/auth");
  };

  return { handleLogout };
};
