# Copilot Instructions for Boilerplate Project

## Project Architecture
This is a **Vite + TailwindCSS + vanilla JavaScript** project configured for web deployment and cross-platform Tauri apps (desktop/mobile). The build outputs to `docs/` directory for GitHub Pages deployment.

## Development Workflow
- **Start development**: `npm run dev` (Vite dev server)
- **Build for web**: `npm run build` (outputs to `docs/` for GitHub Pages)
- **Preview build**: `npm run preview`
- **Tauri desktop**: `npm run tauri:dev` / `npm run tauri:build`
- **Mobile platforms**: `npm run android:dev` / `npm run ios:dev`
- **Security checks**: `npm run security-check` (combines linting and audit)

## Critical Configuration Details

### Build & Deployment
- Vite builds to `docs/` directory instead of `dist/` for GitHub Pages
- `emptyOutDir: false` preserves files like `public/CNAME` during builds
- Domain: `www.ianrandmckenzie.com` (configured in `public/CNAME`)

### TailwindCSS Configuration
- Uses TailwindCSS v4.x with Vite plugin (`@tailwindcss/vite`)
- Dark mode enabled with `class` strategy
- Content scanning: `['./**/*.html', './src/**/*.{js,ts}']`

## Design System Constraints (CRITICAL)
**Colors**: ONLY use black, white, or slate variants (`slate-50` through `slate-900`)
```html
<!-- Always include dark theme variants -->
<div class="bg-white dark:bg-black text-slate-900 dark:text-slate-50"></div>
```

**Typography**:
- Headings: `font-serif font-black`
- Code/numbers: `font-mono`
- Body text: `font-sans`

**Responsive Design**:
- Mobile-first approach required
- Use "tap" for mobile/tablet, "click/hover" for desktop interactions
- NO footer elements allowed
- Encourage animations for engagement

## File Structure Patterns
- Main entry: `index.html` (includes security meta tags)
- Styles: `src/style.css` (TailwindCSS imports)
- Scripts: `src/main.js` (vanilla JS entry point)
- Static assets: `public/` (copied to build output)

## Security Features
- Comprehensive security headers in HTML meta tags
- ESLint security plugin configured (`eslint-plugin-security`)
- Content Security Policy and permissions policy implemented

## Multi-Platform Support
- Tauri configuration ready (scripts present, but no `src-tauri/` yet)
- Mobile platform scripts for Android/iOS development
- Web deployment as primary target, native apps as secondary

When making changes, always follow the design constraints from `.github/instructions/design.instructions.md` and ensure responsive, accessible implementations with proper dark mode support.
