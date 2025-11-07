const mdFiles = import.meta.glob('./presentations/**/*.md');
window.__vite_mdFiles = mdFiles;


import 'reveal.js/dist/reveal.css';
import 'reveal.js/dist/theme/league.css';
import '../shared/custom.css';
import 'reveal.js-verticator/plugin/verticator/verticator.css';

import Reveal from 'reveal.js';
import RevealMarkdown from 'reveal.js/plugin/markdown/markdown.esm.js';
import RevealNotes from 'reveal.js/plugin/notes/notes.esm.js';
import Verticator from 'reveal.js-verticator';

const params = new URLSearchParams(location.search);
const standalone = params.has('standalone');

const loadSlides = async () => {
  const deck = document.getElementById('deck');
  deck.innerHTML = `<div class="slides"><section data-markdown="slides.md" data-separator="^---$" data-separator-vertical="^--$" data-notes="^note:"></section></div>`;

  Reveal.initialize({
    hash: true,
    controls: true,
    progress: true,
    center: true,
    embedded: !standalone,
    width: 960,
    height: 700,

    // Factor of the display size that should remain empty around
    // the content
    margin: 0.04,

    // Bounds for smallest/largest possible scale to apply to content
    minScale: 0.2,
    maxScale: 2.0,

    margin: 0.1,
    markdown: { smartypants: true, html: true },
    plugins: [RevealMarkdown, Verticator, standalone ? RevealNotes : null].filter(Boolean)
  });
};

loadSlides().catch(console.error);

// Live-Reload für fetch-basierte Markdown-Dateien
if (import.meta.env.DEV) {
  let lastContent = null;
  const checkMd = async () => {
    try {
      const resp = await fetch('slides.md?_reload=' + Date.now());
      if (resp.ok) {
        const text = await resp.text();
        if (lastContent !== null && lastContent !== text) {
          location.reload();
        }
        lastContent = text;
      }
    } catch (e) {}
    setTimeout(checkMd, 1000);
  };
  checkMd();
}