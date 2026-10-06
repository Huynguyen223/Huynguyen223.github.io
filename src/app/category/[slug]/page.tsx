import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '../../../components/layout/Header';
import { Footer } from '../../../components/layout/Footer';
import { productGrades, categories } from '../../../data/mockData';
import { ProductCard } from '../../../components/ui/ProductCard';
import { Link } from '../../../components/ui/Link';
import { ChevronRight } from 'lucide-react';

// Maps category slug → categoryId in productGrades
const SLUG_TO_CATEGORY_ID: Record<string, string> = {
    cinnamon: '1',
    ginger: '2',
    pepper: '3',
    'star-anise': '4',
    turmeric: '5',
};

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
    cinnamon: 'We own cassia/cinnamon processing facilities in the growing regions of Yen Bai, Vietnam, operating in compliance with European and U.S. standards. We provide a wide range of cinnamon products tailored to meet the specific requirements of our customers.',
    ginger: 'Sourced from highland farms in Vietnam, our ginger products are sun-dried, carefully graded, and available in whole root, sliced, powder, and granulated forms for food manufacturers worldwide.',
    pepper: 'Vietnamese pepper from Tay Nguyen (Central Highlands) — one of the world\'s premier pepper-growing regions. Available in black, white, and ground grades for bulk wholesale.',
    'star-anise': 'Premium whole star anise from Lang Son province, Vietnam. Prized for its intense aroma and essential oil content, ideal for food processors, flavor houses, and beverage manufacturers.',
    turmeric: 'High-curcumin Vietnamese turmeric, available as whole root, sliced, or powder. Sourced from organic-friendly farms and processed in our certified facilities.',
};

export default function CategoryPage() {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();

    const categoryId = slug ? SLUG_TO_CATEGORY_ID[slug] : null;
    const categoryName = slug
        ? slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
        : 'Products';

    const products = categoryId
        ? productGrades.filter(p => p.categoryId === categoryId)
        : productGrades;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    return (
        <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--clr-bg)' }}>
            <Header />

            {/* Hero banner */}
            <div className="relative w-full overflow-hidden" style={{ height: '280px', backgroundColor: '#1a0f05' }}>
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `url(/images/hero-farming.jpg)`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        opacity: 0.3,
                    }}
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(20,10,2,0.6) 0%, rgba(20,10,2,0.85) 100%)' }} />

                {/* Breadcrumb + title */}
                <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-end pb-10">
                    <nav className="flex items-center gap-1.5 text-sm mb-3" style={{ color: 'rgba(255,255,255,0.55)' }}>
                        <span className="cursor-pointer hover:text-amber-400 transition-colors" onClick={() => navigate('/')}>Home</span>
                        <ChevronRight className="h-3.5 w-3.5" />
                        <span className="cursor-pointer hover:text-amber-400 transition-colors" onClick={() => navigate('/products')}>Products</span>
                        <ChevronRight className="h-3.5 w-3.5" />
                        <span style={{ color: '#f5edd8' }}>{categoryName}</span>
                    </nav>
                    <h1 style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                        fontWeight: 700,
                        color: '#f5edd8',
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase',
                    }}>
                        {categoryName}
                    </h1>
                </div>
            </div>

            <main className="flex-grow">
                <div className="container mx-auto px-4 py-10">
                    {/* Category description */}
                    {slug && CATEGORY_DESCRIPTIONS[slug] && (
                        <p className="mb-10 max-w-3xl" style={{ color: 'var(--clr-text-muted)', lineHeight: 1.8, fontFamily: 'var(--font-body)' }}>
                            {CATEGORY_DESCRIPTIONS[slug]}
                        </p>
                    )}

                    {/* Sidebar + Grid layout */}
                    <div className="flex gap-10">
                        {/* Sidebar */}
                        <aside className="hidden lg:block w-52 flex-shrink-0">
                            <div className="sticky top-24">
                                <h3 className="text-xs font-bold uppercase tracking-widest mb-4 pb-2 border-b"
                                    style={{ color: 'var(--clr-text)', borderColor: 'var(--clr-border)' }}>
                                    Product Categories
                                </h3>
                                <nav className="space-y-1">
                                    <Link
                                        href="/products"
                                        className="flex items-center justify-between py-1.5 px-2 rounded text-sm transition-colors"
                                        style={{ color: !slug ? 'var(--clr-primary)' : 'var(--clr-text-muted)' }}
                                    >
                                        <span>All Products</span>
                                    </Link>
                                    {[
                                        { label: 'Cinnamon', slug: 'cinnamon', id: '1' },
                                        { label: 'Ginger', slug: 'ginger', id: '2' },
                                        { label: 'Pepper', slug: 'pepper', id: '3' },
                                        { label: 'Star Anise', slug: 'star-anise', id: '4' },
                                        { label: 'Turmeric', slug: 'turmeric', id: '5' },
                                    ].map(cat => {
                                        const count = productGrades.filter(p => p.categoryId === cat.id).length;
                                        const isActive = slug === cat.slug;
                                        return (
                                            <Link
                                                key={cat.slug}
                                                href={`/category/${cat.slug}`}
                                                className="flex items-center justify-between py-1.5 px-2 rounded text-sm transition-colors hover:bg-amber-50"
                                                style={{ color: isActive ? 'var(--clr-primary)' : 'var(--clr-text-muted)', fontWeight: isActive ? 600 : 400 }}
                                            >
                                                <span>{cat.label}</span>
                                                <span className="text-xs px-1.5 py-0.5 rounded-full"
                                                    style={{ backgroundColor: 'var(--clr-bg-alt)', color: 'var(--clr-text-muted)' }}>
                                                    {count}
                                                </span>
                                            </Link>
                                        );
                                    })}
                                </nav>
                            </div>
                        </aside>

                        {/* Product grid */}
                        <div className="flex-1">
                            {products.length === 0 ? (
                                <div className="py-20 text-center" style={{ color: 'var(--clr-text-muted)' }}>
                                    <p className="text-lg">No products found in this category.</p>
                                    <Link href="/products" className="mt-4 inline-block text-sm underline" style={{ color: 'var(--clr-primary)' }}>
                                        Browse all products
                                    </Link>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {products.map(product => (
                                        <ProductCard key={product.id} product={product} buttonStyle="doc-tiep" />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
