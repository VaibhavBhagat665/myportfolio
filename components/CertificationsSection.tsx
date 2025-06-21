import React, { useState } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import Section from './ui/Section';
import { certificationsData } from '../data/certificationsData';
import { Certification } from '../types';
import { AcademicCapIcon, ExternalLinkIcon } from './ui/Icons';

const CertificationItem: React.FC<{ cert: Certification; index: number }> = ({ cert, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const itemVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9,
      rotateX: -15
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: { 
        duration: 0.6, 
        delay: index * 0.1, 
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        damping: 20,
        stiffness: 100
      }
    }
  };

  const cardVariants: Variants = {
    rest: {
      scale: 1,
      rotateY: 0,
      z: 0,
      boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
    },
    hover: {
      scale: 1.02,
      rotateY: 2,
      z: 50,
      boxShadow: "0 20px 40px rgba(20, 184, 166, 0.15), 0 0 30px rgba(139, 92, 246, 0.1)",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  };

  const glowVariants: Variants = {
    rest: { opacity: 0, scale: 0.8 },
    hover: { 
      opacity: 1, 
      scale: 1.1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const iconVariants: Variants = {
    rest: { 
      scale: 1, 
      rotate: 0,
      filter: "brightness(1)"
    },
    hover: { 
      scale: 1.1, 
      rotate: 5,
      filter: "brightness(1.2)",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const contentVariants: Variants = {
    rest: { x: 0 },
    hover: { 
      x: 3,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const badgeVariants: Variants = {
    rest: { scale: 0, opacity: 0 },
    hover: { 
      scale: 1, 
      opacity: 1,
      transition: {
        duration: 0.2,
        delay: 0.1,
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  const shimmerVariants: Variants = {
    rest: { x: "-100%" },
    hover: { 
      x: "100%",
      transition: {
        duration: 0.6,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      className="relative perspective-1000"
    >
      {/* Glow Effect Background */}
      <motion.div
        variants={glowVariants}
        initial="rest"
        animate={isHovered ? "hover" : "rest"}
        className="absolute inset-0 bg-gradient-to-r from-accent-purple/20 via-accent-teal/20 to-indigo-500/20 rounded-xl blur-xl -z-10"
      />
      
      <motion.div
        variants={cardVariants}
        initial="rest"
        animate={isHovered ? "hover" : "rest"}
        whileTap="tap"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onTap={() => setIsClicked(!isClicked)}
        className="relative bg-gradient-to-br from-card-dark via-card-dark/95 to-card-dark/90 
                   p-6 rounded-xl border border-border-dark/50
                   backdrop-blur-sm overflow-hidden cursor-pointer group
                   before:absolute before:inset-0 
                   before:bg-gradient-to-r before:from-transparent before:via-white/5 before:to-transparent
                   before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700"
        style={{
          background: `linear-gradient(135deg, 
            rgba(30, 41, 59, 0.95) 0%, 
            rgba(51, 65, 85, 0.9) 50%, 
            rgba(30, 41, 59, 0.95) 100%)`
        }}
      >
        {/* Shimmer Effect */}
        <motion.div
          variants={shimmerVariants}
          initial="rest"
          animate={isHovered ? "hover" : "rest"}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
        />

        {/* Top Accent Line */}
        <motion.div 
          className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-purple via-accent-teal to-indigo-500"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />

        {/* Verified Badge */}
        <motion.div
          variants={badgeVariants}
          initial="rest"
          animate={isHovered ? "hover" : "rest"}
          className="absolute top-4 right-4 bg-gradient-to-r from-green-400 to-emerald-500 
                     text-white text-xs px-2 py-1 rounded-full flex items-center gap-1
                     shadow-lg backdrop-blur-sm"
        >
          <div className="w-3 h-3 bg-white rounded-full flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
          </div>
          Verified
        </motion.div>

        <div className="flex items-start space-x-4 relative z-10">
          {/* Enhanced Icon Container */}
          <motion.div 
            variants={iconVariants}
            initial="rest"
            animate={isHovered ? "hover" : "rest"}
            className="flex-shrink-0 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-accent-purple to-accent-teal rounded-lg blur opacity-50" />
            <div className="relative bg-gradient-to-br from-accent-purple/20 to-accent-teal/20 
                           p-3 rounded-lg border border-accent-teal/30 backdrop-blur-sm">
              {cert.icon ? 
                <cert.icon className="w-8 h-8 text-accent-teal drop-shadow-lg" /> : 
                <AcademicCapIcon className="w-8 h-8 text-accent-teal drop-shadow-lg" />
              }
            </div>
            
            {/* Floating Particles Animation */}
            <AnimatePresence>
              {isHovered && (
                <>
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                      animate={{ 
                        opacity: [0, 1, 0], 
                        scale: [0, 1, 0],
                        x: [0, (i - 1) * 20],
                        y: [0, -20 - i * 10]
                      }}
                      exit={{ opacity: 0, scale: 0 }}
                      transition={{ 
                        duration: 1.5, 
                        delay: i * 0.2,
                        repeat: Infinity,
                        repeatDelay: 2
                      }}
                      className="absolute top-0 left-1/2 transform -translate-x-1/2"
                    >
                      <div className="w-2 h-2 bg-yellow-400 rounded-full opacity-80 shadow-lg"></div>
                    </motion.div>
                  ))}
                </>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Enhanced Content */}
          <motion.div 
            variants={contentVariants}
            initial="rest"
            animate={isHovered ? "hover" : "rest"}
            className="flex-1 min-w-0"
          >
            <motion.h3 
              className="text-lg font-display font-semibold bg-gradient-to-r 
                         from-text-primary via-accent-teal to-text-primary bg-clip-text
                         text-transparent mb-2 leading-tight"
              animate={{
                backgroundPosition: isHovered ? "200% center" : "0% center"
              }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              style={{
                backgroundSize: "200% 100%",
                backgroundImage: `linear-gradient(90deg, 
                  rgb(241, 245, 249) 0%, 
                  rgb(20, 184, 166) 50%, 
                  rgb(241, 245, 249) 100%)`
              }}
            >
              {cert.name}
            </motion.h3>
            
            <motion.div className="space-y-1 mb-3">
              <p className="text-sm text-text-secondary flex items-center gap-2">
                <span className="w-2 h-2 bg-accent-purple rounded-full opacity-60"></span>
                <span className="font-medium">Issued by:</span> 
                <span className="text-accent-teal">{cert.issuer}</span>
              </p>
              <p className="text-xs text-text-secondary/70 flex items-center gap-2">
                <span className="w-2 h-2 bg-accent-teal rounded-full opacity-40"></span>
                <span className="font-medium">Date:</span> {cert.date}
              </p>
            </motion.div>

            {/* Enhanced Credential Link */}
            {cert.credentialUrl && (
              <motion.a
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 
                          bg-gradient-to-r from-accent-teal/10 to-accent-purple/10
                          border border-accent-teal/30 rounded-lg
                          text-sm text-accent-teal hover:text-white
                          transition-all duration-300 group/link
                          hover:bg-gradient-to-r hover:from-accent-teal hover:to-accent-purple
                          hover:shadow-lg hover:shadow-accent-teal/25"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="font-medium">View Credential</span>
                <motion.div
                  animate={{ x: isHovered ? 3 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ExternalLinkIcon className="w-4 h-4 group-hover/link:rotate-12 transition-transform duration-300" />
                </motion.div>
              </motion.a>
            )}
          </motion.div>
        </div>

        {/* Bottom Gradient Line */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r 
                     from-transparent via-accent-teal/50 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        />

        {/* Corner Decorations */}
        <div className="absolute top-0 right-0 w-20 h-20 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-bl from-accent-teal to-transparent rounded-bl-full" />
        </div>
        <div className="absolute bottom-0 left-0 w-16 h-16 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-tr from-accent-purple to-transparent rounded-tr-full" />
        </div>
      </motion.div>
    </motion.div>
  );
};

const CertificationsSection: React.FC<{ id: string }> = ({ id }) => {
  return (
    <Section id={id} title="Learning & Certifications">
      {certificationsData.length > 0 ? (
        <motion.div 
          className="grid md:grid-cols-2 gap-8 lg:gap-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {certificationsData.map((cert, index) => (
            <CertificationItem key={cert.id} cert={cert} index={index} />
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center py-12"
        >
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-accent-purple/20 to-accent-teal/20 blur-lg rounded-full" />
            <div className="relative bg-card-dark border border-border-dark/50 rounded-xl p-8 backdrop-blur-sm">
              <div className="w-12 h-12 bg-gradient-to-r from-accent-purple to-accent-teal rounded-full flex items-center justify-center mx-auto mb-4 opacity-60">
                <div className="w-6 h-6 bg-white rounded-sm"></div>
              </div>
              <p className="text-text-secondary text-lg">
                No certifications listed yet.
              </p>
              <p className="text-accent-teal font-medium mt-2">
                Actively pursuing learning opportunities!
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </Section>
  );
};

export default CertificationsSection;
