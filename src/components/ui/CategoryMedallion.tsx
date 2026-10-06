import React from 'react';
import { Image } from './Image';

interface CategoryMedallionProps {
  image: string;
  alt: string;
  ringColor: string;
  size?: number;
}

/**
 * A photo framed in a dotted ornamental ring — an original motif (not the
 * illustrated reference art) built from plain circles/strokes so it stays
 * lightweight and recolorable per category.
 */
export function CategoryMedallion({ image, alt, ringColor, size = 76 }: CategoryMedallionProps) {
  const ringSize = size + 22;
  const dots = 18;
  const radius = ringSize / 2 - 3;
  const center = ringSize / 2;

  return (
    <div className="relative flex items-center justify-center" style={{ width: ringSize, height: ringSize }}>
      <svg
        width={ringSize}
        height={ringSize}
        className="absolute inset-0 transition-transform duration-500 group-hover:rotate-[18deg]"
      >
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={ringColor}
          strokeWidth="1"
          strokeDasharray="1 7"
          opacity={0.85}
        />
        {Array.from({ length: dots }).map((_, i) => {
          const angle = (i / dots) * 2 * Math.PI;
          const x = center + radius * Math.cos(angle);
          const y = center + radius * Math.sin(angle);
          return <circle key={i} cx={x} cy={y} r={1.6} fill={ringColor} />;
        })}
      </svg>
      <div
        className="relative rounded-full overflow-hidden border-2"
        style={{ width: size, height: size, borderColor: ringColor }}
      >
        <Image src={image} alt={alt} fill className="object-cover" />
      </div>
    </div>
  );
}
