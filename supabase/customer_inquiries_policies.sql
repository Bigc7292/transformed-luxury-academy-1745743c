-- This SQL will be used to set up the RLS policies for the customer_inquiries table in Supabase.

-- First, enable RLS on the customer_inquiries table if not already enabled
ALTER TABLE customer_inquiries ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anonymous users to insert new inquiries
CREATE POLICY "Allow anonymous inserts to customer_inquiries"
ON customer_inquiries
FOR INSERT
TO anon
WITH CHECK (true);

-- Create policy to allow authenticated users to insert new inquiries
CREATE POLICY "Allow authenticated inserts to customer_inquiries"
ON customer_inquiries
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Create policy to allow authenticated users to read all inquiries
CREATE POLICY "Allow authenticated users to read all inquiries"
ON customer_inquiries
FOR SELECT
TO authenticated
USING (true);

-- Create policy to allow authenticated users to update inquiries
CREATE POLICY "Allow authenticated users to update inquiries"
ON customer_inquiries
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);
