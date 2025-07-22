
import React from 'react';
import { motion, Variants } from 'framer-motion';
import Section from './ui/Section';
import { USER_INFO } from '../constants';
import { AnimatedWords } from './ui/AnimatedText';

const AboutSection: React.FC<{ id: string }> = ({ id }) => {
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50, rotateX: -20 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 0.8, ease: [0.6, 0.01, 0.05, 0.95] as const } // Corrected x2 value
    },
  };

  const textVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } },
  };

  return (
    <Section id={id} title="About Me" className="bg-background-light">
      <motion.div
        className="max-w-4xl mx-auto p-6 sm:p-8 md:p-10 bg-card-dark/50 rounded-xl shadow-2xl backdrop-blur-lg border border-border-dark"
        variants={cardVariants}
        style={{ perspective: "1000px" }} 
      >
        <div className="grid md:grid-cols-3 gap-8 items-center">
          <motion.div
            className="md:col-span-1 flex justify-center"
            variants={textVariants}
          >
            <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-accent-purple shadow-xl transform transition-transform duration-500 hover:scale-105">
              <img src={USER_INFO.avatar} alt={USER_INFO.name} className="w-full h-full object-cover" />
            </div>
          </motion.div>
          <motion.div
            className="md:col-span-2"
            variants={textVariants}
          >
            <AnimatedWords
              el="h3"
              text={`Hello, I'm ${USER_INFO.name}`}
              className="text-2xl md:text-3xl font-display font-semibold mb-4 text-text-primary"
            />
            <motion.p
              className="text-text-secondary mb-4 leading-relaxed"
              variants={textVariants}
            >
              {USER_INFO.bio}
            </motion.p>
            <motion.p
              className="text-text-secondary leading-relaxed"
              variants={textVariants}
            >
              Currently, I'm diving deep into <span className="text-accent-teal font-semibold">GenAI</span>, exploring the fascinating world of <span className="text-accent-purple font-semibold">Deep Learning</span>, and honing my skills in <span className="text-accent-teal font-semibold">modern Development</span> practices. I'm always excited to learn new technologies and apply them to create meaningful projects.
            </motion.p>
          </motion.div>
        </div>
      </motion.div>
    </Section>
  );
};

export default AboutSection;