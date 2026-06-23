// ══════════════════════════════════════
// VIEM — Admissions Form Handler
// ══════════════════════════════════════

// Batch option visual selection fallback (for browsers without :has() support)
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.adm-batch-opt input[type=radio]').forEach(radio => {
    radio.addEventListener('change', () => {
      document.querySelectorAll('.adm-batch-opt').forEach(opt => {
        opt.classList.remove('selected');
        const dot = opt.querySelector('.adm-radio-dot');
        if (dot) dot.style.borderColor = '';
      });
      const label = radio.closest('.adm-batch-opt');
      if (label) {
        label.classList.add('selected');
        const dot = label.querySelector('.adm-radio-dot');
        if (dot) dot.style.borderColor = '#1B3A6B';
      }
    });
  });
});

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

  // Validate required fields
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
    showMsg(form, 'error', 'Please enter a valid 10-digit mobile number.');
    return;
  }

  if (btn) { btn.disabled = true; btn.textContent = 'Processing...'; }

  const data = serializeForm(form);
  data.timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  data.source    = window.location.href;

  // Send to Google Sheets
  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  } catch (err) {
    console.warn('Sheets error:', err);
  }

  // WhatsApp notification to admission team
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

  // Success — Razorpay will be added here later
  showMsg(form, 'success', '✓ Application received! Our team will contact you shortly with payment details.');
  form.reset();
  if (btn) resetBtn(btn, orig);

  // Redirect to thank you
  setTimeout(() => { window.location.href = 'thank-you.html'; }, 2000);
}

// Attach to all admission forms on the page
document.querySelectorAll('.adm-form').forEach(form => {
  form.addEventListener('submit', handleSubmit);
});