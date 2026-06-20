// Typing animation
const words = [
  'Electric Mobility.',
  'Battery Technology.',
  'EV Powertrain.',
  'The Future of EVs.',
  'Clean Energy.'
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingEl = document.getElementById('typing-text');

function type() {
  if (!typingEl) return;

  const currentWord = words[wordIndex];

  if (isDeleting) {
    typingEl.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingEl.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === currentWord.length) {
    setTimeout(() => { isDeleting = true; }, 1800);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
  }

  const speed = isDeleting ? 60 : 100;
  setTimeout(type, speed);
}

document.addEventListener('DOMContentLoaded', () => {
  if (typingEl) setTimeout(type, 500);
});