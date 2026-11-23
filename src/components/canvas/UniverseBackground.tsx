/**
 * UniverseBackground.tsx
 * Global persistent 3D universe canvas — stays fixed behind entire site.
 * Premium deep-space aesthetic: ultra-dense starfield, coloured nebula
 * dust, slow-drifting galaxy plane, subtle grid horizon.
 * NO random floating polyhedra — clean immersive depth.
 */
import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

/* ─── Layer 1: Dense white/silver starfield (far, tiny) ─── */
function StarFieldFar() {
  const ref = useRef<THREE.Points>(null!);
  const positions = useMemo(() => {
    const p = new Float32Array(6000 * 3);
    for (let i = 0; i < 6000; i++) {
      const r = 35 + Math.random() * 60;
      const θ = Math.random() * Math.PI * 2;
      const φ = Math.acos(2 * Math.random() - 1);
      p[i * 3]     = r * Math.sin(φ) * Math.cos(θ);
      p[i * 3 + 1] = r * Math.sin(φ) * Math.sin(θ);
      p[i * 3 + 2] = r * Math.cos(φ);
    }
    return p;
  }, []);

  useFrame((s) => {
    if (ref.current) {
      ref.current.rotation.y = s.clock.elapsedTime * 0.004;
      ref.current.rotation.x = Math.sin(s.clock.elapsedTime * 0.002) * 0.03;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#c8d8f0" size={0.012}
        sizeAttenuation depthWrite={false} opacity={0.65} />
    </Points>
  );
}

/* ─── Layer 2: Mid-field brighter stars (some twinkle) ─── */
function StarFieldMid() {
  const ref = useRef<THREE.Points>(null!);
  const positions = useMemo(() => {
    const p = new Float32Array(1800 * 3);
    for (let i = 0; i < 1800; i++) {
      const r = 15 + Math.random() * 28;
      const θ = Math.random() * Math.PI * 2;
      const φ = Math.acos(2 * Math.random() - 1);
      p[i * 3]     = r * Math.sin(φ) * Math.cos(θ);
      p[i * 3 + 1] = r * Math.sin(φ) * Math.sin(θ);
      p[i * 3 + 2] = r * Math.cos(φ);
    }
    return p;
  }, []);

  useFrame((s) => {
    if (ref.current) {
      ref.current.rotation.y = s.clock.elapsedTime * 0.007;
      // gentle opacity twinkle
      (ref.current.material as THREE.PointsMaterial).opacity =
        0.5 + Math.sin(s.clock.elapsedTime * 1.1) * 0.08;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#e0eeff" size={0.022}
        sizeAttenuation depthWrite={false} opacity={0.55} />
    </Points>
  );
}

/* ─── Layer 3: Blue nebula cloud ─── */
function NebulaBlue() {
  const ref = useRef<THREE.Points>(null!);
  const count = 1400;
  const positions = useMemo(() => {
    const p = new Float32Array(count * 3);
    // Concentrated cloud band in the upper right
    for (let i = 0; i < count; i++) {
      p[i * 3]     = (Math.random() - 0.3) * 28 + 8;
      p[i * 3 + 1] = (Math.random() - 0.5) * 16 + 2;
      p[i * 3 + 2] = (Math.random() - 0.5) * 20 - 10;
    }
    return p;
  }, []);

  useFrame((s) => {
    if (ref.current) {
      ref.current.rotation.y  = s.clock.elapsedTime * 0.012;
      ref.current.position.y  = Math.sin(s.clock.elapsedTime * 0.08) * 0.6;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#0088cc" size={0.09}
        sizeAttenuation depthWrite={false} opacity={0.14} />
    </Points>
  );
}

/* ─── Layer 4: Violet/purple nebula cloud ─── */
function NebulaViolet() {
  const ref = useRef<THREE.Points>(null!);
  const count = 1000;
  const positions = useMemo(() => {
    const p = new Float32Array(count * 3);
    // Concentrated cloud band in the lower left
    for (let i = 0; i < count; i++) {
      p[i * 3]     = (Math.random() - 0.7) * 26 - 8;
      p[i * 3 + 1] = (Math.random() - 0.5) * 14 - 2;
      p[i * 3 + 2] = (Math.random() - 0.5) * 18 - 12;
    }
    return p;
  }, []);

  useFrame((s) => {
    if (ref.current) {
      ref.current.rotation.y  = -s.clock.elapsedTime * 0.009;
      ref.current.position.y  = Math.cos(s.clock.elapsedTime * 0.07) * 0.5;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#6633cc" size={0.11}
        sizeAttenuation depthWrite={false} opacity={0.11} />
    </Points>
  );
}

/* ─── Layer 5: Subtle horizon grid (infinite floor feeling) ─── */
function GridHorizon() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((s) => {
    if (ref.current) {
      (ref.current.material as THREE.MeshBasicMaterial).opacity =
        0.028 + Math.sin(s.clock.elapsedTime * 0.2) * 0.009;
    }
  });
  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, -10, -4]}>
      <planeGeometry args={[80, 80, 48, 48]} />
      <meshBasicMaterial color="#00c3ff" wireframe transparent opacity={0.028} />
    </mesh>
  );
}

/* ─── Layer 6: Faint deep-space glow plane (backlight) ─── */
function NebulaDustGlow() {
  return (
    <mesh position={[0, 0, -30]}>
      <planeGeometry args={[80, 50]} />
      <meshBasicMaterial color="#030820" transparent opacity={1} />
    </mesh>
  );
}

/* ─── Scroll + mouse reactive camera ─── */
function CameraController() {
  const { camera } = useThree();
  const scroll = useRef(0);
  const mouse  = useRef({ x: 0, y: 0 });

  useMemo(() => {
    const onScroll = () => { scroll.current = window.scrollY; };
    const onMouse  = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("scroll",    onScroll, { passive: true });
    window.addEventListener("mousemove", onMouse,  { passive: true });
    return () => {
      window.removeEventListener("scroll",    onScroll);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  const tY  = useRef(0);
  const tRX = useRef(0);
  const tRY = useRef(0);

  useFrame(() => {
    const prog = scroll.current / (document.body.scrollHeight - window.innerHeight || 1);
    tY.current  = -prog * 4;
    tRX.current =  mouse.current.y * 0.045;
    tRY.current =  mouse.current.x * 0.07;

    camera.position.y += (tY.current  - camera.position.y)  * 0.025;
    camera.rotation.x += (tRX.current - camera.rotation.x)  * 0.035;
    camera.rotation.y += (tRY.current - camera.rotation.y)  * 0.035;
  });

  return null;
}

export default function UniverseBackground() {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
      /* deep midnight navy CSS gradient as CSS fallback */
      background: "radial-gradient(ellipse 120% 80% at 70% 20%, rgba(0,30,70,0.55) 0%, transparent 60%), radial-gradient(ellipse 100% 70% at 20% 80%, rgba(60,20,110,0.4) 0%, transparent 55%), #04080f",
    }}>
      <Canvas camera={{ position: [0, 0, 14], fov: 52 }}
        gl={{ antialias: true, alpha: true }} dpr={[1, 1.5]}
        style={{ background: "transparent" }}>

        <NebulaDustGlow />
        <CameraController />

        <StarFieldFar />
        <StarFieldMid />
        <NebulaBlue />
        <NebulaViolet />
        <GridHorizon />
      </Canvas>
    </div>
  );
}
