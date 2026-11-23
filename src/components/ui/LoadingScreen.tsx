import React, { useState, useEffect } from "react";

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "reveal" | "done">("loading");

  useEffect(() => {
    let frame = 0;
    const target = 100;
    const duration = 2200; // ms
    const fps = 60;
    const totalFrames = (duration / 1000) * fps;
    const inc = target / totalFrames;

    const interval = setInterval(() => {
      frame++;
      const eased = 1 - Math.pow(1 - frame / totalFrames, 3); // ease-out cubic
      setProgress(Math.min(Math.round(eased * target), 100));
      if (frame >= totalFrames) {
        clearInterval(interval);
        setProgress(100);
        setTimeout(() => setPhase("reveal"), 300);
        setTimeout(() => { setPhase("done"); onComplete(); }, 1200);
      }
    }, 1000 / fps);

    return () => clearInterval(interval);
  }, [onComplete]);

  if (phase === "done") return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "var(--theme-bg, #07030e)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)",
        opacity: phase === "reveal" ? 0 : 1,
        transform: phase === "reveal" ? "scale(1.08)" : "scale(1)",
        pointerEvents: phase === "reveal" ? "none" : "auto",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, var(--theme-glow, rgba(168,85,247,0.25)) 0%, var(--theme-glow-sec, rgba(245,158,11,0.1)) 50%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* SC monogram */}
      <div
        style={{
          width: "80px",
          height: "80px",
          borderRadius: "20px",
          background: "linear-gradient(135deg, var(--theme-primary, #a855f7) 0%, var(--theme-secondary, #f59e0b) 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 800,
          fontSize: "2rem",
          color: "#ffffff",
          marginBottom: "40px",
          boxShadow: "0 0 60px var(--theme-glow, rgba(168,85,247,0.5)), 0 0 120px var(--theme-glow-sec, rgba(245,158,11,0.3))",
          animation: "pulse-glow 2s ease infinite",
        }}
      >
        SC
      </div>

      {/* Title */}
      <p
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 700,
          fontSize: "1rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.85)",
          marginBottom: "32px",
        }}
      >
        SOWMIYA C
      </p>

      {/* Progress bar container */}
      <div
        style={{
          width: "200px",
          height: "2px",
          background: "rgba(255,255,255,0.08)",
          borderRadius: "1px",
          overflow: "hidden",
          marginBottom: "16px",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progress}%`,
            background: "linear-gradient(90deg, var(--theme-primary, #a855f7), var(--theme-secondary, #f59e0b))",
            borderRadius: "1px",
            transition: "width 0.1s linear",
            boxShadow: "0 0 10px var(--theme-glow, rgba(168,85,247,0.7))",
          }}
        />
      </div>

      {/* Percentage */}
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.72rem",
          letterSpacing: "0.15em",
          color: "var(--theme-accent, #c084fc)",
        }}
      >
        {progress}%
      </span>

      <style>{`
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 60px rgba(168,85,247,0.4), 0 0 120px rgba(245,158,11,0.2); }
          50%      { box-shadow: 0 0 80px rgba(168,85,247,0.6), 0 0 160px rgba(245,158,11,0.35); }
        }
      `}</style>
    </div>
  );
}
