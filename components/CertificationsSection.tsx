import React from 'react';
import { motion, Variants, Easing } from 'framer-motion';
import Section from './ui/Section';
import { certificationsData } from '../data/certificationsData';
import { Certification } from '../types';
import { AcademicCapIcon, ExternalLinkIcon } 
from './ui/Icons';

const CertificationItem: React.FC<{ cert: Certification; index: number }> = ({ cert, index }) => {
  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5, delay: index * 0.15, ease: "easeOut" as Easing }
    }
  };

  return (
    <motion.div
      variants={itemVariants}
      className="bg-card-dark p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-border-dark flex items-start space-x-4 group"
      whileHover={{borderColor: '#14b8a6'}} // accent-teal
    >
      <div className="flex-shrink-0 text-accent-purple pt-1">
        {cert.icon ? <cert.icon className="w-8 h-8" /> : <AcademicCapIcon className="w-8 h-8" />}
      </div>
      <div>
        <h3 className="text-lg font-display font-semibold text-text-primary group-hover:text-accent-teal transition-colors">{cert.name}</h3>
        <p className="text-sm text-text-secondary">Issued by: {cert.issuer}</p>
        <p className="text-xs text-text-secondary/70">Date: {cert.date}</p>
        {cert.credentialUrl && (
          <a
            href={cert.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-xs text-accent-teal hover:underline mt-2"
          >
            View Credential <ExternalLinkIcon className="w-3 h-3 ml-1" />
          </a>
        )}
      </div>
    </motion.div>
  );
};

const CertificationsSection: React.FC<{ id: string }> = ({ id }) => {
  return (
    <Section id={id} title="Learning & Certifications">
      {certificationsData.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {certificationsData.map((cert, index) => (
            <CertificationItem key={cert.id} cert={cert} index={index} />
          ))}
        </div>
      ) : (
        <p className="text-center text-text-secondary">No certifications listed yet. Actively pursuing learning opportunities!</p>
      )}
    </Section>
  );
};

export default CertificationsSection;