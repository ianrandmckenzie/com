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
