/**
 * Homepage — CrauleyCo storefront.
 * Hero → 3D Viewer → Product Grid → Promo Banner → Footer
 */

import NavBar from '@/components/NavBar';
import HeroSection from '@/components/HeroSection';
import ThreeDViewer from '@/components/ThreeDViewer';
import ProductGrid from '@/components/ProductGrid';
import PromoSection from '@/components/PromoSection';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <main>
        <HeroSection />
        <ThreeDViewer />
        <ProductGrid />
        <PromoSection />
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
};

export default Index;
