
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF9ECD', // 핑크
          light: '#FFBEE1',
          dark: '#F07EAF',
        },
        secondary: {
          DEFAULT: '#B4A7FF', // 라벤더
          light: '#D0C7FF',
        },
        accent: {
          DEFAULT: '#A7E7FF', // 민트
        },
        warm: {
          DEFAULT: '#FFD4A3', // 피치
        },
        background: {
          DEFAULT: '#FFFBF5', // 크림
        },
        surface: {
          DEFAULT: '#FFFFFF',
        },
        text: {
          DEFAULT: '#2D2D2D', // 다크 그레이
          muted: '#8E8E8E',
        }
      },
      fontFamily: {
        sans: ['Pretendard', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(0, 0, 0, 0.05)',
        'card': '0 8px 30px rgba(0, 0, 0, 0.04)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      }
    },
  },
  plugins: [],
}
