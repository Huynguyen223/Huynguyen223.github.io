import React from 'react';
import { Link } from '../ui/Link';
import { Reveal } from '../ui/Reveal';
import { CategoryMedallion } from '../ui/CategoryMedallion';
import { friezePattern } from '../../lib/pattern';

const categories = [
  { name: 'Shop All', href: '/products', isPlaceholder: true },
  { name: 'Cinnamon', href: '/category/cinnamon', image: '/images/cassia-sticks.jpg', bg: '#5c2e1a', ring: '#e8c9a0' },
  { name: 'Ginger', href: '/category/ginger', image: '/images/ginger.jpg', bg: '#a8591a', ring: '#ffe3b0' },
  { name: 'Pepper', href: '/category/pepper', image: '/images/pepper.jpg', bg: '#22201f', ring: '#d8cfc4' },
  { name: 'Star Anise', href: '/category/star-anise', image: '/images/star-anise.jpg', bg: '#22284a', ring: '#f0c14b' },
  { name: 'Turmeric', href: '/category/turmeric', image: '/images/turmeric.jpg', bg: '#c97a12', ring: '#2a1a08' },
];

export function CategoryRow() {
  return (
    <section className="py-12" style={{ backgroundColor: 'var(--clr-surface)' }}>
      <div className="container mx-auto px-4">
        <Reveal>
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            fontWeight: 600,
            textAlign: 'center',
            color: 'var(--clr-text)',
            marginBottom: '2.5rem',
          }}>
            Professional Spice Supply For Global Food Businesses
          </h2>
        </Reveal>

        <div className="flex flex-wrap justify-center gap-6 md:gap-10">
          {categories.map((category, index) => (
            <Reveal key={index} delay={index * 0.06} y={16}>
              <Link
                href={category.href}
                className="flex flex-col items-center group"
              >
                {category.isPlaceholder ? (
                  <div
                    className="w-28 h-32 md:w-36 md:h-40 rounded-2xl overflow-hidden mb-3 flex items-center justify-center transition-all duration-300 group-hover:-translate-y-1"
                    style={{ backgroundColor: 'var(--clr-bg-alt)', color: 'var(--clr-text-muted)' }}
                  >
                    <span className="text-sm font-medium">All</span>
                  </div>
                ) : (
                  <div
                    className="relative w-28 h-32 md:w-36 md:h-40 rounded-2xl overflow-hidden mb-3 transition-all duration-300 group-hover:-translate-y-1"
                    style={{ backgroundColor: category.bg }}
                  >
                    {/* ornamental frieze band — original motif, echoes the reference labels' pattern strip */}
                    <div
                      className="absolute bottom-0 left-0 right-0 h-4 md:h-5"
                      style={friezePattern(category.ring!, category.bg!, 16, 16)}
                    />
                    {/* medallion photo, straddling the color panel and the pattern band */}
                    <div className="absolute inset-0 flex items-center justify-center pb-1">
                      <CategoryMedallion image={category.image!} alt={category.name} ringColor={category.ring!} size={84} />
                    </div>
                  </div>
                )}
                <span
                  className="text-sm font-semibold transition-colors group-hover:text-amber-700"
                  style={{ color: 'var(--clr-text)', fontFamily: 'var(--font-heading)' }}
                >
                  {category.name}
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
