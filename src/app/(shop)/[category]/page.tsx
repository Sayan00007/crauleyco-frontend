import CategoryClient from "./CategoryClient";

export function generateStaticParams() {
    return [
        { category: "posters" },
        { category: "art-and-craft" },
        { category: "greeting-cards" },
    ];
}

export default function CategoryPage({ params }: any) {
    return <CategoryClient params={params} />;
}
