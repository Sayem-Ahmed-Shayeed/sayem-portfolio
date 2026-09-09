import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://sayem-ahmed-shayeed.github.io',
  base: '/sayem-portfolio',
  output: 'static',
  build: { format: 'directory' }
});
