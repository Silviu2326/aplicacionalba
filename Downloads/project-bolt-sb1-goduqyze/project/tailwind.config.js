/**  Tailwind CSS Configuration
 *   Tema Frosted UI (glassmorphism) — Entrenadora Personal App
 *   ----------------------------------------------------------
 *   ▸ React 18 + Vite | Tailwind v3.4+
 *   ▸ Light & Dark mode por clase (`dark`)
 *   ▸ Plugins oficiales + utilidades personalizadas
 */

import plugin from 'tailwindcss/plugin';
import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  /* 1️⃣  Rutas a TODOS los archivos que generan clases */
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],

  /* 2️⃣  Modo oscuro manual para poder activar/desactivar el vidrio oscuro */
  darkMode: 'class',

  /* 3️⃣  Tema base + extensiones */
  theme: {
    /* Contenedor centrado con padding adaptativo */
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
      /** Limita el ancho máximo en desktop grande */
      screens: {
        '2xl': '1440px',
      },
    },

    /* Extiende el tema de Tailwind */
    extend: {
      /* 🎨  Paleta de colores */
      colors: {
        /* Marca principal */
        brand: {
          DEFAULT: '#5E3BEE',
          light: '#7A5CFF',
          lighter: '#A59BFF',
          dark: '#452ABD',
        },

        /* Cristal translúcido (light & dark) – se usa en bg-* */
        frosted: {
          light: 'rgba(255,255,255,0.08)',
          mid: 'rgba(255,255,255,0.16)',
          heavy: 'rgba(255,255,255,0.24)',
          darkLight: 'rgba(0,0,0,0.20)',
          darkMid: 'rgba(0,0,0,0.32)',
          darkHeavy: 'rgba(0,0,0,0.45)',
        },

        /* Grises neutros ajustados para UI */
        neutral: {
          50:  '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
      },

      /* Tipografías */
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        display: ['Poppins', ...defaultTheme.fontFamily.sans],
      },

      /* Sombras suaves, pensadas para vidrio */
      boxShadow: {
        frosted: '0 8px 32px rgba(0,0,0,0.12)',
        frostedLg: '0 12px 45px rgba(0,0,0,0.18)',
        'inset-sm': 'inset 0 1px 1px rgba(0,0,0,0.04)',
      },

      /* Backdrop blur granular */
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
      },

      /* Radios extra redondeados para tarjetas */
      borderRadius: {
        '4xl': '2rem',
      },

      /* Animaciones */
      keyframes: {
        'fade-in-up': {
          '0%':   { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'glass-pop': {
          '0%':   { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.4s ease-out both',
        'glass-pop': 'glass-pop 0.25s cubic-bezier(.22,1,.36,1) both',
      },

      /* Espaciados y tamaños adicionales */
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },

      /* Índices de apilado para overlays y sidebars */
      zIndex: {
        60: '60',
        70: '70',
        80: '80',
      },
    },
  },

  /* 4️⃣  Plugins */
  plugins: [
    /* Plugins oficiales de Tailwind */
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),

    /* Plugin propio: clases .glass y .glass-dark */
    plugin(({ addComponents, theme }) => {
      addComponents({
        '.glass': {
          backgroundColor: theme('colors.frosted.light'),
          backdropFilter: `blur(${theme('backdropBlur.md')})`,
          border: '1px solid rgba(255,255,255,0.18)',
          boxShadow: theme('boxShadow.frosted'),
          borderRadius: theme('borderRadius.2xl'),
        },
        '.glass-mid': {
          backgroundColor: theme('colors.frosted.mid'),
          backdropFilter: `blur(${theme('backdropBlur.md')})`,
          border: '1px solid rgba(255,255,255,0.24)',
          boxShadow: theme('boxShadow.frosted'),
          borderRadius: theme('borderRadius.2xl'),
        },
        '.glass-dark': {
          backgroundColor: theme('colors.frosted.darkMid'),
          backdropFilter: `blur(${theme('backdropBlur.md')})`,
          border: '1px solid rgba(255,255,255,0.06)',
          boxShadow: theme('boxShadow.frosted'),
          borderRadius: theme('borderRadius.2xl'),
        },
      });
    }),
  ],

  /* 5️⃣  Safelist – clases generadas dinámicamente (p. ej. via props) */
  safelist: [
    /* Transparencias (bg-white/10 ...) */
    {
      pattern: /bg-(white|black)\/(10|20|30|40|50|60|70|80|90)/,
    },
    /* Estados para botones brand */
    {
      pattern: /bg-brand(-(light|dark))?/,
      variants: ['hover', 'focus', 'active', 'disabled'],
    },
    /* Animaciones */
    'animate-fade-in-up',
    'animate-glass-pop',
  ],
};