import React from 'react';
import { motion } from 'motion/react';
import { Play } from 'lucide-react';
import { Reveal } from '../ui/Reveal';

/**
 * Placeholder for the upcoming company/commercial video. Swap `posterImage`
 * and wire the play button up to the real video (embed or modal player)
 * once the footage is ready — the layout and reveal spot are set.
 */
export function CompanyVideoSection() {
  return (
    <section className="py-20" style={{ backgroundColor: '#2b1710' }}>
      <div className="container mx-auto px-4">
        <Reveal className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)', color: '#faf3e8' }}>
            See NAG in Motion
          </h2>
          <p className="max-w-2xl mx-auto" style={{ color: 'rgba(250,243,232,0.65)', fontSize: '1.1rem' }}>
            From farm to factory to container — our company introduction video is coming soon.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            className="relative mx-auto rounded-2xl overflow-hidden border"
            style={{
              maxWidth: '960px',
              aspectRatio: '16/9',
              borderColor: 'rgba(250,243,232,0.15)',
              backgroundImage: 'linear-gradient(rgba(20,11,7,0.55), rgba(20,11,7,0.7)), url(/images/hero-farming.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <motion.button
                aria-label="Play video (coming soon)"
                className="flex items-center justify-center rounded-full"
                style={{ width: 84, height: 84, backgroundColor: 'rgba(250,243,232,0.95)' }}
                animate={{ scale: [1, 1.06, 1] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                whileHover={{ scale: 1.1 }}
              >
                <Play className="h-8 w-8 ml-1" style={{ color: 'var(--clr-primary)' }} fill="var(--clr-primary)" />
              </motion.button>
              <span
                className="px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest"
                style={{ backgroundColor: 'rgba(20,11,7,0.55)', color: 'rgba(250,243,232,0.85)' }}
              >
                Video Coming Soon
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
