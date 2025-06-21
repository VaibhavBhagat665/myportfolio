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

  const linkHoverVariants = {
    hover: { 
      scale: 1.05,
      transition: { duration: 0.2, ease: "easeInOut" }
    }
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
          <div className="hidden md:flex items-center space-x-1">
            {NAV_LINKS.map((link, index) => (
              <motion.button
                key={link.id}
                variants={navItemVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                transition={{ delay: 0.1 * index + 0.5, duration: 0.3 }}
                onClick={() => scrollToSection(link.id)}
                className="relative group font-semibold text-sm lg:text-base text-text-secondary hover:text-accent-teal transition-all duration-300 px-4 py-2.5 rounded-lg overflow-hidden"
              >
                {/* Hover background effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-accent-teal/10 to-accent-teal/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  variants={linkHoverVariants}
                />
                
                {/* Text with subtle glow effect on hover */}
                <span className="relative z-10 tracking-wide group-hover:drop-shadow-sm">
                  {link.label}
                </span>
                
                {/* Animated underline */}
                <motion.div
                  className="absolute bottom-1 left-4 right-4 h-0.5 bg-gradient-to-r from-accent-teal to-accent-teal/60 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                />
              </motion.button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="relative p-2 text-text-primary hover:text-accent-teal focus:outline-none transition-colors duration-300 rounded-lg hover:bg-accent-teal/10"
              aria-label="Toggle menu"
            >
              <motion.div
                initial={false}
                animate={isOpen ? "open" : "closed"}
              >
                {isOpen ? (
                  <motion.div
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 180 }}
                    transition={{ duration: 0.3 }}
                  >
                    <XIcon className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ rotate: 180 }}
                    animate={{ rotate: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <MenuIcon className="h-6 w-6" />
                  </motion.div>
                )}
              </motion.div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="md:hidden bg-background-light/95 backdrop-blur-md border-t border-accent-teal/20"
        >
          <div className="px-4 pt-4 pb-6 space-y-2">
            {NAV_LINKS.map((link, index) => (
              <motion.button
                key={link.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                whileHover={{ x: 8 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => scrollToSection(link.id)}
                className="relative group block w-full text-left px-4 py-3 rounded-xl text-base font-semibold text-text-primary hover:bg-gradient-to-r hover:from-accent-teal/15 hover:to-accent-teal/5 hover:text-accent-teal transition-all duration-300 overflow-hidden"
              >
                {/* Mobile item accent line */}
                <motion.div
                  className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-accent-teal to-accent-teal/60 rounded-r-full scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top"
                />
                
                <span className="relative z-10 tracking-wide group-hover:drop-shadow-sm ml-2">
                  {link.label}
                </span>
                
                {/* Subtle right arrow on hover */}
                <motion.span
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-accent-teal opacity-0 group-hover:opacity-100 transition-all duration-300"
                  initial={{ x: -10 }}
                  whileHover={{ x: 0 }}
                >
                  →
                </motion.span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
