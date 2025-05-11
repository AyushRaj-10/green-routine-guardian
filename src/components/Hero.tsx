
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, useTexture } from '@react-three/drei';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

// Earth component with improved visual effects
const EarthGlobe = () => {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  // Earth texture maps with higher quality textures
  const earthTexture = useTexture({
    map: 'https://i.imgur.com/nNUCyx4.jpg',
    normalMap: 'https://i.imgur.com/VG0kALc.jpg',
    specularMap: 'https://i.imgur.com/3Bi8kng.jpg',
    bumpMap: 'https://i.imgur.com/O3bxm0F.jpg',
  });
  
  useFrame(() => {
    meshRef.current.rotation.y += 0.002; // Slightly increased rotation speed
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2.2, 128, 128]} /> {/* Increased geometry resolution */}
      <meshPhysicalMaterial 
        {...earthTexture}
        roughness={0.6} // Reduced roughness for better light reflection
        metalness={0.3} // Increased metalness
        clearcoat={0.2} // Increased clearcoat
        clearcoatRoughness={0.3} // Smoother clearcoat
        envMapIntensity={1.5} // Enhanced environment reflection
      />
    </mesh>
  );
};

// Cloud layer around Earth
const CloudLayer = () => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const cloudTexture = useTexture('https://i.imgur.com/TSnPiLv.png');
  
  useFrame(() => {
    meshRef.current.rotation.y += 0.001; // Keep slower rotation for clouds
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2.35, 64, 64]} /> {/* Slightly larger to better envelop Earth */}
      <meshStandardMaterial 
        map={cloudTexture} 
        transparent={true} 
        opacity={0.35} // Slightly reduced opacity for better visibility
        alphaTest={0.15}
        depthWrite={false} // Prevent z-fighting
      />
    </mesh>
  );
};

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

  // Inspirational quotes from green-routine.vercel.app
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
      {/* Three.js Background with improved lighting */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black via-blue-900/30 to-green-900/20">
        <Canvas camera={{ position: [0, 0, 5.5], fov: 45 }}> {/* Adjusted camera position */}
          <ambientLight intensity={0.65} /> {/* Increased ambient light */}
          <directionalLight position={[10, 10, 5]} intensity={2} /> {/* Increased light intensity */}
          <pointLight position={[-10, -10, -10]} color="#3db9dc" intensity={1.5} /> {/* Enhanced blue light */}
          <EarthGlobe />
          <CloudLayer />
          <Environment preset="city" />
          <OrbitControls 
            enableZoom={false}
            enablePan={false}
            rotateSpeed={0.4}
            autoRotate
            autoRotateSpeed={0.7} // Increased auto-rotation speed
            maxPolarAngle={Math.PI / 1.5} // Limit rotation angle
            minPolarAngle={Math.PI / 3} // Set minimum rotation angle
          />
        </Canvas>
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
          <Button className="bg-green-500 hover:bg-green-600 text-lg py-6 px-8 shadow-lg" asChild>
            <Link to="/dashboard">Get Started</Link>
          </Button>
          <Button variant="outline" className="border-white text-white hover:bg-white/10 text-lg py-6 px-8 shadow-md" asChild>
            <Link to="/about">Learn More</Link>
          </Button>
        </div>
        
        {/* Feature Links */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button variant="ghost" className="bg-white/10 hover:bg-white/20 text-white" asChild>
            <Link to="/reminders">Reminders</Link>
          </Button>
          <Button variant="ghost" className="bg-white/10 hover:bg-white/20 text-white" asChild>
            <Link to="/challenges">Challenges</Link>
          </Button>
          <Button variant="ghost" className="bg-white/10 hover:bg-white/20 text-white" asChild>
            <Link to="/calculator">Calculator</Link>
          </Button>
          <Button variant="ghost" className="bg-white/10 hover:bg-white/20 text-white" asChild>
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
