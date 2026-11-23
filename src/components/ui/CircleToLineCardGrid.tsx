import React, { useState, useEffect, useRef, useCallback } from "react";
import { useTheme } from "../../context/ThemeContext";

export interface CircleCardItem {
  id: string | number;
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  badge?: string;
  meta?: string;
  content?: React.ReactNode;
}

interface CircleToLineCardGridProps {
  items: CircleCardItem[];
  radius?: number;
  autoPlayOnScroll?: boolean;
  orbitDurationMs?: number;
  staggerMs?: number;
  flightDurationMs?: number;
  renderCard?: (item: CircleCardItem, index: number, isSettled: boolean) => React.ReactNode;
  onItemClick?: (item: CircleCardItem, index: number) => void;
  className?: string;
  style?: React.CSSProperties;
}

type AnimationPhase = "orbiting" | "transitioning" | "lines";

export default function CircleToLineCardGrid({
  items,
  radius,
  autoPlayOnScroll = true,
  orbitDurationMs = 1600,
  staggerMs = 140,
  flightDurationMs = 700,
  renderCard,
  onItemClick,
  className = "",
  style = {},
}: CircleToLineCardGridProps) {
  const { theme } = useTheme();
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Animation phase: "orbiting" -> "transitioning" -> "lines"
  const [phase, setPhase] = useState<AnimationPhase>("orbiting");
  const [spinAngle, setSpinAngle] = useState(0);
  const [settledIndices, setSettledIndices] = useState<Set<number>>(new Set());
  const [offsets, setOffsets] = useState<{ x: number; y: number; z: number; rotY: number; rotZ: number }[]>([]);
  const [stageDimensions, setStageDimensions] = useState({ width: 800, height: 500 });
  const [isHoveredCard, setIsHoveredCard] = useState<number | null>(null);

  const total = items.length;

  // Calculate 3D circle radius based on viewport and item count
  const effectiveRadius = radius || Math.min(Math.max((stageDimensions.width || 700) * 0.28, 170), 300);

  // Measure card target grid layout positions relative to container center
  const measurePositions = useCallback(() => {
    const stage = stageRef.current;
    if (!stage || total === 0) return;

    const stageRect = stage.getBoundingClientRect();
    setStageDimensions({ width: stageRect.width, height: stageRect.height });

    const centerX = stageRect.width / 2;
    const centerY = Math.max(stageRect.height / 2, 220);

    const calculatedOffsets = cardRefs.current.map((el, i) => {
      if (!el) {
        return { x: 0, y: 0, z: 0, rotY: 0, rotZ: 0 };
      }
      const cardRect = el.getBoundingClientRect();
      const cardCenterX = cardRect.left - stageRect.left + cardRect.width / 2;
      const cardCenterY = cardRect.top - stageRect.top + cardRect.height / 2;

      // Card's angular position along 3D orbital circle
      const angle = (2 * Math.PI * i) / total;
      const circleX = centerX + effectiveRadius * Math.sin(angle);
      const circleY = centerY - effectiveRadius * Math.cos(angle) * 0.42; // tilted ellipse
      const circleZ = effectiveRadius * Math.cos(angle) * 0.85;

      return {
        x: circleX - cardCenterX,
        y: circleY - cardCenterY,
        z: circleZ,
        rotY: (angle * 180) / Math.PI,
        rotZ: Math.sin(angle) * 15,
      };
    });

    setOffsets(calculatedOffsets);
  }, [total, effectiveRadius]);

  // Measure on mount and on window resize
  useEffect(() => {
    measurePositions();
    const handleResize = () => measurePositions();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [measurePositions, items]);

  // Primary Animation Sequence: Orbit in Circle -> Settle into Lines
  const runSequence = useCallback(() => {
    setPhase("orbiting");
    setSettledIndices(new Set());
    setSpinAngle(0);

    // Step 1: Smooth 360-degree orbital rotation for orbitDurationMs
    const startTime = performance.now();
    let animId: number;

    const spinLoop = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / orbitDurationMs, 1);
      // Smooth cubic acceleration and deceleration of the 360 spin
      const easeProgress = progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      setSpinAngle(easeProgress * 360);

      if (progress < 1) {
        animId = requestAnimationFrame(spinLoop);
      } else {
        // Step 2: Begin peeling cards into lines one-by-one!
        setPhase("transitioning");
        for (let i = 0; i < total; i++) {
          setTimeout(() => {
            setSettledIndices((prev) => {
              const next = new Set(prev);
              next.add(i);
              return next;
            });
          }, i * staggerMs);
        }

        // Step 3: All cards settled into lines
        setTimeout(() => {
          setPhase("lines");
        }, total * staggerMs + flightDurationMs);
      }
    };

    animId = requestAnimationFrame(spinLoop);
    return () => cancelAnimationFrame(animId);
  }, [orbitDurationMs, total, staggerMs, flightDurationMs]);

  // Scroll Trigger & Reset when scrolling out and returning
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || !autoPlayOnScroll) return;

    let hasTriggered = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!hasTriggered) {
            hasTriggered = true;
            setTimeout(() => {
              measurePositions();
              runSequence();
            }, 100);
          }
        } else {
          // Reset cleanly whenever section leaves viewport so returning always replays 3D circle-to-line swirl!
          hasTriggered = false;
          setPhase("orbiting");
          setSettledIndices(new Set());
          setSpinAngle(0);
        }
      },
      { threshold: 0.08, rootMargin: "0px" }
    );

    observer.observe(stage);
    return () => observer.disconnect();
  }, [autoPlayOnScroll, measurePositions, runSequence]);

  // Re-run when items/category changes
  useEffect(() => {
    const timer = setTimeout(() => {
      measurePositions();
      runSequence();
    }, 150);
    return () => clearTimeout(timer);
  }, [items]);

  return (
    <div
      ref={stageRef}
      className={`circle-to-line-orchestrator ${className}`}
      style={{
        position: "relative",
        width: "100%",
        perspective: "1200px",
        perspectiveOrigin: "50% 40%",
        minHeight: phase !== "lines" ? "480px" : "auto",
        transition: "min-height 0.6s ease",
        ...style,
      }}
    >
      {/* ── Interactive Choreography Controller Bar ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "12px",
          marginBottom: "24px",
          padding: "10px 18px",
          borderRadius: "16px",
          background: "rgba(255, 255, 255, 0.03)",
          border: `1px solid ${theme.borderColor}`,
          backdropFilter: "blur(14px)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: phase === "lines" ? "#10b981" : theme.primary,
              boxShadow: `0 0 12px ${phase === "lines" ? "#10b981" : theme.primary}`,
              display: "inline-block",
              animation: phase !== "lines" ? "pulse 1.4s infinite" : "none",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.82rem",
              fontWeight: 700,
              letterSpacing: "0.06em",
              color: "#ffffff",
              textTransform: "uppercase",
            }}
          >
            {phase === "orbiting"
              ? "🌀 3D Circle Orbit: Revolving"
              : phase === "transitioning"
              ? `⚡ Transitioning: ${settledIndices.size} / ${total} Lines Docked`
              : "▦ Arranged in Grid Lines (Docked)"}
          </span>
        </div>

        {/* Action Controls: Switch or Replay Circle -> Line */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <button
            onClick={() => {
              measurePositions();
              runSequence();
            }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "6px 14px",
              borderRadius: "10px",
              background: `linear-gradient(135deg, ${theme.primary}33 0%, ${theme.secondary}22 100%)`,
              border: `1px solid ${theme.borderColor}`,
              color: "#ffffff",
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              fontWeight: 700,
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = theme.primary;
              e.currentTarget.style.transform = "scale(1.04)";
              e.currentTarget.style.boxShadow = `0 0 16px ${theme.glowColor}`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = theme.borderColor;
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <span>🔄</span>
            <span>REPLAY 3D CIRCLE SWIRL</span>
          </button>
        </div>
      </div>

      {/* ── Central Holographic Beacon (Visible during 3D Circle Orbit) ── */}
      <div
        style={{
          position: "absolute",
          top: "45%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          opacity: phase !== "lines" ? 1 : 0,
          transition: "opacity 0.6s ease",
          zIndex: 1,
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: "90px",
            height: "90px",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${theme.secondary}44 0%, ${theme.primary}22 55%, transparent 75%)`,
            border: `1.5px solid ${theme.borderColor}`,
            boxShadow: `0 0 45px ${theme.glowColor}, inset 0 0 20px ${theme.secondary}`,
            margin: "0 auto 10px auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            animation: "spin-slow 12s linear infinite",
          }}
        >
          <div
            style={{
              width: "16px",
              height: "16px",
              borderRadius: "50%",
              background: theme.secondary,
              boxShadow: `0 0 20px ${theme.secondary}`,
            }}
          />
        </div>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.7rem",
            color: "rgba(255, 255, 255, 0.7)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          3D ORBITAL MATRIX
        </div>
      </div>

      {/* ── Grid Container with 3D Transformed Card Nodes ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "18px",
          width: "100%",
          transformStyle: "preserve-3d",
          position: "relative",
          zIndex: 5,
        }}
      >
        {items.map((item, idx) => {
          const isSettled = settledIndices.has(idx);
          const offset = offsets[idx] || { x: 0, y: 0, z: 0, rotY: 0, rotZ: 0 };

          // In orbiting state: rotate along circle by adding spinAngle
          const currentAngleRad = ((2 * Math.PI * idx) / total) + (spinAngle * Math.PI) / 180;
          const stageRect = stageRef.current ? stageRef.current.getBoundingClientRect() : null;
          const centerX = (stageRect ? stageRect.width : stageDimensions.width) / 2;
          const centerY = Math.max((stageRect ? stageRect.height : stageDimensions.height) / 2, 220);

          let dynamicX = offset.x;
          let dynamicY = offset.y;
          let dynamicZ = offset.z;
          let dynamicRotY = offset.rotY + spinAngle;
          let dynamicRotZ = offset.rotZ;

          if (stageRect && cardRefs.current[idx]) {
            const cardRect = cardRefs.current[idx]!.getBoundingClientRect();
            const cardCenterX = cardRect.left - stageRect.left + cardRect.width / 2;
            const cardCenterY = cardRect.top - stageRect.top + cardRect.height / 2;

            const curCircleX = centerX + effectiveRadius * Math.sin(currentAngleRad);
            const curCircleY = centerY - effectiveRadius * Math.cos(currentAngleRad) * 0.42;
            const curCircleZ = effectiveRadius * Math.cos(currentAngleRad) * 0.85;

            dynamicX = curCircleX - cardCenterX;
            dynamicY = curCircleY - cardCenterY;
            dynamicZ = curCircleZ;
            dynamicRotY = (currentAngleRad * 180) / Math.PI;
            dynamicRotZ = Math.sin(currentAngleRad) * 15;
          }

          // Card 3D transform computation:
          // When settled: docks exactly in line (translate3d(0,0,0) rotate 0)
          // When orbiting: sits at dynamicX, dynamicY, dynamicZ with 3D rotation
          const cardTransform = isSettled
            ? "translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(1)"
            : `translate3d(${dynamicX.toFixed(1)}px, ${dynamicY.toFixed(1)}px, ${dynamicZ.toFixed(1)}px) rotateY(${dynamicRotY.toFixed(1)}deg) rotateX(12deg) rotateZ(${dynamicRotZ.toFixed(1)}deg) scale(0.92)`;

          return (
            <div
              key={item.id}
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              onClick={() => onItemClick && onItemClick(item, idx)}
              onMouseEnter={() => setIsHoveredCard(idx)}
              onMouseLeave={() => setIsHoveredCard(null)}
              style={{
                transform: cardTransform,
                transformStyle: "preserve-3d",
                transition: isSettled
                  ? `transform ${flightDurationMs}ms cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease`
                  : "transform 0.08s linear", // ultra-smooth 60fps tracking during orbit spin
                opacity: 1,
                willChange: "transform",
                position: "relative",
                zIndex: isSettled ? (isHoveredCard === idx ? 20 : 10) : 5,
              }}
            >
              {renderCard ? (
                renderCard(item, idx, isSettled)
              ) : (
                /* Default Luxury Card Template */
                <div
                  style={{
                    background: theme.glassBg,
                    border: `1.5px solid ${isHoveredCard === idx ? theme.primary : theme.borderColor}`,
                    borderRadius: "18px",
                    padding: "20px 22px",
                    backdropFilter: "blur(24px)",
                    boxShadow: isHoveredCard === idx
                      ? `0 18px 45px ${theme.glowColor}, inset 0 1px 1px rgba(255, 255, 255, 0.2)`
                      : "0 8px 30px rgba(0, 0, 0, 0.5)",
                    transition: "border-color 0.3s ease, box-shadow 0.3s ease, transform 0.2s ease",
                    transform: isHoveredCard === idx && isSettled ? "translateY(-6px) scale(1.02)" : "none",
                    cursor: "pointer",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Glowing header accent dot */}
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                    {item.icon && (
                      <div
                        style={{
                          width: "38px",
                          height: "38px",
                          borderRadius: "10px",
                          background: `${theme.primary}22`,
                          border: `1px solid ${theme.primary}55`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "1.2rem",
                        }}
                      >
                        {item.icon}
                      </div>
                    )}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h4
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "1.05rem",
                          fontWeight: 700,
                          color: "#ffffff",
                          margin: 0,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item.title}
                      </h4>
                      {item.subtitle && (
                        <span
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.72rem",
                            color: theme.secondary,
                            letterSpacing: "0.05em",
                            textTransform: "uppercase",
                          }}
                        >
                          {item.subtitle}
                        </span>
                      )}
                    </div>
                  </div>

                  {item.badge && (
                    <div
                      style={{
                        display: "inline-block",
                        padding: "4px 10px",
                        borderRadius: "8px",
                        background: `${theme.primary}18`,
                        border: `1px solid ${theme.borderColor}`,
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.72rem",
                        color: "#ffffff",
                      }}
                    >
                      {item.badge}
                    </div>
                  )}

                  {item.content && <div style={{ marginTop: "10px" }}>{item.content}</div>}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
