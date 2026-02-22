import Hero from './_components/Hero';
import Marquee from './_components/Marquee';
import CategoryGrid from './_components/CategoryGrid';
import FeaturedProducts from './_components/FeaturedProducts';
import SecondaryCategories from './_components/SecondaryCategories';

export default function PostersPage() {
    return (
        <div className="min-h-screen bg-[#f4f0ec]">
            <main>
                <Hero />
                <Marquee />
                <CategoryGrid />
                <FeaturedProducts />
                <SecondaryCategories />
            </main>
        </div>
    );
}
