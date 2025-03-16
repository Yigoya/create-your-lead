
import { useRef, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float, Stars, useTexture } from "@react-three/drei";
import { useMediaQuery } from "@/hooks/use-media-query";
import * as THREE from "three";
import { useTheme } from "@/hooks/use-theme";

function FloatingSpheres() {
  const meshRef1 = useRef<THREE.Mesh>(null);
  const meshRef2 = useRef<THREE.Mesh>(null);
  const meshRef3 = useRef<THREE.Mesh>(null);
  const { theme } = useTheme();
  
  // Adjust colors based on theme
  const primaryColor = theme === "dark" ? "#8B5CF6" : "#8B5CF6"; 
  const secondaryColor = theme === "dark" ? "#0EA5E9" : "#0EA5E9";
  const tertiaryColor = theme === "dark" ? "#9681EB" : "#9681EB";

  useFrame(({ clock }) => {
    if (meshRef1.current) {
      meshRef1.current.rotation.x = clock.getElapsedTime() * 0.1;
      meshRef1.current.rotation.y = clock.getElapsedTime() * 0.15;
    }
    if (meshRef2.current) {
      meshRef2.current.rotation.x = clock.getElapsedTime() * -0.1;
      meshRef2.current.rotation.y = clock.getElapsedTime() * -0.1;
    }
    if (meshRef3.current) {
      meshRef3.current.rotation.x = clock.getElapsedTime() * 0.05;
      meshRef3.current.rotation.y = clock.getElapsedTime() * 0.08;
    }
  });

  return (
    <>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.5}>
        <mesh ref={meshRef1} position={[-3, 0, 0]}>
          <sphereGeometry args={[1, 32, 32]} />
          <MeshDistortMaterial
            color={primaryColor}
            distort={0.3}
            speed={2}
            roughness={0}
            metalness={0.5}
          />
        </mesh>
      </Float>

      <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
        <mesh ref={meshRef2} position={[3, 2, -2]}>
          <sphereGeometry args={[1.2, 32, 32]} />
          <MeshDistortMaterial
            color={secondaryColor}
            distort={0.4}
            speed={3}
            roughness={0}
            metalness={0.5}
          />
        </mesh>
      </Float>

      <Float speed={2.5} rotationIntensity={0.7} floatIntensity={1.5}>
        <mesh ref={meshRef3} position={[2, -2, -1]}>
          <sphereGeometry args={[0.8, 32, 32]} />
          <MeshDistortMaterial
            color={tertiaryColor}
            distort={0.2}
            speed={2}
            roughness={0}
            metalness={0.5}
          />
        </mesh>
      </Float>
      
      {/* Add subtle stars in the background */}
      <Stars radius={100} depth={50} count={1000} factor={4} fade speed={1} />
    </>
  );
}

// Error boundary component for Three.js errors
function ErrorFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-300 rounded-md">
        Could not load 3D effects
      </div>
    </div>
  );
}

const ThreeBackground = () => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { theme } = useTheme();

  if (!isDesktop) {
    return null;
  }

  return (
    <div className="absolute inset-0 z-0 opacity-60">
      <Canvas 
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: "high-performance"
        }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={0.5} />
          <spotLight position={[-10, -10, -5]} intensity={0.3} />
          <FloatingSpheres />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ThreeBackground;
