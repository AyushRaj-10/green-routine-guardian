
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

// Sample sponsor logos (would be replaced with actual logos)
const sponsors = [
  { id: 1, name: 'EcoTech', logo: 'https://via.placeholder.com/150?text=EcoTech' },
  { id: 2, name: 'GreenLife', logo: 'https://via.placeholder.com/150?text=GreenLife' },
  { id: 3, name: 'SustainCorp', logo: 'https://via.placeholder.com/150?text=SustainCorp' },
  { id: 4, name: 'EnviroSolutions', logo: 'https://via.placeholder.com/150?text=EnviroSolutions' },
  { id: 5, name: 'CleanEnergy', logo: 'https://via.placeholder.com/150?text=CleanEnergy' },
  { id: 6, name: 'WaterWise', logo: 'https://via.placeholder.com/150?text=WaterWise' },
  { id: 7, name: 'EarthFirst', logo: 'https://via.placeholder.com/150?text=EarthFirst' },
  { id: 8, name: 'RecyclePro', logo: 'https://via.placeholder.com/150?text=RecyclePro' },
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
