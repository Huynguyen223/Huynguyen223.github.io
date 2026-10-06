import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { X, ShieldCheck, ExternalLink } from 'lucide-react';
import { Certification } from '../../types';

interface CertificateViewerProps {
  certifications: Certification[];
  title?: string;
  initialId?: string;
  onClose: () => void;
}

export function CertificateViewer({ certifications, title, initialId, onClose }: CertificateViewerProps) {
  const [activeId, setActiveId] = useState(initialId || certifications[0]?.id);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const active = certifications.find(c => c.id === activeId) || certifications[0];
  if (!active) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(28,25,23,0.75)' }}
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col"
        onClick={e => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-4 px-5 py-4 border-b" style={{ borderColor: 'var(--clr-border)' }}>
          <div className="flex items-center gap-3 min-w-0">
            <img src="/images/nag-icon.svg" alt="" className="h-8 w-8 flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-widest truncate" style={{ color: 'var(--clr-primary)' }}>
                {title || 'Official Certifications'}
              </p>
              <p className="text-sm font-medium truncate" style={{ color: 'var(--clr-text-muted)' }}>
                Issued to NA Spice Group Joint Stock Company
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex-shrink-0 p-2 rounded-full hover:bg-stone-100 transition-colors"
            style={{ color: 'var(--clr-text-muted)' }}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex flex-col md:flex-row overflow-hidden flex-grow">
          {/* Image */}
          <div className="flex-grow overflow-auto flex items-start justify-center p-4" style={{ backgroundColor: 'var(--clr-bg-alt)' }}>
            <img
              src={active.logo}
              alt={`${active.name} certificate scan`}
              className="max-w-full h-auto rounded shadow-sm border"
              style={{ borderColor: 'var(--clr-border)' }}
            />
          </div>

          {/* Sidebar */}
          <div className="md:w-72 flex-shrink-0 border-t md:border-t-0 md:border-l overflow-y-auto" style={{ borderColor: 'var(--clr-border)' }}>
            <div className="p-4 border-b" style={{ borderColor: 'var(--clr-border)' }}>
              <div className="flex items-start gap-2 mb-2">
                <ShieldCheck className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--clr-accent)' }} />
                <h3 className="text-sm font-bold" style={{ color: 'var(--clr-text)' }}>{active.name}</h3>
              </div>
              <dl className="text-xs space-y-1.5 pl-6" style={{ color: 'var(--clr-text-muted)' }}>
                <div><dt className="inline font-semibold">Issuer: </dt><dd className="inline">{active.issuer}</dd></div>
                <div><dt className="inline font-semibold">Certificate No: </dt><dd className="inline">{active.certNumber}</dd></div>
                <div><dt className="inline font-semibold">Valid until: </dt><dd className="inline">{active.validUntil}</dd></div>
              </dl>
              <a
                href={active.logo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-3 ml-6 text-xs font-semibold hover:underline"
                style={{ color: 'var(--clr-primary)' }}
              >
                Open full size <ExternalLink className="h-3 w-3" />
              </a>
            </div>

            {certifications.length > 1 && (
              <div className="p-4">
                <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--clr-text-muted)' }}>
                  All certificates ({certifications.length})
                </p>
                <div className="flex flex-col gap-2">
                  {certifications.map(cert => (
                    <button
                      key={cert.id}
                      onClick={() => setActiveId(cert.id)}
                      className="text-left text-xs font-medium px-3 py-2 rounded transition-colors"
                      style={{
                        backgroundColor: cert.id === active.id ? 'var(--clr-primary)' : 'var(--clr-bg-alt)',
                        color: cert.id === active.id ? '#ffffff' : 'var(--clr-text)',
                      }}
                    >
                      {cert.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
