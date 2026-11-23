import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere } from "@react-three/drei";
import * as THREE from "three";

export default function HeroOrb() {
  const orbRef = useRef<THREE.Mesh>(null!);
  const ringRef = useRef<THREE.Mesh>(null!);
  const outerRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (orbRef.current) {
      orbRef.current.rotation.y = t * 0.3;
      orbRef.current.rotation.z = t * 0.1;
    }
    if (ringRef.current) {
      ringRef.current.rotation.x = Math.PI / 3 + t * 0.5;
      ringRef.current.rotation.z = t * 0.2;
    }
    if (outerRef.current) {
      outerRef.current.rotation.y = -t * 0.2;
      outerRef.current.rotation.x = t * 0.15;
    }
  });

  return (
    <group>
      {/* Core glowing orb */}
      <Sphere ref={orbRef} args={[1, 64, 64]}>
        <MeshDistortMaterial
          color="#00c8ff"
          emissive="#003d5c"
          emissiveIntensity={0.4}
          roughness={0.1}
          metalness={0.8}
          distort={0.4}
          speed={2}
          transparent
          opacity={0.85}
        />
      </Sphere>

      {/* Inner wireframe shell */}
      <mesh ref={outerRef}>
        <icosahedronGeometry args={[1.3, 1]} />
        <meshStandardMaterial
          color="#00c8ff"
          wireframe
          transparent
          opacity={0.15}
          emissive="#00c8ff"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Orbiting ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[1.8, 0.03, 8, 100]} />
        <meshStandardMaterial
          color="#7c3aed"
          emissive="#7c3aed"
          emissiveIntensity={0.8}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Second ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.1, 0.02, 8, 100]} />
        <meshStandardMaterial
          color="#00c8ff"
          emissive="#00c8ff"
          emissiveIntensity={0.5}
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Point lights for glow effect */}
      <pointLight color="#00c8ff" intensity={3} distance={6} />
      <pointLight color="#7c3aed" intensity={1.5} distance={8} position={[2, 1, 2]} />
    </group>
  );
}
