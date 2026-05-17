/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* ── Primary navy blue ── */
        primary: {
          DEFAULT: '#004674',
          light: '#005e9a',
          dark: '#001d35',
          container: '#005e9a',
          fixed: '#d0e4ff',
        },
        'on-primary': '#ffffff',
        'primary-container': '#cce5ff',
        'on-primary-container': '#001d36',
        'primary-fixed': '#d0e4ff',

        /* ── Secondary orange ── */
        secondary: {
          DEFAULT: '#9f4200',
          container: '#fe8949',
          fixed: '#ffdcbe',
        },
        /* flat aliases so bg-secondary-container / text-secondary-container work */
        'secondary-container': '#fe8949',
        'on-secondary': '#ffffff',
        'on-secondary-container': '#2d1600',
        'secondary-fixed': '#ffdcbe',

        /* ── Tertiary red ── */
        tertiary: {
          DEFAULT: '#8c000f',
          container: '#b4151d',
          fixed: '#ffdad6',
        },
        'tertiary-container': '#b4151d',
        'on-tertiary': '#ffffff',
        'on-tertiary-container': '#410002',
        'tertiary-fixed': '#ffdad6',

        /* ── Background & surface system ── */
        background: '#fdf8f8',
        'on-background': '#1c1b1b',

        /* surface.DEFAULT lets `bg-surface` work; the nested keys
           let `bg-surface-container` etc. work via Tailwind's dot notation */
        surface: {
          DEFAULT: '#fdf8f8',
          low: '#f6f3f2',
          container: '#f0edec',
          lowest: '#ffffff',
          high: '#ece7e7',
        },

        /* Flat aliases for the hyphenated class names used in JSX */
        'surface-lowest': '#ffffff',
        'surface-container': '#f0edec',
        'surface-container-low': '#f6f3f2',
        'surface-container-high': '#e4e1e0',
        'on-surface': '#1c1b1b',
        'on-surface-variant': '#4d4543',

        /* ── Outline ── */
        outline: {
          DEFAULT: '#717881',
          variant: '#c1c7d1',
        },
        /* Flat alias so bg-outline-variant / border-outline-variant work */
        'outline-variant': '#c1c7d1',

        /* ── Misc ── */
        navy: '#001d35',
        error: '#ba1a1a',
        'on-error': '#ffffff',
      },

      fontFamily: {
        body: ['Manrope', 'sans-serif'],
        sans: ['Manrope', 'sans-serif'],
        manrope: ['Manrope', 'sans-serif'],
      },

      maxWidth: {
        clinic: '1280px',
      },

      borderRadius: {
        '4xl': '2rem',
        '5xl': '3rem',
      },

      boxShadow: {
        glow: '0 0 40px rgba(0, 70, 116, 0.15)',
        'glow-orange': '0 0 40px rgba(254, 137, 73, 0.25)',
        card: '0 4px 32px rgba(0,0,0,0.08)',
        'card-hover': '0 16px 48px rgba(0,0,0,0.14)',
      },

      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out infinite 2s',
        'pulse-ring': 'pulse-ring 2s ease-out infinite',
        scan: 'scan 3s ease-in-out infinite',
        'vision-wave': 'visionWave 15s ease infinite',
        shimmer: 'shimmer 2.5s linear infinite',
      },

      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.8)', opacity: '1' },
          '100%': { transform: 'scale(2.2)', opacity: '0' },
        },
        scan: {
          '0%, 100%': { transform: 'translateY(-10%)', opacity: '0.3' },
          '50%': { transform: 'translateY(110%)', opacity: '1' },
        },
        visionWave: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },

      backgroundSize: {
        400: '400% 400%',
      },
    },
  },
  plugins: [],
};