
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const useAdminAuth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAdmin = async () => {
      // Get the current session without complex type inference
      const { data, error: sessionError } = await supabase.auth.getSession();
      
      if (!data.session) {
        toast({
          title: "Authentication Required",
          description: "Please login to access the admin area.",
          variant: "destructive",
        });
        navigate("/admin/auth");
        return;
      }
      
      // Cast the query to avoid deep type inference
      const { data: adminData, error: adminError } = await supabase
        .from("admin_users")
        .select("email")
        .eq("email", data.session.user.email || "")
        .limit(1) as { data: any[], error: any };
        
      if (adminError || adminData.length === 0) {
        console.error("Admin check error:", adminError);
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
