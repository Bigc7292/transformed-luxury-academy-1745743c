import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Load env variables
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
const supabaseAnonKey = env['VITE_SUPABASE_ANON_KEY'];

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Error: VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY not found in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function run() {
  const email = 'transformedacademyhq@gmail.com';
  const tempPassword = 'Transformed2026!'; // Temporary password
  
  console.log(`Attempting to sign up admin: ${email}...`);
  
  const { data, error } = await supabase.auth.signUp({
    email,
    password: tempPassword,
    options: {
      data: {
        needs_password_change: true
      }
    }
  });

  if (error) {
    console.error('Sign up failed:', error.message);
    if (error.message.includes('already registered')) {
      console.log('User is already registered in auth. Let\'s try to sign in and update metadata if possible, or proceed.');
    }
  } else {
    console.log('Sign up successful!');
    console.log('User details:', {
      id: data.user?.id,
      email: data.user?.email,
      user_metadata: data.user?.user_metadata
    });
    
    if (data.session) {
      console.log('Session active. Attempting to insert into admin_users table...');
      const { error: insertError } = await supabase
        .from('admin_users')
        .insert({
          email: data.user.email,
          role: 'admin',
          user_id: data.user.id
        });
      
      if (insertError) {
        console.error('Failed to insert into admin_users:', insertError.message);
      } else {
        console.log('Successfully inserted into admin_users table!');
      }
    } else {
      console.log('No active session returned (email confirmation may be enabled). The user will be automatically added to the admin_users table upon first login via the frontend fallback logic.');
    }
  }
}

run();
