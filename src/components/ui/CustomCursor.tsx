import React, { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const [isHover, setIsHover] = useState(false);
  const [isClick, setIsClick] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Check for touch device
    if ("ontouchstart" in window) return;

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
    };

    const onDown = () => setIsClick(true);
    const onUp = () => setIsClick(false);

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (
        t.closest("a") ||
        t.closest("button") ||
        t.closest("[role='button']") ||
        t.tagName === "INPUT" ||
        t.tagName === "TEXTAREA" ||
        t.style.cursor === "pointer" ||
        window.getComputedStyle(t).cursor === "pointer"
      ) {
        setIsHover(true);
      }
    };
    const onOut = () => setIsHover(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseout", onOut, { passive: true });

    let raf: number;
    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.15;
      pos.current.y += (target.current.y - pos.current.y) * 0.15;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${target.current.x - 4}px, ${target.current.y - 4}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${pos.current.x - 20}px, ${pos.current.y - 20}px) scale(${isClick ? 0.7 : isHover ? 1.6 : 1})`;
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(raf);
    };
  }, [visible, isHover, isClick]);

  if (!visible) return null;

  return (
    <>
      {/* Inner dot */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          background: "var(--theme-primary, #a855f7)",
          boxShadow: "0 0 10px var(--theme-glow, rgba(168, 85, 247, 0.8))",
          zIndex: 10000,
          pointerEvents: "none",
          mixBlendMode: "screen",
          transition: "width 0.2s, height 0.2s, background 0.2s",
        }}
      />
      {/* Outer ring */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          border: `1.5px solid var(--theme-primary, #a855f7)`,
          opacity: isHover ? 0.85 : 0.45,
          zIndex: 10000,
          pointerEvents: "none",
          transition: "transform 0.15s cubic-bezier(0.16,1,0.3,1), border-color 0.3s ease, background 0.3s ease",
          background: isHover ? "var(--theme-glow, rgba(168, 85, 247, 0.15))" : "transparent",
        }}
      />
      <style>{`
        @media (pointer: fine) {
          * { cursor: none !important; }
        }
      `}</style>
    </>
  );
}
