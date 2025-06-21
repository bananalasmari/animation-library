import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

// Navigation Component
const Navigation = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { path: '/', name: 'الرئيسية', icon: '🏠' },
    { path: '/animations', name: 'المكتبة', icon: '✨' },
    { path: '/animations-text', name: 'مكتبة النصوص', icon: '✨' }
  ];

  return (
    <nav className="bg-gray-800/95 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              مكتبة الأنيميشن
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2 rtl:space-x-reverse ${
                    location.pathname === item.path
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white p-2"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-800 rounded-lg mt-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium flex items-center space-x-2 rtl:space-x-reverse ${
                    location.pathname === item.path
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-gray-800 border-t border-gray-700 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="text-gray-300 text-sm">
            © 2025 مكتبة الأنيميشن الرهيبة. جميع الحقوق محفوظة.
          </div>
          <div className="flex space-x-4 rtl:space-x-reverse mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
              <span className="text-lg">📧</span>
            </a>
            <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
              <span className="text-lg">🐙</span>
            </a>
            <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
              <span className="text-lg">📱</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <Navigation />
      
      <main className="flex-1">
        <div className="animate-fade-in">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;