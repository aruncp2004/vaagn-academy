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

  if (toggle) {
    const navLinks = document.getElementById('navLinks');
    if (navLinks) navLinks.classList.toggle('open');
    return;
  }

  if (dropdownParent && window.innerWidth <= 1024) {
    dropdownParent.classList.toggle('mobile-open');
    return;
  }
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

// Active link
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.navbar-links > li > a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || href === './' + currentPage) {
    link.classList.add('active');
  }
});
