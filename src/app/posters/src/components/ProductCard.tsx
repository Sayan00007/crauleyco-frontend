import { motion } from 'framer-motion';
import type { Product } from '@/data/products';

const ProductCard = ({ product, index }: { product: Product; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group cursor-pointer"
    >
      <div className="relative overflow-hidden rounded-xl aspect-[3/4] mb-4 bg-muted">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 bg-foreground/80 text-background text-xs font-grotesk font-medium rounded-full backdrop-blur-sm">
            {product.category}
          </span>
        </div>
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300" />
      </div>
      <div className="space-y-1">
        <h4 className="font-syne text-lg font-bold text-foreground group-hover:text-primary transition-colors">
          {product.name}
        </h4>
        <p className="font-grotesk text-sm text-muted-foreground line-clamp-1">{product.description}</p>
        <p className="font-syne text-xl font-bold text-foreground">${product.price.toFixed(2)}</p>
      </div>
    </motion.div>
  );
};

export default ProductCard;
