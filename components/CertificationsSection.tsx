import React, { useRef, useState, useEffect } from 'react';
import { motion, Variants, Easing } from 'framer-motion';
import * as THREE from 'three';
import Section from './ui/Section';
import { certificationsData } from '../data/certificationsData';
import { Certification } from '../types';
import { AcademicCapIcon, ExternalLinkIcon } from './ui/Icons';

const ThreeJSCertCard: React.FC<{ cert: Certification; index: number }> = ({ cert, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!cardRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance"
    });
    
    renderer.setSize(80, 80);
    renderer.setClearColor(0x000000, 0);
    cardRef.current.appendChild(renderer.domElement);

    // Create floating geometric shape
    const geometry = new THREE.IcosahedronGeometry(0.8, 1);
    const material = new THREE.MeshPhongMaterial({
      color: 0x14b8a6,
      shininess: 100,
      transparent: true,
      opacity: 0.8,
      wireframe: false
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x14b8a6, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0x9333ea, 0.8, 10);
    pointLight.position.set(-2, 2, 2);
    scene.add(pointLight);

    camera.position.z = 2;

    sceneRef.current = scene;
    rendererRef.current = renderer;
    meshRef.current = mesh;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      if (meshRef.current) {
        meshRef.current.rotation.x += 0.01;
        meshRef.current.rotation.y += 0.015;
        
        if (isHovered) {
          meshRef.current.scale.setScalar(1.2);
          meshRef.current.rotation.y += 0.02;
        } else {
          meshRef.current.scale.setScalar(1);
        }
      }
      
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      if (cardRef.current && renderer.domElement) {
        cardRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, [isHovered]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x: x * 20, y: -y * 20 });
  };

  const itemVariants: Variants = {
    hidden: { 
      opacity: 0, 
      rotateY: -90,
      scale: 0.8
    },
    visible: { 
      opacity: 1, 
      rotateY: 0,
      scale: 1,
      transition: { 
        duration: 0.8, 
        delay: index * 0.2, 
        ease: "easeOut" as Easing,
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <motion.div
      ref={cardRef}
      variants={itemVariants}
      className="relative group perspective-1000"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      whileHover={{ 
        z: 50,
        transition: { duration: 0.3 }
      }}
    >
      {/* Floating particles background */}
      <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-accent-teal rounded-full opacity-60"
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + i * 20}%`,
            }}
            animate={{
              y: [-10, 10, -10],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 2 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Main card with 3D transform */}
      <motion.div
        className="relative bg-gradient-to-br from-card-dark via-card-dark/90 to-gray-900/50 p-6 rounded-xl shadow-2xl border border-border-dark backdrop-blur-sm"
        style={{
          transform: `rotateX(${mousePos.y * 0.5}deg) rotateY(${mousePos.x * 0.5}deg)`,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{
          boxShadow: '0 25px 50px -12px rgba(20, 184, 166, 0.25), 0 0 30px rgba(147, 51, 234, 0.1)',
          borderColor: '#14b8a6',
          scale: 1.02,
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Holographic overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent-teal/5 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000 rounded-xl" />
        
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent-teal/10 via-transparent to-accent-purple/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative flex items-start space-x-4 z-10">
          {/* 3D Icon container */}
          <div className="flex-shrink-0 relative">
            {/* Three.js canvas will be appended here */}
            <div className="w-20 h-20 flex items-center justify-center bg-gradient-to-br from-accent-purple/20 to-accent-teal/20 rounded-lg border border-accent-teal/30 backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-accent-teal/10 to-accent-purple/10 rounded-lg" />
            </div>
            
            {/* Fallback icon */}
            <div className="absolute inset-0 flex items-center justify-center text-accent-teal opacity-20">
              {cert.icon ? <cert.icon className="w-6 h-6" /> : <AcademicCapIcon className="w-6 h-6" />}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <motion.h3 
              className="text-lg font-display font-semibold text-text-primary group-hover:text-accent-teal transition-colors duration-300 mb-2"
              style={{
                transform: `translateZ(20px)`,
              }}
            >
              {cert.name}
            </motion.h3>
            
            <motion.div
              style={{ transform: `translateZ(10px)` }}
              className="space-y-1"
            >
              <p className="text-sm text-text-secondary/90 font-medium">
                Issued by: <span className="text-accent-purple">{cert.issuer}</span>
              </p>
              <p className="text-xs text-text-secondary/70 flex items-center">
                <span className="w-2 h-2 bg-accent-teal rounded-full mr-2 animate-pulse" />
                {cert.date}
              </p>
            </motion.div>

            {cert.credentialUrl && (
              <motion.a
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-xs font-medium text-accent-teal hover:text-accent-purple transition-colors mt-3 px-3 py-1 rounded-full bg-accent-teal/10 hover:bg-accent-purple/10 border border-accent-teal/30 hover:border-accent-purple/30 backdrop-blur-sm"
                style={{ transform: `translateZ(15px)` }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 4px 15px rgba(20, 184, 166, 0.3)'
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span>View Credential</span>
                <ExternalLinkIcon className="w-3 h-3 ml-1 group-hover:translate-x-0.5 transition-transform" />
              </motion.a>
            )}
          </div>
        </div>

        {/* Corner accent */}
        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-accent-teal/20 to-transparent rounded-tr-xl" />
        <div className="absolute bottom-0 left-0 w-12 h-12 bg-gradient-to-tr from-accent-purple/20 to-transparent rounded-bl-xl" />
      </motion.div>
    </motion.div>
  );
};

const CertificationsSection: React.FC<{ id: string }> = ({ id }) => {
  return (
    <Section id={id} title="Learning & Certifications">
      {certificationsData.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
          {certificationsData.map((cert, index) => (
            <ThreeJSCertCard key={cert.id} cert={cert} index={index} />
          ))}
        </div>
      ) : (
        <p className="text-center text-text-secondary">No certifications listed yet. Actively pursuing learning opportunities!</p>
      )}
    </Section>
  );
};

export default CertificationsSection;
