
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
      
      <section id="leaderboard-preview" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Community Leaderboard</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join our community of eco-warriors and track your progress on the leaderboard
          </p>
          
          {/* Leaderboard preview */}
          <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <span className="font-bold text-lg">Top Contributors</span>
              <Button asChild>
                <Link to="/dashboard">View Full Leaderboard</Link>
              </Button>
            </div>
            
            <div className="p-4 space-y-4">
              {[1, 2, 3].map(index => (
                <div key={index} className="flex items-center p-2 rounded-lg hover:bg-gray-50">
                  <div className="mr-3 font-bold text-lg text-gray-500 w-6 text-center">
                    {index}
                  </div>
                  <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                    <img 
                      src={`https://randomuser.me/api/portraits/${index === 1 ? 'men/32' : 'women/' + (32 + index)}.jpg`} 
                      alt="User avatar"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="font-medium">
                        {index === 1 ? 'Ayush R.' : index === 2 ? 'Arpita P.' : 'Astuti S.'}
                      </span>
                      <span className="font-bold text-green-500">{3500 - (index - 1) * 200}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-gray-50 p-4 text-center">
              <Button variant="outline" asChild>
                <Link to="/dashboard">Join the Leaderboard</Link>
              </Button>
            </div>
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
