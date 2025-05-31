
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import TreeGrowthAnimation from './TreeGrowthAnimation';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  onReadMore?: () => void;
}

const Hero = ({ onReadMore }: HeroProps) => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    // Animate hero content
    const tl = gsap.timeline();
    
    tl.fromTo('.hero-title', 
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power2.out' }
    )
    .fromTo('.hero-subtitle', 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
      '-=0.5'
    )
    .fromTo('.hero-buttons', 
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
      '-=0.3'
    );

    // Parallax effect for the hero section
    gsap.set(hero, { perspective: 1000 });
    
    ScrollTrigger.create({
      trigger: hero,
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
      onUpdate: (self) => {
        const y = self.progress * 100;
        gsap.to('.hero-content', { y: y, ease: 'none', duration: 0.3 });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={heroRef} className="hero relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-green-900 via-green-800 to-blue-900">
      {/* Background Animation */}
      <div className="absolute inset-0 z-0">
        <TreeGrowthAnimation />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10"></div>

      {/* Content */}
      <div className="hero-content relative z-20 container mx-auto px-4 text-center text-white">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h1 className="hero-title text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Build Your
            <span className="block text-green-400">Green Routine</span>
          </h1>
          
          <p className="hero-subtitle text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            Transform your daily habits into powerful environmental actions. 
            Track your impact, join challenges, and be part of the solution.
          </p>
          
          <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg font-semibold transition-all hover:scale-105">
              Start Your Journey
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              onClick={onReadMore}
              className="border-2 border-white text-white hover:bg-white hover:text-green-900 px-8 py-4 text-lg font-semibold transition-all hover:scale-105"
            >
              Read More
            </Button>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
          </div>
        </motion.div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 z-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-green-400 rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
