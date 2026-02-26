import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./setupTests.ts'],
    include: ['LoginPage/**/*.{test,spec}.{js,jsx,ts,tsx}'],
    css: false,
  },
  resolve: {
    dedupe: ['@testing-library/user-event'],
  },
});
