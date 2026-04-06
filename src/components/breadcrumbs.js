// Map every non-home page filename → its breadcrumb trail.
// The last entry has no href (it is the current page).
const CRUMB_MAP = {
  'case-studies': [
    { label: 'Home',      href: '/' },
    { label: 'The_Proof' },
  ],
  'seo-case-study': [
    { label: 'Home',      href: '/' },
    { label: 'The_Proof', href: '/case-studies' },
    { label: 'Revenue Safety Net' },
  ],
  'jane-sites': [
    { label: 'Home',      href: '/' },
    { label: 'The_Proof', href: '/case-studies' },
    { label: 'Jane.app Acquisition' },
  ],
  'failureunit': [
    { label: 'Home',      href: '/' },
    { label: 'The_Proof', href: '/case-studies' },
    { label: 'Failure Unit' },
  ],
  'consulting': [
    { label: 'Home',     href: '/' },
    { label: 'Advisory' },
  ],
  'labs': [
    { label: 'Home',         href: '/' },
    { label: 'Research_Labs' },
  ],
  'spiral': [
    { label: 'Home',          href: '/' },
    { label: 'Research_Labs', href: '/labs' },
    { label: 'Prime Spiral' },
  ],
  'voxel': [
    { label: 'Home',          href: '/' },
    { label: 'Research_Labs', href: '/labs' },
    { label: 'Voxel Engine' },
  ],
};

export function mountBreadcrumbs() {
  const filename = window.location.pathname.split('/').pop().replace(/\.html$/, '') || 'index';
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
             class="text-slate-600 dark:text-slate-50 hover:text-slate-800 dark:hover:text-white font-mono text-[10px] uppercase tracking-widest transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2">
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
