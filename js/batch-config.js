// ══════════════════════════════════════
// VIEM Batch Configuration
// Update this file only when batch dates change
// ══════════════════════════════════════

const VIEM_BATCH = {
  startDate:   'July 13, 2026',
  endDate:     'August 15, 2026',
  displayDate: 'July 13 – Aug 15, 2026',
  batchA:      '4:30 PM – 6:30 PM',
  batchB:      '8:30 PM – 10:30 PM',
  duration:    '34 Days (25 Lessons + 5 Practicals)',
  year:        '2026'
};

// Auto-inject into all elements with data-batch attribute
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('[data-batch="date"]').forEach(el => el.textContent = VIEM_BATCH.displayDate);
  document.querySelectorAll('[data-batch="start"]').forEach(el => el.textContent = VIEM_BATCH.startDate);
  document.querySelectorAll('[data-batch="end"]').forEach(el => el.textContent = VIEM_BATCH.endDate);
  document.querySelectorAll('[data-batch="batchA"]').forEach(el => el.textContent = VIEM_BATCH.batchA);
  document.querySelectorAll('[data-batch="batchB"]').forEach(el => el.textContent = VIEM_BATCH.batchB);
  document.querySelectorAll('[data-batch="duration"]').forEach(el => el.textContent = VIEM_BATCH.duration);
});
