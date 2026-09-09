import { createContext, ReactNode, useContext, useState } from "react";

export type ThemeMode = "light" | "dark";

export type AppColors = {
  background: string;
  card: string;
  text: string;
  subtext: string;
  border: string;
  accent: string; // primary deep teal
  accentText: string; // text/icons drawn on top of `accent`
  accentSoft: string; // soft teal, for tags/chips/subtle backgrounds
  sage: string;
  sand: string; // used sparingly, for premium highlights
  success: string;
  danger: string;
  dangerSoft: string;
  muted: string;
};

const lightColors: AppColors = {
  background: "#F8FAF7",
  card: "#FFFFFF",
  text: "#243333",
  subtext: "#718080",
  border: "#E3EAE7",
  accent: "#176B6B",
  accentText: "#FFFFFF",
  accentSoft: "#D9F0EE",
  sage: "#8FAF9A",
  sand: "#D8B98A",
  success: "#3E8E5A",
  danger: "#C0392B",
  dangerSoft: "#FBE7E4",
  muted: "#A9B6B2",
};

const darkColors: AppColors = {
  background: "#000000",
  card: "#1C1C1E",
  text: "#F2F2F2",
  subtext: "#A3A3A3",
  border: "#2C2C2E",
  accent: "#3FBFAF",
  accentText: "#04201D",
  accentSoft: "#123330",
  sage: "#5F7A6C",
  sand: "#C9A876",
  success: "#3ECF72",
  danger: "#FF6B5E",
  dangerSoft: "#3A1F1C",
  muted: "#7A7A7A",
};

// A small, reusable design system — kept independent of light/dark mode.
export const radius = {
  sm: 10,
  md: 14,
  lg: 20,
  pill: 999,
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 28,
};

type ThemeContextValue = {
  mode: ThemeMode;
  colors: AppColors;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function AppThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>("light");

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const colors = mode === "dark" ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ mode, colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useAppTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useAppTheme must be used within AppThemeProvider");
  }
  return context;
}
