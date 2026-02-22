"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { ShoppingBag, Menu, UserCircle } from "lucide-react";
import gsap from "gsap";
import { cn } from "@/lib/utils";
import { MobileMenu } from "./MobileMenu";
import { useCartStore } from "@/lib/store/cartStore";
import { useAuthStore } from "@/lib/store/authStore";

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [isMounted, setIsMounted] = useState(false);
    const lastScrollY = useRef(0);
    const headerRef = useRef<HTMLElement>(null);

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Call hooks at the top level
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const logout = useAuthStore((state) => state.logout);
    const toggleCart = useCartStore((state) => state.toggleCart);
    const cartItemCount = useCartStore((state) => state.getItemCount());

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Hiding/Showing Logic
            if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
                setIsVisible(false); // Scrolling down
            } else {
                setIsVisible(true);  // Scrolling up
            }

            // Background blur logic
            setIsScrolled(currentScrollY > 50);
            lastScrollY.current = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (isVisible) {
            gsap.to(headerRef.current, { y: 0, duration: 0.5, ease: "power3.out" });
        } else {
            gsap.to(headerRef.current, { y: "-100%", duration: 0.5, ease: "power3.in" });
        }
    }, [isVisible]);

    return (
        <>
            <header
                ref={headerRef}
                className={cn(
                    "fixed top-0 left-0 right-0 z-40 transition-colors duration-500 ease-in-out border-b border-transparent",
                    isScrolled ? "bg-zinc-950/70 backdrop-blur-md border-zinc-800/50" : "bg-transparent"
                )}
            >
                <div className="max-w-[1600px] mx-auto px-6 lg:px-12 h-20 md:h-24 flex items-center justify-between">

                    {/* Logo */}
                    <Link
                        href="/"
                        className="text-xl md:text-2xl font-bold tracking-tighter uppercase z-50 text-white"
                    >
                        CrauleyCo.
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8 lg:gap-12">
                        {[
                            { href: "/posters", label: "Posters" },
                            { href: "/posters", label: "Art & Craft" },
                            { href: "/bags", label: "Bags" },
                            { href: "/greeting-cards", label: "Cards" },
                        ].map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className="text-sm font-medium text-zinc-300 hover:text-white uppercase tracking-wider transition-colors relative group"
                            >
                                {link.label}
                                <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full ease-out"></span>
                            </Link>
                        ))}
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-5 z-50">

                        {/* Auth Module */}
                        <div className="hidden md:flex items-center gap-2">
                            {isAuthenticated ? (
                                <button
                                    onClick={logout}
                                    className="text-xs font-mono uppercase tracking-widest text-zinc-400 hover:text-white transition-colors"
                                >
                                    Log Out
                                </button>
                            ) : (
                                <Link
                                    href="/login"
                                    className="p-2 text-zinc-300 hover:text-white transition-colors group"
                                >
                                    <span className="sr-only">Account</span>
                                    <UserCircle size={22} strokeWidth={1.5} className="group-hover:scale-110 transition-transform duration-300" />
                                </Link>
                            )}
                        </div>

                        {/* Cart Toggle */}
                        <button
                            className="relative p-2 text-zinc-300 hover:text-white transition-colors group"
                            onClick={toggleCart}
                        >
                            <span className="sr-only">Cart</span>
                            <ShoppingBag size={22} strokeWidth={1.5} className="group-hover:scale-110 transition-transform duration-300" />
                            {isMounted && cartItemCount > 0 && (
                                <span className="absolute top-1 right-0 bg-white text-black text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center pointer-events-none">
                                    {cartItemCount}
                                </span>
                            )}
                        </button>

                        <button
                            className="md:hidden p-2 text-zinc-300 hover:text-white transition-colors"
                            onClick={() => setIsMobileMenuOpen(true)}
                        >
                            <span className="sr-only">Open Menu</span>
                            <Menu size={26} strokeWidth={1.5} />
                        </button>
                    </div>

                </div>
            </header>

            <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
        </>
    );
}
