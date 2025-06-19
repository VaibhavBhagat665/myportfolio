import React from 'react';
import { motion } from 'framer-motion';
import Section from './ui/Section';
import { AnimatedWords, AnimatedCharacters } from './ui/AnimatedText';
import Button from './ui/Button';
import { USER_INFO, NAV_LINKS } from '../constants';
import { FloatingParticlesBackground } from './ui/FloatingParticle';
import { ArrowDownIcon, BriefcaseIcon } from './ui/Icons';

// 3D Software Development Icon Component
const CodeIcon3D: React.FC = () => {
  return (
    <motion.div
      className="relative w-20 h-20 md:w-24 md:h-24 mx-auto mb-6 md:mb-8"
      initial={{ scale: 0, opacity: 0, rotateY: -180 }}
      animate={{ scale: 1, opacity: 1, rotateY: 0 }}
      transition={{ 
        duration: 1.2, 
        delay: 0.2, 
        type: 'spring', 
        stiffness: 100,
        damping: 12
      }}
      whileHover={{ 
        scale: 1.1, 
        rotateY: 15,
        transition: { duration: 0.3 }
      }}
      style={{ perspective: '1000px' }}
    >
      {/* Outer glow ring */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 via-violet-500/20 to-indigo-500/20 blur-xl"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Main container with 3D effect */}
      <div 
        className="relative w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-violet-400/30 shadow-2xl shadow-violet-400/20 overflow-hidden"
        style={{
          transformStyle: 'preserve-3d',
          transform: 'rotateX(5deg) rotateY(-5deg)'
        }}
      >
        {/* Background pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-violet-600/10" />
        
        {/* Code brackets - animated */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="text-2xl md:text-3xl font-mono text-violet-400 font-bold">
            {'{ }'}
          </div>
        </motion.div>
        
        {/* Floating code symbols */}
        <motion.div
          className="absolute top-1 left-1 text-purple-400 text-xs font-mono"
          animate={{ y: [-1, 1, -1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
        >
          &lt;/&gt;
        </motion.div>
        
        <motion.div
          className="absolute top-1 right-1 text-indigo-400 text-xs font-mono"
          animate={{ y: [1, -1, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
        >
          ()
        </motion.div>
        
        <motion.div
          className="absolute bottom-1 left-1 text-pink-400 text-xs font-mono"
          animate={{ y: [-1, 1, -1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.8, repeat: Infinity, delay: 1.5 }}
        >
          []
        </motion.div>
        
        <motion.div
          className="absolute bottom-1 right-1 text-cyan-400 text-xs font-mono"
          animate={{ y: [1, -1, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3.2, repeat: Infinity, delay: 0.8 }}
        >
          ;
        </motion.div>
        
        {/* Central pulsing dot */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-violet-400 rounded-full transform -translate-x-1/2 -translate-y-1/2"
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        
        {/* Corner accent lines */}
        <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-violet-400/60 rounded-tl-lg" />
        <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-violet-400/60 rounded-tr-lg" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-violet-400/60 rounded-bl-lg" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-violet-400/60 rounded-br-lg" />
      </div>
      
      {/* Orbiting elements */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute -top-2 left-1/2 w-1.5 h-1.5 bg-purple-400 rounded-full transform -translate-x-1/2" />
        <div className="absolute top-1/2 -right-2 w-1 h-1 bg-indigo-400 rounded-full transform -translate-y-1/2" />
        <div className="absolute -bottom-2 left-1/2 w-1.5 h-1.5 bg-pink-400 rounded-full transform -translate-x-1/2" />
        <div className="absolute top-1/2 -left-2 w-1 h-1 bg-cyan-400 rounded-full transform -translate-y-1/2" />
      </motion.div>
    </motion.div>
  );
};

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
        {/* 3D Development Icon */}
        <CodeIcon3D />
        
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
              className="absolute inset-0 bg-gradient-to-r from-purple-500/30 via-violet-500/30 to-indigo-500/30 blur-2xl scale-110 -z-10"
              aria-hidden="true"
            />
            
            {/* Main text with reliable gradient */}
            <span 
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight bg-gradient-to-r from-white via-purple-100 to-violet-200 bg-clip-text text-transparent font-display leading-tight"
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
    </Section>
  );
};

export default HeroSection;