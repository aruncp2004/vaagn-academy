// ══════════════════════════════════════
// VIEM — Admissions Form Handler
// ══════════════════════════════════════

const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_SCRIPT_URL'; // Replace with your Apps Script URL
const WHATSAPP_NUMBER   = '91XXXXXXXXXX';            // Replace with actual number

function serializeForm(form) {
  const data = {};
  new FormData(form).forEach((val, key) => { data[key] = val; });
  return data;
}

function showMsg(form, type, text) {
  const msg = form.querySelector('.adm-form-msg');
  if (!msg) return;
  msg.textContent = text;
  msg.className = 'adm-form-msg ' + type;
}

function resetBtn(btn, original) {
  btn.disabled = false;
  btn.textContent = original;
}

async function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const btn  = form.querySelector('.adm-submit-btn');
  const orig = btn ? btn.textContent : '';

  // Validate
  const required = form.querySelectorAll('[required]');
  let valid = true;
  required.forEach(el => {
    el.style.borderColor = '';
    if (!el.value.trim()) { el.style.borderColor = '#DC2626'; valid = false; }
  });
  if (!valid) { showMsg(form, 'error', 'Please fill in all required fields.'); return; }

  // Phone validation
  const phone = form.querySelector('[name="phone"]');
  if (phone && !/^[6-9]\d{9}$/.test(phone.value.trim())) {
    phone.style.borderColor = '#DC2626';
    showMsg(form, 'error', 'Please enter a valid 10-digit Indian mobile number.');
    return;
  }

  if (btn) { btn.disabled = true; btn.textContent = 'Sending...'; }

  const data = serializeForm(form);
  data.timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  data.source    = window.location.href;

  // 1. Google Sheets
  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  } catch (err) {
    console.warn('Sheets submission error:', err);
  }

  // 2. WhatsApp notification
  const msg = encodeURIComponent(
    `*New VIEM Admission Enquiry*\n` +
    `Name: ${data.name}\n` +
    `Phone: +91 ${data.phone}\n` +
    `Email: ${data.email}\n` +
    `Course: ${data.course}\n` +
    `Mode: ${data.mode}\n` +
    `Batch: ${data.batch || 'Not selected'}\n` +
    `Qualification: ${data.qualification}`
  );
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');

  // 3. Success
  showMsg(form, 'success', '✓ Thank you! Our team will call you within 2 hours.');
  form.reset();
  if (btn) resetBtn(btn, orig);

  // 4. Redirect to thank you after 2s
  setTimeout(() => { window.location.href = 'thank-you.html'; }, 2000);
}

// Attach to all admission forms on the page
document.querySelectorAll('.adm-form').forEach(form => {
  form.addEventListener('submit', handleSubmit);
});