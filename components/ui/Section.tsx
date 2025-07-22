import React from 'react';
import { motion, Variants } from 'framer-motion';

interface SectionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  title?: string;
}

const Section: React.FC<SectionProps> = ({ id, children, className = '', title }) => {
  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
        staggerChildren: 0.3, 
      }
    },
  };

  const titleVariants: Variants = {
    hidden: { opacity: 0, y: -30, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut" as const,
        delay: 0.1 
      }
    }
  };

  return (
    <motion.section
      id={id}
      className={`py-16 md:py-24 ${className}`}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {title && (
          <motion.div
            variants={titleVariants}
            className="text-center mb-16 md:mb-20"
          >
            <h2 className="relative inline-block">
              <div 
                className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-teal-500/20 to-emerald-500/20 blur-2xl scale-110 -z-10"
                aria-hidden="true"
              />
              
              <span 
                className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-white via-blue-100 to-teal-200 bg-clip-text text-transparent font-display"
                style={{
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                {title}
              </span>
              
              <span 
                className="absolute inset-0 text-white text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight font-display"
                style={{ 
                  opacity: 'var(--text-fallback, 0)',
                  zIndex: -1
                }}
                aria-hidden="true"
              >
                {title}
              </span>
            </h2>
            
            <div className="flex items-center justify-center mt-6 space-x-4">
              <motion.div
                className="w-12 h-0.5 bg-gradient-to-r from-transparent via-teal-400 to-teal-500 rounded-full"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 48, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              />
              
              <motion.div
                className="w-2 h-2 bg-teal-400 rotate-45 shadow-lg shadow-teal-400/50"
                initial={{ scale: 0, rotate: 0 }}
                animate={{ scale: 1, rotate: 45 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              />
              
              <motion.div
                className="w-12 h-0.5 bg-gradient-to-l from-transparent via-teal-400 to-teal-500 rounded-full"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 48, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              />
            </div>
            
            <motion.p
              className="text-gray-400 text-sm font-light tracking-widest uppercase mt-4 opacity-70"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.7, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              ─── Explore & Discover ───
            </motion.p>
          </motion.div>
        )}
        
        <motion.div
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {children}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Section;