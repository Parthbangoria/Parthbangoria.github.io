import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { Play } from "lucide-react";

interface SapforceOrbProps {
  volume: number; // 1 to 100
  onHowItWorksClick: () => void;
}

export default function SapforceOrb({ volume, onHowItWorksClick }: SapforceOrbProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for interactive mouse displacement (3D parallax effect)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for dampening mouse movement
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-15, 15]), springConfig);
  const transformZ = useSpring(useTransform(mouseX, [-300, 300], [5, -5]), springConfig);

  // Dynamic values based on volume pricing slider
  // Animation duration: higher volume = faster, more energetic
  const animDuration = Math.max(2, 8 - (volume / 100) * 5); // 8s (slow) to 3s (fast)
  // Glow scale: higher volume = larger glow
  const glowIntensity = 0.3 + (volume / 100) * 0.7; // opacity multiplier
  // Orb scale multiplier
  const orbScale = 1 + (volume / 100) * 0.15; // scales up by up to 15%

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[340px] xs:max-w-[400px] sm:max-w-[440px] md:max-w-[500px] aspect-square flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
      style={{ perspective: 1000 }}
      id="sapforce-orb-container"
    >
      {/* 1. Futuristic Wireframe Circular Rings (background) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
        <svg className="w-[110%] h-[110%]" viewBox="0 0 100 100">
          {/* Subtle curved contour lines */}
          <ellipse
            cx="50"
            cy="50"
            rx="45"
            ry="18"
            fill="none"
            stroke="url(#wireframe-gradient)"
            strokeWidth="0.15"
            className="origin-center"
            style={{ transform: "rotate(-25deg)" }}
          />
          <ellipse
            cx="50"
            cy="50"
            rx="45"
            ry="25"
            fill="none"
            stroke="url(#wireframe-gradient)"
            strokeWidth="0.1"
            className="origin-center"
            style={{ transform: "rotate(35deg)" }}
          />
          <ellipse
            cx="50"
            cy="50"
            rx="35"
            ry="45"
            fill="none"
            stroke="url(#wireframe-gradient)"
            strokeWidth="0.12"
            className="origin-center"
            style={{ transform: "rotate(15deg)" }}
          />
          <defs>
            <linearGradient id="wireframe-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e5e7eb" />
              <stop offset="50%" stopColor="#d1d5db" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#bffe1b" stopOpacity="0.8" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* 2. Pulsing Glow Underlay */}
      <motion.div
        animate={{
          scale: [1, 1.08, 0.96, 1.03, 1],
          opacity: [0.3 * glowIntensity, 0.45 * glowIntensity, 0.25 * glowIntensity, 0.35 * glowIntensity, 0.3 * glowIntensity],
        }}
        transition={{
          duration: animDuration * 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute w-[80%] h-[80%] rounded-full bg-gradient-to-tr from-sapforce-lime/30 via-emerald-400/25 to-lime-300/40 blur-3xl pointer-events-none"
      />

      {/* 3. The 3D-Interactive Orb Wrapper */}
      <motion.div
        style={{
          rotateX: rotateX,
          rotateY: rotateY,
          scale: orbScale,
          transformStyle: "preserve-3d",
        }}
        animate={{
          y: isHovered ? -8 : [0, -12, 0],
        }}
        transition={{
          y: isHovered
            ? { type: "spring", stiffness: 200, damping: 20 }
            : { duration: 6, repeat: Infinity, ease: "easeInOut" },
        }}
        className="relative w-[75%] h-[75%] rounded-full flex items-center justify-center transition-shadow duration-300"
      >
        {/* Transparent glass overlay sphere */}
        <div className="absolute inset-0 rounded-full border border-white/45 bg-white/10 backdrop-blur-[2px] shadow-[inset_0_4px_24px_rgba(255,255,255,0.45),0_10px_40px_rgba(0,0,0,0.06)] overflow-hidden z-10 pointer-events-none">
          {/* Top highlight shine */}
          <div className="absolute top-[-10%] left-[15%] w-[70%] h-[40%] bg-gradient-to-b from-white/60 to-transparent rounded-full transform -rotate-[15deg] blur-[1px]" />
          {/* Bottom shadow reflection */}
          <div className="absolute bottom-[2%] right-[10%] w-[40%] h-[20%] bg-sapforce-lime/30 rounded-full blur-md" />
        </div>

        {/* Morphing Liquid Silver Inner Layer */}
        <motion.div
          animate={{
            borderRadius: [
              "42% 58% 70% 30% / 45% 45% 55% 55%",
              "70% 30% 52% 48% / 60% 40% 60% 40%",
              "40% 60% 40% 60% / 40% 60% 40% 60%",
              "42% 58% 70% 30% / 45% 45% 55% 55%",
            ],
            rotate: [0, 120, 240, 360],
          }}
          transition={{
            duration: animDuration * 2.2,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-2 bg-gradient-to-tr from-gray-200 via-gray-100 to-gray-300 shadow-[inset_0_-8px_20px_rgba(0,0,0,0.15)] z-0"
        />

        {/* Morphing Glowing Green Highlight Layer */}
        <motion.div
          style={{ translateZ: transformZ }}
          animate={{
            borderRadius: [
              "50% 50% 30% 70% / 50% 60% 40% 50%",
              "30% 70% 70% 30% / 50% 30% 70% 50%",
              "60% 40% 30% 70% / 40% 50% 60% 60%",
              "50% 50% 30% 70% / 50% 60% 40% 50%",
            ],
            rotate: [360, 240, 120, 0],
          }}
          transition={{
            duration: animDuration * 1.7,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-4 bg-gradient-to-bl from-sapforce-lime via-emerald-400 to-lime-300 opacity-85 shadow-[0_0_30px_rgba(191,254,27,0.4)] mix-blend-multiply z-0"
        />

        {/* Additional Glass-Reflection Overlay */}
        <div className="absolute inset-6 rounded-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none z-20 border border-white/20" />
      </motion.div>

      {/* 4. Interactive "How it works?" Floating Circular Button */}
      <motion.button
        onClick={onHowItWorksClick}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="absolute bottom-[2%] right-[5%] z-30 group flex flex-col items-center justify-center w-20 h-20 md:w-24 md:h-24 bg-sapforce-lime hover:bg-white text-sapforce-dark hover:text-sapforce-dark rounded-full border border-sapforce-dark/5 shadow-lg shadow-sapforce-lime/20 cursor-pointer transition-colors duration-300"
        animate={{
          y: [0, 6, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        id="how-it-works-btn"
      >
        <span className="relative flex h-3 w-3 mb-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sapforce-dark opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-sapforce-dark"></span>
        </span>
        <div className="flex items-center gap-1">
          <Play className="w-3 h-3 fill-current" />
          <span className="text-[10px] md:text-xs font-display font-black tracking-tight uppercase">
            How it works?
          </span>
        </div>
      </motion.button>

      {/* Floating Sparkles for ambient luxury */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-sapforce-lime"
          style={{
            top: i === 0 ? "15%" : i === 1 ? "75%" : "40%",
            left: i === 0 ? "20%" : i === 1 ? "10%" : "85%",
          }}
          animate={{
            scale: [0, 1.2, 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            delay: i * 1.5,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
