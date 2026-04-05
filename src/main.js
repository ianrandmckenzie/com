import { getEffectiveTheme, applyTheme } from './theme.js';
import { mountNav } from './components/nav.js';
import { mountBreadcrumbs } from './components/breadcrumbs.js';
import { mountFooter } from './components/footer.js';

// Apply saved/system theme preference before rendering
applyTheme(getEffectiveTheme());

// Reactively follow OS changes when no preference is stored
window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', () => {
  if (!localStorage.getItem('theme-preference')) applyTheme(getEffectiveTheme());
});

mountNav();
mountBreadcrumbs();
mountFooter();

// Insert <wbr> after underscores in any visible text so snake_cased strings
// break cleanly after the underscore on narrow/tablet viewports.
const _wbrWalker = document.createTreeWalker(
  document.body,
  NodeFilter.SHOW_TEXT,
  { acceptNode: n => {
    const tag = n.parentElement?.tagName;
    if (tag === 'SCRIPT' || tag === 'STYLE') return NodeFilter.FILTER_REJECT;
    return n.textContent.includes('_') ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
  }}
);
const _wbrNodes = [];
let _wbrNode;
while ((_wbrNode = _wbrWalker.nextNode())) _wbrNodes.push(_wbrNode);
_wbrNodes.forEach(node => {
  const span = document.createElement('span');
  span.innerHTML = node.textContent.replace(/_/g, '_<wbr>');
  node.parentNode.replaceChild(span, node);
});
