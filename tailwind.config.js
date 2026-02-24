/**
 * Semantic design tokens: base, baseInverse, brand, info, negative, positive, warning.
 * Nav is a separate group for navbar (primary, input, divider, link, linkHover, linkActive).
 * All groups reference CSS variables from src/lib/styles/globals.css.
 *
 * Usage:
 * - base: page/content (bg-base-primary, text-base-primary, border-base-default).
 * - baseInverse: inverted base (e.g. dark strip on light page).
 * - brand: teal accent (CTAs, links, focus rings).
 * - info / negative / positive / warning: semantic states (alerts, badges, forms).
 * - nav: navbar only (bg-nav-primary, text-nav-link, border-nav-primary).
 */
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./src/app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        base: {
          primary: "var(--bg-base-primary)",
          secondary: "var(--bg-base-secondary)",
          tertiary: "var(--bg-base-tertiary)",
        },
        baseInverse: {
          primary: "var(--bg-baseInverse-primary)",
          secondary: "var(--bg-baseInverse-secondary)",
          tertiary: "var(--bg-baseInverse-tertiary)",
        },
        brand: {
          primary: "var(--bg-brand-primary)",
          secondary: "var(--bg-brand-secondary)",
          tertiary: "var(--bg-brand-tertiary)",
        },
        info: {
          primary: "var(--bg-info-primary)",
          secondary: "var(--bg-info-secondary)",
          tertiary: "var(--bg-info-tertiary)",
        },
        negative: {
          primary: "var(--bg-negative-primary)",
          secondary: "var(--bg-negative-secondary)",
          tertiary: "var(--bg-negative-tertiary)",
        },
        positive: {
          primary: "var(--bg-positive-primary)",
          secondary: "var(--bg-positive-secondary)",
          tertiary: "var(--bg-positive-tertiary)",
        },
        warning: {
          primary: "var(--bg-warning-primary)",
          secondary: "var(--bg-warning-secondary)",
          tertiary: "var(--bg-warning-tertiary)",
        },
        nav: {
          primary: "var(--navbar-bg)",
          input: "var(--navbar-input-bg)",
          divider: "var(--navbar-divider)",
        },
        /* Legacy aliases (used by components until migrated) */
        background: "var(--background)",
        secondary: "var(--secondary)",
        muted: "var(--muted)",
        primary: "var(--primary)",
      },
      borderColor: {
        base: {
          default: "var(--border-base-default)",
          subtle: "var(--border-base-subtle)",
          accent: "var(--border-base-accent)",
        },
        baseInverse: {
          default: "var(--border-baseInverse-default)",
          subtle: "var(--border-baseInverse-subtle)",
          accent: "var(--border-baseInverse-accent)",
        },
        brand: {
          subtle: "var(--border-brand-subtle)",
          accent: "var(--border-brand-accent)",
        },
        info: {
          subtle: "var(--border-info-subtle)",
          accent: "var(--border-info-accent)",
        },
        negative: {
          subtle: "var(--border-negative-subtle)",
          accent: "var(--border-negative-accent)",
        },
        positive: {
          subtle: "var(--border-positive-subtle)",
          accent: "var(--border-positive-accent)",
        },
        warning: {
          subtle: "var(--border-warning-subtle)",
          accent: "var(--border-warning-accent)",
        },
        nav: {
          primary: "var(--navbar-border)",
          input: "var(--navbar-input-border)",
          divider: "var(--navbar-divider)",
          "link-active": "var(--nav-link-active-border)",
        },
        /* Legacy */
        border: "var(--border)",
        primary: "var(--border-primary)",
      },
      ringColor: {
        base: {
          default: "var(--ring)",
          subtle: "var(--ring-secondary)",
        },
        brand: {
          accent: "var(--border-brand-accent)",
        },
        info: { accent: "var(--border-info-accent)" },
        negative: { accent: "var(--border-negative-accent)" },
        positive: { accent: "var(--border-positive-accent)" },
        warning: { accent: "var(--border-warning-accent)" },
        primary: "var(--ring)",
      },
      ringOffsetColor: {
        base: { primary: "var(--bg-base-primary)" },
        baseInverse: { primary: "var(--bg-baseInverse-primary)" },
        brand: { primary: "var(--bg-brand-primary)" },
        info: { primary: "var(--bg-info-primary)" },
        negative: { primary: "var(--bg-negative-primary)" },
        positive: { primary: "var(--bg-positive-primary)" },
        warning: { primary: "var(--bg-warning-primary)" },
        nav: { primary: "var(--navbar-bg)" },
      },
      textColor: {
        base: {
          primary: "var(--text-base-primary)",
          secondary: "var(--text-base-secondary)",
          tertiary: "var(--text-base-tertiary)",
          onColor: "var(--text-base-onColor)",
        },
        baseInverse: {
          primary: "var(--text-baseInverse-primary)",
          secondary: "var(--text-baseInverse-secondary)",
          tertiary: "var(--text-baseInverse-tertiary)",
          onColor: "var(--text-baseInverse-onColor)",
        },
        brand: {
          primary: "var(--text-brand-primary)",
          secondary: "var(--text-brand-secondary)",
          tertiary: "var(--text-brand-tertiary)",
        },
        info: {
          primary: "var(--text-info-primary)",
          secondary: "var(--text-info-secondary)",
          tertiary: "var(--text-info-tertiary)",
        },
        negative: {
          primary: "var(--text-negative-primary)",
          secondary: "var(--text-negative-secondary)",
          tertiary: "var(--text-negative-tertiary)",
        },
        positive: {
          primary: "var(--text-positive-primary)",
          secondary: "var(--text-positive-secondary)",
          tertiary: "var(--text-positive-tertiary)",
        },
        warning: {
          primary: "var(--text-warning-primary)",
          secondary: "var(--text-warning-secondary)",
          tertiary: "var(--text-warning-tertiary)",
        },
        nav: {
          link: "var(--nav-link-color)",
          "link-hover": "var(--nav-link-hover)",
        },
        /* Legacy */
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        "muted-foreground": "var(--muted-foreground)",
        "primary-foreground": "var(--primary-foreground)",
        "secondary-foreground": "var(--secondary-foreground)",
      },
      placeholderColor: {
        base: {
          primary: "var(--muted-foreground)",
          secondary: "var(--text-base-tertiary)",
        },
        info: {
          primary: "var(--text-info-secondary)",
        },
        negative: { primary: "var(--text-negative-secondary)" },
        positive: { primary: "var(--text-positive-secondary)" },
        warning: { primary: "var(--text-warning-secondary)" },
        "muted-foreground": "var(--muted-foreground)",
      },
      boxShadow: {
        nav: "var(--navbar-shadow)",
      },
      height: {
        nav: "var(--navbar-height)",
      },
      spacing: {
        /**
         * Spacing scale is aligned to CSS variables in src/lib/styles/globals.css
         * so that utilities like gap-2, space-x-2, p-2, m-2, etc. all resolve
         * to the same tokenized values.
         */
        0: "var(--space-0)",
        1: "var(--space-1)",
        2: "var(--space-2)",
        3: "var(--space-3)",
        4: "var(--space-4)",
        5: "var(--space-5)",
        6: "var(--space-6)",
        7: "var(--space-7)",
        8: "var(--space-8)",
        9: "var(--space-9)",
        10: "var(--space-10)",
        11: "var(--space-11)",
        12: "var(--space-12)",
        13: "var(--space-13)",
        14: "var(--space-14)",
        15: "var(--space-15)",
        16: "var(--space-16)",
        17: "var(--space-17)",
        18: "var(--space-18)",
        19: "var(--space-19)",
        20: "var(--space-20)",
        21: "var(--space-21)",
        22: "var(--space-22)",
        23: "var(--space-23)",
        24: "var(--space-24)",
        nav: "var(--navbar-height)",
      },
      /* Teal brand scale (convenience) */
      colors: {
        accent: {
          DEFAULT: "var(--teal-500)",
          hover: "var(--teal-600)",
          light: "var(--teal-400)",
        },
      },
    },
  },
  plugins: [],
};
