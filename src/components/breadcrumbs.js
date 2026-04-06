// Section-level slug → breadcrumb label. Add one entry per top-level section.
// This is the ONLY place to maintain section labels; individual page labels
// come from <meta name="bc-label" content="…"> in each HTML file.
const SECTION_LABELS = {
  'case-studies': 'The_Proof',
  'consulting':   'Advisory',
  'labs':         'Research_Labs',
  'articles':     'Articles',
};

export function mountBreadcrumbs() {
  // Skip if already baked by the post-build script
  if (document.getElementById('site-breadcrumbs')) return;

  const pathname = window.location.pathname.replace(/\.html$/, '');

  // No breadcrumb on home or legacy html/ routes
  if (pathname === '/' || pathname === '' || pathname.startsWith('/html/')) return;

  // Current page label from meta tag — if absent, no breadcrumb
  const currentLabel = document.querySelector('meta[name="bc-label"]')?.content;
  if (!currentLabel) return;

  const segments = pathname.replace(/^\//, '').split('/').filter(Boolean);

  const crumbs = [{ label: 'Home', href: '/' }];
  for (let i = 0; i < segments.length; i++) {
    const seg    = segments[i];
    const isLast = i === segments.length - 1;
    if (isLast) {
      crumbs.push({ label: currentLabel });
    } else {
      crumbs.push({ label: SECTION_LABELS[seg] ?? seg, href: '/' + segments.slice(0, i + 1).join('/') });
    }
  }

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
