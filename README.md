# avoantonio.com

Personal portfolio for Antonio Aguilar Gomez — UX Engineer.

## Stack

- **Next.js 16** (App Router, Turbopack) with **React 19**
- **TypeScript 5**
- **Tailwind v4** — design tokens declared in `app/globals.css` via `@theme inline`
- **MDX** for case studies (`app/work/<slug>/page.mdx`)
- **Vercel Analytics**
- Deployed on Vercel (autodeploys on push to `main`)

## Local development

```bash
npm install
npm run dev
```

Dev server runs on http://localhost:3000 (or 3001 if 3000 is busy).

## Project shape

```
app/
  layout.tsx              # root layout, fonts, metadata, skip link
  page.tsx                # home — hero, work, experience, toolkit, footer
  not-found.tsx           # 404
  globals.css             # design tokens + tailwind theme
  work/
    layout.tsx            # case study chrome
    <slug>/page.mdx       # one MDX file per case study
components/
  Container.tsx           # max-width wrapper
  Pill.tsx                # tag/badge
  CaseStudyHeader.tsx     # title + meta block for case studies
  Metric.tsx              # MetricGrid + Metric for outcome callouts
lib/
  cn.ts                   # className helper
  content.ts              # home page data (case study list, experience, skills)
mdx-components.tsx        # global MDX type styles
public/
  antonio-aguilar-resume.pdf
  selfie.jpg, daca.jpg, microsoft.png, ...
_legacy/                  # archived previous CRA portfolio (excluded from build)
```

## Adding a case study

1. Create `app/work/<slug>/page.mdx`. Use an existing case study as the template.
2. Add an entry to `caseStudies` in `lib/content.ts` so it shows on the home page.

## Deploy

Push to `main`. Vercel handles the rest.
