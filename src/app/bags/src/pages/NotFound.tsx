/**
 * 404 Page — Creative, on-brand error page for CrauleyCo.
 * Bold typography, animated visual, prominent CTA.
 */

import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    console.error('404 Error: User attempted to access non-existent route:', location.pathname);
    setLoaded(true);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 overflow-hidden">
      {/* Animated background glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, hsl(210 100% 55% / 0.4) 0%, transparent 70%)',
            animation: 'pulse 3s ease-in-out infinite',
          }}
        />
      </div>

      <div className="relative z-10 text-center">
        <h1
          className={`text-[10rem] sm:text-[14rem] font-bold leading-none tracking-tighter text-primary/20 transition-all duration-1000 ${
            loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          }`}
        >
          404
        </h1>

        <div
          className={`-mt-12 sm:-mt-16 transition-all duration-1000 delay-300 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Lost Your <span className="text-primary">Way?</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto mb-8">
            This page doesn't exist — but our bags do. Let's get you back on track.
          </p>

          <Button
            size="lg"
            className="gap-2 rounded-full px-8 py-6 text-lg shadow-[0_0_30px_hsl(210_100%_55%/0.3)]"
            asChild
          >
            <a href="/">
              <ArrowLeft className="h-5 w-5" />
              Return to Shop
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
