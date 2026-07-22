/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary navy palette
        navy: {
          boldest: '#001233',
          bolder: '#001845',
          bold: '#002B5C',
          DEFAULT: '#012A74',
          subtle: '#023E7D',
          subtler: '#2B5496',
          bright: '#0466C8', // hover state for solid dark-blue buttons
        },
        // Text tokens
        'text-primary': '#1D2535',
        // Neutral / gray scale (Figma "gray (neutral)" swatch group)
        neutral: {
          boldest: '#0E121A',
          bolder: '#1D2535',
          bold: '#33415C',
          subtler: '#C4C9D4',
          white: '#FFFFFF',
        },
        'neutral-subtle': '#4E576A',
        'neutral-subtlest': '#F4F4F6',
        // Gold / secondary CTA palette
        gold: {
          DEFAULT: '#FFD000',
          subtle: '#FFC425',
          dark: '#FFEC99',
        },
        // Tan / tertiary accent
        tan: {
          DEFAULT: '#C5C19D',
          subtle: '#D9D7BF',
          subtlest: '#F7F7F2',
        },
        // Utility
        'light-blue': '#C2DDFF',
        'surface-subtle': '#EEF2FF',
        'border-light': '#E2E8F0',
      },
      fontFamily: {
        headline: ['"DM Serif Text"', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'eyebrow': ['14px', { lineHeight: '1.5', letterSpacing: '0.08em', fontWeight: '500' }],
        'eyebrow-lg': ['18px', { lineHeight: '1.5', letterSpacing: '0.06em', fontWeight: '500' }],
        '4xl': ['2.25rem', { lineHeight: '1.1' }],
      },
      maxWidth: {
        container: '1312px',
      },
      spacing: {
        'section': '64px',
        'section-lg': '80px',
      },
    },
  },
  plugins: [],
}
