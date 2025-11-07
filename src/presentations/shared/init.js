// src/presentations/bibel/init.js
import 'reveal.js/dist/reveal.css';
import 'reveal.js/dist/theme/moon.css';
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

  // Try Markdown first
  let mdResponse = await fetch('slides.md');
  if (mdResponse.ok) {
    const markdown = await mdResponse.text();
    deck.innerHTML = `<div class="slides"><section data-markdown data-separator="^---$" data-separator-vertical="^--$" data-notes="^note:">${markdown}</section></div>`;
  } else {
    // Fallback to JSON + images
    const data = await fetch('slides.json').then(r => r.json());
    data.slides.forEach(s => {
      const section = document.createElement('section');
      const img = document.createElement('img');
      img.src = s.img;
      img.style.cssText = 'max-height:100vh; width:auto; margin:0 auto; background:none; border:none;';
      section.appendChild(img);
      if (s.note) {
        const notes = document.createElement('aside');
        notes.className = 'notes';
        notes.innerHTML = s.note.replace(/\n/g, '<br>');
        section.appendChild(notes);
      }
      deck.appendChild(section);
    });
  }

  Reveal.initialize({
    hash: true,
    controls: true,
    progress: true,
    center: true,
    embedded: !standalone,
    width: 1280,
    height: 720,
    margin: 0.1,
    markdown: { smartypants: true },
    plugins: [RevealMarkdown, Verticator, standalone ? RevealNotes : null].filter(Boolean)
  });
};

loadSlides().catch(console.error);