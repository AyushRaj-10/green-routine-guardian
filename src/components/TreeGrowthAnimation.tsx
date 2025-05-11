
import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useSpring, animated } from '@react-spring/three';
import { Environment, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const TreeTrunk = ({ growth }) => {
  const trunkRef = useRef();
  const { scale } = useSpring({
    scale: [1, growth * 2, 1],
    from: { scale: [1, 0.1, 1] },
    config: { mass: 1, tension: 80, friction: 20 }
  });

  return (
    <animated.mesh ref={trunkRef} position={[0, 0, 0]} scale={scale}>
      <cylinderGeometry args={[0.15, 0.3, 1, 8]} />
      <meshStandardMaterial color="#8B4513" roughness={0.8} />
    </animated.mesh>
  );
};

const TreeLeaves = ({ growth }) => {
  const leavesRef = useRef();
  const { scale, position } = useSpring({
    scale: growth * 1.5,
    position: [0, growth * 1.5, 0],
    from: { scale: 0.1, position: [0, 0.2, 0] },
    config: { mass: 1, tension: 80, friction: 20 }
  });

  return (
    <animated.mesh ref={leavesRef} position={position} scale={scale}>
      <coneGeometry args={[1, 2, 8]} />
      <meshStandardMaterial color="#2E8B57" roughness={0.7} />
    </animated.mesh>
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
  const [growth, setGrowth] = useRef(0.1);

  useFrame(() => {
    if (growth.current < 1) {
      growth.current += 0.005;
    }
  });

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 10, 5]} intensity={1.5} castShadow />
      <Ground />
      <TreeTrunk growth={growth.current} />
      <TreeLeaves growth={growth.current} />
      <Environment preset="forest" />
    </>
  );
};

export const GrowingTree = () => {
  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [0, 2, 5], fov: 45 }}>
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
