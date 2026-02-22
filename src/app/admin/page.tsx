"use client";

import { useCatalogStore } from "@/lib/store/catalogStore";
import { useEffect } from "react";
import { Package, TrendingUp, Users } from "lucide-react";

export default function AdminOverview() {
    const { products, fetchProducts, isLoading } = useCatalogStore();

    useEffect(() => {
        if (products.length === 0) {
            fetchProducts();
        }
    }, [products.length, fetchProducts]);

    if (isLoading) {
        return (
            <div className="h-full flex items-center justify-center font-mono uppercase tracking-widest text-sm text-zinc-500">
                [ Parsing Telemetry... ]
            </div>
        );
    }

    const totalValue = products.reduce((acc, p) => acc + (p.price * (p.stock || 1)), 0);

    return (
        <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-brand-display font-bold text-white uppercase tracking-tighter">System Overview</h1>
                <p className="text-zinc-500 font-sans mt-1">Real-time telemetry and artifact status.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-zinc-900 border border-white/10 rounded-xl p-6 relative overflow-hidden group">
                    <div className="flex justify-between items-start mb-4 relative z-10">
                        <div>
                            <p className="font-mono text-xs uppercase tracking-widest text-zinc-500 mb-1">Total Artifacts</p>
                            <h3 className="text-3xl font-brand-display font-bold text-white">{products.length}</h3>
                        </div>
                        <div className="p-3 bg-white/5 rounded-lg text-zinc-400 group-hover:text-white transition-colors">
                            <Package size={24} strokeWidth={1.5} />
                        </div>
                    </div>
                </div>

                <div className="bg-zinc-900 border border-white/10 rounded-xl p-6 relative overflow-hidden group">
                    <div className="flex justify-between items-start mb-4 relative z-10">
                        <div>
                            <p className="font-mono text-xs uppercase tracking-widest text-zinc-500 mb-1">Gross Inventory Value</p>
                            <h3 className="text-3xl font-brand-display font-bold text-white">${totalValue.toFixed(2)}</h3>
                        </div>
                        <div className="p-3 bg-white/5 rounded-lg text-zinc-400 group-hover:text-white transition-colors">
                            <TrendingUp size={24} strokeWidth={1.5} />
                        </div>
                    </div>
                </div>

                <div className="bg-zinc-900 border border-white/10 rounded-xl p-6 relative overflow-hidden group">
                    <div className="flex justify-between items-start mb-4 relative z-10">
                        <div>
                            <p className="font-mono text-xs uppercase tracking-widest text-zinc-500 mb-1">Active Sessions</p>
                            <h3 className="text-3xl font-brand-display font-bold text-white">1</h3>
                        </div>
                        <div className="p-3 bg-white/5 rounded-lg text-zinc-400 group-hover:text-white transition-colors">
                            <Users size={24} strokeWidth={1.5} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions / Recent Activity Placeholder */}
            <div className="bg-zinc-900 border border-white/10 rounded-xl p-6">
                <h2 className="text-xl font-brand-display font-bold text-white uppercase tracking-tighter mb-4">Recent Activity Logs</h2>
                <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                        <div className="flex items-center gap-3 cursor-pointer">
                            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                            <span className="font-sans text-sm text-zinc-300">System initialized successfully</span>
                        </div>
                        <span className="font-mono text-xs text-zinc-600">JUST NOW</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                            <span className="font-sans text-sm text-zinc-300">Catalog synchronized with external terminal</span>
                        </div>
                        <span className="font-mono text-xs text-zinc-600">2 MIN AGO</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
