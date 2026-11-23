import React, { useEffect, useRef } from "react";
import { TypeAnimation } from "react-type-animation";
import sowmiyaPhoto from "../../assets/sowmiya-real.jpg";
import { useTheme } from "../../context/ThemeContext";
import gsap from "gsap";

export default function Hero() {
  const leftContentRef = useRef<HTMLDivElement>(null);
  const avatarCardRef = useRef<HTMLDivElement>(null);
  const avatarWrapperRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  // 3D Mouse Tilt Parallax for the Avatar Card
  useEffect(() => {
    let animId: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      targetX = (e.clientX / innerWidth - 0.5) * 20; // tilt angle
      targetY = (e.clientY / innerHeight - 0.5) * 20;
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      if (avatarCardRef.current) {
        avatarCardRef.current.style.transform = `perspective(1000px) rotateY(${currentX.toFixed(2)}deg) rotateX(${-currentY.toFixed(2)}deg) scale(1.02)`;
      }
      animId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftContentRef.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 1.1, ease: "power3.out", delay: 0.2 }
      );
      if (avatarWrapperRef.current) {
        gsap.fromTo(
          avatarWrapperRef.current,
          { opacity: 0, x: 50, scale: 0.92 },
          { opacity: 1, x: 0, scale: 1, duration: 1.2, ease: "power3.out", delay: 0.35 }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        backgroundColor: "transparent",
        paddingTop: "110px",
        paddingBottom: "70px",
      }}
    >
      {/* ── Volumetric Ambient Theme Blooms ── */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          right: "10%",
          width: "580px",
          height: "580px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${theme.glowColor} 0%, ${theme.glowColorSecondary} 45%, transparent 70%)`,
          filter: "blur(90px)",
          pointerEvents: "none",
          zIndex: 1,
          transition: "background 0.8s ease",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          left: "5%",
          width: "480px",
          height: "480px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${theme.glowColor} 0%, transparent 70%)`,
          filter: "blur(80px)",
          pointerEvents: "none",
          zIndex: 1,
          transition: "background 0.8s ease",
        }}
      />

      {/* ── Main Content Grid ── */}
      <div
        className="container"
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "56px",
            alignItems: "center",
          }}
        >
          {/* ══════════════════════════════════════════════════════════
              LEFT SIDE: Viral Spotlight Typography & Pill CTAs
              ══════════════════════════════════════════════════════════ */}
          <div ref={leftContentRef}>
            {/* Eyebrow Tag Pill with Pulsing Beacon */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 18px",
                borderRadius: "9999px",
                background: `${theme.primary}18`,
                border: `1px solid ${theme.borderColor}`,
                backdropFilter: "blur(12px)",
                marginBottom: "20px",
                transition: "all 0.4s ease",
              }}
            >
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: theme.primary,
                  boxShadow: `0 0 12px ${theme.primary}`,
                  animation: "pulse-ring 2s infinite",
                  transition: "all 0.4s ease",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.76rem",
                  color: theme.accent,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  fontWeight: 800,
                  transition: "color 0.4s ease",
                }}
              >
                FULL-STACK DEVELOPER / AI BUILDER
              </span>
            </div>

            {/* Massive Bold Display Name with Dynamic Ambient Glow */}
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 900,
                fontSize: "clamp(3.5rem, 8.5vw, 6.8rem)",
                lineHeight: 0.95,
                letterSpacing: "-0.04em",
                color: "#ffffff",
                marginBottom: "16px",
                textShadow: `0 0 50px ${theme.glowColor}, 0 0 20px ${theme.glowColorSecondary}`,
                transition: "text-shadow 0.8s ease",
              }}
            >
              SOWMIYA<span style={{ color: theme.secondary, transition: "color 0.4s ease" }}>.</span>
            </h1>

            {/* Subtitle / Punchline */}
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "clamp(1rem, 2vw, 1.25rem)",
                color: theme.secondary,
                fontWeight: 600,
                letterSpacing: "0.01em",
                minHeight: "1.8em",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "16px",
                transition: "color 0.4s ease",
              }}
            >
              <span style={{ color: theme.primary, transition: "color 0.4s ease" }}>&gt;</span>
              <TypeAnimation
                sequence={[
                  "Building intelligent software that solves real problems.",
                  2400,
                  "React.js, FastAPI & PostgreSQL specialist.",
                  2000,
                  "Automated build workflows with Jenkins CI/CD.",
                  2000,
                  "High-reliability cloud deployment on Render.",
                  2000,
                ]}
                repeat={Infinity}
                speed={50}
              />
            </div>

            {/* Description */}
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1.02rem",
                color: "rgba(255, 255, 255, 0.85)",
                lineHeight: 1.75,
                maxWidth: "540px",
                marginBottom: "32px",
              }}
            >
              Passionate engineer developing web systems with JWT authentication, role-based access control (RBAC), automated
              testing, and microservices architecture.
            </p>

            {/* Action Buttons with Theme Gradient */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", marginBottom: "36px" }}>
              <button
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "14px 30px",
                  borderRadius: "9999px",
                  background: theme.btnGradient,
                  border: "1px solid rgba(255, 255, 255, 0.4)",
                  color: "#ffffff",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.88rem",
                  fontWeight: 800,
                  letterSpacing: "0.04em",
                  cursor: "pointer",
                  boxShadow: `0 10px 32px ${theme.glowColor}, 0 0 20px ${theme.glowColorSecondary}`,
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-3px) scale(1.02)";
                  e.currentTarget.style.boxShadow = `0 14px 44px ${theme.glowColor}, 0 0 28px ${theme.glowColorSecondary}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.boxShadow = `0 10px 32px ${theme.glowColor}, 0 0 20px ${theme.glowColorSecondary}`;
                }}
              >
                <span>EXPLORE MY WORK</span>
                <span style={{ fontSize: "1.1rem" }}>➔</span>
              </button>

              <button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "14px 28px",
                  borderRadius: "9999px",
                  background: "rgba(0, 0, 0, 0.6)",
                  border: `1.5px solid ${theme.borderColor}`,
                  color: "#ffffff",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.88rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  backdropFilter: "blur(16px)",
                  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.5)",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = theme.primary;
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = theme.borderColor;
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <span>GET IN TOUCH</span>
                <span style={{ color: theme.secondary, transition: "color 0.4s ease" }}>↗</span>
              </button>
            </div>

            {/* Quick Metrics Bar */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {[
                { label: "CGPA", val: "8.62 / 10" },
                { label: "INTERNSHIPS", val: "2 Verified" },
                { label: "PROJECTS", val: "3+ Built" },
                { label: "LOCATION", val: "Nagercoil, TN" },
              ].map((m) => (
                <div
                  key={m.label}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "8px 16px",
                    borderRadius: "9999px",
                    background: `${theme.primary}12`,
                    border: `1px solid ${theme.borderColor}`,
                    backdropFilter: "blur(16px)",
                    transition: "all 0.4s ease",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.68rem",
                      color: theme.accent,
                      fontWeight: 800,
                      transition: "color 0.4s ease",
                    }}
                  >
                    {m.label}:
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "0.85rem",
                      color: "#ffffff",
                      fontWeight: 700,
                    }}
                  >
                    {m.val}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════════
              RIGHT SIDE: 3D Holographic Developer Frame
              With Sowmiya's Real Photo & Ambient Aura Halo
              ══════════════════════════════════════════════════════════ */}
          <div
            ref={avatarWrapperRef}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
            }}
          >
            {/* Ambient Aura Halo behind the portrait */}
            <div
              style={{
                position: "absolute",
                width: "500px",
                height: "580px",
                background: `radial-gradient(circle, ${theme.glowColor} 0%, ${theme.glowColorSecondary} 45%, transparent 75%)`,
                filter: "blur(60px)",
                zIndex: 0,
                pointerEvents: "none",
                transition: "background 0.8s ease",
              }}
            />

            {/* Orbiting Floating 3D Tech Badges */}
            <div
              style={{
                position: "absolute",
                top: "-16px",
                right: "-20px",
                zIndex: 4,
                padding: "8px 16px",
                borderRadius: "14px",
                background: "rgba(10, 6, 18, 0.9)",
                border: `1px solid ${theme.borderColor}`,
                backdropFilter: "blur(20px)",
                color: "#ffffff",
                fontFamily: "var(--font-mono)",
                fontSize: "0.78rem",
                fontWeight: 700,
                boxShadow: `0 10px 30px ${theme.glowColor}`,
                display: "flex",
                alignItems: "center",
                gap: "8px",
                transition: "all 0.4s ease",
              }}
            >
              <span>⚛️</span>
              <span>React &amp; FastAPI</span>
            </div>

            <div
              style={{
                position: "absolute",
                bottom: "40px",
                left: "-25px",
                zIndex: 4,
                padding: "8px 16px",
                borderRadius: "14px",
                background: "rgba(14, 10, 8, 0.9)",
                border: `1px solid ${theme.borderColor}`,
                backdropFilter: "blur(20px)",
                color: "#ffffff",
                fontFamily: "var(--font-mono)",
                fontSize: "0.78rem",
                fontWeight: 700,
                boxShadow: `0 10px 30px ${theme.glowColorSecondary}`,
                display: "flex",
                alignItems: "center",
                gap: "8px",
                transition: "all 0.4s ease",
              }}
            >
              <span>⚡</span>
              <span>8.62 CGPA Honors</span>
            </div>

            {/* 3D Perspective Photo Card */}
            <div
              ref={avatarCardRef}
              style={{
                position: "relative",
                zIndex: 2,
                maxWidth: "400px",
                width: "100%",
                borderRadius: "28px",
                overflow: "hidden",
                border: `2px solid ${theme.borderColor}`,
                boxShadow: `0 0 60px ${theme.glowColor}, 0 25px 70px rgba(0, 0, 0, 0.95), inset 0 1px 1px rgba(255, 255, 255, 0.4)`,
                background: theme.glassBg,
                willChange: "transform",
                transition: "transform 0.15s ease-out, border-color 0.4s ease, box-shadow 0.4s ease",
              }}
            >
              {/* Shimmer Light Beam */}
              <div className="glass-shimmer-crimson" />

              {/* Sowmiya's Real Photo */}
              <div style={{ position: "relative", width: "100%", overflow: "hidden" }}>
                <img
                  src={sowmiyaPhoto}
                  alt="Sowmiya C - Full Stack Developer"
                  style={{
                    width: "100%",
                    height: "460px",
                    display: "block",
                    objectFit: "cover",
                    objectPosition: "center 20%",
                  }}
                />

                {/* Subtle gradient overlay at bottom of photo */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(7, 3, 14, 0.95) 0%, rgba(7, 3, 14, 0.25) 40%, transparent 70%)",
                    pointerEvents: "none",
                  }}
                />
              </div>

              {/* Bottom Holographic Profile HUD Badge */}
              <div
                style={{
                  position: "absolute",
                  bottom: "16px",
                  left: "16px",
                  right: "16px",
                  background: "rgba(10, 6, 18, 0.88)",
                  backdropFilter: "blur(20px) saturate(180%)",
                  border: `1px solid ${theme.borderColor}`,
                  borderRadius: "18px",
                  padding: "14px 18px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  boxShadow: "0 8px 30px rgba(0, 0, 0, 0.7)",
                  transition: "border-color 0.4s ease",
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 800,
                      fontSize: "1.05rem",
                      color: "#ffffff",
                    }}
                  >
                    Sowmiya C
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.72rem",
                      color: theme.secondary,
                      fontWeight: 600,
                      transition: "color 0.4s ease",
                    }}
                  >
                    Full-Stack Software Engineer
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "4px 12px",
                    borderRadius: "9999px",
                    background: `${theme.primary}25`,
                    border: `1px solid ${theme.borderColor}`,
                    transition: "all 0.4s ease",
                  }}
                >
                  <span
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: theme.primary,
                      boxShadow: `0 0 8px ${theme.primary}`,
                      transition: "all 0.4s ease",
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.68rem",
                      color: "#ffffff",
                      fontWeight: 700,
                    }}
                  >
                    AVAILABLE
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
