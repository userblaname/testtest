/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        'xs': '0.75rem',    // 12px
        'sm': '0.8125rem',  // 13px
        'base': '0.875rem', // 14px
        'lg': '1rem',       // 16px
        'xl': '1.125rem',   // 18px
        '2xl': '1.25rem',   // 20px
        '3xl': '1.5rem',    // 24px
        '4xl': '1.875rem'   // 30px
      },
      colors: {
        tufti: {
          red: '#B82E27',       // Brightened burgundy for better contrast
          black: '#0A0A0F',     // Darker black for stronger contrast
          white: '#FFFFFF',     // Pure white for maximum contrast
          silver: '#E5E5E7',    // Lightened silver
          gold: '#D4B494',      // Brightened gold
          accent: '#B82E27',    // Matches brightened red
          muted: '#6A6A6F',     // Lightened muted tone
          filmstrip: '#2A2A2D', // Film strip color
          baroque: '#F0F0F0',   // Lightened neutral
          shadow: '#050507',    // Darker shadow
          surface: '#1A1A1F',   // Darkened surface
          highlight: '#F0D5C4', // Brightened highlight
          ambient: '#3A3A3F',   // Ambient background
        }
      },
      fontFamily: {
        baroque: ['Cinzel Decorative', 'serif'],
        modern: ['Inter', 'sans-serif']
      },
      backgroundImage: {
        'baroque-pattern': "url('data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 0c27.614 0 50 22.386 50 50s-22.386 50-50 50S0 77.614 0 50 22.386 0 50 0zm0 10c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40-17.909-40-40-40zm0 10c16.569 0 30 13.431 30 30 0 16.569-13.431 30-30 30-16.569 0-30-13.431-30-30 0-16.569 13.431-30 30-30z' fill='%23FFFFFF' fill-opacity='0.03' fill-rule='evenodd'/%3E%3C/svg%3E')",
      },
      boxShadow: {
        'baroque': '0 1px 3px rgba(0, 0, 0, 0.2)',
      },
      animation: {
        'baroque-float': 'baroqueFloat 6s ease-in-out infinite',
        'film-roll': 'filmRoll 120s linear infinite',
        'fade-in-out': 'fadeInOut 8s ease-in-out infinite'
      },
      keyframes: {
        baroqueFloat: {
          '0%, 100%': { transform: 'translateY(0) rotate(0)' },
          '50%': { transform: 'translateY(-5px) rotate(0.5deg)' }
        },
        filmRoll: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '200px 200px' }
        },
        fadeInOut: {
          '0%, 100%': { opacity: 0.03 },
          '50%': { opacity: 0.05 }
        }
      }
    },
  },
  plugins: [
    require("tailwindcss-animate")
  ],
}