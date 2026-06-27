-- Add a unique constraint to admin_users.email for UPSERT support
-- Run this migration using Supabase CLI or via the Supabase dashboard SQL editor.

ALTER TABLE public.admin_users
  ADD CONSTRAINT admin_users_email_key UNIQUE (email);
