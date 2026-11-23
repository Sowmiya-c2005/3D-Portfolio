import React, { useRef, useState, useEffect, useCallback } from "react";

export type RollInVariant = "orbital-swoop" | "helix-roll" | "cascade-flip" | "spiral-drop" | "roll-3d";

interface RollInCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  index?: number;
  variant?: RollInVariant;
  delay?: number;
  perspective?: number;
  maxTilt?: number;
  scale?: number;
  glareOpacity?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function RollInCard({
  children,
  index = 0,
  variant = "orbital-swoop",
  delay,
  perspective = 1000,
  maxTilt = 6,
  scale = 1.015,
  glareOpacity = 0.22,
  className = "",
  style = {},
  ...rest
}: RollInCardProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasSettled, setHasSettled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse tilt tracking
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  // Snappy, silky stagger: maximum delay is 0.25s so cards appear almost immediately without blank lag
  const calculatedDelay = delay !== undefined ? delay : Math.min(index * 0.045, 0.25);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    // Check if element is already inside viewport on mount
    const checkImmediateVisibility = () => {
      const rect = el.getBoundingClientRect();
      const inView = rect.top < window.innerHeight + 60 && rect.bottom > -60;
      if (inView) {
        setIsVisible(true);
        // Mark settled after entrance animation finishes so hover tilt activates cleanly
        setTimeout(() => setHasSettled(true), (calculatedDelay + 0.6) * 1000);
      }
    };

    checkImmediateVisibility();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => setHasSettled(true), (calculatedDelay + 0.6) * 1000);
        } else {
          // Generous exit boundary: only reset when user has scrolled well past (180px)
          // This prevents micro-scroll jitter or cards getting stuck mid-scroll!
          const r = entry.boundingClientRect;
          if (r.top > window.innerHeight + 180 || r.bottom < -180) {
            setIsVisible(false);
            setHasSettled(false);
            setIsHovered(false);
            setTilt({ x: 0, y: 0 });
          }
        }
      },
      {
        threshold: 0.02,
        rootMargin: "100px 0px 100px 0px",
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [calculatedDelay]);

  // Refined 3D entrance trajectories (buttery-smooth, no extreme angles that break bounding boxes)
  const getInitialTransform = (): string => {
    switch (variant) {
      case "orbital-swoop":
        return `perspective(${perspective}px) rotateY(-18deg) rotateX(14deg) translateY(42px) scale(0.95)`;
      case "helix-roll":
        return `perspective(${perspective}px) rotateX(20deg) translateY(42px) scale(0.95)`;
      case "cascade-flip":
        return `perspective(${perspective}px) rotateY(18deg) translateY(38px) scale(0.95)`;
      case "spiral-drop":
        return `perspective(${perspective}px) rotateX(-16deg) translateY(-36px) scale(0.95)`;
      case "roll-3d":
      default:
        return `perspective(${perspective}px) rotateX(16deg) translateY(40px) scale(0.95)`;
    }
  };

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!wrapperRef.current || !isVisible || !hasSettled) return;
      const r = wrapperRef.current.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      const cx = r.width / 2;
      const cy = r.height / 2;

      const rotX = -((y - cy) / cy) * maxTilt;
      const rotY = ((x - cx) / cx) * maxTilt;

      setIsHovered(true);
      setTilt({ x: rotX, y: rotY });
      setGlare({
        x: (x / r.width) * 100,
        y: (y / r.height) * 100,
        opacity: glareOpacity,
      });
    },
    [isVisible, hasSettled, maxTilt, glareOpacity]
  );

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  }, []);

  // Compute transform:
  // 1. Not visible yet: hold initial 3D pose
  // 2. Visible & hovered & settled: apply smooth interactive mouse tilt
  // 3. Visible & settled or entering: dock at 3D zero
  const cardTransform = !isVisible
    ? getInitialTransform()
    : isHovered && hasSettled
    ? `perspective(${perspective}px) rotateX(${tilt.x.toFixed(2)}deg) rotateY(${tilt.y.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`
    : `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)`;

  // Strip conflicting transition/transform keys from incoming style prop
  const {
    transition: _ignoredTransition,
    transform: _ignoredTransform,
    opacity: _ignoredOpacity,
    ...cleanStyle
  } = style;

  return (
    <div
      ref={wrapperRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        position: "relative",
      }}
      {...rest}
    >
      <div
        style={{
          ...cleanStyle,
          width: "100%",
          height: "100%",
          transform: cardTransform,
          opacity: isVisible ? 1 : 0,
          transformStyle: "preserve-3d",
          // Smooth 0.55s entrance with fast 0.12s tilt response once settled
          transition: isHovered && hasSettled
            ? "transform 0.12s ease-out, box-shadow 0.2s ease-out"
            : `transform 0.55s cubic-bezier(0.16, 1, 0.3, 1) ${calculatedDelay}s, opacity 0.45s ease-out ${calculatedDelay}s, border-color 0.4s ease, box-shadow 0.4s ease`,
          position: "relative",
          overflow: "hidden",
          willChange: "transform, opacity",
        }}
      >
        {/* Specular Dynamic Theme Glare Layer */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            borderRadius: "inherit",
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, var(--theme-secondary, #f59e0b) 0%, var(--theme-primary, #a855f7) 26%, transparent 65%)`,
            opacity: glare.opacity,
            transition: "opacity 0.2s ease-out",
            zIndex: 10,
          }}
        />
        {children}
      </div>
    </div>
  );
}
