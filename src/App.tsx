import React, { useState, useCallback } from "react";
import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Skills from "./components/sections/Skills";
import Projects from "./components/sections/Projects";
import Experience from "./components/sections/Experience";
import Education from "./components/sections/Education";
import Certifications from "./components/sections/Certifications";
import Contact from "./components/sections/Contact";
import LoadingScreen from "./components/ui/LoadingScreen";
import CustomCursor from "./components/ui/CustomCursor";
import ScrollProgress from "./components/ui/ScrollProgress";
import Unified3DCyberBackground from "./components/canvas/Unified3DCyberBackground";
import { ThemeProvider, useTheme } from "./context/ThemeContext";

/** Thin gradient divider between sections */
function SectionDivider() {
  const { theme } = useTheme();
  return (
    <div style={{
      width: "100%", height: "1px",
      background: `linear-gradient(90deg, transparent 5%, ${theme.borderColor} 50%, transparent 95%)`,
    }} />
  );
}

function MainContent() {
  const [loaded, setLoaded] = useState(false);
  const onLoadComplete = useCallback(() => setLoaded(true), []);

  return (
    <>
      <LoadingScreen onComplete={onLoadComplete} />
      <CustomCursor />
      <ScrollProgress />

      {/* ── UNIFIED 3D ORGANIC FLUID WAVES BACKGROUND (Across all pages) ── */}
      <Unified3DCyberBackground />

      <div style={{
        position: "relative",
        minHeight: "100vh",
        background: "transparent",
        opacity: loaded ? 1 : 0,
        transition: "opacity 0.6s ease 0.2s",
      }}>
        <Navbar />
        <main style={{ position: "relative", zIndex: 10 }}>
          <Hero />
          <SectionDivider />
          <About />
          <SectionDivider />
          <Skills />
          <SectionDivider />
          <Projects />
          <SectionDivider />
          <Experience />
          <SectionDivider />
          <Education />
          <SectionDivider />
          <Certifications />
          <SectionDivider />
          <Contact />
        </main>
      </div>
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MainContent />
    </ThemeProvider>
  );
}
