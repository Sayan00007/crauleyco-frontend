/**
 * PromoSection — Parallax banner with bold messaging.
 * Background uses fixed attachment for parallax scroll effect.
 */

import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import heroBg from '@/assets/hero-bg.jpg';

export default function PromoSection() {
  const { ref, isVisible } = useScrollAnimation(0.2);

  return (
    <section
      className="relative py-32 sm:py-40 px-4 parallax-bg"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />

      <div
        ref={ref}
        className={`relative z-10 max-w-4xl mx-auto text-center scroll-fade-in ${isVisible ? 'visible' : ''}`}
      >
        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
          CRAFTED FOR THOSE
          <br />
          WHO <span className="text-primary">DARE</span>
        </h2>
        <p className="text-muted-foreground text-lg mt-6 max-w-xl mx-auto">
          Each bag is a statement. Precision-engineered from ethically sourced materials,
          designed to turn heads and stand the test of time.
        </p>
      </div>
    </section>
  );
}
