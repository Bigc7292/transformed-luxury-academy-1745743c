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
  console.log(`Deleting ${email} from admin_users...`);
  const { data, error } = await supabase
    .from('admin_users')
    .delete()
    .eq('email', email);
    
  if (error) {
    console.error('Delete failed:', error.message);
  } else {
    console.log('Delete successful or no rows matched.');
  }
}

run();
