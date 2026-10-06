import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { productGrades, certifications } from '../../data/mockData';
import { Product } from '../../types';
import { Image } from '../ui/Image';
import { Link } from '../ui/Link';
import { CertificateViewer } from '../ui/CertificateViewer';
import { Reveal } from '../ui/Reveal';
import { ShieldCheck } from 'lucide-react';

function FlavorTile({ product }: { product: Product }) {
  const [showCertificate, setShowCertificate] = useState(false);
  const productCertifications = certifications.filter(c => product.certificateIds?.includes(c.id));

  return (
    <div className="group flex flex-col bg-white overflow-hidden border border-stone-200 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="relative aspect-square overflow-hidden bg-stone-100">
        <Link href={`/products/${product.slug || product.id}`} className="absolute inset-0 block">
          <Image
            src={product.image}
            alt={product.altText}
            fill
            className="transition-transform duration-500 group-hover:scale-105 object-cover"
          />
        </Link>
        {productCertifications.length > 0 && (
          <button
            onClick={() => setShowCertificate(true)}
            className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white md:opacity-0 md:group-hover:opacity-100 transition-opacity"
            style={{ backgroundColor: 'rgba(41,37,36,0.75)' }}
          >
            <ShieldCheck className="w-3.5 h-3.5" /> View Certificate
          </button>
        )}
      </div>
      <AnimatePresence>
        {showCertificate && (
          <CertificateViewer
            certifications={productCertifications}
            title={`Certifications — ${product.name}`}
            onClose={() => setShowCertificate(false)}
          />
        )}
      </AnimatePresence>

      <div className="p-5 flex flex-col flex-grow text-center">
        <span className="text-xs text-stone-500 uppercase tracking-wider mb-2">
          Cinnamon
        </span>
        <Link href={`/products/${product.slug || product.id}`} className="font-bold text-lg text-stone-900 mb-4 group-hover:opacity-75 transition-opacity">
          {product.name}
        </Link>

        <div className="mt-auto pt-4">
          <Link
            href={`/products/${product.slug || product.id}`}
            className="block w-full text-white text-sm font-bold uppercase py-3 px-4 text-center transition-opacity hover:opacity-90"
            style={{ backgroundColor: 'var(--clr-primary)' }}
          >
            READ MORE
          </Link>
        </div>
      </div>
    </div>
  );
}

export function FlavorSpices() {
  // Filter the exact 4 products requested
  const products = productGrades.filter(p =>
    ['Cigarettes cassia', 'Cassia Powder', 'Cassia Broken', 'Whole Cassia'].includes(p.name)
  );

  return (
    <section className="py-16" style={{ backgroundColor: '#2b1710' }}>
      <div className="container mx-auto px-4">
        <Reveal className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)', color: '#faf3e8' }}>
            Discover Our Flavor Spices
          </h2>
          <div className="flex justify-center">
            {/* Decorative red squiggly/wavy underline */}
            <svg width="120" height="12" viewBox="0 0 120 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 6C10 6 10 1 20 1C30 1 30 11 40 11C50 11 50 1 60 1C70 1 70 11 80 11C90 11 90 1 100 1C110 1 110 6 120 6" stroke="var(--clr-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <Reveal key={product.id} delay={index * 0.08}>
              <FlavorTile product={product} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
