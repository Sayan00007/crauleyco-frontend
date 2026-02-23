import ProductClient from "./ProductClient";
import { mockProducts } from "@/data/mockProducts";

export function generateStaticParams() {
    return mockProducts.map((product) => ({
        id: product.id,
    }));
}

export default function ProductPage({ params }: any) {
    return <ProductClient params={params} />;
}
