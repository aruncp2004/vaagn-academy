function isSubfolderPage() {
  return window.location.pathname.includes('/courses/');
}

function rewriteComponentLinks(container, isSubfolder) {
  if (!container || !isSubfolder) return;

  container.querySelectorAll('a[href]').forEach((link) => {
    const href = link.getAttribute('href');

    if (!href || href.startsWith('#') || /^(?:[a-z]+:|\/\/)/i.test(href)) {
      return;
    }

    const [path, hash] = href.split('#');

    if (!path) return;

    let rewrittenPath = path;

    if (path.startsWith('courses/')) {
      rewrittenPath = path.slice('courses/'.length);
    } else if (!path.startsWith('../')) {
      rewrittenPath = `../${path}`;
    }

    link.setAttribute('href', hash ? `${rewrittenPath}#${hash}` : rewrittenPath);
  });

  container.querySelectorAll('img[src]').forEach((img) => {
    const src = img.getAttribute('src');
    // Skip absolute, protocol-relative, and root-relative paths
    if (!src || /^(?:[a-z]+:|\/\/|\/)/i.test(src)) return;
    if (!src.startsWith('../')) img.setAttribute('src', `../${src}`);
  });
}

async function loadComponent(id, file, isSubfolder) {
  const el = document.getElementById(id);
  if (!el) return;

  try {
    const response = await fetch(file);
    if (!response.ok) {
      throw new Error(`Failed to load ${file}: ${response.status}`);
    }

    const html = await response.text();
    el.innerHTML = html;

    rewriteComponentLinks(el, isSubfolder);
  } catch (error) {
    console.error(`Error loading ${file}:`, error);
  }
}

const isSubfolder = isSubfolderPage();
const componentBase = isSubfolder ? '../components/' : 'components/';

Promise.all([
  loadComponent('navbar-placeholder', `${componentBase}nav.html`, isSubfolder),
  loadComponent('footer-placeholder', `${componentBase}footer.html`, isSubfolder),
  loadComponent('sticky-bar-placeholder', `${componentBase}sticky-bar.html`, isSubfolder),
]);

// Load popup HTML then inject popup.js so the script always runs after the overlay exists.
loadComponent('popup-placeholder', `${componentBase}popup.html`, isSubfolder).then(() => {
  const s = document.createElement('script');
  s.src = (isSubfolder ? '../' : '') + 'js/popup.js';
  document.body.appendChild(s);
});
