# Corporate GPT Website

Public marketing website for [Corporate GPT](https://corporate-gpt.ai), Neurologic AI's sovereign enterprise intelligence platform.

## Stack

- Next.js 16 App Router
- React 19 and TypeScript
- Tailwind CSS 4
- Vercel hosting

## Local development

Use Node.js 24.x and npm.

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Quality checks

Run both checks before requesting review:

```bash
npm run lint
npm run build
```

## Project structure

- `app/` contains App Router pages, metadata, sitemap, robots rules, and global styles.
- `app/content.ts` contains the structured content for the supporting pages.
- `app/components/` contains shared site and page experiences.
- `public/` contains local fonts, brand assets, product imagery, and customer marks.
- `next.config.ts` contains the production security-header policy.

Customer evidence must retain an explicit deployment status. Named customers, metrics, and use-case detail should be published only within the approved disclosure boundary.

## Deployment

Vercel serves the production domain at [corporate-gpt.ai](https://corporate-gpt.ai). Use preview deployments for review and approval before promoting a change to production.

The current marketing site uses first-party static assets and does not require browser-side analytics or advertising scripts. If a third-party service is introduced, review the Content Security Policy and privacy copy as part of the same change.
