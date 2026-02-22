"use client";

import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { LayoutDashboard, Package, ShoppingCart, LogOut } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { user, logout } = useAuthStore();
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        // Basic frontend protection: redirect if not logged in
        if (!user) {
            router.push("/login");
        }
    }, [user, router]);

    if (!isMounted || !user) {
        return (
            <div className="min-h-screen bg-zinc-950 flex items-center justify-center font-mono uppercase tracking-widest text-sm text-zinc-500">
                [ Authenticating... ]
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-300 flex">
            {/* Admin Sidebar */}
            <aside className="w-64 border-r border-white/10 bg-zinc-900/50 flex flex-col hidden md:flex">
                <div className="p-6 border-b border-white/10">
                    <Link href="/admin" className="font-brand-display text-2xl font-bold uppercase tracking-tighter text-white">
                        CrauleyCo.
                    </Link>
                    <p className="font-mono text-xs uppercase tracking-widest text-zinc-500 mt-1">
                        Command Center
                    </p>
                </div>

                <nav className="flex-1 p-4 flex flex-col gap-2">
                    <Link
                        href="/admin"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition-colors font-sans text-sm tracking-wide text-zinc-400 hover:text-white"
                    >
                        <LayoutDashboard size={18} strokeWidth={1.5} />
                        Overview
                    </Link>
                    <Link
                        href="/admin/catalog"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition-colors font-sans text-sm tracking-wide text-zinc-400 hover:text-white"
                    >
                        <Package size={18} strokeWidth={1.5} />
                        Catalog
                    </Link>
                    <Link
                        href="/admin/orders"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition-colors font-sans text-sm tracking-wide text-zinc-400 hover:text-white"
                    >
                        <ShoppingCart size={18} strokeWidth={1.5} />
                        Orders
                    </Link>
                </nav>

                <div className="p-4 border-t border-white/10">
                    <div className="px-4 py-3 mb-2 font-mono text-xs text-zinc-500 truncate">
                        {user.email}
                    </div>
                    <button
                        onClick={() => {
                            logout();
                            router.push("/");
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition-colors font-sans text-sm tracking-wide text-red-400 hover:text-red-300"
                    >
                        <LogOut size={18} strokeWidth={1.5} />
                        Terminate Session
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
                <header className="h-16 border-b border-white/10 flex items-center px-8 md:hidden">
                    <span className="font-brand-display text-xl font-bold uppercase tracking-tighter text-white">
                        CrauleyCo. Admin
                    </span>
                </header>
                <div className="flex-1 overflow-y-auto p-4 md:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
