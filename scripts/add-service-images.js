// Script to add service images to the database
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Images to add to the database
const imagesToAdd = [
  {
    title: "Lip Fillers",
    description: "Professional lip enhancement service for the perfect pout. Our advanced lip filler treatments provide natural-looking volume and definition.",
    url: "https://content-for-services-chose-by-nik.s3.eu-north-1.amazonaws.com/lip_fillers_image.jpg",
    category: "promotional",
    media_type: "image",
    page_location: "media",
    page_section: "media_gallery",
    is_featured: false,
    active: true,
    meta_tags: "lip fillers, lip enhancement, aesthetics, beauty, transformed academy"
  },
  {
    title: "Color Mixologist",
    description: "Expert hair coloring services tailored to your style. Our color mixologists create custom formulations for vibrant, long-lasting results.",
    url: "https://content-for-services-chose-by-nik.s3.eu-north-1.amazonaws.com/color_mixologist.png",
    category: "promotional",
    media_type: "image",
    page_location: "media",
    page_section: "media_gallery",
    is_featured: false,
    active: true,
    meta_tags: "hair color, mixologist, hair styling, salon services, transformed academy"
  },
  {
    title: "Anti-Wrinkle Treatment",
    description: "Effective anti-aging treatments to reduce the appearance of fine lines and wrinkles. Achieve a more youthful, refreshed appearance.",
    url: "https://content-for-services-chose-by-nik.s3.eu-north-1.amazonaws.com/Antie_Wrinkle_image.jpg",
    category: "promotional",
    media_type: "image",
    page_location: "services",
    page_section: "services_showcase",
    is_featured: false,
    active: true,
    meta_tags: "anti-wrinkle, anti-aging, botox, aesthetics, transformed academy"
  },
  {
    title: "Facial Profiling",
    description: "Comprehensive facial analysis and enhancement services. Our facial profiling approach ensures balanced, harmonious results.",
    url: "https://content-for-services-chose-by-nik.s3.eu-north-1.amazonaws.com/facial_profiling.jpg",
    category: "promotional",
    media_type: "image",
    page_location: "services",
    page_section: "services_showcase",
    is_featured: false,
    active: true,
    meta_tags: "facial profiling, facial analysis, aesthetics, beauty, transformed academy"
  },
  {
    title: "Blow Dry",
    description: "Get that perfect voluminous look with our professional blow dry services. Bouncy, glamorous styles for any occasion.",
    url: "https://content-for-services-chose-by-nik.s3.eu-north-1.amazonaws.com/blow_dry.png",
    category: "promotional",
    media_type: "image",
    page_location: "services",
    page_section: "services_showcase",
    is_featured: false,
    active: true,
    meta_tags: "blow dry, hair styling, volume, salon services, transformed academy"
  },
  {
    title: "Body Sculpting",
    description: "Non-invasive body contouring treatments to enhance your natural shape. Achieve the silhouette you desire without surgery.",
    url: "https://content-for-services-chose-by-nik.s3.eu-north-1.amazonaws.com/body_sculpting.png",
    category: "promotional",
    media_type: "image",
    page_location: "services",
    page_section: "services_showcase",
    is_featured: false,
    active: true,
    meta_tags: "body sculpting, body contouring, non-surgical, aesthetics, transformed academy"
  },
  {
    title: "Cannula Technique",
    description: "Advanced cannula technique for safer, more comfortable filler treatments with reduced bruising and swelling.",
    url: "https://content-for-services-chose-by-nik.s3.eu-north-1.amazonaws.com/cannula.png",
    category: "promotional",
    media_type: "image",
    page_location: "services",
    page_section: "services_showcase",
    is_featured: false,
    active: true,
    meta_tags: "cannula, dermal fillers, aesthetics, beauty, transformed academy"
  },
  {
    title: "Skin Treatments",
    description: "Comprehensive skin treatments to address various concerns and achieve a radiant, healthy complexion.",
    url: "https://content-for-services-chose-by-nik.s3.eu-north-1.amazonaws.com/skin.png",
    category: "promotional",
    media_type: "image",
    page_location: "services",
    page_section: "services_showcase",
    is_featured: false,
    active: true,
    meta_tags: "skin treatments, skincare, facial, aesthetics, transformed academy"
  },
  {
    title: "Facial Profiling Video",
    description: "Watch our facial profiling process in action. Learn about our comprehensive approach to facial enhancement.",
    url: "https://content-for-services-chose-by-nik.s3.eu-north-1.amazonaws.com/facial_profiling.mp4",
    category: "promotional",
    media_type: "video",
    page_location: "media",
    page_section: "media_videos",
    is_featured: true,
    active: true,
    meta_tags: "facial profiling, video, aesthetics, beauty, transformed academy"
  },
  {
    title: "Training Video",
    description: "Professional training demonstration for aesthetic practitioners. Learn advanced techniques from our experts.",
    url: "https://content-for-services-chose-by-nik.s3.eu-north-1.amazonaws.com/training_video.mp4",
    category: "training",
    media_type: "video",
    page_location: "media",
    page_section: "media_videos",
    is_featured: true,
    active: true,
    meta_tags: "training, aesthetics, education, professional development, transformed academy"
  }
];

// Function to add images to the database
async function addImagesToDatabase() {
  console.log('Starting to add images to the database...');

  for (const image of imagesToAdd) {
    try {
      console.log(`Adding image: ${image.title}`);

      const { data, error } = await supabase
        .from('content')
        .insert(image)
        .select();

      if (error) {
        console.error(`Error adding image "${image.title}":`, error);
      } else {
        console.log(`Successfully added image "${image.title}" with ID: ${data[0].id}`);
      }
    } catch (err) {
      console.error(`Exception when adding image "${image.title}":`, err);
    }
  }

  console.log('Finished adding images to the database.');
}

// Execute the function
addImagesToDatabase();
