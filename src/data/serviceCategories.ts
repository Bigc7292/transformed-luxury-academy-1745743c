
// Define the service category structure
export type ServiceCategory = {
  id: string;
  name: string;
  description?: string;
  image?: string;
  services: Service[];
};

// Define the service structure
export type Service = {
  id: string;
  title: string;
  description: string;
  image?: string;
  isVideo?: boolean;
  price?: string;
  bookingUrl?: string;
  services?: string[];
};

// The booking URL for all services
export const BOOKING_URL = 'https://that-time.co.uk/transformed-academy-hq';

// All services organized by category
export const serviceCategories: ServiceCategory[] = [
  {
    id: 'hair',
    name: 'Hair',
    description: 'Premium hair services for all your styling needs',
    image: 'https://content-for-services-chose-by-nik.s3.eu-north-1.amazonaws.com/exstensions.jpeg',
    services: [
      {
        id: 'extensions',
        title: 'Extensions',
        description: 'Premium hair extensions for added length and volume',
        image: 'https://content-for-services-chose-by-nik.s3.eu-north-1.amazonaws.com/exstensions.jpeg',
      },
      {
        id: 'coloring',
        title: 'Coloring and Mixologist',
        description: 'Expert color services tailored to your style',
        image: 'https://content-for-services-chose-by-nik.s3.eu-north-1.amazonaws.com/color_mixologist.png',
      },
      {
        id: 'cutting',
        title: 'Advanced Cutting',
        description: 'Precision cuts by our expert stylists',
        image: 'https://content-for-services-chose-by-nik.s3.eu-north-1.amazonaws.com/cutting.jpeg',
      },
      {
        id: 'blowouts',
        title: 'Bouncy and 90s Blow Outs',
        description: 'Get that perfect voluminous look',
        image: 'https://content-for-services-chose-by-nik.s3.eu-north-1.amazonaws.com/WhatsApp+Image+2025-04-08+at+18.22.45.jpeg',
      },
      {
        id: 'treatments',
        title: 'Hair and Scalp Treatments',
        description: 'Rejuvenate your hair and scalp with our specialized treatments',
        image: 'https://content-for-services-chose-by-nik.s3.eu-north-1.amazonaws.com/scalp.jpeg',
      }
    ]
  },
  {
    id: 'aesthetics',
    name: 'Aesthetics',
    description: 'Advanced aesthetic procedures for natural enhancement',
    image: 'https://content-for-services-chose-by-nik.s3.eu-north-1.amazonaws.com/facial.jpeg',
    services: [
      {
        id: 'dermal-filler',
        title: 'Advanced Dermal Filler',
        description: 'Premium dermal fillers for natural-looking volume',
        image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=1000',
      },
      {
        id: 'lip-filler',
        title: 'Advanced Lip Filler',
        description: 'Expert lip enhancement for the perfect pout',
        image: 'https://services-menu-chosen-by-nikki.s3.eu-north-1.amazonaws.com/advanced_lips+(2).jpeg',
      },
      {
        id: 'facial-profiling',
        title: 'Facial Profiling',
        description: 'Comprehensive facial analysis and enhancement',
        image: 'https://services-menu-chosen-by-nikki.s3.eu-north-1.amazonaws.com/facial_profilng.mp4',
        isVideo: true,
      },
      {
        id: 'advanced-facials',
        title: 'Advanced Facials',
        description: 'Luxurious facials for radiant skin',
        image: 'https://services-menu-chosen-by-nikki.s3.eu-north-1.amazonaws.com/advanced_facials.jpeg',
      },
      {
        id: 'vitamin-injections',
        title: 'Vitamin Injections',
        description: 'Boost your health and appearance with vitamin therapy',
        image: 'https://services-menu-chosen-by-nikki.s3.eu-north-1.amazonaws.com/vitamin.jpeg',
      },
      {
        id: 'fat-dissolving',
        title: 'Fat Dissolving',
        description: 'Non-surgical fat reduction treatments',
        image: 'https://services-menu-chosen-by-nikki.s3.eu-north-1.amazonaws.com/fat_dissolving.jpeg',
      },
      {
        id: 'threads',
        title: 'Pod and Cog Threads',
        description: 'Advanced thread lifting techniques',
        image: 'https://services-menu-chosen-by-nikki.s3.eu-north-1.amazonaws.com/pog_and_cog.png',
      },
      {
        id: 'skin-boosters',
        title: 'Skin Boosters',
        description: 'Deep hydration and skin rejuvenation',
        image: 'https://services-menu-chosen-by-nikki.s3.eu-north-1.amazonaws.com/skin_boosters.jpeg',
      },
      {
        id: 'polynucleotides',
        title: 'Polynucleotides',
        description: 'Advanced skin rejuvenation treatments',
        image: 'https://services-menu-chosen-by-nikki.s3.eu-north-1.amazonaws.com/polynu.jpeg',
      },
      {
        id: 'aptos-threads',
        title: 'APTOS Threads',
        description: 'Premium thread lifting for natural results',
        image: 'https://services-menu-chosen-by-nikki.s3.eu-north-1.amazonaws.com/aptos.jpeg',
      },
      {
        id: 'exosome-boosters',
        title: 'Exosome Boosters',
        description: 'Cutting-edge skin rejuvenation',
        image: 'https://services-menu-chosen-by-nikki.s3.eu-north-1.amazonaws.com/exosome.jpeg',
      }
    ]
  },
  {
    id: 'non-surgical',
    name: 'Non-Surgical',
    description: 'Effective treatments with no downtime',
    image: 'https://content-for-services-chose-by-nik.s3.eu-north-1.amazonaws.com/WhatsApp+Image+2025-04-20+at+10.38.38.jpeg',
    services: [
      {
        id: 'facial-sculpting',
        title: 'Facial Sculpting',
        description: 'Non-surgical facial contouring and definition',
        image: 'https://content-for-services-chose-by-nik.s3.eu-north-1.amazonaws.com/WhatsApp+Image+2025-04-20+at+10.38.38.jpeg',
      },
      {
        id: 'body-sculpting',
        title: 'Body Sculpting',
        description: 'Non-invasive body contouring treatments',
        image: 'https://content-for-services-chose-by-nik.s3.eu-north-1.amazonaws.com/body%2Bsculpting.jpeg',
      },
      {
        id: 'booty-lifts',
        title: 'XXXL Booty Lifts',
        description: 'Non-surgical enhancement for your curves',
        image: 'https://services-menu-chosen-by-nikki.s3.eu-north-1.amazonaws.com/xxxl+booty+lift.mp4',
        isVideo: true,
      },
      {
        id: 'body-massage',
        title: 'Body Massage',
        description: 'Relaxing and therapeutic massages',
        image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1000',
      }
    ]
  },
  {
    id: 'beauty-treatments',
    name: 'Beauty Treatments',
    description: 'Complete beauty services for a polished look',
    image: 'https://content-for-services-chose-by-nik.s3.eu-north-1.amazonaws.com/pedicure.jpeg',
    services: [
      {
        id: 'lashes',
        title: 'Lashes',
        description: 'Beautiful lash extensions and lifting',
        image: 'https://content-for-services-chose-by-nik.s3.eu-north-1.amazonaws.com/eyelashes.jpeg',
      },
      {
        id: 'waxing',
        title: 'Waxing',
        description: 'Professional hair removal services',
        image: 'https://content-for-services-chose-by-nik.s3.eu-north-1.amazonaws.com/waxing.jpeg',
      },
      {
        id: 'eyebrows',
        title: 'Eyebrows',
        description: 'Shaping, tinting, and lamination services',
        image: 'https://content-for-services-chose-by-nik.s3.eu-north-1.amazonaws.com/eyebrows.jpeg',
      },
      {
        id: 'nails',
        title: 'Nails',
        description: 'Luxury manicure services',
        image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=1000',
      },
      {
        id: 'pedicures',
        title: 'Pedicures',
        description: 'Relaxing and beautifying foot treatments',
        image: 'https://content-for-services-chose-by-nik.s3.eu-north-1.amazonaws.com/pedicure.jpeg',
      },
      {
        id: 'skin',
        title: 'Skin',
        description: 'Skin treatments for a glowing complexion',
        image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1000',
      }
    ]
  },
  {
    id: 'training',
    name: 'Training Services',
    description: 'Professional training for beauty specialists',
    image: 'https://content-for-services-chose-by-nik.s3.eu-north-1.amazonaws.com/WhatsApp+Image+2025-04-24+at+21.12.37+(3).jpeg',
    services: [
      {
        id: 'aesthetics-course',
        title: 'Start from Scratch Aesthetics Course',
        description: 'Complete training for beginners in aesthetics',
        image: 'https://content-for-services-chose-by-nik.s3.eu-north-1.amazonaws.com/WhatsApp+Image+2025-04-24+at+21.12.36+(2).jpeg',
      },
      {
        id: 'anatomy',
        title: 'Anatomy and Physiology Level 4',
        description: 'Essential knowledge for aesthetic practitioners',
        image: 'https://content-for-services-chose-by-nik.s3.eu-north-1.amazonaws.com/WhatsApp+Image+2025-04-24+at+21.12.36+(3).jpeg',
      },
      {
        id: 'anti-wrinkle',
        title: 'Anti Wrinkle Training',
        description: 'Learn anti-wrinkle injection techniques',
        image: 'https://transformedacademyhq.co.uk/lovable-uploads/e39c38e5-88c2-4732-aff5-8e3561694f5b.png',
      },
      {
        id: 'dermal-filler-training',
        title: 'Dermal Filler Training',
        description: 'Comprehensive dermal filler application training',
        image: 'https://content-for-services-chose-by-nik.s3.eu-north-1.amazonaws.com/WhatsApp+Image+2025-04-24+at+21.12.36.jpeg',
      },
      {
        id: 'advanced-anti-wrinkle',
        title: 'Advanced Anti Wrinkle',
        description: 'Advanced techniques for anti-wrinkle treatments',
        image: 'https://content-for-services-chose-by-nik.s3.eu-north-1.amazonaws.com/WhatsApp+Image+2025-04-24+at+21.12.37.jpeg',
      },
      {
        id: 'advanced-dermal-filler-training',
        title: 'Advanced Dermal Filler',
        description: 'Master dermal filler techniques',
        image: 'https://content-for-services-chose-by-nik.s3.eu-north-1.amazonaws.com/WhatsApp+Image+2025-04-24+at+21.12.37+(2).jpeg',
      },
      {
        id: 'canula-training',
        title: 'Canula Training',
        description: 'Safe and effective canula techniques',
        image: 'https://content-for-services-chose-by-nik.s3.eu-north-1.amazonaws.com/WhatsApp+Image+2025-04-08+at+18.22.46.jpeg',
      },
      {
        id: 'masterclasses',
        title: 'Master Classes',
        description: 'Specialized training in advanced procedures',
        image: 'https://content-for-services-chose-by-nik.s3.eu-north-1.amazonaws.com/WhatsApp+Image+2025-04-24+at+21.12.37+(1).jpeg',
        services: [
          'Liquid Rhinoplasty with Pixie Lift',
          'Signature Lips',
          'Advanced Skin Boosters (Canula)',
          '11 Point Face Lift',
          'Facial Profiling'
        ]
      }
    ]
  }
];
