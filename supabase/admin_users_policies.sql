/* Enable Row Level Security for admin_users */
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

/* Allow authenticated users to insert a record if their email is whitelisted */
CREATE POLICY "allow_admin_insertion_for_whitelisted_emails"
ON public.admin_users
FOR INSERT
TO authenticated
WITH CHECK (
  email = ANY(ARRAY['transformedacademyhq@gmail.com'])
);

/* Allow admins (based on app_metadata role) to select, update, delete */
CREATE POLICY "admin_can_manage"
ON public.admin_users
FOR ALL
TO authenticated
USING (
  (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
)
WITH CHECK (
  (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
);
