"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function WaveBackground() {
    const containerRef = useRef<HTMLDivElement>(null);
    const layersRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        // 1. Feature detection: Disable heavy parallax on touch devices or small screens
        if (window.matchMedia("(max-width: 768px)").matches || "ontouchstart" in window) {
            return;
        }

        const layers = layersRef.current;
        if (!layers || layers.length !== 5) return;

        // 2. The history-based tracking algorithm
        // We store the last 50 normalized cursor positions.
        const trailSize = 60;
        const cursorTrail = new Array(trailSize).fill({ x: 0.5, y: 0.5 });

        // Normalization bounds
        let windowWidth = window.innerWidth;
        let windowHeight = window.innerHeight;

        const onResize = () => {
            windowWidth = window.innerWidth;
            windowHeight = window.innerHeight;
        };
        window.addEventListener("resize", onResize);

        const onMouseMove = (e: MouseEvent) => {
            // Normalize between 0 and 1
            const nx = e.clientX / windowWidth;
            const ny = e.clientY / windowHeight;

            // Unshift to the beginning of the history array
            cursorTrail.unshift({ x: nx, y: ny });
            if (cursorTrail.length > trailSize) {
                cursorTrail.pop();
            }
        };
        window.addEventListener("mousemove", onMouseMove);

        // 3. GSAP Ticker for Mathematics and DOM translation
        // We maintain 'current' values for Lerping
        const currentPositions = layers.map(() => ({ x: 0.5, y: 0.5 }));

        const tick = () => {
            // We read from different indexes of the trail array to create the temporal lag (cascade)
            // Layer 0 reads index 0 (immediate). Layer 4 reads index 40 (delayed).
            const staggerIndices = [0, 8, 16, 28, 45];

            layers.forEach((layer, i) => {
                if (!layer) return;

                const targetIndex = staggerIndices[i];
                const target = cursorTrail[targetIndex] || cursorTrail[0];

                // Linear Interpolation (Lerp) for heavy, liquid motion smoothing.
                // Outer layers move slightly faster/heavier than inner layers.
                const easing = 0.05 + (0.01 * i);

                currentPositions[i].x += (target.x - currentPositions[i].x) * easing;
                currentPositions[i].y += (target.y - currentPositions[i].y) * easing;

                // Transform the normalized value (-0.5 to 0.5 offset) into pixels
                // Max translation distance logic: 
                // Layer 0 translates the most (-10vw scale, so max translation is ~10vw)
                const maxTranslateX = windowWidth * 0.05;
                const maxTranslateY = windowHeight * 0.05;

                const tx = (currentPositions[i].x - 0.5) * maxTranslateX * (5 - i) * 0.5;
                const ty = (currentPositions[i].y - 0.5) * maxTranslateY * (5 - i) * 0.5;

                // Use translate3d to force hardware acceleration and avoid layout thrashing
                gsap.set(layer, {
                    x: tx,
                    y: ty,
                    force3D: true, // will-change: transform is applied via CSS
                });
            });
        };

        gsap.ticker.add(tick);

        return () => {
            window.removeEventListener("resize", onResize);
            window.removeEventListener("mousemove", onMouseMove);
            gsap.ticker.remove(tick);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-zinc-950"
        >
            {/* 
        To achieve the topological depth dynamics:
        We render 5 discrete layers, significantly larger than the viewport to avoid edge clipping.
        We apply CSS masking (mask-composite) to carve out the waves.
      */}
            {[1, 2, 3, 4, 5].map((_, index) => (
                <div
                    key={`wave-layer-${index}`}
                    ref={(el) => { layersRef.current[index] = el; }}
                    className="absolute will-change-transform"
                    style={{
                        // Oversize the layers severely
                        width: "120vw",
                        height: "120vh",
                        left: "-10vw",
                        top: "-10vh",
                        // Pastel/Muted backgrounds getting darker towards the bottom
                        backgroundColor: `rgba(244, 240, 236, ${0.15 - index * 0.02})`,
                        // The magic CSS masking for topology
                        WebkitMaskImage: "url(/crauleyco-frontend/wave.svg)",
                        WebkitMaskSize: `${100 + index * 15}%`,
                        WebkitMaskPosition: "center",
                        WebkitMaskRepeat: "no-repeat",
                        // mask-composite: subtract is what makes it a "cutout"
                        WebkitMaskComposite: "destination-out",
                        maskComposite: "subtract",
                        // Fake inner shadow using drop-shadow on the mask bounds
                        filter: `drop-shadow(0px ${(index + 1) * 4}px ${(index + 1) * 8}px rgba(0,0,0,0.8))`,
                        zIndex: 10 - index,
                    }}
                />
            ))}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-zinc-950 z-20" />
        </div>
    );
}
