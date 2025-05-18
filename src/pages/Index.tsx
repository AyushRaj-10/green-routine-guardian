import { useState, useEffect } from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Calculator from '@/components/Calculator';
import WaterUsageForm from '@/components/WaterUsageForm';
import Testimonials from '@/components/Testimonials';
import Sponsors from '@/components/Sponsors';
import Reminders from '@/components/Reminders';
import Challenges from '@/components/Challenges';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import { initSmoothScroll, initScrollAnimations } from '@/utils/scrollUtils';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TreeDeciduous, HandHeart, Leaf, ParkingCircle } from 'lucide-react';

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [userCount, setUserCount] = useState(1248);

  useEffect(() => {
    // Simulate a loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading) {
      // Initialize smooth scrolling
      const lenis = initSmoothScroll();
      
      // Initialize scroll animations
      initScrollAnimations();
      
      return () => {
        lenis.destroy();
      };
    }
  }, [loading]);

  // Animate user count
  useEffect(() => {
    if (!loading) {
      const interval = setInterval(() => {
        setUserCount(prev => prev + Math.floor(Math.random() * 3) + 1);
      }, 8000);
      
      return () => clearInterval(interval);
    }
  }, [loading]);

  // Challenge of the month data
  const challengesOfTheMonth = [
    { 
      id: 1, 
      title: 'Plant a Tree',
      description: 'Plant a tree in your community and share a photo of your contribution.',
      points: 250,
      image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=800&q=80',
      icon: <TreeDeciduous size={24} className="text-green-600" />,
      difficulty: 'Medium',
      participants: 287
    },
    { 
      id: 2, 
      title: 'Clean a Park',
      description: 'Spend an hour cleaning a local park or beach with friends or family.',
      points: 200,
      image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=800&q=80',
      icon: <ParkingCircle size={24} className="text-green-600" />,
      difficulty: 'Easy',
      participants: 342
    },
    { 
      id: 3, 
      title: 'Help at a Local Shelter',
      description: 'Volunteer at a local animal shelter or old age home for a day.',
      points: 300,
      image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=800&q=80',
      icon: <HandHeart size={24} className="text-green-600" />,
      difficulty: 'Hard',
      participants: 156
    }
  ];

  if (loading) {
    return <LoadingScreen onLoadingComplete={() => setLoading(false)} />;
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />

      {/* User Count Section */}
      <section className="py-16 bg-green-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Join Our Growing Community</h2>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.p 
                className="text-4xl md:text-5xl font-bold text-white mb-2"
                key={userCount}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                {userCount.toLocaleString()}
              </motion.p>
              <p className="text-lg text-green-100">Active Users</p>
            </motion.div>
            
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="text-4xl md:text-5xl font-bold text-white mb-2">3,540</p>
              <p className="text-lg text-green-100">Trees Planted</p>
            </motion.div>
            
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <p className="text-4xl md:text-5xl font-bold text-white mb-2">8.2M</p>
              <p className="text-lg text-green-100">Liters of Water Saved</p>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="py-10 bg-green-50 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Explore Our Tools</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-green-500 hover:bg-green-600 hover:scale-105 transition-transform" asChild>
              <Link to="/calculator">Water & Carbon Calculator</Link>
            </Button>
            <Button size="lg" className="bg-green-500 hover:bg-green-600 hover:scale-105 transition-transform" asChild>
              <Link to="/reminders">Set Eco Reminders</Link>
            </Button>
            <Button size="lg" className="bg-green-500 hover:bg-green-600 hover:scale-105 transition-transform" asChild>
              <Link to="/challenges">Join Challenges</Link>
            </Button>
          </div>
        </div>
      </div>

      <WaterUsageForm />
      <Calculator />
      <Reminders />
      <Challenges />
      
      {/* Story & Founders Preview Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="order-2 lg:order-1"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold mb-4">Our Journey</h2>
              <p className="text-gray-600 mb-6">
                GreenRoutine started as a college project by four passionate students at Dayananda Sagar College of Engineering.
                What began as an idea to promote sustainable habits has grown into a platform used by thousands to make
                positive environmental impacts every day.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-green-500 hover:bg-green-600" asChild>
                  <Link to="/story">Read Our Story</Link>
                </Button>
                <Button variant="outline" className="border-green-500 text-green-500 hover:bg-green-50" asChild>
                  <Link to="/founders">Meet the Founders</Link>
                </Button>
              </div>
            </motion.div>
            <motion.div 
              className="order-1 lg:order-2"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=800" 
                alt="GreenRoutine Team" 
                className="rounded-lg shadow-xl w-full h-64 object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>
      
      <FAQ />
      
      {/* Challenge of the Month Section (replacing leaderboard) */}
      <section id="challenge-of-month" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Challenge of the Month</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join our monthly eco-challenges and earn points while making a positive impact on the environment
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {challengesOfTheMonth.map((challenge) => (
              <motion.div
                key={challenge.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={challenge.image}
                    alt={challenge.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 p-1 px-3 rounded-full text-sm font-medium">
                    {challenge.points} points
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-green-100 p-2 rounded-full mr-3">
                      {challenge.icon}
                    </div>
                    <h3 className="font-bold text-xl">{challenge.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{challenge.description}</p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-gray-500">{challenge.participants} participants</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      challenge.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                      challenge.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {challenge.difficulty}
                    </span>
                  </div>
                  <Button className="w-full bg-green-600 hover:bg-green-700" asChild>
                    <Link to="/challenges">Join Challenge</Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-8">
            <Button variant="outline" className="border-green-500 text-green-600 hover:bg-green-50" asChild>
              <Link to="/challenges">View All Challenges</Link>
            </Button>
          </div>
        </div>
      </section>
      
      <Testimonials />
      <Sponsors />
      <Footer />
    </div>
  );
};

export default Index;
