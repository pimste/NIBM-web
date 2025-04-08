/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      colors: {
        'primary': {
          DEFAULT: '#0B3B7F', // Dark blue from logo
          '50': '#E5F0FF',
          '100': '#CCE1FF',
          '200': '#99C2FF',
          '300': '#66A3FF',
          '400': '#3384FF',
          '500': '#0065FF',
          '600': '#0051CC',
          '700': '#003D99',
          '800': '#002966',
          '900': '#001433',
        },
        'secondary': {
          DEFAULT: '#FFA500', // Orange for contrast and CTA
          '50': '#FFF5E5',
          '100': '#FFEACC',
          '200': '#FFD699',
          '300': '#FFC166',
          '400': '#FFAD33',
          '500': '#FF9800',
          '600': '#CC7A00',
          '700': '#995B00',
          '800': '#663D00',
          '900': '#331E00',
        },
        'neutral': {
          DEFAULT: '#64748B', // Neutral blue-gray
          '50': '#F8FAFC',
          '100': '#F1F5F9',
          '200': '#E2E8F0',
          '300': '#CBD5E1',
          '400': '#94A3B8',
          '500': '#64748B',
          '600': '#475569',
          '700': '#334155',
          '800': '#1E293B',
          '900': '#0F172A',
          '950': '#020617',
        },
      },
      maxWidth: {
        '7xl': '80rem',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        display: ['var(--font-montserrat)', 'var(--font-inter)', 'ui-sans-serif', 'system-ui'],
      },
      backgroundImage: {
        'hero-pattern': "url('/images/cropped-Top-page2-potain6.png')",
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      },
    },
  },
  plugins: [],
}; 