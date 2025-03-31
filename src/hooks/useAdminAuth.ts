
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
        
        // Use a simplified query to avoid type recursion issues
        const { data, error } = await supabase
          .from("admin_users")
          .select("id")
          .filter("email", "eq", session.user.email || '');
          
        if (error) {
          console.error("Admin check error:", error);
          toast({
            title: "Database Error",
            description: "There was an error checking your admin status.",
            variant: "destructive",
          });
          navigate("/");
          return;
        }
        
        // Check if data is empty
        if (!data || data.length === 0) {
          toast({
            title: "Access Denied",
            description: "You do not have permission to access this area.",
            variant: "destructive",
          });
          navigate("/");
        }
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
