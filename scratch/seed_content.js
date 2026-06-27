import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.join(__dirname, '../.env');
let supabaseUrl = '';
let supabaseAnonKey = '';

try {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const lines = envContent.split('\n');
  for (const line of lines) {
    const parts = line.split('=');
    if (parts.length >= 2) {
      const key = parts[0].trim();
      const val = parts.slice(1).join('=').trim();
      if (key === 'VITE_SUPABASE_URL') supabaseUrl = val;
      if (key === 'VITE_SUPABASE_ANON_KEY') supabaseAnonKey = val;
    }
  }
} catch (e) {
  console.error('Failed to read .env file:', e);
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const defaultItems = [
  // Carousel items
  {
    title: 'Signature Lip Fillers',
    category: 'aesthetics',
    media_type: 'image',
    url: 'https://services-menu-chosen-by-nikki.s3.eu-north-1.amazonaws.com/advanced_lips+(2).jpeg',
    page_location: 'home',
    page_section: 'home_carousel',
    active: true,
    display_order: 1
  },
  {
    title: 'Premium Hair Extensions',
    category: 'hair',
    media_type: 'image',
    url: 'https://content-for-services-chose-by-nik.s3.eu-north-1.amazonaws.com/exstensions.jpeg',
    page_location: 'home',
    page_section: 'home_carousel',
    active: true,
    display_order: 2
  },
  {
    title: 'Non-Surgical Facial Sculpting',
    category: 'non-surgical',
    media_type: 'image',
    url: 'https://content-for-services-chose-by-nik.s3.eu-north-1.amazonaws.com/WhatsApp+Image+2025-04-20+at+10.38.38.jpeg',
    page_location: 'home',
    page_section: 'home_carousel',
    active: true,
    display_order: 3
  },
  // Featured grid items
  {
    title: 'Luxury Lash Extensions',
    category: 'beauty-treatments',
    media_type: 'image',
    url: 'https://content-for-services-chose-by-nik.s3.eu-north-1.amazonaws.com/eyelashes.jpeg',
    page_location: 'home',
    page_section: 'home_featured',
    active: true,
    display_order: 1
  },
  {
    title: 'Bouncy Blowouts',
    category: 'hair',
    media_type: 'image',
    url: 'https://content-for-services-chose-by-nik.s3.eu-north-1.amazonaws.com/WhatsApp+Image+2025-04-08+at+18.22.45.jpeg',
    page_location: 'home',
    page_section: 'home_featured',
    active: true,
    display_order: 2
  },
  {
    title: 'Aesthetics Academy & Courses',
    category: 'training',
    media_type: 'image',
    url: 'https://content-for-services-chose-by-nik.s3.eu-north-1.amazonaws.com/WhatsApp+Image+2025-04-24+at+21.12.36.jpeg',
    page_location: 'home',
    page_section: 'home_featured',
    active: true,
    display_order: 3
  }
];

async function run() {
  console.log('Checking content table...');
  const { data: existing, error: checkError } = await supabase
    .from('content')
    .select('id');

  if (checkError) {
    console.error('Error checking database:', checkError);
    process.exit(1);
  }

  if (existing.length > 0) {
    console.log('Database already has content items. Skipping seed.');
    return;
  }

  console.log('Database is empty. Inserting default content items...');
  const { error: insertError } = await supabase
    .from('content')
    .insert(defaultItems);

  if (insertError) {
    console.error('Failed to seed database:', insertError);
    process.exit(1);
  }

  console.log('SUCCESS: Seeded default items successfully!');
}

run();
