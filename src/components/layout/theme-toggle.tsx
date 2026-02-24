import { useTheme } from "@/components/layout/ThemeProvider";
import { cn } from "@/lib/cn";
import React, { HTMLAttributes } from "react";

export type ThemeToggleData = {};
type ThemeToggleProps = HTMLAttributes<HTMLButtonElement> & ThemeToggleData;

/**
 * Theme toggle – left of logos. Uses CSS variables for colors.
 */
export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className,
  children,
  ...props
}) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        className,
        "flex h-10 w-10 shrink-0 items-center justify-center rounded-md",
        "text-nav-link hover:text-nav-link-hover",
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-nav-primary"
      )}
      aria-label={theme === "dark" ? "החלף למצב בהיר" : "החלף למצב כהה"}
      {...props}
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
};