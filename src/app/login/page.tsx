"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";
import { ArrowRight, Lock } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const login = useAuthStore((state) => state.login);
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate API call and login
        login({ id: "1", name: "Guest User", email });
        router.push("/");
    };

    return (
        <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">

            {/* Dynamic Background Elements */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-white rounded-full mix-blend-overlay filter blur-[100px] animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] bg-zinc-600 rounded-full mix-blend-overlay filter blur-[80px] animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                className="w-full max-w-md relative z-10"
            >
                <Link
                    href="/"
                    className="font-brand-display text-4xl font-bold uppercase tracking-tighter text-white mb-12 block text-center"
                >
                    CrauleyCo.
                </Link>

                <div className="bg-zinc-900/50 backdrop-blur-xl border border-white/10 p-8 lg:p-12 rounded-2xl shadow-2xl">

                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 mb-8 mx-auto">
                        <Lock size={20} className="text-white" />
                    </div>

                    <h1 className="font-sans text-2xl text-white font-medium text-center mb-2">
                        Welcome Back
                    </h1>
                    <p className="font-mono text-xs text-zinc-500 uppercase tracking-widest text-center mb-8">
                        Enter your credentials to continue
                    </p>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2 relative group">
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="EMAIL ADDRESS"
                                className="w-full bg-transparent border-b border-zinc-700 text-white font-mono text-sm uppercase tracking-wider py-3 focus:outline-none focus:border-white transition-colors peer"
                            />
                            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-300 peer-focus:w-full"></span>
                        </div>

                        <div className="space-y-2 relative group pb-4">
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="PASSWORD"
                                className="w-full bg-transparent border-b border-zinc-700 text-white font-mono text-sm uppercase tracking-wider py-3 focus:outline-none focus:border-white transition-colors peer"
                            />
                            <span className="absolute bottom-4 left-0 w-0 h-[1px] bg-white transition-all duration-300 peer-focus:w-full"></span>
                        </div>

                        <button
                            type="submit"
                            className="w-full relative group flex items-center justify-between text-black bg-white px-6 py-4 rounded-full font-bold uppercase tracking-wider overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                        >
                            <span className="relative z-10 transition-colors duration-300 group-hover:text-white">Authenticate</span>
                            <div className="relative z-10 w-8 h-8 rounded-full flex items-center justify-center transform group-hover:translate-x-2 transition-all duration-300 group-hover:text-white">
                                <ArrowRight size={20} strokeWidth={2.5} />
                            </div>
                            <div className="absolute inset-0 bg-black transform scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-500 ease-[var(--animate-kinetic)] z-0"></div>
                        </button>
                    </form>

                    <div className="mt-8 text-center space-y-4">
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                login({ id: "admin-1", name: "System Admin", email: "admin@crauley.co" });
                                router.push("/");
                            }}
                            className="font-sans text-xs text-zinc-500 hover:text-white transition-all underline decoration-white/20 hover:decoration-white"
                        >
                            Log In (Curator Mode)
                        </button>
                        <p className="font-sans text-sm text-zinc-600 border-t border-white/5 pt-4">
                            Don't have an account? <a href="#" className="text-white hover:underline transition-all">Request Access</a>
                        </p>
                    </div>

                </div>
            </motion.div>
        </div>
    );
}
