
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
import Footer from '@/components/Footer';
import { initSmoothScroll, initScrollAnimations } from '@/utils/scrollUtils';

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
      <WaterUsageForm />
      <Calculator />
      <Reminders />
      <Challenges />
      <Testimonials />
      <Sponsors />
      <Footer />
    </div>
  );
};

export default Index;
