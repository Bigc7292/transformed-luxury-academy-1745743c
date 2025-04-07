// This script imports the necessary environment variables and runs the add-s3-videos.js script
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { execSync } from 'child_process';

// Get the current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env file
config();

console.log('Starting video import process...');

try {
  // Run the add-s3-videos.js script
  execSync('node --experimental-modules scripts/add-s3-videos.js', {
    stdio: 'inherit',
    env: {
      ...process.env,
      VITE_SUPABASE_URL: process.env.VITE_SUPABASE_URL,
      VITE_SUPABASE_ANON_KEY: process.env.VITE_SUPABASE_ANON_KEY
    }
  });
  
  console.log('Video import process completed successfully!');
} catch (error) {
  console.error('Error running video import script:', error);
  process.exit(1);
}
