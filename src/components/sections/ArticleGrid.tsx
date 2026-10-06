import React from 'react';
import { articles } from '../../data/mockData';
import { ArticleCard } from '../ui/ArticleCard';
import { ArrowRight } from 'lucide-react';
import { Link } from '../ui/Link';
import { Reveal } from '../ui/Reveal';

export function ArticleGrid() {
  return (
    <section className="py-16 md:py-24" style={{ backgroundColor: '#2b1710' }}>
      <div className="container mx-auto px-4">
        <Reveal className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#faf3e8' }}>Market Insights & Company News</h2>
            <p className="max-w-2xl" style={{ color: 'rgba(250,243,232,0.65)' }}>
              Stay informed with the latest updates on crop yields, quality standards, and global shipping logistics from our expert team.
            </p>
          </div>
          <Link href="/articles" className="inline-flex items-center gap-2 font-medium transition-colors group" style={{ color: '#e8a96b' }}>
            View All Articles
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <Reveal key={article.id} delay={index * 0.08}>
              <ArticleCard article={article} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
