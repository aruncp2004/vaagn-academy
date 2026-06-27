// Navbar scroll effect
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile menu toggle
document.addEventListener('click', (e) => {
  const toggle = e.target.closest('#mobileToggle');
  const dropdownParent = e.target.closest('.has-dropdown');
  const navbar = document.getElementById('navbar');

  if (toggle) {
    const navLinks = document.getElementById('navLinks');
    if (navLinks) navLinks.classList.toggle('open');
    return;
  }

  if (dropdownParent && window.innerWidth <= 1024) {
    // Prevent navigating away so the dropdown can open
    if (e.target.closest('a') === dropdownParent.querySelector(':scope > a')) {
      e.preventDefault();
    }
    dropdownParent.classList.toggle('mobile-open');
    return;
  }

  // Close mobile nav when clicking outside the navbar
  if (navbar && !navbar.contains(e.target)) {
    const navLinks = document.getElementById('navLinks');
    if (navLinks) navLinks.classList.remove('open');
  }

  // Close open dropdowns when clicking outside
  document.querySelectorAll('.has-dropdown.mobile-open').forEach(el => {
    if (!el.contains(e.target)) el.classList.remove('mobile-open');
  });
});

// Mega dropdown tabs
document.addEventListener('click', (e) => {
  const tab = e.target.closest('.mega-tab');
  if (!tab) return;

  const mega = tab.closest('.mega-dropdown');
  const tabName = tab.dataset.tab;

  mega.querySelectorAll('.mega-tab').forEach(t => t.classList.remove('active'));
  mega.querySelectorAll('.mega-content').forEach(c => c.classList.remove('active'));

  tab.classList.add('active');
  mega.querySelector(`[data-content='${tabName}']`).classList.add('active');
});

// Active link — runs after navbar component loads
function setActiveLink() {
  const currentPage = '/' + (window.location.pathname.split('/').pop() || 'index.html');
  document.querySelectorAll('.navbar-links > li > a').forEach(link => {
    const href = link.getAttribute('href') || '';
    link.classList.toggle('active', href === currentPage);
  });
}

// Try immediately (for cached nav) and again after 300ms (for async fetch)
setActiveLink();
setTimeout(setActiveLink, 300);
