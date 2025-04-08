import { supabase } from "@/integrations/supabase/client";

export const setupService = {
  async setupCustomerInquiriesTable(): Promise<{ success: boolean; error?: string }> {
    try {
      console.log('Setting up customer_inquiries table policies...');
      
      // First, check if the table exists
      const { data: tableExists, error: tableCheckError } = await supabase
        .from('customer_inquiries')
        .select('id')
        .limit(1);
      
      if (tableCheckError) {
        console.error('Error checking customer_inquiries table:', tableCheckError);
        return { success: false, error: tableCheckError.message };
      }
      
      // If the table doesn't exist, create it
      if (!tableExists) {
        const createTableSQL = `
          CREATE TABLE IF NOT EXISTS customer_inquiries (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT,
            topic TEXT NOT NULL,
            message TEXT NOT NULL,
            status TEXT DEFAULT 'new',
            session_id TEXT,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
          );
        `;
        
        const { error: createTableError } = await supabase.rpc('execute_sql', { sql: createTableSQL });
        
        if (createTableError) {
          console.error('Error creating customer_inquiries table:', createTableError);
          return { success: false, error: createTableError.message };
        }
      }
      
      // Enable RLS on the table
      const enableRLSSQL = `
        ALTER TABLE customer_inquiries ENABLE ROW LEVEL SECURITY;
      `;
      
      const { error: enableRLSError } = await supabase.rpc('execute_sql', { sql: enableRLSSQL });
      
      if (enableRLSError) {
        console.error('Error enabling RLS on customer_inquiries table:', enableRLSError);
        // Continue anyway, as this might fail if RLS is already enabled
      }
      
      // Create policies
      const policiesSQL = [
        // Allow anonymous inserts
        `
        CREATE POLICY IF NOT EXISTS "Allow anonymous inserts to customer_inquiries"
        ON customer_inquiries
        FOR INSERT
        TO anon
        WITH CHECK (true);
        `,
        
        // Allow authenticated inserts
        `
        CREATE POLICY IF NOT EXISTS "Allow authenticated inserts to customer_inquiries"
        ON customer_inquiries
        FOR INSERT
        TO authenticated
        WITH CHECK (true);
        `,
        
        // Allow authenticated reads
        `
        CREATE POLICY IF NOT EXISTS "Allow authenticated users to read all inquiries"
        ON customer_inquiries
        FOR SELECT
        TO authenticated
        USING (true);
        `,
        
        // Allow authenticated updates
        `
        CREATE POLICY IF NOT EXISTS "Allow authenticated users to update inquiries"
        ON customer_inquiries
        FOR UPDATE
        TO authenticated
        USING (true)
        WITH CHECK (true);
        `
      ];
      
      // Execute each policy
      for (const sql of policiesSQL) {
        const { error } = await supabase.rpc('execute_sql', { sql });
        
        if (error) {
          console.error('Error creating policy:', error);
          // Continue with other policies even if one fails
        }
      }
      
      console.log('Customer inquiries table setup completed successfully');
      return { success: true };
    } catch (err) {
      console.error('Exception during customer_inquiries table setup:', err);
      return { success: false, error: 'An unexpected error occurred during setup' };
    }
  }
};
