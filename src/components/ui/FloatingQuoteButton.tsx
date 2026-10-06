import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useLocation } from 'react-router-dom';
import { FileText } from 'lucide-react';
import { Link } from './Link';

export function FloatingQuoteButton() {
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (location.pathname === '/contact') return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-5 right-5 z-40"
          initial={{ opacity: 0, y: 24, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.9 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link
            href="/contact"
            className="flex items-center gap-2 pl-4 pr-5 py-3.5 rounded-full text-sm font-semibold text-white shadow-lg transition-transform hover:-translate-y-0.5"
            style={{ backgroundColor: 'var(--clr-primary)', boxShadow: '0 8px 20px -6px rgba(127,20,22,0.55)' }}
          >
            <FileText className="w-4 h-4" /> Get a Quote
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
