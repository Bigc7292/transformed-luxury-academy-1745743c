
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Define the service category structure
export type ServiceCategory = {
  id: string;
  name: string;
  description?: string;
  services: Service[];
};

// Define the service structure
export type Service = {
  id: string;
  title: string;
  description: string;
  image?: string;
  price?: string;
  bookingUrl?: string;
};

// All services organized by category
export const serviceCategories: ServiceCategory[] = [
  {
    id: 'hair',
    name: 'Hair',
    description: 'Premium hair services for all your styling needs',
    services: [
      {
        id: 'extensions',
        title: 'Extensions',
        description: 'Premium hair extensions for added length and volume',
        image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=1000',
      },
      {
        id: 'coloring',
        title: 'Coloring and Mixologist',
        description: 'Expert color services tailored to your style',
        image: 'https://images.unsplash.com/photo-1560869713-7d9acb7bbc19?q=80&w=1000',
      },
      {
        id: 'cutting',
        title: 'Advanced Cutting',
        description: 'Precision cuts by our expert stylists',
        image: 'https://images.unsplash.com/photo-1634449571010-02389ed0f9b0?q=80&w=1000',
      },
      {
        id: 'blowouts',
        title: 'Bouncy and 90s Blow Outs',
        description: 'Get that perfect voluminous look',
        image: 'https://images.unsplash.com/photo-1522337094846-8a818192de1f?q=80&w=1000',
      },
      {
        id: 'treatments',
        title: 'Hair and Scalp Treatments',
        description: 'Rejuvenate your hair and scalp with our specialized treatments',
        image: 'https://images.unsplash.com/photo-1584302179602-e4c3d3fd629d?q=80&w=1000',
      }
    ]
  },
  {
    id: 'aesthetics',
    name: 'Aesthetics',
    description: 'Advanced aesthetic procedures for natural enhancement',
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
        image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=1000',
      },
      {
        id: 'facial-profiling',
        title: 'Facial Profiling',
        description: 'Comprehensive facial analysis and enhancement',
        image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1000',
      },
      {
        id: 'advanced-facials',
        title: 'Advanced Facials',
        description: 'Luxurious facials for radiant skin',
        image: 'https://images.unsplash.com/photo-1596315314910-48e3668f7879?q=80&w=1000',
      },
      {
        id: 'vitamin-injections',
        title: 'Vitamin Injections',
        description: 'Boost your health and appearance with vitamin therapy',
        image: 'https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?q=80&w=1000',
      },
      {
        id: 'fat-dissolving',
        title: 'Fat Dissolving',
        description: 'Non-surgical fat reduction treatments',
        image: 'https://images.unsplash.com/photo-1591085686350-798c0f9faa7f?q=80&w=1000',
      },
      {
        id: 'threads',
        title: 'Pod and Cog Threads',
        description: 'Advanced thread lifting techniques',
        image: 'https://images.unsplash.com/photo-1532453288509-eb59ece73082?q=80&w=1000',
      },
      {
        id: 'skin-boosters',
        title: 'Skin Boosters',
        description: 'Deep hydration and skin rejuvenation',
        image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=1000',
      },
      {
        id: 'polynucleotides',
        title: 'Polynucleotides',
        description: 'Advanced skin rejuvenation treatments',
        image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=1000',
      },
      {
        id: 'apotos-threads',
        title: 'APOTOS Threads',
        description: 'Premium thread lifting for natural results',
        image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=1000',
      },
      {
        id: 'exosome-boosters',
        title: 'Exosome Boosters',
        description: 'Cutting-edge skin rejuvenation',
        image: 'https://images.unsplash.com/photo-1629196914696-39fa40771213?q=80&w=1000',
      }
    ]
  },
  {
    id: 'non-surgical',
    name: 'Non-Surgical',
    description: 'Effective treatments with no downtime',
    services: [
      {
        id: 'facial-sculpting',
        title: 'Facial Sculpting',
        description: 'Non-surgical facial contouring and definition',
        image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=1000',
      },
      {
        id: 'body-sculpting',
        title: 'Body Sculpting',
        description: 'Non-invasive body contouring treatments',
        image: '/lovable-uploads/f9ad279c-c69d-4621-992f-ceb06912b33a.png',
      },
      {
        id: 'booty-lifts',
        title: 'XXXL Booty Lifts',
        description: 'Non-surgical enhancement for your curves',
        image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=1000',
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
    services: [
      {
        id: 'lashes',
        title: 'Lashes',
        description: 'Beautiful lash extensions and lifting',
        image: 'https://images.unsplash.com/photo-1533392151650-269f96231f65?q=80&w=1000',
      },
      {
        id: 'waxing',
        title: 'Waxing',
        description: 'Professional hair removal services',
        image: 'https://images.unsplash.com/photo-1560869755-d5e35a6d58bd?q=80&w=1000',
      },
      {
        id: 'eyebrows',
        title: 'Eyebrows',
        description: 'Shaping, tinting, and lamination services',
        image: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=1000',
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
        image: 'https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?q=80&w=1000',
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
    services: [
      {
        id: 'aesthetics-course',
        title: 'Start from Scratch Aesthetics Course',
        description: 'Complete training for beginners in aesthetics',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1000',
      },
      {
        id: 'anatomy',
        title: 'Anatomy and Physiology Level 4',
        description: 'Essential knowledge for aesthetic practitioners',
        image: 'https://images.unsplash.com/photo-1564410267841-915d8a4530ea?q=80&w=1000',
      },
      {
        id: 'anti-wrinkle',
        title: 'Anti Wrinkle Training',
        description: 'Learn anti-wrinkle injection techniques',
        image: 'https://images.unsplash.com/photo-1581302113604-855669885709?q=80&w=1000',
      },
      {
        id: 'dermal-filler-training',
        title: 'Dermal Filler Training',
        description: 'Comprehensive dermal filler application training',
        image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=1000',
      },
      {
        id: 'advanced-anti-wrinkle',
        title: 'Advanced Anti Wrinkle',
        description: 'Advanced techniques for anti-wrinkle treatments',
        image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1000',
      },
      {
        id: 'advanced-dermal-filler-training',
        title: 'Advanced Dermal Filler',
        description: 'Master dermal filler techniques',
        image: 'https://images.unsplash.com/photo-1635368648861-ed533fd34ae9?q=80&w=1000',
      },
      {
        id: 'canula-training',
        title: 'Canula Training',
        description: 'Safe and effective canula techniques',
        image: 'https://images.unsplash.com/photo-1576669801145-ff88e318bdba?q=80&w=1000',
      },
      {
        id: 'masterclasses',
        title: 'Master Classes',
        description: 'Specialized training in advanced procedures',
        image: 'https://images.unsplash.com/photo-1560869755-d5e35a6d58bd?q=80&w=1000',
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

// The booking URL for all services
const BOOKING_URL = 'https://www.fresha.com/a/transformed-hereford-38-widemarsh-st-gh3qgstr/all-offer?menu=true&pId=599120&fbclid=PAY2xjawJXeAJleHRuA2FlbQIxMAABpvlpT-VQQGYbYv93RnUCRlhDR9gHhghMheKxtpaUQT5xzr4OyeadmXfrtQ_aem_PwxPudY-AdMqXQ9vBM2JDw';

interface ServicesListProps {
  categoryId?: string; // Optional: to filter and show only specific category
}

const ServicesList: React.FC<ServicesListProps> = ({ categoryId }) => {
  // Filter categories if categoryId is provided
  const categories = categoryId 
    ? serviceCategories.filter(cat => cat.id === categoryId) 
    : serviceCategories;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="py-8">
      {categories.map((category) => (
        <motion.div
          key={category.id}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="mb-16"
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-serif text-salon-pink-700 mb-2">{category.name}</h2>
              {category.description && (
                <p className="text-gray-600 max-w-2xl mx-auto">{category.description}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.services.map((service) => (
                <motion.div
                  key={service.id}
                  variants={itemVariants}
                  className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col"
                >
                  {service.image && (
                    <div className="relative h-40 overflow-hidden">
                      <img 
                        src={service.image} 
                        alt={service.title} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                    </div>
                  )}
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-xl font-serif text-salon-pink-700 mb-2">{service.title}</h3>
                    <p className="text-gray-600 mb-4 flex-grow">{service.description}</p>
                    
                    {service.services && (
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Includes:</h4>
                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                          {service.services.map((subService, idx) => (
                            <li key={idx}>{subService}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {service.price && (
                      <div className="mb-4">
                        <span className="text-salon-pink-600 font-bold">{service.price}</span>
                      </div>
                    )}
                    
                    <a 
                      href={BOOKING_URL} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn-primary text-center mt-auto"
                    >
                      BOOK NOW
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ServicesList;
