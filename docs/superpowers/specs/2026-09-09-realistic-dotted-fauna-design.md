# Realistic Dotted Hero Fauna

## Goal

Refine the existing blue dotted bird and rabbit in the portfolio hero so their anatomy and movement feel natural while preserving the quiet academic visual language.

## Visual direction

- Keep both animals as muted-blue dotted illustrations rather than photographic cutouts.
- Use anatomically recognizable silhouettes with layered forms and dot-density shading for depth.
- Keep the bird on the left and the rabbit on the right, outside the central portrait and text.
- Use no gold, metadata labels, or decorative copy.

## Bird

- Use dove-like proportions: compact head, tapered beak, rounded chest, layered wings, and separated tail feathers.
- Build the silhouette from several SVG paths so the near wing can move independently.
- Animate a slow glide with restrained wing movement and slight body lift. Avoid rapid flapping.

## Rabbit

- Use realistic proportions for the head, muzzle, arched back, haunch, forelegs, hind legs, ears, eye, and tail.
- Animate a short, slow forward step followed by a grazing pause.
- During grazing, lower the head, move the nose subtly, and twitch one ear.
- Keep the grass minimal and in the same blue family.

## Layout and behavior

- Preserve the current hero content, spacing, and centered hierarchy.
- Keep both illustrations behind and away from interactive content.
- Reduce their size and opacity on small screens; hide them if the available width would overlap the hero copy.
- Use only CSS transforms and opacity for animation performance.
- Disable all animal motion when `prefers-reduced-motion: reduce` is active.

## Verification

- Run the Astro production build.
- Check desktop and mobile breakpoints for overlap and clipping.
- Confirm that the illustrations remain decorative and are hidden from assistive technology.
