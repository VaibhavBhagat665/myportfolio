
import React from 'react';
import { motion } from 'framer-motion';
import { SOCIAL_LINKS, USER_INFO } from '../constants';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer 
      className="bg-background-light py-12 text-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center space-x-6 mb-6">
          {SOCIAL_LINKS.map((link) => (
            <motion.a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, color: '#14b8a6' }} // accent-teal
              whileTap={{ scale: 0.9 }}
              className="text-text-secondary hover:text-accent-teal transition-colors"
              aria-label={link.name}
            >
              <link.icon className="w-6 h-6" />
            </motion.a>
          ))}
        </div>
        <p className="text-sm text-text-secondary mb-1">
          Built with <span role="img" aria-label="love">❤️</span> by {USER_INFO.name} using React & Tailwind CSS.
        </p>
        <p className="text-xs text-text-secondary/70">
          &copy; {currentYear} {USER_INFO.name}. All rights reserved.
        </p>
         <motion.div
          className="mt-4 text-xs text-text-secondary/50 font-display"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          Crafting the future, one line of code at a time.
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
