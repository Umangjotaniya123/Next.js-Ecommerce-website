import { heroui } from "@heroui/react";
import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary-color)",
        secondary: "var(--secondary-color)",
        text: "var(--text-color)",
        background: "var(--bg-color)",
        borderColor: "var(--border-color)"
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
} satisfies Config;
