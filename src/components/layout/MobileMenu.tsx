"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const navLinks = [
    { href: "/posters", label: "Posters" },
    { href: "/posters", label: "Art & Craft" },
    { href: "/bags", label: "Bags" },
    { href: "/posters", label: "Greeting Cards" },
];

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
    const overlayRef = useRef<HTMLDivElement>(null);
    const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);

    useEffect(() => {
        if (isOpen) {
            gsap.to(overlayRef.current, {
                y: 0,
                duration: 0.8,
                ease: "expo.out",
            });

            gsap.fromTo(
                linksRef.current,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "expo.out",
                    delay: 0.2,
                }
            );
        } else {
            gsap.to(overlayRef.current, {
                y: "-100%",
                duration: 0.8,
                ease: "expo.inOut",
            });
        }
    }, [isOpen]);

    return (
        <div
            ref={overlayRef}
            className={cn(
                "fixed inset-0 z-50 flex flex-col items-center justify-center bg-zinc-950 text-zinc-50 transform -translate-y-full px-6",
                !isOpen && "pointer-events-none"
            )}
        >
            <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 text-zinc-400 hover:text-white transition-colors"
            >
                <span className="sr-only">Close Menu</span>
                <X size={32} strokeWidth={1.5} />
            </button>

            <nav className="flex flex-col items-center space-y-8 text-center mt-12">
                {navLinks.map((link, idx) => (
                    <Link
                        key={link.label}
                        href={link.href}
                        onClick={onClose}
                        ref={(el) => {
                            linksRef.current[idx] = el;
                        }}
                        className="text-4xl sm:text-6xl md:text-7xl font-bold font-syne uppercase tracking-tight hover:text-zinc-400 transition-colors"
                    >
                        {link.label}
                    </Link>
                ))}
            </nav>

            <div className="absolute bottom-12 text-sm text-zinc-500 font-medium tracking-widest uppercase">
                CrauleyCo. © 2026
            </div>
        </div>
    );
}
