function setLanguage(lang, el) {
  document.querySelectorAll('[data-en]').forEach((element) => {
    const value = element.getAttribute('data-' + lang);
    if (value !== null) element.innerHTML = value;
  });

  document.querySelectorAll('.lang').forEach((item) => item.classList.remove('active'));
  document.querySelectorAll(`.lang[data-lang="${lang}"]`).forEach((item) => item.classList.add('active'));

  document.documentElement.lang = lang;
  localStorage.setItem('siteLanguage', lang);
}

function applySavedLanguage() {
  const savedLang = localStorage.getItem('siteLanguage') || 'en';
  setLanguage(savedLang);
}

/* SERVICES SLIDER */
let currentSlide = 0;

function moveSlider(direction) {
  const slider = document.getElementById('servicesSlider');
  const slides = document.querySelectorAll('.service-slide');
  if (!slider || slides.length === 0) return;

  const isMobile = window.innerWidth <= 1000;
  const visibleSlides = isMobile ? 1 : 2;
  const maxIndex = Math.max(0, slides.length - visibleSlides);

  currentSlide += direction;
  if (currentSlide < 0) currentSlide = 0;
  if (currentSlide > maxIndex) currentSlide = maxIndex;

  const slideWidth = slides[0].offsetWidth;
  const gap = parseInt(window.getComputedStyle(slider).gap) || 24;
  slider.style.transform = `translateX(-${currentSlide * (slideWidth + gap)}px)`;
}

window.addEventListener('resize', () => {
  currentSlide = 0;
  const slider = document.getElementById('servicesSlider');
  if (slider) slider.style.transform = 'translateX(0)';
});

/* PROJECT CARD IMAGE SLIDERS */
const projectIndexes = {};

function moveProjectGallery(button, direction) {
  const card = button.closest('.project-card');
  if (!card) return;

  const track = card.querySelector('.project-track');
  const slides = card.querySelectorAll('.project-image');
  const counter = card.querySelector('.project-counter');
  const id = card.getAttribute('data-project-id');
  if (!track || slides.length === 0 || !id) return;

  projectIndexes[id] = projectIndexes[id] || 0;
  projectIndexes[id] += direction;

  if (projectIndexes[id] < 0) projectIndexes[id] = slides.length - 1;
  if (projectIndexes[id] >= slides.length) projectIndexes[id] = 0;

  track.style.transform = `translateX(-${projectIndexes[id] * 100}%)`;
  if (counter) counter.textContent = `${projectIndexes[id] + 1} / ${slides.length}`;
}

document.addEventListener('DOMContentLoaded', () => {
  applySavedLanguage();
});
