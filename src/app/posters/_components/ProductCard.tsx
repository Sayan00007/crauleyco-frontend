"use client";

import { motion } from 'framer-motion';
import type { Product } from '../_data/products';

const ProductCard = ({ product, index }: { product: Product; index: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="group cursor-pointer"
        >
            <div className="relative overflow-hidden rounded-xl aspect-[3/4] mb-4 bg-black/5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 bg-[#09090b]/80 text-[#f4f0ec] text-xs font-grotesk font-medium rounded-full backdrop-blur-sm">
                        {product.category}
                    </span>
                </div>
                <div className="absolute inset-0 bg-[#09090b]/0 group-hover:bg-[#09090b]/10 transition-colors duration-300" />
            </div>
            <div className="space-y-1">
                <h4 className="font-syne text-lg font-bold text-[#09090b] group-hover:text-[#ffb314] transition-colors">
                    {product.name}
                </h4>
                <p className="font-grotesk text-sm text-[#09090b]/60 line-clamp-1">{product.description}</p>
                <p className="font-syne text-xl font-bold text-[#09090b]">${product.price.toFixed(2)}</p>
            </div>
        </motion.div>
    );
};

export default ProductCard;
