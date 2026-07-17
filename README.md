# Wellora Origins — Angular 21 Conversion

This is a 1:1 Angular 21 (standalone components + Signals) port of the original React/Vite
"Wellora Origins" site (Preloader, Navbar, Hero, Marquee, BestSellers, Process, WhyUs, Story, Footer).

**Note on the original stack:** the uploaded project was React + Vite + TypeScript + Tailwind
(with framer-motion for animation and shadcn/radix for a UI kit that wasn't actually used by the
page itself). There was no Python in it — the Kimi share link claim was likely referring to the
build tool, not the app. Only the components actually used by the page were ported; the unused
shadcn/ui kit was dropped since none of the five sections import from it.

## Setup

```bash
npm install
npm start
```

Open http://localhost:4200

**Note on Angular 21:** new Angular 21 projects default to zoneless change detection
(`provideZonelessChangeDetection()`), and Vitest replaces Karma as the default test runner.
This project intentionally keeps the zone.js-based bootstrap (`polyfills: ["zone.js"]`,
`provideAnimations()`) it was built with — it's still fully supported in v21, and every
animation/scroll-listener/signal pattern here works identically either way. Switching to
zoneless is a one-line change in `app.config.ts` and `angular.json` if you want it later:
swap `provideAnimations()` for `provideZonelessChangeDetection()` and drop `zone.js` from
`polyfills` and `package.json`.

## Structure

```
src/app/
  pages/home/                    — assembles the whole page, owns loading/started state
  components/
    preloader/                   — cinematic intro (CSS keyframes replace framer-motion timeline)
    navbar/                      — scroll-aware header, mobile menu
    hero/                        — mouse parallax + scroll fade + staged text reveal
    marquee/                     — infinite CSS-scroll brand strip
    best-sellers/                — product cards, hover nutrition panel
    process/                     — "soil to jar" timeline, scroll-triggered connector line
    why-us/                      — feature grid, self-drawing SVG icons
    story/                       — illustrated farm scene with scroll parallax
    footer/                      — link columns, newsletter, ghost brand word
    jar-svg/                     — reusable product jar illustration
    leaf-art/                    — small icon components (sprout, leaf, star)
    reveal/                      — WordReveal + DrawnLine (word-by-word / line-draw entrances)
  directives/
    reveal.directive.ts          — appReveal: IntersectionObserver fade+rise, replaces
                                    framer-motion's whileInView
```

## Animation approach

framer-motion doesn't have a direct Angular equivalent, so every animation was rebuilt with
native tools:

- **Scroll-triggered reveals** (`Reveal`, `WordReveal`, `DrawnLine` in the original) →
  `appReveal` directive + two small components, all built on `IntersectionObserver` and CSS
  transitions defined in `src/styles.scss` (`.reveal-init`, `.word-reveal-*`, `.drawn-line`).
- **Continuous ambient motion** (floating jars, swaying leaves, morphing blobs, marquee) →
  plain CSS `@keyframes` in `src/styles.scss`, unchanged from the original's keyframe definitions.
- **Mouse parallax / scroll fade in the Hero** → `signal()` + `computed()` driven by
  `(mousemove)` and a `window:scroll` listener, applied via `[style.transform]`.
- **The cinematic Preloader** → staged `setTimeout`s driving a `leaving` signal, combined with
  component-scoped `@keyframes` (`preloader.component.scss`) timed to match the original delays.

Wherever an element needed both an entrance transition *and* a continuous keyframe animation on
the same CSS `transform` property, they were split into a wrapper (entrance) + inner element
(continuous animation) to avoid the two fighting over the same property — see `hero.component.html`
and `process.component.html`.

## Design tokens

All colors, fonts, and custom keyframes were carried over as-is into `tailwind.config.js` and
`src/styles.scss` — `forest`, `moss`, `leaf`, `sprout`, `cream`, `parchment`, `sand`, `honey`,
`clay`, plus the `Fraunces` / `Manrope` font pairing.
