// Map every non-home page filename → its breadcrumb trail.
// The last entry has no href (it is the current page).
const CRUMB_MAP = {
  'case-studies.html': [
    { label: 'Home',      href: '/index.html' },
    { label: 'The_Proof' },
  ],
  'seo-case-study.html': [
    { label: 'Home',      href: '/index.html' },
    { label: 'The_Proof', href: '/case-studies.html' },
    { label: 'Revenue Safety Net' },
  ],
  'jane-sites.html': [
    { label: 'Home',      href: '/index.html' },
    { label: 'The_Proof', href: '/case-studies.html' },
    { label: 'Jane.app Acquisition' },
  ],
  'failureunit.html': [
    { label: 'Home',      href: '/index.html' },
    { label: 'The_Proof', href: '/case-studies.html' },
    { label: 'Failure Unit' },
  ],
  'consulting.html': [
    { label: 'Home',     href: '/index.html' },
    { label: 'Advisory' },
  ],
  'labs.html': [
    { label: 'Home',         href: '/index.html' },
    { label: 'Research_Labs' },
  ],
  'spiral.html': [
    { label: 'Home',          href: '/index.html' },
    { label: 'Research_Labs', href: '/labs.html' },
    { label: 'Prime Spiral' },
  ],
  'voxel.html': [
    { label: 'Home',          href: '/index.html' },
    { label: 'Research_Labs', href: '/labs.html' },
    { label: 'Voxel Engine' },
  ],
};

export function mountBreadcrumbs() {
  const filename = window.location.pathname.split('/').pop() || 'index.html';
  const crumbs = CRUMB_MAP[filename];
  if (!crumbs) return;

  const items = crumbs
    .map((crumb, i) => {
      const isLast = i === crumbs.length - 1;
      if (isLast) {
        return `<li aria-current="page">
          <span class="text-slate-700 dark:text-slate-300 font-mono text-[10px] uppercase tracking-widest">${crumb.label}</span>
        </li>`;
      }
      return `
        <li>
          <a href="${crumb.href}"
             class="text-slate-500 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 font-mono text-[10px] uppercase tracking-widest transition-colors">
            ${crumb.label}
          </a>
        </li>
        <li aria-hidden="true" class="text-slate-400 dark:text-slate-700 font-mono text-[10px] select-none">/</li>`;
    })
    .join('');

  const nav = document.createElement('nav');
  nav.id = 'site-breadcrumbs';
  nav.setAttribute('aria-label', 'Breadcrumb');
  nav.className = 'bg-slate-50 dark:bg-black border-b border-slate-200 dark:border-slate-700';
  nav.innerHTML = `
    <div class="max-w-5xl mx-auto px-6 py-2.5">
      <ol class="flex items-center gap-2 flex-wrap" role="list">${items}</ol>
    </div>
  `;

  // Insert immediately after the fixed site header in DOM order
  const siteHeader = document.getElementById('site-header');
  if (siteHeader) {
    siteHeader.insertAdjacentElement('afterend', nav);
  } else {
    document.body.insertBefore(nav, document.body.firstChild);
  }
}
