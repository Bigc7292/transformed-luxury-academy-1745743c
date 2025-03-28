
-- This SQL will be used to set up the storage bucket in Supabase.
-- Create a new storage bucket for content media
INSERT INTO storage.buckets (id, name, public)
VALUES ('content-media', 'Content Media Files', true)
ON CONFLICT (id) DO NOTHING;

-- Add policy to allow authenticated uploads
CREATE POLICY "Allow authenticated uploads"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'content-media');

-- Add policy to allow public read access
CREATE POLICY "Allow public read access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'content-media');
