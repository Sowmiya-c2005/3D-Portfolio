import React, { useRef, useState, useEffect, useCallback } from "react";

export type RollInVariant = "orbital-swoop" | "helix-roll" | "cascade-flip" | "spiral-drop" | "roll-3d" | "circle-to-line";

interface RollInCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  index?: number;
  total?: number;
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
  total = 4,
  variant = "circle-to-line",
  delay,
  perspective = 1100,
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

  // Staggered sequential flight: each card peels off the 3D circle with a 0.12s gap
  const calculatedDelay = delay !== undefined ? delay : Math.min(index * 0.12, 0.6);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    // Check immediate visibility on mount
    const checkImmediate = () => {
      const rect = el.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (inView) {
        setIsVisible(true);
        setTimeout(() => setHasSettled(true), (calculatedDelay + 0.75) * 1000);
      }
    };

    checkImmediate();

    // IntersectionObserver with instant reset on exit:
    // Whenever the user leaves this section, the card resets to its 3D circle position.
    // When the user scrolls back to the section, it ALWAYS re-spins and swoops into line!
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => setHasSettled(true), (calculatedDelay + 0.75) * 1000);
        } else {
          // Reset cleanly so returning to this section ALWAYS re-runs the 3D circle-to-line swoop!
          setIsVisible(false);
          setHasSettled(false);
          setIsHovered(false);
          setTilt({ x: 0, y: 0 });
        }
      },
      {
        threshold: 0.05,
        rootMargin: "0px",
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [calculatedDelay]);

  // Compute 3D circular coordinates along the orbital ring for this card
  const getInitialCircleTransform = (): string => {
    const count = Math.max(total, 4);
    // Angular placement on the 3D circle
    const angle = ((index % count) * (2 * Math.PI)) / count;
    const radius = 220; // 3D circle radius in px

    const circleX = Math.round(radius * Math.sin(angle));
    const circleY = Math.round(-radius * Math.cos(angle) * 0.44); // vertical perspective squash
    const circleZ = Math.round(radius * Math.cos(angle) * 0.85); // depth perspective
    const rotY = Math.round((angle * 180) / Math.PI);
    const rotX = 16;
    const rotZ = Math.round(Math.sin(angle) * 20);

    return `perspective(${perspective}px) translate3d(${circleX}px, ${circleY}px, ${circleZ}px) rotateY(${rotY}deg) rotateX(${rotX}deg) rotateZ(${rotZ}deg) scale(0.88)`;
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

  // Card 3D transform computation:
  // 1. Not visible: Holds position on the 3D orbital circle
  // 2. Visible & hovering: Responsive mouse tilt with specular glare
  // 3. Visible & settled: Docks in the straight line grid (translate3d 0,0,0)
  const cardTransform = !isVisible
    ? getInitialCircleTransform()
    : isHovered && hasSettled
    ? `perspective(${perspective}px) rotateX(${tilt.x.toFixed(2)}deg) rotateY(${tilt.y.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`
    : `perspective(${perspective}px) translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(1)`;

  // Sanitize style prop to prevent clobbering
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
          // Smooth 3D swoop flight from circle into line row
          transition: isHovered && hasSettled
            ? "transform 0.12s ease-out, box-shadow 0.2s ease-out"
            : `transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${calculatedDelay}s, opacity 0.5s ease-out ${calculatedDelay}s, border-color 0.4s ease, box-shadow 0.4s ease`,
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
