/**
 * HeroSection — Full-viewport hero with background image (video-ready).
 * Includes poster fallback. Video element is structured for future integration.
 */

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import heroBg from '@/assets/hero-bg.jpg';

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Stagger the hero content fade-in on mount
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background image (swap for <video> when ready) */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        {/*
          VIDEO PLACEHOLDER — Uncomment and add src for HTML5 background video:
          <video
            autoPlay muted loop playsInline
            poster={heroBg}
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
        */}
      </div>

      {/* Dark overlay for text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />

      {/* Hero content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1
          className={`text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight leading-none mb-6 transition-all duration-1000 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          CARRY YOUR{' '}
          <span className="text-primary">WORLD</span>
        </h1>

        <p
          className={`text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 transition-all duration-1000 delay-200 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Redefining luxury, one bag at a time. Handcrafted from the finest materials
          for those who dare to stand out.
        </p>

        <div
          className={`transition-all duration-1000 delay-500 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <Button
            size="lg"
            className="text-lg px-10 py-6 rounded-full font-semibold bg-primary hover:bg-primary/90 shadow-[0_0_30px_hsl(210_100%_55%/0.4)] hover:shadow-[0_0_50px_hsl(210_100%_55%/0.6)] transition-shadow duration-300"
            asChild
          >
            <a href="#shop">Shop Now</a>
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDown className="h-6 w-6 text-muted-foreground" />
      </div>
    </section>
  );
}
