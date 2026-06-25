const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_SCRIPT_URL';

// Show popup after 5 seconds
setTimeout(() => {
  const overlay = document.getElementById('popupOverlay');
  if (overlay) overlay.classList.add('open');
}, 5000);

// Close on button or overlay click
document.addEventListener('click', (e) => {
  const overlay = document.getElementById('popupOverlay');
  if (!overlay) return;
  if (e.target.id === 'popupClose' || e.target.id === 'popupOverlay') {
    overlay.classList.remove('open');
  }
});

// Close button on thank you state
document.addEventListener('click', (e) => {
  if (e.target.id === 'popupTyClose') {
    const overlay = document.getElementById('popupOverlay');
    if (overlay) overlay.classList.remove('open');
    const formEl = document.getElementById('popupForm');
    const tyEl   = document.getElementById('popupThankyou');
    if (formEl) { formEl.reset(); formEl.style.display = 'block'; }
    if (tyEl)   tyEl.style.display = 'none';
  }
});

// Handle popup form submit
document.addEventListener('submit', async (e) => {
  if (e.target.id !== 'popupForm') return;
  e.preventDefault();

  const form  = e.target;
  const name  = form.querySelector('[name=name]')?.value || '';
  const phone = form.querySelector('[name=phone]')?.value || '';

  if (!name.trim() || !phone.trim()) return;

  const data = {
    name,
    phone,
    source:    'Popup Form',
    timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
  };

  // Send to Google Sheets only
  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  } catch(err) { console.warn(err); }

  // Show thank you inside popup
  const formEl = document.getElementById('popupForm');
  const tyEl   = document.getElementById('popupThankyou');
  if (formEl) formEl.style.display = 'none';
  if (tyEl)   tyEl.style.display   = 'flex';
});
