import React from 'react';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { articles } from '../../data/mockData';
import { Link } from '../../components/ui/Link';

export default function ArticlesPage() {
    return (
        <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--clr-bg)' }}>
            <Header />
            <main className="flex-grow">
                <div className="py-16 text-center border-b" style={{ backgroundColor: 'var(--clr-bg-alt)', borderColor: 'var(--clr-border)' }}>
                    <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '3rem', fontWeight: 700, color: 'var(--clr-primary)' }}>
                        Market News & Insights
                    </h1>
                    <p style={{ color: 'var(--clr-text-muted)', marginTop: '0.75rem' }}>
                        Stay informed on spice market trends and logistics updates
                    </p>
                </div>
                <div className="container mx-auto px-4 py-16">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {articles.map(article => (
                            <article key={article.id} className="rounded-xl overflow-hidden shadow-sm border"
                                style={{ backgroundColor: 'var(--clr-surface)', borderColor: 'var(--clr-border)' }}>
                                <div className="aspect-video overflow-hidden">
                                    <img src={article.image} alt={article.altText} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                                </div>
                                <div className="p-6">
                                    <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--clr-primary)' }}>{article.category}</span>
                                    <h2 className="mt-2 mb-3 text-xl font-semibold leading-snug" style={{ fontFamily: 'var(--font-heading)', color: 'var(--clr-text)' }}>
                                        {article.title}
                                    </h2>
                                    <p className="text-sm mb-4" style={{ color: 'var(--clr-text-muted)' }}>{article.excerpt}</p>
                                    <span className="text-xs" style={{ color: 'var(--clr-text-light)' }}>Published — {article.date}</span>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
