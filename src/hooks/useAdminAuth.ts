
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
              try {
                await supabase
                  .from("admin_users")
                  .insert({
                    email: email,
                    role: "admin",
                    user_id: session.user.id
                  });
              } catch (insertError:any) {
                console.error('Failed to insert admin user:', insertError.message);
                // If duplicate error, ignore; otherwise show toast later
              }
            } else {
              // If record exists but user_id is missing or doesn't match, update it
              const record = adminRecords[0];
              if (record.user_id !== session.user.id) {
                try {
                  await supabase
                    .from("admin_users")
                    .update({ user_id: session.user.id })
                    .eq("email", email);
                } catch (updateError:any) {
                  console.error('Failed to update admin user:', updateError.message);
                }
              }
            }
          }
        }

        // Permission already validated by whitelist; no further admin_users check needed.
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
