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
        },
        // Text tokens
        'text-primary': '#001845',
        'neutral-subtle': '#4E576A',
        // Gold / secondary CTA palette
        gold: {
          DEFAULT: '#FFD000',
          subtle: '#FFC425',
          dark: '#C49A00',
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
        'neutral-subtlest': '#F4F4F6',
        'border-light': '#E2E8F0',
      },
      fontFamily: {
        headline: ['"DM Serif Text"', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'eyebrow': ['14px', { lineHeight: '1.5', letterSpacing: '0.08em', fontWeight: '500' }],
        'eyebrow-lg': ['18px', { lineHeight: '1.5', letterSpacing: '0.06em', fontWeight: '500' }],
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
