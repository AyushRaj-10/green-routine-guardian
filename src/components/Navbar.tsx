
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navbarClass = isScrolled
    ? 'fixed w-full py-4 bg-white shadow-md transition-all duration-300 z-50'
    : 'fixed w-full py-6 bg-transparent transition-all duration-300 z-50';

  const navItems = [
    { name: 'Home', href: '#home', to: '/' },
    { name: 'Features', href: '#features', to: '/' },
    { name: 'Calculator', href: '#calculator', to: '/calculator' },
    { name: 'Reminders', href: '#reminders', to: '/reminders' },
    { name: 'Challenges', href: '#challenges', to: '/challenges' },
    { name: 'FAQ', href: '#faq', to: '/faq' },
  ];

  // Check if we're on the home page
  const isHomePage = location.pathname === '/';

  return (
    <nav className={navbarClass}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link 
          to="/"
          className="flex items-center group"
          whileHover={{ scale: 1.05 }}
        >
          <motion.div 
            className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center mr-3"
            whileHover={{ scale: 1.2, rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </motion.div>
          <motion.span 
            className="text-xl font-bold text-green-500"
            whileHover={{ scale: 1.05 }}
          >
            GreenRoutine
          </motion.span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <div className="space-x-6">
            {navItems.map((item) => {
              // Use anchor links on homepage, router links elsewhere
              const isActive = isHomePage 
                ? location.hash === item.href || (!location.hash && item.href === '#home')
                : location.pathname === item.to;
                
              return (
                <Link
                  key={item.name}
                  to={isHomePage && item.href.startsWith('#') ? item.href : item.to}
                  className={`transition-colors font-medium relative ${
                    isActive ? 'text-green-500' : 'text-gray-700 hover:text-green-500'
                  }`}
                >
                  <span>{item.name}</span>
                  {isActive && (
                    <motion.span
                      className="absolute -bottom-1 left-0 w-full h-0.5 bg-green-500"
                      layoutId="navbar-underline"
                    />
                  )}
                </Link>
              );
            })}
          </div>
          <Button 
            className="bg-green-500 hover:bg-green-600 hover:scale-105 transition-transform" 
            asChild
          >
            <Link to="/dashboard">Dashboard</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 focus:outline-none"
            whileTap={{ scale: 0.9 }}
          >
            <svg
              className="h-6 w-6 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white shadow-lg overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              {navItems.map((item) => {
                const isActive = isHomePage 
                  ? location.hash === item.href || (!location.hash && item.href === '#home')
                  : location.pathname === item.to;
                
                return (
                  <Link
                    key={item.name}
                    to={isHomePage && item.href.startsWith('#') ? item.href : item.to}
                    className={`py-2 border-b border-gray-100 ${
                      isActive ? 'text-green-500 font-bold' : 'text-gray-700 hover:text-green-500' 
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                );
              })}
              <Button className="bg-green-500 hover:bg-green-600" asChild>
                <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>Dashboard</Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
