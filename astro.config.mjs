import { defineConfig } from 'astro/config';

const site = process.env.SITE ?? 'https://cabrata.github.io';
const base = process.env.BASE_PATH ?? '/simple-linktree';

export default defineConfig({
//  site,
//  base,
  output: 'static',
});
