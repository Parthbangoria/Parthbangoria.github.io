import { motion } from "motion/react";
import { Star, MessageSquareQuote } from "lucide-react";

export default function Testimonials() {
  const reviews = [
    {
      quote: "The interactive canvas speed in Sapforce is unlike anything we've worked with. Real-time co-presence with absolute zero latency allowed our design sprint duration to be cut completely in half.",
      author: "Marcus Vance",
      role: "VP of Product, Figma Systems",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
    },
    {
      quote: "The volume pricing scaler is completely honest. Being able to scale API processing capacity dynamically saved us over 40% on overhead costs while rendering complex layouts smoothly.",
      author: "Elara Croft",
      role: "Director of UX, Stripe Hub",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
    },
    {
      quote: "The design craftsmanship is incredible. Integrating procedural elements like the custom avatar builder directly into active templates was a massive level up for our design workflow.",
      author: "Dorian Reyes",
      role: "Staff Frontend Engineer, Vercel Corp",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
    },
  ];

  return (
    <section className="py-24 bg-white relative" id="testimonials">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Title */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="px-3.5 py-1.5 rounded-full bg-gray-100 text-gray-800 text-[11px] font-mono font-bold tracking-widest uppercase inline-block mb-3"
          >
            Client Testimonials
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-display font-black tracking-tight text-gray-950"
          >
            What the industry says<span className="text-sapforce-lime">.</span>
          </motion.h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ y: -6, shadow: "0 25px 50px -12px rgba(0,0,0,0.05)" }}
              className="p-8 rounded-3xl bg-gray-50 hover:bg-white border border-gray-100 hover:border-gray-200 transition-all duration-300 flex flex-col justify-between shadow-sm relative group"
            >
              {/* Giant quote icon */}
              <div className="absolute right-8 top-8 opacity-5 text-gray-400 group-hover:text-sapforce-lime group-hover:opacity-15 transition-all duration-300">
                <MessageSquareQuote className="w-14 h-14" />
              </div>

              <div>
                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-sapforce-lime text-sapforce-lime" />
                  ))}
                </div>

                <p className="text-sm text-gray-600 leading-relaxed italic mb-8 relative z-10">
                  "{rev.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3.5 border-t border-gray-100 pt-4 mt-auto">
                <img
                  src={rev.avatar}
                  alt={rev.author}
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full object-cover border border-gray-100 shadow-sm"
                />
                <div>
                  <h4 className="text-sm font-display font-black text-gray-900 leading-tight">
                    {rev.author}
                  </h4>
                  <p className="text-[11px] font-medium text-gray-400 mt-0.5 uppercase tracking-wide">
                    {rev.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
