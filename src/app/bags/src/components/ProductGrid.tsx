/**
 * ProductGrid — Responsive CSS Grid catalog.
 * 4 cols desktop → 2 cols tablet → 1 col mobile.
 * Uses scroll-triggered stagger animation.
 */

import { useState } from 'react';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import ProductDetail from '@/components/ProductDetail';
import { Product } from '@/data/products';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function ProductGrid() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { ref, isVisible } = useScrollAnimation(0.05);

  return (
    <section id="shop" className="py-20 sm:py-32 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">Curated Selection</span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-2 tracking-tight">
            THE <span className="text-primary">COLLECTION</span>
          </h2>
        </div>

        {/* CSS Grid — responsive 4→2→1 columns */}
        <div
          ref={ref}
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children ${
            isVisible ? 'visible' : ''
          }`}
        >
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onViewDetail={setSelectedProduct}
            />
          ))}
        </div>
      </div>

      {/* Product detail dialog */}
      <ProductDetail
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  );
}
