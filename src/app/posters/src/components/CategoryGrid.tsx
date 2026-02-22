import { motion } from 'framer-motion';

const categories = [
  {
    name: 'Posters',
    image: 'https://images.unsplash.com/photo-1561839561-b13bcfe95249?w=800&h=1000&fit=crop',
    description: 'Bold prints for bold walls',
    id: 'posters',
  },
  {
    name: 'Art & Craft',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&h=1000&fit=crop',
    description: 'Unleash your inner artist',
    id: 'art-craft',
  },
];

const CategoryGrid = () => {
  return (
    <section id="posters" className="py-16 md:py-24 px-4 md:px-8">
      <div className="container mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-syne text-4xl md:text-6xl font-extrabold text-foreground mb-12 md:mb-16"
        >
          Our <span className="text-gradient">Collections</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {categories.map((cat, i) => (
            <motion.a
              key={cat.id}
              href={`#${cat.id}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group relative overflow-hidden rounded-2xl aspect-[4/5] md:aspect-[3/4] cursor-pointer"
            >
              <img
                src={cat.image}
                alt={cat.name}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent transition-opacity duration-500" />
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                <p className="font-grotesk text-sm uppercase tracking-widest text-background/60 mb-2">
                  {cat.description}
                </p>
                <h3 className="font-syne text-3xl md:text-5xl font-extrabold text-background">
                  {cat.name}
                </h3>
                <motion.span
                  className="inline-block mt-4 px-6 py-2.5 bg-primary text-primary-foreground font-grotesk font-semibold text-sm rounded-full opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400"
                >
                  Explore →
                </motion.span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
