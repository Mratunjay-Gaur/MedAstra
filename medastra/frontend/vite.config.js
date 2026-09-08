import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

const realDir = fs.realpathSync(__dirname);

export default defineConfig({
  plugins: [react()],
  root: realDir,
  cacheDir: path.resolve(realDir, 'node_modules/.vite'),
  resolve: {
    preserveSymlinks: false
  },
  server: {
    port: 5173,
    fs: {
      allow: [realDir, path.resolve(realDir, '..')]
    }
  }
});
