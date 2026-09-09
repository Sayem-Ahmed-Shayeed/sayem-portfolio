# Realistic Dotted Hero Fauna Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the crude dotted hero animals with anatomically recognizable, naturally animated blue dotted bird and rabbit illustrations.

**Architecture:** Keep the artwork as decorative inline SVG within the existing hero so it inherits theme colors and requires no image download. Divide each animal into independently animated anatomical groups, while CSS controls placement, dot density, motion, breakpoints, and reduced-motion behavior.

**Tech Stack:** Astro, inline SVG, CSS keyframe animation

## Global Constraints

- Preserve the existing centered hero content and hierarchy.
- Keep the bird on the left and rabbit on the right.
- Use muted blue dots with no gold, metadata labels, or decorative copy.
- Keep the illustrations hidden from assistive technology.
- Disable all motion when `prefers-reduced-motion: reduce` is active.

---

### Task 1: Rebuild the animal illustrations

**Files:**
- Modify: `src/pages/index.astro:45`

**Interfaces:**
- Consumes: Existing `.hero-fauna`, `.hero-bird`, and `.hero-rabbit` hooks.
- Produces: `.bird-body`, `.bird-near-wing`, `.bird-tail`, `.rabbit-body`, `.rabbit-head`, `.rabbit-ear`, `.rabbit-legs`, and `.grass` SVG groups for CSS animation.

- [ ] **Step 1: Capture the current structural failure**

Run:

```bash
rg -n "bird-flight|rabbit-graze" src/pages/index.astro
```

Expected: the current SVG exposes only coarse whole-animal groups and lacks separate anatomical groups for natural motion.

- [ ] **Step 2: Replace the bird SVG anatomy**

Replace the existing bird paths with a dove-like SVG composed of a compact head and beak, rounded body, far wing, articulated near wing, and three tail feathers. Keep all fills as `url(#bird-dots)`, and group moving parts using these exact hooks:

```astro
<g class="bird-flight">
  <path class="bird-far-wing" fill="url(#bird-dots)" d="M126 77C113 55 115 37 128 24c18 15 30 31 36 49-14 7-27 8-38 4Z" />
  <path class="bird-body" fill="url(#bird-dots)" d="M77 88c28-18 53-27 77-27 28 0 50 9 68 26l24 5-23 8c-19 16-44 21-73 15-26-5-50-14-73-27Z" />
  <g class="bird-near-wing"><path fill="url(#bird-dots)" d="M130 75C101 47 92 20 104 3c28 19 48 42 59 70-12 8-23 9-33 2Z" /></g>
  <g class="bird-tail"><path fill="url(#bird-dots)" d="M87 92 42 74l30 25-48 1 53 10-31 23 49-18Z" /></g>
  <circle class="bird-eye" cx="207" cy="83" r="2.2" />
</g>
```

Use smooth Bézier curves, a clear tapered beak, and separated tail feathers. Preserve `aria-hidden="true"` on the wrapping `.hero-fauna` element.

- [ ] **Step 3: Replace the rabbit SVG anatomy**

Replace the existing rabbit paths with separate head, muzzle, ears, arched body, haunch, forelegs, hind legs, tail, eye, and nose. Use `url(#rabbit-dots)` for dotted surfaces and these exact animation hooks:

```astro
<g class="rabbit-graze">
  <g class="rabbit-body"><path fill="url(#rabbit-dots)" d="M48 119c-8-28 4-53 31-68 29-16 70-14 94 6 22 18 28 49 12 69-18 22-58 28-94 20-22-5-36-14-43-27Z" /><circle cx="48" cy="88" r="14" fill="url(#rabbit-dots)" /></g>
  <g class="rabbit-legs"><path fill="url(#rabbit-dots)" d="M75 127c14 2 24 10 29 23H69c-8 0-9-7-3-12Zm76 5c14 0 25 6 33 17h-39c-7 0-9-6-4-11Z" /></g>
  <g class="rabbit-head"><path fill="url(#rabbit-dots)" d="M166 67c13-16 36-19 54-7 16 10 22 29 13 43-9 15-31 18-49 8-17-10-23-28-18-44Z" /><path fill="url(#rabbit-dots)" d="M218 88c13-4 24 0 31 10-9 12-22 15-34 8Z" /><g class="rabbit-ear rabbit-ear-back"><path fill="url(#rabbit-dots)" d="M179 61c-3-27 4-45 20-55 10 18 9 37-2 57Z" /></g><g class="rabbit-ear rabbit-ear-front"><path fill="url(#rabbit-dots)" d="M196 58c5-27 16-42 34-47 4 20-3 38-20 54Z" /></g><circle class="rabbit-eye" cx="216" cy="77" r="2.7" /><circle class="rabbit-nose" cx="244" cy="97" r="2.4" /></g>
  <path class="grass" d="M196 151l5-18m0 18 10-24m-3 24 4-15m15 15 5-17m0 17 8-21" />
</g>
```

Keep the rabbit facing inward toward the hero and keep the grass sparse.

- [ ] **Step 4: Verify SVG structure**

Run:

```bash
rg -n "bird-near-wing|bird-tail|rabbit-ear-front|rabbit-legs|aria-hidden" src/pages/index.astro
```

Expected: every named hook appears and `.hero-fauna` remains decorative.

- [ ] **Step 5: Commit the SVG update**

```bash
git add src/pages/index.astro
git commit -m "feat: redraw realistic dotted hero fauna"
```

### Task 2: Add natural motion and responsive safeguards

**Files:**
- Modify: `src/styles/global.css:131`

**Interfaces:**
- Consumes: SVG class hooks introduced in Task 1.
- Produces: Natural bird glide, wing and tail movement; rabbit step, graze, ear twitch and nose motion; responsive placement and reduced-motion fallback.

- [ ] **Step 1: Confirm the new hooks have no complete motion rules**

Run:

```bash
rg -n "bird-near-wing|rabbit-ear-front|rabbit-legs" src/styles/global.css
```

Expected: no matches before implementation.

- [ ] **Step 2: Replace coarse animal animation rules**

Add transform-origin values matched to each SVG part and use transform/opacity-only keyframes:

```css
.bird-flight { animation:bird-glide 9s ease-in-out infinite; }
.bird-near-wing { animation:bird-wing 3.4s ease-in-out infinite; }
.bird-tail { animation:bird-tail 4.5s ease-in-out infinite; }
.rabbit-graze { animation:rabbit-step 11s ease-in-out infinite; }
.rabbit-head { animation:rabbit-graze 5.5s ease-in-out infinite; }
.rabbit-ear-front { animation:rabbit-ear 4.2s ease-in-out infinite; }
.rabbit-nose { animation:rabbit-nose .9s ease-in-out infinite; }
```

The bird animation must glide vertically by no more than 8px and rotate by no more than 2 degrees. The rabbit must travel by no more than 10px, pause before grazing, and avoid sudden timing changes.

- [ ] **Step 3: Add responsive overlap protection**

At widths up to `820px`, reduce both animals to `96px`–`112px` and lower their opacity. At widths up to `640px`, hide `.hero-fauna` completely so it cannot overlap the portrait, copy, or navigation.

```css
@media (max-width:820px) {
  .hero-fauna { opacity:.3; }
  .hero-fauna svg { width:clamp(96px,18vw,112px); }
}
@media (max-width:640px) {
  .hero-fauna { display:none; }
}
```

- [ ] **Step 4: Complete the reduced-motion fallback**

```css
@media (prefers-reduced-motion:reduce) {
  .bird-flight, .bird-near-wing, .bird-tail,
  .rabbit-graze, .rabbit-head, .rabbit-ear, .rabbit-nose {
    animation:none;
  }
}
```

- [ ] **Step 5: Run production verification**

Run:

```bash
npm run build
```

Expected: Astro reports `Complete!` and generates `/index.html` without errors.

- [ ] **Step 6: Commit the motion update**

```bash
git add src/styles/global.css
git commit -m "style: animate realistic dotted hero fauna"
```
