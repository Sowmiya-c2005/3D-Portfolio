import React from "react";
import { education, achievements } from "../../data/portfolio";
import RollInCard from "../ui/RollInCard";
import { useTheme } from "../../context/ThemeContext";

const coreSubjects = [
  "Data Structures & Algorithms",
  "Database Management Systems",
  "Object-Oriented Programming",
  "Web Technology & Frameworks",
  "Software Engineering & QA",
  "Operating Systems & Networks",
];

export default function Education() {
  const edu = education[0];
  const { theme } = useTheme();

  return (
    <section
      id="education"
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
          right: "10%",
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
              05 // ACADEMICS // FOUNDATION
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
            EDUCATION &amp; ACADEMICS<span style={{ color: theme.secondary, transition: "color 0.4s ease" }}>.</span>
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
            Formal computer science engineering foundation with consistent top academic distinction.
          </p>
        </div>
      </div>

      {/* ── Content Container: Dual Grid (Education + Achievements) with 3D Swoop ── */}
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
          {/* Main Degree Card: Orbital-Swoop */}
          <RollInCard
            index={0}
            total={2}
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
            <div className="glass-shimmer-crimson" />

            <div>
              {/* Top Meta Line */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "10px",
                  borderBottom: `1px solid ${theme.borderColor}`,
                  paddingBottom: "14px",
                  marginBottom: "18px",
                  transition: "border-color 0.4s ease",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.72rem",
                    color: theme.accent,
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    transition: "color 0.4s ease",
                  }}
                >
                  DEGREE // UNDERGRADUATE
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.72rem",
                    color: theme.secondary,
                    background: `${theme.secondary}22`,
                    padding: "3px 10px",
                    borderRadius: "6px",
                    border: `1px solid ${theme.secondary}55`,
                    fontWeight: 600,
                    transition: "all 0.4s ease",
                  }}
                >
                  ● {edu.status.toUpperCase()}
                </span>
              </div>

              {/* Degree Title & Institution */}
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  fontSize: "1.45rem",
                  color: "#ffffff",
                  marginBottom: "6px",
                  lineHeight: 1.2,
                }}
              >
                {edu.degree}
              </h3>

              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.92rem",
                  color: theme.secondary,
                  fontWeight: 600,
                  marginBottom: "24px",
                  transition: "color 0.4s ease",
                }}
              >
                {edu.institution}
              </div>

              {/* CGPA Spotlight Badge */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "16px 20px",
                  borderRadius: "14px",
                  background: `${theme.primary}18`,
                  border: `1px solid ${theme.borderColor}`,
                  marginBottom: "24px",
                  transition: "all 0.4s ease",
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.72rem",
                      color: "rgba(255, 255, 255, 0.7)",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      marginBottom: "4px",
                    }}
                  >
                    Cumulative Academic Score
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 900,
                      fontSize: "1.8rem",
                      color: theme.secondary,
                      lineHeight: 1,
                      transition: "color 0.4s ease",
                    }}
                  >
                    {edu.cgpa}
                  </div>
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.74rem",
                    color: "rgba(255, 255, 255, 0.8)",
                    textAlign: "right",
                  }}
                >
                  <div>{edu.cgpaNotes}</div>
                  <div style={{ color: theme.secondary, fontWeight: 700, marginTop: "2px", transition: "color 0.4s ease" }}>Top Tier Standing</div>
                </div>
              </div>

              {/* Progress Bar (6 of 8 semesters = 75%) */}
              <div style={{ marginBottom: "24px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.72rem",
                    color: "rgba(255, 255, 255, 0.7)",
                    marginBottom: "8px",
                  }}
                >
                  <span>Curriculum Completion (Semesters 1-6)</span>
                  <span style={{ color: theme.secondary, fontWeight: 700, transition: "color 0.4s ease" }}>75%</span>
                </div>
                <div
                  style={{
                    height: "8px",
                    borderRadius: "9999px",
                    background: "rgba(255, 255, 255, 0.08)",
                    overflow: "hidden",
                    border: `1px solid ${theme.borderColor}`,
                  }}
                >
                  <div
                    style={{
                      width: "75%",
                      height: "100%",
                      borderRadius: "9999px",
                      background: theme.btnGradient,
                      boxShadow: `0 0 10px ${theme.glowColor}`,
                    }}
                  />
                </div>
              </div>

              {/* Core Coursework Badges */}
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.72rem",
                    color: "rgba(255, 255, 255, 0.6)",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    marginBottom: "10px",
                  }}
                >
                  Key Engineering Coursework:
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {coreSubjects.map((subj) => (
                    <span
                      key={subj}
                      style={{
                        fontSize: "0.74rem",
                        fontFamily: "var(--font-mono)",
                        padding: "4px 10px",
                        borderRadius: "6px",
                        background: `${theme.primary}20`,
                        border: `1px solid ${theme.borderColor}`,
                        color: "#ffffff",
                      }}
                    >
                      {subj}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Period */}
            <div
              style={{
                borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                paddingTop: "16px",
                marginTop: "24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontFamily: "var(--font-mono)",
                fontSize: "0.74rem",
                color: "rgba(255, 255, 255, 0.65)",
              }}
            >
              <span>TIMELINE: {edu.period}</span>
              <span style={{ color: theme.secondary, transition: "color 0.4s ease" }}>NAGERCOIL, TN</span>
            </div>
          </RollInCard>

          {/* Academic Achievements Card: Cascade-Flip */}
          <RollInCard
            index={1}
            total={2}
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
            <div className="glass-shimmer-crimson" />

            <div>
              {/* Top Meta Line */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "10px",
                  borderBottom: `1px solid ${theme.borderColor}`,
                  paddingBottom: "14px",
                  marginBottom: "18px",
                  transition: "border-color 0.4s ease",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.72rem",
                    color: theme.accent,
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    transition: "color 0.4s ease",
                  }}
                >
                  DISTINCTIONS // HONORS
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.72rem",
                    color: theme.secondary,
                    background: `${theme.secondary}22`,
                    padding: "3px 10px",
                    borderRadius: "6px",
                    border: `1px solid ${theme.secondary}55`,
                    fontWeight: 600,
                    transition: "all 0.4s ease",
                  }}
                >
                  ● VERIFIED MERIT
                </span>
              </div>

              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  fontSize: "1.45rem",
                  color: "#ffffff",
                  marginBottom: "6px",
                  lineHeight: 1.2,
                }}
              >
                Academic Honors &amp; Awards
              </h3>

              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.92rem",
                  color: theme.secondary,
                  fontWeight: 600,
                  marginBottom: "24px",
                  transition: "color 0.4s ease",
                }}
              >
                Recognitions &amp; Extracurricular Leadership
              </div>

              {/* Achievements List */}
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {achievements.map((ach, aIdx) => (
                  <div
                    key={aIdx}
                    style={{
                      padding: "16px",
                      borderRadius: "14px",
                      background: "rgba(0, 0, 0, 0.45)",
                      border: `1px solid ${theme.borderColor}`,
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "12px",
                      transition: "border-color 0.4s ease",
                    }}
                  >
                    <span style={{ fontSize: "1.2rem", flexShrink: 0 }}>🏅</span>
                    <div>
                      <div
                        style={{
                          fontFamily: "var(--font-display)",
                          fontWeight: 700,
                          fontSize: "0.95rem",
                          color: "#ffffff",
                          marginBottom: "4px",
                        }}
                      >
                        {ach.title}
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.72rem",
                          color: theme.secondary,
                          marginBottom: "4px",
                          transition: "color 0.4s ease",
                        }}
                      >
                        {ach.org}
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "0.82rem",
                          color: "rgba(255, 255, 255, 0.75)",
                          lineHeight: 1.5,
                        }}
                      >
                        {ach.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Period */}
            <div
              style={{
                borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                paddingTop: "16px",
                marginTop: "24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontFamily: "var(--font-mono)",
                fontSize: "0.74rem",
                color: "rgba(255, 255, 255, 0.65)",
              }}
            >
              <span>ANNA UNIVERSITY AFFILIATED</span>
              <span style={{ color: theme.secondary, transition: "color 0.4s ease" }}>EXCELLENCE IN CSE</span>
            </div>
          </RollInCard>
        </div>
      </div>
    </section>
  );
}
