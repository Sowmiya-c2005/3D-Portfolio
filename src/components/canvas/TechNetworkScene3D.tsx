/**
 * TechNetworkScene3D.tsx
 * Reference: Central glowing hub sphere connected by curved cables
 * to labelled translucent skill cubes arranged in a semicircle.
 */
import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Line, Text } from "@react-three/drei";
import * as THREE from "three";

const SKILLS = [
  { label: "Python",     color: "#00c3ff", angle: -0.6 },
  { label: "React",      color: "#7b4fff", angle: -0.2 },
  { label: "FastAPI",    color: "#00c3ff", angle:  0.2 },
  { label: "PostgreSQL", color: "#7b4fff", angle:  0.6 },
  { label: "JavaScript", color: "#00c3ff", angle:  1.0 },
  { label: "Node.js",    color: "#7b4fff", angle:  1.4 },
  { label: "Git",        color: "#00c3ff", angle:  1.8 },
];

const RADIUS = 2.6;

/* ── Central hub orb ────────────────────────────────────────── */
function HubOrb() {
  const ref = useRef<THREE.Mesh>(null!);
  const wire = useRef<THREE.Mesh>(null!);
  useFrame((s) => {
    const t = s.clock.elapsedTime;
    if (ref.current)  ref.current.rotation.y = t * 0.3;
    if (wire.current) wire.current.rotation.y = -t * 0.18;
  });
  return (
    <group position={[-1.0, 0.2, 0]}>
      {/* Glowing core */}
      <mesh ref={ref}>
        <sphereGeometry args={[0.52, 32, 32]} />
        <meshStandardMaterial color="#ffffff" emissive="#00c3ff"
          emissiveIntensity={0.6} roughness={0.05} metalness={0.95}
          transparent opacity={0.9} />
      </mesh>
      {/* Geodesic wireframe overlay */}
      <mesh ref={wire}>
        <icosahedronGeometry args={[0.68, 1]} />
        <meshStandardMaterial color="#00c3ff" wireframe transparent
          opacity={0.25} emissive="#00c3ff" emissiveIntensity={0.5} />
      </mesh>
      {/* Circular base ring */}
      <mesh rotation={[-Math.PI/2, 0, 0]} position={[0,-0.56, 0]}>
        <torusGeometry args={[0.75, 0.025, 8, 60]} />
        <meshStandardMaterial color="#00c3ff" emissive="#00c3ff"
          emissiveIntensity={2} transparent opacity={0.8} />
      </mesh>
      {/* Circular floor ring (larger) */}
      <mesh rotation={[-Math.PI/2, 0, 0]} position={[0,-0.6, 0]}>
        <ringGeometry args={[0.8, 1.2, 60]} />
        <meshStandardMaterial color="#00c3ff" transparent opacity={0.06}
          emissive="#00c3ff" emissiveIntensity={0.3} side={THREE.DoubleSide} />
      </mesh>
      <pointLight color="#00c3ff" intensity={6} distance={5} />
      <pointLight color="#7b4fff" intensity={3} distance={6} position={[1, 1, 1]} />
    </group>
  );
}

/* ── Skill cube ─────────────────────────────────────────────── */
function SkillCube({ label, color, angle, index }: {
  label: string; color: string; angle: number; index: number;
}) {
  const gr = useRef<THREE.Group>(null!);
  const phase = useMemo(() => index * 0.5, [index]);

  const x = Math.cos(angle - Math.PI/2) * RADIUS + (-1.0);
  const y = Math.sin(angle * 0.3) * 0.6;
  const z = Math.sin(angle - Math.PI/2) * RADIUS * 0.6 - 0.4;

  useFrame((s) => {
    if (gr.current) {
      gr.current.position.y = y + Math.sin(s.clock.elapsedTime * 0.8 + phase) * 0.08;
    }
  });

  // Cable path from hub to cube
  const cablePoints: [number,number,number][] = useMemo(() => {
    const pts: [number,number,number][] = [];
    const steps = 16;
    const sx = -1.0; const sy = 0.2; const sz = 0;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const mx = sx + (x - sx) * t;
      const my = sy + (y - sy) * t + Math.sin(t * Math.PI) * 0.3;
      const mz = sz + (z - sz) * t;
      pts.push([mx, my, mz]);
    }
    return pts;
  }, [x, y, z]);

  return (
    <group ref={gr} position={[x, y, z]}>
      {/* Cable */}
      <Line points={cablePoints.map(p => [p[0]-x, p[1]-y, p[2]-z] as [number,number,number])}
        color={color} lineWidth={1.0} transparent opacity={0.55} />

      {/* Translucent cube */}
      <mesh>
        <boxGeometry args={[0.52, 0.52, 0.52]} />
        <meshStandardMaterial color={color} transparent opacity={0.18}
          emissive={color} emissiveIntensity={0.2} metalness={0.5} roughness={0.1} />
      </mesh>
      {/* Cube wireframe edges */}
      <mesh>
        <boxGeometry args={[0.54, 0.54, 0.54]} />
        <meshStandardMaterial color={color} wireframe transparent opacity={0.5}
          emissive={color} emissiveIntensity={0.4} />
      </mesh>
      {/* Circuit board base under cube */}
      <mesh rotation={[-Math.PI/2, 0, 0]} position={[0,-0.3, 0]}>
        <planeGeometry args={[0.7, 0.7]} />
        <meshStandardMaterial color={color} transparent opacity={0.08}
          emissive={color} emissiveIntensity={0.3} side={THREE.DoubleSide} />
      </mesh>
      <mesh rotation={[-Math.PI/2, 0, 0]} position={[0,-0.31, 0]}>
        <ringGeometry args={[0.3, 0.38, 20]} />
        <meshStandardMaterial color={color} emissive={color}
          emissiveIntensity={1.5} transparent opacity={0.5} side={THREE.DoubleSide} />
      </mesh>
      {/* Label */}
      <Text position={[0, 0.44, 0.3]} fontSize={0.13} color={color}
        anchorX="center" anchorY="middle" fillOpacity={0.95}>
        {label}
      </Text>
      {/* Glow */}
      <pointLight color={color} intensity={1.5} distance={1.2} />
    </group>
  );
}

/* ── Cables drawn from centre outward ───────────────────────── */
function CableBundle({ angle, color }: { angle: number; color: string }) {
  const pts: [number,number,number][] = useMemo(() => {
    const steps = 20;
    const ex = Math.cos(angle - Math.PI/2) * RADIUS + (-1.0);
    const ey = Math.sin(angle * 0.3) * 0.6;
    const ez = Math.sin(angle - Math.PI/2) * RADIUS * 0.6 - 0.4;
    const result: [number,number,number][] = [];
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      result.push([
        -1.0 + (ex - (-1.0)) * t,
        0.2  + (ey - 0.2) * t + Math.sin(t * Math.PI) * 0.3,
        0    + (ez - 0) * t,
      ]);
    }
    return result;
  }, [angle]);

  return <Line points={pts} color={color} lineWidth={1.1} transparent opacity={0.5} />;
}

export default function TechNetworkScene3D() {
  return (
    <>
      <ambientLight intensity={0.1} />

      {/* Hub cables drawn separately so no hook-in-loop issue */}
      {SKILLS.map((sk, i) => (
        <CableBundle key={i} angle={sk.angle} color={sk.color} />
      ))}

      <HubOrb />

      {/* Skill cubes */}
      {SKILLS.map((sk, i) => (
        <SkillCube key={i} label={sk.label} color={sk.color} angle={sk.angle} index={i} />
      ))}

      {/* Background floor grid */}
      <mesh rotation={[-Math.PI/2, 0, 0]} position={[0, -1.4, -0.5]}>
        <planeGeometry args={[14, 10, 24, 18]} />
        <meshStandardMaterial color="#00c3ff" wireframe transparent opacity={0.04} />
      </mesh>
    </>
  );
}
