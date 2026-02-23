"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/lib/store/cartStore";
import { X, Minus, Plus, ShoppingBag, ArrowRight, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLenis } from "@studio-freight/react-lenis";



export function CartDrawer() {
    const { items, isOpen, closeCart, updateQuantity, removeItem, getCartTotal, clearCart } = useCartStore();
    const lenis = useLenis();
    const [isCheckingOut, setIsCheckingOut] = useState(false);

    const handleCheckout = async () => {
        setIsCheckingOut(true);
        try {
            // Simulate processing payment
            await new Promise(resolve => setTimeout(resolve, 1500));

            alert("Artifact Assembly Complete. Mock payment verified.");
            clearCart();
            closeCart();

        } catch (error: any) {
            console.error("Checkout Error:", error);
            alert(error.message || "Checkout encountered an error.");
        } finally {
            setIsCheckingOut(false);
        }
    };

    // Stop Lenis background scrolling when cart is open
    useEffect(() => {
        if (isOpen) {
            lenis?.stop();
        } else {
            lenis?.start();
        }
    }, [isOpen, lenis]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeCart}
                        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Drawer Panel */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", bounce: 0, duration: 0.6 }}
                        className="fixed top-0 right-0 bottom-0 z-50 w-full md:w-[28rem] lg:w-[32rem] bg-zinc-950 border-l border-white/10 flex flex-col shadow-2xl"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-white/10">
                            <h2 className="font-brand-display text-2xl font-bold uppercase tracking-tighter text-white flex items-center gap-3">
                                <ShoppingBag size={24} strokeWidth={1.5} />
                                Your Bag
                            </h2>
                            <button
                                onClick={closeCart}
                                className="p-2 text-zinc-400 hover:text-white transition-colors"
                                aria-label="Close Cart"
                            >
                                <X size={24} strokeWidth={1.5} />
                            </button>
                        </div>

                        {/* Items List */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {items.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-zinc-500 space-y-4">
                                    <ShoppingBag size={48} strokeWidth={1} />
                                    <p className="font-sans text-center">Your bag is currently empty.</p>
                                    <button
                                        onClick={closeCart}
                                        className="mt-8 text-white uppercase font-bold tracking-widest text-sm border-b border-white pb-1 hover:text-zinc-400 hover:border-zinc-400 transition-colors"
                                    >
                                        Continue Browsing
                                    </button>
                                </div>
                            ) : (
                                items.map((item) => (
                                    <div key={item?.id} className="flex gap-4 group">
                                        <div className="relative w-24 h-32 bg-zinc-900 rounded-lg overflow-hidden shrink-0 border border-white/5">
                                            <Image
                                                src={item?.placeholderImageUrl || ''}
                                                alt={item?.name || 'Item'}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between py-1">
                                            <div>
                                                <div className="flex justify-between items-start mb-1">
                                                    <Link
                                                        href={`/product/${item?.id}`}
                                                        onClick={closeCart}
                                                        className="font-brand-display text-lg font-bold leading-tight uppercase text-white hover:text-zinc-300 transition-colors"
                                                    >
                                                        {item?.name}
                                                    </Link>
                                                    <button
                                                        onClick={() => item?.id && removeItem(item.id)}
                                                        className="text-zinc-600 hover:text-red-400 transition-colors"
                                                        aria-label={`Remove ${item?.name}`}
                                                    >
                                                        <X size={16} strokeWidth={2} />
                                                    </button>
                                                </div>
                                                <span className="font-mono text-xs uppercase tracking-widest text-zinc-500">
                                                    {item?.category}
                                                </span>
                                            </div>

                                            <div className="flex items-end justify-between">
                                                <div className="flex items-center gap-3 border border-white/10 rounded-full py-1 px-3 bg-white/5">
                                                    <button
                                                        onClick={() => item?.id && updateQuantity(item.id, item.quantity - 1)}
                                                        className="text-zinc-400 hover:text-white transition-colors"
                                                    >
                                                        <Minus size={14} strokeWidth={2} />
                                                    </button>
                                                    <span className="font-mono text-sm w-4 text-center text-white">
                                                        {item?.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => item?.id && updateQuantity(item.id, item.quantity + 1)}
                                                        className="text-zinc-400 hover:text-white transition-colors"
                                                    >
                                                        <Plus size={14} strokeWidth={2} />
                                                    </button>
                                                </div>
                                                <span className="font-mono text-white">
                                                    ₹{((item?.price || 0) * (item?.quantity || 1)).toFixed(2)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer / Checkout */}
                        {items.length > 0 && (
                            <div className="p-6 border-t border-white/10 bg-zinc-900/50">
                                <div className="flex justify-between items-end mb-6">
                                    <span className="font-sans text-sm text-zinc-400 uppercase tracking-widest">Subtotal</span>
                                    <span className="font-mono text-2xl font-bold text-white">
                                        ₹{getCartTotal().toFixed(2)}
                                    </span>
                                </div>

                                <button
                                    onClick={handleCheckout}
                                    disabled={isCheckingOut}
                                    className="w-full relative group flex items-center justify-between bg-white text-black px-6 py-4 rounded-full font-bold uppercase tracking-wider overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none"
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        {isCheckingOut ? (
                                            <>
                                                <Loader2 className="animate-spin" size={18} />
                                                Processing...
                                            </>
                                        ) : (
                                            "Proceed to Checkout"
                                        )}
                                    </span>
                                    <div className="relative z-10 w-8 h-8 rounded-full flex items-center justify-center transform group-hover:translate-x-2 transition-transform duration-300">
                                        <ArrowRight size={20} strokeWidth={2.5} />
                                    </div>
                                    <div className="absolute inset-0 bg-zinc-200 transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-[var(--animate-kinetic)] z-0"></div>
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
