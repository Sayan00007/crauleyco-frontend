"use client";

import { useCatalogStore } from "@/lib/store/catalogStore";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Plus, Edit2, Trash2 } from "lucide-react";

export default function AdminCatalog() {
    const { products, fetchProducts, isLoading } = useCatalogStore();

    useEffect(() => {
        if (products.length === 0) {
            fetchProducts();
        }
    }, [products.length, fetchProducts]);

    if (isLoading) {
        return (
            <div className="h-full flex items-center justify-center font-mono uppercase tracking-widest text-sm text-zinc-500">
                [ Fetching Catalog... ]
            </div>
        );
    }

    return (
        <div className="animate-in fade-in duration-500 max-w-6xl mx-auto">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-3xl font-brand-display font-bold text-white uppercase tracking-tighter">Catalog Management</h1>
                    <p className="text-zinc-500 font-sans mt-1">Add, modify, or decommission artifacts.</p>
                </div>
                <button className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg font-bold uppercase tracking-wider text-sm hover:bg-zinc-200 transition-colors">
                    <Plus size={16} strokeWidth={2.5} />
                    New Artifact
                </button>
            </div>

            <div className="bg-zinc-900 border border-white/10 rounded-xl overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-white/5 border-b border-white/10">
                            <th className="p-4 font-mono text-xs text-zinc-400 uppercase tracking-widest font-normal">Artifact</th>
                            <th className="p-4 font-mono text-xs text-zinc-400 uppercase tracking-widest font-normal">Category</th>
                            <th className="p-4 font-mono text-xs text-zinc-400 uppercase tracking-widest font-normal">Price</th>
                            <th className="p-4 font-mono text-xs text-zinc-400 uppercase tracking-widest font-normal">Stock</th>
                            <th className="p-4 font-mono text-xs text-zinc-400 uppercase tracking-widest font-normal text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                                <td className="p-4">
                                    <div className="flex items-center gap-4">
                                        <div className="relative w-12 h-16 bg-zinc-950 rounded overflow-hidden border border-white/5 shrink-0">
                                            <Image
                                                src={product.placeholderImageUrl}
                                                alt={product.name}
                                                fill
                                                className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                            />
                                        </div>
                                        <span className="font-sans font-medium text-white">{product.name}</span>
                                    </div>
                                </td>
                                <td className="p-4 font-mono text-xs text-zinc-500 uppercase tracking-widest">{product.category}</td>
                                <td className="p-4 font-mono text-sm text-white">₹{product.price.toFixed(2)}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-xs font-mono ${(product.stock || 0) > 0 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                                        {(product.stock || 0) > 0 ? `IN STOCK (${product.stock})` : 'DEPLOYED'}
                                    </span>
                                </td>
                                <td className="p-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button className="p-2 text-zinc-500 hover:text-white hover:bg-white/10 rounded transition-colors" title="Edit">
                                            <Edit2 size={16} strokeWidth={2} />
                                        </button>
                                        <button className="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors" title="Decommission">
                                            <Trash2 size={16} strokeWidth={2} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
