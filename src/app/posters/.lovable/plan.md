
# CrauleyCo — Immersive E-Commerce Prototype

A bold, vibrant, visually stunning product showcase for Bags, Posters, Greeting Cards, and Art & Craft items — inspired by moblinks.fr's energetic aesthetic.

---

## 1. Brand Identity & Design System
- **Colors:** Bold yellow/orange primary palette with deep contrast (dark navy/black text), vibrant accent colors for CTAs
- **Typography:** Inter or Poppins — tight, impactful headings with generous weight; clean legible body text
- **Spacing:** Generous whitespace, large imagery, premium feel throughout

## 2. Sticky Header / Navigation
- Glassmorphism navbar (backdrop-blur, semi-transparent) that sticks on scroll
- **Left:** "CrauleyCo" bold text logo
- **Center (desktop):** Navigation links — Posters, Art & Craft, Bags, Greeting Cards
- **Right:** Cart icon with animated badge counter
- **Mobile:** Animated hamburger that opens a full-screen overlay menu with staggered link animations

## 3. Hero Section — Interactive SVG Background
- Full-viewport hero with animated SVG wave/blob shapes in bold yellow/orange tones (matching moblinks aesthetic)
- Mouse-tracking parallax — SVG layers shift subtly based on cursor position
- Bold headline text ("CrauleyCo" tagline) overlaid with a "Scroll to Discover" or "Shop Now" CTA button
- Smooth entrance animations on page load

## 4. Marquee Text Banner
- Infinite horizontal scrolling text strip (like moblinks' "but to dream is not enough" section)
- Bold, uppercase typography creating visual rhythm between sections

## 5. Primary Category Grid — Posters & Art & Craft
- Large asymmetrical "Bento box" grid immediately below the hero
- Two hero-sized tiles for **Posters** and **Art & Craft Items** with striking placeholder imagery
- Hover effects: subtle zoom, overlay reveal with category name and "Explore" CTA
- Staggered scroll-reveal animations as tiles enter viewport

## 6. Featured Products Section
- Grid of product cards (6+ mock products) with:
  - Product image, name, price, category badge
  - Smooth hover states (scale, shadow lift, quick info reveal)
  - Staggered fade-in on scroll
- Filterable by category or shown in a curated layout

## 7. Secondary Categories — Bags & Greeting Cards
- Sleek horizontal scroll carousel or a smaller grid section
- Clean card design with hover interactions
- Positioned below the primary grid to maintain hierarchy

## 8. Footer
- Clean, dark-themed footer with brand info, category quick-links, social media icons, and a newsletter-style CTA

## 9. Mock Data
- 8+ diverse mock products across all 4 categories with id, name, category, price, image placeholder, and description

## 10. Animations & Interactions (Framer Motion)
- Page-load entrance animations for hero content
- Scroll-triggered staggered reveals for all sections
- Smooth 60fps transitions on all interactive elements
- Premium button hover states with scale/color shifts
- Mobile-friendly: reduced motion where appropriate

## Tech Approach
- React + Tailwind CSS + Framer Motion for all animations
- Fully responsive across mobile, tablet, and desktop
- Modular component architecture (Header, Hero, CategoryGrid, ProductCard, Marquee, Footer)
- All data from local mock JSON — no backend needed
