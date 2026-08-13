
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
    image: '/luxury_lip_filler.png',
    services: [
      {
        id: 'extensions',
        title: 'Extensions',
        description: 'Premium hair extensions for added length and volume',
        image: '/luxury_lip_filler.png',
      },
      {
        id: 'coloring',
        title: 'Coloring and Mixologist',
        description: 'Expert color services tailored to your style',
        image: '/luxury_facial_sculpting.png',
      },
      {
        id: 'cutting',
        title: 'Advanced Cutting',
        description: 'Precision cuts by our expert stylists',
        image: '/luxury_facial_sculpting.png',
      },
      {
        id: 'blowouts',
        title: 'Bouncy and 90s Blow Outs',
        description: 'Get that perfect voluminous look',
        image: '/luxury_facial_sculpting.png',
      },
      {
        id: 'treatments',
        title: 'Hair and Scalp Treatments',
        description: 'Rejuvenate your hair and scalp with our specialized treatments',
        image: '/luxury_facial_sculpting.png',
      }
    ]
  },
  {
    id: 'aesthetics',
    name: 'Aesthetics',
    description: 'Advanced aesthetic procedures for natural enhancement',
    image: '/luxury_facial_sculpting.png',
    services: [
      {
        id: 'dermal-filler',
        title: 'Advanced Dermal Filler',
        description: 'Premium dermal fillers for natural-looking volume',
        image: '/luxury_facial_sculpting.png',
      },
      {
        id: 'lip-filler',
        title: 'Advanced Lip Filler',
        description: 'Expert lip enhancement for the perfect pout',
        image: '/luxury_lip_filler.png',
      },
      {
        id: 'facial-profiling',
        title: 'Facial Profiling',
        description: 'Comprehensive facial analysis and enhancement',
        image: '/luxury_facial_sculpting.png',
        isVideo: true,
      },
      {
        id: 'advanced-facials',
        title: 'Advanced Facials',
        description: 'Luxurious facials for radiant skin',
        image: '/luxury_facial_sculpting.png',
      },
      {
        id: 'vitamin-injections',
        title: 'Vitamin Injections',
        description: 'Boost your health and appearance with vitamin therapy',
        image: '/luxury_facial_sculpting.png',
      },
      {
        id: 'fat-dissolving',
        title: 'Fat Dissolving',
        description: 'Non-surgical fat reduction treatments',
        image: '/luxury_facial_sculpting.png',
      },
      {
        id: 'threads',
        title: 'Pod and Cog Threads',
        description: 'Advanced thread lifting techniques',
        image: '/luxury_facial_sculpting.png',
      },
      {
        id: 'skin-boosters',
        title: 'Skin Boosters',
        description: 'Deep hydration and skin rejuvenation',
        image: '/luxury_facial_sculpting.png',
      },
      {
        id: 'polynucleotides',
        title: 'Polynucleotides',
        description: 'Advanced skin rejuvenation treatments',
        image: '/luxury_facial_sculpting.png',
      },
      {
        id: 'aptos-threads',
        title: 'APTOS Threads',
        description: 'Premium thread lifting for natural results',
        image: '/luxury_facial_sculpting.png',
      },
      {
        id: 'exosome-boosters',
        title: 'Exosome Boosters',
        description: 'Cutting-edge skin rejuvenation',
        image: '/luxury_facial_sculpting.png',
      }
    ]
  },
  {
    id: 'non-surgical',
    name: 'Non-Surgical',
    description: 'Effective treatments with no downtime',
    image: '/luxury_facial_sculpting.png',
    services: [
      {
        id: 'facial-sculpting',
        title: 'Facial Sculpting',
        description: 'Non-surgical facial contouring and definition',
        image: '/luxury_facial_sculpting.png',
      },
      {
        id: 'body-sculpting',
        title: 'Body Sculpting',
        description: 'Non-invasive body contouring treatments',
        image: '/luxury_facial_sculpting.png',
      },
      {
        id: 'booty-lifts',
        title: 'XXXL Booty Lifts',
        description: 'Non-surgical enhancement for your curves',
        image: '/luxury_facial_sculpting.png',
        isVideo: true,
      },
      {
        id: 'body-massage',
        title: 'Body Massage',
        description: 'Relaxing and therapeutic massages',
        image: '/luxury_facial_sculpting.png',
      }
    ]
  },
  {
    id: 'beauty-treatments',
    name: 'Beauty Treatments',
    description: 'Complete beauty services for a polished look',
    image: '/luxury_facial_sculpting.png',
    services: [
      {
        id: 'lashes',
        title: 'Lashes',
        description: 'Beautiful lash extensions and lifting',
        image: '/luxury_facial_sculpting.png',
      },
      {
        id: 'waxing',
        title: 'Waxing',
        description: 'Professional hair removal services',
        image: '/luxury_facial_sculpting.png',
      },
      {
        id: 'eyebrows',
        title: 'Eyebrows',
        description: 'Shaping, tinting, and lamination services',
        image: '/luxury_facial_sculpting.png',
      },
      {
        id: 'nails',
        title: 'Nails',
        description: 'Luxury manicure services',
        image: '/luxury_facial_sculpting.png',
      },
      {
        id: 'pedicures',
        title: 'Pedicures',
        description: 'Relaxing and beautifying foot treatments',
        image: '/luxury_facial_sculpting.png',
      },
      {
        id: 'skin',
        title: 'Skin',
        description: 'Skin treatments for a glowing complexion',
        image: '/luxury_facial_sculpting.png',
      }
    ]
  },
  {
    id: 'training',
    name: 'Training Services',
    description: 'Professional training for beauty specialists',
    image: '/luxury_facial_sculpting.png',
    services: [
      {
        id: 'aesthetics-course',
        title: 'Start from Scratch Aesthetics Course',
        description: 'Complete training for beginners in aesthetics',
        image: '/luxury_facial_sculpting.png',
      },
      {
        id: 'anatomy',
        title: 'Anatomy and Physiology Level 4',
        description: 'Essential knowledge for aesthetic practitioners',
        image: '/luxury_facial_sculpting.png',
      },
      {
        id: 'anti-wrinkle',
        title: 'Anti Wrinkle Training',
        description: 'Learn anti-wrinkle injection techniques',
        image: '/luxury_facial_sculpting.png',
      },
      {
        id: 'dermal-filler-training',
        title: 'Dermal Filler Training',
        description: 'Comprehensive dermal filler application training',
        image: '/luxury_facial_sculpting.png',
      },
      {
        id: 'advanced-anti-wrinkle',
        title: 'Advanced Anti Wrinkle',
        description: 'Advanced techniques for anti-wrinkle treatments',
        image: '/luxury_facial_sculpting.png',
      },
      {
        id: 'advanced-dermal-filler-training',
        title: 'Advanced Dermal Filler',
        description: 'Master dermal filler techniques',
        image: '/luxury_facial_sculpting.png',
      },
      {
        id: 'canula-training',
        title: 'Canula Training',
        description: 'Safe and effective canula techniques',
        image: '/luxury_facial_sculpting.png',
      },
      {
        id: 'masterclasses',
        title: 'Master Classes',
        description: 'Specialized training in advanced procedures',
        image: '/luxury_facial_sculpting.png',
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
