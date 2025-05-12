
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import GrowingTree from './TreeGrowthAnimation';

const Hero = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
      0.5
    );

    tl.fromTo(
      subtitleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
      0.8
    );

    tl.fromTo(
      ctaRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
      1.1
    );

    tl.fromTo(
      quoteRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: 'power3.out' },
      1.4
    );
  }, []);

  // Inspirational quotes
  const quotes = [
    "\"The greatest threat to our planet is the belief that someone else will save it.\" - Robert Swan",
    "\"We do not inherit the earth from our ancestors, we borrow it from our children.\" - Native American Proverb",
    "\"The Earth is what we all have in common.\" - Wendell Berry",
    "\"Nature does not hurry, yet everything is accomplished.\" - Lao Tzu",
    "\"We won't have a society if we destroy the environment.\" - Margaret Mead"
  ];
  
  // Select random quote
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Static Tree Background instead of 3D animation */}
      <div className="absolute inset-0 z-0">
        <GrowingTree />
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 z-10 text-center">
        <h1 
          ref={titleRef}
          className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg"
        >
          Create <span className="text-green-400">Sustainable</span> Habits
        </h1>
        <p 
          ref={subtitleRef}
          className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto text-white drop-shadow-md"
        >
          Get reminders, track your impact, and join challenges to build a greener future.
        </p>
        <div ref={ctaRef} className="flex flex-col sm:flex-row justify-center gap-4">
          <Button className="bg-green-500 hover:bg-green-600 text-lg py-6 px-8 shadow-lg hover:scale-105 transition-transform" asChild>
            <Link to="/dashboard">Get Started</Link>
          </Button>
          <Button variant="outline" className="border-white text-white hover:bg-white/10 text-lg py-6 px-8 shadow-md hover:scale-105 transition-transform" asChild>
            <Link to="/about">Learn More</Link>
          </Button>
        </div>
        
        {/* Feature Links */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button variant="ghost" className="bg-white/10 hover:bg-white/20 text-white hover:scale-105 transition-transform" asChild>
            <Link to="/reminders">Reminders</Link>
          </Button>
          <Button variant="ghost" className="bg-white/10 hover:bg-white/20 text-white hover:scale-105 transition-transform" asChild>
            <Link to="/challenges">Challenges</Link>
          </Button>
          <Button variant="ghost" className="bg-white/10 hover:bg-white/20 text-white hover:scale-105 transition-transform" asChild>
            <Link to="/calculator">Calculator</Link>
          </Button>
          <Button variant="ghost" className="bg-white/10 hover:bg-white/20 text-white hover:scale-105 transition-transform" asChild>
            <Link to="/faq">FAQ</Link>
          </Button>
        </div>
        
        {/* Inspirational Quote */}
        <div 
          ref={quoteRef}
          className="mt-16 max-w-2xl mx-auto bg-black/30 backdrop-blur-sm p-6 rounded-lg border border-white/10"
        >
          <p className="italic text-white/90 text-lg">{randomQuote}</p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <span className="text-white text-sm mb-2">Scroll Down</span>
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
