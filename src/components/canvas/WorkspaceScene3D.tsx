/**
 * WorkspaceScene3D.tsx
 * Cinematic developer workspace + abstract digital universe — Hero section.
 * Combines: holographic monitors, floating code panels, keyboard silhouette,
 * central glowing orb with orbiting rings, node network, mouse parallax.
 */
import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Line, Sphere, Float } from "@react-three/drei";
import * as THREE from "three";
import { useMouseParallax } from "../../hooks/useMouseParallax";

/* ── Holographic monitor ───────────────────────────────────── */
function HoloMonitor({
  position, rotation, w = 2.4, h = 1.5, color = "#00c3ff", scanLines = 4,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  w?: number; h?: number; color?: string; scanLines?: number;
}) {
  const ref = useRef<THREE.Group>(null!);
  const phase = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((s) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(s.clock.elapsedTime * 0.38 + phase) * 0.14;
      ref.current.rotation.y = rotation[1] + Math.sin(s.clock.elapsedTime * 0.18 + phase) * 0.055;
    }
  });

  const border: [number, number, number][] = [
    [-w/2, -h/2, 0.01], [w/2, -h/2, 0.01], [w/2, h/2, 0.01], [-w/2, h/2, 0.01], [-w/2, -h/2, 0.01],
  ];

  return (
    <group ref={ref} position={position} rotation={rotation}>
      {/* Screen glass */}
      <mesh>
        <planeGeometry args={[w, h]} />
        <meshStandardMaterial color="#010810" transparent opacity={0.52} side={THREE.DoubleSide}
          emissive={color} emissiveIntensity={0.045} />
      </mesh>
      {/* Glowing border */}
      <Line points={border} color={color} lineWidth={1.3} transparent opacity={0.72} />
      {/* Top bar */}
      <mesh position={[0, h/2 - 0.07, 0.015]}>
        <planeGeometry args={[w - 0.05, 0.015]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2.5} transparent opacity={0.9} />
      </mesh>
      {/* Scan lines / code rows */}
      {Array.from({ length: scanLines }).map((_, i) => {
        const y = h/2 - 0.22 - i * (h - 0.3) / scanLines;
        const len = 0.3 + Math.random() * 0.5;
        return (
          <mesh key={i} position={[-w/2 + 0.18 + len/2, y, 0.012]}>
            <planeGeometry args={[len, 0.022]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.4}
              transparent opacity={0.4 - i * 0.06} />
          </mesh>
        );
      })}
      {/* Corner accent brackets */}
      {([ [-w/2+0.06, h/2-0.06], [w/2-0.06, h/2-0.06], [-w/2+0.06, -h/2+0.06], [w/2-0.06, -h/2+0.06] ] as [number,number][])
        .map(([cx, cy], ci) => (
          <mesh key={`c${ci}`} position={[cx, cy, 0.025]}>
            <planeGeometry args={[0.08, 0.008]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={3} transparent opacity={0.9} />
          </mesh>
        ))}
    </group>
  );
}

/* ── Keyboard silhouette ───────────────────────────────────── */
function KeyboardSilhouette() {
  const ref = useRef<THREE.Group>(null!);
  useFrame((s) => {
    if (ref.current)
      ref.current.position.y = -1.65 + Math.sin(s.clock.elapsedTime * 0.28) * 0.04;
  });
  return (
    <group ref={ref} position={[0, -1.65, 0.3]} rotation={[-0.22, 0, 0]}>
      {/* Base */}
      <mesh>
        <boxGeometry args={[3.2, 0.06, 1.1]} />
        <meshStandardMaterial color="#0a0f1a" metalness={0.8} roughness={0.3} emissive="#001520" emissiveIntensity={0.4} />
      </mesh>
      {/* Key rows */}
      {[0, 1, 2, 3].map((row) =>
        Array.from({ length: 11 - row }).map((_, col) => (
          <mesh key={`${row}-${col}`}
            position={[-1.4 + col * 0.26 + row * 0.1, 0.055, -0.35 + row * 0.22]}>
            <boxGeometry args={[0.21, 0.04, 0.19]} />
            <meshStandardMaterial color="#0d1520" metalness={0.6} roughness={0.4}
              emissive="#00c3ff" emissiveIntensity={0.08 + Math.random() * 0.06} />
          </mesh>
        ))
      )}
    </group>
  );
}

/* ── Desk surface ───────────────────────────────────────────── */
function DeskSurface() {
  return (
    <mesh position={[0, -2, -0.5]} rotation={[-0.08, 0, 0]}>
      <boxGeometry args={[7, 0.06, 3]} />
      <meshStandardMaterial color="#060c16" metalness={0.5} roughness={0.6}
        emissive="#001224" emissiveIntensity={0.2} />
    </mesh>
  );
}

/* ── Node network ───────────────────────────────────────────── */
function DigitalNodeNetwork() {
  const groupRef = useRef<THREE.Group>(null!);
  const nodes = useMemo<[number, number, number][]>(() => [
    [0,0,0],[1.3,0.7,0.3],[-1.1,0.5,-0.2],[0.5,-0.9,0.1],
    [-0.7,-0.8,0.4],[1.7,-0.3,-0.1],[-1.5,-0.2,0.2],[0.2,1.3,-0.3],
    [1.0,1.1,0.5],[-0.4,-1.4,-0.2],
  ], []);
  const edges = useMemo(() => [
    [0,1],[0,2],[0,3],[0,4],[1,5],[2,6],[1,7],[3,4],[5,6],[1,8],[2,9],[7,8],
  ], []);

  useFrame((s) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = s.clock.elapsedTime * 0.1;
      groupRef.current.rotation.x = Math.sin(s.clock.elapsedTime * 0.07) * 0.12;
    }
  });

  return (
    <group ref={groupRef} position={[1.5, 0.3, -1.5]}>
      {edges.map(([a, b], i) => (
        <Line key={i}
          points={[new THREE.Vector3(...nodes[a]), new THREE.Vector3(...nodes[b])]}
          color="#00c3ff" lineWidth={0.5} transparent opacity={0.22} />
      ))}
      {nodes.map((pos, i) => {
        const isAccent = i % 3 === 0;
        return (
          <Float key={i} speed={1.5} rotationIntensity={0} floatIntensity={0.3}>
            <mesh position={pos}>
              <sphereGeometry args={[0.065, 10, 10]} />
              <meshStandardMaterial
                color={isAccent ? "#7b4fff" : "#00c3ff"}
                emissive={isAccent ? "#7b4fff" : "#00c3ff"}
                emissiveIntensity={2.8} />
            </mesh>
          </Float>
        );
      })}
    </group>
  );
}

/* ── Central core orb ───────────────────────────────────────── */
function CoreOrb() {
  const orbRef  = useRef<THREE.Mesh>(null!);
  const ring1   = useRef<THREE.Mesh>(null!);
  const ring2   = useRef<THREE.Mesh>(null!);
  const ring3   = useRef<THREE.Mesh>(null!);
  const wire    = useRef<THREE.Mesh>(null!);

  useFrame((s) => {
    const t = s.clock.elapsedTime;
    if (orbRef.current) { orbRef.current.rotation.y = t * 0.22; orbRef.current.rotation.z = t * 0.08; }
    if (ring1.current)  { ring1.current.rotation.x = Math.PI/3 + t * 0.55; ring1.current.rotation.z = t * 0.14; }
    if (ring2.current)  { ring2.current.rotation.x = -Math.PI/4 + t * 0.38; ring2.current.rotation.y = t * 0.28; }
    if (ring3.current)  { ring3.current.rotation.z = t * 0.2; ring3.current.rotation.x = t * 0.15; }
    if (wire.current)   { wire.current.rotation.y = -t * 0.16; wire.current.rotation.x = t * 0.11; }
  });

  return (
    <group position={[-0.5, 0.2, 0]}>
      <Sphere ref={orbRef} args={[0.72, 64, 64]}>
        <MeshDistortMaterial color="#001828" emissive="#003855" emissiveIntensity={0.7}
          roughness={0.04} metalness={0.96} distort={0.32} speed={1.6} transparent opacity={0.92} />
      </Sphere>
      <mesh ref={wire}>
        <icosahedronGeometry args={[1.08, 1]} />
        <meshStandardMaterial color="#00c3ff" wireframe transparent opacity={0.11} emissive="#00c3ff" emissiveIntensity={0.35} />
      </mesh>
      <mesh ref={ring1}>
        <torusGeometry args={[1.48, 0.016, 8, 100]} />
        <meshStandardMaterial color="#00c3ff" emissive="#00c3ff" emissiveIntensity={1.6} transparent opacity={0.82} />
      </mesh>
      <mesh ref={ring2}>
        <torusGeometry args={[1.82, 0.012, 8, 100]} />
        <meshStandardMaterial color="#7b4fff" emissive="#7b4fff" emissiveIntensity={1.3} transparent opacity={0.65} />
      </mesh>
      <mesh ref={ring3}>
        <torusGeometry args={[2.1, 0.008, 6, 80]} />
        <meshStandardMaterial color="#00c3ff" emissive="#00c3ff" emissiveIntensity={0.9} transparent opacity={0.4} />
      </mesh>
      <pointLight color="#00c3ff" intensity={5} distance={6} />
      <pointLight color="#7b4fff" intensity={2.5} distance={8} position={[2, 1, 2]} />
    </group>
  );
}

/* ── Mouse-parallax camera rig ──────────────────────────────── */
function CameraRig() {
  const { mouse } = useMouseParallax(0.03);
  const gr = useRef<THREE.Group>(null!);
  useFrame(() => {
    if (gr.current) {
      gr.current.rotation.y += (mouse.current.x * 0.1  - gr.current.rotation.y) * 0.04;
      gr.current.rotation.x += (mouse.current.y * 0.07 - gr.current.rotation.x) * 0.04;
    }
  });
  return <group ref={gr} />;
}

/* ── Main exported scene ────────────────────────────────────── */
export default function WorkspaceScene3D() {
  return (
    <>
      <CameraRig />
      <ambientLight intensity={0.18} />
      <pointLight position={[5, 8, 5]} color="#ffffff" intensity={0.4} />
      <pointLight position={[-5, -4, 3]} color="#7b4fff" intensity={0.5} />
      <spotLight position={[0, 6, 4]} color="#00c3ff" intensity={0.6} angle={0.5} penumbra={0.8} />

      {/* Workspace */}
      <DeskSurface />
      <KeyboardSilhouette />

      {/* Monitors */}
      <HoloMonitor position={[-0.1, 0.1, 0]} rotation={[0.04, 0, 0]} w={2.8} h={1.7} color="#00c3ff" scanLines={6} />
      <HoloMonitor position={[-3.0, 0.4, -1.8]} rotation={[0.04, 0.42, 0]} w={1.8} h={1.2} color="#7b4fff" scanLines={4} />
      <HoloMonitor position={[ 2.9, 0.5, -2.0]} rotation={[0.04,-0.38, 0]} w={1.6} h={1.1} color="#00c3ff" scanLines={4} />
      <HoloMonitor position={[-2.8,-1.2, -1.6]} rotation={[-0.1, 0.28, 0.04]} w={1.4} h={0.9} color="#7b4fff" scanLines={3} />

      {/* Digital universe elements */}
      <CoreOrb />
      <DigitalNodeNetwork />
    </>
  );
}
