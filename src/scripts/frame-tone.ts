// Fills each figure frame (.fig) with the colour of its image's outer edge, so the image runs edge to edge
// whatever its background: white paper figures, cream illustrations or a dark app screenshot.
// Sets --fig-bg on the frame, and .is-dark-image when that edge is dark.

const SIZE = 24;

function edgeColour(img: HTMLImageElement): [number, number, number] | undefined {
  const canvas = document.createElement('canvas');
  canvas.width = SIZE; canvas.height = SIZE;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return;
  try {
    ctx.drawImage(img, 0, 0, SIZE, SIZE);
    const d = ctx.getImageData(0, 0, SIZE, SIZE).data;
    const edge: [number, number, number, number][] = [];
    for (let y = 0; y < SIZE; y++) {
      for (let x = 0; x < SIZE; x++) {
        if (x > 0 && x < SIZE - 1 && y > 0 && y < SIZE - 1) continue;
        const i = (y * SIZE + x) * 4;
        if (d[i + 3] < 128) continue;                     // transparent margins say nothing about the colour
        edge.push([d[i], d[i + 1], d[i + 2], 0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2]]);
      }
    }
    if (!edge.length) return;
    // the median by brightness ignores a scrollbar or a coloured corner
    edge.sort((a, b) => a[3] - b[3]);
    const [r, g, b] = edge[Math.floor(edge.length / 2)];
    return [r, g, b];
  } catch {
    return;                                              // unreadable image: keep the default frame colour
  }
}

export function toneFrames(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>('.fig').forEach(fig => {
    const img = fig.querySelector('img');
    if (!img || fig.dataset.toned) return;
    fig.dataset.toned = '1';
    const apply = () => {
      const c = edgeColour(img);
      if (!c) return;
      fig.style.setProperty('--fig-bg', `rgb(${c.join(' ')})`);
      fig.classList.toggle('is-dark-image', 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2] < 110);
    };
    if (img.complete && img.naturalWidth) apply();
    else img.addEventListener('load', apply, { once: true });
  });
}
