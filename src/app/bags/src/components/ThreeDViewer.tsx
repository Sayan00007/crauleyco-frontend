/**
 * ThreeDViewer — Interactive Three.js bag viewer.
 * Uses @react-three/fiber + drei for orbit controls.
 * Placeholder geometry styled as a bag (box body + torus handle).
 * Easily swap for a real .glb model using drei's useGLTF.
 */

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, RoundedBox, Environment } from '@react-three/drei';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import * as THREE from 'three';

/** Placeholder bag geometry — swap for <primitive object={gltf.scene} /> later */
function BagModel() {
  const groupRef = useRef<THREE.Group>(null);

  // Slow auto-rotation
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.3, 0]}>
      {/* Bag body */}
      <RoundedBox args={[2, 2.2, 1]} radius={0.12} smoothness={4} position={[0, 0, 0]}>
        <meshStandardMaterial color="hsl(210, 100%, 55%)" metalness={0.35} roughness={0.45} />
      </RoundedBox>

      {/* Front flap */}
      <RoundedBox args={[1.8, 0.8, 0.1]} radius={0.06} smoothness={4} position={[0, 0.7, 0.55]}>
        <meshStandardMaterial color="hsl(210, 100%, 45%)" metalness={0.4} roughness={0.4} />
      </RoundedBox>

      {/* Handle */}
      <mesh position={[0, 1.6, 0]} rotation={[0, 0, 0]}>
        <torusGeometry args={[0.55, 0.07, 16, 32, Math.PI]} />
        <meshStandardMaterial color="hsl(210, 80%, 40%)" metalness={0.5} roughness={0.3} />
      </mesh>

      {/* Buckle detail */}
      <mesh position={[0, 0.35, 0.62]}>
        <boxGeometry args={[0.3, 0.15, 0.05]} />
        <meshStandardMaterial color="hsl(40, 60%, 60%)" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>);

}

export default function ThreeDViewer() {
  const { ref, isVisible } = useScrollAnimation(0.2);

  return (
    <section id="3d" className="py-20 sm:py-32 px-4">
      <div
        ref={ref}
        className={`max-w-6xl mx-auto scroll-fade-in ${isVisible ? 'visible' : ''}`}>

        <div className="text-center mb-12">
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">Interactive</span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-2 tracking-tight">
            EXPERIENCE IN <span className="text-primary">3D</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
            Drag to rotate. Scroll to zoom. Explore every angle of our flagship design.
          </p>
        </div>

        <div className="relative rounded-2xl overflow-hidden border border-border bg-card aspect-[4/3] sm:aspect-[16/9] mt-[50px] ml-[50px] mr-[50px] mb-[50px]">
          <Canvas
            camera={{ position: [4, 2, 4], fov: 40 }}
            className="!cursor-grab active:!cursor-grabbing my-[50px] mx-[50px] mt-0 ml-0 mr-0 mb-0">

            <ambientLight intensity={0.4} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <directionalLight position={[-3, 3, -3]} intensity={0.4} color="hsl(210, 100%, 70%)" />
            <pointLight position={[0, -2, 3]} intensity={0.6} color="hsl(150, 80%, 60%)" />
            <BagModel />
            <OrbitControls
              enableZoom={true}
              enablePan={false}
              minDistance={3}
              maxDistance={10}
              autoRotate={false} />

            <Environment preset="city" />
          </Canvas>

          {/* Overlay label */}
          <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm rounded-lg px-4 py-2 text-xs text-muted-foreground">
            Drag to rotate · Scroll to zoom
          </div>
        </div>
      </div>
    </section>);

}