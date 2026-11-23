import React, { useEffect, useRef } from "react";

export type ParticleType = "neon-float" | "data-rain" | "network-nodes" | "golden-embers" | "sparkles" | "server-dust";

interface CinematicBackgroundProps {
  imageSrc: string;
  particleType?: ParticleType;
  accentColor?: string;
  secondaryColor?: string;
  overlayAlign?: "left" | "right" | "center" | "none";
  ambientGlow?: boolean;
}

export default function CinematicSectionBackground({
  imageSrc,
  particleType = "neon-float",
  accentColor = "#00c3ff",
  secondaryColor = "#7b4fff",
  ambientGlow = true,
}: CinematicBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Parallax effect on mouse move
  useEffect(() => {
    let animationFrameId: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      targetX = (e.clientX / innerWidth - 0.5) * 24; // 24px parallax shift
      targetY = (e.clientY / innerHeight - 0.5) * 24;
    };

    const animateParallax = () => {
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;

      if (imageRef.current) {
        imageRef.current.style.transform = `scale(1.06) translate3d(${-currentX}px, ${-currentY}px, 0)`;
      }
      animationFrameId = requestAnimationFrame(animateParallax);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    animationFrameId = requestAnimationFrame(animateParallax);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Atmospheric Canvas Particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    const count = particleType === "data-rain" ? 70 : 40;
    const particles = Array.from({ length: count }, () => {
      if (particleType === "data-rain") {
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          speedY: 3 + Math.random() * 5,
          speedX: (Math.random() - 0.5) * 0.4,
          size: 1 + Math.random() * 2,
          length: 12 + Math.random() * 20,
          opacity: 0.2 + Math.random() * 0.7,
          color: Math.random() > 0.3 ? accentColor : "#ffffff",
        };
      } else if (particleType === "golden-embers") {
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          speedY: -(0.8 + Math.random() * 2),
          speedX: (Math.random() - 0.5) * 0.8,
          size: 1.5 + Math.random() * 3,
          opacity: 0.25 + Math.random() * 0.75,
          color: Math.random() > 0.4 ? "#ffb703" : "#fb8500",
        };
      } else {
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          speedY: (Math.random() - 0.5) * 0.5,
          speedX: (Math.random() - 0.5) * 0.5,
          size: 1 + Math.random() * 2.5,
          opacity: 0.2 + Math.random() * 0.6,
          color: Math.random() > 0.5 ? accentColor : secondaryColor,
        };
      }
    });

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = p.size * 3;

        if (particleType === "data-rain" && "length" in p) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + p.speedX * 2, p.y + (p as any).length);
          ctx.strokeStyle = p.color;
          ctx.lineWidth = p.size;
          ctx.stroke();

          p.y += p.speedY;
          p.x += p.speedX;
          if (p.y > height) {
            p.y = -20;
            p.x = Math.random() * width;
          }
        } else if (particleType === "golden-embers") {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();

          p.y += p.speedY;
          p.x += p.speedX + Math.sin(p.y * 0.05) * 0.3;
          if (p.y < -10) {
            p.y = height + 10;
            p.x = Math.random() * width;
          }
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();

          p.x += p.speedX;
          p.y += p.speedY;

          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;
        }
        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, [particleType, accentColor, secondaryColor]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {/* ── High-Definition Crisp Reference Image with 3D Parallax ── */}
      <div
        ref={imageRef}
        style={{
          position: "absolute",
          inset: "-3%",
          backgroundImage: `url(${imageSrc})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          filter: "contrast(1.08) brightness(0.95)",
          willChange: "transform",
          transition: "transform 0.12s ease-out",
        }}
      />

      {/* ── Subtle Top & Bottom Seamless Transitions ── */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "90px",
          background: "linear-gradient(to bottom, rgba(2, 4, 10, 0.95), transparent)",
          zIndex: 2,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "100px",
          background: "linear-gradient(to top, rgba(2, 4, 10, 0.98), transparent)",
          zIndex: 2,
        }}
      />

      {/* ── Ambient Radial Edge Lighting ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 95% 90% at 50% 50%, transparent 55%, rgba(2, 4, 10, 0.65) 100%)",
          zIndex: 2,
        }}
      />

      {/* ── Dynamic Accent Glow Spot ── */}
      {ambientGlow && (
        <div
          style={{
            position: "absolute",
            width: "450px",
            height: "450px",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${accentColor}22 0%, transparent 70%)`,
            filter: "blur(70px)",
            top: "20%",
            right: "15%",
            zIndex: 1,
            pointerEvents: "none",
          }}
        />
      )}

      {/* ── Interactive Particle Dust Canvas ── */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: 3,
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
