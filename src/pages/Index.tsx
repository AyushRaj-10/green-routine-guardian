
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingScreen from '@/components/LoadingScreen';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';
import { initSmoothScroll, initScrollAnimations } from '@/utils/scrollUtils';

const Index = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasLoadedBefore, setHasLoadedBefore] = useState<boolean>(false);
  const navigate = useNavigate();

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
      sessionStorage.setItem('homeScrollPosition', window.scrollY.toString());
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  // Reset scroll to top when navigating to other pages
  useEffect(() => {
    const handleNavigation = () => {
      if (window.location.pathname !== '/') {
        window.scrollTo(0, 0);
      }
    };

    // Listen for route changes
    window.addEventListener('popstate', handleNavigation);
    
    return () => {
      window.removeEventListener('popstate', handleNavigation);
    };
  }, []);

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
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
