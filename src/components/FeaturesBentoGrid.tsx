import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Users, FileText, LayoutGrid, UserSquare, Copy, Shuffle, Search, Sparkles, Check } from "lucide-react";

export default function FeaturesBentoGrid() {
  const [activeCard, setActiveCard] = useState<string | null>(null);

  // 1. Live Collaboration State
  const collabContainerRef = useRef<HTMLDivElement>(null);
  const [userCursor, setUserCursor] = useState<{ x: number; y: number } | null>(null);
  const [mockCursors, setMockCursors] = useState([
    { id: 1, name: "Sarah (Lead)", x: 45, y: 35, color: "#a3e635" },
    { id: 2, name: "Alex (Dev)", x: 70, y: 65, color: "#38bdf8" },
    { id: 3, name: "Jordan (UX)", x: 25, y: 75, color: "#f43f5e" },
  ]);

  // Periodic slow wandering of mock cursors for realistic effect
  useEffect(() => {
    const interval = setInterval(() => {
      setMockCursors((prev) =>
        prev.map((c) => ({
          ...c,
          x: Math.max(10, Math.min(90, c.x + (Math.random() * 16 - 8))),
          y: Math.max(10, Math.min(90, c.y + (Math.random() * 16 - 8))),
        }))
      );
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const handleCollabMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!collabContainerRef.current) return;
    const rect = collabContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setUserCursor({ x, y });
  };

  const handleCollabMouseLeave = () => {
    setUserCursor(null);
  };

  // 2. Text Generator State
  const [typedText, setTypedText] = useState("Sapforce Canvas");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const textStyles = [
    { name: "Display Brutalist", styleClass: "font-display font-black text-3xl uppercase tracking-tighter" },
    { name: "Chamber Outline", styleClass: "font-display font-black text-3xl text-transparent stroke-gray-200 stroke-1 [-webkit-text-stroke:1px_#ffffff]" },
    { name: "Editorial Serif", styleClass: "font-serif italic text-2xl" },
    { name: "Terminal Mono", styleClass: "font-mono text-lg text-sapforce-lime" },
  ];

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  // 3. Templates Library State
  const [templateFilter, setTemplateFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const templates = [
    { id: 1, title: "SaaS Landing Page v2", category: "Web", tags: ["Vite", "Tailwind"] },
    { id: 2, title: "Neomorphic UI Elements", category: "UI Kit", tags: ["React", "Framer"] },
    { id: 3, title: "Fintech Dashboard Screen", category: "Dashboards", tags: ["D3", "Charts"] },
    { id: 4, title: "AI Generation Interface", category: "UI Kit", tags: ["Gemini", "Tailwind"] },
    { id: 5, title: "Crypto Mobile App Flow", category: "Mobile", tags: ["React Native"] },
    { id: 6, title: "Minimalist Portfolio Grid", category: "Web", tags: ["CSS Grid"] },
  ];

  const filteredTemplates = templates.filter((t) => {
    const matchesFilter = templateFilter === "All" || t.category === templateFilter;
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // 4. Avatar Generator State
  const [avatarSeed, setAvatarSeed] = useState(1);
  const [avatarTheme, setAvatarTheme] = useState("Neon");
  const randomizeAvatar = () => {
    setAvatarSeed(Math.floor(Math.random() * 1000) + 1);
  };

  const avatarColors = [
    ["#bffe1b", "#06b6d4", "#a855f7"], // Neon
    ["#f43f5e", "#fb923c", "#facc15"], // Sunset
    ["#10b981", "#059669", "#34d399"], // Emerald
  ];

  const currentColors = avatarColors[avatarTheme === "Neon" ? 0 : avatarTheme === "Sunset" ? 1 : 2];

  return (
    <section className="py-24 bg-sapforce-dark text-white relative overflow-hidden" id="design-must-haves">
      {/* Background radial soft light gradient */}
      <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] rounded-full bg-sapforce-lime/5 blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header from Video Keyframes 5-7 */}
        <div className="max-w-3xl mb-20 text-center mx-auto md:text-left">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-display font-black tracking-tight leading-tight"
          >
            All the must haves of a professional{" "}
            <span className="relative inline-block px-4 py-1.5 rounded-full bg-sapforce-lime text-sapforce-dark mt-2 md:mt-0 font-extrabold rotate-[-1deg] text-2xl md:text-4xl shadow-md shadow-sapforce-lime/10">
              design app.
            </span>
          </motion.h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 md:gap-8">
          
          {/* Card 1: Realtime Collaboration (6 columns on lg) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-6 bg-sapforce-grey border border-white/5 rounded-3xl p-6 md:p-8 flex flex-col gap-6 relative overflow-hidden group"
            whileHover={{ y: -4, borderColor: "rgba(255,255,255,0.12)" }}
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-sapforce-lime/10 text-sapforce-lime">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-display font-black">Realtime Collaboration</h3>
                <p className="text-xs text-gray-400 mt-1">Multi-user cursor synchronization</p>
              </div>
            </div>

            {/* Interactive Simulation Sandbox */}
            <div
              ref={collabContainerRef}
              onMouseMove={handleCollabMouseMove}
              onMouseLeave={handleCollabMouseLeave}
              className="relative h-[220px] w-full rounded-2xl bg-sapforce-dark border border-white/5 overflow-hidden flex flex-col items-center justify-center cursor-crosshair group-hover:border-white/10 transition-colors"
              id="collab-sandbox"
            >
              <p className="text-[11px] font-mono text-gray-500 uppercase tracking-widest text-center select-none pointer-events-none">
                Hover to invite your cursor to join
              </p>

              {/* Dynamic Wandering Live Cursors */}
              {mockCursors.map((cursor) => (
                <motion.div
                  key={cursor.id}
                  animate={{ left: `${cursor.x}%`, top: `${cursor.y}%` }}
                  transition={{ type: "tween", ease: "easeInOut", duration: 2.2 }}
                  className="absolute pointer-events-none flex flex-col gap-1 items-start"
                  style={{ transform: "translate(-4px, -4px)" }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M0 0V11L4 8L8.5 12.5L10.5 10.5L6 6L11 5L0 0Z" fill={cursor.color} />
                  </svg>
                  <span
                    className="text-[9px] font-semibold text-white px-1.5 py-0.5 rounded-md shadow-sm whitespace-nowrap"
                    style={{ backgroundColor: cursor.color }}
                  >
                    {cursor.name}
                  </span>
                </motion.div>
              ))}

              {/* Real User Live Cursor */}
              {userCursor && (
                <div
                  className="absolute pointer-events-none flex flex-col gap-1 items-start z-10"
                  style={{ left: `${userCursor.x}%`, top: `${userCursor.y}%`, transform: "translate(-4px, -4px)" }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M0 0V11L4 8L8.5 12.5L10.5 10.5L6 6L11 5L0 0Z" fill="#bffe1b" />
                  </svg>
                  <span className="text-[9px] font-semibold text-sapforce-dark px-1.5 py-0.5 bg-sapforce-lime rounded-md shadow-md whitespace-nowrap">
                    You (Active Node)
                  </span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Card 2: Interactive Text Generator (6 columns on lg) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-6 bg-sapforce-grey border border-white/5 rounded-3xl p-6 md:p-8 flex flex-col gap-6 relative overflow-hidden group"
            whileHover={{ y: -4, borderColor: "rgba(255,255,255,0.12)" }}
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-sapforce-lime/10 text-sapforce-lime">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-display font-black">Interactive Typography</h3>
                <p className="text-xs text-gray-400 mt-1">Live design canvas preview</p>
              </div>
            </div>

            {/* Input and dynamic layout rendering */}
            <div className="flex flex-col gap-4">
              <input
                type="text"
                value={typedText}
                onChange={(e) => setTypedText(e.target.value.slice(0, 30))}
                placeholder="Type some text..."
                className="w-full bg-sapforce-dark border border-white/5 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-sapforce-lime/40 transition-colors font-mono"
                id="interactive-text-input"
              />

              <div className="flex flex-col gap-2.5 h-[162px] overflow-y-auto no-scrollbar border border-white/5 rounded-xl p-3 bg-sapforce-dark">
                {textStyles.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between gap-4 p-2 rounded-lg hover:bg-white/5 transition-colors group/item cursor-pointer"
                    onClick={() => copyToClipboard(typedText, idx)}
                  >
                    <div className="overflow-hidden whitespace-nowrap pr-2">
                      <span className="text-[10px] text-gray-500 block mb-1 font-mono">{item.name}</span>
                      <span className={`${item.styleClass} truncate block`}>{typedText || "Untitled"}</span>
                    </div>
                    <button className="opacity-0 group-hover/item:opacity-100 p-1.5 rounded-lg bg-white/10 hover:bg-sapforce-lime hover:text-sapforce-dark transition-all text-white">
                      {copiedIndex === idx ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Card 3: Templates Library (7 columns on lg) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-7 bg-sapforce-grey border border-white/5 rounded-3xl p-6 md:p-8 flex flex-col gap-6 relative overflow-hidden group"
            whileHover={{ y: -4, borderColor: "rgba(255,255,255,0.12)" }}
          >
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-sapforce-lime/10 text-sapforce-lime">
                  <LayoutGrid className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-display font-black">Templates Library</h3>
                  <p className="text-xs text-gray-400 mt-1">Pre-built design structures</p>
                </div>
              </div>

              {/* Filters */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
                {["All", "Web", "UI Kit"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setTemplateFilter(cat)}
                    className={`px-3 py-1 text-[10px] font-bold rounded-full border transition-all cursor-pointer ${
                      templateFilter === cat
                        ? "bg-sapforce-lime text-sapforce-dark border-sapforce-lime"
                        : "bg-sapforce-dark text-gray-400 border-white/5 hover:border-white/10"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Live Search and Grid */}
            <div className="flex flex-col gap-3.5">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-gray-500 absolute left-3.5 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search blueprint templates..."
                  className="w-full bg-sapforce-dark border border-white/5 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-sapforce-lime/40"
                  id="template-search-input"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 h-[162px] overflow-y-auto no-scrollbar">
                <AnimatePresence mode="popLayout">
                  {filteredTemplates.length > 0 ? (
                    filteredTemplates.map((item) => (
                      <motion.div
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        key={item.id}
                        className="p-3.5 rounded-xl bg-sapforce-dark border border-white/5 hover:border-sapforce-lime/30 transition-all flex flex-col justify-between"
                      >
                        <div>
                          <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-sapforce-lime mb-1 block">
                            {item.category}
                          </span>
                          <p className="text-xs font-display font-bold text-gray-100 truncate">{item.title}</p>
                        </div>
                        <div className="flex gap-1.5 mt-2.5">
                          {item.tags.map((t, i) => (
                            <span key={i} className="text-[8px] font-mono bg-white/5 px-2 py-0.5 rounded text-gray-400">
                              {t}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="col-span-2 text-center py-10 text-xs text-gray-500">
                      No matching templates found.
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Card 4: Avatar Generator (5 columns on lg) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-5 bg-sapforce-grey border border-white/5 rounded-3xl p-6 md:p-8 flex flex-col gap-6 relative overflow-hidden group"
            whileHover={{ y: -4, borderColor: "rgba(255,255,255,0.12)" }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-sapforce-lime/10 text-sapforce-lime">
                  <UserSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-display font-black">Avatar Generator</h3>
                  <p className="text-xs text-gray-400 mt-1">Procedural identity generator</p>
                </div>
              </div>
            </div>

            {/* Procedural Canvas Box */}
            <div className="flex flex-col items-center justify-center bg-sapforce-dark rounded-2xl border border-white/5 p-4 gap-4 h-[225px] relative">
              
              {/* Dynamic procedurally styled Vector SVG representation */}
              <div className="relative w-24 h-24 flex items-center justify-center">
                {/* Backdrop ambient glow based on selected color seed */}
                <div
                  className="absolute inset-0 rounded-full blur-xl opacity-60 transition-colors"
                  style={{
                    backgroundColor: currentColors[avatarSeed % currentColors.length],
                  }}
                />

                {/* Animated composite avatar SVG */}
                <svg className="w-20 h-20 relative z-10" viewBox="0 0 100 100">
                  {/* Head shape */}
                  <circle cx="50" cy="50" r="32" fill={currentColors[0]} />
                  {/* Eyes, randomized based on seed */}
                  {avatarSeed % 3 === 0 ? (
                    <>
                      <circle cx="38" cy="46" r="4.5" fill="#000" />
                      <circle cx="62" cy="46" r="4.5" fill="#000" />
                    </>
                  ) : avatarSeed % 3 === 1 ? (
                    <>
                      <ellipse cx="38" cy="46" rx="6" ry="3" fill="#000" />
                      <ellipse cx="62" cy="46" rx="6" ry="3" fill="#000" />
                    </>
                  ) : (
                    <>
                      {/* Cool sunglasses */}
                      <rect x="28" y="42" width="44" height="8" rx="2" fill="#0f1115" />
                      <rect x="30" y="46" width="16" height="12" rx="3" fill="#0f1115" />
                      <rect x="54" y="46" width="16" height="12" rx="3" fill="#0f1115" />
                    </>
                  )}
                  {/* Mouth, randomized */}
                  {avatarSeed % 2 === 0 ? (
                    <path d="M42 66 Q50 72 58 66" fill="none" stroke="#000" strokeWidth="3" strokeLinecap="round" />
                  ) : (
                    <rect x="42" y="66" width="16" height="3" rx="1.5" fill="#000" />
                  )}
                  {/* Accessories / Hair highlight */}
                  <circle cx="50" cy="24" r="5" fill={currentColors[1]} />
                </svg>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-3 w-full">
                <button
                  onClick={randomizeAvatar}
                  className="flex-1 bg-white/5 hover:bg-white/10 active:scale-95 text-xs text-white font-medium py-2 px-3 rounded-xl border border-white/5 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  id="randomize-avatar-btn"
                >
                  <Shuffle className="w-3.5 h-3.5" />
                  Randomize Seed
                </button>

                <div className="flex gap-1">
                  {["Neon", "Sunset", "Emerald"].map((theme) => (
                    <button
                      key={theme}
                      onClick={() => setAvatarTheme(theme)}
                      className={`px-2.5 py-1 text-[8px] font-bold rounded-lg border uppercase tracking-wider ${
                        avatarTheme === theme
                          ? "bg-sapforce-lime text-sapforce-dark border-sapforce-lime"
                          : "bg-white/5 text-gray-400 border-transparent hover:bg-white/10"
                      }`}
                    >
                      {theme}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
