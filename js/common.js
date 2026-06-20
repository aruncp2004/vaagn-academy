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

// Active link
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.navbar-links > li > a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || href === './' + currentPage) {
    link.classList.add('active');
  }
});
