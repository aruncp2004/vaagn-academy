async function loadComponent(id, file) {
  const el = document.getElementById(id);
  if (!el) return;
  try {
    const response = await fetch(file);
    const html = await response.text();
    el.innerHTML = html;
  } catch (error) {
    console.error(`Error loading ${file}:`, error);
  }
}

// Load all components
Promise.all([
  loadComponent('navbar-placeholder', '/academy/components/nav.html'),
  loadComponent('footer-placeholder', '/academy/components/footer.html'),
  loadComponent('popup-placeholder', '/academy/components/popup.html'),
  loadComponent('sticky-bar-placeholder', '/academy/components/sticky-bar.html'),
]);
