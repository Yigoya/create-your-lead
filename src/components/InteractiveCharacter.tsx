
import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber';
import { useGLTF, OrbitControls, PerspectiveCamera, Html } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '@/hooks/use-theme';
import { motion } from 'framer-motion';

// Character component that will be loaded inside Canvas
function Character({ cursorPosition, scrollProgress, isWaving = false }) {
  const { theme } = useTheme();
  const mesh = useRef<THREE.Group>();
  const mixer = useRef<THREE.AnimationMixer>();
  const clock = new THREE.Clock();
  
  // Define character model URL - using a placeholder model
  const characterUrl = "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/robot/model.gltf";

  // Load character model with animations
  const { scene, animations } = useGLTF(characterUrl);
  
  // Clone the model to prevent reference issues
  const model = scene.clone();
  
  useEffect(() => {
    if (model && animations && animations.length > 0) {
      // Set up animation mixer
      mixer.current = new THREE.AnimationMixer(model);
      
      // Play default idle animation
      const idleAction = mixer.current.clipAction(animations[0]);
      idleAction.play();
      
      // Add the model to our ref
      if (mesh.current) {
        mesh.current.add(model);
      }
    }

    return () => {
      // Clean up
      mixer.current?.stopAllAction();
    };
  }, [model, animations]);
  
  // Update character on each frame
  useFrame(() => {
    if (!mesh.current) return;
    
    // Update animation mixer
    if (mixer.current) {
      mixer.current.update(clock.getDelta());
    }
    
    // Move character based on cursor position (with smoothing)
    const targetX = cursorPosition.x * 2 - 1;
    const targetY = -(cursorPosition.y * 2 - 1);
    
    mesh.current.position.x += (targetX - mesh.current.position.x) * 0.1;
    mesh.current.position.y += (targetY - mesh.current.position.y) * 0.1;
    
    // Make character look at cursor
    mesh.current.lookAt(targetX * 3, targetY * 3, 1);
    
    // Add some idle animation - gentle floating
    mesh.current.position.y += Math.sin(clock.getElapsedTime()) * 0.005;
    
    // React to scroll
    const scrollRotation = scrollProgress * Math.PI * 2;
    mesh.current.rotation.z = THREE.MathUtils.lerp(
      mesh.current.rotation.z,
      scrollRotation * 0.1,
      0.1
    );
  });
  
  // Create a speech bubble that follows the character
  const SpeechBubble = () => {
    if (!isWaving) return null;
    
    return (
      <Html position={[0, 1.2, 0]} center>
        <div className="px-3 py-2 rounded-xl bg-background/90 backdrop-blur-sm border border-accent/20 text-xs shadow-lg">
          👋 Hi there! Welcome to Yigermal's portfolio!
        </div>
      </Html>
    );
  };

  return (
    <group ref={mesh} position={[0, 0, 0]} scale={0.5}>
      {/* Character will be added to this group via the useEffect */}
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
        <directionalLight position={[10, 10, 5]} intensity={0.8} />
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
