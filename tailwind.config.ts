import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          teal: '#31AAA9',
          'teal-light': '#5DE2E0',
          'teal-dark': '#1F7E7D',
          champagne: '#F8E0A4',
          'champagne-light': '#FFF9EA',
          'champagne-dark': '#D6B563',
          crimson: '#A82020',
          'crimson-light': '#D83434',
          'crimson-dark': '#831616',
          burgundy: '#6C1A1A',
          'burgundy-dark': '#2E0A0A',
          dark: '#140505',
        },
        border: 'hsl(var(--border))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'brand-gradient': 'linear-gradient(135deg, #31AAA9 0%, #1F7E7D 100%)',
        'brand-accent-gradient': 'linear-gradient(135deg, #A82020 0%, #6C1A1A 100%)',
        'brand-gold-gradient': 'linear-gradient(135deg, #FFF9EA 0%, #F8E0A4 50%, #D6B563 100%)',
      },
      boxShadow: {
        'teal-glow': '0 8px 30px rgba(49, 170, 169, 0.25)',
        'crimson-glow': '0 8px 30px rgba(168, 32, 32, 0.25)',
        'champagne-glow': '0 8px 30px rgba(248, 224, 164, 0.3)',
      },
    },
  },
  plugins: [],
}
export default config
