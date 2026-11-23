import React, { useState, useEffect } from "react";
import sowmiyaPhoto from "../../assets/sowmiya-real.jpg";
import { useTheme, type ThemeMode } from "../../context/ThemeContext";

const NAV_LINKS = [
  { label: "Home", href: "home" },
  { label: "About", href: "about" },
  { label: "Skills", href: "skills" },
  { label: "Projects", href: "projects" },
  { label: "Experience", href: "experience" },
  { label: "Education", href: "education" },
  { label: "Certs", href: "certifications" },
  { label: "Contact", href: "contact" },
];

const THEME_OPTIONS: { id: ThemeMode; label: string; icon: string; dot: string }[] = [
  { id: "amethyst", label: "Amethyst", icon: "✦", dot: "#a855f7" },
  { id: "emerald", label: "Emerald", icon: "▲", dot: "#00ff9d" },
  { id: "crimson", label: "Crimson", icon: "◆", dot: "#ff1744" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, mode, setMode } = useTheme();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = NAV_LINKS.map((l) => l.href);
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 140) {
          setActive(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <header
      style={{
        position: "fixed",
        top: "16px",
        left: 0,
        right: 0,
        zIndex: 999,
        display: "flex",
        justifyContent: "center",
        padding: "0 16px",
        pointerEvents: "none",
      }}
    >
      <nav
        style={{
          width: "100%",
          maxWidth: "1140px",
          height: "58px",
          borderRadius: "9999px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 18px 0 22px",
          background: scrolled
            ? "rgba(10, 6, 16, 0.88)"
            : "rgba(16, 10, 26, 0.75)",
          backdropFilter: "blur(24px) saturate(190%)",
          WebkitBackdropFilter: "blur(24px) saturate(190%)",
          border: `1px solid ${theme.borderColor}`,
          boxShadow: scrolled
            ? `0 14px 40px rgba(0, 0, 0, 0.85), 0 0 28px ${theme.glowColor}, inset 0 1px 1px rgba(255, 255, 255, 0.22)`
            : `0 8px 32px rgba(0, 0, 0, 0.65), 0 0 18px ${theme.glowColorSecondary}, inset 0 1px 1px rgba(255, 255, 255, 0.18)`,
          transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          pointerEvents: "auto",
        }}
      >
        {/* Brand Logo with Sowmiya's Real Photo */}
        <button
          onClick={() => scrollTo("home")}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: 0,
          }}
        >
          <div
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "50%",
              overflow: "hidden",
              border: `2px solid ${theme.primary}`,
              boxShadow: `0 0 14px ${theme.glowColor}`,
              flexShrink: 0,
              transition: "border-color 0.4s ease, box-shadow 0.4s ease",
            }}
          >
            <img
              src={sowmiyaPhoto}
              alt="Sowmiya C"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center 20%",
              }}
            />
          </div>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "0.95rem",
              color: "#ffffff",
              letterSpacing: "-0.02em",
            }}
          >
            SOWMIYA<span style={{ color: theme.secondary, transition: "color 0.4s ease" }}>.</span>
          </span>
        </button>

        {/* Center Navigation Links (Desktop) */}
        <div
          className="nav-desktop"
          style={{
            display: "flex",
            gap: "4px",
            alignItems: "center",
            background: "rgba(0, 0, 0, 0.45)",
            padding: "4px",
            borderRadius: "9999px",
            border: `1px solid ${theme.borderColor}`,
            transition: "border-color 0.4s ease",
          }}
        >
          {NAV_LINKS.map((link) => {
            const isActive = active === link.href;
            return (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                style={{
                  padding: "6px 13px",
                  borderRadius: "9999px",
                  border: isActive ? `1px solid ${theme.borderColor}` : "1px solid transparent",
                  cursor: "pointer",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.75rem",
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? "#ffffff" : "rgba(255, 255, 255, 0.68)",
                  background: isActive
                    ? `linear-gradient(135deg, ${theme.primary}55, ${theme.secondary}45)`
                    : "transparent",
                  boxShadow: isActive ? `0 0 16px ${theme.glowColor}` : "none",
                  transition: "all 0.25s ease",
                }}
              >
                {link.label}
              </button>
            );
          })}
        </div>

        {/* Right Action: 1-Click Theme Switcher & Let's Talk CTA */}
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          {/* Segmented 1-Click Theme Switcher Pill */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: "rgba(0, 0, 0, 0.55)",
              border: `1px solid ${theme.borderColor}`,
              borderRadius: "9999px",
              padding: "2px",
              gap: "2px",
            }}
            title="Switch 3D Portfolio Theme"
          >
            {THEME_OPTIONS.map((opt) => {
              const isSelected = mode === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => setMode(opt.id)}
                  style={{
                    background: isSelected ? "rgba(255, 255, 255, 0.16)" : "transparent",
                    border: isSelected ? `1px solid ${opt.dot}` : "1px solid transparent",
                    borderRadius: "9999px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    padding: "4px 8px",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.68rem",
                    fontWeight: isSelected ? 700 : 500,
                    color: isSelected ? "#ffffff" : "rgba(255, 255, 255, 0.55)",
                    transition: "all 0.25s ease",
                  }}
                >
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      backgroundColor: opt.dot,
                      boxShadow: isSelected ? `0 0 8px ${opt.dot}` : "none",
                      display: "inline-block",
                    }}
                  />
                  <span className="hidden sm:inline">{opt.label}</span>
                </button>
              );
            })}
          </div>

          {/* Let's Talk CTA */}
          <button
            onClick={() => scrollTo("contact")}
            className="nav-resume"
            style={{
              padding: "7px 18px",
              borderRadius: "9999px",
              background: theme.btnGradient,
              border: "none",
              color: "#ffffff",
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "0.76rem",
              letterSpacing: "0.04em",
              cursor: "pointer",
              boxShadow: `0 0 18px ${theme.glowColor}`,
              transition: "transform 0.2s ease, box-shadow 0.4s ease",
            }}
          >
            LET'S TALK
          </button>

          {/* Mobile hamburger */}
          <button
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "none",
              border: `1px solid ${theme.borderColor}`,
              borderRadius: "50%",
              cursor: "pointer",
              color: "#ffffff",
              width: "36px",
              height: "36px",
              display: "none",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {menuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            top: "84px",
            left: "16px",
            right: "16px",
            background: "rgba(10, 6, 18, 0.96)",
            backdropFilter: "blur(28px)",
            borderRadius: "20px",
            border: `1px solid ${theme.borderColor}`,
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.9)",
            pointerEvents: "auto",
          }}
        >
          {/* Mobile Theme Selector */}
          <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
            {THEME_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setMode(opt.id)}
                style={{
                  flex: 1,
                  padding: "8px",
                  borderRadius: "10px",
                  border: mode === opt.id ? `1.5px solid ${opt.dot}` : "1px solid rgba(255,255,255,0.15)",
                  background: mode === opt.id ? "rgba(255,255,255,0.12)" : "transparent",
                  color: "#ffffff",
                  fontSize: "0.75rem",
                  fontFamily: "var(--font-mono)",
                  cursor: "pointer",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: opt.dot,
                    marginRight: "6px",
                  }}
                />
                {opt.label}
              </button>
            ))}
          </div>

          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              style={{
                background: active === link.href ? `${theme.primary}25` : "transparent",
                border: active === link.href ? `1px solid ${theme.borderColor}` : "none",
                borderRadius: "10px",
                padding: "12px 16px",
                color: active === link.href ? theme.primary : "#ffffff",
                fontFamily: "var(--font-mono)",
                fontSize: "0.9rem",
                textAlign: "left",
                cursor: "pointer",
              }}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
