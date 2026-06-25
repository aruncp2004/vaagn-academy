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
  loadComponent('popup-placeholder', `${componentBase}popup.html`, isSubfolder),
  loadComponent('sticky-bar-placeholder', `${componentBase}sticky-bar.html`, isSubfolder),
]);
