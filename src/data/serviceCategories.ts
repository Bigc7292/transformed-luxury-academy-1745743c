
// Define the service category structure
export type ServiceCategory = {
  id: string;
  name: string;
  description?: string;
};

// Define the service structure
export type Service = {
  id: string;
  title: string;
  description: string;
  image?: string;
  additionalImages?: string[];
  price?: string;
  bookingUrl?: string;
  services?: string[];
  contentItemId?: string;
};

// All service categories
export const serviceCategories: ServiceCategory[] = [
  {
    id: 'hair',
    name: 'Hair',
    description: 'Premium hair services for all your styling needs'
  },
  {
    id: 'aesthetics',
    name: 'Aesthetics',
    description: 'Advanced aesthetic procedures for natural enhancement'
  },
  {
    id: 'non-surgical',
    name: 'Non-Surgical',
    description: 'Effective treatments with no downtime'
  },
  {
    id: 'beauty-treatments',
    name: 'Beauty Treatments',
    description: 'Complete beauty services for a polished look'
  },
  {
    id: 'training',
    name: 'Training Services',
    description: 'Professional training for beauty specialists'
  }
];

// The booking URL for all services
export const BOOKING_URL = 'https://www.fresha.com/a/transformed-hereford-38-widemarsh-st-gh3qgstr/all-offer?menu=true&pId=599120&fbclid=PAY2xjawJXeAJleHRuA2FlbQIxMAABpvlpT-VQQGYbYv93RnUCRlhDR9gHhghMheKxtpaUQT5xzr4OyeadmXfrtQ_aem_PwxPudY-AdMqXQ9vBM2JDw';
