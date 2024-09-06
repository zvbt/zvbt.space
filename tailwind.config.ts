import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        NanumGothic: ['NanumGothic', 'sans-serif'],
        iosevka: ['Iosevka', 'regular'],
        iosevkamono: ['IosevkaNerdFontMono', 'monospace']
      },
      colors: {
        'custom-blue': '#0972D6',
        'custom-red': '#ed3434',
        'custom-green': '#4FAE0F',
        'custom-yellow': '#edd934',
      }
    },
  },
  plugins: [],
};
export default config;
