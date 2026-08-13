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
  {
    title: 'Signature Lip Fillers',
    category: 'promotional',
    media_type: 'image',
    url: '/claire-content/Signature lip filler.png',
    page_location: 'home',
    page_section: 'home_carousel',
    active: true,
    display_order: 1
  },
  {
    title: 'Non-Surgical Facial Sculpting',
    category: 'promotional',
    media_type: 'image',
    url: '/claire-content/facial filler.png',
    page_location: 'home',
    page_section: 'home_carousel',
    active: true,
    display_order: 2
  },
  {
    title: 'Jawline Definition',
    category: 'promotional',
    media_type: 'image',
    url: '/claire-content/Jaw filler.png',
    page_location: 'home',
    page_section: 'home_carousel',
    active: true,
    display_order: 3
  },
  {
    title: 'Cardiff Bay Clinic',
    category: 'promotional',
    media_type: 'image',
    url: '/claire-content/Transformed HQ Instagram (7).png',
    page_location: 'home',
    page_section: 'home_carousel',
    active: true,
    display_order: 4
  },
  {
    title: 'Luxury Lash Extensions',
    category: 'promotional',
    media_type: 'image',
    url: '/claire-content/signature lips.png',
    page_location: 'home',
    page_section: 'home_featured',
    active: true,
    display_order: 1
  },
  {
    title: 'Bouncy Blowouts',
    category: 'promotional',
    media_type: 'image',
    url: '/claire-content/signature lips.png',
    page_location: 'home',
    page_section: 'home_featured',
    active: true,
    display_order: 2
  },
  {
    title: 'Aesthetics Academy & Courses',
    category: 'promotional',
    media_type: 'image',
    url: '/claire-content/Transformed HQ Instagram (5).png',
    page_location: 'home',
    page_section: 'home_featured',
    active: true,
    display_order: 3
  },
  {
    title: 'Polynucleotides Treatment',
    category: 'promotional',
    media_type: 'image',
    url: '/claire-content/Polynucleotides.png',
    page_location: 'services',
    page_section: 'services_showcase',
    active: true,
    display_order: 1
  },
  {
    title: 'Facial Filler Procedure',
    category: 'promotional',
    media_type: 'image',
    url: '/claire-content/facial filler.png',
    page_location: 'services',
    page_section: 'services_showcase',
    active: true,
    display_order: 2
  },
  {
    title: 'Clinic Interior',
    category: 'promotional',
    media_type: 'image',
    url: '/claire-content/Transformed HQ Instagram (3).png',
    page_location: 'about',
    page_section: 'about_gallery',
    active: true,
    display_order: 1
  },
  {
    title: 'Kayla Performing Treatment',
    category: 'staff',
    media_type: 'image',
    url: '/claire-content/Transformed HQ Instagram (1).png',
    page_location: 'about',
    page_section: 'about_gallery',
    active: true,
    display_order: 2
  },
  {
    title: 'Advanced Treatment Room',
    category: 'promotional',
    media_type: 'image',
    url: '/claire-content/Transformed HQ Instagram (2).png',
    page_location: 'about',
    page_section: 'about_gallery',
    active: true,
    display_order: 3
  },
  {
    title: 'Training Academy',
    category: 'promotional',
    media_type: 'image',
    url: '/claire-content/Transformed HQ Instagram (6).png',
    page_location: 'gallery',
    page_section: 'gallery_main',
    active: true,
    display_order: 1
  },
  {
    title: 'Signature Lips Masterclass',
    category: 'promotional',
    media_type: 'image',
    url: '/claire-content/Signature lip filler.png',
    page_location: 'gallery',
    page_section: 'gallery_main',
    active: true,
    display_order: 2
  },
  {
    title: 'Advanced Dermal Filler',
    category: 'promotional',
    media_type: 'image',
    url: '/claire-content/facial filler.png',
    page_location: 'gallery',
    page_section: 'gallery_main',
    active: true,
    display_order: 3
  },
  {
    title: 'Treatment in Progress',
    category: 'promotional',
    media_type: 'image',
    url: '/claire-content/Transformed HQ Instagram (4).png',
    page_location: 'gallery',
    page_section: 'gallery_main',
    active: true,
    display_order: 4
  },
  {
    title: 'Clinic Environment',
    category: 'promotional',
    media_type: 'image',
    url: '/claire-content/Transformed HQ Instagram.png',
    page_location: 'gallery',
    page_section: 'gallery_main',
    active: true,
    display_order: 5
  },
  {
    title: 'Natural Lip Enhancement',
    category: 'promotional',
    media_type: 'image',
    url: '/claire-content/Natural lip filler.png',
    page_location: 'gallery',
    page_section: 'gallery_main',
    active: true,
    display_order: 6
  },
  {
    title: 'Natural Lip Filler Results',
    category: 'promotional',
    media_type: 'image',
    url: '/claire-content/Natural lip filler.png',
    page_location: 'gallery',
    page_section: 'gallery_featured',
    active: true,
    display_order: 1
  },
  {
    title: 'Lip Filler Signature Lips',
    category: 'promotional',
    media_type: 'image',
    url: '/claire-content/Signature lip filler.png',
    page_location: 'gallery',
    page_section: 'gallery_featured',
    active: true,
    display_order: 2
  },
  {
    title: 'Signature Lip Artistry',
    category: 'promotional',
    media_type: 'image',
    url: '/claire-content/signature lips.png',
    page_location: 'gallery',
    page_section: 'gallery_featured',
    active: true,
    display_order: 3
  }
];

async function run() {
  console.log('Deleting all existing content rows...');
  const { error: deleteError } = await supabase
    .from('content')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000');

  if (deleteError) {
    console.error('Error deleting content:', deleteError);
    process.exit(1);
  }

  console.log('All content rows deleted.');

  console.log('Inserting clean content items...');
  const { error: insertError } = await supabase
    .from('content')
    .insert(defaultItems);

  if (insertError) {
    console.error('Failed to insert content:', insertError);
    process.exit(1);
  }

  console.log(`SUCCESS: Inserted ${defaultItems.length} clean content items!`);
}

run();
