import React from 'react';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { productGrades } from '../../data/mockData';
import { ProductCard } from '../../components/ui/ProductCard';

export default function ProductsListPage() {
    return (
        <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--clr-bg)' }}>
            <Header />
            <main className="flex-grow">
                {/* Hero banner */}
                <div className="py-16 text-center border-b" style={{ backgroundColor: 'var(--clr-bg-alt)', borderColor: 'var(--clr-border)' }}>
                    <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '3rem', fontWeight: 700, color: 'var(--clr-primary)' }}>
                        Export Products
                    </h1>
                    <p style={{ color: 'var(--clr-text-muted)', marginTop: '0.75rem', fontFamily: 'var(--font-body)' }}>
                        Premium Vietnamese spices for global food manufacturers & distributors
                    </p>
                </div>
                {/* Product grid */}
                <div className="container mx-auto px-4 py-16">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {productGrades.map(product => (
                            <ProductCard key={product.id} product={product} buttonStyle="doc-tiep" />
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
