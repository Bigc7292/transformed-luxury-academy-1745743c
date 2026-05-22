
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { CourseType } from './types';

interface TrainingCoursesProps {
  courses: CourseType[];
}

const TrainingCourses: React.FC<TrainingCoursesProps> = ({ courses }) => {
  return (
    <section className="mb-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-gold-800 mb-3">
          Exclusive Training Courses
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Take your career to the next level with personalized training from an industry expert. 
          Kayla provides one-to-one courses designed to give you the skills and confidence needed to excel.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {courses.map((course) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, x: course.id % 2 === 0 ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="overflow-hidden border-2 border-gold-200 hover:border-gold-400 transition-all duration-300 h-full">
              <div className="relative pt-[80%] overflow-hidden bg-gold-100">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="font-serif text-xl font-bold text-gold-700 mb-3">{course.title}</h3>
                <p className="text-gray-700 mb-5">{course.description}</p>
                <div className="flex flex-col sm:flex-row items-center justify-between mt-auto pt-4 border-t border-gold-100">
                  <span className="text-gold-600 font-medium mb-3 sm:mb-0">CPD Accredited</span>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    href={`tel:${course.contact}`}
                    className="px-6 py-2 bg-gold-500 text-white rounded-full hover:bg-gold-600 transition-colors"
                  >
                    Book Now: {course.contact}
                  </motion.a>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TrainingCourses;
