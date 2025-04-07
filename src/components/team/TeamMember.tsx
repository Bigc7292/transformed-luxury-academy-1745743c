
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '../ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { Drawer, DrawerContent, DrawerTrigger } from '../ui/drawer';

interface TeamMemberProps {
  member: {
    id: number;
    name: string;
    role: string;
    image: string;
    bio: string;
    specialties: string[];
  };
}

const TeamMember: React.FC<TeamMemberProps> = ({ member }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Card 
          className="overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative overflow-hidden">
            <div className="h-80 overflow-hidden">
              <img 
                src={member.image} 
                alt={member.name} 
                className={`w-full h-full object-cover transition-transform duration-500 ${
                  isHovered ? 'scale-110' : 'scale-100'
                }`}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-90"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 className="text-2xl font-serif font-medium mb-1">{member.name}</h3>
              <p className="text-salon-pink-200 text-lg">{member.role}</p>
            </div>
          </div>
          <CardContent className="p-6 bg-white">
            <p className="text-gray-700 line-clamp-3">{member.bio}</p>
            <div className="mt-4">
              <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">Specialties</p>
              <div className="flex flex-wrap gap-2">
                {member.specialties.slice(0, 3).map((specialty, index) => (
                  <span 
                    key={index} 
                    className="bg-salon-pink-100 text-salon-pink-700 text-xs px-2 py-1 rounded-full"
                  >
                    {specialty}
                  </span>
                ))}
                {member.specialties.length > 3 && (
                  <span className="bg-salon-pink-100 text-salon-pink-700 text-xs px-2 py-1 rounded-full">
                    +{member.specialties.length - 3}
                  </span>
                )}
              </div>
            </div>
            <div className="mt-5 pt-5 border-t border-gray-100">
              <p className="text-salon-pink-500 text-sm font-medium">
                Click to learn more
              </p>
            </div>
          </CardContent>
        </Card>
      </DrawerTrigger>
      <DrawerContent className="max-w-3xl mx-auto">
        <div className="p-6">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="md:w-1/3">
              <Avatar className="w-32 h-32 md:w-48 md:h-48 rounded-lg">
                <AvatarImage src={member.image} alt={member.name} className="object-cover" />
                <AvatarFallback className="text-2xl bg-salon-pink-200 text-salon-pink-700">
                  {getInitials(member.name)}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="md:w-2/3">
              <h2 className="text-3xl font-serif font-medium text-salon-pink-800 mb-2">
                {member.name}
              </h2>
              <p className="text-lg text-salon-pink-500 mb-4">{member.role}</p>
              <p className="text-gray-700 mb-6">{member.bio}</p>
              
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-3">Specialties</h3>
                <div className="flex flex-wrap gap-2">
                  {member.specialties.map((specialty, index) => (
                    <span 
                      key={index} 
                      className="bg-salon-pink-100 text-salon-pink-700 px-3 py-1 rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mt-8">
                <a 
                  href="/booking" 
                  className="inline-block bg-salon-pink-500 text-white px-5 py-2 rounded-full hover:bg-salon-pink-600 transition-colors"
                >
                  Book with {member.name}
                </a>
              </div>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default TeamMember;
