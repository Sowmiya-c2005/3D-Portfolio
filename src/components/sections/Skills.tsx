import React, { useState } from "react";
import { skills } from "../../data/portfolio";
import RollInCard from "../ui/RollInCard";
import CircleToLineCardGrid from "../ui/CircleToLineCardGrid";
import { useTheme } from "../../context/ThemeContext";

const row1Skills = [
  { name: "React.js", category: "Frontend", level: "Production", desc: "Component Architecture & Hooks", icon: "⚛️" },
  { name: "Python", category: "Languages", level: "Core", desc: "Backend APIs & Automation", icon: "🐍" },
  { name: "JavaScript", category: "Languages", level: "Advanced", desc: "ES6+, Async/Await & Modern DOM", icon: "⚡" },
  { name: "TypeScript", category: "Languages", level: "Strict", desc: "Type Safety & Interfaces", icon: "📘" },
  { name: "Angular.js", category: "Frontend", level: "Framework", desc: "Enterprise SPAs & Data Binding", icon: "🅰️" },
  { name: "HTML5", category: "Frontend", level: "Semantic", desc: "Accessible Layouts & Standards", icon: "🌐" },
  { name: "CSS3", category: "Frontend", level: "Responsive", desc: "Modern Flexbox, Grid & Animations", icon: "🎨" },
  { name: "Java", category: "Languages", level: "OOP", desc: "Data Structures & Core Algorithms", icon: "☕" },
];

const row2Skills = [
  { name: "FastAPI", category: "Backend", level: "Production", desc: "High-Throughput REST APIs & OpenAPI", icon: "🚀" },
  { name: "Node.js", category: "Backend", level: "Runtime", desc: "Microservices & Server Scripts", icon: "🟢" },
  { name: "PostgreSQL", category: "Databases", level: "Relational", desc: "Relational Schema & SQLAlchemy", icon: "🐘" },
  { name: "MySQL", category: "Databases", level: "Relational", desc: "ACID Transactions & Data Integrity", icon: "🐬" },
  { name: "Jenkins CI/CD", category: "DevOps", level: "Automated", desc: "Continuous Build & Deployment", icon: "⚙️" },
  { name: "Git & GitHub", category: "Tools", level: "Version Control", desc: "Branching, PRs & Team Collab", icon: "🐙" },
  { name: "Vite", category: "Tools", level: "Build Tool", desc: "Lightning Fast HMR & Bundling", icon: "⚡" },
  { name: "Render Cloud", category: "Cloud", level: "Deployment", desc: "Zero-Downtime Cloud Web Services", icon: "☁️" },
  { name: "JWT & RBAC", category: "Security", level: "Auth", desc: "Token Auth & Role Access Control", icon: "🔐" },
];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const { theme } = useTheme();
  const categories = ["All", ...skills.map((s) => s.category)];

  const allFilteredSkills =
    activeCategory === "All"
      ? skills.flatMap((s) => s.items.map((item) => ({ name: item, category: s.category, color: s.color })))
      : skills
          .filter((s) => s.category.trim().toLowerCase() === activeCategory.trim().toLowerCase())
          .flatMap((s) => s.items.map((item) => ({ name: item, category: s.category, color: s.color })));

  return (
    <section
      id="skills"
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
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "800px",
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
              02 // TECH STACK // ARSENAL
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
            TECHNICAL EXPERTISE<span style={{ color: theme.secondary, transition: "color 0.4s ease" }}>.</span>
          </h2>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1rem",
              color: "rgba(255, 255, 255, 0.82)",
              maxWidth: "600px",
              margin: "0 auto 12px",
              lineHeight: 1.6,
            }}
          >
            Production frameworks, backend microservices, and databases powering high-performance applications.
          </p>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "0.78rem",
              fontFamily: "var(--font-mono)",
              color: theme.secondary,
              background: "rgba(0, 0, 0, 0.55)",
              padding: "4px 14px",
              borderRadius: "9999px",
              border: `1px solid ${theme.borderColor}`,
              transition: "all 0.4s ease",
            }}
          >
            <span style={{ animation: "pulse-ring 2s infinite", display: "inline-block", width: "6px", height: "6px", borderRadius: "50%", background: theme.primary }} />
            LIVE MOVING CARDS · HOVER OVER ANY CARD TO PAUSE &amp; INSPECT
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          MOVING CARDS: INFINITE MARQUEE DUAL-ROW SLIDER
          ══════════════════════════════════════════════════════════ */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          marginBottom: "56px",
          maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        {/* Row 1: Gliding Left (Primary Theme Glow) */}
        <div className="animate-marquee-left" style={{ gap: "20px", padding: "6px 0" }}>
          {[...row1Skills, ...row1Skills].map((item, idx) => (
            <div
              key={`r1-${item.name}-${idx}`}
              style={{
                minWidth: "270px",
                padding: "16px 20px",
                borderRadius: "16px",
                background: theme.glassBg,
                border: `1px solid ${theme.borderColor}`,
                backdropFilter: "blur(20px)",
                boxShadow: "0 8px 30px rgba(0, 0, 0, 0.5)",
                display: "flex",
                alignItems: "center",
                gap: "14px",
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = theme.primary;
                e.currentTarget.style.transform = "translateY(-6px) scale(1.03)";
                e.currentTarget.style.boxShadow = `0 14px 40px ${theme.glowColor}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = theme.borderColor;
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.boxShadow = "0 8px 30px rgba(0, 0, 0, 0.5)";
              }}
            >
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "12px",
                  background: `${theme.primary}22`,
                  border: `1px solid ${theme.primary}55`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.4rem",
                  flexShrink: 0,
                  transition: "all 0.4s ease",
                }}
              >
                {item.icon}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px", marginBottom: "4px" }}>
                  <h4
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: "1.02rem",
                      color: "#ffffff",
                      margin: 0,
                    }}
                  >
                    {item.name}
                  </h4>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.65rem",
                      padding: "2px 8px",
                      borderRadius: "9999px",
                      background: `${theme.primary}25`,
                      color: theme.accent,
                      border: `1px solid ${theme.primary}44`,
                    }}
                  >
                    {item.level}
                  </span>
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.78rem",
                    color: "rgba(255, 255, 255, 0.7)",
                    margin: 0,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Row 2: Gliding Right (Secondary Theme Glow) */}
        <div className="animate-marquee-right" style={{ gap: "20px", padding: "6px 0" }}>
          {[...row2Skills, ...row2Skills].map((item, idx) => (
            <div
              key={`r2-${item.name}-${idx}`}
              style={{
                minWidth: "270px",
                padding: "16px 20px",
                borderRadius: "16px",
                background: theme.glassBg,
                border: `1px solid ${theme.borderColor}`,
                backdropFilter: "blur(20px)",
                boxShadow: "0 8px 30px rgba(0, 0, 0, 0.5)",
                display: "flex",
                alignItems: "center",
                gap: "14px",
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = theme.secondary;
                e.currentTarget.style.transform = "translateY(-6px) scale(1.03)";
                e.currentTarget.style.boxShadow = `0 14px 40px ${theme.glowColorSecondary}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = theme.borderColor;
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.boxShadow = "0 8px 30px rgba(0, 0, 0, 0.5)";
              }}
            >
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "12px",
                  background: `${theme.secondary}22`,
                  border: `1px solid ${theme.secondary}55`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.4rem",
                  flexShrink: 0,
                  transition: "all 0.4s ease",
                }}
              >
                {item.icon}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px", marginBottom: "4px" }}>
                  <h4
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: "1.02rem",
                      color: "#ffffff",
                      margin: 0,
                    }}
                  >
                    {item.name}
                  </h4>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.65rem",
                      padding: "2px 8px",
                      borderRadius: "9999px",
                      background: `${theme.secondary}25`,
                      color: theme.secondary,
                      border: `1px solid ${theme.secondary}44`,
                    }}
                  >
                    {item.level}
                  </span>
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.78rem",
                    color: "rgba(255, 255, 255, 0.7)",
                    margin: 0,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          CATEGORIZED STACK INVENTORY: SLOW 3D ORBITAL SWOOP CARDS
          ══════════════════════════════════════════════════════════ */}
      <div
        className="container"
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
        }}
      >
        <div
          className="glass-cinematic-crimson"
          style={{
            borderRadius: "24px",
            padding: "clamp(24px, 3.5vw, 36px)",
            maxWidth: "1040px",
            margin: "0 auto",
            boxShadow: "0 24px 60px rgba(0, 0, 0, 0.75), inset 0 1px 1px rgba(255, 255, 255, 0.25)",
          }}
        >
          {/* Header Bar */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "14px",
              borderBottom: `1px solid ${theme.borderColor}`,
              paddingBottom: "18px",
              marginBottom: "22px",
              transition: "border-color 0.4s ease",
            }}
          >
            <div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  fontSize: "1.25rem",
                  color: "#ffffff",
                  marginBottom: "4px",
                }}
              >
                Categorized Stack Inventory
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.85rem",
                  color: "rgba(255, 255, 255, 0.7)",
                  margin: 0,
                }}
              >
                Filtered breakdown of production tools and certified competencies.
              </p>
            </div>

            {/* Filter Pills */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "6px",
                background: "rgba(0, 0, 0, 0.55)",
                padding: "6px",
                borderRadius: "12px",
                border: `1px solid ${theme.borderColor}`,
                transition: "border-color 0.4s ease",
              }}
            >
              {categories.map((cat) => {
                const isSelected = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    style={{
                      padding: "6px 14px",
                      borderRadius: "8px",
                      background: isSelected ? theme.btnGradient : "transparent",
                      border: isSelected ? `1px solid ${theme.borderColor}` : "1px solid transparent",
                      color: isSelected ? "#ffffff" : "rgba(255, 255, 255, 0.65)",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.75rem",
                      fontWeight: isSelected ? 700 : 500,
                      cursor: "pointer",
                      boxShadow: isSelected ? `0 0 14px ${theme.glowColor}` : "none",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3D Circle-to-Line Orchestrated Card Matrix */}
          <CircleToLineCardGrid
            items={allFilteredSkills.map((item, idx) => ({
              id: `${activeCategory}-${item.name}-${idx}`,
              title: item.name,
              subtitle: item.category,
              badge: "PRODUCTION STACK",
              icon: idx % 2 === 0 ? "⚡" : "✨",
            }))}
            orbitDurationMs={1500}
            staggerMs={130}
            flightDurationMs={650}
          />
        </div>
      </div>
    </section>
  );
}
