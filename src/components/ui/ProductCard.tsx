import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { Product } from '../../types';
import { Button } from './Button';
import { Image } from './Image';
import { FileText, ArrowRightLeft, ShoppingCart, ShieldCheck } from 'lucide-react';
import { Link } from './Link';
import { CertificateViewer } from './CertificateViewer';
import { certifications } from '../../data/mockData';

interface ProductCardProps {
  product: Product;
  buttonStyle?: 'doc-tiep' | 'chon' | 'mixed';
}

export function ProductCard({ product, buttonStyle }: ProductCardProps) {
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
          <>
            <button
              onClick={() => setShowCertificate(true)}
              title="View Certificate"
              className="absolute top-2 right-2 flex items-center justify-center w-8 h-8 rounded-full text-white shadow-md md:hidden"
              style={{ backgroundColor: 'var(--clr-primary)' }}
            >
              <ShieldCheck className="w-4 h-4" />
            </button>
            <button
              onClick={() => setShowCertificate(true)}
              className="absolute bottom-0 left-0 right-0 items-center justify-center gap-1.5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex"
              style={{ backgroundColor: 'rgba(41,37,36,0.75)' }}
            >
              <ShieldCheck className="w-3.5 h-3.5" /> View Certificate
            </button>
          </>
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
        <Link href={`/products/${product.slug || product.id}`} className="font-bold text-lg text-stone-900 mb-4 group-hover:opacity-75 transition-opacity">
          {product.name}
        </Link>
        
        <div className="mt-auto pt-4">
          {buttonStyle === 'doc-tiep' && (
            <Link 
              href={`/products/${product.slug || product.id}`}
              className="block w-full text-white text-sm font-bold uppercase py-3 px-4 text-center transition-opacity hover:opacity-90"
              style={{ backgroundColor: 'var(--clr-primary)' }}
            >
              READ MORE
            </Link>
          )}
          {buttonStyle === 'chon' && (
            <Link 
              href={`/products/${product.slug || product.id}`}
              className="flex items-center justify-center gap-2 w-full text-white text-sm font-bold uppercase py-3 px-4 text-center transition-opacity hover:opacity-90"
              style={{ backgroundColor: 'var(--clr-primary)' }}
            >
              <ShoppingCart className="w-4 h-4" /> ADD TO CART
            </Link>
          )}
          {buttonStyle === 'mixed' && (
            <Link 
              href={`/products/${product.slug || product.id}`}
              className="block w-full text-white text-sm font-bold uppercase py-3 px-4 text-center transition-opacity hover:opacity-90"
              style={{ backgroundColor: 'var(--clr-primary)' }}
            >
              READ MORE
            </Link>
          )}
          {!buttonStyle && (
            <div className="flex flex-col gap-2 pt-4 border-t" style={{ borderColor: 'var(--clr-border)' }}>
              <Link 
                href="/contact"
                className="w-full py-2.5 rounded text-sm font-semibold text-white text-center transition-opacity hover:opacity-90 flex items-center justify-center gap-2"
                style={{ backgroundColor: 'var(--clr-primary)' }}
              >
                <FileText className="w-4 h-4" /> Request Market Quote
              </Link>
              <div className="group relative inline-block text-center mt-1">
                <span className="text-xs font-semibold uppercase tracking-wider cursor-help border-b border-dashed"
                  style={{ color: 'var(--clr-accent-red)', borderBottomColor: 'var(--clr-accent-red)' }}>
                  Flexible Pricing
                </span>
                <div className="invisible group-hover:visible absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 text-xs text-white bg-gray-800 rounded shadow-lg z-10">
                  Prices are market-responsive to ensure the best value for bulk international trade.
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
