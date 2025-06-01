
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Lightbulb } from 'lucide-react';

const StoryGlimpse = () => {
  return (
    <section id="story-glimpse" className="section bg-gradient-to-br from-green-100 to-blue-100">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Journey</h2>
            <p className="text-xl text-gray-600 mb-6">
              From a college project to a platform that's helping thousands make a positive environmental impact.
            </p>
            <p className="text-gray-600 mb-8">
              Four passionate 18-year-old Computer Science students from Dayananda Sagar College of Engineering 
              turned their vision of accessible sustainability into reality. What started in April 2025 as an 
              academic project has grown into a community-driven platform making real change.
            </p>
            <Button asChild className="bg-green-600 hover:bg-green-700">
              <Link to="/story">Read Our Full Story</Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 gap-6"
          >
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="flex items-center mb-4">
                <Lightbulb className="h-8 w-8 text-yellow-500 mr-3" />
                <h3 className="text-xl font-bold">The Idea</h3>
              </div>
              <p className="text-gray-600">
                Born from the desire to make sustainability accessible to everyone, not just environmental experts.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="flex items-center mb-4">
                <Users className="h-8 w-8 text-blue-500 mr-3" />
                <h3 className="text-xl font-bold">Growing Impact</h3>
              </div>
              <p className="text-gray-600">
                From 4 students to thousands of users worldwide, all working together for a greener future.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="flex items-center mb-4">
                <BookOpen className="h-8 w-8 text-green-500 mr-3" />
                <h3 className="text-xl font-bold">Continuous Innovation</h3>
              </div>
              <p className="text-gray-600">
                Constantly evolving with new features, challenges, and ways to make environmental action engaging.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StoryGlimpse;
