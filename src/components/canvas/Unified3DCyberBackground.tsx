import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { useTheme } from "../../context/ThemeContext";

export default function Unified3DCyberBackground() {
  const mountRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  // References to dynamically update Three.js scene on theme switch
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const wavePointsMatRef = useRef<THREE.PointsMaterial | null>(null);
  const starsMaterialRef = useRef<THREE.PointsMaterial | null>(null);
  const bokehMaterialRef = useRef<THREE.PointsMaterial | null>(null);
  const primaryLightRef = useRef<THREE.PointLight | null>(null);
  const secondaryLightRef = useRef<THREE.PointLight | null>(null);

  // Smoothly update materials and lighting when theme changes
  useEffect(() => {
    if (!sceneRef.current || !rendererRef.current) return;

    // Update scene fog and clear color
    sceneRef.current.fog = new THREE.FogExp2(theme.bgDarkHex, 0.022);
    rendererRef.current.setClearColor(theme.bgDarkHex, 1);

    // Update stardust ocean points material
    if (wavePointsMatRef.current) {
      wavePointsMatRef.current.color.setHex(theme.primaryHex);
    }

    // Update star points material
    if (starsMaterialRef.current) {
      starsMaterialRef.current.color.setHex(theme.secondaryHex);
    }

    // Update bokeh orbs material
    if (bokehMaterialRef.current) {
      bokehMaterialRef.current.color.setHex(theme.primaryHex);
    }

    // Update point lights
    if (primaryLightRef.current) {
      primaryLightRef.current.color.setHex(theme.primaryHex);
    }
    if (secondaryLightRef.current) {
      secondaryLightRef.current.color.setHex(theme.secondaryHex);
    }
  }, [theme]);

  // Main Three.js Scene Setup
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // ── Scene, Camera & Renderer ──
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(theme.bgDarkHex, 0.022);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      52,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 3.2, 22);
    camera.rotation.x = -0.1;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(theme.bgDarkHex, 1);
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // Helper: create a smooth circular particle texture to avoid square points
    const createCircleTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
        gradient.addColorStop(0.3, "rgba(255, 255, 255, 0.85)");
        gradient.addColorStop(0.7, "rgba(255, 255, 255, 0.2)");
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 64, 64);
      }
      const texture = new THREE.CanvasTexture(canvas);
      return texture;
    };

    const particleTexture = createCircleTexture();

    // ── Multi-Point Cinematic Lighting ──
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const primaryLight = new THREE.PointLight(theme.primaryHex, 3.2, 70);
    primaryLight.position.set(-10, 6, 12);
    scene.add(primaryLight);
    primaryLightRef.current = primaryLight;

    const secondaryLight = new THREE.PointLight(theme.secondaryHex, 2.8, 70);
    secondaryLight.position.set(10, 5, 10);
    scene.add(secondaryLight);
    secondaryLightRef.current = secondaryLight;

    // ── 1. Harmonic Stardust Wave Ocean (Points Only — NO Flat Plane Mesh, NO Hard Shapes) ──
    // 55 x 45 grid = 2,475 crystalline stardust points undulating in 3D harmony
    const waveCols = 56;
    const waveRows = 46;
    const waveCount = waveCols * waveRows;
    const wavePositions = new Float32Array(waveCount * 3);
    const origWavePositions = new Float32Array(waveCount * 3);
    const waveColors = new Float32Array(waveCount * 3);

    const primaryColor = new THREE.Color(theme.primaryHex);
    const secondaryColor = new THREE.Color(theme.secondaryHex);

    const waveSpreadX = 110;
    const waveSpreadZ = 90;

    let idx = 0;
    for (let i = 0; i < waveCols; i++) {
      for (let j = 0; j < waveRows; j++) {
        const x = (i / (waveCols - 1) - 0.5) * waveSpreadX;
        const z = (j / (waveRows - 1) - 0.5) * waveSpreadZ;
        const y = -4.2;

        wavePositions[idx * 3] = x;
        wavePositions[idx * 3 + 1] = y;
        wavePositions[idx * 3 + 2] = z;

        origWavePositions[idx * 3] = x;
        origWavePositions[idx * 3 + 1] = y;
        origWavePositions[idx * 3 + 2] = z;

        // Alternate or blend colors between primary amethyst and secondary champagne gold
        const blendFactor = (Math.sin(i * 0.25) + Math.cos(j * 0.25) + 2) / 4;
        const pColor = primaryColor.clone().lerp(secondaryColor, blendFactor * 0.7);
        waveColors[idx * 3] = pColor.r;
        waveColors[idx * 3 + 1] = pColor.g;
        waveColors[idx * 3 + 2] = pColor.b;

        idx++;
      }
    }

    const waveGeometry = new THREE.BufferGeometry();
    waveGeometry.setAttribute("position", new THREE.BufferAttribute(wavePositions, 3));
    waveGeometry.setAttribute("color", new THREE.BufferAttribute(waveColors, 3));

    const wavePointsMaterial = new THREE.PointsMaterial({
      size: 0.65,
      map: particleTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    wavePointsMatRef.current = wavePointsMaterial;

    const wavePointsMesh = new THREE.Points(waveGeometry, wavePointsMaterial);
    scene.add(wavePointsMesh);

    // ── 2. Twinkling Cosmic Micro-Starfield (Distant Diamonds) ──
    const starCount = 380;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starPhases = new Float32Array(starCount);

    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 80;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 36 + 6;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 65 - 4;
      starPhases[i] = Math.random() * Math.PI * 2;
    }

    starGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));

    const starsMaterial = new THREE.PointsMaterial({
      color: theme.secondaryHex,
      size: 0.4,
      map: particleTexture,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    starsMaterialRef.current = starsMaterial;
    const starPoints = new THREE.Points(starGeometry, starsMaterial);
    scene.add(starPoints);

    // ── 3. Floating Bioluminescent Bokeh Orbs (Soft Foreground Glow) ──
    const bokehCount = 38;
    const bokehGeometry = new THREE.BufferGeometry();
    const bokehPositions = new Float32Array(bokehCount * 3);
    const bokehVelocities: { y: number; phase: number }[] = [];

    for (let i = 0; i < bokehCount; i++) {
      bokehPositions[i * 3] = (Math.random() - 0.5) * 60;
      bokehPositions[i * 3 + 1] = (Math.random() - 0.5) * 24 + 4;
      bokehPositions[i * 3 + 2] = (Math.random() - 0.5) * 45;

      bokehVelocities.push({
        y: 0.009 + Math.random() * 0.016,
        phase: Math.random() * Math.PI * 2,
      });
    }

    bokehGeometry.setAttribute("position", new THREE.BufferAttribute(bokehPositions, 3));

    const bokehMaterial = new THREE.PointsMaterial({
      color: theme.primaryHex,
      size: 1.8,
      map: particleTexture,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    bokehMaterialRef.current = bokehMaterial;
    const bokehPoints = new THREE.Points(bokehGeometry, bokehMaterial);
    scene.add(bokehPoints);

    // ── Mouse & Scroll Parallax ──
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    let scrollY = 0;
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    const handleResize = () => {
      if (!container) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // ── 60 FPS Fluid Animation Loop ──
    const clock = new THREE.Clock();
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;

      // 3D Camera parallax glide
      camera.position.x = mouse.x * 2.2;
      camera.position.y = 3.2 - mouse.y * 1.2 - scrollY * 0.002;
      camera.lookAt(0, 0.5 - scrollY * 0.0014, 0);

      // Light parallax
      primaryLight.position.x = -10 + mouse.x * 4;
      secondaryLight.position.x = 10 - mouse.x * 4;

      // Undulate Stardust Wave Matrix in organic harmonic 3D waves
      const wavePosArr = waveGeometry.attributes.position.array as Float32Array;
      for (let k = 0; k < waveCount; k++) {
        const ox = origWavePositions[k * 3];
        const oz = origWavePositions[k * 3 + 2];
        const oy = origWavePositions[k * 3 + 1];

        // Sinuous dual-harmonic wave equation
        const w1 = Math.sin(ox * 0.075 + t * 0.9) * 0.85;
        const w2 = Math.cos(oz * 0.085 + t * 0.75) * 0.7;
        const w3 = Math.sin((ox + oz) * 0.04 + t * 0.5) * 0.4;

        wavePosArr[k * 3 + 1] = oy + w1 + w2 + w3;
      }
      waveGeometry.attributes.position.needsUpdate = true;

      // Twinkle Celestial Stars
      const starArr = starGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < starCount; i++) {
        starArr[i * 3 + 1] += 0.006;
        starArr[i * 3] += Math.sin(t * 1.1 + starPhases[i]) * 0.005;

        if (starArr[i * 3 + 1] > 26) {
          starArr[i * 3 + 1] = -4;
          starArr[i * 3] = (Math.random() - 0.5) * 80;
          starArr[i * 3 + 2] = (Math.random() - 0.5) * 65 - 4;
        }
      }
      starGeometry.attributes.position.needsUpdate = true;

      // Drift Bokeh Orbs
      const bArr = bokehGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < bokehCount; i++) {
        bArr[i * 3 + 1] += bokehVelocities[i].y;
        bArr[i * 3] += Math.sin(t * 0.9 + bokehVelocities[i].phase) * 0.008;

        if (bArr[i * 3 + 1] > 22) {
          bArr[i * 3 + 1] = -3;
          bArr[i * 3] = (Math.random() - 0.5) * 60;
          bArr[i * 3 + 2] = (Math.random() - 0.5) * 45;
        }
      }
      bokehGeometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      particleTexture.dispose();
      waveGeometry.dispose();
      wavePointsMaterial.dispose();
      starGeometry.dispose();
      starsMaterial.dispose();
      bokehGeometry.dispose();
      bokehMaterial.dispose();
      sceneRef.current = null;
      rendererRef.current = null;
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
        backgroundColor: theme.bgDark,
        transition: "background-color 0.8s ease",
      }}
    >
      <div ref={mountRef} style={{ width: "100%", height: "100%" }} />

      {/* Atmospheric Multi-Stop Radial Nebula Bloom — Organic, Zero Hard Edges */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at 50% 32%, ${theme.primary}16 0%, ${theme.secondary}0b 38%, rgba(6, 2, 12, 0.72) 75%, ${theme.bgDark} 100%)`,
          pointerEvents: "none",
          transition: "background 0.8s ease",
        }}
      />

      {/* Subtle Vignette for Studio Depth */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at 50% 50%, transparent 60%, rgba(0, 0, 0, 0.6) 100%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
