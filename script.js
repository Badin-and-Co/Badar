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

document.addEventListener('DOMContentLoaded', () => {
  applySavedLanguage();

  const form = document.querySelector('.contact-form');
  const status = document.getElementById('formStatus');

  if (!form || !status) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const currentLang = localStorage.getItem('siteLanguage') || 'en';
    const submitButton = form.querySelector('button[type="submit"]');

    submitButton.disabled = true;
    submitButton.textContent = currentLang === 'es' ? 'Enviando...' : 'Sending...';

    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
          Accept: 'application/json'
        }
      });

      if (response.ok) {
        status.textContent =
          currentLang === 'es'
            ? 'Gracias por tu mensaje. Nos pondremos en contacto contigo dentro de 1 a 5 días hábiles.'
            : 'Thank you for your submission. We will be in contact within 1–5 business days.';

        status.classList.add('success');
        status.classList.remove('error');
        form.reset();
      } else {
        throw new Error('Form error');
      }
    } catch (error) {
      status.textContent =
        currentLang === 'es'
          ? 'Hubo un error. Por favor intenta de nuevo.'
          : 'There was an error. Please try again.';

      status.classList.add('error');
      status.classList.remove('success');
    }

    submitButton.disabled = false;
    submitButton.textContent = currentLang === 'es' ? 'Enviar Mensaje' : 'Send Message';
  });
});

function toggleInquiryForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  form.classList.toggle('hidden');
}
