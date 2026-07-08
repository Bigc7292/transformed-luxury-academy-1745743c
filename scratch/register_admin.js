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
  
  // First try to create the user
  const { data: createData, error: createError } = await supabase.auth.admin.createUser({
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD,
    email_confirm: true,
  });
  
  let userId = null;
  
  if (createError && createError.message?.includes('User already exists')) {
    console.log('User exists. Fetching and updating password...');
    const { data: userData, error: fetchError } = await supabase.auth.admin.listUsers();
    
    if (fetchError) {
      console.error('Could not fetch users list:', fetchError.message);
      return null;
    }
    
    const user = userData.users.find(u => u.email === ADMIN_EMAIL);
    if (!user) {
      console.error('Could not find user by email in listUsers.');
      return null;
    }
    
    userId = user.id;
    
    // Update the password
    const { error: updateError } = await supabase.auth.admin.updateUserById(userId, {
      password: ADMIN_PASSWORD
    });
    
    if (updateError) {
      console.error('Failed to update password:', updateError.message);
      return null;
    }
    console.log('Password updated successfully.');
  } else if (createError) {
    console.error('Failed to create admin auth user:', createError.message);
    return null;
  } else {
    userId = createData?.user?.id;
    console.log('Admin user created newly.');
  }
  
  console.log('Admin auth user ensured with ID:', userId);
  return userId;
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
