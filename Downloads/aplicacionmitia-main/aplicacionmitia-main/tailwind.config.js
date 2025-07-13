/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        "primary": "#3B82F6",
        "primaryHover": "#2563EB",
        "primaryLight": "#93C5FD",
        "primaryDark": "#1D4ED8",
        "secondary": "#10B981",
        "secondaryHover": "#059669",
        "secondaryLight": "#6EE7B7",
        "accent": "#F59E0B",
        "accentHover": "#D97706",
        "accentLight": "#FCD34D",
        "background": "#0F172A",
        "backgroundSecondary": "#1E293B",
        "surface": "#334155",
        "card": "#475569",
        "overlay": "#64748B80",
        "text": "#F8FAFC",
        "textSecondary": "#E2E8F0",
        "textMuted": "#94A3B8",
        "textInverse": "#0F172A",
        "success": "#10B981",
        "successLight": "#6EE7B7",
        "successDark": "#047857",
        "warning": "#F59E0B",
        "warningLight": "#FCD34D",
        "warningDark": "#B45309",
        "error": "#EF4444",
        "errorLight": "#FCA5A5",
        "errorDark": "#B91C1C",
        "info": "#3B82F6",
        "infoLight": "#93C5FD",
        "infoDark": "#1D4ED8",
        "muted": "#6B7280",
        "border": "#374151",
        "borderLight": "#4B5563",
        "focus": "#8B5CF6",
        "disabled": "#9CA3AF",
        "shadow": "#00000040",
        "gradientStart": "#3B82F6",
        "gradientEnd": "#8B5CF6"
      },
      backgroundImage: theme => ({
        'gradient-primary': `linear-gradient(135deg, ${theme('colors.gradientStart')} 0%, ${theme('colors.gradientEnd')} 100%)`,
        'gradient-secondary': `linear-gradient(45deg, ${theme('colors.secondary')} 0%, ${theme('colors.accent')} 100%)`,
        'gradient-surface': `linear-gradient(180deg, ${theme('colors.surface')} 0%, ${theme('colors.card')} 100%)`
      }),
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'spin-slow': 'spin 3s linear infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'bounce-slow': 'bounce 2s infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate'
      },
      keyframes: {
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0px)'
          },
          '50%': {
            transform: 'translateY(-20px)'
          }
        },
        glow: {
          '0%': {
            boxShadow: '0 0 5px rgba(59, 130, 246, 0.5)'
          },
          '100%': {
            boxShadow: '0 0 20px rgba(59, 130, 246, 0.8), 0 0 30px rgba(59, 130, 246, 0.6)'
          }
        }
      }
    },
  },
  plugins: [],
};
