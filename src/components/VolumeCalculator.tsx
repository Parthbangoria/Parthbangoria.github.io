import { motion } from "motion/react";
import { Check, Cpu, Zap, Cloud, ShieldCheck } from "lucide-react";

interface VolumeCalculatorProps {
  volume: number;
  setVolume: (v: number) => void;
}

export default function VolumeCalculator({ volume, setVolume }: VolumeCalculatorProps) {
  // Volume tiers calculation
  // Base price: $10/user. High volumes get bulk discounts
  const users = Math.round(volume * 2.5); // ranges from 0 to 250 users
  const getTier = (u: number) => {
    if (u <= 15) return { name: "Starter", discount: 0, speed: "Normal", api: "5,000/day" };
    if (u <= 80) return { name: "Professional", discount: 15, speed: "Turbo", api: "50,000/day" };
    if (u <= 180) return { name: "Enterprise Suite", discount: 30, speed: "Ultra 10G", api: "500,000/day" };
    return { name: "A.I. Scale", discount: 45, speed: "Infinite Node", api: "Unlimited" };
  };

  const tier = getTier(users);
  const pricePerUser = Math.max(4, 15 - (tier.discount / 100) * 15);
  const monthlyCost = Math.round(users * pricePerUser);

  const stats = [
    {
      icon: <Cpu className="w-4 h-4 text-emerald-500" />,
      label: "Render Engine nodes",
      value: users === 0 ? "Offline" : `${Math.max(1, Math.ceil(users / 5))} Nodes`,
    },
    {
      icon: <Zap className="w-4 h-4 text-sapforce-lime" />,
      label: "Sync latency",
      value: users === 0 ? "N/A" : `${Math.max(2, 60 - Math.floor(volume * 0.55))}ms`,
    },
    {
      icon: <Cloud className="w-4 h-4 text-blue-400" />,
      label: "Dedicated Storage volume",
      value: users === 0 ? "0 GB" : `${Math.round(volume * 15)} GB SSD`,
    },
    {
      icon: <ShieldCheck className="w-4 h-4 text-violet-400" />,
      label: "AI Processing limits",
      value: tier.api,
    },
  ];

  return (
    <section className="py-20 bg-gray-50 border-t border-gray-100" id="pricing-calculator">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="px-3.5 py-1.5 rounded-full bg-sapforce-lime/20 text-gray-800 text-[11px] font-mono font-bold tracking-widest uppercase inline-block mb-3"
          >
            Volume pricing calculator
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-display font-black tracking-tight text-gray-950"
          >
            Scale your workspace dynamically<span className="text-sapforce-lime">.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-sm md:text-base text-gray-500 mt-4 leading-relaxed"
          >
            Adjust the team seat volume slider below. Watch the core central Sapforce Orb speed up and expand in real-time as your performance capacity increases!
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Slider Control Box */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 md:p-10 border border-gray-150 shadow-sm flex flex-col gap-8">
            <div>
              <div className="flex items-end justify-between mb-4">
                <span className="text-xs font-mono text-gray-400 uppercase tracking-widest font-bold">
                  Workspace Seats Volume
                </span>
                <span className="text-2xl font-display font-black text-gray-950">
                  {users} {users === 1 ? "Active User" : "Active Users"}
                </span>
              </div>

              {/* Slider Control Container */}
              <div className="relative py-4">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-gray-950 focus:outline-none"
                  style={{
                    background: `linear-gradient(to right, #0f1115 0%, #0f1115 ${volume}%, #f3f4f6 ${volume}%, #f3f4f6 100%)`,
                  }}
                  id="volume-pricing-slider"
                />
                
                {/* Visual marker badges along the slider */}
                <div className="flex justify-between mt-3 text-[10px] font-mono text-gray-400">
                  <span>0 Seats (Sandbox)</span>
                  <span>75 Seats</span>
                  <span>150 Seats</span>
                  <span>250 Seats (Scale)</span>
                </div>
              </div>
            </div>

            {/* Performance Gauges */}
            <div>
              <h4 className="text-xs font-mono text-gray-400 uppercase tracking-widest font-bold mb-5">
                Dynamic Capacity Stats
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {stats.map((stat, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:border-gray-200 transition-colors flex items-start gap-3.5"
                  >
                    <div className="p-2 rounded-xl bg-white shadow-sm flex items-center justify-center">
                      {stat.icon}
                    </div>
                    <div>
                      <p className="text-[11px] text-gray-400 font-medium leading-none mb-1.5">{stat.label}</p>
                      <p className="text-sm font-display font-black text-gray-800 leading-none">{stat.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Value Prop Invoice / Box */}
          <div className="lg:col-span-5 bg-sapforce-dark text-white rounded-3xl p-6 md:p-10 shadow-xl relative overflow-hidden flex flex-col justify-between self-stretch">
            {/* Ambient neon backdrop glow */}
            <div className="absolute top-[-30%] right-[-20%] w-[240px] h-[240px] rounded-full bg-sapforce-lime/15 blur-3xl pointer-events-none" />
            
            <div>
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
                <div>
                  <span className="text-[10px] font-mono text-sapforce-lime uppercase tracking-widest font-bold">
                    Selected Tier
                  </span>
                  <h3 className="text-xl font-display font-black mt-1">
                    {users === 0 ? "Free Trial" : tier.name}
                  </h3>
                </div>
                {tier.discount > 0 && (
                  <span className="text-[11px] font-mono font-bold bg-sapforce-lime text-sapforce-dark px-2.5 py-1 rounded-full">
                    {tier.discount}% Vol Discount
                  </span>
                )}
              </div>

              {/* Pricing Display */}
              <div className="mb-8">
                <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block mb-1.5">
                  Estimated Pricing
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl md:text-5xl font-display font-black text-white">
                    ${users === 0 ? "0" : monthlyCost}
                  </span>
                  <span className="text-gray-400 text-sm font-medium">/ month</span>
                </div>
                {users > 0 && (
                  <p className="text-xs text-gray-400 mt-2">
                    Billed monthly at ${pricePerUser.toFixed(2)} per active seat volume (discount applied)
                  </p>
                )}
              </div>

              {/* Core Feature bullet checklist */}
              <div className="flex flex-col gap-3.5 mb-8">
                <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block mb-1">
                  Tier features included
                </span>
                <div className="flex items-center gap-2 text-xs text-gray-200">
                  <div className="w-4 h-4 rounded-full bg-sapforce-lime/20 flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 text-sapforce-lime" />
                  </div>
                  <span>Infinite vector resolution canvas exports</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-200">
                  <div className="w-4 h-4 rounded-full bg-sapforce-lime/20 flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 text-sapforce-lime" />
                  </div>
                  <span>Shared styles & cloud component variables</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-200">
                  <div className="w-4 h-4 rounded-full bg-sapforce-lime/20 flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 text-sapforce-lime" />
                  </div>
                  <span>Real-time co-presence & voice channels</span>
                </div>
              </div>
            </div>

            <button className="w-full bg-sapforce-lime hover:bg-white text-sapforce-dark font-display font-bold text-sm py-3.5 px-6 rounded-2xl transition-colors duration-300 shadow-md shadow-sapforce-lime/10 flex items-center justify-center gap-2 cursor-pointer mt-4">
              Deploy Selected Volume Capacity
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
