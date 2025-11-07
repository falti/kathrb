// vite.config.js
import { defineConfig } from 'vite';
import { resolve } from 'path';
import { sync as globSync } from 'glob';

export default defineConfig({
  root: 'src',
  base: '/kathrb/',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: (() => {
        const inputs = { main: resolve(__dirname, 'src/index.html') };
        const presPaths = globSync('src/presentations/*/index.html');
        presPaths.forEach(p => {
          const name = p.match(/presentations\/([^\/]+)/)?.[1];
          if (name) inputs[name] = resolve(__dirname, p);
        });
        return inputs;
      })(),
    },
  },
  assetsInclude: ['**/*.md', '**/*.svg', '**/*.png', '**/*.jpg', '**/*.json'],
  server: { open: true },
});