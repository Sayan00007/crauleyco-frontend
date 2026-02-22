import { create } from "zustand";
import { Product } from "@/types/product";

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
            // Fetch from the new Express backend
            const response = await fetch("http://localhost:4000/api/products");

            if (!response.ok) {
                throw new Error("Failed to fetch products from server");
            }

            const data = await response.json();
            set({ products: data, isLoading: false });
        } catch (error: any) {
            console.error("Catalog fetch error:", error);
            set({ error: error.message, isLoading: false });
        }
    },
}));
