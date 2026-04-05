// vite.config.js
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'
import { readdirSync, statSync } from 'fs'

// Recursively find all HTML files, excluding specified directories
function findHtmlFiles(dir, excludeDirs = ['node_modules']) {
  const results = []
  for (const entry of readdirSync(dir)) {
    if (excludeDirs.includes(entry)) continue
    const fullPath = `${dir}/${entry}`
    if (statSync(fullPath).isDirectory()) {
      results.push(...findHtmlFiles(fullPath, excludeDirs))
    } else if (entry.endsWith('.html')) {
      results.push(fullPath)
    }
  }
  return results
}

const input = Object.fromEntries(
  findHtmlFiles('src').map((file) => {
    // Strip leading "src/" and trailing ".html" to form a stable key
    const key = file.replace(/^src\//, '').replace(/\.html$/, '').replace(/\//g, '-')
    return [key, resolve(file)]
  })
)

export default defineConfig({
  root: 'src',
  plugins: [tailwindcss()],
  build: {
    outDir: '../docs',
    emptyOutDir: false, // Don't empty the docs directory to preserve existing files like CNAME
    rollupOptions: { input },
  },
  publicDir: '../public', // Ensure public files are copied
})
