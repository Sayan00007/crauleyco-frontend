/**
 * ProductDetail — Full-screen dialog showing product details.
 * Large image, description, price, and Add to Cart button.
 */

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';

interface ProductDetailProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductDetail({ product, onClose }: ProductDetailProps) {
  const { addToCart } = useCart();

  if (!product) return null;

  return (
    <Dialog open={!!product} onOpenChange={open => !open && onClose()}>
      <DialogContent className="max-w-3xl bg-card border-border p-0 overflow-hidden">
        <DialogTitle className="sr-only">{product.name}</DialogTitle>
        <div className="grid sm:grid-cols-2">
          {/* Image */}
          <div className="aspect-square overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="p-6 sm:p-8 flex flex-col justify-center">
            {product.badge && (
              <span className="inline-block w-fit bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full mb-4">
                {product.badge}
              </span>
            )}
            <p className="text-xs text-primary font-medium tracking-wider uppercase mb-1">
              {product.category}
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
              {product.name}
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {product.description}
            </p>
            <p className="text-3xl font-bold text-foreground mb-6">
              ₹{product.price}
            </p>
            <Button
              size="lg"
              className="gap-2 rounded-lg"
              onClick={() => {
                addToCart(product);
                onClose();
              }}
            >
              <ShoppingBag className="h-5 w-5" />
              Add to Cart
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
