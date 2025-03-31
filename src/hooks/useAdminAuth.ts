
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const useAdminAuth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAdmin = async () => {
      // Get the current session
      const sessionResponse = await supabase.auth.getSession();
      const session = sessionResponse.data.session;
      
      if (!session) {
        toast({
          title: "Authentication Required",
          description: "Please login to access the admin area.",
          variant: "destructive",
        });
        navigate("/admin/auth");
        return;
      }
      
      // Use a raw query approach to avoid TypeScript inference issues
      const userEmail = session.user.email || "";
      
      // Simple approach: Using a string() function to query instead of a template literal
      const { data, error } = await supabase
        .from("admin_users")
        .select("id")
        .filter("email", "eq", userEmail);
        
      if (error || !data || data.length === 0) {
        console.error("Admin check error:", error);
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
