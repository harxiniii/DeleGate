/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: '#04060A',
          900: '#070A0F',
          850: '#0B101B',
          800: '#0F172A',
          700: '#1E293B',
          600: '#334155',
        },
        delegate: {
          coral: '#FF7B72',
          coralHover: '#ff928a',
          emerald: '#10B981',
          emeraldHover: '#34d399',
          cyan: '#38BDF8',
          indigo: '#818CF8',
          amber: '#F59E0B',
          purple: '#A855F7',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-coral': 'glowCoral 2s ease-in-out infinite alternate',
        'glow-emerald': 'glowEmerald 2s ease-in-out infinite alternate',
        'radar': 'radar 4s linear infinite',
      },
      keyframes: {
        glowCoral: {
          '0%': { boxShadow: '0 0 15px rgba(255, 123, 114, 0.2)' },
          '100%': { boxShadow: '0 0 25px rgba(255, 123, 114, 0.6)' },
        },
        glowEmerald: {
          '0%': { boxShadow: '0 0 15px rgba(16, 185, 129, 0.2)' },
          '100%': { boxShadow: '0 0 25px rgba(16, 185, 129, 0.6)' },
        },
        radar: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        }
      }
    },
  },
  plugins: [],
}
