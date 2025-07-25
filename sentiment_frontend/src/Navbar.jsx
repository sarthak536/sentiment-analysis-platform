import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const scrollToSection = (sectionId) => {
    if (isHomePage) {
      const element = document.querySelector(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full bg-white/98 backdrop-blur-md shadow-xl z-50 transition-all duration-300 border-b border-purple-100/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-200">
              SentimentAI
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {isHomePage ? (
                <>
                  <button
                    onClick={() => scrollToSection('#home')}
                    className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-indigo-50"
                  >
                    Home
                  </button>
                  <button
                    onClick={() => scrollToSection('#about')}
                    className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-indigo-50"
                  >
                    About
                  </button>
                  <button
                    onClick={() => scrollToSection('#contact')}
                    className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-indigo-50"
                  >
                    Contact
                  </button>
                </>
              ) : (
                <>
                  <Link to="/" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-indigo-50">
                    Home
                  </Link>
                  <Link to="/#about" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-indigo-50">
                    About
                  </Link>
                  <Link to="/#contact" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-indigo-50">
                    Contact
                  </Link>
                </>
              )}
              <Link
                to="/products"
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold transition-all duration-200 hover:shadow-lg transform hover:scale-105 hover:-translate-y-0.5"
              >
                Try Products ✨
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 focus:outline-none transition-colors duration-200"
            >
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-white/20">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {isHomePage ? (
              <>
                <button
                  onClick={() => scrollToSection('#home')}
                  className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition-colors duration-200 w-full text-left"
                >
                  Home
                </button>
                <button
                  onClick={() => scrollToSection('#about')}
                  className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition-colors duration-200 w-full text-left"
                >
                  About
                </button>
                <button
                  onClick={() => scrollToSection('#contact')}
                  className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition-colors duration-200 w-full text-left"
                >
                  Contact
                </button>
              </>
            ) : (
              <>
                <Link to="/" className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition-colors duration-200">
                  Home
                </Link>
                <Link to="/#about" className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition-colors duration-200">
                  About
                </Link>
                <Link to="/#contact" className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition-colors duration-200">
                  Contact
                </Link>
              </>
            )}
            <Link
              to="/products"
              className="block px-3 py-2 rounded-lg text-base font-medium bg-gradient-to-r from-indigo-600 to-purple-600 text-white mx-2 mt-2"
              onClick={() => setIsOpen(false)}
            >
              Try Products ✨
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;