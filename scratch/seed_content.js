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
    url: '/claire-content/Lip filler signature lips.png',
    page_location: 'home',
    page_section: 'home_carousel',
    active: true,
    display_order: 1
  },
  {
    title: 'Premium Hair Extensions',
    category: 'promotional',
    media_type: 'image',
    url: '/claire-content/doing treatments (1).HEIC',
    page_location: 'home',
    page_section: 'home_carousel',
    active: true,
    display_order: 2
  },
  {
    title: 'Non-Surgical Facial Sculpting',
    category: 'promotional',
    media_type: 'image',
    url: '/claire-content/facial filler.png',
    page_location: 'home',
    page_section: 'home_carousel',
    active: true,
    display_order: 3
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
    url: '/claire-content/doing treatments.HEIC',
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
    title: 'Jawline Definition',
    category: 'promotional',
    media_type: 'image',
    url: '/claire-content/Jaw filler.png',
    page_location: 'home',
    page_section: 'home_carousel',
    active: true,
    display_order: 4
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
    url: '/claire-content/Kayla doing treatment.HEIC',
    page_location: 'about',
    page_section: 'about_gallery',
    active: true,
    display_order: 2
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
    title: 'Signature Lips Masterclass',
    category: 'promotional',
    media_type: 'image',
    url: '/claire-content/Signature lip filler.png',
    page_location: 'gallery',
    page_section: 'gallery_main',
    active: true,
    display_order: 1
  },
  {
    title: 'Advanced Dermal Filler',
    category: 'promotional',
    media_type: 'image',
    url: '/claire-content/facial filler.png',
    page_location: 'gallery',
    page_section: 'gallery_main',
    active: true,
    display_order: 2
  },
  {
    title: 'Treatment in Progress',
    category: 'promotional',
    media_type: 'image',
    url: '/claire-content/doing treatments (2).HEIC',
    page_location: 'gallery',
    page_section: 'gallery_main',
    active: true,
    display_order: 3
  },
  {
    title: 'Clinic Environment',
    category: 'promotional',
    media_type: 'image',
    url: '/claire-content/Transformed HQ Instagram (4).png',
    page_location: 'gallery',
    page_section: 'gallery_main',
    active: true,
    display_order: 4
  },
  {
    title: 'Training Academy',
    category: 'promotional',
    media_type: 'image',
    url: '/claire-content/Transformed HQ Instagram (6).png',
    page_location: 'gallery',
    page_section: 'gallery_main',
    active: true,
    display_order: 5
  },
  {
    title: 'Transformed HQ',
    category: 'promotional',
    media_type: 'image',
    url: '/claire-content/Transformed HQ Instagram.png',
    page_location: 'gallery',
    page_section: 'gallery_main',
    active: true,
    display_order: 6
  },
  {
    title: 'Lip Filler Signature Lips',
    category: 'promotional',
    media_type: 'image',
    url: '/claire-content/Lip filler signature lips (1).HEIC',
    page_location: 'gallery',
    page_section: 'gallery_featured',
    active: true,
    display_order: 2
  },
  {
    title: 'Natural Lip Enhancement',
    category: 'promotional',
    media_type: 'image',
    url: '/claire-content/Natural lip filler.HEIC',
    page_location: 'gallery',
    page_section: 'gallery_main',
    active: true,
    display_order: 7
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
    title: 'Signature Lip Artistry',
    category: 'promotional',
    media_type: 'image',
    url: '/claire-content/signature lips.png',
    page_location: 'gallery',
    page_section: 'gallery_featured',
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
    display_order: 5
  }
];

async function run() {
  console.log('Checking content table...');
  const { data: existing, error: checkError } = await supabase
    .from('content')
    .select('id, page_location, page_section, title');

  if (checkError) {
    console.error('Error checking database:', checkError);
    process.exit(1);
  }

  console.log(`Found ${existing.length} existing content items.`);

  for (const item of defaultItems) {
    const match = existing.find(
      (row) => row.page_location === item.page_location && row.page_section === item.page_section && row.title === item.title
    );

    if (match) {
      console.log(`Updating existing item: ${item.title}`);
      const { error: updateError } = await supabase
        .from('content')
        .update({
          url: item.url,
          category: item.category,
          media_type: item.media_type,
          active: item.active,
          display_order: item.display_order
        })
        .eq('id', match.id);

      if (updateError) {
        console.error(`Failed to update ${item.title}:`, updateError);
      } else {
        console.log(`Updated: ${item.title}`);
      }
    } else {
      console.log(`Inserting new item: ${item.title}`);
      const { error: insertError } = await supabase
        .from('content')
        .insert(item);

      if (insertError) {
        console.error(`Failed to insert ${item.title}:`, insertError);
      } else {
        console.log(`Inserted: ${item.title}`);
      }
    }
  }

  console.log('SUCCESS: Content seeding/update completed!');
}

run();
