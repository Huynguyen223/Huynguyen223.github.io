import React from 'react';
import { Reveal } from '../ui/Reveal';

const factoryImages = [
  { id: 1, src: '/images/container-loading.jpg', alt: 'Container Loading Area' },
  { id: 2, src: '/images/lab-testing-vo.svg', alt: 'Quality Control Laboratory' },
  { id: 3, src: '/images/port-logistics.svg', alt: 'Port Logistics and Shipping' },
  { id: 4, src: '/images/factory-interior.svg', alt: 'Advanced Milling Machinery' },
];

export function FactoryGallery() {
  return (
    <section className="py-20" style={{ backgroundColor: '#2b1710' }}>
      <div className="container mx-auto px-4">
        <Reveal className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)', color: '#faf3e8' }}>
            Factory Infrastructure &amp; Hygiene
          </h2>
          <p className="max-w-2xl mx-auto" style={{ color: 'rgba(250,243,232,0.65)', fontSize: '1.1rem' }}>
            Our state-of-the-art processing facilities are designed to handle bulk volumes with uncompromising hygiene, ensuring every FCL meets global standards.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {factoryImages.map((img, index) => (
            <Reveal key={img.id} delay={index * 0.08}>
              <div className="group relative rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow" style={{ aspectRatio: '4/3', backgroundColor: 'var(--clr-surface)' }}>
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                  <div className="p-4 w-full text-white font-medium">
                    {img.alt}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
