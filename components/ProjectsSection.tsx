import React, { useRef, useState, useEffect } from 'react';
import { motion, Variants, Easing, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import Section from './ui/Section';
import { projectsData } from '../data/projectsData';
import { Project } from '../types';
import { GithubIcon, ExternalLinkIcon } from './ui/Icons';

const ProjectCard: React.FC<{ 
  project: Project; 
  index: number; 
  onCardClick: (index: number) => void;
}> = ({ project, index, onCardClick }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-150, 150], [8, -8]));
  const rotateY = useSpring(useTransform(mouseX, [-150, 150], [-8, 8]));
  const translateZ = useSpring(isHovered ? 20 : 0);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(event.clientX - centerX);
    mouseY.set(event.clientY - centerY);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const gradients = [
    'from-blue-500/20 via-purple-500/20 to-pink-500/20',
    'from-green-500/20 via-teal-500/20 to-blue-500/20',
    'from-orange-500/20 via-red-500/20 to-pink-500/20',
    'from-purple-500/20 via-indigo-500/20 to-blue-500/20',
    'from-teal-500/20 via-green-500/20 to-emerald-500/20',
    'from-pink-500/20 via-rose-500/20 to-red-500/20',
  ];
  
  const borderGradients = [
    'border-blue-400/30',
    'border-teal-400/30', 
    'border-orange-400/30',
    'border-purple-400/30',
    'border-green-400/30',
    'border-pink-400/30',
  ];

  const currentGradient = gradients[index % gradients.length];
  const currentBorder = borderGradients[index % borderGradients.length];

  return (
    <motion.div
      ref={cardRef}
      className="cursor-pointer group"
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onCardClick(index)}
      whileHover={{ scale: 1.02, y: -8 }}
      style={{ perspective: 1000 }}
    >
      {/* Holographic glow effect */}
      <motion.div 
        className="absolute -inset-2 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        animate={{
          background: [
            `linear-gradient(45deg, ${currentGradient.replace(/from-|via-|to-/g, '').replace(/\/\d+/g, '/30')})`,
            `linear-gradient(135deg, ${currentGradient.replace(/from-|via-|to-/g, '').replace(/\/\d+/g, '/40')})`,
            `linear-gradient(225deg, ${currentGradient.replace(/from-|via-|to-/g, '').replace(/\/\d+/g, '/30')})`,
          ]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute inset-0 rounded-2xl blur-xl"></div>
      </motion.div>

      {/* Main card */}
      <motion.div
        className={`relative bg-card-dark rounded-2xl overflow-hidden shadow-2xl border ${currentBorder} backdrop-blur-sm`}
        style={{
          rotateX,
          rotateY,
          translateZ,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Project image with overlay effects */}
        <div className="relative h-48 w-full overflow-hidden">
          <motion.img 
            src={project.imageUrl} 
            alt={project.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            style={{ translateZ: 10 }}
          />
          
          {/* Animated overlay */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"
            animate={{
              background: [
                'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                `linear-gradient(to top, rgba(45,212,191,0.3), transparent)`,
                'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
              ]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Year badge with animation */}
          <motion.div 
            className="absolute top-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full border border-accent-teal/40"
            style={{ translateZ: 20 }}
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
            whileHover={{ scale: 1.1, rotateY: 180 }}
          >
            <span className="text-accent-teal text-sm font-medium">{project.year}</span>
          </motion.div>

          {/* Floating particles */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-accent-teal/60 rounded-full"
              style={{
                left: `${20 + i * 30}%`,
                top: `${30 + i * 20}%`,
              }}
              animate={{
                y: [-10, -20, -10],
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 2 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
            />
          ))}
        </div>

        {/* Content area with enhanced animations */}
        <motion.div 
          className="p-6 relative"
          style={{ translateZ: 15 }}
        >
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-5">
            <motion.div
              className="w-full h-full"
              style={{
                backgroundImage: `radial-gradient(circle at 20% 50%, ${currentGradient.split(' ')[1]} 0%, transparent 50%),
                                  radial-gradient(circle at 80% 50%, ${currentGradient.split(' ')[3]} 0%, transparent 50%)`,
              }}
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
          </div>

          {/* Project title with typewriter effect */}
          <motion.h3 
            className="text-xl font-display font-bold mb-3 text-text-primary group-hover:text-accent-teal transition-colors duration-300 relative z-10"
            style={{ translateZ: 20 }}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + 0.2 }}
          >
            {project.title}
            <motion.span
              className="inline-block w-0.5 h-6 bg-accent-teal ml-1 opacity-0 group-hover:opacity-100"
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.h3>
          
          {/* Description with reveal animation */}
          <motion.p 
            className="text-text-secondary text-sm mb-4 line-clamp-2 relative z-10"
            style={{ translateZ: 15 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.3 }}
          >
            {project.description}
          </motion.p>
          
          {/* Tech stack with staggered animations */}
          <motion.div 
            className="flex flex-wrap gap-2 mb-4 relative z-10"
            style={{ translateZ: 10 }}
          >
            {project.stack.slice(0, 3).map((tech, techIndex) => (
              <motion.span 
                key={tech} 
                className="bg-gradient-to-r from-accent-teal/20 to-accent-purple/20 text-accent-teal px-3 py-1 rounded-full text-xs border border-accent-teal/30 backdrop-blur-sm font-medium"
                initial={{ opacity: 0, scale: 0, rotate: -180 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ 
                  delay: index * 0.1 + 0.4 + techIndex * 0.1,
                  type: "spring",
                  stiffness: 200
                }}
                whileHover={{ 
                  scale: 1.1, 
                  backgroundColor: 'rgba(45, 212, 191, 0.3)',
                  boxShadow: '0 0 20px rgba(45, 212, 191, 0.4)'
                }}
              >
                {tech}
              </motion.span>
            ))}
            {project.stack.length > 3 && (
              <motion.span 
                className="text-accent-teal text-xs px-3 py-1 bg-accent-teal/10 rounded-full border border-accent-teal/30"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 + 0.7 }}
                whileHover={{ scale: 1.1 }}
              >
                +{project.stack.length - 3}
              </motion.span>
            )}
          </motion.div>
          
          {/* Interactive call-to-action */}
          <motion.div 
            className="flex items-center justify-between relative z-10"
            style={{ translateZ: 25 }}
          >
            <motion.span 
              className="text-sm text-accent-purple group-hover:text-accent-teal transition-colors duration-300 font-medium"
              animate={{
                x: [0, 5, 0],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              Click to explore →
            </motion.span>
            
            {/* Quick action buttons */}
            <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {project.githubUrl && (
                <motion.div
                  className="w-8 h-8 bg-gray-800/80 rounded-full flex items-center justify-center text-white hover:bg-accent-teal transition-colors"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <GithubIcon className="w-4 h-4" />
                </motion.div>
              )}
              {project.demoUrl && (
                <motion.div
                  className="w-8 h-8 bg-accent-teal/80 rounded-full flex items-center justify-center text-white hover:bg-accent-purple transition-colors"
                  whileHover={{ scale: 1.2, rotate: -10 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ExternalLinkIcon className="w-4 h-4" />
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* Subtle inner glow with animation */}
        <motion.div 
          className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${currentGradient} opacity-0 group-hover:opacity-10 pointer-events-none`}
          animate={{
            opacity: [0, 0.05, 0],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Border shine effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 border-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(45deg, transparent, ${currentGradient.split(' ')[1]}, transparent) border-box`,
            WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
          }}
          animate={{
            background: [
              `linear-gradient(45deg, transparent, ${currentGradient.split(' ')[1]}, transparent)`,
              `linear-gradient(135deg, transparent, ${currentGradient.split(' ')[3]}, transparent)`,
              `linear-gradient(225deg, transparent, ${currentGradient.split(' ')[1]}, transparent)`,
            ]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>
    </motion.div>
  );
};

const ProjectStoryCard: React.FC<{ 
  project: Project; 
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
  currentIndex: number;
  totalProjects: number;
}> = ({ project, onClose, onPrevious, onNext, currentIndex, totalProjects }) => {
  const gradients = [
    { 
      bg: 'from-blue-500/20 via-purple-500/20 to-pink-500/20',
      accent: 'from-blue-400 to-purple-400',
      glow: 'rgba(59, 130, 246, 0.3)'
    },
    { 
      bg: 'from-green-500/20 via-teal-500/20 to-blue-500/20',
      accent: 'from-green-400 to-teal-400',
      glow: 'rgba(34, 197, 94, 0.3)'
    },
    { 
      bg: 'from-orange-500/20 via-red-500/20 to-pink-500/20',
      accent: 'from-orange-400 to-red-400',
      glow: 'rgba(249, 115, 22, 0.3)'
    },
    { 
      bg: 'from-purple-500/20 via-indigo-500/20 to-blue-500/20',
      accent: 'from-purple-400 to-indigo-400',
      glow: 'rgba(147, 51, 234, 0.3)'
    },
    { 
      bg: 'from-teal-500/20 via-green-500/20 to-emerald-500/20',
      accent: 'from-teal-400 to-emerald-400',
      glow: 'rgba(20, 184, 166, 0.3)'
    },
    { 
      bg: 'from-pink-500/20 via-rose-500/20 to-red-500/20',
      accent: 'from-pink-400 to-rose-400',
      glow: 'rgba(236, 72, 153, 0.3)'
    },
  ];

  const currentTheme = gradients[currentIndex % gradients.length];

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: `linear-gradient(45deg, ${currentTheme.accent})`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, -40, -20],
              opacity: [0.2, 0.8, 0.2],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Navigation buttons with enhanced animations */}
      <motion.button
        className="absolute left-8 top-1/2 -translate-y-1/2 w-16 h-16 bg-card-dark/80 backdrop-blur-sm border border-accent-teal/40 rounded-2xl flex items-center justify-center text-accent-teal hover:bg-accent-teal/20 transition-all duration-300 z-10 group hidden md:flex"
        onClick={(e) => {
          e.stopPropagation();
          onPrevious();
        }}
        whileHover={{ scale: 1.1, x: -5 }}
        whileTap={{ scale: 0.9 }}
        initial={{ x: -100, opacity: 0, rotate: -180 }}
        animate={{ x: 0, opacity: 1, rotate: 0 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      >
        <motion.svg 
          className="w-8 h-8" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          animate={{ x: [-2, 0, -2] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </motion.svg>
        
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl bg-gradient-to-r from-accent-teal/20 to-accent-purple/20 opacity-0 group-hover:opacity-100 blur-xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.button>

      <motion.button
        className="absolute right-8 top-1/2 -translate-y-1/2 w-16 h-16 bg-card-dark/80 backdrop-blur-sm border border-accent-teal/40 rounded-2xl flex items-center justify-center text-accent-teal hover:bg-accent-teal/20 transition-all duration-300 z-10 group hidden md:flex"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        whileHover={{ scale: 1.1, x: 5 }}
        whileTap={{ scale: 0.9 }}
        initial={{ x: 100, opacity: 0, rotate: 180 }}
        animate={{ x: 0, opacity: 1, rotate: 0 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      >
        <motion.svg 
          className="w-8 h-8" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          animate={{ x: [0, 2, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </motion.svg>
        
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl bg-gradient-to-r from-accent-teal/20 to-accent-purple/20 opacity-0 group-hover:opacity-100 blur-xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.button>

      {/* Enhanced story card */}
      <motion.div
  className="relative max-w-5xl mx-auto bg-card-dark/95 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-accent-teal/40 m-6 md:max-w-3xl"
  initial={{ scale: 0.5, opacity: 0, y: 100, rotateX: -30 }}
  animate={{ scale: 1, opacity: 1, y: 0, rotateX: 0 }}
  exit={{ scale: 0.5, opacity: 0, y: 100, rotateX: 30 }}
  transition={{ type: "spring", damping: 20, stiffness: 200 }}
  onClick={(e) => e.stopPropagation()}
  style={{ perspective: 1000 }}
  drag="x"
  dragConstraints={{ left: 0, right: 0 }}
  onDragEnd={(event, info) => {
    if (window.innerWidth < 768) { // Only on mobile
      if (info.offset.x > 100) {
        onPrevious();
      } else if (info.offset.x < -100) {
        onNext();
      }
    }
  }}
>
        {/* Animated holographic glow */}
        <motion.div 
          className="absolute -inset-1 rounded-3xl opacity-60"
          animate={{
            background: [
              `linear-gradient(45deg, ${currentTheme.bg})`,
              `linear-gradient(135deg, ${currentTheme.bg})`,
              `linear-gradient(225deg, ${currentTheme.bg})`,
              `linear-gradient(315deg, ${currentTheme.bg})`,
            ]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        >
          <motion.div 
            className="absolute inset-0 rounded-3xl blur-2xl"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Close button with enhanced animation */}
        <motion.button
          className="absolute top-6 right-6 w-12 h-12 bg-black/60 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white hover:bg-accent-teal/30 transition-all duration-300 z-20 group"
          onClick={onClose}
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: 0.5, type: "spring" }}
        >
          <motion.svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </motion.svg>
          
          {/* Button glow */}
          <motion.div
            className="absolute inset-0 rounded-2xl bg-accent-teal/20 opacity-0 group-hover:opacity-100 blur-lg"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.button>

        {/* Enhanced project counter */}
        <motion.div 
          className="absolute top-6 left-6 px-6 py-3 bg-black/60 backdrop-blur-sm rounded-2xl border border-accent-teal/40 z-20"
          initial={{ opacity: 0, y: -30, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
        >
          <motion.span 
            className={`text-transparent bg-clip-text bg-gradient-to-r ${currentTheme.accent} font-bold text-lg`}
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            {currentIndex + 1} / {totalProjects}
          </motion.span>
        </motion.div>

        <div className="relative grid lg:grid-cols-2 gap-0">
          {/* Enhanced image section */}
          <motion.div 
            className="relative h-48 lg:h-44 overflow-hidden"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 100 }}
          >
            <motion.img 
              src={project.imageUrl} 
              alt={project.title} 
              className="w-full h-full object-cover"
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
            
            {/* Enhanced gradient overlay */}
            <motion.div 
              className="absolute inset-0"
              animate={{
                background: [
                  'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)',
                  `linear-gradient(to top, ${currentTheme.glow} 0%, transparent 60%)`,
                  'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)',
                ]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            
            {/* Floating year badge */}
            <motion.div 
              className="absolute bottom-6 left-6 px-6 py-3 bg-black/60 backdrop-blur-sm rounded-2xl border border-accent-teal/40"
              initial={{ opacity: 0, y: 30, rotate: -10 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ delay: 0.4, type: "spring" }}
              whileHover={{ scale: 1.05, rotate: 2 }}
            >
              <motion.span 
                className={`text-transparent bg-clip-text bg-gradient-to-r ${currentTheme.accent} font-bold text-xl`}
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                {project.year}
              </motion.span>
            </motion.div>

            {/* Animated particles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  background: `linear-gradient(45deg, ${currentTheme.accent})`,
                  left: `${20 + i * 15}%`,
                  top: `${20 + (i % 3) * 20}%`,
                }}
                animate={{
                  y: [-20, -40, -20],
                  opacity: [0.3, 1, 0.3],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 2 + i * 0.3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.2,
                }}
              />
            ))}
          </motion.div>

          {/* Enhanced content section */}
          <motion.div 
            className="p-4 lg:p-6 flex flex-col justify-center relative"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
          >
            {/* Animated background pattern */}
            <motion.div
              className="absolute inset-0 opacity-5"
              animate={{
                backgroundImage: [
                  `radial-gradient(circle at 20% 20%, ${currentTheme.glow} 0%, transparent 50%)`,
                  `radial-gradient(circle at 80% 80%, ${currentTheme.glow} 0%, transparent 50%)`,
                  `radial-gradient(circle at 20% 20%, ${currentTheme.glow} 0%, transparent 50%)`,
                ],
                backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />

            {/* Enhanced title with typing animation */}
            <motion.h2 
              className={`text-4xl lg:text-5xl font-display font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r ${currentTheme.accent} relative`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, type: "spring" }}
            >
              {project.title}
              <motion.div
                className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-accent-teal to-accent-purple rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
              />
            </motion.h2>
            
            {/* Enhanced description */}
            <motion.p 
              className="text-text-secondary text-lg leading-relaxed mb-8 relative z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {project.description}
            </motion.p>
            
            {/* Enhanced tech stack */}
            <motion.div 
  className="mb-8 relative z-10"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.5, duration: 0.6 }}
>
  <motion.h4 
    className="text-accent-teal font-semibold mb-4 text-lg"
    animate={{ opacity: [0.7, 1, 0.7] }}
    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
  >
    Tech Stack
  </motion.h4>
  <div className="flex flex-wrap gap-3">
    {project.stack.map((tech, techIndex) => (
      <motion.span 
        key={tech} 
        className={`bg-gradient-to-r ${currentTheme.bg} text-accent-teal px-4 py-2 rounded-xl text-sm border border-accent-teal/30 backdrop-blur-sm font-medium relative overflow-hidden group`}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          delay: 0.6 + techIndex * 0.1,
          type: "spring",
          stiffness: 300,
          damping: 20
        }}
        whileHover={{ 
          scale: 1.05,
          boxShadow: `0 0 20px ${currentTheme.glow}`
        }}
      >
        {tech}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
        />
      </motion.span>
    ))}
  </div>
</motion.div>
            
            {/* Enhanced action buttons */}
            <motion.div 
              className="flex flex-wrap gap-4 relative z-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              {project.githubUrl && (
                <motion.a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 px-6 py-3 bg-gray-800/80 backdrop-blur-sm text-white rounded-xl border border-gray-600/50 hover:bg-accent-teal/20 hover:border-accent-teal/50 transition-all duration-300 group"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <GithubIcon className="w-5 h-5" />
                  </motion.div>
                  <span className="font-medium">View Code</span>
                  
                  {/* Button glow */}
                  <motion.div
                    className="absolute inset-0 rounded-xl bg-accent-teal/10 opacity-0 group-hover:opacity-100 blur-sm"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                </motion.a>
              )}
              
              {project.demoUrl && (
                <motion.a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center space-x-3 px-6 py-3 bg-gradient-to-r ${currentTheme.accent} text-white rounded-xl border border-accent-teal/50 hover:shadow-lg hover:shadow-accent-teal/25 transition-all duration-300 group relative overflow-hidden`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <motion.div
                    animate={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <ExternalLinkIcon className="w-5 h-5" />
                  </motion.div>
                  <span className="font-medium relative z-10">Live Demo</span>
                  
                  {/* Animated background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                  />
                  
                  {/* Button pulse */}
                  <motion.div
                    className="absolute inset-0 rounded-xl bg-white/10"
                    animate={{ opacity: [0, 0.3, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                </motion.a>
              )}
            </motion.div>
          </motion.div>
        </div>

        {/* Enhanced progress indicator */}
        <motion.div 
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          {projectsData.map((_, index) => (
            <motion.div
              key={index}
              className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                index === currentIndex 
                  ? `bg-gradient-to-r ${currentTheme.accent} border-transparent shadow-lg` 
                  : 'bg-transparent border-accent-teal/40 hover:border-accent-teal/60'
              }`}
              whileHover={{ scale: 1.2 }}
              animate={index === currentIndex ? {
                scale: [1, 1.2, 1],
                boxShadow: [`0 0 0px ${currentTheme.glow}`, `0 0 20px ${currentTheme.glow}`, `0 0 0px ${currentTheme.glow}`]
              } : {}}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const handleCardClick = (index: number) => {
    setSelectedProject(index);
  };

  const handleCloseStory = () => {
    setSelectedProject(null);
  };

  const handlePrevious = () => {
    setSelectedProject(prev => 
      prev !== null ? (prev - 1 + projectsData.length) % projectsData.length : null
    );
  };

  const handleNext = () => {
    setSelectedProject(prev => 
      prev !== null ? (prev + 1) % projectsData.length : null
    );
  };

  return (
    <Section id="projects" title="Featured Projects">
      {/* Enhanced animated background */}
      <div className="absolute inset-0 overflow-hidden">
    {[...Array(15)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-accent-teal/30 rounded-full"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          y: [-10, -30, -10],
          opacity: [0.2, 0.8, 0.2],
          scale: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 4 + Math.random() * 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: Math.random() * 3,
        }}
      />
    ))}
  </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Enhanced section header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          
         
          
          <motion.p 
            className="text-text-secondary text-xl max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Explore my journey through innovative web applications, creative solutions, 
            and cutting-edge technologies that bring ideas to life.
          </motion.p>
        </motion.div>

        {/* Enhanced projects grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {projectsData.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onCardClick={handleCardClick}
            />
          ))}
        </motion.div>

        {/* Call-to-action section */}
        <motion.div 
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <motion.p 
            className="text-text-secondary text-lg mb-8"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            Want to see more of my work? Check out my GitHub for additional projects and contributions.
          </motion.p>
          
          <motion.a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-accent-teal to-accent-purple text-white rounded-2xl border border-accent-teal/50 hover:shadow-lg hover:shadow-accent-teal/25 transition-all duration-300 group relative overflow-hidden"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <GithubIcon className="w-6 h-6" />
            </motion.div>
            <span className="font-medium text-lg relative z-10">View All Projects</span>
            
            {/* Animated background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
            />
          </motion.a>
        </motion.div>
      </div>

      {/* Enhanced project story modal */}
      <AnimatePresence>
        {selectedProject !== null && (
          <ProjectStoryCard
            project={projectsData[selectedProject]}
            onClose={handleCloseStory}
            onPrevious={handlePrevious}
            onNext={handleNext}
            currentIndex={selectedProject}
            totalProjects={projectsData.length}
          />
        )}
      </AnimatePresence>
    </Section>
  );
};

export default Projects;
