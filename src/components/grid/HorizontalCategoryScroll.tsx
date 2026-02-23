"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Product } from "@/types/product";
import Image from "next/image";
import { motion } from "framer-motion";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface HorizontalScrollProps {
    products: Product[];
}

export function HorizontalCategoryScroll({ products }: HorizontalScrollProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    const secondaryProducts = products.filter(
        (p) => p.category === "Bags" || p.category === "Greeting Cards"
    );

    useGSAP(() => {
        const section = sectionRef.current;
        const track = trackRef.current;

        if (!section || !track) return;

        // Calculate the total scrollable width
        const getScrollAmount = () => -(track.scrollWidth - window.innerWidth);

        const tween = gsap.to(track, {
            x: getScrollAmount,
            ease: "none",
        });

        ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: () => `+=${getScrollAmount() * -1}`,
            pin: true,
            animation: tween,
            scrub: 1, // Smooth scrubbing
            invalidateOnRefresh: true, // Recalculates on resize
        });

        return () => {
            tween.kill();
            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    }, { scope: sectionRef });

    return (
        <section
            ref={sectionRef}
            className="relative h-screen w-full overflow-hidden bg-zinc-950 text-white"
        >
            <div className="absolute top-12 left-6 lg:left-12 z-10">
                <h2 className="font-brand-display text-4xl lg:text-6xl font-bold uppercase tracking-tighter mix-blend-difference">
                    Lifestyle &<br /> Greetings
                </h2>
            </div>

            {/* The Track that moves horizontally */}
            <div
                ref={trackRef}
                className="flex h-full w-[max-content] items-center px-6 lg:px-[20vw] gap-12 lg:gap-32"
            >
                {secondaryProducts.map((product) => (
                    <ScrollCard key={product.id} product={product} />
                ))}

                {/* End of section buffer */}
                <div className="w-[10vw] flex-shrink-0 flex items-center justify-center">
                    <span className="font-mono text-xs uppercase tracking-widest text-zinc-500">End of Volume 01.</span>
                </div>
            </div>
        </section>
    );
}

import Link from "next/link";

function ScrollCard({ product }: { product: Product }) {
    return (
        <Link href={`/product/${product.id}`} className="block h-full cursor-pointer shrink-0">
            <motion.article
                className="relative w-[85vw] md:w-[60vw] lg:w-[40vw] h-[60vh] flex-shrink-0 group overflow-hidden bg-zinc-900 border border-white/10"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-10%" }}
                variants={{
                    hidden: { opacity: 0, scale: 0.95 },
                    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } }
                }}
            >
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                    <Image
                        src={product.placeholderImageUrl}
                        alt={product.name}
                        fill
                        className="object-cover transform group-hover:scale-105 transition-transform duration-[1.5s] ease-[cubic-bezier(0.19,1,0.22,1)] opacity-70 group-hover:opacity-100"
                        sizes="(max-width: 768px) 85vw, (max-width: 1200px) 60vw, 40vw"
                    />
                </div>

                <div className="absolute inset-0 flex flex-col justify-between p-8 bg-gradient-to-t from-black/90 via-transparent to-black/40">
                    <div className="flex justify-between items-start">
                        <span className="font-mono text-xs uppercase tracking-widest text-zinc-400 bg-black/50 px-3 py-1 backdrop-blur-md rounded-full">
                            {product.category}
                        </span>
                        <span className="font-mono text-sm text-white">
                            ₹{product.price.toFixed(2)}
                        </span>
                    </div>

                    <div>
                        <h3 className="font-brand-display text-3xl lg:text-5xl font-bold uppercase tracking-tighter leading-none mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-500 transition-all duration-500">
                            {product.name}
                        </h3>
                        <p className="font-sans text-sm text-zinc-400 max-w-sm line-clamp-2">
                            {product.description}
                        </p>
                    </div>
                </div>
            </motion.article>
        </Link>
    );
}
