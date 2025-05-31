
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import LoadingScreen from '@/components/LoadingScreen';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Calculator from '@/components/Calculator';
import WaterUsageForm from '@/components/WaterUsageForm';
import Challenges from '@/components/Challenges';
import Reminders from '@/components/Reminders';
import FAQ from '@/components/FAQ';
import Testimonials from '@/components/Testimonials';
import { Story } from '@/components/Story';
import Footer from '@/components/Footer';
import { initSmoothScroll, initScrollAnimations } from '@/utils/scrollUtils';

const Index = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasLoadedBefore, setHasLoadedBefore] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if user has seen loading screen before in this session
    const hasSeenLoading = sessionStorage.getItem('hasSeenLoading');
    
    if (!hasSeenLoading) {
      setIsLoading(true);
      setHasLoadedBefore(false);
    } else {
      setHasLoadedBefore(true);
      // Restore scroll position if returning to home page
      const savedScrollPosition = sessionStorage.getItem('homeScrollPosition');
      if (savedScrollPosition) {
        setTimeout(() => {
          window.scrollTo(0, parseInt(savedScrollPosition));
        }, 100);
      }
    }
  }, []);

  useEffect(() => {
    // Save scroll position when user leaves the page
    const handleBeforeUnload = () => {
      if (location.pathname === '/') {
        sessionStorage.setItem('homeScrollPosition', window.scrollY.toString());
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden && location.pathname === '/') {
        sessionStorage.setItem('homeScrollPosition', window.scrollY.toString());
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [location.pathname]);

  useEffect(() => {
    if (!isLoading) {
      // Initialize smooth scrolling
      const lenis = initSmoothScroll();
      
      // Initialize scroll animations
      initScrollAnimations();
      
      return () => {
        lenis.destroy();
      };
    }
  }, [isLoading]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    setHasLoadedBefore(true);
    // Mark that user has seen loading screen in this session
    sessionStorage.setItem('hasSeenLoading', 'true');
  };

  const handleReadMore = () => {
    // Save current scroll position before navigating
    sessionStorage.setItem('homeScrollPosition', window.scrollY.toString());
    navigate('/community');
  };

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero onReadMore={handleReadMore} />
        <Features />
        <Calculator />
        <WaterUsageForm />
        <Challenges />
        <Reminders />
        <FAQ />
        <Testimonials />
        <section id="story" className="section bg-green-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Journey</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                The story of GreenRoutine: From college project to sustainable impact
              </p>
            </div>
            <Story />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
