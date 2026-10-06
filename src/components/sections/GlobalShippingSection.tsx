import React from 'react';
import { companyInfo } from '../../data/mockData';
import { Link } from '../ui/Link';
import { Reveal } from '../ui/Reveal';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export function GlobalShippingSection() {
  return (
    <section className="py-20" style={{ backgroundColor: '#2b1710' }}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <Reveal delay={0} y={32}>
            <div className="rounded-xl overflow-hidden shadow-lg border" style={{ borderColor: 'rgba(250,243,232,0.15)', aspectRatio: '4/3' }}>
              <img
                src={companyInfo.image}
                alt={companyInfo.altText}
                className="w-full h-full object-cover"
              />
            </div>
          </Reveal>

          {/* Content */}
          <Reveal delay={0.15}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)', color: '#faf3e8' }}>
              {companyInfo.title}
            </h2>
            <p className="mb-6" style={{ color: 'rgba(250,243,232,0.65)', fontSize: '1.05rem', lineHeight: 1.8 }}>
              {companyInfo.description}
            </p>

            <ul className="space-y-3 mb-8">
              {companyInfo.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 mt-0.5 flex-shrink-0" style={{ color: 'var(--clr-accent)' }} />
                  <span style={{ color: 'rgba(250,243,232,0.9)', fontSize: '0.95rem' }}>{feature}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded text-sm font-semibold text-white transition-all hover:opacity-90"
              style={{ backgroundColor: 'var(--clr-primary)' }}
            >
              Discuss Container Loads <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
