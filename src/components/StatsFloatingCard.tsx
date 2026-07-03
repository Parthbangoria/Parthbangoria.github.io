import { motion } from "motion/react";

export function StatsFloatingCard() {
  const avatars = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="flex flex-col gap-2.5 p-4 rounded-2xl bg-white/60 backdrop-blur-md border border-white/80 shadow-md select-none max-w-[190px]"
      whileHover={{ y: -5, shadow: "0 20px 25px -5px rgb(0 0 0 / 0.05)" }}
    >
      <div className="flex -space-x-2.5 items-center">
        {avatars.map((url, i) => (
          <img
            key={i}
            src={url}
            alt="User avatar"
            referrerPolicy="no-referrer"
            className="w-8 h-8 rounded-full border-2 border-white object-cover"
          />
        ))}
        <div className="w-8 h-8 rounded-full bg-sapforce-lime flex items-center justify-center text-[10px] font-bold text-sapforce-dark border-2 border-white">
          +99
        </div>
      </div>
      <div>
        <h4 className="text-xl font-display font-black tracking-tight text-gray-900 leading-none">
          2M+
        </h4>
        <p className="text-[11px] font-medium text-gray-400 mt-1 uppercase tracking-wider">
          World active user
        </p>
      </div>
    </motion.div>
  );
}

export function RightBulletsList() {
  const bulletItems = [
    { title: "Web based", num: "01" },
    { title: "Collaborative", num: "02" },
    { title: "Real-time", num: "03" },
  ];

  return (
    <div className="flex flex-col gap-4 select-none">
      {bulletItems.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
          className="flex items-center justify-between gap-12 border-b border-gray-150 pb-2.5 text-right w-full min-w-[170px]"
          whileHover={{ x: -4 }}
        >
          <span className="text-xs font-mono text-gray-400 font-semibold">{item.num}</span>
          <span className="text-sm font-display font-semibold text-gray-800 tracking-tight">
            {item.title}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
