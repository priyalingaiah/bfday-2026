import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // GitHub Pages serves the site at https://priyalingaiah.github.io/bfday-2026/
  base: '/bfday-2026/',
});
