
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
      { scaleX: 1, duration: 1.5, ease: "power2.inOut" },
      "-=0.2"
    );

    // Return cleanup function
    return () => {
      tl.kill();
    };
  }, [onLoadingComplete]);

  return (
    <div ref={loaderRef} className="gsap-loader">
      <div className="flex flex-col items-center">
        <div ref={logoRef} className="mb-6">
          <div className="h-24 w-24 rounded-full bg-green-500 flex items-center justify-center">
            <svg className="h-12 w-12 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </div>
        </div>
        
        <div ref={textRef} className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-green-500 mb-2">GreenRoutine</h1>
          <p className="text-gray-600">Building a sustainable future</p>
        </div>

        <div className="w-64 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div ref={progressRef} className="h-full bg-green-500 origin-left"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
