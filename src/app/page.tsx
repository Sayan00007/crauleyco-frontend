"use client";

import { useEffect } from "react";
import { Hero } from "@/components/hero/Hero";
import { BentoGrid } from "@/components/grid/BentoGrid";
import { HorizontalCategoryScroll } from "@/components/grid/HorizontalCategoryScroll";
import { useCatalogStore } from "@/lib/store/catalogStore";

export default function Home() {
  const { products, isLoading, error, fetchProducts } = useCatalogStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white font-mono uppercase tracking-widest text-sm">
        [ Parsing Database... ]
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-red-500 font-mono uppercase tracking-widest text-sm">
        [ API Error: {error} ]
      </div>
    );
  }

  return (
    <>
      <Hero />
      <BentoGrid products={products} />
      <HorizontalCategoryScroll products={products} />
    </>
  );
}

