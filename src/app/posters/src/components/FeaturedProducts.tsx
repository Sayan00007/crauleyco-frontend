import { motion } from 'framer-motion';
import { products } from '@/data/products';
import ProductCard from './ProductCard';

const FeaturedProducts = () => {
  return (
    <section id="art-craft" className="py-16 md:py-24 px-4 md:px-8 bg-muted/50">
      <div className="container mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-syne text-4xl md:text-6xl font-extrabold text-foreground mb-4"
        >
          Featured
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-grotesk text-lg text-muted-foreground mb-12 md:mb-16 max-w-lg"
        >
          A curated selection of our most loved pieces across all collections.
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.slice(0, 8).map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
