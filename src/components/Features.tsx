
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const Features = () => {
  const featuresRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Counter animation
    const counterElements = counterRef.current?.querySelectorAll('.counter');
    
    counterElements?.forEach((element) => {
      const target = parseInt(element.textContent || '0');
      const counter = { val: 0 };
      
      gsap.to(counter, {
        val: target,
        duration: 3,
        scrollTrigger: {
          trigger: element,
          start: "top bottom-=100",
        },
        onUpdate: () => {
          element.textContent = Math.round(counter.val).toString();
        }
      });
    });
  }, []);

  const featureItems = [
    {
      title: "Smart Reminders",
      description: "Get timely notifications to turn off lights, save water, and reduce energy consumption.",
      icon: (
        <svg className="h-12 w-12 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
      ),
    },
    {
      title: "Impact Tracker",
      description: "Visualize how your daily actions contribute to saving water, energy, and reducing CO2 emissions.",
      icon: (
        <svg className="h-12 w-12 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 20V10"></path>
          <path d="M18 20V4"></path>
          <path d="M6 20v-4"></path>
        </svg>
      ),
    },
    {
      title: "Eco Challenges",
      description: "Join weekly challenges like plastic-free week and compete with friends for a greener lifestyle.",
      icon: (
        <svg className="h-12 w-12 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
      ),
    },
    {
      title: "Emissions Calculator",
      description: "Calculate your carbon footprint and see the equivalent in trees planted or water saved.",
      icon: (
        <svg className="h-12 w-12 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="8" y1="21" x2="16" y2="21"></line>
          <line x1="12" y1="17" x2="12" y2="21"></line>
        </svg>
      ),
    },
  ];

  return (
    <section id="features" className="section bg-white" ref={featuresRef}>
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 fadeInUp">Your Daily Impact Matters</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto fadeInUp">
            Small changes in your daily routine can lead to significant environmental benefits over time.
          </p>
        </div>

        {/* Stats Counter */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20" ref={counterRef}>
          <div className="text-center p-6 rounded-lg bg-green-50">
            <div className="text-4xl font-bold text-green-500 mb-2 counter">14500</div>
            <p className="text-gray-600">Trees Saved</p>
          </div>
          <div className="text-center p-6 rounded-lg bg-blue-50">
            <div className="text-4xl font-bold text-blue-500 mb-2 counter">2750000</div>
            <p className="text-gray-600">Liters of Water Conserved</p>
          </div>
          <div className="text-center p-6 rounded-lg bg-orange-50">
            <div className="text-4xl font-bold text-orange-500 mb-2 counter">1248</div>
            <p className="text-gray-600">Active Community Members</p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featureItems.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
