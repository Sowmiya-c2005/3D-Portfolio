/**
 * AboutScene3D.tsx
 * Reference: Silhouette standing before a glowing rectangular data portal
 * with falling digital particle streams from above.
 */
import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";

/* ── Falling data particle stream ───────────────────────────── */
function DataRain() {
  const count = 120;
  const ref = useRef<THREE.Points>(null!);

  const { positions, speeds } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 5;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8 + 2;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 2 - 1;
      spd[i] = 0.015 + Math.random() * 0.025;
    }
    return { positions: pos, speeds: spd };
  }, []);

  const posRef = useRef(positions.slice());

  useFrame(() => {
    if (!ref.current) return;
    const arr = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] -= speeds[i];
      if (arr[i * 3 + 1] < -4) arr[i * 3 + 1] = 5;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial color="#00c3ff" size={0.055} transparent opacity={0.7}
        sizeAttenuation depthWrite={false} />
    </points>
  );
}

/* ── Rectangular glowing portal frame ───────────────────────── */
function PortalFrame() {
  const w = 2.2; const h = 3.4;
  const ref = useRef<THREE.Group>(null!);

  useFrame((s) => {
    if (ref.current) {
      // Subtle breathing pulse
      const pulse = 1 + Math.sin(s.clock.elapsedTime * 0.8) * 0.015;
      ref.current.scale.setScalar(pulse);
    }
  });

  const outerBorder: [number,number,number][] = [
    [-w/2,-h/2,0],[w/2,-h/2,0],[w/2,h/2,0],[-w/2,h/2,0],[-w/2,-h/2,0]
  ];
  const innerBorder: [number,number,number][] = [
    [-w/2+0.06,-h/2+0.06,0],[w/2-0.06,-h/2+0.06,0],
    [w/2-0.06,h/2-0.06,0],[-w/2+0.06,h/2-0.06,0],[-w/2+0.06,-h/2+0.06,0]
  ];

  return (
    <group ref={ref}>
      {/* Portal fill — translucent glow inside */}
      <mesh>
        <planeGeometry args={[w - 0.1, h - 0.1]} />
        <meshStandardMaterial color="#001830" transparent opacity={0.45}
          emissive="#003060" emissiveIntensity={0.4} side={THREE.DoubleSide} />
      </mesh>

      {/* Outer bright frame */}
      <Line points={outerBorder} color="#00c3ff" lineWidth={2.5} transparent opacity={0.95} />
      {/* Inner secondary frame */}
      <Line points={innerBorder} color="#7b4fff" lineWidth={1.2} transparent opacity={0.6} />

      {/* Top glowing bar */}
      <mesh position={[0, h/2, 0.01]}>
        <planeGeometry args={[w, 0.025]} />
        <meshStandardMaterial color="#00c3ff" emissive="#00c3ff" emissiveIntensity={4}
          transparent opacity={1} />
      </mesh>
      {/* Top glow light */}
      <pointLight position={[0, h/2, 0.1]} color="#00c3ff" intensity={6} distance={3} />
      {/* Bottom glow */}
      <pointLight position={[0,-h/2, 0.1]} color="#7b4fff" intensity={3} distance={2} />

      {/* Corner accent squares */}
      {[[-w/2, h/2],[ w/2, h/2],[-w/2,-h/2],[ w/2,-h/2]].map(([cx,cy],i) => (
        <mesh key={i} position={[cx as number, cy as number, 0.015]}>
          <planeGeometry args={[0.12, 0.12]} />
          <meshStandardMaterial color="#00c3ff" emissive="#00c3ff"
            emissiveIntensity={3} transparent opacity={0.9} />
        </mesh>
      ))}

      {/* Horizontal scan lines inside portal */}
      {[-1.2, -0.6, 0, 0.6, 1.2].map((y, i) => (
        <mesh key={`sl${i}`} position={[0, y, 0.005]}>
          <planeGeometry args={[w - 0.2, 0.012]} />
          <meshStandardMaterial color="#00c3ff" emissive="#00c3ff"
            emissiveIntensity={1.2} transparent opacity={0.15} />
        </mesh>
      ))}
    </group>
  );
}

/* ── Silhouette figure ───────────────────────────────────────── */
function Silhouette() {
  // Simple silhouette: head + body made from dark boxes
  return (
    <group position={[0, -1.9, 0.1]}>
      {/* Head */}
      <mesh position={[0, 0.95, 0]}>
        <sphereGeometry args={[0.13, 10, 10]} />
        <meshStandardMaterial color="#040c18" />
      </mesh>
      {/* Body */}
      <mesh position={[0, 0.44, 0]}>
        <boxGeometry args={[0.26, 0.6, 0.1]} />
        <meshStandardMaterial color="#040c18" />
      </mesh>
      {/* Legs */}
      <mesh position={[-0.07, -0.08, 0]}>
        <boxGeometry args={[0.1, 0.5, 0.09]} />
        <meshStandardMaterial color="#040c18" />
      </mesh>
      <mesh position={[0.07, -0.08, 0]}>
        <boxGeometry args={[0.1, 0.5, 0.09]} />
        <meshStandardMaterial color="#040c18" />
      </mesh>
      {/* Rim light — blue from portal */}
      <pointLight color="#00c3ff" intensity={2} distance={1.5} position={[0, 0.5, -0.3]} />
    </group>
  );
}

/* ── Floor reflection ───────────────────────────────────────── */
function FloorPlane() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((s) => {
    if (ref.current)
      (ref.current.material as THREE.MeshStandardMaterial).opacity =
        0.12 + Math.sin(s.clock.elapsedTime * 0.5) * 0.03;
  });
  return (
    <mesh ref={ref} rotation={[-Math.PI/2, 0, 0]} position={[0,-2.4, 0]}>
      <planeGeometry args={[12, 10, 20, 20]} />
      <meshStandardMaterial color="#00c3ff" wireframe transparent opacity={0.12} />
    </mesh>
  );
}

export default function AboutScene3D() {
  return (
    <>
      <ambientLight intensity={0.08} />
      <pointLight color="#ffffff" intensity={0.3} position={[0, 5, 3]} />

      <DataRain />
      <PortalFrame />
      <Silhouette />
      <FloorPlane />
    </>
  );
}
