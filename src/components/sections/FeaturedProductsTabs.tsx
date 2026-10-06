import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ProductCard } from '../ui/ProductCard';
import { productGrades } from '../../data/mockData';
import { Reveal } from '../ui/Reveal';

export function FeaturedProductsTabs() {
  const [activeTab, setActiveTab] = useState<'Best Sellers' | 'New Arrivals' | 'Popular Item'>('Best Sellers');

  const getProducts = () => {
    switch (activeTab) {
      case 'Best Sellers':
        return productGrades.filter(p =>
          ['Ground Pepper', 'White Pepper', 'Black Pepper', 'Turmeric Powder'].includes(p.name)
        );
      case 'New Arrivals':
        return productGrades.filter(p =>
          ['Organic Cayenne Powder', 'Madras Curry Powder', 'Cinnamon Powder', 'Granulated Garlic'].includes(p.name)
        );
      case 'Popular Item':
        return productGrades.filter(p =>
          ['Cassia Powder', 'Granulated Garlic', 'Turmeric Powder', 'White Pepper'].includes(p.name)
        );
      default:
        return [];
    }
  };

  const products = getProducts();

  return (
    <section className="py-16" style={{ backgroundColor: '#2b1710' }}>
      <div className="container mx-auto px-4">
        <Reveal className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-6 uppercase tracking-wider" style={{ fontFamily: 'var(--font-heading)', color: '#faf3e8' }}>Featured Products</h2>
          <div className="flex justify-center gap-8 border-b" style={{ borderColor: 'rgba(250,243,232,0.15)' }}>
            {(['Best Sellers', 'New Arrivals', 'Popular Item'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="pb-4 px-2 text-sm font-bold uppercase tracking-wider transition-colors relative"
                style={{ color: activeTab === tab ? '#faf3e8' : 'rgba(250,243,232,0.45)' }}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div
                    layoutId="featured-tab-underline"
                    className="absolute bottom-0 left-0 right-0 h-[3px]"
                    style={{ backgroundColor: 'var(--clr-primary)' }}
                  />
                )}
              </button>
            ))}
          </div>
        </Reveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                buttonStyle={
                  activeTab === 'Best Sellers' ? 'doc-tiep' :
                  activeTab === 'New Arrivals' ? 'chon' :
                  'mixed'
                }
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
