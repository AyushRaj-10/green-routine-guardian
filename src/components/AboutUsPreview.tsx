
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { founderData } from '@/components/Founders';
import { Target, Users, Lightbulb, Heart } from 'lucide-react';

const AboutUsPreview = () => {
  const values = [
    {
      icon: Target,
      title: "Mission Driven",
      description: "Making sustainability accessible and engaging for everyone"
    },
    {
      icon: Users,
      title: "Community First",
      description: "Building connections that create lasting environmental impact"
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Using technology to solve real environmental challenges"
    },
    {
      icon: Heart,
      title: "Passion",
      description: "Genuine care for our planet and future generations"
    }
  ];

  return (
    <section id="about-preview" className="section bg-white">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 fadeInUp">About GreenRoutine</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto fadeInUp">
            Four passionate students on a mission to make sustainable living simple, engaging, and impactful
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-6">Our Story</h3>
            <p className="text-gray-600 mb-6">
              GreenRoutine was born in April 2025 as a college project by four 18-year-old Computer Science 
              students from Dayananda Sagar College of Engineering. What started as an academic assignment 
              quickly evolved into a platform with real impact.
            </p>
            <p className="text-gray-600 mb-6">
              We believe that small, consistent actions can create massive environmental change. Our platform 
              makes it easy to track your impact, join challenges, and connect with a community of 
              like-minded individuals working toward a sustainable future.
            </p>
            <Button asChild>
              <Link to="/story">Read Our Full Story</Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-4"
          >
            {founderData.slice(0, 4).map((founder, index) => (
              <div key={index} className="bg-green-50 rounded-lg p-4 text-center">
                <div className="w-16 h-16 mx-auto mb-3 rounded-full overflow-hidden">
                  <img 
                    src={founder.image} 
                    alt={founder.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <h4 className="font-semibold text-sm mb-1">{founder.name}</h4>
                <p className="text-xs text-gray-600">{founder.role}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center p-6 rounded-lg hover:bg-green-50 transition-colors"
            >
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <value.icon className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="font-semibold mb-2">{value.title}</h4>
              <p className="text-sm text-gray-600">{value.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" asChild>
            <Link to="/about">Learn More About Us</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AboutUsPreview;
