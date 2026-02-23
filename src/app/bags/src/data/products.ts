/**
 * CrauleyCo Product Data
 * 10 premium bag products with placeholder images.
 * Images cycle through 4 generated product photos.
 * Easily swap image imports for real product photography.
 */

import bag1 from '@/assets/bag-1.jpg';
import bag2 from '@/assets/bag-2.jpg';
import bag3 from '@/assets/bag-3.jpg';
import bag4 from '@/assets/bag-4.jpg';

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  badge?: string;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Urban Voyager Tote',
    price: 23987,
    description: 'Hand-stitched full-grain leather tote with reinforced handles and a spacious interior. Perfect for daily commutes or weekend getaways.',
    category: 'Totes',
    image: bag1,
    badge: 'Best Seller',
  },
  {
    id: '2',
    name: 'Metro Crossbody',
    price: 16517,
    description: 'Sleek crossbody with adjustable strap and hidden zip compartment. Water-resistant exterior for all-weather carry.',
    category: 'Crossbody',
    image: bag2,
    badge: 'New',
  },
  {
    id: '3',
    name: 'Summit Backpack',
    price: 28967,
    description: 'Ergonomic leather backpack with padded laptop sleeve and anti-theft pocket. Built for urban explorers.',
    category: 'Backpacks',
    image: bag3,
  },
  {
    id: '4',
    name: 'Noir Evening Clutch',
    price: 14857,
    description: 'Textured metallic clutch with gold-tone hardware. The ultimate statement piece for formal occasions.',
    category: 'Clutches',
    image: bag4,
    badge: 'Limited',
  },
  {
    id: '5',
    name: 'Artisan Weekender',
    price: 35607,
    description: 'Oversized duffle-style tote crafted from vegetable-tanned leather. Includes detachable shoulder strap.',
    category: 'Totes',
    image: bag1,
  },
  {
    id: '6',
    name: 'Stealth Sling',
    price: 13197,
    description: 'Minimalist sling bag with RFID-blocking pocket. Ultra-lightweight at just 280g.',
    category: 'Crossbody',
    image: bag2,
    badge: 'Popular',
  },
  {
    id: '7',
    name: 'Explorer Pro Pack',
    price: 32287,
    description: 'Technical backpack with roll-top closure, water bottle holders, and ventilated back panel.',
    category: 'Backpacks',
    image: bag3,
  },
  {
    id: '8',
    name: 'Luxe Envelope Clutch',
    price: 18177,
    description: 'Slim envelope design in brushed suede with magnetic closure. Chain strap included.',
    category: 'Clutches',
    image: bag4,
    badge: 'New',
  },
  {
    id: '9',
    name: 'Heritage Briefcase',
    price: 38097,
    description: 'Classic briefcase reimagined with modern hardware and a dedicated tablet compartment.',
    category: 'Totes',
    image: bag1,
    badge: 'Premium',
  },
  {
    id: '10',
    name: 'Drift Messenger',
    price: 22327,
    description: 'Vintage-inspired messenger bag with brass buckle closures and canvas-lined interior.',
    category: 'Crossbody',
    image: bag2,
  },
];
