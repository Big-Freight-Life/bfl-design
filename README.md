# BFL Design

Portfolio and agency site for [Big Freight Life](https://bfl.design) — Ray Butler, Design Technologist.

## Setup

```bash
nvm use           # Uses Node version from .nvmrc
npm install
cp .env.example .env.local   # Fill in your values
npm run dev       # http://localhost:3000
```

## Stack

- Next.js 16 (App Router)
- MUI 6 (Material UI)
- TypeScript
- MVVM architecture
- Vercel deployment

## Deploy

Push to `master` — Vercel auto-deploys.

```bash
# Force deploy from local
vercel deploy --prod
```

## Environment Variables

See `.env.example` for required variables. Set them in Vercel project settings for production.
