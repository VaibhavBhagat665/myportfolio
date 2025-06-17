import React, { useRef, useState } from 'react';
import { motion, Variants, Easing, useMotionValue, useTransform, useSpring } from 'framer-motion';
import Section from './ui/Section';
import { projectsData } from '../data/projectsData';
import { Project } from '../types';
import { GithubIcon, ExternalLinkIcon } from './ui/Icons'; 

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [15, -15]));
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-15, 15]));
  const translateZ = useSpring(isHovered ? 50 : 0);

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

  const cardVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 100, 
      scale: 0.8,
      rotateX: -20,
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      rotateX: 0,
      transition: { 
        duration: 0.8, 
        delay: index * 0.2, 
        ease: "easeOut" as Easing,
        type: "spring",
        stiffness: 100
      }
    }
  };

  // Dynamic gradient based on project index
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
      variants={cardVariants}
      className="relative group cursor-pointer"
      style={{
        perspective: 1000,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
    >
      {/* Holographic glow effect */}
      <div className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${currentGradient} blur-xl`}></div>
      </div>

      {/* Main card */}
      <motion.div
        className={`relative bg-card-dark rounded-2xl overflow-hidden shadow-2xl border ${currentBorder} flex flex-col h-full`}
        style={{
          rotateX,
          rotateY,
          translateZ,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-accent-teal rounded-full opacity-30"
              style={{
                left: `${10 + i * 12}%`,
                top: `${5 + (i % 4) * 25}%`,
              }}
              animate={{
                y: [-5, 15, -5],
                x: [-2, 2, -2],
                opacity: [0.1, 0.6, 0.1],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
            />
          ))}
        </div>

        {/* Project image with 3D effect */}
        <div className="relative h-56 w-full overflow-hidden">
          <motion.img 
            src={project.imageUrl} 
            alt={project.title} 
            className="w-full h-full object-cover"
            style={{ translateZ: 20 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5 }}
          />
          
          {/* Overlay with depth */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"
            style={{ translateZ: 30 }}
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Project year badge */}
          <motion.div 
            className="absolute top-4 right-4 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full border border-accent-teal/30"
            style={{ translateZ: 40 }}
            whileHover={{ scale: 1.1 }}
          >
            <span className="text-accent-teal text-sm font-medium">{project.year}</span>
          </motion.div>
        </div>

        {/* Content area */}
        <motion.div 
          className="p-6 flex flex-col flex-grow"
          style={{ translateZ: 25 }}
        >
          {/* Project title */}
          <motion.h3 
            className="text-xl font-display font-semibold mb-3 text-text-primary group-hover:text-accent-teal transition-colors"
            style={{ translateZ: 30 }}
          >
            {project.title}
          </motion.h3>
          
          {/* Description */}
          <motion.p 
            className="text-text-secondary text-sm mb-4 flex-grow leading-relaxed"
            style={{ translateZ: 20 }}
          >
            {project.description}
          </motion.p>
          
          {/* Tech stack with enhanced styling */}
          <motion.div 
            className="mb-6"
            style={{ translateZ: 25 }}
          >
            <p className="text-xs text-accent-purple font-semibold mb-3 flex items-center">
              <span className="w-2 h-2 bg-accent-purple rounded-full mr-2"></span>
              Tech Stack
            </p>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech, techIndex) => (
                <motion.span 
                  key={tech} 
                  className="bg-gradient-to-r from-accent-teal/20 to-accent-purple/20 text-accent-teal px-3 py-1 rounded-full text-xs border border-accent-teal/20 backdrop-blur-sm"
                  style={{ translateZ: 15 }}
                  whileHover={{ 
                    scale: 1.1,
                    backgroundColor: 'rgba(45, 212, 191, 0.1)',
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + techIndex * 0.05 }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
          
          {/* Action buttons with 3D effect */}
          <motion.div 
            className="mt-auto flex space-x-4"
            style={{ translateZ: 35 }}
          >
            {project.githubUrl && (
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-gray-800 to-gray-700 text-white rounded-lg text-sm font-medium transition-all duration-300 border border-gray-600 hover:border-accent-teal group/btn"
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                  boxShadow: "0px 10px 20px rgba(0,0,0,0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <motion.div style={{ translateZ: 5 }}>
                  <GithubIcon className="w-4 h-4 mr-2 group-hover/btn:text-accent-teal transition-colors" />
                  GitHub
                </motion.div>
              </motion.a>
            )}
            {project.demoUrl && (
              <motion.a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-accent-teal to-accent-purple text-white rounded-lg text-sm font-medium transition-all duration-300 border border-accent-teal/30 group/btn"
                whileHover={{ 
                  scale: 1.05,
                  rotateY: -5,
                  boxShadow: "0px 10px 20px rgba(45, 212, 191, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <motion.div style={{ translateZ: 5 }}>
                  <ExternalLinkIcon className="w-4 h-4 mr-2" />
                  Demo
                </motion.div>
              </motion.a>
            )}
          </motion.div>
        </motion.div>

        {/* Subtle inner glow */}
        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${currentGradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none`}></div>
      </motion.div>
    </motion.div>
  );
};

const ProjectsSection: React.FC<{ id: string }> = ({ id }) => {
  return (
    <Section id={id} title="Featured Projects" className="bg-background-light relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        {/* Floating geometric shapes */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-20 h-20 border border-accent-teal/10 rounded-lg"
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 30}%`,
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
        
        {/* Gradient orbs */}
        <motion.div
          className="absolute w-96 h-96 bg-gradient-to-r from-accent-teal/10 to-accent-purple/10 rounded-full blur-3xl"
          style={{ top: '10%', left: '80%' }}
          animate={{
            x: [-100, 100, -100],
            y: [-50, 50, -50],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <motion.div 
        className="relative z-10 grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        style={{ perspective: 1000 }}
      >
        {projectsData.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index}/>
        ))}
      </motion.div>
      
      {projectsData.length === 0 && (
        <motion.div 
          className="text-center py-20"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-accent-teal/20 to-accent-purple/20 blur-xl rounded-full"></div>
            <p className="relative text-text-secondary text-lg bg-card-dark p-8 rounded-2xl border border-border-dark">
              More projects coming soon! Currently brewing some exciting ideas.
            </p>
          </div>
        </motion.div>
      )}
    </Section>
  );
};

export default ProjectsSection;