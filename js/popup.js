// Show popup after 8 seconds
setTimeout(() => {
  const overlay = document.getElementById('popupOverlay');
  if (overlay) overlay.classList.add('open');
}, 8000);

// Close on button click or overlay click
document.addEventListener('click', (e) => {
  const overlay = document.getElementById('popupOverlay');
  if (!overlay) return;
  if (e.target.id === 'popupClose' || e.target.id === 'popupOverlay') {
    overlay.classList.remove('open');
  }
});

// Handle popup form submit
document.addEventListener('submit', (e) => {
  if (e.target.id === 'popupForm') {
    e.preventDefault();
    const overlay = document.getElementById('popupOverlay');
    if (overlay) overlay.classList.remove('open');
    window.location.href = '/VaagnAcademy/thank-you.html';
  }
});
