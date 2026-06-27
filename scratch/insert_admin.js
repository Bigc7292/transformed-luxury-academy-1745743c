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
  const userId = '396c70ba-5d27-427b-b76f-b1c3c22679d5';
  
  console.log(`Inserting ${email} back into admin_users table...`);
  const { data, error } = await supabase
    .from('admin_users')
    .insert({
      email: email,
      role: 'admin',
      user_id: userId
    });
    
  if (error) {
    console.error('Insert failed:', error.message);
  } else {
    console.log('Insert successful!');
  }
}

run();
