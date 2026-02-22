import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import CategoryGrid from '@/components/CategoryGrid';
import FeaturedProducts from '@/components/FeaturedProducts';
import SecondaryCategories from '@/components/SecondaryCategories';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Marquee />
        <CategoryGrid />
        <FeaturedProducts />
        <SecondaryCategories />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
