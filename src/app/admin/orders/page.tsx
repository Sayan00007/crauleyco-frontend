"use client";

import { useEffect, useState } from "react";
import { PackageOpen } from "lucide-react";

interface Order {
    id: string;
    razorpay_order_id: string;
    status: string;
    total_amount: number;
    created_at: string;
}

export default function AdminOrders() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                // We mock this slightly for the frontend until the backend route is built
                const response = await fetch("http://localhost:4000/api/admin/orders", {
                    // Headers would normally include the Bearer token here
                });
                if (response.ok) {
                    const data = await response.json();
                    setOrders(data);
                }
            } catch (error) {
                console.error("Failed to fetch orders:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (isLoading) {
        return (
            <div className="h-full flex items-center justify-center font-mono uppercase tracking-widest text-sm text-zinc-500">
                [ Analyzing Ledger... ]
            </div>
        );
    }

    return (
        <div className="animate-in fade-in duration-500 max-w-6xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-brand-display font-bold text-white uppercase tracking-tighter">Order Management System</h1>
                <p className="text-zinc-500 font-sans mt-1">Review active and completed transactions.</p>
            </div>

            {orders.length === 0 ? (
                <div className="bg-zinc-900 border border-white/10 rounded-xl p-12 flex flex-col items-center justify-center text-center">
                    <PackageOpen size={48} className="text-zinc-600 mb-4" strokeWidth={1} />
                    <h3 className="text-xl font-brand-display text-white mb-2">No active orders discovered.</h3>
                    <p className="font-sans text-sm text-zinc-500 max-w-sm">
                        The ledger is currently blank. As artifacts are acquired, their telemetry will appear here.
                    </p>
                </div>
            ) : (
                <div className="bg-zinc-900 border border-white/10 rounded-xl overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white/5 border-b border-white/10">
                                <th className="p-4 font-mono text-xs text-zinc-400 uppercase tracking-widest font-normal">Order Ref</th>
                                <th className="p-4 font-mono text-xs text-zinc-400 uppercase tracking-widest font-normal">Date (UTC)</th>
                                <th className="p-4 font-mono text-xs text-zinc-400 uppercase tracking-widest font-normal">Status</th>
                                <th className="p-4 font-mono text-xs text-zinc-400 uppercase tracking-widest font-normal text-right">Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors cursor-pointer">
                                    <td className="p-4">
                                        <div className="font-mono text-sm text-white truncate max-w-[200px]">
                                            {order.id}
                                        </div>
                                        <div className="font-mono text-xs text-zinc-600 mt-1">
                                            {order.razorpay_order_id}
                                        </div>
                                    </td>
                                    <td className="p-4 font-mono text-sm text-zinc-400">
                                        {new Date(order.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded text-xs font-mono uppercase tracking-widest bg-emerald-500/10 text-emerald-400`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right font-mono text-sm text-white">
                                        ${order.total_amount.toFixed(2)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
