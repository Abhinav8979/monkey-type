/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bgColor: "var(--bgColor)",
        textPrimary: "var(--textPrimary)",
        textSecondary: "var(--textSecondary)",
        bgCursorColor: "var(--bgCursor)",
        textCorrectColor: "var(--textCorrectColor)",
        textIncorrectColor: "var(--textIncorrectColor)",
        bgButton: "var(--bgButton)",
      },
      animation: {
        blink: "blink 0.5s infinite",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};
