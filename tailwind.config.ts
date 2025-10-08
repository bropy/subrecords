import type { Config } from 'tailwindcss'

import { heroui } from '@heroui/react'

// tailwind config
const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './src/*.html', './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: { sm: '768px', md: '1024px', lg: '1360px' },
    extend: {
      colors: {
        // Dark dark blue theme (replacing black)
        'dark-blue': '#0a0e27',
        'dark-blue-light': '#1a1f3a',
        'dark-blue-lighter': '#2a2f4a',
        'dark-blue-gray': '#3a3f5a',
        
        // Netflix-inspired dark theme
        'netflix-black': '#0a0e27',
        'netflix-dark': '#1a1f3a',
        'netflix-gray': '#2a2f4a',
        'netflix-light-gray': '#3a3f5a',
        'netflix-white': '#ffffff',
        'netflix-text': '#e5e5e5',
        'netflix-text-secondary': '#b3b3b3',
        
        // Pinterest-inspired accent colors
        'pinterest-red': '#e60023',
        'pinterest-red-dark': '#ad081b',
        'pinterest-blue': '#0073e6',
        'pinterest-blue-dark': '#005bb5',
        
        // Extended red color palette
        'red-50': '#fef2f2',
        'red-100': '#fee2e2',
        'red-200': '#fecaca',
        'red-300': '#fca5a5',
        'red-400': '#f87171',
        'red-500': '#ef4444',
        'red-600': '#dc2626',
        'red-700': '#b91c1c',
        'red-800': '#991b1b',
        'red-900': '#7f1d1d',
        'red-950': '#450a0a',
        
        // Beige color palette
        'beige-50': '#fdfcfb',
        'beige-100': '#f9f7f4',
        'beige-200': '#f3f0ea',
        'beige-300': '#ebe6db',
        'beige-400': '#e1d9c8',
        'beige-500': '#d4c7b0',
        'beige-600': '#c4b299',
        'beige-700': '#b19d82',
        'beige-800': '#9a856c',
        'beige-900': '#7d6b57',
        'beige-950': '#4a3d32',
        
        // High contrast colors for buttons
        'accent-primary': '#e60023',
        'accent-secondary': '#0073e6',
        'accent-success': '#00a651',
        'accent-warning': '#ff6900',
        
        // Red highlight for CTAs and important elements
        'highlight-red': '#ff0000',
        'highlight-red-dark': '#cc0000',
        'highlight-red-light': '#ff3333',
        'highlight-red-pale': '#ff6666',
        'highlight-red-deep': '#990000',
        
        // Neutral grays
        'neutral-50': '#fafafa',
        'neutral-100': '#f5f5f5',
        'neutral-200': '#e5e5e5',
        'neutral-300': '#d4d4d4',
        'neutral-400': '#a3a3a3',
        'neutral-500': '#737373',
        'neutral-600': '#525252',
        'neutral-700': '#404040',
        'neutral-800': '#262626',
        'neutral-900': '#171717',
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
