import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://sayem-ahmed-shayeed.github.io',
  base: process.env.GITHUB_ACTIONS === 'true' ? '/sayem-portfolio' : '/',
  output: 'static',
  build: { format: 'directory' }
});
