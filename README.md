# Mariam Mohamed Elkholy — Portfolio

Editorial UI/UX portfolio built with Next.js, Tailwind, GSAP, Lenis, and a lightweight OGL hero shader.

## Run locally

```bash
cd site
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build && npm start
```

## Edit content

| What | Where |
|------|--------|
| Projects, case studies, gallery paths | `src/data/projects.ts` |
| Bio, experience, skills, contact | `src/data/site.ts` |
| Project images | `public/projects/<slug>/` |
| CV download | `public/mariam-elkholy-cv.pdf` |
| Portrait (optional) | add `public/mariam.jpg` and wire it in `About.tsx` |

## Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS
- GSAP ScrollTrigger + Lenis
- OGL (hero WebGL, desktop only)
- Framer Motion available if needed for page transitions
- `next/image` + WebP assets

## Deploy

Connect the `site` folder (or repo root if you move files up) to Vercel. Set optional env:

```
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```
