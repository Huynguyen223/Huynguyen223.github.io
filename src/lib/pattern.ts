/**
 * Original triangle-frieze motif (not a copy of any reference/template art) —
 * an alternating two-color zigzag band, used as a decorative CSS background
 * for header/footer/tile accent strips.
 */
export function friezePattern(color1: string, color2: string, width = 24, height = 14) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <polygon points="0,${height} ${width / 4},0 ${width / 2},${height}" fill="${color1}"/>
    <polygon points="${width / 2},${height} ${(3 * width) / 4},0 ${width},${height}" fill="${color2}"/>
  </svg>`;
  return {
    backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(svg)}")`,
    backgroundRepeat: 'repeat-x' as const,
    backgroundSize: `${width}px ${height}px`,
  };
}

/**
 * A tileable mountain-ridge silhouette — evokes the misty highland terraces
 * of Yen Bai / Lao Cai (where the cassia is actually grown), used to layer
 * up a "mountain range" section divider. `peaks` are relative heights (0-1)
 * across the tile; the first and last value must match so it repeats
 * seamlessly.
 */
export function mountainRidge(color: string, width: number, height: number, peaks: number[]) {
  const step = width / (peaks.length - 1);
  const pts = peaks.map((p, i) => `${Math.round(i * step)},${Math.round(height - p * height)}`).join(' L');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none">
    <path d="M0,${height} L${pts} L${width},${height} Z" fill="${color}"/>
  </svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

function hexToRgb(hex: string) {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map(c => c + c).join('') : h;
  const num = parseInt(full, 16);
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
}

/** Linear-interpolates between two hex colors (t: 0 = color1, 1 = color2). */
export function mixHex(color1: string, color2: string, t: number) {
  const c1 = hexToRgb(color1);
  const c2 = hexToRgb(color2);
  const r = Math.round(c1.r + (c2.r - c1.r) * t);
  const g = Math.round(c1.g + (c2.g - c1.g) * t);
  const b = Math.round(c1.b + (c2.b - c1.b) * t);
  return `rgb(${r}, ${g}, ${b})`;
}

/**
 * Original diamond + corner-dot tile motif, for use as a subtle all-over
 * texture (e.g. behind a card or panel).
 */
export function diamondPattern(diamond: string, dot: string, size = 40) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    <path d="M${size / 2} 4 L${size - 4} ${size / 2} L${size / 2} ${size - 4} L4 ${size / 2} Z" fill="${diamond}"/>
    <circle cx="0" cy="0" r="2.5" fill="${dot}"/>
    <circle cx="${size}" cy="0" r="2.5" fill="${dot}"/>
    <circle cx="0" cy="${size}" r="2.5" fill="${dot}"/>
    <circle cx="${size}" cy="${size}" r="2.5" fill="${dot}"/>
  </svg>`;
  return {
    backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(svg)}")`,
    backgroundRepeat: 'repeat' as const,
    backgroundSize: `${size}px ${size}px`,
  };
}
