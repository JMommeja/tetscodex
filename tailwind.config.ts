import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        surface: '#111827',
        panel: '#1f2937',
        accent: '#f59e0b'
      }
    }
  },
  plugins: []
};

export default config;
