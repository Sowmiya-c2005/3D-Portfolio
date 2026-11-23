/**
 * KnowledgeScene3D.tsx
 * Education & Certifications — Holographic tilted glass screen displaying
 * certificate documents + trophy, surrounded by blue neon swirl rings and
 * floating translucent corner cubes.
 * Matches reference image 6.
 */
import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

/* ── Neon swirl ring ── */
function SwirlRing({
  radius, tubeRadius, tiltX, tiltZ, speed, color, opacity = 0.6,
}: {
  radius: number; tubeRadius: number; tiltX: number; tiltZ: number;
  speed: number; color: string; opacity?: number;
}) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((s) => {
    if (ref.current) ref.current.rotation.z = s.clock.elapsedTime * speed;
  });
  return (
    <mesh ref={ref} rotation={[tiltX, 0, tiltZ]}>
      <torusGeometry args={[radius, tubeRadius, 8, 128]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.4}
        transparent opacity={opacity} />
    </mesh>
  );
}

/* ── Floating translucent corner cube ── */
function FloatingCube({ position, size, color }: {
  position: [number, number, number]; size: number; color: string;
}) {
  const ref = useRef<THREE.Mesh>(null!);
  const phase = useMemo(() => Math.random() * Math.PI * 2, []);
  useFrame((s) => {
    if (ref.current) {
      ref.current.rotation.x = s.clock.elapsedTime * 0.4 + phase;
      ref.current.rotation.y = s.clock.elapsedTime * 0.3 + phase;
    }
  });
  return (
    <Float speed={1.5} floatIntensity={0.5}>
      <mesh ref={ref} position={position}>
        <boxGeometry args={[size, size, size]} />
        <meshStandardMaterial color={color} metalness={0.2} roughness={0.1}
          transparent opacity={0.35} emissive={color} emissiveIntensity={0.3} />
      </mesh>
    </Float>
  );
}

/* ── Certificate card ── */
function CertCard({ position, width, height }: {
  position: [number, number, number]; width: number; height: number;
}) {
  const lineYs: number[] = [-0.1, 0.0, 0.1, 0.22];
  return (
    <group position={position}>
      <mesh>
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial color="#e8e0cc" metalness={0.1} roughness={0.6}
          transparent opacity={0.92} />
      </mesh>
      {/* gold top stripe */}
      <mesh position={[0, height / 2 - 0.06, 0.001]}>
        <planeGeometry args={[width, 0.08]} />
        <meshStandardMaterial color="#c8a84b" emissive="#c8a84b" emissiveIntensity={0.6} />
      </mesh>
      {/* red seal */}
      <mesh position={[0, -height / 2 + 0.1, 0.001]}>
        <circleGeometry args={[0.07, 32]} />
        <meshStandardMaterial color="#cc2222" emissive="#cc2222" emissiveIntensity={0.5} />
      </mesh>
      {lineYs.map((y, i) => (
        <mesh key={i} position={[0, y, 0.001]}>
          <planeGeometry args={[width * 0.72, 0.025]} />
          <meshStandardMaterial color="#888880" transparent opacity={0.5} />
        </mesh>
      ))}
    </group>
  );
}

/* ── Trophy ── */
function Trophy({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null!);
  useFrame((s) => {
    if (ref.current) ref.current.rotation.y = s.clock.elapsedTime * 0.5;
  });
  return (
    <group ref={ref} position={position}>
      <mesh position={[0, 0.18, 0]}>
        <cylinderGeometry args={[0.13, 0.08, 0.26, 24, 1, true]} />
        <meshStandardMaterial color="#b8c8d8" metalness={0.95} roughness={0.08}
          emissive="#6688aa" emissiveIntensity={0.25} transparent opacity={0.9}
          side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 0.31, 0]}>
        <torusGeometry args={[0.13, 0.014, 8, 32]} />
        <meshStandardMaterial color="#aabbcc" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0, 0.03, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 0.14, 12]} />
        <meshStandardMaterial color="#aabbcc" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0, -0.05, 0]}>
        <cylinderGeometry args={[0.11, 0.11, 0.04, 24]} />
        <meshStandardMaterial color="#aabbcc" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[-0.165, 0.2, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.05, 0.012, 8, 20, Math.PI]} />
        <meshStandardMaterial color="#aabbcc" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0.165, 0.2, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <torusGeometry args={[0.05, 0.012, 8, 20, Math.PI]} />
        <meshStandardMaterial color="#aabbcc" metalness={0.9} roughness={0.1} />
      </mesh>
      <pointLight color="#88aaff" intensity={3} distance={1.5} />
    </group>
  );
}

/* ── Holographic tilted glass screen ── */
function HolographicScreen() {
  const groupRef = useRef<THREE.Group>(null!);
  useFrame((s) => {
    if (groupRef.current)
      groupRef.current.rotation.y = Math.sin(s.clock.elapsedTime * 0.25) * 0.08;
  });
  const W = 2.6;
  const H = 1.8;
  const borderColor = "#00c3ff";
  const sideColor = "#7b4fff";
  return (
    <group ref={groupRef} rotation={[-0.18, 0.35, 0.08]} position={[0, 0.1, 0]}>
      {/* glass backing */}
      <mesh position={[0, 0, -0.03]}>
        <planeGeometry args={[W + 0.1, H + 0.1]} />
        <meshStandardMaterial color="#0a0f28" metalness={0.6} roughness={0.2}
          transparent opacity={0.55} />
      </mesh>
      {/* glass face */}
      <mesh>
        <planeGeometry args={[W, H]} />
        <meshStandardMaterial color="#0d1a3a" metalness={0.3} roughness={0.05}
          transparent opacity={0.45} emissive="#001133" emissiveIntensity={0.4} />
      </mesh>
      {/* top border */}
      <mesh position={[0, H / 2, 0.01]}>
        <planeGeometry args={[W, 0.025]} />
        <meshStandardMaterial color={borderColor} emissive={borderColor}
          emissiveIntensity={3} transparent opacity={0.9} />
      </mesh>
      {/* bottom border */}
      <mesh position={[0, -H / 2, 0.01]}>
        <planeGeometry args={[W, 0.02]} />
        <meshStandardMaterial color={borderColor} emissive={borderColor}
          emissiveIntensity={3} transparent opacity={0.9} />
      </mesh>
      {/* left border */}
      <mesh position={[-W / 2, 0, 0.01]}>
        <planeGeometry args={[0.02, H]} />
        <meshStandardMaterial color={sideColor} emissive={sideColor}
          emissiveIntensity={2.5} transparent opacity={0.85} />
      </mesh>
      {/* right border */}
      <mesh position={[W / 2, 0, 0.01]}>
        <planeGeometry args={[0.02, H]} />
        <meshStandardMaterial color={sideColor} emissive={sideColor}
          emissiveIntensity={2.5} transparent opacity={0.85} />
      </mesh>
      {/* top bar accent */}
      <mesh position={[0, H / 2 - 0.07, 0.01]}>
        <planeGeometry args={[W * 0.6, 0.015]} />
        <meshStandardMaterial color={borderColor} emissive={borderColor}
          emissiveIntensity={2} transparent opacity={0.6} />
      </mesh>
      {/* cert card 1 */}
      <CertCard position={[-0.65, 0, 0.02]} width={0.85} height={1.1} />
      {/* cert card 2 */}
      <CertCard position={[0.1, 0.0, 0.02]} width={0.78} height={1.0} />
      {/* trophy */}
      <Trophy position={[0.9, -0.08, 0.1]} />
      <pointLight color="#00c3ff" intensity={5} distance={3} position={[0, 0, 0.5]} />
      <pointLight color="#7b4fff" intensity={2} distance={4} position={[0.5, 0.3, 0.5]} />
    </group>
  );
}

/* ── Particle starfield ── */
function StarField() {
  const pts = useMemo(() => {
    const p: number[] = [];
    for (let i = 0; i < 120; i++) {
      p.push(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 6 - 2
      );
    }
    return new Float32Array(p);
  }, []);
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[pts, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#ffffff" size={0.025} transparent opacity={0.7} />
    </points>
  );
}

export default function KnowledgeScene3D() {
  return (
    <>
      <ambientLight intensity={0.08} />
      <pointLight color="#00c3ff" intensity={3} distance={10} position={[0, 2, 2]} />
      <pointLight color="#7b4fff" intensity={2} distance={8} position={[-3, 1, 1]} />

      {/* dark bg */}
      <mesh position={[0, 0, -4]}>
        <planeGeometry args={[20, 14]} />
        <meshStandardMaterial color="#030508" />
      </mesh>

      <StarField />
      <HolographicScreen />

      {/* neon swirl rings */}
      <SwirlRing radius={2.2} tubeRadius={0.012} tiltX={Math.PI / 3.5} tiltZ={0.3}  speed={0.18}  color="#00c3ff" opacity={0.55} />
      <SwirlRing radius={2.5} tubeRadius={0.008} tiltX={-Math.PI / 4}  tiltZ={0.6}  speed={-0.12} color="#7b4fff" opacity={0.42} />
      <SwirlRing radius={1.9} tubeRadius={0.007} tiltX={Math.PI / 2.5} tiltZ={-0.4} speed={0.22}  color="#00c3ff" opacity={0.3} />

      {/* corner floating cubes */}
      <FloatingCube position={[-3.2, -1.6, -0.5]} size={0.42} color="#00c3ff" />
      <FloatingCube position={[ 3.0, -1.5, -0.8]} size={0.36} color="#00c3ff" />
      <FloatingCube position={[-2.8,  1.5, -1.0]} size={0.28} color="#7b4fff" />
      <FloatingCube position={[ 2.6,  1.4, -0.6]} size={0.22} color="#00c3ff" />

      {/* floor platform */}
      <mesh position={[0, -1.9, -0.5]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[7, 5]} />
        <meshStandardMaterial color="#07090f" metalness={0.6} roughness={0.3}
          transparent opacity={0.9} />
      </mesh>
      <mesh position={[0, -1.88, -0.5]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[7, 0.012]} />
        <meshStandardMaterial color="#00c3ff" emissive="#00c3ff" emissiveIntensity={2}
          transparent opacity={0.5} />
      </mesh>
    </>
  );
}
