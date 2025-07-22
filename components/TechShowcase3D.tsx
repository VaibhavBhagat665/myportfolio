import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';

const TechShowcase3D: React.FC<{ id: string }> = ({ id }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const frameRef = useRef<number>();
  const [isLoaded, setIsLoaded] = useState(false);
  const mouseRef = useRef({ x: 0, y: 0 });
  const networkRef = useRef<THREE.Group | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0f);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 12);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x00ffff, 0.8);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xff6b6b, 0.6, 50);
    pointLight.position.set(-10, -10, -5);
    scene.add(pointLight);

    const createNeuralNetwork = () => {
      const networkGroup = new THREE.Group();
      
      const layers = [8, 12, 16, 12, 6]; 
      const layerSpacing = 3;
      const nodeGeometry = new THREE.SphereGeometry(0.08, 16, 16);
      
      const nodes: THREE.Mesh[][] = [];
      const connections: THREE.Line[] = [];

      layers.forEach((nodeCount, layerIndex) => {
        const layerNodes: THREE.Mesh[] = [];
        const layerY = (layerIndex - layers.length / 2) * layerSpacing;
        
        for (let i = 0; i < nodeCount; i++) {
          const nodeX = (i - nodeCount / 2) * 0.6;
          const nodeZ = Math.sin(i * 0.5) * 0.3;
          
          const nodeMaterial = new THREE.MeshPhongMaterial({
            color: new THREE.Color().setHSL(0.5 + layerIndex * 0.1, 0.8, 0.6),
            transparent: true,
            opacity: 0.8,
            emissive: new THREE.Color().setHSL(0.5 + layerIndex * 0.1, 0.3, 0.1)
          });
          
          const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
          node.position.set(nodeX, layerY, nodeZ);
          node.castShadow = true;
          
          networkGroup.add(node);
          layerNodes.push(node);
        }
        
        nodes.push(layerNodes);
        
        if (layerIndex < layers.length - 1) {
          layerNodes.forEach(node => {
            const nextLayerNodes = Math.min(4, layers[layerIndex + 1]); // Limit connections
            for (let j = 0; j < nextLayerNodes; j++) {
              const targetIndex = Math.floor((j / nextLayerNodes) * layers[layerIndex + 1]);
              if (nodes[layerIndex + 1] && nodes[layerIndex + 1][targetIndex]) {
                const lineGeometry = new THREE.BufferGeometry().setFromPoints([
                  node.position,
                  new THREE.Vector3(0, 0, 0)
                ]);
                
                const lineMaterial = new THREE.LineBasicMaterial({
                  color: 0x00ffaa,
                  transparent: true,
                  opacity: 0.3
                });
                
                const line = new THREE.Line(lineGeometry, lineMaterial);
                networkGroup.add(line);
                connections.push(line);
              }
            }
          });
        }
      });
      
      return { networkGroup, nodes, connections };
    };

    const { networkGroup, nodes, connections } = createNeuralNetwork();
    scene.add(networkGroup);
    networkRef.current = networkGroup;

    const createParticles = () => {
      const particleCount = 200;
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);
      const velocities = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

        colors[i * 3] = Math.random() * 0.5 + 0.5;
        colors[i * 3 + 1] = Math.random() * 0.8 + 0.2;
        colors[i * 3 + 2] = 1;

        velocities[i * 3] = (Math.random() - 0.5) * 0.02;
        velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
        velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
      }

      const particleGeometry = new THREE.BufferGeometry();
      particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      
      const particleMaterial = new THREE.PointsMaterial({
        size: 0.05,
        vertexColors: true,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending
      });

      const particles = new THREE.Points(particleGeometry, particleMaterial);
      particles.userData = { velocities };
      return particles;
    };

    const particles = createParticles();
    scene.add(particles);
    particlesRef.current = particles;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = mountRef.current?.getBoundingClientRect();
      if (rect) {
        mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      }
    };

    mountRef.current.addEventListener('mousemove', handleMouseMove);

    const animate = (time: number) => {
      frameRef.current = requestAnimationFrame(animate);

      if (networkRef.current) {
        networkRef.current.rotation.y = time * 0.0003;
        networkRef.current.rotation.x = Math.sin(time * 0.0002) * 0.1;
        
        nodes.forEach((layer, layerIndex) => {
          layer.forEach((node, nodeIndex) => {
            const baseY = node.position.y;
            node.position.y = baseY + Math.sin(time * 0.001 + nodeIndex) * 0.1;
            
            const scale = 1 + Math.sin(time * 0.002 + nodeIndex) * 0.2;
            node.scale.setScalar(scale);
          });
        });
      }

      if (particlesRef.current) {
        const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
        const velocities = particlesRef.current.userData.velocities as Float32Array;

        for (let i = 0; i < positions.length; i += 3) {
          positions[i] += velocities[i];
          positions[i + 1] += velocities[i + 1];
          positions[i + 2] += velocities[i + 2];

          if (Math.abs(positions[i]) > 10) velocities[i] *= -1;
          if (Math.abs(positions[i + 1]) > 10) velocities[i + 1] *= -1;
          if (Math.abs(positions[i + 2]) > 10) velocities[i + 2] *= -1;

          const mouseInfluence = 0.02;
          positions[i] += mouseRef.current.x * mouseInfluence;
          positions[i + 1] += mouseRef.current.y * mouseInfluence;
        }

        particlesRef.current.geometry.attributes.position.needsUpdate = true;
      }

      camera.position.x += (mouseRef.current.x * 2 - camera.position.x) * 0.02;
      camera.position.y += (mouseRef.current.y * 2 - camera.position.y) * 0.02;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate(0);
    setIsLoaded(true);

    const handleResize = () => {
      if (!mountRef.current || !camera || !renderer) return;
      
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
        mountRef.current.removeEventListener('mousemove', handleMouseMove);
      }
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  return (
    <section id={id} className="py-24 bg-gradient-to-b from-slate-900 via-gray-900 to-black relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Neural Architecture
            </span>
          </h2>
          <div className="flex items-center justify-center mt-6 space-x-4">
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-cyan-500 rounded-full" />
            <div className="w-2 h-2 bg-cyan-400 rotate-45 shadow-lg shadow-cyan-400/50" />
            <div className="w-12 h-0.5 bg-gradient-to-l from-transparent via-cyan-400 to-cyan-500 rounded-full" />
          </div>
          <p className="text-gray-300 text-lg mt-6 max-w-2xl mx-auto">
            Experience interactive AI visualization - move your mouse to explore the neural network
          </p>
        </motion.div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div 
            ref={mountRef} 
            className="w-full h-96 md:h-[500px] lg:h-[600px] rounded-2xl border border-cyan-500/20 shadow-2xl shadow-cyan-500/10 bg-gradient-to-br from-slate-900/50 to-black/50 backdrop-blur-sm"
            style={{ minHeight: '400px' }}
          />
          
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-900/80 to-black/80 rounded-2xl">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
                <p className="text-cyan-400 font-medium">Loading Neural Network...</p>
              </div>
            </div>
          )}
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {[
            { name: 'Machine Learning', icon: '🧠', color: 'cyan' },
            { name: 'Deep Learning', icon: '🔬', color: 'blue' },
            { name: 'Data Science', icon: '📊', color: 'purple' },
            { name: 'AI Research', icon: '🚀', color: 'teal' }
          ].map((tech, index) => (
            <motion.div
              key={tech.name}
              className={`bg-gradient-to-br from-${tech.color}-500/10 to-${tech.color}-600/5 border border-${tech.color}-400/20 rounded-xl p-6 text-center hover:border-${tech.color}-400/40 transition-all duration-300`}
              whileHover={{ scale: 1.05, y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
            >
              <div className="text-3xl mb-3">{tech.icon}</div>
              <h3 className={`text-${tech.color}-400 font-semibold text-sm`}>{tech.name}</h3>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
    </section>
  );
};

export default TechShowcase3D;