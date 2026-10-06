import React from 'react';
import { categories } from '../../data/mockData';
import { ArrowRight } from 'lucide-react';
import { Image } from '../ui/Image';
import { Link } from '../ui/Link';
import { Reveal } from '../ui/Reveal';

export function CategoryGrid() {
  return (
    <section className="py-16 md:py-24 bg-stone-50">
      <div className="container mx-auto px-4">
        <Reveal className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">Product Categories</h2>
            <p className="text-stone-600 max-w-2xl">
              Explore our premium bulk cinnamon offerings, processed to meet strict international standards for food manufacturers and distributors.
            </p>
          </div>
          <Link href="/catalog" className="inline-flex items-center gap-2 text-orange-600 font-medium hover:text-orange-700 transition-colors group">
            Download Full Catalog
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Reveal key={category.id} delay={index * 0.08}>
              <Link
                href={`/category/${category.slug}`}
                className="group relative h-64 md:h-80 rounded-2xl overflow-hidden block bg-stone-200"
              >
                <Image
                  src={category.image}
                  alt={category.altText}
                  fill
                  className="transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/30 to-transparent transition-opacity group-hover:opacity-90" />
                <div className="absolute inset-x-0 bottom-0 p-6 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white">{category.name}</h3>
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
