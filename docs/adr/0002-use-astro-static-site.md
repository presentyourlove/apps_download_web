# 2. Use Astro Static Site Generation

Date: 2026-01-23

## Status

Accepted

## Context

The project is an apps download center requiring high performance, SEO optimization, and low hosting costs. The content (app versions, blogs) is relatively static but needs managing via a CMS.

## Decision

We will use [Astro](https://astro.build/) as the web framework and configure it for **Static Site Generation (SSG)** (`output: 'static'`).
We will deploy the build artifacts to GitHub Pages / Static Hosting.

## Consequences

### Positive

- **Performance**: Zero-JS by default (except for islands), fast load times.
- **Cost**: Can be hosted on any static file server (GitHub Pages, Netlify, Vercel, Nginx).
- **SEO**: content is pre-rendered HTML.

### Negative

- **Build Time**: Full rebuild required for content changes.
- **Dynamic Features**: Dynamic server-side logic requires client-side JS or Cloud Functions (not used heavily here).
