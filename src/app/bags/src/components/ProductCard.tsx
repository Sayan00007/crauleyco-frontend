/**
 * ProductCard — Premium product card with hover lift/shadow effect.
 * Click card → open detail dialog. Click "Add to Cart" → add directly.
 */

import { ShoppingBag } from 'lucide-react';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';

interface ProductCardProps {
  product: Product;
  onViewDetail: (product: Product) => void;
}

export default function ProductCard({ product, onViewDetail }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <div
      className="group relative rounded-xl overflow-hidden bg-card border border-border product-card-hover cursor-pointer"
      onClick={() => onViewDetail(product)}
    >
      {/* Badge */}
      {product.badge && (
        <span className="absolute top-3 left-3 z-10 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
          {product.badge}
        </span>
      )}

      {/* Image container with overlay */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          /* srcset placeholder — add 2x images for Retina:
             srcSet={`${product.image} 1x, ${product.image2x} 2x`}
          */
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Product info */}
      <div className="p-4 sm:p-5">
        <p className="text-xs text-primary font-medium tracking-wider uppercase mb-1">
          {product.category}
        </p>
        <h3 className="text-lg font-semibold text-foreground mb-1 leading-tight">
          {product.name}
        </h3>
        <p className="text-xl font-bold text-foreground">
          ${product.price}
        </p>

        <Button
          size="sm"
          className="mt-3 w-full gap-2 rounded-lg"
          onClick={(e) => {
            e.stopPropagation(); // Prevent opening detail dialog
            addToCart(product);
          }}
        >
          <ShoppingBag className="h-4 w-4" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
