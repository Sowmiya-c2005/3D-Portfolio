import React, { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: `${progress}%`,
        height: "2px",
        background: "linear-gradient(90deg, var(--theme-primary, #a855f7), var(--theme-secondary, #f59e0b))",
        boxShadow: "0 0 12px var(--theme-glow, rgba(168, 85, 247, 0.6))",
        zIndex: 1000,
        transition: "width 0.1s linear",
      }}
    />
  );
}
