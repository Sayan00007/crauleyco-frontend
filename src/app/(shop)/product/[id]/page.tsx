"use client";

import { notFound } from "next/navigation";
import { useCatalogStore } from "@/lib/store/catalogStore";
import Image from "next/image";
import { useCartStore } from "@/lib/store/cartStore";
import { ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { use, useEffect } from "react";

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const { products, isLoading, fetchProducts } = useCatalogStore();
    const product = products.find((p) => p.id === id);
    const addItem = useCartStore((state) => state.addItem);

    // Fetch products on mount if deep-linked
    useEffect(() => {
        if (products.length === 0) {
            fetchProducts();
        }
    }, [products.length, fetchProducts]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-surface-pastel flex items-center justify-center font-mono uppercase tracking-widest text-sm">
                [ Loading Remote Artifact... ]
            </div>
        );
    }

    if (!product && !isLoading) {
        notFound();
    }

    // Generate placeholder mock gallery images based on the main image
    const galleryImages = [
        product?.placeholderImageUrl || "",
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200", // Abstract detail 1
        "https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=1200", // Abstract detail 2
    ];

    return (
        <div className="min-h-screen bg-surface-pastel text-zinc-900 pt-24 md:pt-0">

            {/* Back Navigation */}
            <div className="absolute top-24 md:top-32 left-6 lg:left-12 z-30">
                <Link
                    href="/"
                    className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-zinc-500 hover:text-black transition-colors group"
                >
                    <ArrowLeft size={16} className="transform group-hover:-translate-x-1 transition-transform" />
                    Back to Curated
                </Link>
            </div>

            <div className="flex flex-col md:flex-row w-full h-full min-h-screen">

                {/* Left Side: Scrollable Image Gallery */}
                <div className="w-full md:w-1/2 lg:w-[60%] h-[50vh] md:h-screen md:sticky top-0 overflow-y-auto hide-scrollbar bg-white">
                    <div className="flex flex-col">
                        {galleryImages.map((src, idx) => (
                            <div key={idx} className="relative w-full h-[60vh] md:h-screen border-b border-black/5">
                                <Image
                                    src={src}
                                    alt={`${product?.name || 'Product'} Gallery ${idx + 1}`}
                                    fill
                                    className="object-cover"
                                    priority={idx === 0}
                                    sizes="(max-width: 768px) 100vw, 60vw"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Side: Sticky Product Information */}
                <div className="w-full md:w-1/2 lg:w-[40%] bg-surface-pastel p-6 lg:p-16 flex flex-col justify-center min-h-[50vh] md:min-h-screen">
                    <div className="max-w-md mx-auto w-full">

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                        >
                            <span className="font-mono text-xs uppercase tracking-widest text-zinc-500 mb-4 block">
                                {product?.category}
                            </span>

                            <h1 className="font-brand-display text-4xl lg:text-6xl font-bold uppercase tracking-tighter leading-none mb-6">
                                {product?.name}
                            </h1>

                            <p className="font-mono text-xl md:text-2xl text-black mb-8">
                                ${product?.price?.toFixed(2) || "0.00"}
                            </p>

                            <div className="border-t border-black/10 pt-8 mb-12">
                                <p className="font-sans text-zinc-600 leading-relaxed">
                                    {product?.description}
                                </p>
                                <p className="font-sans text-sm text-zinc-500 mt-4 italic">
                                    Museum-grade production. Limited run series.
                                </p>
                            </div>
                        </motion.div>

                        {/* Interactive Add to Cart CTA */}
                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                            onClick={() => { if (product) addItem(product) }}
                            className="w-full relative group flex items-center justify-between bg-black text-white px-8 py-5 rounded-full font-bold uppercase tracking-wider overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-black/10"
                        >
                            <span className="relative z-10 mix-blend-difference">Acquire Artifact</span>
                            <div className="relative z-10 w-10 h-10 bg-white rounded-full flex items-center justify-center text-black transform group-hover:rotate-45 transition-transform duration-500">
                                <ArrowRight size={20} strokeWidth={2.5} />
                            </div>

                            {/* Kinetic Hover Fill */}
                            <div className="absolute inset-0 bg-white transform scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-500 ease-[var(--animate-kinetic)] z-0"></div>
                        </motion.button>

                        <div className="mt-8 flex justify-between font-mono text-xs uppercase tracking-widest text-zinc-400 border-t border-black/10 pt-4">
                            <span>Free Global Shipping</span>
                            <span>30-Day Returns</span>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}
