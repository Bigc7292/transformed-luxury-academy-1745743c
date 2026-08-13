import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const envContent = fs.readFileSync('.env', 'utf8');
const lines = envContent.split('\n');
let supabaseUrl = '';
let supabaseAnonKey = '';

for (const line of lines) {
  const parts = line.split('=');
  if (parts.length >= 2) {
    const key = parts[0].trim();
    const val = parts.slice(1).join('=').trim();
    if (key === 'VITE_SUPABASE_URL') supabaseUrl = val;
    if (key === 'VITE_SUPABASE_ANON_KEY') supabaseAnonKey = val;
  }
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const sections = ['home_carousel', 'home_featured', 'services_showcase', 'about_gallery', 'gallery_main', 'gallery_featured'];
const locations = ['home', 'services', 'about', 'gallery'];

for (const loc of locations) {
  for (const sec of sections) {
    const { data } = await supabase
      .from('content')
      .select('id,title,url,active')
      .eq('page_location', loc)
      .eq('page_section', sec)
      .eq('active', true);

    if (data && data.length > 0) {
      console.log(`${loc}|${sec}: ${data.length} items`);
      data.forEach(d => console.log(` - ${d.title} | ${d.url}`));
    }
  }
}
