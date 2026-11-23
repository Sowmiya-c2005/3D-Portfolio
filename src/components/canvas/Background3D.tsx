import React, { useRef, useMemo, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

/* ── Deep-space star field with gentle parallax ──────────────── */
function StarField() {
  const ref = useRef<THREE.Points>(null!);
  const count = 3200;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 18 + Math.random() * 25;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.008;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.004) * 0.06;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent color="#94b8d4" size={0.025}
        sizeAttenuation depthWrite={false} opacity={0.6}
      />
    </Points>
  );
}

/* ── Nebula colour-coded particles ───────────────────────────── */
function NebulaParticles() {
  const ref = useRef<THREE.Points>(null!);
  const count = 800;

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 28;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
      const t = Math.random();
      // Blue or violet
      if (t < 0.5) {
        col[i * 3] = 0;    col[i * 3 + 1] = 0.76; col[i * 3 + 2] = 1;
      } else {
        col[i * 3] = 0.48; col[i * 3 + 1] = 0.31; col[i * 3 + 2] = 1;
      }
    }
    return { positions: pos, colors: col };
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.018;
      ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.4;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent vertexColors size={0.065}
        sizeAttenuation depthWrite={false} opacity={0.3}
      />
    </Points>
  );
}

/* ── Floating ambient wireframe shapes ───────────────────────── */
function FloatingShape({
  pos,
  kind,
  speed,
  colorSeed,
}: {
  pos: [number, number, number];
  kind: "ico" | "oct" | "torus" | "dodeca";
  speed: number;
  colorSeed: number;
}) {
  const ref = useRef<THREE.Mesh>(null!);
  const phase = useRef(Math.random() * Math.PI * 2);
  const c = colorSeed > 0.5 ? "#00c3ff" : "#7b4fff";

  useFrame((s) => {
    const t = s.clock.elapsedTime;
    if (ref.current) {
      ref.current.rotation.x = t * speed * 0.3;
      ref.current.rotation.y = t * speed * 0.5;
      ref.current.position.y = pos[1] + Math.sin(t * speed * 0.5 + phase.current) * 0.7;
    }
  });

  return (
    <mesh ref={ref} position={pos}>
      {kind === "ico"    && <icosahedronGeometry args={[0.45, 0]} />}
      {kind === "oct"    && <octahedronGeometry  args={[0.4, 0]} />}
      {kind === "torus"  && <torusGeometry       args={[0.35, 0.12, 8, 32]} />}
      {kind === "dodeca" && <dodecahedronGeometry args={[0.4, 0]} />}
      <meshStandardMaterial
        color={c} wireframe transparent opacity={0.18}
        emissive={c} emissiveIntensity={0.4}
      />
    </mesh>
  );
}

/* ── Scroll-responsive camera ────────────────────────────────── */
function ScrollCamera() {
  const { camera } = useThree();
  const scrollRef = useRef(0);

  useFrame(() => {
    // Smooth scroll tracking
    const target = window.scrollY * 0.0005;
    scrollRef.current += (target - scrollRef.current) * 0.05;
    camera.position.y = -scrollRef.current * 2;
    camera.rotation.x = scrollRef.current * 0.1;
  });

  return null;
}

/* ── Main exported background ────────────────────────────────── */
export default function Background3D() {
  return (
    <div className="canvas-bg" style={{ opacity: 0.85 }}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.12} />
        <pointLight position={[8, 6, 4]} color="#00c3ff" intensity={0.5} />
        <pointLight position={[-8, -6, -4]} color="#7b4fff" intensity={0.35} />

        <ScrollCamera />
        <StarField />
        <NebulaParticles />

        {/* Scattered wireframe shapes */}
        <FloatingShape pos={[-9,  3, -6]}  kind="ico"    speed={0.5}  colorSeed={0.8} />
        <FloatingShape pos={[ 9, -2, -7]}  kind="torus"  speed={0.35} colorSeed={0.3} />
        <FloatingShape pos={[-6, -5, -8]}  kind="oct"    speed={0.65} colorSeed={0.6} />
        <FloatingShape pos={[ 7,  5, -5]}  kind="dodeca" speed={0.4}  colorSeed={0.9} />
        <FloatingShape pos={[ 0, -7, -9]}  kind="torus"  speed={0.25} colorSeed={0.4} />
        <FloatingShape pos={[-3,  7, -10]} kind="ico"    speed={0.3}  colorSeed={0.2} />
        <FloatingShape pos={[ 5, -8, -6]}  kind="dodeca" speed={0.45} colorSeed={0.7} />
      </Canvas>
    </div>
  );
}
