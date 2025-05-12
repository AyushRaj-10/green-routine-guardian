
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

// Sample sponsor logos with working image URLs
const sponsors = [
  { id: 1, name: 'EcoTech', logo: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=150&h=150' },
  { id: 2, name: 'GreenLife', logo: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=150&h=150' },
  { id: 3, name: 'SustainCorp', logo: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=150&h=150' },
  { id: 4, name: 'EnviroSolutions', logo: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=150&h=150' },
  { id: 5, name: 'CleanEnergy', logo: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=150&h=150' },
  { id: 6, name: 'WaterWise', logo: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=150&h=150' },
  { id: 7, name: 'EarthFirst', logo: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=150&h=150' },
  { id: 8, name: 'RecyclePro', logo: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=150&h=150' },
];

const Sponsors = () => {
  const logoContainerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate title
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top bottom-=100',
        }
      }
    );

    // Pause animation on hover
    const logoContainer = logoContainerRef.current;
    if (logoContainer) {
      logoContainer.addEventListener('mouseenter', () => {
        gsap.to('.logos-slide', { pauseAnimation: true });
      });
      logoContainer.addEventListener('mouseleave', () => {
        gsap.to('.logos-slide', { pauseAnimation: false });
      });
    }

    // Clone the logos for infinite scroll effect
    if (logoContainer) {
      const logosSlide = logoContainer.querySelector('.logos-slide');
      if (logosSlide) {
        logoContainer.appendChild(logosSlide.cloneNode(true));
      }
    }

    return () => {
      if (logoContainer) {
        logoContainer.removeEventListener('mouseenter', () => {});
        logoContainer.removeEventListener('mouseleave', () => {});
      }
    };
  }, []);

  return (
    <section className="section bg-gray-50 py-16">
      <div className="container">
        <div className="text-center mb-12" ref={titleRef}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Sponsors</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Proud partners in our mission for environmental sustainability.
          </p>
        </div>

        <div className="logos-container" ref={logoContainerRef}>
          <div className="logos-slide">
            {sponsors.map((sponsor) => (
              <div key={sponsor.id} className="inline-block px-8">
                <img
                  src={sponsor.logo}
                  alt={sponsor.name}
                  className="h-16 md:h-20 grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sponsors;
