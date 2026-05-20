# simple-linktree

A small static Linktree-style page built with Astro. Content stays in
`config.js`, while Astro renders the page at build time so it can be hosted on
GitHub Pages without a server.

## Features

- Static Astro build with no client-side framework
- Inline SVG icons compiled from Font Awesome packages, without the Font Awesome CDN
- Config-driven profile, social links, grouped links, Spotify embed, and SEO tags
- Dark-mode styling through CSS media queries
- GitHub Pages workflow included

## Local Development

```bash
npm install
npm run dev
```

Open the local URL printed by Astro.

## Build

```bash
npm run build
npm run preview
```

The production output is generated in `dist/`.

## GitHub Pages

This repo is configured for a project page at:

```text
https://cabrata.github.io/simple-linktree/
```

The Astro config uses:

```js
site: "https://cabrata.github.io"
base: "/simple-linktree"
```

For a different repository or custom domain, update `astro.config.mjs` or set
`SITE` and `BASE_PATH` environment variables in the workflow.

## Configuration

Edit `config.js` to change profile content, links, icons, Spotify, footer, and
SEO metadata. Existing Font Awesome class names such as `fab fa-github` and
`fas fa-envelope` are mapped to optimized inline SVG icons by
`src/components/Icon.astro`.

## Project Structure

```text
simple-linktree/
├── astro.config.mjs
├── config.js
├── public/
│   └── .nojekyll
├── src/
│   ├── components/
│   │   └── Icon.astro
│   ├── pages/
│   │   └── index.astro
│   └── styles/
│       └── global.css
└── .github/
    └── workflows/
        └── deploy.yml
```
