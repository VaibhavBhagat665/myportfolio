import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import Section from './ui/Section';
import { skillsData } from '../data/skillsData';
import { SkillCategory } from '../types';
import { CodeIcon, DatabaseIcon, BrainIcon, WrenchIcon, AcademicCapIcon } from './ui/Icons';

const categoryIcons: Record<SkillCategory, React.ReactNode> = {
  [SkillCategory.LANGUAGES]: <CodeIcon className="w-6 h-6 mr-2" />,
  [SkillCategory.FRONTEND]: <CodeIcon className="w-6 h-6 mr-2" />,
  [SkillCategory.AIML]: <BrainIcon className="w-6 h-6 mr-2" />,
  [SkillCategory.TOOLS]: <WrenchIcon className="w-6 h-6 mr-2" />,
  [SkillCategory.LEARNING]: <AcademicCapIcon className="w-6 h-6 mr-2" />,
};

const categoryColors: Record<SkillCategory, { primary: string; secondary: string; accent: string }> = {
  [SkillCategory.LANGUAGES]: { primary: 'from-blue-500/20 to-cyan-500/20', secondary: 'border-blue-400/30', accent: 'text-blue-300' },
  [SkillCategory.FRONTEND]: { primary: 'from-purple-500/20 to-pink-500/20', secondary: 'border-purple-400/30', accent: 'text-purple-300' },
  [SkillCategory.AIML]: { primary: 'from-green-500/20 to-emerald-500/20', secondary: 'border-green-400/30', accent: 'text-green-300' },
  [SkillCategory.TOOLS]: { primary: 'from-orange-500/20 to-red-500/20', secondary: 'border-orange-400/30', accent: 'text-orange-300' },
  [SkillCategory.LEARNING]: { primary: 'from-yellow-500/20 to-amber-500/20', secondary: 'border-yellow-400/30', accent: 'text-yellow-300' },
};

const SkillBadge: React.FC<{ 
  name: string; 
  icon?: React.ReactNode; 
  colors: { primary: string; secondary: string; accent: string };
  index: number;
}> = ({ name, icon, colors, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-100, 100], [15, -15]));
  const rotateY = useSpring(useTransform(mouseX, [-100, 100], [-15, 15]));

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(event.clientX - centerX);
    mouseY.set(event.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden rounded-xl cursor-pointer group ${colors.secondary}`}
      style={{
        perspective: 1000,
        transformStyle: 'preserve-3d',
      }}
      initial={{ opacity: 0, y: 50, rotateX: -10 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ z: 50 }}
    >
      {/* Holographic border effect */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${colors.primary} blur-sm`}></div>
        <div className="absolute inset-[1px] rounded-xl bg-card-dark"></div>
      </div>

      {/* 3D card content */}
      <motion.div
        className={`relative z-10 p-4 rounded-xl bg-gradient-to-br ${colors.primary} backdrop-blur-sm border ${colors.secondary} shadow-lg`}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{ 
          scale: 1.05,
          boxShadow: "0px 25px 50px rgba(0,0,0,0.3)",
        }}
      >
        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden rounded-xl">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-1 h-1 ${colors.accent.replace('text-', 'bg-')} rounded-full opacity-40`}
              style={{
                left: `${20 + i * 15}%`,
                top: `${10 + (i % 3) * 30}%`,
              }}
              animate={{
                y: [-10, 10, -10],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 2 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Skill content */}
        <div className="relative z-20 flex items-center">
          {icon && (
            <motion.span 
              className={`mr-3 ${colors.accent}`}
              style={{ translateZ: 20 }}
              animate={{ rotateY: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              {icon}
            </motion.span>
          )}
          <motion.span 
            className="text-sm font-medium text-text-primary"
            style={{ translateZ: 15 }}
          >
            {name}
          </motion.span>
        </div>

        {/* Glow effect */}
        <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${colors.primary} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
      </motion.div>
    </motion.div>
  );
};

const SkillsSection: React.FC<{ id: string }> = ({ id }) => {
  const groupedSkills = skillsData.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<SkillCategory, typeof skillsData>);

  const categoryOrder: SkillCategory[] = [
    SkillCategory.LANGUAGES,
    SkillCategory.FRONTEND,
    SkillCategory.AIML,
    SkillCategory.TOOLS,
    SkillCategory.LEARNING,
  ];
  
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const categoryVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.05 } },
  };

  return (
    <Section id={id} title="My Tech Arsenal">
      {/* Animated background grid */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent-teal/5 to-transparent animate-pulse"></div>
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px h-20 bg-gradient-to-b from-transparent via-accent-teal/20 to-transparent"
            style={{
              left: `${i * 5}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scaleY: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              delay: i * 0.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <motion.div 
        className="relative z-10 space-y-16"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {categoryOrder.map((categoryName, categoryIndex) => {
          const skillsInCategory = groupedSkills[categoryName];
          if (!skillsInCategory || skillsInCategory.length === 0) return null;

          const colors = categoryColors[categoryName];

          return (
            <motion.div key={categoryName} className="mb-12" variants={categoryVariants}>
              {/* Category header with 3D effect */}
              <motion.div 
                className="relative mb-8"
                whileHover={{ scale: 1.02 }}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${colors.primary} blur-xl opacity-30 rounded-2xl`}></div>
                <div className={`relative z-10 flex items-center p-4 rounded-2xl bg-gradient-to-r ${colors.primary} backdrop-blur-sm border ${colors.secondary}`}>
                  <motion.span 
                    className={colors.accent}
                    animate={{ rotateY: [0, 360] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  >
                    {categoryIcons[categoryName]}
                  </motion.span>
                  <h3 className="text-2xl font-display font-semibold text-text-primary ml-2">
                    {categoryName}
                  </h3>
                  
                  {/* Skill count indicator */}
                  <motion.div 
                    className={`ml-auto px-3 py-1 rounded-full bg-gradient-to-r ${colors.primary} ${colors.secondary} border`}
                    whileHover={{ scale: 1.1 }}
                  >
                    <span className={`text-sm font-medium ${colors.accent}`}>
                      {skillsInCategory.length} skills
                    </span>
                  </motion.div>
                </div>
              </motion.div>

              {/* Skills grid with 3D perspective */}
              <div 
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
                style={{ perspective: 1000 }}
              >
                {skillsInCategory.map((skill, index) => (
                  <SkillBadge 
                    key={skill.id} 
                    name={skill.name} 
                    icon={skill.icon && <skill.icon className="w-5 h-5" />} 
                    colors={colors}
                    index={index}
                  />
                ))}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </Section>
  );
};

export default SkillsSection;