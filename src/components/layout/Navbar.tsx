
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { motion } from 'framer-motion';
import { Menu, X, User, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    ...(user
      ? [
          { name: 'Dashboard', path: '/dashboard' },
          { name: 'Results', path: '/results' },
          { name: 'Projects', path: '/projects' },
        ]
      : []),
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const navbarVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const menuVariants = {
    closed: { opacity: 0, x: '100%' },
    open: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={navbarVariants}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled 
          ? 'bg-white/80 backdrop-blur-lg shadow-sm dark:bg-gray-900/80' 
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                SVU Student Hub
              </span>
            </Link>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  'nav-link',
                  isActive(link.path) && 'active'
                )}
              >
                {link.name}
              </Link>
            ))}

            {user ? (
              <div className="flex items-center ml-4 space-x-2">
                <div className="relative group">
                  <button className="flex items-center space-x-2 px-3 py-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors">
                    <span className="text-sm font-medium">{user.name}</span>
                    <User size={18} />
                  </button>
                  
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-1 group-hover:translate-y-0 z-50">
                    <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                      <p className="text-sm font-semibold">{user.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                    </div>
                    <button
                      onClick={logout}
                      className="flex w-full items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <LogOut size={16} className="mr-2" />
                      Log out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                to="/"
                className="ml-4 px-4 py-2 rounded-md text-sm font-medium text-white bg-primary hover:bg-primary/90 transition-colors"
              >
                Log in
              </Link>
            )}
          </div>

          {/* Mobile nav toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:bg-secondary transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial="closed"
        animate={isOpen ? 'open' : 'closed'}
        variants={menuVariants}
        className={cn(
          'md:hidden fixed inset-0 z-40 w-full h-screen bg-white dark:bg-gray-900',
          isOpen ? 'flex flex-col' : 'hidden'
        )}
      >
        <div className="px-6 pt-20 pb-8 h-full overflow-y-auto">
          <div className="flex flex-col space-y-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  'text-xl font-medium',
                  isActive(link.path)
                    ? 'text-primary'
                    : 'text-foreground hover:text-primary transition-colors'
                )}
              >
                {link.name}
              </Link>
            ))}

            {user ? (
              <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <User size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center space-x-2 text-red-600 dark:text-red-400"
                >
                  <LogOut size={18} />
                  <span>Log out</span>
                </button>
              </div>
            ) : (
              <Link
                to="/"
                className="w-full px-4 py-3 rounded-md text-center text-white bg-primary hover:bg-primary/90 transition-colors"
              >
                Log in
              </Link>
            )}
          </div>
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
