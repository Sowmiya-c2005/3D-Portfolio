import React from "react";
import { experience } from "../../data/portfolio";
import RollInCard from "../ui/RollInCard";
import { useTheme } from "../../context/ThemeContext";

export default function Experience() {
  const { theme } = useTheme();

  return (
    <section
      id="experience"
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
          top: "20%",
          left: "10%",
          width: "600px",
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
                background: theme.secondary,
                boxShadow: `0 0 10px ${theme.secondary}`,
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
              04 // CAREER TRACK // PROFESSIONAL EXPERIENCE
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
            INDUSTRY EXPERIENCE<span style={{ color: theme.secondary, transition: "color 0.4s ease" }}>.</span>
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
            Hands-on internships developing internal web tooling, executing QA testing, and eliminating critical bugs.
          </p>
        </div>
      </div>

      {/* ── Content Container: 3D Orbital Swoop Experience Cards ── */}
      <div
        className="container"
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          maxWidth: "1040px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "28px",
          }}
        >
          {experience.map((exp, idx) => {
            const isCosmic = exp.company.includes("Cosmic");
            const accentColor = isCosmic ? theme.secondary : theme.primary;
            const variant = idx === 0 ? "orbital-swoop" : "helix-roll";

            return (
              <RollInCard
                key={exp.company}
                variant={variant}
                index={idx}
                maxTilt={8}
                scale={1.02}
                style={{
                  borderRadius: "24px",
                  background: theme.glassBg,
                  border: `1.5px solid ${theme.borderColor}`,
                  backdropFilter: "blur(24px)",
                  padding: "clamp(24px, 3.5vw, 36px)",
                  boxShadow: "0 20px 50px rgba(0, 0, 0, 0.75), inset 0 1px 1px rgba(255, 255, 255, 0.25)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  position: "relative",
                  overflow: "hidden",
                  transition: "border-color 0.4s ease",
                }}
              >
                {/* Shimmer reflection */}
                <div className="glass-shimmer-crimson" />

                <div>
                  {/* Top Meta Line */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "10px",
                      borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                      paddingBottom: "14px",
                      marginBottom: "18px",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.72rem",
                        color: accentColor,
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        transition: "color 0.4s ease",
                      }}
                    >
                      ROLE 0{idx + 1} // {exp.type.toUpperCase()}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.72rem",
                        color: "rgba(255, 255, 255, 0.6)",
                        background: "rgba(0, 0, 0, 0.4)",
                        padding: "3px 10px",
                        borderRadius: "6px",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                      }}
                    >
                      {exp.period}
                    </span>
                  </div>

                  {/* Company & Role */}
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 800,
                      fontSize: "1.45rem",
                      color: "#ffffff",
                      marginBottom: "4px",
                      lineHeight: 1.2,
                    }}
                  >
                    {exp.role}
                  </h3>

                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.92rem",
                      color: accentColor,
                      fontWeight: 700,
                      marginBottom: "18px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      transition: "color 0.4s ease",
                    }}
                  >
                    <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: accentColor, transition: "background 0.4s ease" }} />
                    {exp.company}
                  </div>

                  {/* Highlight pill if present */}
                  {exp.highlight && (
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "6px 14px",
                        borderRadius: "8px",
                        background: `${theme.secondary}22`,
                        border: `1px solid ${theme.secondary}55`,
                        color: theme.secondary,
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.78rem",
                        fontWeight: 700,
                        marginBottom: "18px",
                        transition: "all 0.4s ease",
                      }}
                    >
                      <span>★</span>
                      <span>KEY RESULT: {exp.highlight.toUpperCase()}</span>
                    </div>
                  )}

                  {/* Bullet points */}
                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                      margin: 0,
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                    }}
                  >
                    {exp.points.map((pt, pIdx) => (
                      <li
                        key={pIdx}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "10px",
                          fontFamily: "var(--font-body)",
                          fontSize: "0.88rem",
                          color: "rgba(255, 255, 255, 0.86)",
                          lineHeight: 1.6,
                        }}
                      >
                        <span
                          style={{
                            color: accentColor,
                            fontWeight: 700,
                            fontSize: "0.95rem",
                            lineHeight: 1.2,
                            transition: "color 0.4s ease",
                          }}
                        >
                          ›
                        </span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer Tag */}
                <div
                  style={{
                    borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                    paddingTop: "16px",
                    marginTop: "24px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.72rem",
                      color: "rgba(255, 255, 255, 0.5)",
                    }}
                  >
                    LOCATION: TAMIL NADU, INDIA
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.72rem",
                      color: theme.secondary,
                      transition: "color 0.4s ease",
                    }}
                  >
                    ● VERIFIED INTERNSHIP
                  </span>
                </div>
              </RollInCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
