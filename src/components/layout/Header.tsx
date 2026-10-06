import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Search, Menu, Mail, Phone } from 'lucide-react';
import { Link } from '../ui/Link';
import { contactInfo } from '../../data/mockData';
import { friezePattern } from '../../lib/pattern';

export function Header() {
  const [scrolled, setScrolled] = useState(() => typeof window !== 'undefined' && window.scrollY > 24);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(100, Math.max(0, (window.scrollY / max) * 100)) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full shadow-sm"
      style={{ background: 'linear-gradient(to bottom, #2b1710, #1f130d)', backdropFilter: 'blur(8px)' }}>
      {/* Top bar */}
      <motion.div
        className="hidden md:flex items-center justify-end gap-6 px-6 text-xs overflow-hidden"
        style={{ background: 'linear-gradient(to right, var(--clr-primary), #9a2124)', color: '#ffffff' }}
        animate={{ height: scrolled ? 0 : 30, paddingTop: scrolled ? 0 : 6, paddingBottom: scrolled ? 0 : 6, opacity: scrolled ? 0 : 1 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
      >
        <a href={`tel:${contactInfo.phone.replace(/\s+/g, '')}`} className="flex items-center gap-1.5 whitespace-nowrap transition-opacity hover:opacity-75">
          <Phone className="h-3 w-3" /> {contactInfo.phone}
        </a>
        <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-1.5 whitespace-nowrap transition-opacity hover:opacity-75">
          <Mail className="h-3 w-3" /> {contactInfo.email}
        </a>
      </motion.div>

      <motion.div
        className="container mx-auto px-4 flex items-center justify-between"
        animate={{ height: scrolled ? 60 : 64 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
      >
        {/* Left: hamburger + logo */}
        <div className="flex items-center gap-4">
          <button className="md:hidden p-2 -ml-2" style={{ color: 'rgba(250,243,232,0.75)' }}>
            <Menu className="h-6 w-6" />
          </button>
          <Link href="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center transition-transform hover:scale-[1.03]">
            <motion.img
              src="/images/nag-logo.svg"
              alt="NAG - Farm to Flavour"
              className="w-auto h-11"
              animate={{ height: scrolled ? 36 : 44 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
            />
          </Link>
        </div>

        {/* Center nav */}
        <nav className="hidden md:flex items-center gap-8">
          {[
            { label: 'Home', href: '/' },
            { label: 'Export Products', href: '/products' },
            { label: 'News', href: '/articles' },
            { label: 'Contact Us', href: '/contact' },
          ].map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="text-sm font-medium tracking-wide transition-colors relative group"
              style={{ color: '#faf3e8', fontFamily: 'var(--font-body)' }}
            >
              {label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300"
                style={{ background: 'linear-gradient(to right, var(--clr-primary), var(--clr-accent))' }} />
            </Link>
          ))}
        </nav>

        {/* Right: search */}
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-full transition-colors hover:bg-white/10" style={{ color: 'rgba(250,243,232,0.75)' }}>
            <Search className="h-5 w-5" />
          </button>
          <Link
            href="/contact"
            className="hidden sm:inline-flex items-center px-5 py-2 rounded text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
            style={{
              background: 'linear-gradient(135deg, var(--clr-primary), #9a2124)',
              fontFamily: 'var(--font-body)',
              boxShadow: '0 6px 16px -4px rgba(127,20,22,0.45)',
            }}
          >
            Get a Quote
          </Link>
        </div>
      </motion.div>

      {/* Ornamental frieze band + scroll progress */}
      <div className="relative h-[10px] w-full overflow-hidden" style={friezePattern('#7f1416', '#396d34')}>
        <motion.div
          className="absolute inset-y-0 right-0"
          style={{ backgroundColor: 'rgba(8,6,4,0.55)' }}
          animate={{ width: `${100 - progress}%` }}
          transition={{ duration: 0.1, ease: 'linear' }}
        />
      </div>
    </header>
  );
}
