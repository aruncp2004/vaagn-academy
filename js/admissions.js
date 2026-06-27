// ══════════════════════════════════════
// VIEM — Admissions Form Handler
// ══════════════════════════════════════

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbykyEt4PWG3wSIEm6VwvDXPBHyD5ouyyRW5dxkAcbJhgKRAvr8cdh66ujySBls6fyqq5A/exec';
const WHATSAPP_NUMBER   = '9384033287'; // Team WhatsApp for enrollment alerts

// ── Batch option visual selection ─────────────────────────────
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

  // ── URL param pre-fill ──────────────────────────────────────
  const params = new URLSearchParams(window.location.search);
  const course = params.get('course');
  const mode   = params.get('mode');
  if (course) {
    const el = document.getElementById('field-course');
    if (el) el.value = course;
  }
  if (mode) {
    const el = document.getElementById('field-mode');
    if (el) el.value = mode;
  }
  if (course || mode) {
    setTimeout(() => {
      const form = document.getElementById('enroll-form');
      if (form) form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 400);
  }
});

// ── Prefill helpers (pricing + batch buttons on same page) ────
function prefillMode(mode) {
  const el = document.getElementById('field-mode');
  if (el) el.value = mode;
}

function prefillBatch(batch) {
  const value = batch === 'A'
    ? 'Batch A — 4:30 PM to 6:30 PM'
    : 'Batch B — 8:30 PM to 10:30 PM';
  document.querySelectorAll('input[name="batch"]').forEach(r => {
    if (r.value === value) r.checked = true;
  });
}

// ── Save to Google Sheets ─────────────────────────────────────
async function saveToSheets(payload) {
  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    console.log('✅ Saved to Google Sheets');
  } catch (err) {
    console.warn('Sheets error:', err);
  }
}

// ── Send WhatsApp receipt to STUDENT ─────────────────────────
function sendStudentWhatsApp(data) {
  const studentNumber = '91' + data.phone.replace(/\D/g, '').slice(-10);
  const msg = encodeURIComponent(
    `*🎉 Payment Confirmed — VIEM*\n\n` +
    `Hi ${data.name},\n` +
    `Your enrollment is confirmed!\n\n` +
    `*Course:* ${data.courseName}\n` +
    `*Mode:* ${data.modeLabel}\n` +
    `*Batch:* ${data.batch}\n` +
    `*Amount Paid:* ₹${Number(data.amount).toLocaleString('en-IN')}\n` +
    `*Payment ID:* ${data.paymentId}\n\n` +
    `Our team will contact you shortly with batch joining details.\n\n` +
    `— Team VIEM, Vaagn Institute of Electric Mobility`
  );
  window.open(`https://wa.me/${studentNumber}?text=${msg}`, '_blank');
}

// ── Send WhatsApp alert to TEAM ───────────────────────────────
function sendTeamWhatsApp(data) {
  const msg = encodeURIComponent(
    `*🔔 New Enrollment — VIEM*\n\n` +
    `*Name:* ${data.name}\n` +
    `*Phone:* +91 ${data.phone}\n` +
    `*Email:* ${data.email}\n` +
    `*Course:* ${data.courseName}\n` +
    `*Mode:* ${data.modeLabel}\n` +
    `*Batch:* ${data.batch}\n` +
    `*Qualification:* ${data.qualification}\n` +
    `*Amount:* ₹${Number(data.amount).toLocaleString('en-IN')}\n` +
    `*Payment ID:* ${data.paymentId}\n` +
    `*Time:* ${data.timestamp}`
  );
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
}

// ── Called by razorpay.js on payment success ──────────────────
window.viemOnPaymentSuccess = async function(paymentId, formData, modeInfo) {
  const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  const data = {
    type:          'payment',
    name:          formData.name,
    email:         formData.email,
    phone:         formData.phone.replace('+91', '').trim(),
    qualification: formData.qualification,
    batch:         formData.batch,
    courseName:    modeInfo.courseName,
    modeLabel:     modeInfo.label,
    amount:        modeInfo.amount,
    paymentId:     paymentId,
    status:        'Paid',
    timestamp:     timestamp,
    source:        window.location.href
  };

  // 1. Save to Google Sheets
  await saveToSheets(data);

  // 2. WhatsApp receipt to student
  sendStudentWhatsApp(data);

  // 3. WhatsApp alert to team (slight delay)
  setTimeout(() => sendTeamWhatsApp(data), 1500);
};

// ── Form submit → validate → Razorpay ────────────────────────
document.querySelectorAll('.adm-form').forEach(form => {
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const name          = document.getElementById('field-name')?.value.trim();
    const email         = document.getElementById('field-email')?.value.trim();
    const phone         = document.getElementById('field-phone')?.value.trim();
    const qualification = document.getElementById('field-qualification')?.value;
    const course        = document.getElementById('field-course')?.value;
    const mode          = document.getElementById('field-mode')?.value;
    const batchRadio    = form.querySelector('input[name="batch"]:checked');
    const batch         = batchRadio ? batchRadio.value : '';

    // Validation
    if (!name) {
      viemShowMessage('payment-msg', 'error', 'Please enter your name.'); return;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      viemShowMessage('payment-msg', 'error', 'Please enter a valid email address.'); return;
    }
    if (!phone || !/^[6-9]\d{9}$/.test(phone)) {
      viemShowMessage('payment-msg', 'error', 'Please enter a valid 10-digit mobile number.'); return;
    }
    if (!qualification) {
      viemShowMessage('payment-msg', 'error', 'Please select your qualification.'); return;
    }
    if (!course) {
      viemShowMessage('payment-msg', 'error', 'Please select a course.'); return;
    }
    if (!mode) {
      viemShowMessage('payment-msg', 'error', 'Please select a mode of study.'); return;
    }
    if (!batch) {
      viemShowMessage('payment-msg', 'error', 'Please select a batch (A or B).'); return;
    }

    // Hide old message
    const msgEl = document.getElementById('payment-msg');
    if (msgEl) msgEl.style.display = 'none';

    // Open Razorpay
    viemPay({ name, email, phone: '+91' + phone, qualification, course, mode, batch });
  });
});