import React from "react";
import { certifications } from "../../data/portfolio";
import CircleToLineCardGrid from "../ui/CircleToLineCardGrid";
import { useTheme } from "../../context/ThemeContext";

export default function Certifications() {
  const { theme } = useTheme();

  return (
    <section
      id="certifications"
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
              06 // CREDENTIALS // VERIFIED HONOURS
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
            CERTIFICATIONS &amp; CREDENTIALS<span style={{ color: theme.secondary, transition: "color 0.4s ease" }}>.</span>
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
            Verified credentials from industry leaders including TCS iON, Google Cloud AI, and Infosys Springboard.
          </p>
        </div>
      </div>

      {/* ── Content Container: 3D Circle-to-Line Orchestrated Certifications ── */}
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
        <CircleToLineCardGrid
          items={certifications.map((cert, idx) => ({
            id: cert.title,
            title: cert.title,
            subtitle: cert.issuer,
            badge: `CREDENTIAL 0${idx + 1} · OFFICIAL CERT`,
            icon: cert.icon,
          }))}
          radius={220}
          orbitDurationMs={1600}
          staggerMs={180}
          flightDurationMs={750}
        />
      </div>
    </section>
  );
}
