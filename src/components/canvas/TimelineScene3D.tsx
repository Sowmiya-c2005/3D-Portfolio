/**
 * TimelineScene3D.tsx
 * Reference: Server-rack corridor with timeline years glowing
 * on the floor, perspective vanishing point, person walking away.
 */
import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Line } from "@react-three/drei";
import * as THREE from "three";

/* ── Server rack panel ─────────────────────────────────────── */
function ServerRack({ x, side }: { x: number; side: 1 | -1 }) {
  const ref = useRef<THREE.Group>(null!);
  useFrame((s) => {
    if (ref.current) {
      // subtle flicker on LEDs handled per LED below
    }
  });
  return (
    <group position={[x, 0, 0]} rotation={[0, side === 1 ? -Math.PI/2 : Math.PI/2, 0]}>
      {/* Rack cabinet body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.08, 3.6, 2.2]} />
        <meshStandardMaterial color="#080f1a" metalness={0.7} roughness={0.4}
          emissive="#001020" emissiveIntensity={0.3} />
      </mesh>
      {/* Glass door panel */}
      <mesh position={[0.055, 0, 0]}>
        <boxGeometry args={[0.015, 3.4, 2.1]} />
        <meshStandardMaterial color="#00c3ff" transparent opacity={0.08}
          emissive="#00c3ff" emissiveIntensity={0.3} metalness={0.9} roughness={0.05} />
      </mesh>
      {/* Server unit rows */}
      {Array.from({length:10}, (_,i) => (
        <group key={i} position={[0.05, -1.5 + i*0.32, 0]}>
          <mesh>
            <boxGeometry args={[0.025, 0.24, 1.9]} />
            <meshStandardMaterial color="#0a141e" metalness={0.6} roughness={0.5} />
          </mesh>
          {/* LED indicators */}
          {[-0.6,-0.3,0].map((lz,li) => (
            <mesh key={li} position={[0.02, 0, lz]}>
              <sphereGeometry args={[0.018, 6, 6]} />
              <meshStandardMaterial
                color={li===0?"#00ff88":li===1?"#00c3ff":"#ff6600"}
                emissive={li===0?"#00ff88":li===1?"#00c3ff":"#ff6600"}
                emissiveIntensity={2.5} />
            </mesh>
          ))}
        </group>
      ))}
      {/* Rack light strip */}
      <mesh position={[0.065, 0, 0.9]}>
        <boxGeometry args={[0.01, 3.4, 0.03]} />
        <meshStandardMaterial color="#00c3ff" emissive="#00c3ff" emissiveIntensity={3} transparent opacity={0.9} />
      </mesh>
      <pointLight color="#00c3ff" intensity={1.5} distance={3} position={[0.3, 0, 0]} />
    </group>
  );
}

/* ── Ceiling light strip ─────────────────────────────────────── */
function CeilingStrip({ z }: { z: number }) {
  return (
    <mesh position={[0, 1.9, z]}>
      <boxGeometry args={[0.08, 0.04, 2.5]} />
      <meshStandardMaterial color="#ffffff" emissive="#c0e8ff" emissiveIntensity={2} transparent opacity={0.9} />
    </mesh>
  );
}

/* ── Floor timeline years ───────────────────────────────────── */
function FloorYear({ year, z }: { year: string; z: number }) {
  return (
    <group position={[0, -1.75, z]} rotation={[-Math.PI/2, 0, 0]}>
      <Text fontSize={0.28} color="#00c3ff" anchorX="center" anchorY="middle" fillOpacity={0.8}>
        {year}
      </Text>
    </group>
  );
}

/* ── Floor glow lines ─────────────────────────────────────────*/
function FloorLine({ z }: { z: number }) {
  const ref = useRef<THREE.Mesh>(null!);
  const phase = useMemo(() => z, [z]);
  useFrame((s) => {
    if (ref.current)
      (ref.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
        0.5 + Math.sin(s.clock.elapsedTime * 0.8 + phase) * 0.3;
  });
  return (
    <mesh ref={ref} rotation={[-Math.PI/2, 0, 0]} position={[0.65, -1.78, z]}>
      <planeGeometry args={[0.04, 2.0]} />
      <meshStandardMaterial color="#00c3ff" emissive="#00c3ff"
        emissiveIntensity={0.5} transparent opacity={0.6} />
    </mesh>
  );
}

/* ── Silhouette walking away ─────────────────────────────────── */
function WalkingFigure() {
  const ref = useRef<THREE.Group>(null!);
  useFrame((s) => {
    if (ref.current)
      ref.current.position.z = -4 + Math.sin(s.clock.elapsedTime * 0.15) * 0.4;
  });
  return (
    <group ref={ref} position={[0, -0.4, -4]}>
      <mesh position={[0, 0.9, 0]}>
        <sphereGeometry args={[0.09, 8, 8]} />
        <meshStandardMaterial color="#040c18" />
      </mesh>
      <mesh position={[0, 0.44, 0]}>
        <boxGeometry args={[0.18, 0.5, 0.1]} />
        <meshStandardMaterial color="#040c18" />
      </mesh>
      {[-0.055, 0.055].map((lx, i) => (
        <mesh key={i} position={[lx, -0.04, 0]}>
          <boxGeometry args={[0.07, 0.4, 0.09]} />
          <meshStandardMaterial color="#040c18" />
        </mesh>
      ))}
      <pointLight color="#00c3ff" intensity={3} distance={2} position={[0,0.5,0.4]} />
    </group>
  );
}

export default function TimelineScene3D() {
  const camRef = useRef<THREE.Group>(null!);
  useFrame((s) => {
    if (camRef.current)
      camRef.current.rotation.y = Math.sin(s.clock.elapsedTime * 0.08) * 0.04;
  });

  const racks = [-2.4, -4.0, -5.6, -7.2, -8.8];
  const years = [
    { y: "2023", z: -0.5 },
    { y: "2025", z: -1.6 },
    { y: "2026", z: -2.8 },
    { y: "Future", z: -4.5 },
  ];

  return (
    <group ref={camRef}>
      <ambientLight intensity={0.07} />
      <pointLight color="#ffffff" intensity={0.5} position={[0, 2, 1]} />

      {/* Left & right server racks receding into distance */}
      {racks.map((z, i) => (
        <group key={i}>
          <ServerRack x={-2.5} side={1} />
          <ServerRack x={ 2.5} side={-1} />
        </group>
      ))}
      {/* Approximate racks at different Z depths */}
      {[0, -2.5, -5, -7.5, -10].map((z, i) => (
        <group key={`rack${i}`} position={[0, 0, z]}>
          <ServerRack x={-2.5} side={1} />
          <ServerRack x={ 2.5} side={-1} />
          <CeilingStrip z={0} />
        </group>
      ))}

      {/* Floor */}
      <mesh rotation={[-Math.PI/2, 0, 0]} position={[0,-1.8, -4]}>
        <planeGeometry args={[5, 14]} />
        <meshStandardMaterial color="#06101e" metalness={0.4} roughness={0.6}
          emissive="#001830" emissiveIntensity={0.15} />
      </mesh>

      {/* Floor glow centre lines */}
      {[-4,-2,0,2,4,6,8].map((z, i) => (
        <group key={`line${i}`}>
          <FloorLine z={-z * 1.0} />
          <mesh rotation={[-Math.PI/2,0,0]} position={[-0.65,-1.78,-z]}>
            <planeGeometry args={[0.04, 2.0]} />
            <meshStandardMaterial color="#7b4fff" emissive="#7b4fff"
              emissiveIntensity={0.5} transparent opacity={0.5} />
          </mesh>
        </group>
      ))}

      {/* Year labels on floor */}
      {years.map(({ y, z }) => <FloorYear key={y} year={y} z={z * -2} />)}

      {/* Vanishing point portal glow */}
      <mesh position={[0, 0.1, -11]}>
        <ringGeometry args={[0.6, 1.4, 60]} />
        <meshStandardMaterial color="#00c3ff" emissive="#00c3ff"
          emissiveIntensity={2.5} transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>
      <pointLight color="#00c3ff" intensity={8} distance={6} position={[0, 0, -10]} />

      <WalkingFigure />

      {/* Ceiling */}
      <mesh rotation={[Math.PI/2, 0, 0]} position={[0, 2.0,-4]}>
        <planeGeometry args={[5, 14]} />
        <meshStandardMaterial color="#040c16" metalness={0.5} roughness={0.6} />
      </mesh>
    </group>
  );
}
