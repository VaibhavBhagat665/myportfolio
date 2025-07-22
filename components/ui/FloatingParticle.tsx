import React from 'react';
import { motion, Variants, RepeatType, Easing } from 'framer-motion';

interface FloatingParticleProps {
  size?: number; 
  color?: string; 
  duration?: number; 
  delay?: number;
  className?: string; 
  style?: React.CSSProperties; 
}

const FloatingParticle: React.FC<FloatingParticleProps> = ({
  size = 10,
  color = 'bg-accent-teal/30',
  duration = Math.random() * 10 + 10,
  delay = Math.random() * 5,
  className = '',
  style = {},
}) => {
  const particleVariants: Variants = {
    initial: {
      opacity: 0,
      scale: Math.random() * 0.5 + 0.5, 
    },
    animate: {
      opacity: [0, 1, 1, 0],
      y: [0, Math.random() * -100 - 50, Math.random() * -100 - 50, -200], // move up
      x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50, Math.random() * 100 - 50], // move sideways
      rotate: [0, Math.random() * 360, Math.random() * 360, Math.random() * 360],
      transition: {
        duration: duration,
        delay: delay,
        repeat: Infinity,
        repeatType: "loop" as RepeatType,
        ease: "linear" as Easing,
      }
    }
  };

  return (
    <motion.div
      className={`absolute rounded-full ${color} ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        ...style,
      }}
      variants={particleVariants}
      initial="initial"
      animate="animate"
    />
  );
};

export const FloatingParticlesBackground: React.FC<{ count?: number }> = ({ count = 20 }) => {
  return (
    <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
      {Array.from({ length: count }).map((_, i) => (
        <FloatingParticle
          key={i}
          size={Math.random() * 15 + 5} // 5 to 20px
          color={i % 3 === 0 ? 'bg-accent-teal/20' : i % 3 === 1 ? 'bg-accent-purple/20' : 'bg-slate-700/20'}
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingParticle;