
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
  services?: string[]; // Add this property to the Service type
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
        image: '/lovable-uploads/b7c4f4b3-48c7-4a65-a775-75b4d5c3b8a1.png',
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
        image: '/lovable-uploads/8dbdafb8-9a7a-4826-bfaa-7873e0ef9cdb.png',
      },
      {
        id: 'lip-filler',
        title: 'Advanced Lip Filler',
        description: 'Expert lip enhancement for the perfect pout',
        image: '/lovable-uploads/b92ba5ab-62d8-4c08-9782-98c1a4819fb6.png',
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
        image: '/lovable-uploads/fa442b87-5232-499f-8164-96640479614e.png',
      },
      {
        id: 'vitamin-injections',
        title: 'Vitamin Injections',
        description: 'Boost your health and appearance with vitamin therapy',
        image: '/lovable-uploads/086220f4-edf3-4c4f-9b99-3299d315e475.png',
      },
      {
        id: 'fat-dissolving',
        title: 'Fat Dissolving',
        description: 'Non-surgical fat reduction treatments',
        image: '/lovable-uploads/fb86cf7b-83f5-4eb3-8f06-100fa87d3fef.png',
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
        image: '/lovable-uploads/0889c7e0-8ea1-4f31-822f-69f5771c5d0b.png',
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
        image: '/lovable-uploads/76e6d989-51c6-4d02-8fb5-1fac3a120187.png',
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
        image: '/lovable-uploads/8e9cb4a4-6bbf-42d8-84f5-001b3dd73d83.png',
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
        image: '/lovable-uploads/b18db363-0029-46b9-b20f-38c961d06bd1.png',
      },
      {
        id: 'body-massage',
        title: 'Body Massage',
        description: 'Relaxing and therapeutic massages',
        image: '/lovable-uploads/5b01d43a-d438-4f51-a6e1-e7c04d416661.png',
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
        image: '/lovable-uploads/1f13befe-d934-4e16-8769-6ab71143ae48.png',
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
        image: '/lovable-uploads/cd40ae91-79e0-41fe-a857-a7ff0bbe5a3a.png',
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
        image: '/lovable-uploads/df253e17-6488-4b1c-bd69-2c4f58d238c6.png',
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
