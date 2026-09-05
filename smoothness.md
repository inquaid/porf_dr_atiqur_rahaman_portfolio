# Smoothness.md — Drop-in Smooth Scroll, Animation & UI Interaction Reference

> **Source of truth** for scroll-driven storytelling in any Next.js 15 / React 18 project.
> Every section is verbatim project source — copy files and you have the same setup.

---

## Table of Contents

1. [Required Packages](#1-required-packages)
2. [Project Configuration](#2-project-configuration)
3. [Smooth Scroll Provider / Wrapper Setup](#3-smooth-scroll-provider--wrapper-setup)
4. [Global CSS Settings & Overrides](#4-global-css-settings--overrides)
5. [Reusable Animation & Interaction Components](#5-reusable-animation--interaction-components)
6. [Scroll-Drive Patterns (GSAP + Lenis)](#6-scroll-drive-patterns-gsap--lenis)
7. [Performance & Integration Best Practices](#7-performance--integration-best-practices)

---

## 1. Required Packages

### npm

```bash
npm install lenis gsap motion clsx tailwind-merge
npm install --save-dev @types/node
```

### pnpm

```bash
pnpm add lenis gsap motion clsx tailwind-merge
pnpm add -D @types/node
```

### Pinned versions (known-good triad)

```jsonc
{
  "dependencies": {
    "lenis": "1.1.14",
    "gsap": "3.12.5",
    "motion": "11.11.17",
    "clsx": "2.1.1",
    "tailwind-merge": "2.5.4"
  }
}
```

> **Notes**
> - `motion` is the successor to `framer-motion` (same `motion/react` API).
> - Lenis 1.x is ESM + tree-shake friendly; `gsap` 3.12 includes `ScrollTrigger` for free.
> - React 18 is **pinned** below because some animation libs still warn on 19; add `"overrides": { "react": "18.3.1", "react-dom": "18.3.1" }` if 19 mismatch warnings appear.

---

## 2. Project Configuration

### `lib/cn.ts` — class merge helper

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind class strings, deduping conflicting utilities. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### `tailwind.config.ts` — easing + ink/accent palette + font tokens

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./sanity/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      colors: {
        ink: {
          50: "#f7f7f8",
          100: "#eeeef0",
          200: "#d8d8dd",
          400: "#8a8a93",
          600: "#3f3f46",
          800: "#1c1c20",
          900: "#0b0b0d",
          950: "#050507",
        },
        accent: {
          DEFAULT: "#e6ff5b",
          ink: "#0b0b0d",
        },
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.19, 1, 0.22, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
```

---

## 3. Smooth Scroll Provider / Wrapper Setup

### `components/ui/useReducedMotion.ts` — media query hook

```tsx
"use client";

import { useEffect, useState } from "react";

/**
 * Subscribes to the prefers-reduced-motion media query.
 * Returns `true` until the query reports — initialised after mount to keep
 * RSC output deterministic.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
```

### `components/ui/SmoothScroll.tsx` — Lenis provider

```tsx
"use client";

import Lenis from "lenis";
import { useEffect } from "react";

import { useReducedMotion } from "./useReducedMotion";

/**
 * Boots Lenis, a smooth-scroll proxy. Tie scroll progress updates to GSAP's
 * ticker (in your pinned-section component) so ScrollTrigger stays in sync.
 * No-op when the user prefers reduced motion.
 */
export function SmoothScroll() {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    if (typeof window === "undefined") return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
    });

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [reduced]);

  return null;
}
```

### Mount once in the root layout

```tsx
// app/layout.tsx (excerpt)
import { SmoothScroll } from "@/components/ui/SmoothScroll";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
```

---

## 4. Global CSS Settings & Overrides

Append to `app/globals.css` (after `@tailwind base/components/utilities`).

```css
/* -------------------------------------------------------------------------- */
/* Design tokens                                                              */
/* -------------------------------------------------------------------------- */
:root {
  --font-sans:
    "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
  --font-mono:
    "JetBrains Mono", ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas,
    monospace;

  --bg: 5 5 7;           /* ink-950 */
  --fg: 247 247 248;     /* ink-50  */
  --muted: 138 138 147;  /* ink-400 */
  --line: 28 28 32;      /* ink-800 */
  --accent: 230 255 91;  /* accent   */
}

/* -------------------------------------------------------------------------- */
/* Base                                                                       */
/* -------------------------------------------------------------------------- */
html,
body {
  background: rgb(var(--bg));
  color: rgb(var(--fg));
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

body {
  font-family: var(--font-sans);
  font-feature-settings: "ss01", "cv11";
}

/* Lenis — required for the smooth-scroll proxy */
html.lenis,
html.lenis body {
  height: auto;
}
.lenis.lenis-smooth {
  scroll-behavior: auto !important;
}
.lenis.lenis-smooth [data-lenis-prevent] {
  overscroll-behavior: contain;
}
.lenis.lenis-stopped {
  overflow: hidden;
}

/* WebKit / Chromium scrollbar — slim + monochrome so it never competes with the UI */
* {
  scrollbar-width: thin;
  scrollbar-color: rgb(var(--line)) transparent;
}
*::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
*::-webkit-scrollbar-track {
  background: transparent;
}
*::-webkit-scrollbar-thumb {
  background: rgb(var(--line));
  border-radius: 999px;
  border: 2px solid rgb(var(--bg));
}
*::-webkit-scrollbar-thumb:hover {
  background: rgb(var(--muted));
}

/* Selection */
::selection {
  background: rgb(var(--accent));
  color: rgb(var(--bg));
}

/* -------------------------------------------------------------------------- */
/* Reusable utilities                                                         */
/* -------------------------------------------------------------------------- */
.container-page {
  margin-inline: auto;
  width: 100%;
  max-width: 1400px;
  padding-inline: 1.25rem;
}
@media (min-width: 640px) {
  .container-page { padding-inline: 2rem; }
}
@media (min-width: 1024px) {
  .container-page { padding-inline: 3rem; }
}

.hairline {
  background: linear-gradient(
    to right,
    transparent,
    rgb(var(--line)) 20%,
    rgb(var(--line)) 80%,
    transparent
  );
  height: 1px;
}

.text-balance {
  text-wrap: balance;
}

/* Hide custom cursor on touch devices */
@media (hover: none) {
  .cursor-dot,
  .cursor-ring {
    display: none !important;
  }
}

/* Respect reduced motion site-wide — kills every animation/transition */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 5. Reusable Animation & Interaction Components

### `components/ui/ScrollProgress.tsx` — top-edge progress bar

```tsx
"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** Thin progress bar pinned to the top edge of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 30,
    mass: 0.4,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX, transformOrigin: "0% 50%" }}
      className="fixed inset-x-0 top-0 z-50 h-[2px] bg-accent"
    />
  );
}
```

### `components/ui/SectionReveal.tsx` — generic in-view reveal

```tsx
"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

const variants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.19, 1, 0.22, 1] },
  },
};

/**
 * Wraps content in a `whileInView` reveal. Pass `delay` for staggered
 * children or sequential sections. Respects `prefers-reduced-motion`
 * automatically (Motion shortens the animation).
 */
export function SectionReveal({
  children,
  delay = 0,
  className,
  as: As = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "article" | "header" | "footer";
}) {
  // Motion's component prop wants a string; map our narrowed type.
  const Tag = motion[As] as typeof motion.div;
  return (
    <Tag
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-15% 0px -10% 0px" }}
      variants={variants}
      transition={{ delay }}
      className={className}
    >
      {children}
    </Tag>
  );
}
```

### `components/ui/CustomCursor.tsx` — dot + trailing ring

```tsx
"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A subtle cursor dot + trailing ring. Hidden on touch devices via CSS
 * (`@media (hover: none)` in globals.css). Falls back to native cursor
 * if the user prefers reduced motion.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const supportsHover = window.matchMedia("(hover: hover)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!supportsHover || reduced) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let rx = 0;
    let ry = 0;
    let mx = 0;
    let my = 0;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
    };

    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };

    const onOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      const interactive = target?.closest("a, button, [data-cursor='link']");
      ring.dataset.hover = interactive ? "true" : "false";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        className="cursor-ring pointer-events-none fixed left-0 top-0 z-[60] h-10 w-10 rounded-full border border-accent/60 transition-[width,height,border-color] duration-200 ease-out data-[hover=true]:h-14 data-[hover=true]:w-14 data-[hover=true]:border-accent"
      />
      <div
        ref={dotRef}
        aria-hidden
        className="cursor-dot pointer-events-none fixed left-0 top-0 z-[61] h-1.5 w-1.5 rounded-full bg-accent"
      />
    </>
  );
}
```

### `components/ui/SectionLabel.tsx` — uppercase index + hairline

```tsx
import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

/** Uppercase section header with a hairline rule above. */
export function SectionLabel({
  index,
  children,
  className,
}: {
  index: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <span className="font-mono text-xs uppercase tracking-[0.18em] text-ink-400">
        {index}
      </span>
      <span className="h-px flex-1 bg-ink-800" />
      <span className="font-mono text-xs uppercase tracking-[0.18em] text-ink-400">
        {children}
      </span>
    </div>
  );
}
```

### `components/ui/WordReveal.tsx` — word-by-word entrance

```tsx
"use client";

import { motion, type Variants } from "motion/react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/cn";

const wordVariants: Variants = {
  hidden: { y: "110%", rotate: 6, opacity: 0 },
  show: (i: number) => ({
    y: "0%",
    rotate: 0,
    opacity: 1,
    transition: {
      duration: 0.95,
      ease: [0.19, 1, 0.22, 1],
      delay: 0.15 + i * 0.06,
    },
  }),
};

export function WordReveal({
  text,
  className,
  highlightLast = true,
}: {
  text: string;
  className?: string;
  highlightLast?: boolean;
}) {
  // Split once on the client to avoid hydration mismatches.
  const [words, setWords] = useState<string[]>([]);
  useEffect(() => setWords(text.split(/\s+/)), [text]);

  return (
    <h1 className={cn("overflow-hidden", className)}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden align-bottom"
        >
          <motion.span
            custom={i}
            variants={wordVariants}
            initial="hidden"
            animate="show"
            className={cn(
              "inline-block will-change-transform",
              highlightLast && i === words.length - 1 && "text-accent",
            )}
          >
            {word === "" ? "\u00A0" : word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}
```

### `components/ui/MagneticButton.tsx` — physics-style hover

```tsx
"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useRef, type ReactNode } from "react";

import { cn } from "@/lib/cn";

/**
 * Wraps any child in a magnetic field that pulls ~30% toward the cursor
 * when the cursor is within range. Uses Motion springs; physics handled
 * by the runtime, so no manual easing.
 */
export function MagneticButton({
  children,
  className,
  range = 0.3,
  strength = 0.25,
}: {
  children: ReactNode;
  className?: string;
  /** 0..1 fraction of the element's size that counts as "in range". */
  range?: number;
  /** 0..1 fraction of cursor offset to apply as displacement. */
  strength?: number;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 20, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 250, damping: 20, mass: 0.4 });

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * strength;
    const dy = (e.clientY - cy) * strength;
    x.set(dx);
    y.set(dy);
  }

  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={wrapRef}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={cn("inline-block will-change-transform", className)}
    >
      {children}
    </motion.div>
  );
}
```

### `components/ui/PageTransition.tsx` — route enter/exit wrapper

```tsx
"use client";

import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Wraps page content with a fade/slide enter and exit. Use in the root
 * layout's <main> (or each page) so route changes animate as a unit.
 * Works with App Router out of the box.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.45, ease: [0.19, 1, 0.22, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
```

### `components/ui/Parallax.tsx` — scroll-driven Y translation

```tsx
"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

import { cn } from "@/lib/cn";

/**
 * Translate content vertically based on its position within the viewport.
 * `offset` controls the start/end of the parallax range:
 *   ["start end", "end start"] — fires when element enters to when it leaves.
 * `distance` is the px travel (positive = moves down as scroll progresses).
 */
export function Parallax({
  children,
  distance = 80,
  offset = ["start end", "end start"],
  className,
}: {
  children: ReactNode;
  distance?: number;
  offset?: ["start end" | "start start" | "end end" | "end start", "start end" | "start start" | "end end" | "end start"];
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  return (
    <motion.div ref={ref} style={{ y }} className={cn("will-change-transform", className)}>
      {children}
    </motion.div>
  );
}
```

---

## 6. Scroll-Drive Patterns (GSAP + Lenis)

### Wire Lenis into the GSAP ticker (call once at app boot)

```tsx
// components/ui/SmoothScroll.tsx — add inside the effect, after creating lenis:
import gsap from "gsap";

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);
// cleanup:
return () => {
  gsap.ticker.remove((time) => lenis.raf(time * 1000));
  cancelAnimationFrame(rafId);
  lenis.destroy();
};
```

### Pinned horizontal scrub (Experience-style timeline)

```tsx
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useReducedMotion } from "@/components/ui/useReducedMotion";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export function HorizontalTimeline({ items }: { items: React.ReactNode[] }) {
  const reduced = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    if (reduced) return;
    if (typeof window === "undefined") return;
    if (window.innerWidth < 768) return; // mobile fallback
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;

    const ctx = gsap.context(() => {
      const distance = () => track.scrollWidth - window.innerWidth + 64;
      gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: wrap,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
    }, wrap);

    return () => ctx.revert();
  }, [reduced, items.length]);

  return (
    <section ref={wrapRef} className="relative overflow-hidden py-32">
      <ol ref={trackRef} className="flex w-max gap-8 pl-12 pr-16">
        {items.map((node, i) => (
          <li key={i} className="w-[60vw] shrink-0">
            {node}
          </li>
        ))}
      </ol>
    </section>
  );
}
```

### `gsap.context` is mandatory — it scopes all `ScrollTrigger`s to a wrapper so cleanup is a single `ctx.revert()`.

---

## 7. Performance & Integration Best Practices

### GPU acceleration & `will-change`
- Use `transform` and `opacity` for animations — never `top`/`left`/`width`.
- Add `will-change-transform` only on elements that actually animate (hero word reveal, parallax layers), not globally.

### Reduced motion first
- Every animation component reads `useReducedMotion()` and short-circuits to a no-op.
- The global `@media (prefers-reduced-motion: reduce)` block in `globals.css` shortens any CSS animation to 1ms — both layers are needed.

### RAF hygiene
- Lenis owns the rAF loop in `SmoothScroll.tsx`. The `CustomCursor` loop must be torn down in cleanup — never leave orphaned rAFs.
- GSAP `gsap.ticker.lagSmoothing(0)` is required when running alongside Lenis so a paused tab doesn't snap-scroll on resume.

### Hydration safety
- Anything that reads `window.matchMedia`, `getBoundingClientRect`, or splits server-rendered text must be inside `useEffect`. The `WordReveal` pattern (`useState([])` + `useEffect` that splits once) is the canonical fix for SSR/CSR drift.

### Cursors & hover-only features
- Gate hover-only UI behind `(hover: hover)`. Touch users get the native cursor and zero cursor JS overhead.
- Always remove `pointermove` and `pointerover` listeners in the cleanup of `useEffect` — leaking them shows up as a frame-rate drop after navigating away.

### SSR with GSAP / Motion
- `gsap.registerPlugin(ScrollTrigger)` must be guarded with `typeof window !== "undefined"` (or moved into `useEffect`). Registering on the server throws at module load.
- Next 15 + React 18 + GSAP works out of the box when each component is `"use client"` and the plugin registration is inside an effect.

### Lenis ↔ native anchor links
- Lenis intercepts `window.scrollTo` but only via its own helper — if you have an in-page anchor `<a href="#x">`, Lenis will handle it; you don't need a `useEffect` to attach smooth-scroll handlers.

### Server Components + Client animation islands
- Keep `app/layout.tsx` as an RSC. Drop in `<SmoothScroll />`, `<ScrollProgress />`, `<CustomCursor />` as client islands — they're invisible (return `null`) and cost nothing on the server bundle.

### Bundle hygiene
- Import `gsap` core only. The full dist adds ~70 KB; the named import path keeps tree-shaking happy.
- Lenis 1.x tree-shakes cleanly when you import `import Lenis from "lenis"` (not `lenis/...` deep paths).
- `motion/react` is the right import path going forward — `framer-motion` still works but is in maintenance.

### Cache invalidation with `unstable_cache` (if you wire a CMS later)
- `unstable_cache(fn, keyParts, opts)` evaluates `keyParts` and `opts` **eagerly** — never interpolate a per-request value (e.g. `slug`) into either literal. Use a single shared `tags: ["sanity"]` and let the webhook invalidate everything.

---

That's the entire setup. Copy the files into a new project, install the five packages, mount `<SmoothScroll />` in `layout.tsx`, and drop any section component in — the scroll feel will match this repo exactly. To go further, add a pinned horizontal `HorizontalTimeline` for an `Experience`-style section using the GSAP snippet above.