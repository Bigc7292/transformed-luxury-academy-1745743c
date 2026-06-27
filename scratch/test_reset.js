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
  const email = 'transformedacademyhq@gmail.com';
  console.log(`Testing password reset for ${email}...`);
  const { data, error } = await supabase.auth.resetPasswordForEmail(email);
  if (error) {
    console.error('Reset password failed:', error.message);
  } else {
    console.log('Reset password succeeded (meaning user exists):', data);
  }
}

run();
