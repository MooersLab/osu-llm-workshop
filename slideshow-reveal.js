// Reveal.js initialization for slideshow

Reveal.initialize({
  hash: true,
  slideNumber: 'c/t',
  progress: true,
  center: false,
  width: 1200,
  height: 700,
  margin: 0.04,
  minScale: 0.2,
  maxScale: 2.0,
  transition: 'slide',
  transitionSpeed: 'default',
  backgroundTransition: 'fade',
  viewDistance: 3,
  mobileViewDistance: 2,
  
  // Plugins
  plugins: [ RevealMarkdown ],
  
  // Markdown options
  markdown: {
    smartypants: true,
    breaks: true
  },
  
  // Keyboard shortcuts
  keyboard: {
    13: 'next',      // Enter
    32: 'next',      // Space
    37: 'prev',      // Left arrow
    39: 'next',      // Right arrow
    36: 'first',     // Home
    35: 'last',      // End
    80: 'prev',      // P
    78: 'next'       // N
  }
});

// Add two-column layout support
Reveal.on('ready', function(event) {
  // Process any custom two-column layouts in markdown slides
  const slides = document.querySelectorAll('.slides section');
  slides.forEach(slide => {
    // If slide has a .two-col element, apply grid layout
    const twoCol = slide.querySelector('.two-col');
    if (twoCol) {
      slide.style.display = 'grid';
      slide.style.gridTemplateColumns = '1fr 1fr';
      slide.style.gap = '2em';
      slide.style.alignItems = 'start';
    }
  });
});

// Handle resize for images
Reveal.on('slidechanged', function(event) {
  // Ensure images don't overflow
  const images = event.currentSlide.querySelectorAll('img');
  images.forEach(img => {
    img.style.maxWidth = '90%';
    img.style.maxHeight = '60vh';
  });
});

// Print to PDF support
if (window.location.search.match(/print-pdf/gi)) {
  Reveal.configure({
    margin: 0,
    minScale: 1,
    maxScale: 1
  });
}