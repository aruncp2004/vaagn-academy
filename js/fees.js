// ══════════════════════════════════════
// VIEM — Fees & EMI Page JS
// ══════════════════════════════════════

// ── 1. Early Bird Countdown Timer ─────
// Set your Early Bird deadline here
const EARLY_BIRD_DEADLINE = new Date('2026-07-10T23:59:59');

function updateCountdown() {
  const el = document.getElementById('earlybird-countdown');
  if (!el) return;

  const now  = new Date();
  const diff = EARLY_BIRD_DEADLINE - now;

  if (diff <= 0) {
    el.textContent = 'Offer has ended';
    el.style.color = '#9CA3AF';
    return;
  }

  const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  el.innerHTML =
    `<span class="cd-unit">${days}<small>d</small></span> : ` +
    `<span class="cd-unit">${String(hours).padStart(2,'0')}<small>h</small></span> : ` +
    `<span class="cd-unit">${String(minutes).padStart(2,'0')}<small>m</small></span> : ` +
    `<span class="cd-unit">${String(seconds).padStart(2,'0')}<small>s</small></span>`;
}

// Start countdown
updateCountdown();
setInterval(updateCountdown, 1000);

// ── 2. Price Calculator ───────────────
function initCalculator() {
  const modeSelect   = document.getElementById('calc-mode');
  const friendInput  = document.getElementById('calc-friends');
  const resultEl     = document.getElementById('calc-result');

  if (!modeSelect || !resultEl) return;

  const basePrices = {
    online:  9999,
    hybrid:  16999,
    offline: 24999,
  };

  const referralPrices = {
    online:  { 1: 9000,  3: 7000  },
    hybrid:  { 1: 16000, 3: 14000 },
    offline: { 1: 25000, 3: 25000 },
  };

  function calculate() {
    const mode    = modeSelect.value;
    const friends = parseInt(friendInput.value) || 0;
    const base    = basePrices[mode];

    let pricePerPerson = base;
    let totalPeople    = 1 + friends;
    let savingPerPerson = 0;
    let referralNote    = '';

    if (friends === 1 && referralPrices[mode][1]) {
      pricePerPerson  = referralPrices[mode][1];
      savingPerPerson = base - pricePerPerson;
      referralNote    = '1+1 referral price applied';
    } else if (friends >= 3 && referralPrices[mode][3]) {
      pricePerPerson  = referralPrices[mode][3];
      savingPerPerson = base - pricePerPerson;
      referralNote    = '1+1+1+1 group price applied';
      totalPeople     = 4;
    }

    const totalAmount = pricePerPerson * totalPeople;
    const totalSaving = savingPerPerson * totalPeople;

    resultEl.innerHTML = `
      <div class="calc-result-inner">
        <div class="calc-result-row">
          <span>Price per person</span>
          <span class="calc-price">₹${pricePerPerson.toLocaleString('en-IN')}</span>
        </div>
        <div class="calc-result-row">
          <span>Total people</span>
          <span>${totalPeople}</span>
        </div>
        <div class="calc-result-row calc-total">
          <span>Total amount</span>
          <span class="calc-price-total">₹${totalAmount.toLocaleString('en-IN')}</span>
        </div>
        ${savingPerPerson > 0 ? `
        <div class="calc-result-row calc-saving">
          <span>You save</span>
          <span class="calc-save-amt">₹${totalSaving.toLocaleString('en-IN')} total</span>
        </div>
        <div class="calc-referral-note">${referralNote}</div>
        ` : ''}
        <a href="admissions.html" class="calc-apply-btn">Apply Now →</a>
      </div>
    `;
  }

  modeSelect.addEventListener('change', calculate);
  friendInput.addEventListener('input', calculate);
  calculate(); // run on load
}

// ── 3. FAQ Accordion ──────────────────
function initFAQ() {
  document.querySelectorAll('.fees-faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item   = btn.closest('.fees-faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.fees-faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
}

// ── Init ──────────────────────────────
function initAll() {
  initCalculator();
  initFAQ();
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAll);
} else {
  initAll();
}

// ── 4. Friends Stepper ────────────────
document.addEventListener('DOMContentLoaded', () => {
  const minusBtn = document.getElementById('friends-minus');
  const plusBtn  = document.getElementById('friends-plus');
  const input    = document.getElementById('calc-friends');

  if (!minusBtn || !plusBtn || !input) return;

  minusBtn.addEventListener('click', () => {
    const val = parseInt(input.value) || 0;
    if (val > 0) {
      input.value = val - 1;
      input.dispatchEvent(new Event('input'));
    }
  });

  plusBtn.addEventListener('click', () => {
    const val = parseInt(input.value) || 0;
    if (val < 3) {
      input.value = val + 1;
      input.dispatchEvent(new Event('input'));
    }
  });
});