import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { NAV_LINKS } from '../constants';
import { MenuIcon, XIcon } from './ui/Icons'; 

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  const buttonHoverVariants = {
    hover: { 
      scale: 1.05,
      transition: { duration: 0.2, ease: 'easeInOut' }
    },
    tap: { scale: 0.95 }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isOpen ? 'bg-background-light/80 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-end h-20">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {NAV_LINKS.map((link, index) => (
              <motion.button
                key={link.id}
                variants={navItemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.1 * index + 0.5, duration: 0.3 }}
                whileHover="hover"
                whileTap="tap"
                onClick={() => scrollToSection(link.id)}
                className="relative group"
              >
                <motion.div
                  variants={buttonHoverVariants}
                  className="font-semibold text-text-secondary hover:text-accent-teal transition-all duration-300 px-4 py-2.5 rounded-lg text-sm tracking-wide uppercase letterspacing-wider border border-transparent hover:border-accent-teal/30 hover:bg-accent-teal/10 backdrop-blur-sm"
                >
                  {link.label}
                  {/* Animated underline */}
                  <motion.div
                    className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-accent-teal to-accent-teal/60 group-hover:w-full transition-all duration-300"
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                  />
                  {/* Subtle glow effect */}
                  <motion.div
                    className="absolute inset-0 rounded-lg bg-accent-teal/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  />
                </motion.div>
              </motion.button>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="relative p-2 text-text-primary hover:text-accent-teal focus:outline-none transition-colors duration-300 rounded-lg hover:bg-accent-teal/10"
              aria-label="Toggle menu"
            >
              <motion.div
                animate={isOpen ? { rotate: 180 } : { rotate: 0 }}
                transition={{ duration: 0.3 }}
              >
                {isOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
              </motion.div>
              {/* Mobile button glow effect */}
              <motion.div
                className="absolute inset-0 rounded-lg bg-accent-teal/20 opacity-0 hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm"
                whileHover={{ opacity: 1 }}
              />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Enhanced Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="md:hidden bg-background-light/95 backdrop-blur-md border-t border-accent-teal/20"
        >
          <div className="px-4 pt-4 pb-6 space-y-3">
            {NAV_LINKS.map((link, index) => (
              <motion.button
                key={link.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => scrollToSection(link.id)}
                className="block w-full text-left px-4 py-3 rounded-lg text-base font-semibold text-text-primary hover:bg-gradient-to-r hover:from-accent-teal/20 hover:to-accent-teal/10 hover:text-accent-teal transition-all duration-300 border border-transparent hover:border-accent-teal/30 uppercase tracking-wide transform hover:shadow-lg"
              >
                <span className="flex items-center justify-between">
                  {link.label}
                  <motion.div
                    className="w-0 h-0.5 bg-accent-teal rounded-full"
                    whileHover={{ width: '20px' }}
                    transition={{ duration: 0.3 }}
                  />
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
