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

const supabase = createClient(supabaseUrl, serviceKey);

async function run() {
  const userId = '396c70ba-5d27-427b-b76f-b1c3c22679d5';
  const password = 'Fresha123!**';
  
  // Update password
  const { data: updateData, error: updateError } = await supabase.auth.admin.updateUserById(userId, {
    password: password
  });
  
  if (updateError) {
    console.error('Update error:', updateError);
    return;
  }
  
  console.log('Password updated for user:', userId);
}

run();
