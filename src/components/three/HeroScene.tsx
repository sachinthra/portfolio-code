'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { AdaptiveDpr } from '@react-three/drei';
import * as THREE from 'three';

/* ── Wireframe Globe ── */
function WireframeGlobe() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.08;
      groupRef.current.rotation.x = 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Solid inner core - subtle */}
      <mesh>
        <sphereGeometry args={[1.18, 32, 32]} />
        <meshBasicMaterial color="#0B1D3A" transparent opacity={0.4} />
      </mesh>
      {/* Primary wireframe sphere */}
      <mesh>
        <sphereGeometry args={[1.2, 24, 18]} />
        <meshBasicMaterial color="#00ADD8" wireframe transparent opacity={0.35} />
      </mesh>
      {/* Secondary finer wireframe - rotated for depth */}
      <mesh rotation={[0.3, 0.8, 0]}>
        <sphereGeometry args={[1.22, 16, 12]} />
        <meshBasicMaterial color="#00ADD8" wireframe transparent opacity={0.15} />
      </mesh>
      {/* Equator ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.25, 0.008, 16, 80]} />
        <meshBasicMaterial color="#00ADD8" transparent opacity={0.6} />
      </mesh>
      {/* Latitude lines */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.6, 0]}>
        <torusGeometry args={[1.0, 0.005, 8, 60]} />
        <meshBasicMaterial color="#00ADD8" transparent opacity={0.2} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.6, 0]}>
        <torusGeometry args={[1.0, 0.005, 8, 60]} />
        <meshBasicMaterial color="#00ADD8" transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

/* ── Orbit ring with dashed look ── */
function OrbitPath({ radius, tilt, speed }: { radius: number; tilt: number; speed: number }) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * speed * 0.1;
    }
  });

  return (
    <group ref={ref} rotation={[tilt, 0, 0]}>
      <mesh>
        <torusGeometry args={[radius, 0.006, 8, 120]} />
        <meshBasicMaterial color="#00ADD8" transparent opacity={0.12} />
      </mesh>
    </group>
  );
}

/* ── Orbiting satellite ── */
function OrbitingSatellite({ radius, speed, tilt, size = 0.06 }: { radius: number; speed: number; tilt: number; size?: number }) {
  const ref = useRef<THREE.Group>(null);
  const trailRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.elapsedTime * speed;
      const x = Math.cos(t) * radius;
      const z = Math.sin(t) * radius;
      const y = Math.sin(t) * radius * Math.sin(tilt);
      ref.current.position.set(x, y, z);
    }
  });

  return (
    <group>
      <group ref={ref}>
        {/* Satellite body */}
        <mesh>
          <octahedronGeometry args={[size]} />
          <meshBasicMaterial color="#00ADD8" />
        </mesh>
        {/* Glow point */}
        <mesh>
          <sphereGeometry args={[size * 2.5, 8, 8]} />
          <meshBasicMaterial color="#00ADD8" transparent opacity={0.15} />
        </mesh>
      </group>
    </group>
  );
}

/* ── Floating data points around the globe ── */
function DataPoints() {
  const ref = useRef<THREE.Points>(null);
  const count = 40;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Distribute on a sphere surface slightly larger than the globe
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      const r = 1.4 + Math.random() * 0.3;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.03;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#00ADD8" transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

export default function HeroScene() {
  return (
    <div className="w-full h-[350px] md:h-[500px]" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0.2, 5], fov: 40 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <AdaptiveDpr pixelated />
        <group scale={0.8}>
          <WireframeGlobe />
          <OrbitPath radius={1.8} tilt={0.5} speed={0.3} />
          <OrbitPath radius={2.3} tilt={-0.3} speed={-0.2} />
          <OrbitingSatellite radius={1.8} speed={0.4} tilt={0.5} size={0.05} />
          <OrbitingSatellite radius={2.3} speed={-0.3} tilt={-0.3} size={0.04} />
          <OrbitingSatellite radius={1.5} speed={0.6} tilt={0.8} size={0.03} />
          <DataPoints />
        </group>
      </Canvas>
    </div>
  );
}
