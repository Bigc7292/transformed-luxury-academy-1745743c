
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const AUTHORIZED_ADMIN_EMAILS = [
  "transformedacademyhq@gmail.com",
];

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
        
        const email = session.user.email;
        if (email && AUTHORIZED_ADMIN_EMAILS.includes(email)) {
          // Check if admin record exists
          const { data: adminRecords, error: adminQueryError } = await supabase
            .from("admin_users")
            .select("*")
            .eq("email", email);
            
          if (!adminQueryError) {
            if (!adminRecords || adminRecords.length === 0) {
              // Automatically insert the admin record
              await supabase
                .from("admin_users")
                .insert({
                  email: email,
                  role: "admin",
                  user_id: session.user.id
                });
            } else {
              // If record exists but user_id is missing or doesn't match, update it
              const record = adminRecords[0];
              if (record.user_id !== session.user.id) {
                await supabase
                  .from("admin_users")
                  .update({ user_id: session.user.id })
                  .eq("email", email);
              }
            }
          }
        }

        // Query admin_users table to verify permission
        const { data, error } = await supabase
          .from("admin_users")
          .select("id")
          .eq("email", session.user.email);
          
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
