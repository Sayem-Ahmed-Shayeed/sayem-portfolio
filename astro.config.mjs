import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://sayem-ahmed-shayeed.vercel.app',
  base: '/',
  output: 'static',
  build: { format: 'directory' }
});
