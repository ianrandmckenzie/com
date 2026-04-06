#!/usr/bin/env node
/**
 * bake-components.js
 * Post-build script: injects static nav + footer HTML into every built HTML
 * file under docs/ so the browser never has to wait for JS to paint them
 * (eliminates nav/footer CLS).
 *
 * Interactivity (theme toggle, mobile menu) is still wired up by the existing
 * JS components, which now detect the pre-rendered elements and skip creation.
 */

import { readFileSync, writeFileSync } from 'fs';
import { resolve, relative, dirname } from 'path';
import { fileURLToPath } from 'url';
import pkg from 'glob';
const { sync: globSync } = pkg;

const __dirname = dirname(fileURLToPath(import.meta.url));
const docsDir   = resolve(__dirname, '..', 'docs');

// ---------------------------------------------------------------------------
// SVG icons (kept in sync with src/components/nav.js)
// ---------------------------------------------------------------------------
const ICON_SYSTEM = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" class="w-5 h-5" aria-hidden="true">
    <path class="fa-dt-secondary" d="M112 320C112 216.3 187.9 130.3 287.2 114.6C247.9 158.5 224 216.4 224 280C224 389.2 294.6 481.9 392.6 515C370 523.4 345.6 528 320 528C205.1 528 112 434.9 112 320z"/>
    <path class="fa-dt-primary" d="M347.5 65.5C374.3 68.4 400 75.4 423.7 85.9C399.9 91.8 377.8 102 358.2 115.5C306.1 151.6 272 211.8 272 280C272 384.4 351.9 470 453.9 479.2C459.9 479.7 465.9 480 472 480C490.5 480 508.4 477.5 525.4 472.8C510.3 493.1 492.3 511 472 526C471.1 526.7 470.2 527.3 469.3 528C427.3 558.2 375.7 576 320 576C178.6 576 64 461.4 64 320C64 178.6 178.6 64 320 64C329.3 64 338.5 64.5 347.5 65.5zM112 320C112 434.9 205.1 528 320 528C345.5 528 370 523.4 392.6 515C294.6 481.9 224 389.2 224 280C224 216.4 247.9 158.4 287.2 114.6C187.9 130.3 112 216.3 112 320zM435.2 300.8L352 272L435.2 243.2L464 160L492.8 243.2L576 272L492.8 300.8L464 384L435.2 300.8z"/>
  </svg>`;

// ---------------------------------------------------------------------------
// Nav HTML builder
// ---------------------------------------------------------------------------
function buildNavHtml(filename, isArticlesSubdir) {
  const isProofActive    = ['case-studies.html', 'jane-sites.html', 'failureunit.html', 'seo-case-study.html'].includes(filename);
  const isAdvisoryActive = filename === 'consulting.html';
  const isLabsActive     = ['labs.html', 'spiral.html', 'voxel.html'].includes(filename);
  const isArticlesActive = filename === 'articles.html' || isArticlesSubdir;
  const isHomePage       = filename === 'index.html' || filename === '';

  const mckenzieClass = isHomePage
    ? 'bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent'
    : isProofActive
      ? 'text-blue-600 dark:text-blue-400'
      : isAdvisoryActive
        ? 'text-green-600 dark:text-green-400'
        : isLabsActive
          ? 'text-purple-600 dark:text-purple-400'
          : isArticlesActive
            ? 'text-slate-600 dark:text-slate-400'
            : 'text-blue-500';

  const proofDesktop    = isProofActive
    ? 'text-blue-600 dark:text-blue-400 border-b border-blue-600 dark:border-blue-400 pb-0.5 uppercase'
    : 'text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors uppercase';
  const advisoryDesktop = isAdvisoryActive
    ? 'text-green-600 dark:text-green-400 border-b border-green-600 dark:border-green-400 pb-0.5 uppercase'
    : 'text-slate-600 dark:text-slate-400 hover:text-green-600 dark:hover:text-green-400 transition-colors uppercase';
  const labsDesktop     = isLabsActive
    ? 'text-purple-600 dark:text-purple-400 border-b border-purple-600 dark:border-purple-400 pb-0.5 uppercase'
    : 'text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors uppercase';
  const articlesDesktop = isArticlesActive
    ? 'text-slate-900 dark:text-white border-b border-slate-900 dark:border-white pb-0.5 uppercase'
    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors uppercase';

  const proofMobile    = isProofActive    ? 'text-blue-600 dark:text-blue-400 uppercase'    : 'text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors uppercase';
  const advisoryMobile = isAdvisoryActive ? 'text-green-600 dark:text-green-400 uppercase'  : 'text-slate-600 dark:text-slate-400 hover:text-green-600 dark:hover:text-green-400 transition-colors uppercase';
  const labsMobile     = isLabsActive     ? 'text-purple-600 dark:text-purple-400 uppercase' : 'text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors uppercase';
  const articlesMobile = isArticlesActive ? 'text-slate-900 dark:text-white uppercase'       : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors uppercase';

  return `<header id="site-header" class="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-700">
    <div class="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
      <a href="/"
         class="font-sans font-black text-lg tracking-tighter uppercase text-slate-900 dark:text-white hover:opacity-75 transition-opacity">
        Ian R. <span class="${mckenzieClass}">McKenzie</span>
      </a>

      <div class="flex items-center gap-3">
        <nav aria-label="Primary" class="hidden md:flex items-center gap-8 text-xs font-bold tracking-widest">
          <a href="/case-studies" class="${proofDesktop}"${isProofActive    ? '' : ' data-title="Case studies &amp; outcomes"'}>The_Proof</a>
          <a href="/consulting"   class="${advisoryDesktop}"${isAdvisoryActive ? '' : ' data-title="Advisory &amp; strategy"'}>Advisory</a>
          <a href="/labs"         class="${labsDesktop}"${isLabsActive     ? '' : ' data-title="Experiments &amp; builds"'}>Research_Labs</a>
          <!--<a href="/articles"     class="${articlesDesktop}"${isArticlesActive ? '' : ' data-title="Whitepapers &amp; analyses"'}>Articles</a>-->
          <a href="/resume.pdf"
             class="text-slate-900 dark:text-white border-b border-blue-500 pb-0.5 hover:border-slate-900 dark:hover:border-white transition-all uppercase" data-title="Download my résumé">RESUME_PDF</a>
        </nav>

        <button id="theme-toggle"
                aria-label="Switch theme"
                data-title="Theme"
                class="p-2 rounded text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
          ${ICON_SYSTEM}
        </button>

        <button id="nav-toggle"
                aria-label="Open menu"
                aria-expanded="false"
                aria-controls="nav-mobile-menu"
                class="md:hidden p-2 -mr-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
          <svg class="nav-icon-open w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
          <svg class="nav-icon-close hidden w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
    </div>

    <div id="nav-mobile-menu"
         class="hidden md:hidden border-t border-slate-200 dark:border-slate-700 bg-white/95 dark:bg-slate-900/95">
      <nav aria-label="Mobile" class="max-w-5xl mx-auto px-6 py-5 flex flex-col gap-5 text-xs font-bold tracking-widest">
        <a href="/case-studies" class="${proofMobile}">The_Proof</a>
        <a href="/consulting"   class="${advisoryMobile}">Advisory</a>
        <a href="/labs"         class="${labsMobile}">Research_Labs</a>
        <a href="/articles"     class="${articlesMobile}">Articles</a>
        <a href="/resume.pdf"        class="text-slate-900 dark:text-white uppercase">RESUME_PDF</a>
      </nav>
    </div>
  </header>`;
}

// ---------------------------------------------------------------------------
// Breadcrumb builder — auto-derives trail from file path + <meta name="bc-label">
// ---------------------------------------------------------------------------
const SECTION_LABELS = {
  'case-studies': 'The_Proof',
  'consulting':   'Advisory',
  'labs':         'Research_Labs',
  'articles':     'Articles',
};

function buildBreadcrumbHtml(rel, htmlContent) {
  // Skip files in legacy html/ subtree
  if (rel.startsWith('html/') || rel.startsWith('html\\')) return '';

  // Current page label from meta tag — if absent, no breadcrumb
  const labelMatch = htmlContent.match(/<meta\s+name="bc-label"\s+content="([^"]+)"/);
  if (!labelMatch) return '';
  const currentLabel = labelMatch[1];

  // Build URL path from relative file path (e.g. "case-studies/jane-sites.html" → "/case-studies/jane-sites")
  const urlPath  = '/' + rel.replace(/\.html$/, '').replace(/\/index$/, '').replace(/\\/g, '/');
  const segments = urlPath.replace(/^\//, '').split('/').filter(Boolean);

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

  const items = crumbs.map((crumb, i) => {
    if (i === crumbs.length - 1) {
      return `<li aria-current="page"><span class="text-slate-700 dark:text-slate-300 font-mono text-[10px] uppercase tracking-widest">${crumb.label}</span></li>`;
    }
    return `<li><a href="${crumb.href}" class="text-slate-600 dark:text-slate-50 hover:text-slate-800 dark:hover:text-white font-mono text-[10px] uppercase tracking-widest transition-colors">${crumb.label}</a></li><li aria-hidden="true" class="text-slate-400 dark:text-slate-700 font-mono text-[10px] select-none">/</li>`;
  }).join('');

  return `<nav id="site-breadcrumbs" aria-label="Breadcrumb" class="bg-slate-50 dark:bg-black border-b border-slate-200 dark:border-slate-700"><div class="max-w-5xl mx-auto px-6 py-2.5"><ol class="flex items-center gap-2 flex-wrap" role="list">${items}</ol></div></nav>`;
}

// ---------------------------------------------------------------------------
// Footer builder (kept in sync with src/components/footer.js)
// ---------------------------------------------------------------------------
const FOOTER_CONFIG = {
  'index':          { tagline: 'Integrity • Stability • Performance',  byline: '© 2026 Ian R. McKenzie | All Rights Reserved' },
  '':               { tagline: 'Integrity • Stability • Performance',  byline: '© 2026 Ian R. McKenzie | All Rights Reserved' },
  'case-studies':   { tagline: 'Integrity • Stability • Performance',  byline: '© 2026 Ian R. McKenzie | Specialized Solutions Architecture' },
  'case-study':     { tagline: 'End_of_Document',                      byline: 'Ian R. McKenzie | Senior Solutions Architect | Canada &amp; USA Operations' },
  'jane-sites':     { tagline: 'End_of_Document',                      byline: 'Ian R. McKenzie | Senior Solutions Architect | Canada &amp; USA Operations' },
  'failureunit':    { tagline: 'End_of_Document',                      byline: 'Ian R. McKenzie | Senior Solutions Architect | Canada &amp; USA Operations' },
  'seo-case-study': { tagline: 'End_of_Document',                      byline: 'Ian R. McKenzie | Senior Solutions Architect | Canada &amp; USA Operations' },
  'consulting':     { tagline: 'Stability • Performance • Revenue',    byline: '© 2026 Ian R. McKenzie | Specialized Technical Solutions Architecture' },
  'labs':           { tagline: 'Rigor • Research • Precision',         byline: '© 2026 Ian R. McKenzie | Systems Research &amp; Development' },
  'spiral':         { tagline: 'End_of_Lab_Write-Up',                  byline: 'Ian R. McKenzie | Senior Solutions Architect | Canada &amp; USA Operations' },
  'voxel':          { tagline: 'End_of_Lab_Write-Up',                  byline: 'Ian R. McKenzie | Senior Solutions Architect | Canada &amp; USA Operations' },
};

const FOOTER_DEFAULT = FOOTER_CONFIG[''];

function buildFooterHtml(filename) {
  const slug   = filename.replace(/\.html$/, '');
  const config = FOOTER_CONFIG[slug] ?? FOOTER_DEFAULT;
  return `<footer id="site-footer" class="py-20 border-t border-slate-200 dark:border-slate-700 text-center bg-slate-50 dark:bg-black px-3">
  <div class="text-slate-600 dark:text-slate-300 text-[10px] font-mono tracking-[0.4em] uppercase mb-4">
    ${config.tagline}
  </div>
  <p class="text-slate-600 dark:text-slate-300 text-xs italic">${config.byline}</p>
</footer>`;
}

// ---------------------------------------------------------------------------
// Process a single HTML file
// ---------------------------------------------------------------------------
function processFile(filePath) {
  let html = readFileSync(filePath, 'utf8');

  // Skip if already baked (idempotent)
  if (html.includes('id="site-header"') || html.includes("id='site-header'")) {
    console.log(`  skip (already baked): ${relative(docsDir, filePath)}`);
    return;
  }

  const rel              = relative(docsDir, filePath);            // e.g. "articles/zero-trust-…html"
  const parts            = rel.split(/[/\\]/);
  const filename         = parts[parts.length - 1];               // e.g. "zero-trust-…html"
  const isArticlesSubdir = parts.length > 1 && parts[0] === 'articles';

  const navHtml        = buildNavHtml(filename, isArticlesSubdir);
  const breadcrumbHtml = buildBreadcrumbHtml(rel, html);
  const footerHtml     = buildFooterHtml(filename);

  // Pre-set body padding-top to nav height (~68px) to prevent CLS before JS initialises
  html = html.replace(/(<body\b)([^>]*)(>)/, (_, open, attrs, close) => {
    if (/\bstyle=/.test(attrs)) {
      return `${open}${attrs.replace(/style="/, 'style="padding-top:68px;')}${close}`;
    }
    return `${open}${attrs} style="padding-top:68px"${close}`;
  });

  // Insert nav (+ breadcrumbs where applicable) right after <body …>
  const afterBody = breadcrumbHtml
    ? `\n${navHtml}\n${breadcrumbHtml}`
    : `\n${navHtml}`;
  html = html.replace(/(<body[^>]*>)/, `$1${afterBody}`);

  // Insert footer right before </body>
  html = html.replace(/<\/body>/, `${footerHtml}\n</body>`);

  writeFileSync(filePath, html, 'utf8');
  console.log(`  baked: ${relative(docsDir, filePath)}`);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
const files = globSync('**/*.html', { cwd: docsDir, absolute: true });
console.log(`\nBaking nav into ${files.length} HTML file(s) in docs/…`);
files.forEach(processFile);
console.log('Done.\n');
