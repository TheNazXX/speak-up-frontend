import type { Config } from 'tailwindcss';

const config: Config = {
  mode: 'jit',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {},
      spacing: {
        0.5: '0.12rem',
        layout: '1rem',
        'big-layout': '2.3rem',
        'small-layout': '1rem',
      },
      fontSize: {
        xs: '0.9rem',
        sm: '1.07rem',
        base: '1.18rem',
        lg: '1.24rem',
        xl: '1.38rem',
        '1.5xl': '1.5rem',
        '2xl': '1.82rem',
        '3xl': '2.22rem',
        '4xl': '2.66rem',
        '5xl': '3.56rem',
        '6xl': '4.44rem',
        '7xl': '5.33rem',
        '8xl': '7.1rem',
        '9xl': '9.5rem',
      },
      transitionDuration: {
        DEFAULT: '266ms',
      },

      boxShadow: {
        '3xl': '14px 17px 40px 4px',
        inset: 'inset 0px 18px 22px',
        darkinset: '0px 4px 4px inset',
      },
      animation: {
        'scale-pulse': 'scale-pulse 1.4s ease-in-out infinite',
      },
      keyframes: {
        'scale-pulse': {
          '0%, 100%': { transform: 'scale(0.3)', opacity: '0.2' },
          '50%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      animationDelay: {
        '200': '200ms',
        '400': '400ms',
      },
    },

    colors: {
      black: '#0e0f0f',
      gray: '#7e7e7e',
      grayLight: '#c3bebe',

      primary: '#272832',
      primaryLight: '#32333e',

      backgroundPrimary: '#141515',

      blue: {
        50: '#eff6ff',
        100: '#dbeafe',
        200: '#bfdbfe',
        300: '#93c5fd',
        400: '#60a5fa',
        500: '#3b82f6',
        600: '#2152ff',
        700: '#1d4ed8',
        800: '#344e86',
        900: '#00007d',
      },
      green: {
        50: '#05cd991a',
        100: '#dcfce7',
        200: '#bbf7d0',
        300: '#86efac',
        400: '#4ade80',
        500: '#22c55e',
        600: '#17ad37',
        700: '#15803d',
        800: '#166534',
        900: '#14532d',
      },
      red: {
        50: '#ee5d501a',
        100: '#fee2e2',
        200: '#fecaca',
        300: '#fca5a5',
        400: '#f87171',
        500: '#f53939',
        600: '#ea0606',
        700: '#b91c1c',
        800: '#991b1b',
        900: '#7f1d1d',
      },
      background: {
        100: 'rgb(244 247 254)',
        900: '#070f2e',
      },
      shadow: {
        100: 'var(--shadow-100)',
        500: 'rgba(112, 144, 176, 0.08)',
      },
    },
  },
  plugins: [],
};
export default config;
