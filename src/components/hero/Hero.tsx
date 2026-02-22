"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { WaveBackground } from "./WaveBackground";
import { ArrowDownRight } from "lucide-react";

export function Hero() {
    const container = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Initial load animation for the massive typography
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

        tl.fromTo(
            ".hero-text-line",
            { yPercent: 120, opacity: 0, rotateZ: 2 },
            { yPercent: 0, opacity: 1, rotateZ: 0, duration: 1.5, stagger: 0.1, delay: 0.2 }
        )
            .fromTo(
                ".hero-cta",
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 1 },
                "-=1"
            );

    }, { scope: container });

    return (
        <section
            ref={container}
            className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden"
        >
            <WaveBackground />

            <div className="relative z-30 max-w-[1600px] w-full px-6 lg:px-12 flex flex-col items-start justify-center mt-20 pointer-events-none">

                {/* Massive Typography with Text Masking */}
                <h1 className="font-brand-display text-[15vw] leading-[0.8] tracking-tighter uppercase text-white mix-blend-difference mb-12">
                    <div className="overflow-hidden inline-block pb-4">
                        <span className="block hero-text-line origin-bottom-left">Curate</span>
                    </div>
                    <br />
                    <div className="overflow-hidden inline-block">
                        <span className="block hero-text-line origin-bottom-left text-zinc-300">Your Reality.</span>
                    </div>
                </h1>

                {/* Primary CTA */}
                <div className="hero-cta pointer-events-auto">
                    <button className="group relative flex items-center gap-4 bg-white text-black px-8 py-5 rounded-full font-bold uppercase tracking-wider overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95">
                        <span className="relative z-10">Explore Catalog</span>
                        <div className="relative z-10 w-8 h-8 bg-black rounded-full flex items-center justify-center text-white transform group-hover:rotate-[-45deg] transition-transform duration-500">
                            <ArrowDownRight size={18} strokeWidth={2.5} />
                        </div>

                        {/* Magnetic/Expansion hover effect background */}
                        <div className="absolute inset-0 bg-zinc-200 transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-[var(--animate-kinetic)] z-0"></div>
                    </button>
                </div>

            </div>

            {/* Decorative Brand Elements */}
            <div className="absolute bottom-12 left-6 lg:left-12 z-30 text-zinc-400 font-mono text-sm tracking-widest uppercase flex flex-col gap-2">
                <span>Vol. 01</span>
                <span>Limited Edition</span>
            </div>

            <div className="absolute bottom-12 right-6 lg:right-12 z-30 text-zinc-400 font-mono text-sm tracking-widest uppercase text-right">
                Scroll To Discover
            </div>
        </section>
    );
}
