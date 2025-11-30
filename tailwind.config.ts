import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0066cc",
          dark: "#0052a3",
          light: "#3385d6",
        },
        secondary: "#00a8e8",
        accent: "#00d4ff",
        background: "#ffffff",
        foreground: "#0a0a0a",
        muted: {
          DEFAULT: "#f5f5f5",
          foreground: "#737373",
        },
        border: "#e5e5e5",
        input: "#e5e5e5",
        ring: "#0066cc",
        success: "#10b981",
        warning: "#f59e0b",
        error: "#ef4444",
        info: "#3b82f6",
      },
      fontFamily: {
        sans: [
          "var(--font-vazirmatn)",
          "Vazirmatn",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      borderRadius: {
        sm: "0.25rem",
        md: "0.5rem",
        lg: "0.75rem",
        xl: "1rem",
      },
    },
  },
  plugins: [],
};

export default config;

