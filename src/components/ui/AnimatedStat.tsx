import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'motion/react';

interface AnimatedStatProps {
  value: string;
  label: string;
  valueColor?: string;
  labelColor?: string;
}

export function AnimatedStat({ value, label, valueColor, labelColor }: AnimatedStatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  const match = value.match(/^([\d.]+)(.*)$/);
  const numeric = match ? parseFloat(match[1]) : null;
  const suffix = match ? match[2] : '';
  const decimals = match && match[1].includes('.') ? match[1].split('.')[1].length : 0;

  const [display, setDisplay] = useState(numeric !== null ? 0 : null);

  useEffect(() => {
    if (!inView || numeric === null) return;
    const duration = 1200;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Number((numeric * eased).toFixed(decimals)));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, numeric, decimals]);

  return (
    <div ref={ref} className="text-center">
      <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 700, color: valueColor || 'var(--clr-primary)' }}>
        {numeric !== null ? `${display}${suffix}` : value}
      </div>
      <div style={{ fontSize: '0.72rem', color: labelColor || 'var(--clr-text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '0.25rem' }}>
        {label}
      </div>
    </div>
  );
}
