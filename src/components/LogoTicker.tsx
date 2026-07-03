import { motion } from "motion/react";

export default function LogoTicker() {
  const logos = [
    { name: "Figma", path: "FIGMA" },
    { name: "Stripe", path: "STRIPE" },
    { name: "Google", path: "GOOGLE" },
    { name: "Airbnb", path: "AIRBNB" },
    { name: "Vercel", path: "VERCEL" },
    { name: "Linear", path: "LINEAR" },
    { name: "Supabase", path: "SUPABASE" },
    { name: "Github", path: "GITHUB" },
  ];

  // We duplicate the logos array to ensure a seamless infinite scroll loop
  const duplicatedLogos = [...logos, ...logos, ...logos, ...logos];

  return (
    <section className="py-12 border-y border-gray-100 bg-white overflow-hidden relative w-full" id="credibility-logos">
      {/* Absolute side gradients for soft fade out on edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 mb-6 text-center">
        <p className="text-[11px] md:text-xs font-mono font-bold uppercase tracking-[0.2em] text-gray-400">
          Trusted by designers at world-class teams
        </p>
      </div>

      <div className="flex w-full overflow-hidden">
        <motion.div
          animate={{ x: [0, -1920] }}
          transition={{
            ease: "linear",
            duration: 35,
            repeat: Infinity,
          }}
          className="flex gap-16 md:gap-24 whitespace-nowrap pr-16 md:pr-24 cursor-grab active:cursor-grabbing"
        >
          {duplicatedLogos.map((logo, index) => (
            <div
              key={index}
              className="flex items-center gap-2 text-gray-300 hover:text-gray-800 transition-colors duration-300 select-none"
            >
              {/* Beautiful custom typographic logo representation */}
              <span className="font-display font-black tracking-tighter text-lg md:text-xl uppercase">
                {logo.name}
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-sapforce-lime opacity-0 hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
