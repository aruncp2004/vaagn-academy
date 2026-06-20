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
  loadComponent('navbar-placeholder', './components/nav.html'),
  loadComponent('footer-placeholder', './components/footer.html'),
  loadComponent('popup-placeholder', './components/popup.html'),
  loadComponent('sticky-bar-placeholder', './components/sticky-bar.html'),
]);