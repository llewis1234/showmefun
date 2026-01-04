import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        soft: "0 10px 25px -15px rgba(0,0,0,0.35)",
      },
    },
  },
  plugins: [],
} satisfies Config;
