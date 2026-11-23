/**
 * ContactScene3D.tsx
 * Contact section — Metallic corridor with a massive glowing golden circular
 * mandala / concentric-ring portal at the end. Person silhouette in foreground.
 * Warm golden/amber colour scheme. Matches reference image 7.
 */
import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ── Single concentric mandala ring ── */
function MandalaRing({
  radius,
  tubeRadius,
  color,
  emissiveIntensity,
  speed,
  tiltOffset = 0,
}: {
  radius: number;
  tubeRadius: number;
  color: string;
  emissiveIntensity: number;
  speed: number;
  tiltOffset?: number;
}) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((s) => {
    if (ref.current) {
      ref.current.rotation.z = s.clock.elapsedTime * speed + tiltOffset;
    }
  });
  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, tubeRadius, 12, 180]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={emissiveIntensity}
        metalness={0.8}
        roughness={0.1}
        transparent
        opacity={0.92}
      />
    </mesh>
  );
}

/* ── Radial spoke lines of the mandala ── */
function MandalaSpokes({
  count,
  outerRadius,
  color,
  speed,
}: {
  count: number;
  outerRadius: number;
  color: string;
  speed: number;
}) {
  const ref = useRef<THREE.Group>(null!);
  useFrame((s) => {
    if (ref.current)
      ref.current.rotation.z = s.clock.elapsedTime * speed;
  });
  const spokes = useMemo(() => {
    return Array.from({ length: count }, (_, i) => (i / count) * Math.PI * 2);
  }, [count]);

  return (
    <group ref={ref}>
      {spokes.map((angle, i) => {
        const x = Math.cos(angle) * outerRadius * 0.5;
        const y = Math.sin(angle) * outerRadius * 0.5;
        return (
          <mesh
            key={i}
            position={[x, y, 0]}
            rotation={[0, 0, angle + Math.PI / 2]}
          >
            <planeGeometry args={[0.012, outerRadius]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={1.2}
              transparent
              opacity={0.5}
            />
          </mesh>
        );
      })}
    </group>
  );
}

/* ── Glowing circuit-pattern arc segments ── */
function CircuitArcs({ radius, color }: { radius: number; color: string }) {
  const ref = useRef<THREE.Group>(null!);
  useFrame((s) => {
    if (ref.current)
      ref.current.rotation.z = -s.clock.elapsedTime * 0.08;
  });
  const arcs = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => i);
  }, []);
  return (
    <group ref={ref}>
      {arcs.map((i) => {
        const angle = (i / 12) * Math.PI * 2;
        return (
          <mesh key={i} rotation={[0, 0, angle]}>
            <torusGeometry args={[radius, 0.008, 6, 60, Math.PI * 0.18]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={2}
              transparent
              opacity={0.7}
            />
          </mesh>
        );
      })}
    </group>
  );
}

/* ── Corridor wall panel (left or right) ── */
function CorridorWall({
  x,
  flip,
}: {
  x: number;
  flip: boolean;
}) {
  const panelXs = useMemo(
    () => [-2.5, -1.2, 0.0, 1.2, 2.5],
    []
  );
  const signX = flip ? -1 : 1;
  return (
    <group position={[x, 0, 0]}>
      {/* Main wall face */}
      <mesh rotation={[0, (Math.PI / 2) * signX, 0]}>
        <planeGeometry args={[12, 5]} />
        <meshStandardMaterial color="#1a1408" metalness={0.7} roughness={0.4} />
      </mesh>
      {/* Horizontal structural ribs */}
      {[-1.6, -0.4, 0.8, 2.0].map((z, i) => (
        <mesh key={i} position={[0, 0, z]} rotation={[0, (Math.PI / 2) * signX, 0]}>
          <planeGeometry args={[0.08, 5]} />
          <meshStandardMaterial
            color="#3a2f10"
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>
      ))}
      {/* Vertical frame struts */}
      {panelXs.map((pz, i) => (
        <mesh key={i} position={[0, 0, pz]} rotation={[0, (Math.PI / 2) * signX, 0]}>
          <planeGeometry args={[12, 0.06]} />
          <meshStandardMaterial
            color="#2a2208"
            metalness={0.8}
            roughness={0.3}
          />
        </mesh>
      ))}
      {/* Amber glow strip along inner edge */}
      <mesh position={[flip ? -0.02 : 0.02, 0, 0]} rotation={[0, (Math.PI / 2) * signX, 0]}>
        <planeGeometry args={[12, 0.04]} />
        <meshStandardMaterial
          color="#ffaa00"
          emissive="#ffaa00"
          emissiveIntensity={2.5}
          transparent
          opacity={0.8}
        />
      </mesh>
    </group>
  );
}

/* ── Person silhouette (simple body shapes) ── */
function PersonSilhouette() {
  return (
    <group position={[0, -1.4, 1.8]}>
      {/* head */}
      <mesh position={[0, 1.72, 0]}>
        <sphereGeometry args={[0.13, 16, 16]} />
        <meshStandardMaterial color="#0d0a04" />
      </mesh>
      {/* torso */}
      <mesh position={[0, 1.08, 0]}>
        <boxGeometry args={[0.38, 0.65, 0.18]} />
        <meshStandardMaterial color="#0d0a04" />
      </mesh>
      {/* left arm */}
      <mesh position={[-0.26, 1.0, 0]} rotation={[0, 0, 0.3]}>
        <boxGeometry args={[0.11, 0.6, 0.12]} />
        <meshStandardMaterial color="#0d0a04" />
      </mesh>
      {/* right arm */}
      <mesh position={[0.26, 1.0, 0]} rotation={[0, 0, -0.3]}>
        <boxGeometry args={[0.11, 0.6, 0.12]} />
        <meshStandardMaterial color="#0d0a04" />
      </mesh>
      {/* left leg */}
      <mesh position={[-0.1, 0.38, 0]}>
        <boxGeometry args={[0.14, 0.72, 0.15]} />
        <meshStandardMaterial color="#0d0a04" />
      </mesh>
      {/* right leg */}
      <mesh position={[0.1, 0.38, 0]}>
        <boxGeometry args={[0.14, 0.72, 0.15]} />
        <meshStandardMaterial color="#0d0a04" />
      </mesh>
    </group>
  );
}

/* ── Ambient golden particle dust ── */
function GoldenDust() {
  const pts = useMemo(() => {
    const p: number[] = [];
    for (let i = 0; i < 200; i++) {
      p.push(
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 5,
        Math.random() * -8 + 2
      );
    }
    return new Float32Array(p);
  }, []);
  const ref = useRef<THREE.Points>(null!);
  useFrame((s) => {
    if (ref.current)
      ref.current.rotation.y = s.clock.elapsedTime * 0.02;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[pts, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#ffcc44" size={0.025} transparent opacity={0.55} />
    </points>
  );
}

export default function ContactScene3D() {
  const mandalaPulse = useRef<THREE.PointLight>(null!);
  useFrame((s) => {
    if (mandalaPulse.current) {
      mandalaPulse.current.intensity =
        14 + Math.sin(s.clock.elapsedTime * 1.6) * 4;
    }
  });

  return (
    <>
      <ambientLight intensity={0.07} color="#3a2a04" />

      {/* Core mandala point light — pulsing */}
      <pointLight
        ref={mandalaPulse}
        color="#ffaa00"
        intensity={18}
        distance={12}
        position={[0, 0, -3.5]}
      />
      {/* Warm fill from mandala */}
      <pointLight color="#ff7700" intensity={5} distance={10} position={[0, 0.5, -2]} />
      {/* Subtle ceiling ambience */}
      <pointLight color="#ffe066" intensity={2} distance={8} position={[0, 3, 0]} />

      {/* ── Dark backdrop ── */}
      <mesh position={[0, 0, -6]}>
        <planeGeometry args={[18, 10]} />
        <meshStandardMaterial color="#080500" />
      </mesh>

      {/* ── Floor ── */}
      <mesh position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[8, 14]} />
        <meshStandardMaterial
          color="#100d04"
          metalness={0.8}
          roughness={0.25}
        />
      </mesh>
      {/* Floor centre glow runner */}
      <mesh position={[0, -1.98, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.08, 14]} />
        <meshStandardMaterial
          color="#ffaa00"
          emissive="#ffaa00"
          emissiveIntensity={2.5}
          transparent
          opacity={0.65}
        />
      </mesh>

      {/* ── Ceiling strip ── */}
      <mesh position={[0, 2.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[8, 14]} />
        <meshStandardMaterial color="#0d0a04" metalness={0.6} roughness={0.4} />
      </mesh>
      {/* Ceiling light strip */}
      <mesh position={[0, 2.48, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.18, 14]} />
        <meshStandardMaterial
          color="#ffe680"
          emissive="#ffe680"
          emissiveIntensity={2}
          transparent
          opacity={0.75}
        />
      </mesh>

      {/* ── Corridor walls ── */}
      <CorridorWall x={-3.0} flip={false} />
      <CorridorWall x={ 3.0} flip={true}  />

      {/* ── MANDALA PORTAL (at back wall z = -4) ── */}
      <group position={[0, 0, -4]}>
        {/* Back wall */}
        <mesh>
          <planeGeometry args={[8, 6]} />
          <meshStandardMaterial color="#120e02" metalness={0.5} roughness={0.5} />
        </mesh>

        {/* Concentric golden torus rings — innermost to outermost */}
        <MandalaRing radius={0.22} tubeRadius={0.016} color="#ffdd44" emissiveIntensity={4.0}  speed={0.5}   />
        <MandalaRing radius={0.44} tubeRadius={0.014} color="#ffcc00" emissiveIntensity={3.5}  speed={-0.35} />
        <MandalaRing radius={0.66} tubeRadius={0.013} color="#ffbb00" emissiveIntensity={3.2}  speed={0.28}  />
        <MandalaRing radius={0.88} tubeRadius={0.012} color="#ffaa00" emissiveIntensity={3.0}  speed={-0.22} />
        <MandalaRing radius={1.10} tubeRadius={0.011} color="#ff9900" emissiveIntensity={2.6}  speed={0.18}  />
        <MandalaRing radius={1.32} tubeRadius={0.011} color="#ff8800" emissiveIntensity={2.3}  speed={-0.15} />
        <MandalaRing radius={1.54} tubeRadius={0.010} color="#ff7700" emissiveIntensity={2.0}  speed={0.12}  />
        <MandalaRing radius={1.76} tubeRadius={0.009} color="#ff6600" emissiveIntensity={1.7}  speed={-0.10} />
        <MandalaRing radius={1.96} tubeRadius={0.009} color="#ff5500" emissiveIntensity={1.4}  speed={0.08}  />

        {/* Bright outer rim */}
        <MandalaRing radius={2.1}  tubeRadius={0.022} color="#ffcc00" emissiveIntensity={3.5}  speed={0.06}  />

        {/* Radial spokes */}
        <MandalaSpokes count={24} outerRadius={3.8} color="#ffcc44" speed={0.05} />
        <MandalaSpokes count={12} outerRadius={3.0} color="#ff9900" speed={-0.07} />

        {/* Circuit arc decorations */}
        <CircuitArcs radius={1.3} color="#ffaa00" />
        <CircuitArcs radius={1.75} color="#ff8800" />

        {/* Intense centre core glow */}
        <mesh>
          <circleGeometry args={[0.18, 32]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#ffee88"
            emissiveIntensity={8}
          />
        </mesh>

        {/* Inner glow halo disc */}
        <mesh position={[0, 0, 0.001]}>
          <circleGeometry args={[0.6, 48]} />
          <meshStandardMaterial
            color="#ffcc00"
            emissive="#ffcc00"
            emissiveIntensity={2}
            transparent
            opacity={0.25}
          />
        </mesh>
      </group>

      {/* ── Person silhouette ── */}
      <PersonSilhouette />

      {/* ── Floating golden dust ── */}
      <GoldenDust />
    </>
  );
}
