
import { useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { useSpring, a } from '@react-spring/three';
import { Environment, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Use 'a' as the animated namespace from @react-spring/three
const TreeTrunk = ({ growth }) => {
  const trunkRef = useRef();
  const { height } = useSpring({
    height: growth * 2,
    from: { height: 0.1 },
    config: { mass: 1, tension: 80, friction: 20 }
  });

  return (
    <group ref={trunkRef} position={[0, 0, 0]}>
      <a.mesh position-y={height.to(h => h / 2)}>
        <a.cylinderGeometry args={[0.15, 0.3, height, 8]} />
        <meshStandardMaterial color="#8B4513" roughness={0.8} />
      </a.mesh>
    </group>
  );
};

const TreeLeaves = ({ growth }) => {
  const leavesRef = useRef();
  const { scale, posY } = useSpring({
    scale: growth * 1.5,
    posY: growth * 1.5,
    from: { scale: 0.1, posY: 0.2 },
    config: { mass: 1, tension: 80, friction: 20 }
  });

  return (
    <a.group 
      ref={leavesRef} 
      position-y={posY}
      scale={scale.to(s => [s, s, s])}
    >
      <mesh>
        <coneGeometry args={[1, 2, 8]} />
        <meshStandardMaterial color="#2E8B57" roughness={0.7} />
      </mesh>
    </a.group>
  );
};

const Ground = () => {
  return (
    <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[10, 10]} />
      <meshStandardMaterial color="#8B7355" roughness={1} />
    </mesh>
  );
};

const TreeAnimation = () => {
  const [growth, setGrowth] = useState(0.1);
  
  useEffect(() => {
    let animationId;
    let currentGrowth = 0.1;
    
    const animate = () => {
      if (currentGrowth < 1) {
        currentGrowth += 0.005;
        setGrowth(currentGrowth);
      }
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 10, 5]} intensity={1.5} castShadow />
      <Ground />
      <TreeTrunk growth={growth} />
      <TreeLeaves growth={growth} />
      <Environment preset="forest" />
    </>
  );
};

export const GrowingTree = () => {
  const [errorState, setErrorState] = useState(false);

  // Error boundary fallback
  if (errorState) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-green-100">
        <p className="text-green-800">Error loading 3D animation. Please refresh the page.</p>
      </div>
    );
  }

  return (
    <div className="h-full w-full">
      <Canvas 
        camera={{ position: [0, 2, 5], fov: 45 }}
        onCreated={({ gl }) => {
          gl.setClearColor(new THREE.Color('#000000'), 0);
        }}
        onError={() => setErrorState(true)}
      >
        <TreeAnimation />
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.4}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 4}
        />
      </Canvas>
    </div>
  );
};

export default GrowingTree;
