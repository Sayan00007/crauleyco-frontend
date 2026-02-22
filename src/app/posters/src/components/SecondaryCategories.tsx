import { motion } from 'framer-motion';
import { products } from '@/data/products';
import ProductCard from './ProductCard';

const SecondaryCategories = () => {
  const bags = products.filter((p) => p.category === 'Bags');
  const cards = products.filter((p) => p.category === 'Greeting Cards');

  return (
    <section id="bags" className="py-16 md:py-24 px-4 md:px-8">
      <div className="container mx-auto">
        {/* Bags */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-syne text-3xl md:text-5xl font-extrabold text-foreground mb-10"
        >
          Bags
        </motion.h2>
        <div className="flex gap-4 md:gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide">
          {bags.map((p, i) => (
            <div key={p.id} className="min-w-[260px] md:min-w-[300px] snap-start">
              <ProductCard product={p} index={i} />
            </div>
          ))}
        </div>

        {/* Greeting Cards */}
        <motion.h2
          id="cards"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-syne text-3xl md:text-5xl font-extrabold text-foreground mb-10 mt-16 md:mt-24"
        >
          Greeting Cards
        </motion.h2>
        <div className="flex gap-4 md:gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide">
          {cards.map((p, i) => (
            <div key={p.id} className="min-w-[260px] md:min-w-[300px] snap-start">
              <ProductCard product={p} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SecondaryCategories;
