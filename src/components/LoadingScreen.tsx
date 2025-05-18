
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        // Fade out the entire container
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.8,
          onComplete: onLoadingComplete
        });
      }
    });

    // Animate each letter of "GREEN" dropping from top
    const greenLetters = ["G", "R", "E", "E", "N"];
    greenLetters.forEach((_, index) => {
      tl.fromTo(
        letterRefs.current[index],
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, ease: "bounce.out" },
        index * 0.15 // Stagger the animations
      );
    });

    // Animate each letter of "ROUTINE" dropping from bottom
    const routineLetters = ["R", "O", "U", "T", "I", "N", "E"];
    routineLetters.forEach((_, index) => {
      tl.fromTo(
        letterRefs.current[index + 5], // Offset by 5 (length of "GREEN")
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, ease: "bounce.out" },
        1 + index * 0.15 // Start after GREEN with stagger
      );
    });

    // Add a delay before completing
    tl.to({}, { duration: 0.5 });

    return () => {
      tl.kill();
    };
  }, [onLoadingComplete]);

  // Create arrays for the letters
  const greenLetters = ["G", "R", "E", "E", "N"];
  const routineLetters = ["R", "O", "U", "T", "I", "N", "E"];

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 bg-green-500 z-50 flex items-center justify-center"
    >
      <div className="relative flex flex-col items-center justify-center">
        {/* Environmental tip bubbles */}
        <motion.div 
          className="absolute -top-20 left-20 bg-green-600 text-white text-sm p-2 rounded-lg"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.1, 1] }}
          transition={{ delay: 2.5, duration: 0.5 }}
        >
          Save water
        </motion.div>
        
        <motion.div 
          className="absolute -bottom-20 right-20 bg-green-600 text-white text-sm p-2 rounded-lg"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.1, 1] }}
          transition={{ delay: 2.8, duration: 0.5 }}
        >
          Reduce plastic
        </motion.div>
        
        <motion.div 
          className="absolute -left-20 bg-green-600 text-white text-sm p-2 rounded-lg"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.1, 1] }}
          transition={{ delay: 3.1, duration: 0.5 }}
        >
          Plant trees
        </motion.div>
        
        {/* Green Routine text with individual letter animations */}
        <div className="flex flex-col items-center">
          <div className="flex mb-2">
            {greenLetters.map((letter, index) => (
              <span
                key={`green-${index}`}
                ref={el => letterRefs.current[index] = el}
                className="text-5xl md:text-7xl font-bold text-white mx-1"
              >
                {letter}
              </span>
            ))}
          </div>
          <div className="flex">
            {routineLetters.map((letter, index) => (
              <span
                key={`routine-${index}`}
                ref={el => letterRefs.current[index + 5] = el}
                className="text-5xl md:text-7xl font-bold text-black mx-1"
              >
                {letter}
              </span>
            ))}
          </div>
        </div>
        
        {/* Animated leaf icon */}
        <motion.div 
          className="absolute"
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{ 
            rotate: { repeat: Infinity, duration: 6, ease: "linear" },
            scale: { repeat: Infinity, duration: 2, ease: "easeInOut" }
          }}
        >
          <svg className="h-56 w-56 text-green-400/20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
        </motion.div>
      </div>
    </div>
  );
};

export default LoadingScreen;
