// vite.config.js
import { defineConfig } from 'vite';
import { resolve } from 'path';
import { sync as globSync } from 'glob';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  root: 'src',
  base: '/kathrb/',
  
  plugins: [
  viteStaticCopy({
    structured: true,
    targets: [
  { src: 'presentations/**/assets/**', dest: '.' },
  { src: 'presentations/**/*.md', dest: '.' },
  { src: 'presentations/**/*.json', dest: '.' }
    ]
  })
],
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
  // treat markdown and other static files in presentation folders as assets
  assetsInclude: ['**/*.svg', '**/*.png', '**/*.jpg', '**/*.json', '**/*.md'],
  server: { open: true },
});