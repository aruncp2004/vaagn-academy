const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbykyEt4PWG3wSIEm6VwvDXPBHyD5ouyyRW5dxkAcbJhgKRAvr8cdh66ujySBls6fyqq5A/exec';

let popupInterval = null;

function openPopup() {
  if (sessionStorage.getItem('viem_popup_submitted')) return;
  const overlay = document.getElementById('popupOverlay');
  if (overlay && !overlay.classList.contains('open')) {
    overlay.classList.add('open');
  }
}

function startPopupCycle() {
  if (sessionStorage.getItem('viem_popup_submitted')) return;
  // Show after 8 seconds first time
  setTimeout(() => {
    openPopup();
    // Then repeat every 30 seconds if not submitted
    popupInterval = setInterval(() => {
      if (sessionStorage.getItem('viem_popup_submitted')) {
        clearInterval(popupInterval);
        return;
      }
      openPopup();
    }, 30000);
  }, 8000);
}

// Works whether loaded statically (before DOMContentLoaded) or dynamically (after).
function onReady(fn) {
  if (document.readyState !== 'loading') fn();
  else document.addEventListener('DOMContentLoaded', fn);
}

onReady(() => {
  startPopupCycle();

  // Exit intent — mouse leaves top of window
  document.addEventListener('mouseleave', function(e) {
    if (e.clientY <= 0) openPopup();
  }, { once: true });

  // Scroll 50% down page
  window.addEventListener('scroll', function onScroll() {
    const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    if (scrollPercent >= 50) {
      openPopup();
      window.removeEventListener('scroll', onScroll);
    }
  });

  // ── Floating "Get Free Counselling" button ──────────────────
  const btn = document.createElement('button');
  btn.id = 'counsellingFloatBtn';
  btn.textContent = 'Get Free Counselling';
  btn.setAttribute('aria-label', 'Open free counselling form');
  btn.style.cssText = [
    'position:fixed',
    'bottom:24px',
    'left:24px',
    'z-index:1000',
    'background:#1B3A6B',
    'color:#fff',
    'border:none',
    'border-radius:30px',
    'padding:12px 20px',
    'font-size:13px',
    'font-weight:600',
    'cursor:pointer',
    'box-shadow:0 4px 16px rgba(0,0,0,0.25)',
    'font-family:inherit',
  ].join(';');
  btn.addEventListener('click', openPopup);
  document.body.appendChild(btn);
});

// ── Close popup ───────────────────────────────────────────────
document.addEventListener('click', (e) => {
  const overlay = document.getElementById('popupOverlay');
  if (!overlay) return;
  if (e.target.id === 'popupClose' || e.target.id === 'popupOverlay') {
    overlay.classList.remove('open');
  }
});

// ── Close thank you state ─────────────────────────────────────
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

// ── Handle popup form submit ──────────────────────────────────
document.addEventListener('submit', async (e) => {
  if (e.target.id !== 'popupForm') return;
  e.preventDefault();

  const form  = e.target;
  const name  = form.querySelector('[name=name]')?.value || '';
  const phone = form.querySelector('[name=phone]')?.value || '';

  if (!name.trim() || !phone.trim()) return;

  const data = {
    type:      'enquiry',
    name,
    phone,
    source:    'Popup Form',
    timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
  };

  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  } catch(err) { console.warn(err); }

  sessionStorage.setItem('viem_popup_submitted', '1');
  clearInterval(popupInterval);

  const formEl = document.getElementById('popupForm');
  const tyEl   = document.getElementById('popupThankyou');
  if (formEl) formEl.style.display = 'none';
  if (tyEl)   tyEl.style.display   = 'flex';
});
