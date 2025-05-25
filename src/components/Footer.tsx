
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-green-900 text-white pt-16 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center mb-6">
              <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center mr-3">
                <svg className="h-5 w-5 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <span className="text-xl font-bold">GreenRoutine</span>
            </div>
            <p className="text-green-100 mb-6">
              Creating sustainable habits for a better future. Join our community and make a positive impact on the environment.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                </svg>
              </a>
              <a href="#" className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z"></path>
                </svg>
              </a>
              <a href="#" className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"></path>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-green-100 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-green-100 hover:text-white transition-colors">About</Link>
              </li>
              <li>
                <Link to="/story" className="text-green-100 hover:text-white transition-colors">Our Story</Link>
              </li>
              <li>
                <Link to="/community" className="text-green-100 hover:text-white transition-colors">Community</Link>
              </li>
              <li>
                <Link to="/calculator" className="text-green-100 hover:text-white transition-colors">Calculator</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Features</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/reminders" className="text-green-100 hover:text-white transition-colors">Reminders</Link>
              </li>
              <li>
                <Link to="/challenges" className="text-green-100 hover:text-white transition-colors">Challenges</Link>
              </li>
              <li>
                <Link to="/calculator" className="text-green-100 hover:text-white transition-colors">Calculator</Link>
              </li>
              <li>
                <Link to="/faq" className="text-green-100 hover:text-white transition-colors">FAQ</Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-green-100 hover:text-white transition-colors">Dashboard</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Stay Connected</h4>
            <p className="text-green-100 mb-4">Sign up for our newsletter to get updates and eco-friendly tips.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email address"
                className="px-4 py-2 rounded-l-lg focus:outline-none text-gray-900 w-full"
              />
              <Button className="rounded-l-none bg-green-500 hover:bg-green-600">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-green-700 text-center">
          <p className="text-green-100">&copy; {new Date().getFullYear()} GreenRoutine. All rights reserved.</p>
          <div className="mt-4 flex flex-wrap justify-center gap-4">
            <Link to="/about" className="text-green-100 hover:text-white text-sm transition-colors">About Us</Link>
            <Link to="/story" className="text-green-100 hover:text-white text-sm transition-colors">Our Story</Link>
            <Link to="/community" className="text-green-100 hover:text-white text-sm transition-colors">Community</Link>
            <Link to="/faq" className="text-green-100 hover:text-white text-sm transition-colors">FAQ</Link>
            <a href="#" className="text-green-100 hover:text-white text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-green-100 hover:text-white text-sm transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
