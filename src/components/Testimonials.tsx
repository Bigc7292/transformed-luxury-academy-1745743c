
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Lip Filler Client",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop",
    quote: "My experience at Transformed Academy was exceptional. The lip filler treatment gave me the perfect amount of volume, looking completely natural. The staff was professional and made me feel comfortable throughout the process.",
    rating: 5
  },
  {
    id: 2,
    name: "Emily Roberts",
    role: "Botox Client",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2076&auto=format&fit=crop",
    quote: "I was nervous about getting Botox for the first time, but the team at Transformed Academy put me at ease. The results are amazing and subtle - exactly what I wanted. I'll definitely be returning for my touch-ups.",
    rating: 5
  },
  {
    id: 3,
    name: "Jennifer Lee",
    role: "Dermal Filler Client",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2076&auto=format&fit=crop",
    quote: "The dermal filler treatment I received took years off my appearance. The practitioner was knowledgeable and took the time to understand my goals. The clinic is beautiful and I felt pampered throughout my visit.",
    rating: 4
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-salon-pink-400 font-medium">Testimonials</span>
          <h2 className="text-3xl md:text-4xl font-serif text-salon-pink-800 mt-2">What Our Clients Say</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Hear from our satisfied clients about their experiences and transformative results at our salon.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute top-1/4 -left-8 w-40 h-40 bg-salon-pink-100 rounded-full blur-3xl opacity-30"></div>
          <div className="absolute bottom-1/3 -right-8 w-40 h-40 bg-salon-beige-100 rounded-full blur-3xl opacity-30"></div>
          
          <div className="relative">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ 
                  opacity: index === activeIndex ? 1 : 0,
                  scale: index === activeIndex ? 1 : 0.9,
                  x: `${(index - activeIndex) * 100}%`
                }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex flex-col items-center"
                style={{ display: index === activeIndex ? 'flex' : 'none' }}
              >
                <div className="mb-8 w-20 h-20 rounded-full overflow-hidden border-4 border-salon-pink-100">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                    />
                  ))}
                </div>
                
                <blockquote className="text-xl text-center text-gray-600 italic mb-6">
                  "{testimonial.quote}"
                </blockquote>
                
                <div className="text-center">
                  <p className="text-lg font-medium text-salon-pink-700">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="flex justify-center mt-16 space-x-4">
            <button 
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full bg-salon-pink-100 hover:bg-salon-pink-200 flex items-center justify-center transition-colors"
              aria-label="Previous testimonial"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 19L8 12L15 5" stroke="#FF6499" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${index === activeIndex ? 'bg-salon-pink-500' : 'bg-salon-pink-200'}`}
                  aria-label={`Go to testimonial ${index + 1}`}
                ></button>
              ))}
            </div>
            
            <button 
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full bg-salon-pink-100 hover:bg-salon-pink-200 flex items-center justify-center transition-colors"
              aria-label="Next testimonial"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 5L16 12L9 19" stroke="#FF6499" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
