import React, { useEffect, useRef, useState } from "react";
import { personal, stats } from "../../data/portfolio";
import RollInCard from "../ui/RollInCard";
import sowmiyaPhoto from "../../assets/sowmiya-real.jpg";
import { useTheme } from "../../context/ThemeContext";

function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null!);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          o.disconnect();
        }
      },
      { threshold }
    );
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function AnimatedNum({
  value,
  decimals = 0,
  suffix = "",
}: {
  value: number;
  decimals?: number;
  suffix?: string;
}) {
  const [n, setN] = useState(0);
  const { ref, visible } = useReveal(0.2);
  const ran = useRef(false);

  useEffect(() => {
    if (!visible || ran.current) return;
    ran.current = true;
    const steps = 40;
    const dur = 1200;
    let i = 0;
    const id = setInterval(() => {
      i++;
      setN(parseFloat(((value / steps) * i).toFixed(decimals)));
      if (i >= steps) {
        setN(value);
        clearInterval(id);
      }
    }, dur / steps);
    return () => clearInterval(id);
  }, [visible, value, decimals]);

  return (
    <span ref={ref}>
      {decimals > 0 ? n.toFixed(decimals) : Math.round(n)}
      {suffix}
    </span>
  );
}

const keyPrinciples = [
  "Scalable React & FastAPI full-stack architectures",
  "Role-Based Access Control (RBAC) & secure JWT token handling",
  "Automated Jenkins CI/CD deployment pipelines",
  "High-concurrency PostgreSQL relational schemas & ORMs",
];

export default function About() {
  const { ref } = useReveal(0.08);
  const { theme } = useTheme();

  return (
    <section
      id="about"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        overflow: "hidden",
        backgroundColor: "transparent",
        paddingTop: "100px",
        paddingBottom: "100px",
      }}
    >
      {/* Volumetric Radial Glow */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          left: "20%",
          width: "600px",
          height: "400px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${theme.glowColor} 0%, ${theme.glowColorSecondary} 50%, transparent 80%)`,
          filter: "blur(90px)",
          pointerEvents: "none",
          zIndex: 1,
          transition: "background 0.8s ease",
        }}
      />

      {/* ── Section Header ── */}
      <div
        className="container"
        style={{
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          marginBottom: "48px",
        }}
      >
        <div ref={ref}>
          {/* Eyebrow Pill */}
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
              marginBottom: "16px",
              transition: "all 0.4s ease",
            }}
          >
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: theme.primary,
                boxShadow: `0 0 10px ${theme.primary}`,
                transition: "all 0.4s ease",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.74rem",
                color: theme.accent,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                fontWeight: 700,
                transition: "color 0.4s ease",
              }}
            >
              01 // IDENTITY // PROFILE OVERVIEW
            </span>
          </div>

          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              fontSize: "clamp(2.4rem, 5.2vw, 4rem)",
              letterSpacing: "-0.03em",
              color: "#ffffff",
              lineHeight: 1.1,
              marginBottom: "14px",
            }}
          >
            ENGINEERING IDENTITY<span style={{ color: theme.secondary, transition: "color 0.4s ease" }}>.</span>
          </h2>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1rem",
              color: "rgba(255, 255, 255, 0.82)",
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Committed to building production-grade web systems with high performance and reliable architecture.
          </p>
        </div>
      </div>

      {/* ── Two-Column Main Content Grid ── */}
      <div
        className="container"
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "32px",
            alignItems: "start",
          }}
        >
          {/* Left Column: Personal Narrative & Principles with 3D Orbital Swoop */}
          <RollInCard
            index={0}
            total={3}
            maxTilt={7}
            scale={1.01}
            style={{
              borderRadius: "24px",
              background: theme.glassBg,
              border: `1.5px solid ${theme.borderColor}`,
              backdropFilter: "blur(24px)",
              padding: "clamp(24px, 3.5vw, 36px)",
              boxShadow: `0 20px 50px rgba(0, 0, 0, 0.75), inset 0 1px 1px rgba(255, 255, 255, 0.25)`,
              position: "relative",
              overflow: "hidden",
              transition: "border-color 0.4s ease",
            }}
          >
            <div className="glass-shimmer-crimson" />

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: `1px solid ${theme.borderColor}`,
                paddingBottom: "14px",
                marginBottom: "20px",
                transition: "border-color 0.4s ease",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    overflow: "hidden",
                    border: `2px solid ${theme.primary}`,
                    boxShadow: `0 0 14px ${theme.glowColor}`,
                    flexShrink: 0,
                    transition: "all 0.4s ease",
                  }}
                >
                  <img
                    src={sowmiyaPhoto}
                    alt="Sowmiya C"
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%" }}
                  />
                </div>
                <div>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.74rem",
                      color: theme.accent,
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      display: "block",
                      transition: "color 0.4s ease",
                    }}
                  >
                    BIOGRAPHY // SOWMIYA C
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.68rem",
                      color: "rgba(255, 255, 255, 0.65)",
                    }}
                  >
                    B.E. CSE · Developer
                  </span>
                </div>
              </div>

              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.7rem",
                  color: theme.secondary,
                  background: `${theme.secondary}22`,
                  padding: "3px 8px",
                  borderRadius: "6px",
                  border: `1px solid ${theme.secondary}44`,
                  fontWeight: 600,
                  transition: "all 0.4s ease",
                }}
              >
                ● ACTIVE ENGINEER
              </span>
            </div>

            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 900,
                fontSize: "1.8rem",
                color: "#ffffff",
                marginBottom: "6px",
              }}
            >
              Sowmiya C
            </h3>

            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.88rem",
                color: theme.secondary,
                fontWeight: 600,
                marginBottom: "18px",
                transition: "color 0.4s ease",
              }}
            >
              {personal.title} · B.E. Computer Science &amp; Engineering
            </div>

            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.94rem",
                color: "rgba(255, 255, 255, 0.88)",
                lineHeight: 1.8,
                marginBottom: "24px",
              }}
            >
              {personal.summary}
            </p>

            {/* Core Architectural Principles */}
            <div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.72rem",
                  color: "rgba(255, 255, 255, 0.6)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: "12px",
                }}
              >
                Core Architectural Standards:
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {keyPrinciples.map((principle, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      fontSize: "0.85rem",
                      fontFamily: "var(--font-body)",
                      color: "rgba(255, 255, 255, 0.88)",
                    }}
                  >
                    <span style={{ color: theme.secondary, fontSize: "0.9rem", transition: "color 0.4s ease" }}>⚡</span>
                    <span>{principle}</span>
                  </div>
                ))}
              </div>
            </div>
          </RollInCard>

          {/* Right Column: Verified Engineering Metrics & Trajectory */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {/* 4 Quantitative Metric Cards with Helix-Roll 3D Entrance */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "16px",
              }}
            >
              {stats.map((stat, idx) => (
                <RollInCard
                  key={stat.label}
                  index={idx}
                  total={stats.length}
                  maxTilt={10}
                  scale={1.03}
                  style={{
                    borderRadius: "18px",
                    background: theme.glassBg,
                    border: `1px solid ${theme.borderColor}`,
                    backdropFilter: "blur(20px)",
                    padding: "20px 18px",
                    boxShadow: `0 10px 30px rgba(0, 0, 0, 0.6)`,
                    position: "relative",
                    overflow: "hidden",
                    transition: "all 0.3s ease",
                  }}
                >
                  <div className="glass-shimmer-crimson" />
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 900,
                      fontSize: "clamp(2rem, 3.5vw, 2.6rem)",
                      lineHeight: 1,
                      color: "#ffffff",
                      marginBottom: "6px",
                      textShadow: `0 0 20px ${theme.glowColor}`,
                      transition: "text-shadow 0.4s ease",
                    }}
                  >
                    <AnimatedNum
                      value={stat.value}
                      decimals={stat.decimals ?? 0}
                      suffix={stat.suffix ?? ""}
                    />
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.72rem",
                      color: theme.secondary,
                      fontWeight: 700,
                      letterSpacing: "0.04em",
                      textTransform: "uppercase",
                      transition: "color 0.4s ease",
                    }}
                  >
                    {stat.label}
                  </div>
                </RollInCard>
              ))}
            </div>

            {/* Engineering Highlights with 3D Entrance */}
            <RollInCard
              index={2}
              total={3}
              maxTilt={7}
              scale={1.01}
              style={{
                borderRadius: "20px",
                background: theme.glassBg,
                border: `1.5px solid ${theme.borderColor}`,
                backdropFilter: "blur(20px)",
                padding: "24px",
                boxShadow: `0 12px 35px rgba(0, 0, 0, 0.6)`,
                position: "relative",
                overflow: "hidden",
                transition: "border-color 0.4s ease",
              }}
            >
              <div className="glass-shimmer-crimson" />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "16px",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.75rem",
                    color: theme.accent,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    fontWeight: 700,
                    transition: "color 0.4s ease",
                  }}
                >
                  ENGINEERING CREDENTIALS
                </span>
                <span style={{ fontSize: "1.1rem" }}>🏆</span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                  <span style={{ color: theme.secondary, fontSize: "0.9rem", marginTop: "2px", transition: "color 0.4s ease" }}>✓</span>
                  <div>
                    <span style={{ fontWeight: 700, color: "#ffffff", fontSize: "0.88rem" }}>
                      Graduated with First Class Distinction (8.62 CGPA)
                    </span>
                    <p style={{ margin: "2px 0 0", fontSize: "0.8rem", color: "rgba(255, 255, 255, 0.7)" }}>
                      Ponjesly College of Engineering, Anna University (2020 – 2024).
                    </p>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                  <span style={{ color: theme.secondary, fontSize: "0.9rem", marginTop: "2px", transition: "color 0.4s ease" }}>✓</span>
                  <div>
                    <span style={{ fontWeight: 700, color: "#ffffff", fontSize: "0.88rem" }}>
                      Dual Industrial Full-Stack Experience
                    </span>
                    <p style={{ margin: "2px 0 0", fontSize: "0.8rem", color: "rgba(255, 255, 255, 0.7)" }}>
                      Hands-on engineering at NovelX Technology &amp; Cosmic Compliance Solutions.
                    </p>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                  <span style={{ color: theme.secondary, fontSize: "0.9rem", marginTop: "2px", transition: "color 0.4s ease" }}>✓</span>
                  <div>
                    <span style={{ fontWeight: 700, color: "#ffffff", fontSize: "0.88rem" }}>
                      FastAPI &amp; Jenkins CI/CD Specialization
                    </span>
                    <p style={{ margin: "2px 0 0", fontSize: "0.8rem", color: "rgba(255, 255, 255, 0.7)" }}>
                      Engineered enterprise TRF management and automated attendance deployment pipelines.
                    </p>
                  </div>
                </div>
              </div>
            </RollInCard>
          </div>
        </div>
      </div>
    </section>
  );
}
