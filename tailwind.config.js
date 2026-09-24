/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
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
      animation: {
        'gradient-x': 'gradient-x 3s ease infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
      },
    },
  },
  plugins: [],
}
