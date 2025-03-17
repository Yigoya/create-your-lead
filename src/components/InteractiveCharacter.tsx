
import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '@/hooks/use-theme';
import { motion } from 'framer-motion';

// Character component that will be rendered inside Canvas
function Character({ cursorPosition, scrollProgress, isWaving = false }) {
  const { theme } = useTheme();
  const meshRef = useRef<THREE.Mesh>();
  const groupRef = useRef<THREE.Group>();
  const clock = new THREE.Clock();
  
  // Update character on each frame
  useFrame(() => {
    if (!groupRef.current || !meshRef.current) return;
    
    // Move character based on cursor position (with smoothing)
    const targetX = cursorPosition.x * 2 - 1;
    const targetY = -(cursorPosition.y * 2 - 1);
    
    groupRef.current.position.x += (targetX - groupRef.current.position.x) * 0.1;
    groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.1;
    
    // Make character look at cursor
    groupRef.current.lookAt(targetX * 3, targetY * 3, 1);
    
    // Add some idle animation - gentle floating
    groupRef.current.position.y += Math.sin(clock.getElapsedTime()) * 0.005;
    
    // Gentle rotation
    meshRef.current.rotation.y += 0.01;
    
    // React to scroll
    const scrollRotation = scrollProgress * Math.PI * 2;
    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      scrollRotation * 0.1,
      0.1
    );
    
    // If waving, add a bobbing motion
    if (isWaving) {
      meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 5) * 0.2;
    }
  });
  
  // Create a speech bubble that follows the character
  const SpeechBubble = () => {
    if (!isWaving) return null;
    
    return (
      <Html position={[0, 1.5, 0]} center>
        <div className="px-3 py-2 rounded-xl bg-background/90 backdrop-blur-sm border border-accent/20 text-sm shadow-lg">
          👋 Hi there! Welcome to Yigermal's portfolio!
        </div>
      </Html>
    );
  };

  const isDarkTheme = theme === 'dark';

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Using simple shapes instead of loading a GLTF model */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial 
          color={isDarkTheme ? "#9c88ff" : "#6c5ce7"} 
          emissive={isDarkTheme ? "#6c5ce7" : "#341f97"} 
          emissiveIntensity={0.2}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      
      {/* Eyes */}
      <mesh position={[0.2, 0.15, 0.4]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[-0.2, 0.15, 0.4]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      
      {/* Pupils */}
      <mesh position={[0.2, 0.15, 0.5]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[-0.2, 0.15, 0.5]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      
      {/* Smile */}
      <mesh position={[0, -0.1, 0.4]} rotation={[0, 0, Math.PI]}>
        <torusGeometry args={[0.2, 0.05, 16, 16, Math.PI]} />
        <meshStandardMaterial color="#ff6b6b" />
      </mesh>
      
      <SpeechBubble />
    </group>
  );
}

// Main component that includes the Canvas
const InteractiveCharacter = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0.5, y: 0.5 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isWaving, setIsWaving] = useState(false);
  const { theme } = useTheme();
  
  // Track cursor position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      });
    };
    
    // Track scroll position
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPercent = scrollTop / docHeight;
      setScrollProgress(scrollPercent);
    };
    
    // Make character wave on initial load
    const waveTimeout = setTimeout(() => {
      setIsWaving(true);
      setTimeout(() => setIsWaving(false), 5000);
    }, 2000);
    
    // Set event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(waveTimeout);
    };
  }, []);

  return (
    <motion.div 
      className="fixed bottom-20 right-20 w-40 h-40 z-50 pointer-events-none"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <spotLight 
          position={[0, 5, 5]} 
          angle={0.3} 
          penumbra={1} 
          intensity={1} 
          castShadow
        />
        <Character 
          cursorPosition={cursorPosition}
          scrollProgress={scrollProgress}
          isWaving={isWaving} 
        />
      </Canvas>
    </motion.div>
  );
};

export default InteractiveCharacter;
