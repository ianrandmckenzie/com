const FOOTER_CONFIG = {
  'index':        { tagline: 'Integrity • Stability • Performance',  byline: '© 2026 Ian R. McKenzie | All Rights Reserved' },
  '':             { tagline: 'Integrity • Stability • Performance',  byline: '© 2026 Ian R. McKenzie | All Rights Reserved' },
  'case-studies': { tagline: 'Integrity • Stability • Performance',  byline: '© 2026 Ian R. McKenzie | Specialized Solutions Architecture' },
  'case-study':   { tagline: 'End_of_Document',                       byline: 'Ian R. McKenzie | Senior Solutions Architect | Canada &amp; USA Operations' },
  'jane-sites':   { tagline: 'End_of_Document',                       byline: 'Ian R. McKenzie | Senior Solutions Architect | Canada &amp; USA Operations' },
  'failureunit':  { tagline: 'End_of_Document',                       byline: 'Ian R. McKenzie | Senior Solutions Architect | Canada &amp; USA Operations' },
  'consulting':   { tagline: 'Stability • Performance • Revenue',    byline: '© 2026 Ian R. McKenzie | Specialized Technical Solutions Architecture' },
  'labs':         { tagline: 'Rigor • Research • Precision',         byline: '© 2026 Ian R. McKenzie | Systems Research &amp; Development' },
  'spiral':       { tagline: 'End_of_Lab_Write-Up',                  byline: 'Ian R. McKenzie | Senior Solutions Architect | Canada &amp; USA Operations' },
  'voxel':        { tagline: 'End_of_Lab_Write-Up',                  byline: 'Ian R. McKenzie | Senior Solutions Architect | Canada &amp; USA Operations' },
};

const DEFAULT = FOOTER_CONFIG[''];

export function mountFooter() {
  // Skip creation if already baked in by the post-build script
  if (document.getElementById('site-footer')) return;

  const filename = window.location.pathname.split('/').pop().replace(/\.html$/, '') || '';
  const config = FOOTER_CONFIG[filename] ?? DEFAULT;

  const footer = document.createElement('footer');
  footer.id = 'site-footer';
  footer.className = 'py-20 border-t border-slate-200 dark:border-slate-700 text-center bg-slate-50 dark:bg-black px-3';
  footer.innerHTML = `
    <div class="text-slate-600 dark:text-slate-300 text-[10px] font-mono tracking-[0.4em] uppercase mb-4">
      ${config.tagline}
    </div>
    <p class="text-slate-600 dark:text-slate-300 text-xs italic">${config.byline}</p>
  `;

  // Push footer to the bottom on tall viewports
  const main = document.querySelector('main');
  if (main) {
    main.style.flexGrow = '1';
  } else {
    // Fallback: grow the last element before the footer
    const lastEl = document.body.lastElementChild;
    if (lastEl) lastEl.style.flexGrow = '1';
  }

  document.body.appendChild(footer);
}
