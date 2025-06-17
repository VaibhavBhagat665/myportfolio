import React from 'react';
import { motion } from 'framer-motion';
import Section from './ui/Section';
import { AnimatedWords, AnimatedCharacters } from './ui/AnimatedText';
import Button from './ui/Button';
import { USER_INFO, NAV_LINKS } from '../constants';
import { FloatingParticlesBackground } from './ui/FloatingParticle';
import { ArrowDownIcon, BriefcaseIcon } from './ui/Icons';

const HeroSection: React.FC<{ id: string }> = ({ id }) => {
  const scrollToProjects = () => {
    const projectsSection = document.getElementById(NAV_LINKS.find(link => link.label === 'Projects')?.id || 'projects');
    projectsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById(NAV_LINKS.find(link => link.label === 'Contact')?.id || 'contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  // Animation variants for the name
  const nameVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.3
      }
    }
  };

  // Animation for subtitle
  const subtitleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 0.8
      }
    }
  };

  // Animation for description
  const descriptionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 1.2
      }
    }
  };
  
  return (
    <Section id={id} className="min-h-screen flex items-center justify-center relative !py-0">
      <FloatingParticlesBackground count={25} />
      <div className="text-center z-10 relative max-w-4xl mx-auto px-4">
        {/* Avatar */}
        <motion.div
          className="w-32 h-32 md:w-40 md:h-40 rounded-full mx-auto mb-8 md:mb-10 overflow-hidden border-4 border-teal-400 shadow-2xl shadow-teal-400/20"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2, type: 'spring', stiffness: 120 }}
        >
          <img 
            src={USER_INFO.avatar} 
            alt={USER_INFO.name} 
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        {/* Main Name - Fixed with proper styling */}
        <motion.div
          variants={nameVariants}
          initial="hidden"
          animate="visible"
          className="mb-6"
        >
          <h1 className="relative inline-block">
            {/* Glow effect background */}
            <div 
              className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-teal-500/30 to-emerald-500/30 blur-2xl scale-110 -z-10"
              aria-hidden="true"
            />
            
            {/* Main text with reliable gradient */}
            <span 
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight bg-gradient-to-r from-white via-blue-100 to-teal-200 bg-clip-text text-transparent font-display leading-tight"
              style={{
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              {USER_INFO.name}
            </span>
            
            {/* Fallback text for compatibility */}
            <span 
              className="absolute inset-0 text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight font-display leading-tight opacity-0"
              style={{ opacity: 'var(--text-fallback, 0)' }}
              aria-hidden="true"
            >
              {USER_INFO.name}
            </span>
          </h1>
        </motion.div>
        
        {/* Subtitle */}
        <motion.h2
          variants={subtitleVariants}
          initial="hidden"
          animate="visible"
          className="text-2xl sm:text-3xl md:text-4xl font-light text-gray-300 mb-4 tracking-wide"
        >
          Crafting AI-Driven Futures
        </motion.h2>
        
        {/* Description */}
        <motion.p
          variants={descriptionVariants}
          initial="hidden"
          animate="visible"
          className="text-lg sm:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          {USER_INFO.aspirations}
        </motion.p>
        
        {/* Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.5 }}
        >
          <Button onClick={scrollToProjects} variant="primary" size="lg" leftIcon={<BriefcaseIcon className="w-5 h-5"/>}>
            View Projects
          </Button>
          <Button onClick={scrollToContact} variant="outline" size="lg">
            Contact Me
          </Button>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-teal-400 animate-bounce"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 2.0 }}
      >
        <ArrowDownIcon className="w-8 h-8" />
      </motion.div>
    </Section>
  );
};

export default HeroSection;