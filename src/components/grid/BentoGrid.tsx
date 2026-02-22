"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Product } from "@/types/product";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

interface BentoGridProps {
    products: Product[];
}

export function BentoGrid({ products }: BentoGridProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, amount: 0.1 });

    // Filter out just the hero categories for the Bento Grid as per directive
    const heroProducts = products.filter(
        (p) => p.category === "Posters" || p.category === "Art & Craft"
    ).slice(0, 6); // Limiting to 6 for a clean grid demonstration

    // Staggered entrance animation for the Parent Container
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
            },
        },
    };

    return (
        <section
            className="relative z-20 w-full min-h-screen bg-surface-pastel py-32 px-6 lg:px-12 flex flex-col items-center"
            aria-label="CrauleyCo Collection Highlight"
        >
            <div className="w-full max-w-[1600px] mb-16 flex justify-between items-end">
                <h2 className="font-brand-display text-4xl md:text-6xl lg:text-8xl font-bold uppercase tracking-tighter text-zinc-900 leading-none">
                    Curated<br /> Artifacts
                </h2>
                <p className="hidden md:block text-zinc-600 max-w-sm font-sans text-right">
                    Exclusive drops and limited run prints. Engineered for immediate visual synthesis.
                </p>
            </div>

            <motion.div
                ref={containerRef}
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="w-full max-w-[1600px] grid grid-cols-1 md:grid-cols-4 lg:grid-cols-8 gap-bento-gap auto-rows-[300px] md:auto-rows-[400px]"
            >
                {heroProducts.map((product, index) => {
                    // Implementing the algorithmic layout mapping based on the Master Directive
                    // desktop: Posters get col-4 row-2, Art gets col-3 row-2 or col-2 row-1
                    // tablet: Posters get col-2 row-2, Art gets col-2 row-1

                    let gridClass = "col-span-1 row-span-1"; // Mobile default

                    if (product.category === "Posters" && index === 0) {
                        // Hero Poster
                        gridClass = "md:col-span-2 md:row-span-2 lg:col-span-4 lg:row-span-2";
                    } else if (product.category === "Art & Craft" && index === 1) {
                        // Hero Art
                        gridClass = "md:col-span-2 md:row-span-1 lg:col-span-3 lg:row-span-2";
                    } else if (product.category === "Posters" && index === 2) {
                        // Secondary Poster
                        gridClass = "md:col-span-2 md:row-span-1 lg:col-span-2 lg:row-span-1";
                    } else if (product.category === "Art & Craft" && index === 3) {
                        // Secondary Art
                        gridClass = "md:col-span-2 md:row-span-1 lg:col-span-3 lg:row-span-1";
                    } else {
                        // Filler
                        gridClass = "md:col-span-2 md:row-span-1 lg:col-span-2 lg:row-span-1";
                    }

                    return (
                        <BentoTile
                            key={product.id}
                            product={product}
                            className={gridClass}
                        />
                    );
                })}
            </motion.div>
        </section>
    );
}

import Link from "next/link"; // added import

function BentoTile({ product, className = "" }: { product: Product; className?: string }) {
    const [isHovered, setIsHovered] = useState(false);

    // Entrance micro-animation
    const itemVariants: import("framer-motion").Variants = {
        hidden: { y: 40, opacity: 0, filter: "blur(10px)" },
        visible: {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            transition: {
                type: "spring",
                bounce: 0.4,
                duration: 0.8,
            },
        },
    };

    return (
        <Link href={`/product/${product.id}`} className={className} style={{ display: "block" }}>
            <motion.article
                variants={itemVariants}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                className={`group relative overflow-hidden rounded-bento-soft bg-white/50 border border-white/20 shadow-sm cursor-pointer w-full h-full`}
                // Framer Motion Hover Physics (Scale 1.02 for the container)
                whileHover={{ scale: 1.02 }}
                transition={{ ease: [0.19, 1, 0.22, 1], duration: 0.6 }} // animate-kinetic token easing
                aria-label={`View ${product.name}`}
                tabIndex={0}
            >
                {/* Background Image with Hover Physics (Scale 1.05) */}
                <motion.div
                    className="absolute inset-0 w-full h-full"
                    animate={{ scale: isHovered ? 1.05 : 1 }}
                    transition={{ ease: [0.19, 1, 0.22, 1], duration: 0.8 }}
                >
                    <Image
                        src={product.placeholderImageUrl}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {/* Dynamic backdrop blur overlay on hover */}
                    <motion.div
                        className="absolute inset-0 bg-black/10 backdrop-blur-[2px]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isHovered ? 1 : 0 }}
                        transition={{ duration: 0.4 }}
                    />
                </motion.div>

                {/* Content overlay */}
                <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8 flex items-end justify-between bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                    <div>
                        <span className="text-zinc-300 font-mono text-xs tracking-widest uppercase mb-2 block">
                            {product.category}
                        </span>
                        <h3 className="text-white font-brand-display text-2xl lg:text-4xl font-bold leading-tight uppercase tracking-tight">
                            {product.name}
                        </h3>
                    </div>

                    <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 group-hover:bg-white group-hover:text-black transition-colors duration-300 shrink-0">
                        <ArrowUpRight size={24} strokeWidth={1.5} className="group-hover:rotate-45 transition-transform duration-500 ease-out" />
                    </div>
                </div>
            </motion.article>
        </Link>
    );
}

