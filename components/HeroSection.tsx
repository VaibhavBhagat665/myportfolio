import React from 'react';
import { motion } from 'framer-motion';
import Section from './ui/Section';
import { AnimatedWords, AnimatedCharacters } from './ui/AnimatedText';
import Button from './ui/Button';
import { USER_INFO, NAV_LINKS } from '../constants';
import { FloatingParticlesBackground } from './ui/FloatingParticle';
import { ArrowDownIcon, BriefcaseIcon } from './ui/Icons';

// Enhanced 3D Software Development Icon Component with Diverse Revolving Elements
const CodeIcon3D: React.FC = () => {
  return (
    <motion.div
      className="relative w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 mb-8"
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
      {/* Enhanced outer glow ring */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 via-violet-500/20 to-indigo-500/20 blur-xl"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Secondary glow layer */}
      <motion.div
        className="absolute inset-2 rounded-full bg-gradient-to-r from-violet-500/15 via-purple-500/15 to-indigo-500/15 blur-lg"
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Tertiary inner glow */}
      <motion.div
        className="absolute inset-4 rounded-full bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-violet-500/10 blur-md"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Main container with enhanced 3D effect and rotation */}
      <motion.div 
        className="relative w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-violet-400/30 shadow-2xl shadow-violet-400/20 overflow-hidden"
        style={{
          transformStyle: 'preserve-3d',
          transform: 'rotateX(5deg) rotateY(-5deg)'
        }}
        animate={{ rotateZ: [0, 90, 180, 270, 360] }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          ease: "easeInOut",
          times: [0, 0.25, 0.5, 0.75, 1]
        }}
      >
        {/* Enhanced background pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-violet-600/10" />
        
        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }}
        />
        
        {/* Code brackets - enhanced and animated */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="text-4xl md:text-5xl lg:text-6xl font-mono text-violet-400 font-bold">
            {'{ }'}
          </div>
        </motion.div>
        
        {/* Enhanced floating code symbols */}
        <motion.div
          className="absolute top-2 left-2 text-purple-400 text-sm md:text-base font-mono"
          animate={{ y: [-2, 2, -2], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
        >
          &lt;/&gt;
        </motion.div>
        
        <motion.div
          className="absolute top-2 right-2 text-indigo-400 text-sm md:text-base font-mono"
          animate={{ y: [2, -2, 2], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
        >
          ()
        </motion.div>
        
        <motion.div
          className="absolute bottom-2 left-2 text-pink-400 text-sm md:text-base font-mono"
          animate={{ y: [-2, 2, -2], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.8, repeat: Infinity, delay: 1.5 }}
        >
          []
        </motion.div>
        
        <motion.div
          className="absolute bottom-2 right-2 text-cyan-400 text-sm md:text-base font-mono"
          animate={{ y: [2, -2, 2], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3.2, repeat: Infinity, delay: 0.8 }}
        >
          ;
        </motion.div>
        
        {/* Additional corner symbols */}
        <motion.div
          className="absolute top-1/4 left-1 text-purple-300 text-xs md:text-sm font-mono"
          animate={{ x: [-1, 1, -1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 4, repeat: Infinity, delay: 0.2 }}
        >
          //
        </motion.div>
        
        <motion.div
          className="absolute top-3/4 right-1 text-indigo-300 text-xs md:text-sm font-mono"
          animate={{ x: [1, -1, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 3.5, repeat: Infinity, delay: 1.2 }}
        >
          *
        </motion.div>
        
        {/* Enhanced central pulsing dot */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-2 h-2 md:w-3 md:h-3 bg-violet-400 rounded-full transform -translate-x-1/2 -translate-y-1/2"
          animate={{ 
            scale: [1, 1.8, 1],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        
        {/* Enhanced corner accent lines */}
        <div className="absolute top-0 left-0 w-4 h-4 md:w-6 md:h-6 border-l-2 border-t-2 border-violet-400/60 rounded-tl-lg" />
        <div className="absolute top-0 right-0 w-4 h-4 md:w-6 md:h-6 border-r-2 border-t-2 border-violet-400/60 rounded-tr-lg" />
        <div className="absolute bottom-0 left-0 w-4 h-4 md:w-6 md:h-6 border-l-2 border-b-2 border-violet-400/60 rounded-bl-lg" />
        <div className="absolute bottom-0 right-0 w-4 h-4 md:w-6 md:h-6 border-r-2 border-b-2 border-violet-400/60 rounded-br-lg" />
      </motion.div>
      
      {/* Primary orbit - Tech symbols */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute -top-4 left-1/2 w-3 h-3 md:w-4 md:h-4 bg-purple-400 rounded-full transform -translate-x-1/2 flex items-center justify-center">
          <span className="text-white text-xs font-mono">λ</span>
        </div>
        <div className="absolute top-1/2 -right-4 w-2.5 h-2.5 md:w-3 md:h-3 bg-indigo-400 rounded-full transform -translate-y-1/2 flex items-center justify-center">
          <span className="text-white text-xs font-mono">∞</span>
        </div>
        <div className="absolute -bottom-4 left-1/2 w-3 h-3 md:w-4 md:h-4 bg-pink-400 rounded-full transform -translate-x-1/2 flex items-center justify-center">
          <span className="text-white text-xs font-mono">π</span>
        </div>
        <div className="absolute top-1/2 -left-4 w-2.5 h-2.5 md:w-3 md:h-3 bg-cyan-400 rounded-full transform -translate-y-1/2 flex items-center justify-center">
          <span className="text-white text-xs font-mono">Σ</span>
        </div>
      </motion.div>
      
      {/* Secondary orbit - Code elements */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ rotate: -360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute -top-6 left-1/4 w-2 h-2 md:w-3 md:h-3 bg-violet-300 rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-mono">&</span>
        </div>
        <div className="absolute top-1/4 -right-6 w-2 h-2 md:w-3 md:h-3 bg-purple-300 rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-mono">@</span>
        </div>
        <div className="absolute -bottom-6 right-1/4 w-2 h-2 md:w-3 md:h-3 bg-indigo-300 rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-mono">%</span>
        </div>
        <div className="absolute bottom-1/4 -left-6 w-2 h-2 md:w-3 md:h-3 bg-pink-300 rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-mono">#</span>
        </div>
      </motion.div>
      
      {/* Tertiary orbit - Binary elements */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute -top-2 left-1/3 w-1.5 h-1.5 bg-cyan-200 rounded-full flex items-center justify-center">
          <span className="text-slate-800 text-xs font-mono font-bold">1</span>
        </div>
        <div className="absolute top-1/3 -right-2 w-1.5 h-1.5 bg-purple-200 rounded-full flex items-center justify-center">
          <span className="text-slate-800 text-xs font-mono font-bold">0</span>
        </div>
        <div className="absolute -bottom-2 right-1/3 w-1.5 h-1.5 bg-indigo-200 rounded-full flex items-center justify-center">
          <span className="text-slate-800 text-xs font-mono font-bold">1</span>
        </div>
        <div className="absolute bottom-1/3 -left-2 w-1.5 h-1.5 bg-pink-200 rounded-full flex items-center justify-center">
          <span className="text-slate-800 text-xs font-mono font-bold">0</span>
        </div>
      </motion.div>
      
      {/* Quaternary orbit - AI/ML symbols */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute -top-8 right-1/3 w-2.5 h-2.5 bg-gradient-to-r from-purple-400 to-violet-400 rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-mono">AI</span>
        </div>
        <div className="absolute top-2/3 -right-8 w-2.5 h-2.5 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-mono">ML</span>
        </div>
        <div className="absolute -bottom-8 left-1/3 w-2.5 h-2.5 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-mono">NN</span>
        </div>
        <div className="absolute bottom-2/3 -left-8 w-2.5 h-2.5 bg-gradient-to-r from-cyan-400 to-indigo-400 rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-mono">DL</span>
        </div>
      </motion.div>
      
      {/* Fast inner orbit - Simple dots */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute top-1/6 left-1/2 w-1 h-1 bg-violet-400 rounded-full transform -translate-x-1/2" />
        <div className="absolute top-1/2 right-1/6 w-1 h-1 bg-purple-400 rounded-full transform -translate-y-1/2" />
        <div className="absolute bottom-1/6 left-1/2 w-1 h-1 bg-indigo-400 rounded-full transform -translate-x-1/2" />
        <div className="absolute top-1/2 left-1/6 w-1 h-1 bg-pink-400 rounded-full transform -translate-y-1/2" />
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
      <div className="z-10 relative max-w-6xl mx-auto px-4 w-full">
        {/* Main Content Container - Flexbox Layout */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-16">
          {/* Left Side - Enhanced 3D Development Icon */}
          <div className="flex-shrink-0">
            <CodeIcon3D />
          </div>
          
          {/* Right Side - Text Content (Right-aligned) */}
          <div className="flex-1 text-center lg:text-right lg:pt-8">
            {/* Main Name - Left aligned */}
            <motion.div
              variants={nameVariants}
              initial="hidden"
              animate="visible"
              className="mb-6"
            >
              <h1 className="relative">
                {/* Glow effect background */}
                <div 
                  className="absolute inset-0 bg-gradient-to-r from-purple-500/30 via-violet-500/30 to-indigo-500/30 blur-2xl scale-110 -z-10"
                  aria-hidden="true"
                />
                
                {/* Main text with reliable gradient */}
                <span 
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight bg-gradient-to-r from-white via-purple-100 to-violet-200 bg-clip-text text-transparent font-display leading-tight"
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
                  className="absolute inset-0 text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight font-display leading-tight opacity-0"
                  style={{ opacity: 'var(--text-fallback, 0)' }}
                  aria-hidden="true"
                >
                  {USER_INFO.name}
                </span>
              </h1>
            </motion.div>
            
            {/* Subtitle */}
            <motion.p
              variants={descriptionVariants}
              initial="hidden"
              animate="visible"
              className="text-base sm:text-lg md:text-xl text-gray-400 mb-10 max-w-2xl lg:max-w-none leading-relaxed"
            >
              1st Year B.Tech I.T at IIIT Sonepat 
            </motion.p>
            
            {/* Description */}
            <motion.p
              variants={descriptionVariants}
              initial="hidden"
              animate="visible"
              className="text-base sm:text-lg md:text-xl text-gray-400 mb-10 max-w-2xl lg:max-w-none leading-relaxed"
            >
              {USER_INFO.aspirations}
            </motion.p>

            <motion.h2
  variants={subtitleVariants}
  initial="hidden"
  animate="visible"
  className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-gray-300 mb-4 tracking-wide font-mono"
>
  Welcome to my Portfolio 
</motion.h2>
            
            {/* Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row justify-center lg:justify-end items-center gap-4"
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
        </div>
      </div>
    </Section>
  );
};

export default HeroSection;
