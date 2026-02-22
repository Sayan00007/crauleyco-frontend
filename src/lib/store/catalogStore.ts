import { create } from "zustand";
import { Product } from "@/types/product";
import { mockProducts } from "@/data/mockProducts";

interface CatalogState {
    products: Product[];
    isLoading: boolean;
    error: string | null;
    fetchProducts: () => Promise<void>;
}

export const useCatalogStore = create<CatalogState>((set) => ({
    products: [],
    isLoading: true,
    error: null,
    fetchProducts: async () => {
        try {
            set({ isLoading: true, error: null });

            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 800));

            // Load static mock data
            set({ products: mockProducts, isLoading: false });
        } catch (error: any) {
            console.error("Catalog fetch error:", error);
            set({ error: error.message, isLoading: false });
        }
    },
}));
