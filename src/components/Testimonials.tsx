
import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Photographer',
    image: 'https://randomuser.me/api/portraits/women/1.jpg',
    quote: "GreenRoutine helped me reduce my water usage by 30%. The reminders to turn off the tap while brushing have become a habit now!",
    rating: 5,
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Software Engineer',
    image: 'https://randomuser.me/api/portraits/men/2.jpg',
    quote: "I never realized how much energy I was wasting until I started using this app. The challenges are fun and have helped me develop better habits.",
    rating: 5,
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Teacher',
    image: 'https://randomuser.me/api/portraits/women/3.jpg',
    quote: "As a teacher, I've recommended GreenRoutine to my students' parents. The whole family can get involved and learn about sustainability together.",
    rating: 4,
  },
  {
    id: 4,
    name: 'David Williams',
    role: 'Architect',
    image: 'https://randomuser.me/api/portraits/men/4.jpg',
    quote: "The CO2 calculator opened my eyes to how much impact my daily commute has. I've switched to biking twice a week as a result.",
    rating: 5,
  },
  {
    id: 5,
    name: 'Lisa Thompson',
    role: 'Marketing Director',
    image: 'https://randomuser.me/api/portraits/women/5.jpg',
    quote: "I love the competitive aspect of the leaderboards. My office team competes monthly to see who can save the most energy!",
    rating: 4,
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (autoplay) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      }, 5000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoplay]);

  useEffect(() => {
    if (sliderRef.current) {
      gsap.fromTo(
        sliderRef.current,
        { opacity: 0.5, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.5 }
      );
    }
  }, [currentIndex]);

  const handlePrevious = () => {
    setAutoplay(false);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setAutoplay(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const handleDotClick = (index: number) => {
    setAutoplay(false);
    setCurrentIndex(index);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        className={`h-5 w-5 ${i < rating ? 'text-orange-500' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
        />
      </svg>
    ));
  };

  return (
    <section id="testimonials" className="section bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 fadeInUp">What Our Users Say</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto fadeInUp">
            Join thousands of people making a difference with GreenRoutine.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div 
            ref={sliderRef}
            className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-8"
          >
            <div className="flex flex-col md:flex-row items-center">
              <div className="mb-6 md:mb-0 md:mr-8">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-green-100">
                    <img 
                      src={testimonials[currentIndex].image} 
                      alt={testimonials[currentIndex].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-green-500 text-white rounded-full p-2">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center mb-4">
                  {renderStars(testimonials[currentIndex].rating)}
                </div>
                <p className="text-gray-700 text-lg italic mb-6">"{testimonials[currentIndex].quote}"</p>
                <div>
                  <h4 className="font-bold text-gray-900">{testimonials[currentIndex].name}</h4>
                  <p className="text-gray-500">{testimonials[currentIndex].role}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <button 
              onClick={handlePrevious}
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
              aria-label="Previous testimonial"
            >
              <svg className="w-6 h-6 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex ? 'bg-green-500 w-6' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button 
              onClick={handleNext}
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
              aria-label="Next testimonial"
            >
              <svg className="w-6 h-6 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
