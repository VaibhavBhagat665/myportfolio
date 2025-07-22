
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import CertificationsSection from './components/CertificationsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import AIChatbot from './components/AIChatbot'; 
import { NAV_LINKS } from './constants';
// import TechShowcase3D from './components/TechShowcase3D';


const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-background-dark overflow-x-hidden">
      <Navbar />
      <main>
        <AnimatePresence>
          <motion.div
            key="app-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <HeroSection id={NAV_LINKS[0].id} />
            <AboutSection id={NAV_LINKS[1].id} />
            <SkillsSection id={NAV_LINKS[2].id} />
            <ProjectsSection id={NAV_LINKS[3].id} />
            <CertificationsSection id={NAV_LINKS[4].id} />
            <ContactSection id={NAV_LINKS[5].id} />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <AIChatbot /> 
    </div>
  );
};

export default App;
