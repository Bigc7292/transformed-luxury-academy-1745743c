
import { supabase } from "@/integrations/supabase/client";

export interface CustomerInquiry {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  topic: string;
  message: string;
  status?: string;
  session_id?: string;
  created_at?: string;
  updated_at?: string;
}

export const customerService = {
  async submitInquiry(inquiry: CustomerInquiry): Promise<{ success: boolean; error?: string }> {
    const { data, error } = await supabase
      .from("customer_inquiries")
      .insert(inquiry)
      .select()
      .single();
    
    if (error) {
      console.error("Error submitting inquiry:", error);
      return { success: false, error: error.message };
    }
    
    return { success: true };
  },
  
  async getInquiries(): Promise<CustomerInquiry[]> {
    const { data, error } = await supabase
      .from("customer_inquiries")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (error) {
      console.error("Error fetching inquiries:", error);
      throw error;
    }
    
    return data || [];
  },
  
  async updateInquiryStatus(id: string, status: string): Promise<{ success: boolean; error?: string }> {
    const { error } = await supabase
      .from("customer_inquiries")
      .update({ status })
      .eq("id", id);
    
    if (error) {
      console.error("Error updating inquiry status:", error);
      return { success: false, error: error.message };
    }
    
    return { success: true };
  }
};
