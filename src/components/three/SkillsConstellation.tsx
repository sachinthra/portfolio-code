'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { AdaptiveDpr } from '@react-three/drei';
import * as THREE from 'three';

function ConstellationNodes({ count = 20 }: { count?: number }) {
  const groupRef = useRef<THREE.Group>(null);

  const nodes = useMemo(() => {
    return Array.from({ length: count }, () => ({
      pos: [
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 2,
      ] as [number, number, number],
    }));
  }, [count]);

  const linePositions = useMemo(() => {
    const positions: number[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dist = Math.sqrt(
          (nodes[i].pos[0] - nodes[j].pos[0]) ** 2 +
          (nodes[i].pos[1] - nodes[j].pos[1]) ** 2 +
          (nodes[i].pos[2] - nodes[j].pos[2]) ** 2
        );
        if (dist < 3) {
          positions.push(...nodes[i].pos, ...nodes[j].pos);
        }
      }
    }
    return new Float32Array(positions);
  }, [nodes]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <mesh key={i} position={node.pos}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshBasicMaterial color="#00ADD8" />
        </mesh>
      ))}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#00ADD8" transparent opacity={0.15} />
      </lineSegments>
    </group>
  );
}

export default function SkillsConstellation() {
  return (
    <div className="absolute inset-0 -z-10 opacity-40" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <AdaptiveDpr pixelated />
        <ConstellationNodes />
      </Canvas>
    </div>
  );
}
