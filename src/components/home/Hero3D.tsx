'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  
  // 15,000 points for a dense, premium look
  const count = 15000;
  
  // Initialize random positions and phases for organic noise
  const [positions, phases] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const ph = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      // Spread across a very wide area to create depth
      pos[i * 3 + 0] = (Math.random() - 0.5) * 60; // x
      pos[i * 3 + 1] = (Math.random() - 0.5) * 60; // y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 60 - 15; // z (push back slightly)
      
      ph[i] = Math.random() * Math.PI * 2;
    }
    return [pos, ph];
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    
    // Slower time for more "premium" drifting feel
    const time = state.clock.elapsedTime * 0.15;
    const pos = pointsRef.current.geometry.attributes.position.array as Float32Array;
    
    // Animate points with low-frequency sin/cos noise
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const x = pos[i3];
      const y = pos[i3 + 1];
      
      const phase = phases[i];
      
      // Gentle, fluid drift
      pos[i3 + 0] += Math.sin(time + phase + y * 0.05) * 0.01;
      pos[i3 + 1] += Math.cos(time + phase + x * 0.05) * 0.01;
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    
    // Extremely slow scene rotation
    pointsRef.current.rotation.y = time * 0.05;
    pointsRef.current.rotation.z = time * 0.02;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      {/* Additive blending + high opacity makes particles glow intensely where they overlap */}
      <pointsMaterial 
        size={0.08} 
        color="#60a5fa" 
        transparent 
        opacity={0.8} 
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function CameraDrifter() {
  useFrame((state) => {
    const scrollY = window.scrollY;
    
    // Smooth, slow automated drift combined with scroll parallax
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, Math.sin(state.clock.elapsedTime * 0.2) * 1.5, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, -scrollY * 0.005 + Math.cos(state.clock.elapsedTime * 0.1) * 1.5, 0.05);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, 5 - scrollY * 0.003, 0.05);
    
    // Keep camera looking roughly at the center but drifting
    state.camera.lookAt(0, -scrollY * 0.005, -20);
  });
  return null;
}

export default function Hero3D() {
  return (
    // Dark base gradient for the particles to shine against
    <div className="fixed inset-0 -z-10 bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#020617]">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <CameraDrifter />
        <ParticleField />
        
        {/* Post-processing Bloom pass to make particles glow */}
        <EffectComposer>
          <Bloom luminanceThreshold={0.1} luminanceSmoothing={0.9} intensity={2.0} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
