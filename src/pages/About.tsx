
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { initSmoothScroll, initScrollAnimations } from '@/utils/scrollUtils';

const About = () => {
  useEffect(() => {
    // Initialize smooth scrolling
    const lenis = initSmoothScroll();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    return () => {
      lenis.destroy();
    };
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
  };

  const teamMembers = [
    {
      name: "Emma Johnson",
      role: "Founder & CEO",
      image: "https://randomuser.me/api/portraits/women/23.jpg",
      bio: "Environmental scientist with a passion for making sustainability accessible to everyone."
    },
    {
      name: "Michael Chen",
      role: "Head of Technology",
      image: "https://randomuser.me/api/portraits/men/54.jpg",
      bio: "Software engineer focused on creating tools that help people reduce their carbon footprint."
    },
    {
      name: "Sarah Williams",
      role: "Environmental Specialist",
      image: "https://randomuser.me/api/portraits/women/45.jpg",
      bio: "PhD in Environmental Science with expertise in sustainable urban planning."
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-green-900 to-green-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Mission</h1>
              <p className="text-xl max-w-3xl mx-auto mb-8">
                At GreenRoutine, we're dedicated to helping individuals build sustainable habits 
                that collectively create a significant positive impact on our environment.
              </p>
              <div className="max-w-xs mx-auto">
                <Button className="w-full bg-white text-green-700 hover:bg-green-100">Join Our Community</Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <motion.div 
              className="grid md:grid-cols-2 gap-12 items-center"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div variants={itemVariants}>
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    GreenRoutine was founded in 2023 with a simple idea: what if sustainable living was as easy as checking your phone?
                  </p>
                  <p>
                    Our founder, Emma Johnson, noticed that while many people wanted to live more sustainably, 
                    they struggled to develop and maintain eco-friendly habits. As an environmental scientist, 
                    she knew that consistent small actions could lead to significant positive change.
                  </p>
                  <p>
                    GreenRoutine was born from this realization - a platform that makes sustainable living accessible, 
                    trackable, and rewarding. Today, our community includes thousands of individuals around the world who 
                    are making a difference one small habit at a time.
                  </p>
                </div>
              </motion.div>
              <motion.div variants={itemVariants} className="rounded-lg overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
                  alt="Team working together"
                  className="w-full h-auto"
                />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Impact Section */}
        <section className="py-16 md:py-24 bg-green-50">
          <div className="container mx-auto px-4 text-center">
            <motion.h2 
              className="text-3xl font-bold mb-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Our Impact
            </motion.h2>
            
            <motion.div 
              className="grid md:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div variants={itemVariants} className="bg-white rounded-lg p-8 shadow-md">
                <div className="text-green-500 text-5xl font-bold mb-4">5K+</div>
                <h3 className="text-xl font-semibold mb-2">Active Users</h3>
                <p className="text-gray-600">Building sustainable habits around the world</p>
              </motion.div>
              
              <motion.div variants={itemVariants} className="bg-white rounded-lg p-8 shadow-md">
                <div className="text-green-500 text-5xl font-bold mb-4">10K+</div>
                <h3 className="text-xl font-semibold mb-2">Trees Planted</h3>
                <p className="text-gray-600">Through our community challenges and initiatives</p>
              </motion.div>
              
              <motion.div variants={itemVariants} className="bg-white rounded-lg p-8 shadow-md">
                <div className="text-green-500 text-5xl font-bold mb-4">50%</div>
                <h3 className="text-xl font-semibold mb-2">Carbon Reduction</h3>
                <p className="text-gray-600">Average carbon footprint reduction among active users</p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <motion.h2 
              className="text-3xl font-bold mb-12 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Meet Our Team
            </motion.h2>
            
            <motion.div 
              className="grid md:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {teamMembers.map((member, index) => (
                <motion.div 
                  key={index} 
                  variants={itemVariants} 
                  className="bg-white rounded-lg overflow-hidden shadow-md"
                >
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-64 object-cover object-center"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-green-600 mb-4">{member.role}</p>
                    <p className="text-gray-600">{member.bio}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Join Us CTA */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-green-600 to-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Us in Making a Difference</h2>
              <p className="text-xl mb-8">
                Together, we can create a more sustainable future through small, consistent actions.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button className="bg-white text-green-700 hover:bg-green-100">Get Started</Button>
                <Button variant="outline" className="border-white text-white hover:bg-white/10">Learn More</Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
