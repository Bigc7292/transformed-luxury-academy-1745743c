
import React from 'react';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { AwardType } from './types';

interface AwardCarouselProps {
  awards: AwardType[];
}

const AwardCarousel: React.FC<AwardCarouselProps> = ({ awards }) => {
  return (
    <section className="mb-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-salon-pink-800 mb-3">
          Awards & Recognition
        </h2>
        <p className="text-lg text-gray-600">
          Celebrating excellence and innovation in aesthetics and beauty
        </p>
      </div>
      
      <Carousel className="w-full max-w-5xl mx-auto">
        <CarouselContent>
          {awards.map((award) => (
            <CarouselItem key={award.id} className="md:basis-1/2 lg:basis-1/3">
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.5,
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }}
                className="h-full p-1"
              >
                <Card className="h-full bg-white hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-salon-pink-100 hover:border-salon-pink-300">
                  <div className="relative pt-[100%] overflow-hidden bg-black">
                    <img 
                      src={award.image} 
                      alt={award.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-5 text-center">
                    <div className="flex items-center justify-center mb-3">
                      <Award className="h-5 w-5 text-salon-pink-500 mr-2" />
                      <h3 className="font-serif font-medium text-lg text-salon-pink-800">{award.title}</h3>
                    </div>
                    <p className="text-gray-600">{award.organization}</p>
                  </CardContent>
                </Card>
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute -left-4 top-1/2 -translate-y-1/2">
          <CarouselPrevious className="h-10 w-10 bg-white/80 border-salon-pink-200 text-salon-pink-700 hover:bg-salon-pink-100" />
        </div>
        <div className="absolute -right-4 top-1/2 -translate-y-1/2">
          <CarouselNext className="h-10 w-10 bg-white/80 border-salon-pink-200 text-salon-pink-700 hover:bg-salon-pink-100" />
        </div>
      </Carousel>
    </section>
  );
};

export default AwardCarousel;
