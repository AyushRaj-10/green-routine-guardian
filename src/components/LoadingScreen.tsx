
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [tipIndex, setTipIndex] = useState(0);

  // Environmental tips
  const tips = [
    "Turn off lights when not in use to save energy",
    "Use reusable bags for shopping to reduce plastic waste",
    "Take shorter showers to conserve water",
    "Unplug electronics when not in use to save energy",
    "Try meatless Mondays to reduce carbon footprint",
    "Use public transportation or carpool when possible",
    "Recycle paper, plastic, glass, and aluminum properly",
    "Choose reusable water bottles instead of disposable ones"
  ];

  useEffect(() => {
    // Cycle through tips
    const tipInterval = setInterval(() => {
      setTipIndex(prev => (prev + 1) % tips.length);
    }, 3000);

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(loaderRef.current, {
          yPercent: -100,
          duration: 0.8,
          ease: "power3.inOut",
          onComplete: onLoadingComplete
        });
      }
    });

    // Initial animation
    tl.fromTo(logoRef.current, 
      { scale: 0.8, opacity: 0 }, 
      { scale: 1, opacity: 1, duration: 0.8, ease: "power3.out" }
    );

    tl.fromTo(textRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
      "-=0.4"
    );

    // Progress animation
    tl.fromTo(progressRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 2.5, ease: "power2.inOut" },
      "-=0.2"
    );

    return () => {
      clearInterval(tipInterval);
      tl.kill();
    };
  }, [onLoadingComplete, tips.length]);

  return (
    <div 
      ref={loaderRef} 
      className="fixed inset-0 bg-white z-50 flex items-center justify-center flex-col"
      style={{ perspective: "1000px" }}
    >
      <div className="flex flex-col items-center max-w-md px-4">
        <div ref={logoRef} className="mb-6 relative">
          <motion.div 
            className="h-24 w-24 rounded-full bg-green-500 flex items-center justify-center"
            animate={{ 
              rotate: 360,
              boxShadow: ["0px 0px 0px rgba(34, 197, 94, 0.2)", "0px 0px 20px rgba(34, 197, 94, 0.6)", "0px 0px 0px rgba(34, 197, 94, 0.2)"]
            }}
            transition={{ 
              rotate: { repeat: Infinity, duration: 6, ease: "linear" },
              boxShadow: { repeat: Infinity, duration: 2, ease: "easeInOut" }
            }}
          >
            <svg className="h-12 w-12 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </motion.div>
          <motion.div 
            className="absolute w-32 h-32 rounded-full border-2 border-green-300 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.2, 0.5] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute w-40 h-40 rounded-full border border-green-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.1, 0.3] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: 0.2 }}
          />
        </div>
        
        <div ref={textRef} className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-green-500 mb-2">GreenRoutine</h1>
          <p className="text-gray-600">Building a sustainable future</p>
        </div>

        {/* Tips Section */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tipIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-center"
          >
            <p className="text-sm text-gray-500 mb-1">Green Tip:</p>
            <p className="text-gray-700 italic">{tips[tipIndex]}</p>
          </motion.div>
        </AnimatePresence>

        <div className="w-64 h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div 
            ref={progressRef} 
            className="h-full bg-green-500 origin-left rounded-full"
            style={{
              boxShadow: "0 0 10px rgba(34, 197, 94, 0.5)"
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
