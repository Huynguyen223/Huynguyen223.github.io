import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { heroData } from '../../data/mockData';
import { Link } from '../ui/Link';
import { AnimatedStat } from '../ui/AnimatedStat';

const BACKGROUND_IMAGES = [
  '/images/hero-farming.jpg',
  '/images/cassia-sticks.jpg',
  '/images/star-anise.jpg',
  '/images/pepper.jpg',
  '/images/container-loading.jpg'
];

export function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % BACKGROUND_IMAGES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full flex items-center justify-center overflow-hidden"
      style={{ minHeight: '88vh', backgroundColor: '#2b1710' }}>
      {/* Background Images */}
      {BACKGROUND_IMAGES.map((img, index) => (
         <div
           key={img}
           className="absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out"
           style={{
             backgroundImage: `url(${img})`,
             backgroundSize: 'cover',
             backgroundPosition: 'center',
             opacity: index === currentImageIndex ? 0.55 : 0,
           }}
         />
      ))}
      {/* Gradient overlay — dark cassia bark & star anise tones */}
      <div className="absolute inset-0 z-10"
        style={{ background: 'linear-gradient(to top, rgba(26,14,10,0.96) 0%, rgba(58,26,18,0.85) 45%, rgba(74,32,20,0.5) 100%)' }} />

      {/* Content */}
      <motion.div
        className="container mx-auto px-4 relative z-20 text-center flex flex-col items-center py-24"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
        }}
      >
        <motion.span
          variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block mb-6 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-[0.25em] shadow-lg"
          style={{ backgroundColor: 'var(--clr-primary)', color: '#ffffff', border: '1px solid var(--clr-primary)', boxShadow: '0 4px 6px -1px rgba(127,20,22, 0.4)' }}>
          B2B Wholesale · Premium Cinnamon Exporter
        </motion.span>

        <motion.h1
          variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(2.6rem, 6vw, 5.5rem)',
          fontWeight: 800,
          color: '#faf3e8',
          lineHeight: 1.15,
          maxWidth: '900px',
          marginBottom: '1.5rem',
          letterSpacing: '0.01em',
        }}>
          {heroData.headline}
        </motion.h1>

        <motion.p
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
          color: '#d9c3ac',
          maxWidth: '680px',
          marginBottom: '2.5rem',
          lineHeight: 1.8,
          fontWeight: 400,
        }}>
          {heroData.subheadline}
        </motion.p>

        <motion.div
          variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 rounded text-base font-semibold text-white transition-all hover:opacity-90 hover:-translate-y-0.5 shadow-lg"
            style={{ backgroundColor: 'var(--clr-primary)', fontFamily: 'var(--font-body)', transition: 'transform 0.2s, opacity 0.2s' }}
          >
            {heroData.ctaText}
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center justify-center px-8 py-4 rounded text-base font-semibold transition-all hover:-translate-y-0.5"
            style={{
              backgroundColor: 'rgba(255,255,255,0.06)',
              border: '1.5px solid rgba(250,243,232,0.35)',
              color: '#faf3e8',
              fontFamily: 'var(--font-body)',
              transition: 'transform 0.2s, background-color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.14)')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.06)')}
          >
            View Product Catalogue
          </Link>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 grid grid-cols-3 gap-8 md:gap-16 border-t pt-8"
          style={{ borderColor: 'rgba(250,243,232,0.18)', maxWidth: '600px', width: '100%' }}>
          {[
            { value: '4.0%+', label: 'Volatile Oil Content' },
            { value: '15+', label: 'Years Exporting' },
            { value: 'FCL', label: 'Container-Load Ready' },
          ].map(({ value, label }) => (
            <AnimatedStat key={label} value={value} label={label} valueColor="#e8a96b" labelColor="rgba(250,243,232,0.65)" />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
