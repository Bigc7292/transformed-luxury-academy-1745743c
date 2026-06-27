
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const AUTHORIZED_ADMIN_EMAILS = [
  "transformedacademyhq@gmail.com",
export const useAdminAuth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        // Get the current session
        const { data: sessionData } = await supabase.auth.getSession();
        const session = sessionData.session;
        
        if (!session) {
          toast({
            title: "Authentication Required",
            description: "Please login to access the admin area.",
            variant: "destructive",
          });
          navigate("/admin/auth");
          return;
        }
        
        // Session exists – navigate straight to admin content
        navigate("/admin/content");
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
  }, [navigate, toast]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out."
    });
    navigate("/admin/auth");
  };

  return { handleLogout };
};
