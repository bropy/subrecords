import type { Config } from 'tailwindcss'

import { heroui } from '@heroui/react'

// tailwind config
const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './src/*.html', './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: { sm: '768px', md: '1024px', lg: '1360px' },
    extend: {
      colors: {
        'netflix-black': '#141414',
        'netflix-red': '#e50914',
        'netflix-dark-gray': '#181818',
        'netflix-light-gray': '#2f2f2f',
        'netflix-white': '#ffffff',
        'netflix-text-gray': '#b3b3b3',
      },
      backgroundImage: { 'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))' },
      keyframes: {
        'scrolling-banner': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(calc(-50% - var(--gap)/2))' },
        },
        'scrolling-banner-vertical': {
          from: { transform: 'translateY(0)' },
          to: { transform: 'translateY(calc(-50% - var(--gap)/2))' },
        },
        pulse: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.03)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: {
        'scrolling-banner': 'scrolling-banner var(--duration) linear infinite',
        'scrolling-banner-vertical': 'scrolling-banner-vertical var(--duration) linear infinite',
      },
    },
  },
  darkMode: 'class',
  plugins: [
    heroui({
      layout: {
        dividerWeight: '1px',
        disabledOpacity: 0.5,
        fontSize: {
          tiny: '0.75rem',
          small: '0.875rem',
          medium: '1rem',
          large: '1.125rem',
        },
        lineHeight: {
          tiny: '1rem',
          small: '1.25rem',
          medium: '1.5rem',
          large: '1.75rem',
        },
        radius: {
          small: '6px',
          medium: '10px',
          large: '12px',
        },
        borderWidth: {
          small: '1px',
          medium: '1px',
          large: '2px',
        },
      },
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: '#1f75db',
            },
          },
        },
      },
    }),
  ],
}

export default config
