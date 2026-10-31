/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        space: {
          950: '#05070B',
          900: '#090D15',
          850: '#0E1422',
          800: '#141D30',
          750: '#1A253E',
          700: '#233152',
          600: '#344773',
          500: '#4C66A4',
        },
        telemetry: {
          cyan: '#00E5FF',
          blue: '#0284C7',
          amber: '#F59E0B',
          emerald: '#10B981',
          rose: '#F43F5E',
          crimson: '#EF4444',
          slate: '#64748B',
        }
      },
      fontFamily: {
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace'],
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
      }
    },
  },
  plugins: [],
}

