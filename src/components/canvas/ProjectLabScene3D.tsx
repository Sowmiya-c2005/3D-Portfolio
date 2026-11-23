/**
 * ProjectLabScene3D.tsx
 * Reference: Laptop in centre on a glowing platform, with multiple
 * holographic UI/app panels orbiting and floating around it.
 */
import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Line } from "@react-three/drei";
import * as THREE from "three";

/* ── Laptop model ───────────────────────────────────────────── */
function Laptop() {
  const baseRef  = useRef<THREE.Mesh>(null!);
  const lidRef   = useRef<THREE.Mesh>(null!);
  const screenRef = useRef<THREE.Mesh>(null!);

  useFrame((s) => {
    if (baseRef.current)  baseRef.current.rotation.y = Math.sin(s.clock.elapsedTime * 0.2) * 0.1;
    if (lidRef.current)   lidRef.current.rotation.y  = Math.sin(s.clock.elapsedTime * 0.2) * 0.1;
    if (screenRef.current) screenRef.current.rotation.y = Math.sin(s.clock.elapsedTime * 0.2) * 0.1;
  });

  return (
    <group position={[0, -0.6, 0]}>
      {/* Base */}
      <mesh ref={baseRef} position={[0, 0, 0]}>
        <boxGeometry args={[2.0, 0.08, 1.4]} />
        <meshStandardMaterial color="#0d1520" metalness={0.85} roughness={0.2}
          emissive="#001828" emissiveIntensity={0.3} />
      </mesh>
      {/* Keyboard surface */}
      <mesh position={[0, 0.045, 0.05]}>
        <boxGeometry args={[1.8, 0.01, 1.1]} />
        <meshStandardMaterial color="#0a1018" metalness={0.7} roughness={0.4}
          emissive="#00c3ff" emissiveIntensity={0.04} />
      </mesh>
      {/* Screen lid */}
      <mesh ref={lidRef} position={[0, 0.75, -0.65]} rotation={[-0.3, 0, 0]}>
        <boxGeometry args={[2.0, 1.4, 0.07]} />
        <meshStandardMaterial color="#0d1520" metalness={0.85} roughness={0.2}
          emissive="#001828" emissiveIntensity={0.2} />
      </mesh>
      {/* Screen display */}
      <mesh ref={screenRef} position={[0, 0.75, -0.61]} rotation={[-0.3, 0, 0]}>
        <planeGeometry args={[1.82, 1.25]} />
        <meshStandardMaterial color="#010c18" emissive="#003860"
          emissiveIntensity={0.5} transparent opacity={0.95} />
      </mesh>
      {/* Screen scanlines */}
      {[-0.4,-0.2,0,0.2,0.4].map((y,i) => (
        <mesh key={i} position={[0, 0.75 + y * 0.9, -0.605]} rotation={[-0.3,0,0]}>
          <planeGeometry args={[1.5, 0.018]} />
          <meshStandardMaterial color="#00c3ff" emissive="#00c3ff"
            emissiveIntensity={1.5} transparent opacity={0.12 - i * 0.015} />
        </mesh>
      ))}
      {/* Platform glow ring */}
      <mesh rotation={[-Math.PI/2, 0, 0]} position={[0,-0.05, 0]}>
        <ringGeometry args={[1.1, 1.5, 60]} />
        <meshStandardMaterial color="#00c3ff" emissive="#00c3ff"
          emissiveIntensity={1.2} transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>
      <pointLight color="#00c3ff" intensity={4} distance={3} position={[0, 0.8, -0.5]} />
      <pointLight color="#7b4fff" intensity={2} distance={3} position={[0,-0.1, 0.5]} />
    </group>
  );
}

/* ── Floating holographic UI panel ──────────────────────────── */
function HoloPanelUI({ position, rotation, color, w = 1.6, h = 1.1, delay = 0 }: {
  position: [number,number,number];
  rotation: [number,number,number];
  color: string; w?: number; h?: number; delay?: number;
}) {
  const gr = useRef<THREE.Group>(null!);
  const phase = useMemo(() => delay, [delay]);

  useFrame((s) => {
    if (gr.current) {
      gr.current.position.y = position[1] + Math.sin(s.clock.elapsedTime * 0.55 + phase) * 0.14;
      gr.current.rotation.y = rotation[1] + Math.sin(s.clock.elapsedTime * 0.2 + phase) * 0.04;
    }
  });

  const border: [number,number,number][] = [
    [-w/2,-h/2,0.01],[w/2,-h/2,0.01],[w/2,h/2,0.01],[-w/2,h/2,0.01],[-w/2,-h/2,0.01]
  ];

  return (
    <group ref={gr} position={position} rotation={rotation}>
      {/* Panel glass */}
      <mesh>
        <planeGeometry args={[w, h]} />
        <meshStandardMaterial color="#010c18" transparent opacity={0.48}
          side={THREE.DoubleSide} emissive={color} emissiveIntensity={0.05} />
      </mesh>
      {/* Border */}
      <Line points={border} color={color} lineWidth={1.3} transparent opacity={0.75} />
      {/* Top bar */}
      <mesh position={[0, h/2 - 0.065, 0.01]}>
        <planeGeometry args={[w, 0.13]} />
        <meshStandardMaterial color={color} emissive={color}
          emissiveIntensity={0.4} transparent opacity={0.25} />
      </mesh>
      {/* Traffic dots */}
      {[-0.08, 0.0, 0.08].map((dx, i) => (
        <mesh key={i} position={[-w/2 + 0.18 + i * 0.1, h/2 - 0.065, 0.015]}>
          <circleGeometry args={[0.022, 10]} />
          <meshStandardMaterial
            color={i===0?"#ff5f56":i===1?"#ffbd2e":"#27c93f"}
            emissive={i===0?"#ff5f56":i===1?"#ffbd2e":"#27c93f"}
            emissiveIntensity={1.8} />
        </mesh>
      ))}
      {/* Content rows */}
      {[0.25,0.07,-0.1,-0.27].map((y, i) => (
        <mesh key={`r${i}`} position={[-w/2 + 0.2 + ((i*0.5)%0.6), y, 0.015]}>
          <planeGeometry args={[0.3 + (i%3)*0.28, 0.019]} />
          <meshStandardMaterial color={color} emissive={color}
            emissiveIntensity={1.2} transparent opacity={0.35 - i*0.05} />
        </mesh>
      ))}
      {/* Code bracket symbols */}
      <mesh position={[-w/2+0.14, 0, 0.012]}>
        <planeGeometry args={[0.045, 0.3]} />
        <meshStandardMaterial color={color} emissive={color}
          emissiveIntensity={1.5} transparent opacity={0.5} />
      </mesh>
      <pointLight color={color} intensity={1.2} distance={1.5} />
    </group>
  );
}

/* ── Connection arc lines laptop → panel ────────────────────── */
function ArcLine({ from, to, color }: {
  from: [number,number,number]; to: [number,number,number]; color: string;
}) {
  const pts: [number,number,number][] = useMemo(() => {
    const steps = 20;
    const result: [number,number,number][] = [];
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      result.push([
        from[0] + (to[0]-from[0])*t,
        from[1] + (to[1]-from[1])*t + Math.sin(t*Math.PI)*0.5,
        from[2] + (to[2]-from[2])*t,
      ]);
    }
    return result;
  }, []);
  return <Line points={pts} color={color} lineWidth={0.6} transparent opacity={0.3} />;
}

export default function ProjectLabScene3D() {
  return (
    <>
      <ambientLight intensity={0.1} />
      <pointLight color="#ffffff" intensity={0.3} position={[0, 4, 3]} />

      <Laptop />

      {/* Floating UI panels */}
      <HoloPanelUI position={[-2.8, 0.6,-1.4]} rotation={[0.06, 0.45, 0]} color="#00c3ff" w={1.7} h={1.1} delay={0}   />
      <HoloPanelUI position={[ 2.7, 0.8,-1.6]} rotation={[0.06,-0.42, 0]} color="#7b4fff" w={1.5} h={1.1} delay={1.5} />
      <HoloPanelUI position={[-2.4,-0.6,-1.2]} rotation={[-0.06, 0.38, 0]} color="#7b4fff" w={1.4} h={0.9} delay={0.8} />
      <HoloPanelUI position={[ 2.5,-0.4,-1.4]} rotation={[-0.06,-0.35, 0]} color="#00c3ff" w={1.3} h={0.9} delay={2.2} />
      <HoloPanelUI position={[-0.8, 1.6,-2.2]} rotation={[0.1,  0.1,  0]} color="#00c3ff" w={1.6} h={1.0} delay={1.1} />
      <HoloPanelUI position={[ 0.9, 1.5,-2.0]} rotation={[0.1, -0.1,  0]} color="#7b4fff" w={1.4} h={0.9} delay={1.8} />

      {/* Connection arcs */}
      <ArcLine from={[0,-0.5,0]} to={[-2.8, 0.6,-1.4]} color="#00c3ff" />
      <ArcLine from={[0,-0.5,0]} to={[ 2.7, 0.8,-1.6]} color="#7b4fff" />
      <ArcLine from={[0,-0.5,0]} to={[-2.4,-0.6,-1.2]} color="#7b4fff" />
      <ArcLine from={[0,-0.5,0]} to={[ 2.5,-0.4,-1.4]} color="#00c3ff" />

      {/* Floor grid */}
      <mesh rotation={[-Math.PI/2, 0, 0]} position={[0,-1.4,-1]}>
        <planeGeometry args={[14, 10, 20, 15]} />
        <meshStandardMaterial color="#00c3ff" wireframe transparent opacity={0.04} />
      </mesh>
    </>
  );
}
