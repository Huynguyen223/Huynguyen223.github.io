import React from 'react';
import { mountainRidge, mixHex } from '../../lib/pattern';

interface SectionSeamProps {
  /** Background color of the section above the seam */
  from: string;
  /** Background color of the section below the seam */
  to: string;
  /** Height of the mountain-range zone, in px */
  height?: number;
  /** Optional warm mist tint, drifting behind the ridgelines */
  mist?: string;
}

// Relative peak heights (0-1); first/last values match so each layer tiles seamlessly.
const BACK_PEAKS = [0.1, 0.3, 0.16, 0.38, 0.2, 0.32, 0.14, 0.1];
const MID_PEAKS = [0.06, 0.4, 0.18, 0.48, 0.26, 0.42, 0.16, 0.06];
const FRONT_PEAKS = [0.03, 0.52, 0.12, 0.62, 0.18, 0.56, 0.08, 0.03];

export function SectionSeam({ from, to, height = 150, mist }: SectionSeamProps) {
  const backColor = mixHex(from, to, 0.3);
  const midColor = mixHex(from, to, 0.62);
  const backH = Math.round(height * 0.85);
  const midH = Math.round(height * 0.62);
  const frontH = Math.round(height * 0.4);

  return (
    <div aria-hidden className="relative w-full overflow-hidden" style={{ height, backgroundColor: from }}>
      {mist && (
        <div
          className="absolute inset-0"
          style={{ background: `radial-gradient(ellipse 65% 70% at 50% 35%, ${mist}33 0%, ${mist}00 70%)` }}
        />
      )}
      <div
        className="absolute inset-x-0 bottom-0"
        style={{
          height: backH,
          backgroundImage: mountainRidge(backColor, 340, backH, BACK_PEAKS),
          backgroundRepeat: 'repeat-x',
          backgroundSize: `340px ${backH}px`,
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0"
        style={{
          height: midH,
          backgroundImage: mountainRidge(midColor, 280, midH, MID_PEAKS),
          backgroundRepeat: 'repeat-x',
          backgroundSize: `280px ${midH}px`,
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0"
        style={{
          height: frontH,
          backgroundImage: mountainRidge(to, 220, frontH, FRONT_PEAKS),
          backgroundRepeat: 'repeat-x',
          backgroundSize: `220px ${frontH}px`,
        }}
      />
    </div>
  );
}
