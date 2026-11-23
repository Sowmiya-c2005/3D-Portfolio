import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Line, Sphere } from "@react-three/drei";
import * as THREE from "three";
import { useMouseParallax } from "../../hooks/useMouseParallax";

// ── Floating holographic screen panel ───────────────────────
function HoloPanel({
  position, rotation, width = 2.2, height = 1.4, color = "#00c3ff",
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  width?: number; height?: number; color?: string;
}) {
  const ref = useRef<THREE.Mesh>(null!);
  const phase = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((s) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(s.clock.elapsedTime * 0.4 + phase) * 0.18;
      ref.current.rotation.y = rotation[1] + Math.sin(s.clock.elapsedTime * 0.2 + phase) * 0.06;
    }
  });

  const corners: [number, number, number][] = [
    [-width / 2, -height / 2, 0.01],
    [ width / 2, -height / 2, 0.01],
    [ width / 2,  height / 2, 0.01],
    [-width / 2,  height / 2, 0.01],
    [-width / 2, -height / 2, 0.01],
  ];

  return (
    <group ref={ref} position={position} rotation={rotation}>
      {/* Panel face */}
      <mesh>
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial
          color="#020810" transparent opacity={0.55}
          side={THREE.DoubleSide}
          emissive={color} emissiveIntensity={0.04}
        />
      </mesh>
      {/* Glowing border */}
      <Line points={corners} color={color} lineWidth={1.2} transparent opacity={0.7} />
      {/* Scan line decoration */}
      <mesh position={[0, height / 2 - 0.08, 0.02]}>
        <planeGeometry args={[width - 0.1, 0.012]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} transparent opacity={0.9} />
      </mesh>
      {/* Inner content blocks */}
      {[0.3, 0.1, -0.1, -0.28].map((y, i) => (
        <mesh key={i} position={[-width / 2 + 0.25 + (i % 2) * 0.6, y, 0.02]}>
          <planeGeometry args={[0.4 + Math.random() * 0.5, 0.025]} />
          <meshStandardMaterial
            color={color} emissive={color} emissiveIntensity={1.2}
            transparent opacity={0.5 - i * 0.08}
          />
        </mesh>
      ))}
    </group>
  );
}

// ── Connected node network ───────────────────────────────────
function NodeNetwork() {
  const groupRef = useRef<THREE.Group>(null!);

  const nodes = useMemo<[number, number, number][]>(() => [
    [0, 0, 0], [1.4, 0.8, 0.3], [-1.2, 0.6, -0.2],
    [0.6, -1.0, 0.1], [-0.8, -0.9, 0.4], [1.8, -0.3, -0.1],
    [-1.6, -0.2, 0.2], [0.2, 1.4, -0.3],
  ], []);

  const edges = useMemo(() => [
    [0,1],[0,2],[0,3],[0,4],[1,5],[2,6],[1,7],[3,4],[5,6],
  ], []);

  useFrame((s) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = s.clock.elapsedTime * 0.12;
      groupRef.current.rotation.x = Math.sin(s.clock.elapsedTime * 0.08) * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={[0.4, 0, -1]}>
      {/* Edges */}
      {edges.map(([a, b], i) => {
        const start = new THREE.Vector3(...nodes[a]);
        const end   = new THREE.Vector3(...nodes[b]);
        return (
          <Line key={i}
            points={[start, end]}
            color="#00c3ff" lineWidth={0.6}
            transparent opacity={0.25}
          />
        );
      })}
      {/* Nodes */}
      {nodes.map((pos, i) => (
        <NodeSphere key={i} position={pos} index={i} />
      ))}
    </group>
  );
}

function NodeSphere({ position, index }: { position: [number,number,number]; index: number }) {
  const ref = useRef<THREE.Mesh>(null!);
  const phase = useMemo(() => index * 0.8, [index]);
  const isAccent = index % 3 === 0;

  useFrame((s) => {
    if (ref.current) {
      const scale = 1 + Math.sin(s.clock.elapsedTime * 1.5 + phase) * 0.18;
      ref.current.scale.setScalar(scale);
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.07, 12, 12]} />
      <meshStandardMaterial
        color={isAccent ? "#7b4fff" : "#00c3ff"}
        emissive={isAccent ? "#7b4fff" : "#00c3ff"}
        emissiveIntensity={2.5}
      />
    </mesh>
  );
}

// ── Central glowing core ─────────────────────────────────────
function CoreOrb() {
  const orbRef  = useRef<THREE.Mesh>(null!);
  const ring1   = useRef<THREE.Mesh>(null!);
  const ring2   = useRef<THREE.Mesh>(null!);
  const outerWire = useRef<THREE.Mesh>(null!);

  useFrame((s) => {
    const t = s.clock.elapsedTime;
    if (orbRef.current)   { orbRef.current.rotation.y = t * 0.25; orbRef.current.rotation.z = t * 0.1; }
    if (ring1.current)    { ring1.current.rotation.x = Math.PI / 3 + t * 0.6; ring1.current.rotation.z = t * 0.15; }
    if (ring2.current)    { ring2.current.rotation.x = -Math.PI / 4 + t * 0.4; ring2.current.rotation.y = t * 0.3; }
    if (outerWire.current){ outerWire.current.rotation.y = -t * 0.18; outerWire.current.rotation.x = t * 0.12; }
  });

  return (
    <group position={[-0.3, 0.1, 0]}>
      {/* Core */}
      <Sphere ref={orbRef} args={[0.75, 64, 64]}>
        <MeshDistortMaterial
          color="#001e30" emissive="#003a5c" emissiveIntensity={0.6}
          roughness={0.05} metalness={0.95} distort={0.35} speed={1.8}
          transparent opacity={0.9}
        />
      </Sphere>
      {/* Wireframe shell */}
      <mesh ref={outerWire}>
        <icosahedronGeometry args={[1.1, 1]} />
        <meshStandardMaterial color="#00c3ff" wireframe transparent opacity={0.12} emissive="#00c3ff" emissiveIntensity={0.4} />
      </mesh>
      {/* Ring 1 */}
      <mesh ref={ring1}>
        <torusGeometry args={[1.5, 0.018, 8, 100]} />
        <meshStandardMaterial color="#00c3ff" emissive="#00c3ff" emissiveIntensity={1.5} transparent opacity={0.8} />
      </mesh>
      {/* Ring 2 */}
      <mesh ref={ring2}>
        <torusGeometry args={[1.85, 0.012, 8, 100]} />
        <meshStandardMaterial color="#7b4fff" emissive="#7b4fff" emissiveIntensity={1.2} transparent opacity={0.6} />
      </mesh>
      {/* Glow lights */}
      <pointLight color="#00c3ff" intensity={4} distance={5} />
      <pointLight color="#7b4fff" intensity={2} distance={7} position={[2, 1, 2]} />
    </group>
  );
}

// ── Camera with mouse parallax ───────────────────────────────
function CameraRig() {
  const { mouse } = useMouseParallax(0.03);
  const camGroup = useRef<THREE.Group>(null!);

  useFrame(() => {
    if (camGroup.current) {
      camGroup.current.rotation.y += (mouse.current.x * 0.12 - camGroup.current.rotation.y) * 0.04;
      camGroup.current.rotation.x += (mouse.current.y * 0.08 - camGroup.current.rotation.x) * 0.04;
    }
  });

  return <group ref={camGroup} />;
}

// ── Main exported scene ──────────────────────────────────────
export default function HeroScene3D() {
  return (
    <>
      <CameraRig />
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 8, 5]} color="#ffffff" intensity={0.5} />

      {/* Core orb — centre-right */}
      <CoreOrb />

      {/* Floating holographic panels */}
      <HoloPanel position={[-3.2,  0.6, -2.0]} rotation={[0.05,  0.35, 0]}    width={2.0} height={1.3} color="#00c3ff" />
      <HoloPanel position={[ 2.8,  1.2, -2.5]} rotation={[0.05, -0.4,  0]}    width={1.8} height={1.2} color="#7b4fff" />
      <HoloPanel position={[ 2.4, -1.4, -1.8]} rotation={[-0.1, -0.3,  0.05]} width={1.4} height={0.9} color="#00c3ff" />
      <HoloPanel position={[-3.0, -1.2, -3.0]} rotation={[0.1,   0.25, -0.05]}width={1.6} height={1.0} color="#7b4fff" />

      {/* Node network */}
      <NodeNetwork />
    </>
  );
}
