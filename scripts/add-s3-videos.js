// Script to add S3 videos to the database
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Video data to add to the database
const videosToAdd = [
  {
    title: "Aesthetic Treatment Demonstration 1",
    description: "Professional demonstration of advanced aesthetic techniques at Transformed Academy",
    url: "https://transformed-academy-and-salon-videos.s3.eu-north-1.amazonaws.com/videos/WhatsApp+Video+2025-03-27+at+13.28.07+(1).mp4",
    category: "promotional",
    media_type: "video",
    page_location: "media",
    page_section: "media_videos",
    is_featured: true,
    active: true,
    thumbnail_url: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=1000" // Placeholder thumbnail
  },
  {
    title: "Salon Training Session",
    description: "Training session for aesthetic practitioners at our academy",
    url: "https://transformed-academy-and-salon-videos.s3.eu-north-1.amazonaws.com/videos/WhatsApp+Video+2025-03-27+at+13.31.54.mp4",
    category: "training",
    media_type: "video",
    page_location: "media",
    page_section: "media_videos",
    is_featured: false,
    active: true,
    thumbnail_url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1000" // Placeholder thumbnail
  },
  {
    title: "Client Treatment Process",
    description: "Step-by-step process of a client treatment at Transformed Academy",
    url: "https://transformed-academy-and-salon-videos.s3.eu-north-1.amazonaws.com/videos/WhatsApp+Video+2025-03-27+at+13.28.07.mp4",
    category: "promotional",
    media_type: "video",
    page_location: "media",
    page_section: "media_videos",
    is_featured: false,
    active: true,
    thumbnail_url: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1000" // Placeholder thumbnail
  },
  {
    title: "Lip Filler Procedure",
    description: "Detailed demonstration of our signature lip filler technique",
    url: "https://transformed-academy-and-salon-videos.s3.eu-north-1.amazonaws.com/videos/WhatsApp+Video+2025-03-27+at+13.28.08+(1).mp4",
    category: "promotional",
    media_type: "video",
    page_location: "media",
    page_section: "media_videos",
    is_featured: true,
    active: true,
    thumbnail_url: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=1000" // Placeholder thumbnail
  },
  {
    title: "Facial Treatment Showcase",
    description: "Showcase of our premium facial treatment procedures",
    url: "https://transformed-academy-and-salon-videos.s3.eu-north-1.amazonaws.com/videos/WhatsApp+Video+2025-03-27+at+13.28.08.mp4",
    category: "promotional",
    media_type: "video",
    page_location: "media",
    page_section: "media_videos",
    is_featured: false,
    active: true,
    thumbnail_url: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=1000" // Placeholder thumbnail
  },
  {
    title: "Aesthetic Training Masterclass",
    description: "Highlights from our advanced aesthetic training masterclass",
    url: "https://transformed-academy-and-salon-videos.s3.eu-north-1.amazonaws.com/videos/WhatsApp+Video+2025-03-27+at+13.28.09+(1).mp4",
    category: "training",
    media_type: "video",
    page_location: "media",
    page_section: "media_videos",
    is_featured: true,
    active: true,
    thumbnail_url: "https://images.unsplash.com/photo-1564410267841-915d8a4530ea?q=80&w=1000" // Placeholder thumbnail
  },
  {
    title: "Client Transformation Journey",
    description: "Before and after transformation journey of a client at our salon",
    url: "https://transformed-academy-and-salon-videos.s3.eu-north-1.amazonaws.com/videos/WhatsApp+Video+2025-03-27+at+13.28.09+(2).mp4",
    category: "promotional",
    media_type: "video",
    page_location: "media",
    page_section: "media_videos",
    is_featured: false,
    active: true,
    thumbnail_url: "https://images.unsplash.com/photo-1635368648861-ed533fd34ae9?q=80&w=1000" // Placeholder thumbnail
  }
];

// Function to add videos to the database
async function addVideosToDatabase() {
  console.log('Starting to add videos to the database...');
  
  for (const video of videosToAdd) {
    try {
      console.log(`Adding video: ${video.title}`);
      
      const { data, error } = await supabase
        .from('content')
        .insert(video)
        .select();
      
      if (error) {
        console.error(`Error adding video "${video.title}":`, error);
      } else {
        console.log(`Successfully added video "${video.title}" with ID: ${data[0].id}`);
      }
    } catch (err) {
      console.error(`Exception when adding video "${video.title}":`, err);
    }
  }
  
  console.log('Finished adding videos to the database.');
}

// Execute the function
addVideosToDatabase();
