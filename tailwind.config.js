/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "surface": "#0e150e",
        "surface-dim": "#0e150e",
        "surface-bright": "#333b33",
        "surface-container-lowest": "#091009",
        "surface-container-low": "#161d16",
        "surface-container": "#1a221a",
        "surface-container-high": "#242c24",
        "surface-container-highest": "#2f372e",
        "on-surface": "#dce5d9",
        "on-surface-variant": "#bccbb9",
        "inverse-surface": "#dce5d9",
        "inverse-on-surface": "#2a322a",
        "outline": "#869585",
        "outline-variant": "#3d4a3d",
        "surface-tint": "#4ae176",
        "primary": "#4be277",
        "on-primary": "#003915",
        "primary-container": "#22c55e",
        "on-primary-container": "#004b1e",
        "primary-fixed": "#6bff8f",
        "primary-fixed-dim": "#4ae176",
        "secondary": "#b5c4ff",
        "on-secondary": "#00287d",
        "secondary-container": "#153ea3",
        "on-secondary-container": "#9db2ff",
        "tertiary": "#bfc6e0",
        "on-tertiary": "#283044",
        "tertiary-container": "#a4abc4",
        "on-tertiary-container": "#383f54",
        "error": "#ffb4ab",
        "on-error": "#690005",
        "error-container": "#93000a",
        "on-error-container": "#ffdad6",
        "background": "#0e150e",
        "on-background": "#dce5d9",
        "surface-variant": "#2f372e",
        "navy": {
          950: "#090d16",
          900: "#0F172A",
          800: "#1E293B",
          700: "#334155",
          600: "#475569"
        },
        "signal": {
          green: "#22c55e",
          amber: "#f59e0b",
          red: "#ef4444",
          blue: "#3b82f6",
          purple: "#a855f7"
        }
      },
      fontFamily: {
        "mono": ["JetBrains Mono", "monospace"],
        "data-compact": ["JetBrains Mono", "monospace"],
        "data-primary": ["JetBrains Mono", "monospace"],
        "headline": ["Space Grotesk", "sans-serif"],
        "display": ["Space Grotesk", "sans-serif"],
        "sans": ["Space Grotesk", "system-ui", "sans-serif"]
      },
      spacing: {
        "unit": "4px",
        "gutter": "16px",
        "margin-edge": "24px",
        "stack-loose": "24px",
        "stack-compact": "8px"
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "none": "0px"
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "radar": "radar 4s linear infinite",
        "train-move": "trainMove 20s linear infinite"
      },
      keyframes: {
        radar: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" }
        }
      }
    },
  },
  plugins: [],
};
