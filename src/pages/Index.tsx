
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

const Index = () => {
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <LoadingScreen onLoadingComplete={() => setLoading(false)} />;
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />

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
