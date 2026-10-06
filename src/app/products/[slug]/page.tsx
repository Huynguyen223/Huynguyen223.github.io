import React, { useEffect, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom';
import { Header } from '../../../components/layout/Header';
import { Footer } from '../../../components/layout/Footer';
import { productGrades, certifications } from '../../../data/mockData';
import { Image } from '../../../components/ui/Image';
import { Link } from '../../../components/ui/Link';
import { CertificateViewer } from '../../../components/ui/CertificateViewer';
import { Product } from '../../../types';
import { Share2, Facebook, Twitter, Linkedin, Mail, ChevronRight, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState<'description'>('description');
  const [showCertificate, setShowCertificate] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const foundProduct = productGrades.find(p => p.slug === slug || p.id === slug);
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      navigate('/');
    }
  }, [slug, navigate]);

  if (!product) return null;

  const productCertifications = certifications.filter(c => product.certificateIds?.includes(c.id));

  const relatedProducts = product.relatedProductIds
    ? productGrades.filter(p => product.relatedProductIds!.includes(p.id)).slice(0, 3)
    : productGrades.filter(p => p.categoryId === product.categoryId && p.id !== product.id).slice(0, 3);

  const categoryName =
    product.categoryId === '1' ? 'Cinnamon' :
      product.categoryId === '3' ? 'Pepper' :
        product.categoryId === '5' ? 'Turmeric' : 'Spices';

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--clr-bg)', fontFamily: 'var(--font-body)' }}>
      <Header />

      {/* ── Hero Banner ── */}
      <div className="relative w-full overflow-hidden" style={{ height: '220px', backgroundColor: 'var(--clr-bg)' }}>
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(/images/hero-farming.jpg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.15,
          }}
        />
        <div className="absolute inset-0 z-10" style={{ background: 'linear-gradient(to right, rgba(250,250,249,0.9) 0%, rgba(250,250,249,0.4) 100%)' }} />
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-end pb-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-sm" style={{ color: 'var(--clr-text-muted)' }}>
            <span className="cursor-pointer hover:text-amber-600 transition-colors" onClick={() => navigate('/')}>Home</span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="cursor-pointer hover:text-amber-600 transition-colors" onClick={() => navigate('/products')}>Products</span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span style={{ color: 'var(--clr-text)', fontWeight: 600 }}>{product.name}</span>
          </nav>
        </div>
      </div>

      <main className="flex-grow">
        {/* ── Product Split View ── */}
        <section className="py-12" style={{ backgroundColor: 'var(--clr-surface)' }}>
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Left: Image */}
              <div className="group relative rounded-xl overflow-hidden border shadow-sm"
                style={{ borderColor: 'var(--clr-border)', backgroundColor: 'var(--clr-bg-alt)', aspectRatio: '4/3' }}>
                <img
                  src={product.image}
                  alt={product.altText}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                {productCertifications.length > 0 && (
                  <>
                    <button
                      onClick={() => setShowCertificate(true)}
                      title="View Certificate"
                      className="absolute top-3 right-3 flex items-center justify-center w-9 h-9 rounded-full text-white shadow-md md:hidden"
                      style={{ backgroundColor: 'var(--clr-primary)' }}
                    >
                      <ShieldCheck className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setShowCertificate(true)}
                      className="absolute bottom-0 left-0 right-0 items-center justify-center gap-2 py-3 text-sm font-semibold uppercase tracking-wider text-white opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex"
                      style={{ backgroundColor: 'rgba(41,37,36,0.75)' }}
                    >
                      <ShieldCheck className="w-4 h-4" /> View Certificate
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

              {/* Right: Info */}
              <div className="flex flex-col gap-4">
                {/* Category */}
                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--clr-primary)' }}>
                    Category:{' '}
                    <Link href="/products" style={{ color: 'var(--clr-primary)' }}>
                      {categoryName}
                    </Link>
                  </span>
                </div>

                {/* Product name */}
                <h1 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  fontWeight: 700,
                  color: 'var(--clr-text)',
                  lineHeight: 1.2,
                  margin: 0,
                }}>
                  {product.name}
                </h1>

                {/* Pricing pivot */}
                <div className="flex flex-col justify-start">
                  <div className="group relative inline-block w-max">
                    <span className="text-xs font-bold uppercase tracking-wider cursor-help px-2 py-1 rounded-sm border"
                      style={{ color: 'var(--clr-accent-red)', borderColor: 'var(--clr-accent-red)', backgroundColor: 'var(--clr-bg-alt)' }}>
                      Flexible Pricing Model
                    </span>
                    <div className="invisible group-hover:visible absolute top-full left-0 mt-2 w-64 p-3 text-xs text-white bg-gray-800 rounded shadow-lg z-10 text-left">
                      Prices are market-responsive to ensure you receive the most competitive value for bulk international trade. Contact us for current FOB/CIF rates.
                    </div>
                  </div>
                </div>

                {/* Key specs */}
                {product.specifications.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {product.specifications.map(spec => (
                      <span key={spec} className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium"
                        style={{ backgroundColor: 'var(--clr-bg-alt)', color: 'var(--clr-text)', border: '1px solid var(--clr-border)' }}>
                        {spec}
                      </span>
                    ))}
                  </div>
                )}

                <hr style={{ borderColor: 'var(--clr-border)' }} />

                {/* Share icons */}
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium" style={{ color: 'var(--clr-text-muted)' }}>Share:</span>
                  {[
                    { Icon: Facebook, label: 'Facebook' },
                    { Icon: Twitter, label: 'Twitter' },
                    { Icon: Linkedin, label: 'LinkedIn' },
                    { Icon: Mail, label: 'Email' },
                  ].map(({ Icon, label }) => (
                    <button key={label} title={label}
                      className="p-2 rounded-full transition-colors hover:bg-amber-50"
                      style={{ color: 'var(--clr-text-muted)', border: '1px solid var(--clr-border)' }}>
                      <Icon className="h-3.5 w-3.5" />
                    </button>
                  ))}
                </div>

                {/* CTA buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Link
                    href="/contact"
                    className="flex-1 inline-flex items-center justify-center py-3.5 rounded text-sm font-semibold text-white transition-all hover:opacity-90"
                    style={{ backgroundColor: 'var(--clr-primary)' }}
                  >
                    Request Wholesale Quote
                  </Link>
                  <button
                    className="flex-1 inline-flex items-center justify-center py-3.5 rounded text-sm font-semibold transition-all hover:bg-amber-50"
                    style={{ border: '1.5px solid var(--clr-border)', color: 'var(--clr-text)' }}
                  >
                    Download Specs PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Description Tab ── */}
        <section className="border-t" style={{ backgroundColor: 'var(--clr-bg)', borderColor: 'var(--clr-border)' }}>
          <div className="container mx-auto px-4">
            {/* Tab bar */}
            <div className="flex border-b" style={{ borderColor: 'var(--clr-border)' }}>
              <button
                onClick={() => setActiveTab('description')}
                className="px-8 py-4 text-sm font-semibold relative"
                style={{
                  color: activeTab === 'description' ? 'var(--clr-primary)' : 'var(--clr-text-muted)',
                  fontFamily: 'var(--font-body)',
                }}
              >
                Description
                {activeTab === 'description' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ backgroundColor: 'var(--clr-accent-red)' }} />
                )}
              </button>
            </div>

            {/* Tab content */}
            <div className="py-12 max-w-4xl">
              {/* Description heading */}
              <h2 className="mb-1 text-sm font-bold uppercase tracking-widest" style={{ color: 'var(--clr-accent-red)' }}>
                1. PRODUCT DESCRIPTION
              </h2>

              {product.description && (
                <p className="mb-8" style={{ color: 'var(--clr-text-muted)', lineHeight: 1.8 }}>
                  {product.description}
                </p>
              )}

              {/* Quick Details table */}
              {product.quickDetails && (
                <div className="mb-10">
                  <h3 className="mb-4 pb-1 border-b text-sm font-bold" style={{ color: 'var(--clr-text)', borderColor: 'var(--clr-border)' }}>
                    Quick Details:
                  </h3>
                  <div className="overflow-hidden rounded-lg border" style={{ borderColor: 'var(--clr-border)' }}>
                    <table className="w-full text-sm border-collapse">
                      <tbody>
                        {Object.entries(product.quickDetails).map(([key, value], idx) => (
                          <tr key={key} style={{ backgroundColor: idx % 2 === 0 ? 'var(--clr-bg-alt)' : 'var(--clr-surface)' }}>
                            <td className="py-2.5 px-4 font-medium w-1/3 border-b border-r"
                              style={{ color: 'var(--clr-text-muted)', borderColor: 'var(--clr-border)' }}>
                              {key}
                            </td>
                            <td className="py-2.5 px-4 border-b"
                              style={{ color: 'var(--clr-text)', borderColor: 'var(--clr-border)' }}>
                              {value}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Storage info */}
              {product.storageInfo && (
                <div className="mb-8 rounded-lg p-5 border-l-4"
                  style={{ backgroundColor: 'var(--clr-bg-alt)', borderLeftColor: 'var(--clr-primary)' }}>
                  <h3 className="text-sm font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--clr-text)' }}>
                    Container Storage / Shelf Life
                  </h3>
                  <p style={{ color: 'var(--clr-text-muted)', fontSize: '0.9rem', lineHeight: 1.7 }}>{product.storageInfo}</p>
                </div>
              )}

              {/* Packaging & Delivery */}
              {(product.packagingInfo || product.deliveryInfo) && (
                <div className="mb-8 rounded-lg p-5 border-l-4"
                  style={{ backgroundColor: '#fdf8f2', borderLeftColor: 'var(--clr-accent)' }}>
                  <h3 className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--clr-text)' }}>
                    Packaging, Shipping & Delivery Time
                  </h3>
                  {product.packagingInfo && (
                    <p className="mb-1.5" style={{ color: 'var(--clr-text-muted)', fontSize: '0.9rem' }}>
                      <strong style={{ color: 'var(--clr-text)' }}>Packaging:</strong> {product.packagingInfo}
                    </p>
                  )}
                  {product.deliveryInfo && (
                    <p style={{ color: 'var(--clr-text-muted)', fontSize: '0.9rem' }}>
                      {product.deliveryInfo}
                    </p>
                  )}
                </div>
              )}

              {/* Features */}
              {product.features && product.features.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: 'var(--clr-text)' }}>
                    For More Information
                  </h3>
                  <ul className="space-y-2.5">
                    {product.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--clr-primary)' }} />
                        <span style={{ color: 'var(--clr-text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ── Related Products ── */}
        {relatedProducts.length > 0 && (
          <section className="py-14 border-t" style={{ backgroundColor: 'var(--clr-surface)', borderColor: 'var(--clr-border)' }}>
            <div className="container mx-auto px-4">
              <h2 className="mb-8 text-center" style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '2rem',
                fontWeight: 700,
                color: 'var(--clr-text)',
              }}>
                Related Products
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {relatedProducts.map(rp => (
                  <div key={rp.id}
                    className="group rounded-lg overflow-hidden border transition-shadow hover:shadow-md"
                    style={{ backgroundColor: 'var(--clr-surface)', borderColor: 'var(--clr-border)' }}>
                    <Link href={`/products/${rp.slug || rp.id}`} className="block overflow-hidden" style={{ aspectRatio: '4/3' }}>
                      <img
                        src={rp.image}
                        alt={rp.altText}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                        className="group-hover:scale-105"
                      />
                    </Link>
                    <div className="p-5 text-center">
                      <Link href={`/products/${rp.slug || rp.id}`}
                        className="block font-semibold mb-4 transition-colors"
                        style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', color: 'var(--clr-text)' }}>
                        {rp.name}
                      </Link>
                      <Link
                        href={`/products/${rp.slug || rp.id}`}
                        className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-semibold text-white rounded transition-opacity hover:opacity-90"
                        style={{ backgroundColor: 'var(--clr-accent-red)' }}
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
