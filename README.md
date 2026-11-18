# Sarah Rafi: Portfolio

Personal portfolio built with **Angular 22**: standalone components, signals, zoneless change detection and `@defer`, plus animation written from scratch with no animation libraries.

**Live:** https://sarah-rafi-portfolio.vercel.app  ·  **Add a project:** see [ADDING_PROJECTS.md](ADDING_PROJECTS.md)

## Features

| Feature | How it's built | File |
|---|---|---|
| Interactive particle field in the hero | Canvas + `requestAnimationFrame`, paused off-screen with `IntersectionObserver` | `src/app/shared/particles.ts` |
| Typewriter role line, count-up stats, magnetic buttons, 3D tilt cards, scroll reveals | Five small attribute **directives** using signal `input()`s and `afterNextRender` | `src/app/shared/motion.ts` |
| Project filter with live counts | `signal` + `computed` over a pure, unit-tested `filterProjects()` | `src/app/sections/projects.ts` |
| Project detail modal | Native `<dialog>` (focus trap and Esc for free) + Angular `animate.enter` | `src/app/sections/projects.ts` |
| Lazy-loaded Projects and Skills sections | `@defer (on viewport; prefetch on idle)`, built as separate JS chunks | `src/app/app.ts` |
| Dark/light theme | `ThemeService` holds a signal; an `effect` writes it to `<html>` and localStorage; View Transition cross-fade | `src/app/shared/theme.ts` |
| Scroll progress bar, self-drawing timeline | **CSS scroll-driven animations** (`animation-timeline: scroll()/view()`), no JS | `src/app/app.ts`, `sections/experience.ts` |
| Active nav highlight | rAF-throttled scroll listener writing a signal | `src/app/app.ts` |
| Accessibility | Every animation respects `prefers-reduced-motion`; skip link, focus rings, aria labels | `src/styles.scss` |

Initial bundle is about **54 kB gzipped**.

## Run it

```bash
npm install
npm start        # http://localhost:4200
npm test         # Vitest unit tests
npm run build    # production build in dist/
```

## Deploy

Hosted on Vercel and connected to this GitHub repo, so every push to `main` redeploys. To deploy manually: `npx vercel --prod`.

## Structure

```
src/app/
  data/        projects.ts, profile.ts   ← all content lives here
  sections/    hero, about, experience, projects, skills, contact
  shared/      motion.ts (directives), particles.ts, theme.ts
  app.ts       shell: nav, progress bar, cursor glow, @defer blocks
```
