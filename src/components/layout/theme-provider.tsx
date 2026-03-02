"use client";

import { setCookies } from "@/helpers";
import { createContext, type ReactNode, useContext, useState } from "react";

export type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

type ThemeProviderProps = {
  children: ReactNode;
  themeIn?: Theme;
};

export function ThemeProvider({
  children,
  themeIn = "light",
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(themeIn);

  const toggleTheme = () => {
    //get and set for the app
    const nextTheme = theme === "light" ? "dark" : "light";
    setThemeState(nextTheme);

    //get and set for the html element
    const root = document.documentElement;
    root.setAttribute("data-theme", nextTheme);

    // set for the cookies
    setCookies({ STORAGE_KEY: "theme", value: nextTheme });
  };

  const value: ThemeContextValue = { theme, toggleTheme };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}