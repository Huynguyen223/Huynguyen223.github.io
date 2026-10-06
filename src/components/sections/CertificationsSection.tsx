import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { certifications } from '../../data/mockData';
import { Image } from '../ui/Image';
import { CertificateViewer } from '../ui/CertificateViewer';
import { Reveal } from '../ui/Reveal';
import { ShieldCheck } from 'lucide-react';

export function CertificationsSection() {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section className="py-16" style={{ backgroundColor: '#2b1710' }}>
      <div className="container mx-auto px-4">
        <Reveal className="text-center mb-10">
          <img src="/images/nag-icon.svg" alt="" className="h-10 w-10 mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: '#faf3e8' }}>Quality & Certifications</h2>
          <p className="max-w-2xl mx-auto" style={{ color: 'rgba(250,243,232,0.65)' }}>
            NA Spice Group is independently audited and certified to the highest international food safety and
            quality standards. Click any certificate below to view the official document.
          </p>
        </Reveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 md:gap-8">
          {certifications.map((cert, index) => (
            <Reveal key={cert.id} delay={index * 0.07} y={16}>
              <button
                onClick={() => setActiveId(cert.id)}
                className="group flex flex-col items-center gap-3 text-left w-full"
              >
                <div className="relative w-full aspect-square max-w-[140px] bg-white rounded-full shadow-lg overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1 group-hover:scale-105 p-6">
                  <Image
                    src={cert.badge}
                    alt={`${cert.name} logo`}
                    fill
                    className="object-contain p-6"
                  />
                  <div className="absolute inset-0 rounded-full flex items-end justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: 'linear-gradient(to top, rgba(41,37,36,0.75), transparent 55%)' }}>
                    <span className="pb-3 flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-white">
                      <ShieldCheck className="w-3 h-3" /> View
                    </span>
                  </div>
                </div>
                <span className="text-sm font-semibold text-center leading-snug" style={{ color: 'rgba(250,243,232,0.85)' }}>{cert.name}</span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeId && (
          <CertificateViewer
            certifications={certifications}
            initialId={activeId}
            title="Quality & Certifications"
            onClose={() => setActiveId(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
