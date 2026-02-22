export type Category = "Bags" | "Posters" | "Greeting Cards" | "Art & Craft";

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: Category;
    placeholderImageUrl: string;
    created_at?: string;
    updated_at?: string;
    stock?: number;
}
