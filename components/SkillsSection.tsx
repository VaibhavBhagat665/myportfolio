import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import Section from './ui/Section';
import { SkillCategory } from '../types';
import { CodeIcon, BrainIcon, WrenchIcon, AcademicCapIcon } from './ui/Icons';

const skillsData = {
  [SkillCategory.LANGUAGES]: [
    { id: 1, name: 'Python', branch: 'Core Languages' },
    { id: 2, name: 'Java', branch: 'Core Languages' },
    { id: 3, name: 'C++', branch: 'Core Languages' },
    { id: 4, name: 'JavaScript', branch: 'Web Languages' },
    { id: 5, name: 'TypeScript', branch: 'Web Languages' },
  ],
  [SkillCategory.AIML]: [
    { id: 6, name: 'Regression', branch: 'Machine Learning' },
    { id: 7, name: 'Classification', branch: 'Machine Learning' },
    { id: 8, name: 'scikit-learn', branch: 'Machine Learning' },
    { id: 9, name: 'pandas', branch: 'Data Processing' },
    { id: 10, name: 'NumPy', branch: 'Data Processing' },
    { id: 11, name: 'Model Evaluation', branch: 'Data Processing' },
    { id: 12, name: 'Matplotlib', branch: 'Data Visualization' },
  ],
  [SkillCategory.FRONTEND]: [
    { id: 13, name: 'HTML', branch: 'Frontend' },
    { id: 14, name: 'CSS', branch: 'Frontend' },
    { id: 15, name: 'JavaScript', branch: 'Frontend' },
    { id: 16, name: 'Node.js', branch: 'Backend' },
    { id: 17, name: 'Express', branch: 'Backend' },
    { id: 18, name: 'React', branch: 'Frameworks' },
    { id: 19, name: 'Next.js', branch: 'Frameworks' },
    { id: 20, name: 'Three.js', branch: 'Frameworks' },
    { id: 21, name: 'Tailwind CSS', branch: 'Styling Tools' },
    { id: 22, name: 'Bootstrap', branch: 'Styling Tools' },
  ],
  [SkillCategory.TOOLS]: [
    { id: 23, name: 'Git', branch: 'Version Control' },
    { id: 24, name: 'GitHub', branch: 'Version Control' },
    { id: 25, name: 'VS Code', branch: 'Development Environment' },
    { id: 26, name: 'Jupyter Notebook', branch: 'Data Science Tools' },
    { id: 27, name: 'Google Colab', branch: 'Data Science Tools' },
  ],
};

const categoryIcons: Record<SkillCategory, React.ReactNode> = {
  [SkillCategory.LANGUAGES]: <CodeIcon className="w-5 h-5" />,
  [SkillCategory.FRONTEND]: <CodeIcon className="w-5 h-5" />,
  [SkillCategory.AIML]: <BrainIcon className="w-5 h-5" />,
  [SkillCategory.TOOLS]: <WrenchIcon className="w-5 h-5" />,
  [SkillCategory.LEARNING]: <AcademicCapIcon className="w-5 h-5" />,
};

const categoryColors: Record<SkillCategory, string> = {
  [SkillCategory.LANGUAGES]: 'from-blue-500 to-cyan-400',
  [SkillCategory.FRONTEND]: 'from-purple-500 to-pink-400',
  [SkillCategory.AIML]: 'from-green-500 to-emerald-400',
  [SkillCategory.TOOLS]: 'from-orange-500 to-red-400',
  [SkillCategory.LEARNING]: 'from-yellow-500 to-amber-400',
};

const SkillCard: React.FC<{ 
  skill: any; 
  index: number; 
  color: string;
}> = ({ skill, index, color }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-50, 50], [8, -8]));
  const rotateY = useSpring(useTransform(mouseX, [-50, 50], [-8, 8]));

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
      className="relative group cursor-pointer"
      style={{ perspective: 1000 }}
      initial={{ opacity: 0, y: 30, rotateX: -15 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.05,
        type: "spring",
        stiffness: 120
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ z: 20 }}
    >
      <motion.div
        className={`relative p-3 rounded-lg bg-gradient-to-r ${color} shadow-lg border border-white/10 backdrop-blur-sm`}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{ 
          scale: 1.05,
          boxShadow: "0px 15px 30px rgba(0,0,0,0.4)",
        }}
      >
        <motion.div 
          className="text-center"
          style={{ translateZ: 10 }}
        >
          <span className="text-xs font-medium text-white/90 tracking-wide">
            {skill.name}
          </span>
        </motion.div>

        <div className={`absolute inset-0 rounded-lg bg-gradient-to-r ${color} opacity-0 group-hover:opacity-40 transition-opacity duration-300 blur-sm`}></div>
      </motion.div>
    </motion.div>
  );
};

const CategoryHeader: React.FC<{
  category: SkillCategory;
  color: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ category, color, isActive, onClick }) => {
  return (
    <motion.button
      className={`relative flex items-center justify-center p-3 rounded-xl transition-all duration-300 ${
        isActive 
          ? `bg-gradient-to-r ${color} text-white shadow-lg` 
          : 'bg-card-dark/50 text-text-secondary hover:bg-card-dark'
      } border border-white/10 backdrop-blur-sm`}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center">
        <motion.span 
          className={isActive ? 'text-white' : 'text-accent-teal'}
          animate={{ rotateY: isActive ? [0, 360] : 0 }}
          transition={{ duration: 2, ease: "linear" }}
        >
          {categoryIcons[category]}
        </motion.span>
        <span className="ml-2 text-sm font-medium">{category}</span>
      </div>

      {isActive && (
        <motion.div
          className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/10 to-transparent"
          animate={{ x: [-100, 100] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      )}
    </motion.button>
  );
};

const BranchSection: React.FC<{
  branchName: string;
  skills: any[];
  color: string;
  startIndex: number;
}> = ({ branchName, skills, color, startIndex }) => {
  return (
    <div className="mb-6">
      <motion.h3 
        className="text-sm font-semibold text-accent-teal mb-3 flex items-center"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <span className="w-2 h-2 bg-accent-teal rounded-full mr-2"></span>
        {branchName}
      </motion.h3>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
        {skills.map((skill, index) => (
          <SkillCard 
            key={skill.id}
            skill={skill} 
            index={startIndex + index}
            color={color}
          />
        ))}
      </div>
    </div>
  );
};

const SkillsSection: React.FC<{ id: string }> = ({ id }) => {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>(SkillCategory.LANGUAGES);

  const categoryOrder: SkillCategory[] = [
    SkillCategory.LANGUAGES,
    SkillCategory.AIML,
    SkillCategory.FRONTEND,
    SkillCategory.TOOLS,
  ];

  const activeSkills = skillsData[activeCategory] || [];
  
  const skillsByBranch = activeSkills.reduce((acc, skill) => {
    if (!acc[skill.branch]) {
      acc[skill.branch] = [];
    }
    acc[skill.branch].push(skill);
    return acc;
  }, {} as Record<string, typeof activeSkills>);

  return (
    <Section id={id} title="Tech Arsenal">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-accent-teal/5 to-transparent"
          animate={{ x: [-100, 100] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-accent-teal/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20],
              opacity: [0.3, 1, 0.3],
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

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {categoryOrder.map((category) => (
            <CategoryHeader
              key={category}
              category={category}
              color={categoryColors[category]}
              isActive={activeCategory === category}
              onClick={() => setActiveCategory(category)}
            />
          ))}
        </motion.div>

        <motion.div
          key={activeCategory}
          style={{ perspective: 1000 }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, staggerChildren: 0.03 }}
        >
          {Object.entries(skillsByBranch).map(([branchName, branchSkills], branchIndex) => {
            const startIndex = Object.entries(skillsByBranch)
              .slice(0, branchIndex)
              .reduce((acc, [, skills]) => acc + skills.length, 0);
            
            return (
              <BranchSection
                key={branchName}
                branchName={branchName}
                skills={branchSkills}
                color={categoryColors[activeCategory]}
                startIndex={startIndex}
              />
            );
          })}
        </motion.div>
      </div>
    </Section>
  );
};

export default SkillsSection;