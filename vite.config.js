import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

export default defineConfig({
  root: fileURLToPath(new URL('./src/', import.meta.url)),
  publicDir: false,
  build: {
    outDir: fileURLToPath(new URL('./dist/', import.meta.url)),
    emptyOutDir: true,
  },
  server: {
    proxy: {
      '/health': 'http://127.0.0.1:4567',
    },
  },
});
