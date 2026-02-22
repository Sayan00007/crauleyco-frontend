import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-16 md:py-24 px-4 md:px-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="font-syne text-3xl font-extrabold mb-4">
              Crauley<span className="text-primary">Co</span>
            </h3>
            <p className="font-grotesk text-background/50 max-w-sm text-sm leading-relaxed">
              Curated art, handcrafted goods, and bold designs for people who refuse to blend in.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-syne font-bold text-sm uppercase tracking-widest mb-4 text-background/40">Shop</h4>
            <ul className="space-y-2">
              {['Posters', 'Art & Craft', 'Bags', 'Greeting Cards'].map((link) => (
                <li key={link}>
                  <a href="#" className="font-grotesk text-sm text-background/60 hover:text-primary transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-syne font-bold text-sm uppercase tracking-widest mb-4 text-background/40">Stay Updated</h4>
            <p className="font-grotesk text-sm text-background/50 mb-4">Get early access to new drops.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2.5 bg-background/10 border border-background/10 rounded-l-full text-sm font-grotesk text-background placeholder:text-background/30 focus:outline-none focus:border-primary"
              />
              <button className="px-5 py-2.5 bg-primary text-primary-foreground font-grotesk font-semibold text-sm rounded-r-full hover:bg-primary/90 transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-background/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-grotesk text-xs text-background/30">
            © 2026 CrauleyCo. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Instagram', 'Twitter', 'Pinterest'].map((s) => (
              <a key={s} href="#" className="font-grotesk text-xs text-background/30 hover:text-primary transition-colors">
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
