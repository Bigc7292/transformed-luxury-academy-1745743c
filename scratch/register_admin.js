import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Load .env variables
const envPath = path.resolve(process.cwd(), '.env');
const envContent = fs.readFileSync(envPath, 'utf-8');
const env = {};
envContent.split('\n').forEach(line => {
  const parts = line.split('=');
  if (parts.length >= 2) {
    const key = parts[0].trim();
    const val = parts.slice(1).join('=').trim();
    env[key] = val;
  }
});

const supabaseUrl = env['VITE_SUPABASE_URL'];
const serviceKey = env['VITE_SUPABASE_SERVICE_ROLE_KEY'];

if (!supabaseUrl || !serviceKey) {
  console.error('Error: VITE_SUPABASE_URL or VITE_SUPABASE_SERVICE_ROLE_KEY missing in .env');
  process.exit(1);
}

// Service‑role client (bypasses RLS and auth)
const supabase = createClient(supabaseUrl, serviceKey);

// Hard‑coded admin credentials (must match UI default password)
const ADMIN_EMAIL = 'transformedacademyhq@gmail.com';
const ADMIN_PASSWORD = 'Fresha123!**';

async function ensureAdminAuthUser() {
  console.log('Ensuring admin auth user exists...');
  // Create the user; if the user already exists Supabase will return an error we can ignore.
  const { data: createData, error: createError } = await supabase.auth.admin.createUser({
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD,
    email_confirm: true,
  });
  if (createError && !createError.message?.includes('User already exists')) {
    console.error('Failed to create admin auth user:', createError.message);
    return null;
  }
  // If user existed or was created, fetch the user ID.
  const { data: userData, error: fetchError } = await supabase.auth.getUserByEmail(ADMIN_EMAIL);
  if (fetchError) {
    console.error('Could not fetch admin user ID:', fetchError.message);
    return null;
  }
  console.log('Admin auth user ensured with ID:', userData?.user?.id);
  return userData?.user?.id ?? null;
}

async function ensureAdminRecord(userId) {
  const adminRecord = {
    email: ADMIN_EMAIL,
    role: 'admin',
    user_id: userId,
  };
  console.log('Inserting admin record in admin_users table...');
  const { error: insertError } = await supabase
    .from('admin_users')
    .insert(adminRecord);
  if (insertError && !insertError.message?.includes('duplicate')) {
    console.error('Failed to insert admin_users record:', insertError.message);
  } else {
    console.log('Admin user ensured in admin_users table (inserted or already existed).');
  }
}

async function run() {
  const userId = await ensureAdminAuthUser();
  if (userId !== null) {
    await ensureAdminRecord(userId);
  }
}

run()
  .then(() => console.log('Script completed.'))
  .catch(err => console.error('Unexpected error:', err));
