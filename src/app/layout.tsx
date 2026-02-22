import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Header } from "@/components/layout/Header";
import { CartDrawer } from "@/components/cart/CartDrawer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CrauleyCo | Cinematic E-commerce",
  description: "Modern, highly fluid, and cinematic e-commerce prototype.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} ${syne.variable} antialiased font-sans flex flex-col min-h-screen bg-zinc-950`} suppressHydrationWarning>
        <SmoothScroll>
          <Header />
          <CartDrawer />
          <main className="flex-grow relative">{children}</main>
        </SmoothScroll>
      </body>
    </html>
  );
}
