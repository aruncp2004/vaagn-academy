// ══════════════════════════════════════
// VIEM — Programs Page JS
// ══════════════════════════════════════

// ── Filter by Mode ────────────────────
function initFilter() {
  const filterBtns = document.querySelectorAll('.prog-filter');
  const cards      = document.querySelectorAll('.prog-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Show/hide cards
      cards.forEach(card => {
        const modes = card.dataset.modes || '';
        if (filter === 'all' || modes.includes(filter)) {
          card.classList.remove('hidden');
          card.style.animation = 'fadeIn 0.3s ease';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

// ── Init ──────────────────────────────
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initFilter);
} else {
  initFilter();
}