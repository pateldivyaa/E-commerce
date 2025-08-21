/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FBF8E6',
          100: '#F7F1CD',
          200: '#EFE3A8',
          300: '#E7D582',
          400: '#DFC75D',
          500: '#D4AF37', // Main primary color
          600: '#AC8C2C',
          700: '#816921',
          800: '#574616',
          900: '#2C230B',
        },
        secondary: {
          50: '#E6E8ED',
          100: '#CDD1DB',
          200: '#9AA3B7',
          300: '#687593',
          400: '#35476F',
          500: '#0A1128', // Main secondary color
          600: '#080E20',
          700: '#060A18',
          800: '#040710',
          900: '#020308',
        },
        accent: {
          50: '#F9E6E9',
          100: '#F3CCD3',
          200: '#E799A6',
          300: '#DB667A',
          400: '#CF334D',
          500: '#800020', // Main accent color
          600: '#66001A',
          700: '#4D0014',
          800: '#33000E',
          900: '#1A0007',
        },
        success: {
          500: '#10B981',
        },
        warning: {
          500: '#F59E0B',
        },
        error: {
          500: '#EF4444',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        'serif': ['Playfair Display', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif']
      },
      boxShadow: {
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        'medium': '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.03)',
        'card': '0 4px 8px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-down': 'slideDown 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}