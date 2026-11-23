import React, { createContext, useContext, useState, useEffect } from "react";

export type ThemeMode = "amethyst" | "emerald" | "crimson";

export interface ThemeConfig {
  id: ThemeMode;
  name: string;
  tagline: string;
  primary: string;
  primaryHex: number; // for Three.js
  secondary: string;
  secondaryHex: number; // for Three.js
  accent: string;
  bgDark: string;
  bgDarkHex: number;
  glassBg: string;
  borderColor: string;
  borderHover: string;
  btnGradient: string;
  glowColor: string;
  glowColorSecondary: string;
}

export const themes: Record<ThemeMode, ThemeConfig> = {
  amethyst: {
    id: "amethyst",
    name: "Royal Amethyst & Gold",
    tagline: "Velvet Obsidian & Champagne Gold",
    primary: "#a855f7",
    primaryHex: 0xa855f7,
    secondary: "#f59e0b",
    secondaryHex: 0xf59e0b,
    accent: "#c084fc",
    bgDark: "#07030e",
    bgDarkHex: 0x07030e,
    glassBg: "linear-gradient(135deg, rgba(26, 12, 40, 0.88) 0%, rgba(14, 5, 24, 0.82) 100%)",
    borderColor: "rgba(168, 85, 247, 0.38)",
    borderHover: "rgba(245, 158, 11, 0.8)",
    btnGradient: "linear-gradient(135deg, #a855f7 0%, #9333ea 50%, #f59e0b 100%)",
    glowColor: "rgba(168, 85, 247, 0.45)",
    glowColorSecondary: "rgba(245, 158, 11, 0.35)",
  },
  emerald: {
    id: "emerald",
    name: "Cyber Emerald & Mint",
    tagline: "Neon Matrix & Deep Obsidian",
    primary: "#00ff9d",
    primaryHex: 0x00ff9d,
    secondary: "#00f0ff",
    secondaryHex: 0x00f0ff,
    accent: "#6ee7b7",
    bgDark: "#020806",
    bgDarkHex: 0x020806,
    glassBg: "linear-gradient(135deg, rgba(6, 26, 18, 0.88) 0%, rgba(3, 14, 10, 0.82) 100%)",
    borderColor: "rgba(0, 255, 157, 0.38)",
    borderHover: "rgba(0, 240, 255, 0.8)",
    btnGradient: "linear-gradient(135deg, #00ff9d 0%, #10b981 50%, #00f0ff 100%)",
    glowColor: "rgba(0, 255, 157, 0.45)",
    glowColorSecondary: "rgba(0, 240, 255, 0.35)",
  },
  crimson: {
    id: "crimson",
    name: "Sunset Crimson & Amber",
    tagline: "Volcanic Noir & Molten Fire",
    primary: "#ff1744",
    primaryHex: 0xff1744,
    secondary: "#ff9100",
    secondaryHex: 0xff9100,
    accent: "#ff4d6d",
    bgDark: "#060205",
    bgDarkHex: 0x060205,
    glassBg: "linear-gradient(135deg, rgba(28, 8, 16, 0.88) 0%, rgba(16, 4, 10, 0.82) 100%)",
    borderColor: "rgba(255, 23, 68, 0.38)",
    borderHover: "rgba(255, 145, 0, 0.8)",
    btnGradient: "linear-gradient(135deg, #ff1744 0%, #ff5252 50%, #ff9100 100%)",
    glowColor: "rgba(255, 23, 68, 0.45)",
    glowColorSecondary: "rgba(255, 145, 0, 0.35)",
  },
};

interface ThemeContextType {
  theme: ThemeConfig;
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: themes.amethyst,
  mode: "amethyst",
  setMode: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>("amethyst");

  const currentTheme = themes[mode] || themes.amethyst;

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--theme-primary", currentTheme.primary);
    root.style.setProperty("--theme-secondary", currentTheme.secondary);
    root.style.setProperty("--theme-accent", currentTheme.accent);
    root.style.setProperty("--theme-bg", currentTheme.bgDark);
    root.style.setProperty("--theme-glass", currentTheme.glassBg);
    root.style.setProperty("--theme-border", currentTheme.borderColor);
    root.style.setProperty("--theme-border-hover", currentTheme.borderHover);
    root.style.setProperty("--theme-glow", currentTheme.glowColor);
    root.style.setProperty("--theme-glow-sec", currentTheme.glowColorSecondary);
    document.body.style.backgroundColor = currentTheme.bgDark;
  }, [currentTheme]);

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, mode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
