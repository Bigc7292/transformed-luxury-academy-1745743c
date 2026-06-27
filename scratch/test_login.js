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
  
  console.log(`Checking sign in for ${email}...`);
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password: 'some-incorrect-password'
  });
  
  if (error) {
    console.log('Login result error:', error.message);
  } else {
    console.log('Login result success:', data);
  }
}

run();
