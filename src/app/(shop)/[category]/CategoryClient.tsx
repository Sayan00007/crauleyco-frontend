"use client";

import { notFound } from "next/navigation";
import { useCatalogStore } from "@/lib/store/catalogStore";
import { BentoGrid } from "@/components/grid/BentoGrid";
import { use, useEffect } from "react";

// Define the valid category segments mapping to the mock data exactly
const validCategories = ["posters", "art-and-craft", "greeting-cards"];

const categoryMap: Record<string, string> = {
    "posters": "Posters",
    "art-and-craft": "Art & Craft",
    "greeting-cards": "Greeting Cards",
};

interface CategoryPageProps {
    params: Promise<{
        category: string;
    }>;
}

export default function CategoryPage({ params }: CategoryPageProps) {
    const { category } = use(params);
    const { products, isLoading, fetchProducts } = useCatalogStore();

    useEffect(() => {
        if (products.length === 0) {
            fetchProducts();
        }
    }, [products.length, fetchProducts]);

    if (!validCategories.includes(category)) {
        notFound();
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-surface-pastel flex items-center justify-center font-mono uppercase tracking-widest text-sm">
                [ Filtering Category... ]
            </div>
        );
    }

    const categoryName = categoryMap[category];
    const categoryProducts = products.filter((p) => p.category === categoryName);

    return (
        <div className="min-h-screen bg-surface-pastel pt-32 pb-24">
            <div className="max-w-[1600px] mx-auto px-6 lg:px-12 mb-12">
                <h1 className="font-brand-display text-5xl md:text-7xl font-bold uppercase tracking-tighter text-zinc-900 leading-none">
                    {categoryName}
                </h1>
                <p className="mt-4 text-zinc-600 font-sans max-w-md">
                    Explore our curated selection of {categoryName.toLowerCase()}, designed for the modern aesthetic.
                </p>
            </div>

            {/* Re-using the BentoGrid engine for layout consistency */}
            <BentoGrid products={categoryProducts} />
        </div>
    );
}
