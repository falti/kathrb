// vite.config.js
import { defineConfig } from 'vite';
import { resolve } from 'path';
import glob from 'glob';

export default defineConfig({
  root: 'src',
  base: '/kathrb/',          // ← THIS IS THE MAGIC LINE
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: () => {
        const inputs = { main: resolve(__dirname, 'src/index.html') };
        glob.sync('src/presentations/*/index.html').forEach(p => {
          const name = p.match(/presentations\/([^\/]+)/)?.[1];
          if (name) inputs[name] = p;
        });
        return inputs;
      },
    },
  },
  assetsInclude: ['**/*.md', '**/*.svg', '**/*.png', '**/*.json'],
  server: { open: true },
});