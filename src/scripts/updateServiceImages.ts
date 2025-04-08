import { contentService } from '../services/contentService';

// Function to add service images to the database
async function addServiceImagesToDatabase() {
  console.log('Adding service images to the database...');

  // Define the images to add
  const servicesToAdd = [
    {
      title: 'Advanced Facials Service',
      description: 'Luxurious facials for radiant skin',
      url: 'https://content-for-services-chose-by-nik.s3.eu-north-1.amazonaws.com/facial.jpeg',
      category: 'promotional',
      media_type: 'image',
      page_location: 'services',
      page_section: 'services_showcase',
      meta_title: 'Advanced Facials | Transformed Academy',
      meta_description: 'Luxurious facial treatments for radiant skin at Transformed Academy and Salon.',
      meta_keywords: 'facial, skin treatment, skin care, beauty treatments, salon services',
      active: true,
      is_featured: true
    },
    {
      title: 'Bouncy and 90s Blow Outs Service',
      description: 'Get that perfect voluminous look',
      url: 'https://content-for-services-chose-by-nik.s3.eu-north-1.amazonaws.com/WhatsApp+Image+2025-04-08+at+18.22.45.jpeg',
      category: 'promotional',
      media_type: 'image',
      page_location: 'services',
      page_section: 'services_showcase',
      meta_title: 'Bouncy and 90s Blow Outs | Transformed Academy',
      meta_description: 'Get that perfect voluminous look with our professional blow out services at Transformed Academy and Salon.',
      meta_keywords: 'blow out, hair styling, voluminous hair, 90s style, salon services',
      active: true,
      is_featured: true
    },
    {
      title: 'Canula Training Service',
      description: 'Safe and effective canula techniques',
      url: 'https://content-for-services-chose-by-nik.s3.eu-north-1.amazonaws.com/WhatsApp+Image+2025-04-08+at+18.22.46.jpeg',
      category: 'promotional',
      media_type: 'image',
      page_location: 'services',
      page_section: 'services_showcase',
      meta_title: 'Canula Training | Transformed Academy',
      meta_description: 'Learn safe and effective canula techniques with our professional training at Transformed Academy.',
      meta_keywords: 'canula training, aesthetics training, beauty training, professional development',
      active: true,
      is_featured: true
    },
    {
      title: 'Hair Extensions Service',
      description: 'Premium hair extensions for added length and volume',
      url: 'https://content-for-services-chose-by-nik.s3.eu-north-1.amazonaws.com/exstensions.jpeg',
      category: 'promotional',
      media_type: 'image',
      page_location: 'services',
      page_section: 'services_showcase',
      meta_title: 'Hair Extensions Service | Transformed Academy',
      meta_description: 'Premium hair extensions services for added length and volume at Transformed Academy and Salon.',
      meta_keywords: 'hair extensions, hair volume, hair length, salon services',
      active: true,
      is_featured: true
    },
    {
      title: 'Waxing Service',
      description: 'Professional hair removal services',
      url: 'https://content-for-services-chose-by-nik.s3.eu-north-1.amazonaws.com/waxing.jpeg',
      category: 'promotional',
      media_type: 'image',
      page_location: 'services',
      page_section: 'services_showcase',
      meta_title: 'Waxing Services | Transformed Academy',
      meta_description: 'Professional waxing and hair removal services at Transformed Academy and Salon.',
      meta_keywords: 'waxing, hair removal, beauty treatments, salon services',
      active: true,
      is_featured: true
    },
    {
      title: 'Eyebrows Service',
      description: 'Shaping, tinting, and lamination services',
      url: 'https://content-for-services-chose-by-nik.s3.eu-north-1.amazonaws.com/eyebrows.jpeg',
      category: 'promotional',
      media_type: 'image',
      page_location: 'services',
      page_section: 'services_showcase',
      meta_title: 'Eyebrow Services | Transformed Academy',
      meta_description: 'Professional eyebrow shaping, tinting, and lamination services at Transformed Academy and Salon.',
      meta_keywords: 'eyebrows, brow lamination, brow tinting, brow shaping, salon services',
      active: true,
      is_featured: true
    },
    {
      title: 'Eyelashes Service',
      description: 'Beautiful lash extensions and lifting',
      url: 'https://content-for-services-chose-by-nik.s3.eu-north-1.amazonaws.com/eyelashes.jpeg',
      category: 'promotional',
      media_type: 'image',
      page_location: 'services',
      page_section: 'services_showcase',
      meta_title: 'Eyelash Services | Transformed Academy',
      meta_description: 'Beautiful lash extensions and lifting services at Transformed Academy and Salon.',
      meta_keywords: 'eyelashes, lash extensions, lash lifting, beauty treatments, salon services',
      active: true,
      is_featured: true
    }
  ];

  // Add each service image to the database
  for (const service of servicesToAdd) {
    try {
      const result = await contentService.createContent(service);
      if (result.success) {
        console.log(`Successfully added ${service.title} to the database`);
      } else {
        console.error(`Failed to add ${service.title}: ${result.error}`);
      }
    } catch (error) {
      console.error(`Error adding ${service.title}:`, error);
    }
  }

  console.log('Finished adding service images to the database');
}

// Execute the function
addServiceImagesToDatabase();
