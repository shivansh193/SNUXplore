import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        // Montserrat Fonts
        "montserrat-black": ['var(--font-montserrat-black)'],
        "montserrat-black-italic": ['var(--font-montserrat-black-italic)'],
        "montserrat-bold": ['var(--font-montserrat-bold)'],
        "montserrat-bold-italic": ['var(--font-montserrat-bold-italic)'],
        "montserrat-extrabold": ['var(--font-montserrat-extrabold)'],
        "montserrat-extrabold-italic": ['var(--font-montserrat-extrabold-italic)'],
        "montserrat-extralight": ['var(--font-montserrat-extralight)'],
        "montserrat-extralight-italic": ['var(--font-montserrat-extralight-italic)'],
        "montserrat-italic": ['var(--font-montserrat-italic)'],
        "montserrat-light": ['var(--font-montserrat-light)'],
        "montserrat-light-italic": ['var(--font-montserrat-light-italic)'],
        "montserrat-medium": ['var(--font-montserrat-medium)'],
        "montserrat-medium-italic": ['var(--font-montserrat-medium-italic)'],
        "montserrat-regular": ['var(--font-montserrat-regular)'],
        "montserrat-semibold": ['var(--font-montserrat-semibold)'],
        "montserrat-semibold-italic": ['var(--font-montserrat-semibold-italic)'],
        "montserrat-thin": ['var(--font-montserrat-thin)'],
        "montserrat-thin-italic": ['var(--font-montserrat-thin-italic)'],
        // Nohemi Fonts
        "nohemi-black": ['var(--font-nohemi-black)'],
        "nohemi-bold": ['var(--font-nohemi-bold)'],
        "nohemi-extrabold": ['var(--font-nohemi-extrabold)'],
        "nohemi-extralight": ['var(--font-nohemi-extralight)'],
        "nohemi-light": ['var(--font-nohemi-light)'],
        "nohemi-medium": ['var(--font-nohemi-medium)'],
        "nohemi-regular": ['var(--font-nohemi-regular)'],
        "nohemi-semibold": ['var(--font-nohemi-semibold)'],
        "nohemi-thin": ['var(--font-nohemi-thin)']
      },
      colors: {
        'snuxplore-brown':'#231F20',
        'snuxplore-yellow':'#F0BD1A',
        'snuxplore-black':'#1E1E1E',
        'snuxplore-gray':'#686868',
        'snuxplore-footer-black': '#0F0F0F',
        'snuxplore-footer-g1': '#E37537',
        'snuxplore-footer-g2': '#F0BD1A',
        'snuxplore-member-frame': '#303030',
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
