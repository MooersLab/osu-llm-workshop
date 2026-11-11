// Slideshow JavaScript - Landscape Layout

const slides = document.querySelectorAll('.slide');
const slideCounter = document.getElementById('slide-counter');
const progressFill = document.getElementById('progress-fill');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

let currentSlide = 0;
const totalSlides = slides.length;

function updateSlide() {
  slides.forEach((slide, index) => {
    slide.classList.toggle('active', index === currentSlide);
  });
  
  slideCounter.textContent = `${currentSlide + 1} / ${totalSlides}`;
  progressFill.style.width = `${((currentSlide + 1) / totalSlides) * 100}%`;
  
  prevBtn.disabled = currentSlide === 0;
  nextBtn.disabled = currentSlide === totalSlides - 1;
}

function nextSlide() {
  if (currentSlide < totalSlides - 1) {
    currentSlide++;
    updateSlide();
  }
}

function prevSlide() {
  if (currentSlide > 0) {
    currentSlide--;
    updateSlide();
  }
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  // Don't interfere with typing in inputs
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
  
  if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
    e.preventDefault();
    nextSlide();
  } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
    e.preventDefault();
    prevSlide();
  } else if (e.key === 'Home') {
    e.preventDefault();
    currentSlide = 0;
    updateSlide();
  } else if (e.key === 'End') {
    e.preventDefault();
    currentSlide = totalSlides - 1;
    updateSlide();
  }
});

// Touch/swipe support
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

document.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
}, { passive: true });

function handleSwipe() {
  const swipeThreshold = 50;
  const diff = touchStartX - touchEndX;
  
  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      nextSlide(); // swipe left = next
    } else {
      prevSlide(); // swipe right = previous
    }
  }
}

// Initialize
updateSlide();

// Preload images for smoother transitions
document.querySelectorAll('.slide-image img').forEach(img => {
  const preload = new Image();
  preload.src = img.src;
});