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

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function run() {
  const email = `testadmin_${Date.now()}@gmail.com`;
  const password = 'TestPassword123!';
  
  console.log(`Attempting to sign up test user: ${email}...`);
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  
  if (error) {
    console.error('Sign up failed:', error.message);
  } else {
    console.log('Sign up successful!', data.user?.id);
  }
}

run();
