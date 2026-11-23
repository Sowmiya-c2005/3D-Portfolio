import React, { useState } from "react";
import { projects } from "../../data/portfolio";
import RollInCard from "../ui/RollInCard";
import { useTheme } from "../../context/ThemeContext";

const projectHighlights: Record<number, string[]> = {
  1: [
    "Automatic Folder Structure Generation",
    "JWT Authentication & Role-Based Access (RBAC)",
    "PostgreSQL Relational DB via SQLAlchemy ORM",
    "FastAPI High-Speed Asynchronous Endpoints",
  ],
  2: [
    "Jenkins CI/CD Pipeline Automation",
    "Automated Build, Test & Deployment Stages",
    "Student Attendance Tracking & Records",
    "Streamlined Workflow with Zero-Friction QA",
  ],
  3: [
    "Hardware-Accelerated CSS3 Animations",
    "Smooth Touch Swipe & Keyboard Navigation",
    "Dynamic Image Preloading & Carousel Loops",
    "Full Mobile & Desktop Responsive Layout",
  ],
};

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewMode, setViewMode] = useState<"carousel" | "grid">("carousel");
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const { theme } = useTheme();

  const activeProject = projects[activeIndex];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const copyRepoLink = (url: string, id: number) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section
      id="projects"
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
          right: "15%",
          width: "700px",
          height: "450px",
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
          marginBottom: "40px",
        }}
      >
        <div>
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
              03 // FEATURED PROJECTS // REPOSITORIES
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
            FEATURED ENGINEERING WORK<span style={{ color: theme.secondary, transition: "color 0.4s ease" }}>.</span>
          </h2>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1rem",
              color: "rgba(255, 255, 255, 0.82)",
              maxWidth: "640px",
              margin: "0 auto 20px",
              lineHeight: 1.6,
            }}
          >
            Full-stack architectures, automated CI/CD workflows, and responsive web applications built with production standards.
          </p>

          {/* Mode Switcher & Carousel Navigation Pills */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "12px",
              background: "rgba(0, 0, 0, 0.55)",
              padding: "6px 12px",
              borderRadius: "9999px",
              border: `1px solid ${theme.borderColor}`,
              backdropFilter: "blur(16px)",
              transition: "border-color 0.4s ease",
            }}
          >
            <button
              onClick={() => setViewMode("carousel")}
              style={{
                padding: "6px 14px",
                borderRadius: "9999px",
                background: viewMode === "carousel" ? theme.btnGradient : "transparent",
                border: viewMode === "carousel" ? `1px solid ${theme.borderColor}` : "1px solid transparent",
                color: viewMode === "carousel" ? "#ffffff" : "rgba(255, 255, 255, 0.65)",
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                fontWeight: 600,
                cursor: "pointer",
                boxShadow: viewMode === "carousel" ? `0 0 14px ${theme.glowColor}` : "none",
                transition: "all 0.2s ease",
              }}
            >
              3D ORBITAL CAROUSEL
            </button>
            <button
              onClick={() => setViewMode("grid")}
              style={{
                padding: "6px 14px",
                borderRadius: "9999px",
                background: viewMode === "grid" ? theme.btnGradient : "transparent",
                border: viewMode === "grid" ? `1px solid ${theme.borderColor}` : "1px solid transparent",
                color: viewMode === "grid" ? "#ffffff" : "rgba(255, 255, 255, 0.65)",
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                fontWeight: 600,
                cursor: "pointer",
                boxShadow: viewMode === "grid" ? `0 0 14px ${theme.glowColorSecondary}` : "none",
                transition: "all 0.2s ease",
              }}
            >
              GRID MATRIX
            </button>
          </div>
        </div>
      </div>

      {/* ── Content Container ── */}
      <div
        className="container"
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
        }}
      >
        {viewMode === "carousel" ? (
          /* ══════════════════════════════════════════════════════════
              3D ORBITAL SWOOP CAROUSEL VIEW
              ══════════════════════════════════════════════════════════ */
          <div style={{ maxWidth: "980px", margin: "0 auto" }}>
            {/* Active 3D Orbital Swoop Card */}
            <RollInCard
              key={`active-proj-${activeProject.id}`}
              variant="orbital-swoop"
              index={0}
              maxTilt={8}
              scale={1.01}
              style={{
                borderRadius: "28px",
                background: theme.glassBg,
                border: `1.5px solid ${theme.borderColor}`,
                backdropFilter: "blur(28px)",
                padding: "clamp(28px, 4vw, 44px)",
                boxShadow: `0 28px 70px rgba(0, 0, 0, 0.8), inset 0 1px 1px rgba(255, 255, 255, 0.3)`,
                position: "relative",
                overflow: "hidden",
                transition: "all 0.4s ease",
              }}
            >
              <div className="glass-shimmer-crimson" />

              {/* Card Terminal Header */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "12px",
                  borderBottom: `1px solid ${theme.borderColor}`,
                  paddingBottom: "16px",
                  marginBottom: "24px",
                  transition: "border-color 0.4s ease",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span
                    style={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      background: theme.primary,
                      boxShadow: `0 0 12px ${theme.primary}`,
                      transition: "all 0.4s ease",
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.78rem",
                      color: theme.secondary,
                      letterSpacing: "0.1em",
                      fontWeight: 700,
                      transition: "color 0.4s ease",
                    }}
                  >
                    SYSTEM 0{activeProject.id} // {activeProject.title.toUpperCase().slice(0, 28)}...
                  </span>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.72rem",
                      color: "rgba(255, 255, 255, 0.65)",
                      background: "rgba(0, 0, 0, 0.4)",
                      padding: "4px 10px",
                      borderRadius: "6px",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                    }}
                  >
                    {activeProject.period}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.72rem",
                      padding: "4px 10px",
                      borderRadius: "6px",
                      background: `${theme.primary}25`,
                      border: `1px solid ${theme.borderColor}`,
                      color: theme.accent,
                      fontWeight: 700,
                      transition: "all 0.4s ease",
                    }}
                  >
                    ● PRODUCTION STABLE
                  </span>
                </div>
              </div>

              {/* Title & Description */}
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 900,
                  fontSize: "clamp(1.8rem, 3.2vw, 2.6rem)",
                  letterSpacing: "-0.02em",
                  color: "#ffffff",
                  lineHeight: 1.15,
                  marginBottom: "14px",
                }}
              >
                {activeProject.title}
              </h3>

              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "1.02rem",
                  color: "rgba(255, 255, 255, 0.88)",
                  lineHeight: 1.7,
                  marginBottom: "28px",
                  maxWidth: "840px",
                }}
              >
                {activeProject.description}
              </p>

              {/* Key Architecture Highlights */}
              <div style={{ marginBottom: "28px" }}>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.72rem",
                    color: theme.secondary,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    fontWeight: 700,
                    marginBottom: "12px",
                    transition: "color 0.4s ease",
                  }}
                >
                  Key Architectural Accomplishments:
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                    gap: "10px",
                  }}
                >
                  {(projectHighlights[activeProject.id] || []).map((highlight, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        padding: "10px 14px",
                        borderRadius: "10px",
                        background: "rgba(0, 0, 0, 0.45)",
                        border: `1px solid ${theme.borderColor}`,
                        transition: "border-color 0.4s ease",
                      }}
                    >
                      <span style={{ color: theme.secondary, fontSize: "0.85rem", fontWeight: 700, transition: "color 0.4s ease" }}>✓</span>
                      <span
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "0.84rem",
                          color: "rgba(255, 255, 255, 0.88)",
                        }}
                      >
                        {highlight}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack Pills */}
              <div style={{ marginBottom: "32px" }}>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.72rem",
                    color: "rgba(255, 255, 255, 0.6)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: "10px",
                  }}
                >
                  Technologies Applied:
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {activeProject.tech.map((t) => (
                    <span
                      key={t}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "5px 12px",
                        borderRadius: "8px",
                        background: `${theme.primary}18`,
                        border: `1px solid ${theme.borderColor}`,
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.78rem",
                        color: "#ffffff",
                        fontWeight: 600,
                        transition: "all 0.4s ease",
                      }}
                    >
                      <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: theme.secondary, transition: "background 0.4s ease" }} />
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer: Action Buttons & Navigation */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "16px",
                  borderTop: `1px solid ${theme.borderColor}`,
                  paddingTop: "24px",
                  transition: "border-color 0.4s ease",
                }}
              >
                {/* Action CTAs with Theme Gradient */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                  {activeProject.github && (
                    <a
                      href={activeProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "10px",
                        padding: "12px 24px",
                        borderRadius: "9999px",
                        background: theme.btnGradient,
                        border: "1px solid rgba(255, 255, 255, 0.4)",
                        color: "#ffffff",
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.86rem",
                        fontWeight: 700,
                        textDecoration: "none",
                        boxShadow: `0 8px 24px ${theme.glowColor}`,
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
                    >
                      <span>VIEW GITHUB REPOSITORY</span>
                      <span>↗</span>
                    </a>
                  )}

                  <button
                    onClick={() => copyRepoLink(activeProject.github, activeProject.id)}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "12px 20px",
                      borderRadius: "9999px",
                      background: "rgba(0, 0, 0, 0.55)",
                      border: `1px solid ${theme.borderColor}`,
                      color: copiedId === activeProject.id ? theme.secondary : "rgba(255, 255, 255, 0.85)",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.82rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <span>{copiedId === activeProject.id ? "✓ LINK COPIED" : "📋 COPY REPO LINK"}</span>
                  </button>
                </div>

                {/* Carousel Controls */}
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <button
                    onClick={handlePrev}
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "50%",
                      background: "rgba(255, 255, 255, 0.08)",
                      border: `1px solid ${theme.borderColor}`,
                      color: "#ffffff",
                      fontSize: "1.1rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = `${theme.primary}44`)}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)")}
                    aria-label="Previous Project"
                  >
                    ←
                  </button>

                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.82rem",
                      color: "rgba(255, 255, 255, 0.75)",
                      padding: "0 8px",
                    }}
                  >
                    0{activeIndex + 1} / 0{projects.length}
                  </span>

                  <button
                    onClick={handleNext}
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "50%",
                      background: "rgba(255, 255, 255, 0.08)",
                      border: `1px solid ${theme.borderColor}`,
                      color: "#ffffff",
                      fontSize: "1.1rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = `${theme.primary}44`)}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)")}
                    aria-label="Next Project"
                  >
                    →
                  </button>
                </div>
              </div>
            </RollInCard>

            {/* Quick Switch Project Ribbon Cards with Slow Sequential Stagger */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: "16px",
                marginTop: "24px",
              }}
            >
              {projects.map((proj, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <RollInCard
                    key={proj.id}
                    index={idx}
                    total={projects.length}
                    onClick={() => setActiveIndex(idx)}
                    style={{
                      padding: "16px 20px",
                      borderRadius: "16px",
                      background: isActive
                        ? `linear-gradient(135deg, ${theme.primary}44 0%, rgba(20, 10, 30, 0.85) 100%)`
                        : theme.glassBg,
                      border: isActive ? `1.5px solid ${theme.secondary}` : `1px solid ${theme.borderColor}`,
                      cursor: "pointer",
                      backdropFilter: "blur(16px)",
                      transition: "all 0.25s ease",
                      boxShadow: isActive ? `0 8px 30px ${theme.glowColor}` : "none",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: "6px",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.7rem",
                          color: isActive ? theme.accent : "rgba(255, 255, 255, 0.55)",
                          fontWeight: 700,
                        }}
                      >
                        0{proj.id} // SYSTEM
                      </span>
                      {isActive && (
                        <span
                          style={{
                            fontSize: "0.68rem",
                            fontFamily: "var(--font-mono)",
                            color: theme.secondary,
                            fontWeight: 700,
                          }}
                        >
                          ACTIVE
                        </span>
                      )}
                    </div>
                    <h4
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 700,
                        fontSize: "0.95rem",
                        color: "#ffffff",
                        margin: 0,
                        lineHeight: 1.3,
                      }}
                    >
                      {proj.title}
                    </h4>
                  </RollInCard>
                );
              })}
            </div>
          </div>
        ) : (
          /* ══════════════════════════════════════════════════════════
              GRID MATRIX VIEW: All 3 Projects Rolling in Staggered
              ══════════════════════════════════════════════════════════ */
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "24px",
            }}
          >
            {projects.map((proj, idx) => (
              <RollInCard
                key={proj.id}
                index={idx}
                total={projects.length}
                maxTilt={10}
                scale={1.02}
                style={{
                  borderRadius: "20px",
                  background: theme.glassBg,
                  border: `1.5px solid ${theme.borderColor}`,
                  backdropFilter: "blur(20px)",
                  padding: "28px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 12px 40px rgba(0, 0, 0, 0.6)",
                  transition: "border-color 0.4s ease",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "14px",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.72rem",
                        color: theme.secondary,
                        fontWeight: 700,
                      }}
                    >
                      0{proj.id} // PRODUCTION
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.68rem",
                        color: "rgba(255, 255, 255, 0.5)",
                      }}
                    >
                      {proj.period}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 800,
                      fontSize: "1.3rem",
                      color: "#ffffff",
                      marginBottom: "12px",
                      lineHeight: 1.25,
                    }}
                  >
                    {proj.title}
                  </h3>

                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.88rem",
                      color: "rgba(255, 255, 255, 0.8)",
                      lineHeight: 1.6,
                      marginBottom: "20px",
                    }}
                  >
                    {proj.description}
                  </p>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "24px" }}>
                    {proj.tech.map((t) => (
                      <span
                        key={t}
                        style={{
                          fontSize: "0.72rem",
                          fontFamily: "var(--font-mono)",
                          padding: "3px 8px",
                          borderRadius: "6px",
                          background: `${theme.primary}22`,
                          border: `1px solid ${theme.borderColor}`,
                          color: "#ffffff",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "16px" }}>
                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      color: theme.secondary,
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.82rem",
                      fontWeight: 700,
                      textDecoration: "none",
                    }}
                  >
                    <span>VIEW ON GITHUB</span>
                    <span>↗</span>
                  </a>
                </div>
              </RollInCard>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
