import { motion } from 'framer-motion';

const Marquee = () => {
  const text = 'POSTERS • ART & CRAFT • BAGS • GREETING CARDS • DESIGNED TO INSPIRE • ';
  const repeated = text.repeat(4);

  return (
    <section className="overflow-hidden py-6 md:py-8 bg-primary">
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="whitespace-nowrap"
      >
        <span className="font-syne text-2xl md:text-4xl font-extrabold tracking-tight text-primary-foreground">
          {repeated}
        </span>
      </motion.div>
    </section>
  );
};

export default Marquee;
