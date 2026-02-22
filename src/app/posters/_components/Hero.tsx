"use client";

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mouse, setMouse] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMove = (e: MouseEvent) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            setMouse({
                x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
                y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
            });
        };
        window.addEventListener('mousemove', handleMove);
        return () => window.removeEventListener('mousemove', handleMove);
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-[#09090b]"
        >
            {/* SVG Blob Layers */}
            <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 1440 900"
                preserveAspectRatio="xMidYMid slice"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Layer 1 — slow drift */}
                <motion.ellipse
                    cx={String(720 + mouse.x * 40)}
                    cy={String(450 + mouse.y * 30)}
                    rx="600"
                    ry="400"
                    fill="hsl(38, 100%, 54%)"
                    opacity="0.25"
                    animate={{
                        cx: 720 + mouse.x * 40,
                        cy: 450 + mouse.y * 30,
                    }}
                    transition={{ type: 'spring', stiffness: 30, damping: 20 }}
                />
                {/* Layer 2 */}
                <motion.ellipse
                    cx={String(500 + mouse.x * -60)}
                    cy={String(350 + mouse.y * -40)}
                    rx="450"
                    ry="320"
                    fill="hsl(25, 100%, 55%)"
                    opacity="0.2"
                    animate={{
                        cx: 500 + mouse.x * -60,
                        cy: 350 + mouse.y * -40,
                    }}
                    transition={{ type: 'spring', stiffness: 25, damping: 18 }}
                />
                {/* Layer 3 */}
                <motion.ellipse
                    cx={String(900 + mouse.x * 80)}
                    cy={String(550 + mouse.y * 50)}
                    rx="380"
                    ry="280"
                    fill="hsl(350, 85%, 60%)"
                    opacity="0.15"
                    animate={{
                        cx: 900 + mouse.x * 80,
                        cy: 550 + mouse.y * 50,
                    }}
                    transition={{ type: 'spring', stiffness: 20, damping: 15 }}
                />
                {/* Layer 4 — small accent */}
                <motion.circle
                    cx={String(300 + mouse.x * 100)}
                    cy={String(200 + mouse.y * 70)}
                    r="150"
                    fill="hsl(45, 100%, 60%)"
                    opacity="0.3"
                    animate={{
                        cx: 300 + mouse.x * 100,
                        cy: 200 + mouse.y * 70,
                    }}
                    transition={{ type: 'spring', stiffness: 18, damping: 12 }}
                />
            </svg>

            {/* Grain overlay */}
            <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')]" />

            {/* Content */}
            <div className="relative z-10 text-center px-4 max-w-4xl">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="font-grotesk text-sm md:text-base uppercase tracking-[0.3em] text-[#f4f0ec]/60 mb-6"
                >
                    Curated art for bold spaces
                </motion.p>
                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="font-syne text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold leading-[0.9] tracking-tight text-[#f4f0ec]"
                >
                    Crauley<span className="text-[#ffb314]">Co</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="font-grotesk text-lg md:text-xl text-[#f4f0ec]/50 mt-8 max-w-xl mx-auto"
                >
                    Posters, art & craft, bags, and greeting cards — designed to inspire.
                </motion.p>
                <motion.a
                    href="#posters"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-block mt-10 px-10 py-4 bg-[#ffb314] text-[#09090b] font-syne font-bold text-lg rounded-full hover:shadow-[0_0_40px_hsl(38,100%,54%,0.4)] transition-shadow duration-300"
                >
                    Shop Now
                </motion.a>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="font-grotesk text-xs uppercase tracking-widest text-[#f4f0ec]/30">Scroll</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-5 h-8 border-2 border-[#f4f0ec]/20 rounded-full flex justify-center pt-1.5"
                >
                    <div className="w-1 h-1.5 bg-[#f4f0ec]/40 rounded-full" />
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;
