import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Line } from "@react-three/drei";
import * as THREE from "three";

/* ── Floating tech grid — wireframe lattice ───────────────────── */
function TechGrid() {
  const groupRef = useRef<THREE.Group>(null!);

  const gridPoints = useMemo(() => {
    const points: [number, number, number][] = [];
    for (let x = -2; x <= 2; x++) {
      for (let y = -2; y <= 2; y++) {
        for (let z = -1; z <= 1; z++) {
          if (Math.random() > 0.4) {
            points.push([x * 0.9, y * 0.9, z * 0.9]);
          }
        }
      }
    }
    return points;
  }, []);

  const edges = useMemo(() => {
    const result: [number, number][] = [];
    for (let i = 0; i < gridPoints.length; i++) {
      for (let j = i + 1; j < gridPoints.length; j++) {
        const dist = Math.sqrt(
          (gridPoints[i][0] - gridPoints[j][0]) ** 2 +
          (gridPoints[i][1] - gridPoints[j][1]) ** 2 +
          (gridPoints[i][2] - gridPoints[j][2]) ** 2
        );
        if (dist < 1.1 && Math.random() > 0.3) {
          result.push([i, j]);
        }
      }
    }
    return result;
  }, [gridPoints]);

  useFrame((s) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = s.clock.elapsedTime * 0.08;
      groupRef.current.rotation.x = Math.sin(s.clock.elapsedTime * 0.05) * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Edges */}
      {edges.map(([a, b], i) => (
        <Line
          key={i}
          points={[
            new THREE.Vector3(...gridPoints[a]),
            new THREE.Vector3(...gridPoints[b]),
          ]}
          color="#00c3ff"
          lineWidth={0.5}
          transparent
          opacity={0.15}
        />
      ))}
      {/* Nodes */}
      {gridPoints.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial
            color={i % 3 === 0 ? "#7b4fff" : "#00c3ff"}
            emissive={i % 3 === 0 ? "#7b4fff" : "#00c3ff"}
            emissiveIntensity={2}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ── Orbiting ring ────────────────────────────────────────────── */
function OrbitRing({ radius, speed, color, tilt }: {
  radius: number; speed: number; color: string; tilt: [number, number, number];
}) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((s) => {
    if (ref.current) {
      ref.current.rotation.z = s.clock.elapsedTime * speed;
    }
  });
  return (
    <mesh ref={ref} rotation={tilt}>
      <torusGeometry args={[radius, 0.012, 8, 100]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={1}
        transparent
        opacity={0.5}
      />
    </mesh>
  );
}

export default function SkillsScene3D() {
  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[3, 3, 3]} color="#00c3ff" intensity={2} distance={8} />
      <pointLight position={[-3, -2, 2]} color="#7b4fff" intensity={1.5} distance={8} />

      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
        <TechGrid />
      </Float>

      <OrbitRing radius={3} speed={0.3} color="#00c3ff" tilt={[Math.PI / 4, 0, 0]} />
      <OrbitRing radius={3.5} speed={-0.2} color="#7b4fff" tilt={[-Math.PI / 3, Math.PI / 6, 0]} />
    </>
  );
}
