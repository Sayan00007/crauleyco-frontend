export interface Product {
    id: string;
    name: string;
    category: 'Posters' | 'Art & Craft' | 'Bags' | 'Greeting Cards';
    price: number;
    image: string;
    description: string;
}

export const products: Product[] = [
    {
        id: '1',
        name: 'Sunset Boulevard Print',
        category: 'Posters',
        price: 29.99,
        image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&h=800&fit=crop',
        description: 'A vibrant retro-inspired sunset poster perfect for any living space.',
    },
    {
        id: '2',
        name: 'Abstract Geometry',
        category: 'Posters',
        price: 34.99,
        image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&h=800&fit=crop',
        description: 'Bold geometric shapes in striking colors — a statement piece.',
    },
    {
        id: '3',
        name: 'Handmade Ceramic Kit',
        category: 'Art & Craft',
        price: 49.99,
        image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&h=800&fit=crop',
        description: 'Everything you need to craft beautiful ceramics at home.',
    },
    {
        id: '4',
        name: 'Watercolor Essentials',
        category: 'Art & Craft',
        price: 39.99,
        image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=800&fit=crop',
        description: 'Professional-grade watercolor set for artists of all levels.',
    },
    {
        id: '5',
        name: 'Canvas Tote – Ochre',
        category: 'Bags',
        price: 24.99,
        image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&h=800&fit=crop',
        description: 'Durable canvas tote in a warm ochre tone. Carry art everywhere.',
    },
    {
        id: '6',
        name: 'Leather Crossbody',
        category: 'Bags',
        price: 59.99,
        image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=800&fit=crop',
        description: 'Handcrafted leather crossbody bag with artisan stitching.',
    },
    {
        id: '7',
        name: 'Floral Wishes Card Set',
        category: 'Greeting Cards',
        price: 12.99,
        image: 'https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=600&h=800&fit=crop',
        description: 'Set of 8 hand-illustrated floral greeting cards.',
    },
    {
        id: '8',
        name: 'Minimalist Thank You Pack',
        category: 'Greeting Cards',
        price: 9.99,
        image: 'https://images.unsplash.com/photo-1606567595334-d39972c85dbe?w=600&h=800&fit=crop',
        description: 'Clean, modern thank-you cards for every occasion.',
    },
    {
        id: '9',
        name: 'Botanical Line Art',
        category: 'Posters',
        price: 27.99,
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=800&fit=crop',
        description: 'Delicate botanical illustrations on premium matte paper.',
    },
    {
        id: '10',
        name: 'Macramé Wall Hanging Kit',
        category: 'Art & Craft',
        price: 44.99,
        image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&h=800&fit=crop',
        description: 'Create stunning macramé art with this all-inclusive kit.',
    },
];

export const categories = ['Posters', 'Art & Craft', 'Bags', 'Greeting Cards'] as const;
