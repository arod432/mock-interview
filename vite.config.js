import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  resolve: {
    alias: {
      '@interview-app': fileURLToPath(new URL(
        mode === 'solution' ? './interviewer/App.solution.jsx' : './src/App.jsx',
        import.meta.url,
      )),
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.js'],
    include: ['tests/**/*.test.jsx'],
  },
}));
