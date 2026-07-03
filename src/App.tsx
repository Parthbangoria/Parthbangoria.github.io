import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, ChevronRight, Layout, Monitor, Shield, Zap } from "lucide-react";

// Component imports
import Navbar from "./components/Navbar";
import SapforceOrb from "./components/SapforceOrb";
import { StatsFloatingCard, RightBulletsList } from "./components/StatsFloatingCard";
import LogoTicker from "./components/LogoTicker";
import VolumeCalculator from "./components/VolumeCalculator";
import FeaturesBentoGrid from "./components/FeaturesBentoGrid";
import Testimonials from "./components/Testimonials";
import ContactForm from "./components/ContactForm";
import WorkflowModal from "./components/WorkflowModal";

export default function App() {
  const [volume, setVolume] = useState(35); // Shared Volume Prop (Pricing & Orb reactive state)
  const [workflowOpen, setWorkflowOpen] = useState(false);

  // Smooth scroll helper
  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-[#3D3A35] font-sans selection:bg-[#E5DACE] selection:text-[#2A2825] overflow-x-hidden relative">
      
      {/* 1. Header Navbar */}
      <Navbar
        onContactClick={() => scrollToId("contact-form")}
        onPricingClick={() => scrollToId("pricing-calculator")}
        onHowItWorksClick={() => setWorkflowOpen(true)}
      />

      {/* 2. Hero Section - Inspired directly by the video Keyframe 1 */}
      <section className="relative pt-32 pb-20 md:py-40 flex flex-col items-center justify-center overflow-hidden w-full">
        
        {/* Massive Background Typography "SAPFORCE." */}
        <div className="absolute inset-x-0 top-[22%] md:top-[18%] text-center pointer-events-none select-none z-0 overflow-hidden">
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 0.08, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-[13vw] font-display font-black tracking-tighter text-gray-900 leading-none"
          >
            SAPFORCE.
          </motion.h1>
        </div>

        {/* Dynamic decorative waves behind the orb */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 z-0">
          <div className="w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full border border-gray-200 animate-pulse-slow" />
          <div className="absolute w-[350px] h-[350px] md:w-[500px] md:h-[500px] rounded-full border border-gray-150 animate-pulse" />
        </div>

        {/* Hero Content Area */}
        <div className="max-w-7xl mx-auto px-6 w-full relative z-10 flex flex-col items-center">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center w-full mt-4">
            
            {/* Left Column: Stats and core tag line */}
            <div className="lg:col-span-3 flex flex-col items-start gap-12 md:gap-16 order-2 lg:order-1">
              
              {/* Floating Active users with profile avatars */}
              <div className="self-center lg:self-start">
                <StatsFloatingCard />
              </div>

              {/* Tagline from Keyframe 1 */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="max-w-xs text-center lg:text-left flex flex-col gap-4"
              >
                <p className="text-sm md:text-base text-gray-600 font-medium leading-relaxed font-display">
                  The design software that keeps your flow with AI tools and built-in graphics.
                </p>
                <div className="w-12 h-0.5 bg-gray-200 self-center lg:self-start" />
              </motion.div>
            </div>

            {/* Center Column: The interactive responsive Sapforce Orb */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center order-1 lg:order-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
                className="w-full flex justify-center"
              >
                <SapforceOrb volume={volume} onHowItWorksClick={() => setWorkflowOpen(true)} />
              </motion.div>
            </div>

            {/* Right Column: Key bullets lists (Web-based, Collaborative, Real-time) */}
            <div className="lg:col-span-3 flex flex-col items-center lg:items-end justify-center order-3">
              <div className="w-full max-w-xs lg:max-w-none flex flex-col items-center lg:items-end gap-12">
                <RightBulletsList />

                {/* Micro tech card details */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="hidden md:flex flex-col gap-2.5 text-right font-mono text-[10px] text-gray-400 uppercase tracking-widest leading-normal"
                >
                  <p>Web based : / 01</p>
                  <p>Collaborative : / 02</p>
                  <p>Real-time : / 03</p>
                </motion.div>
              </div>
            </div>

          </div>

          {/* Bottom Floating Scroll Badge */}
          <motion.button
            onClick={() => scrollToId("credibility-logos")}
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="mt-16 md:mt-24 p-2.5 rounded-full bg-white border border-gray-150 shadow-sm text-gray-400 hover:text-gray-900 transition-colors flex items-center justify-center cursor-pointer hover:shadow-md"
            id="scroll-to-ticker-btn"
          >
            <ChevronRight className="w-5 h-5 rotate-90" />
          </motion.button>

        </div>
      </section>

      {/* 3. Credibility: Infinite Scrolling Logo Ticker */}
      <LogoTicker />

      {/* 4. Bento Grid: Must haves of a professional design app (from Video Keyframes 5-7) */}
      <FeaturesBentoGrid />

      {/* 5. Pricing and Dynamics: Volume Prop Calculator */}
      <VolumeCalculator volume={volume} setVolume={setVolume} />

      {/* 6. Testimonials Layout */}
      <Testimonials />

      {/* 7. Request invite / Query Form */}
      <ContactForm initialVolume={volume} />

      {/* 8. Elegant Footer */}
      <footer className="py-16 bg-sapforce-dark text-white border-t border-white/5 relative overflow-hidden" id="footer">
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full bg-sapforce-lime/5 blur-[100px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          
          <div className="md:col-span-5 flex flex-col gap-5">
            <span className="text-xl md:text-2xl font-display font-black tracking-tighter text-white">
              SAPFORCE<span className="text-sapforce-lime font-black">.</span>
            </span>
            <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
              Deploy fully customizable high-fidelity vector wireframe models, real-time shared components, and dynamic AI-powered user design systems with zero cloud lag.
            </p>
            <div className="flex gap-4 mt-2">
              <span className="text-xs font-mono text-sapforce-lime font-bold uppercase tracking-widest bg-white/5 px-2.5 py-1 rounded-lg">
                NODE STATUS: ACTIVE
              </span>
            </div>
          </div>

          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div className="flex flex-col gap-4">
              <h5 className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">
                Product Core
              </h5>
              <div className="flex flex-col gap-2.5 text-xs text-gray-300">
                <button onClick={() => scrollToId("design-must-haves")} className="hover:text-sapforce-lime text-left transition-colors cursor-pointer">Interactive Canvas</button>
                <button onClick={() => scrollToId("pricing-calculator")} className="hover:text-sapforce-lime text-left transition-colors cursor-pointer">Volume Price</button>
                <button onClick={() => setWorkflowOpen(true)} className="hover:text-sapforce-lime text-left transition-colors cursor-pointer">Workflow Guide</button>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h5 className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">
                Features
              </h5>
              <div className="flex flex-col gap-2.5 text-xs text-gray-300">
                <button onClick={() => scrollToId("design-must-haves")} className="hover:text-sapforce-lime text-left transition-colors cursor-pointer">Realtime Collab</button>
                <button onClick={() => scrollToId("design-must-haves")} className="hover:text-sapforce-lime text-left transition-colors cursor-pointer">Template Library</button>
                <button onClick={() => scrollToId("design-must-haves")} className="hover:text-sapforce-lime text-left transition-colors cursor-pointer">Avatar Creator</button>
              </div>
            </div>

            <div className="flex flex-col gap-4 col-span-2 sm:col-span-1">
              <h5 className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">
                Support
              </h5>
              <div className="flex flex-col gap-2.5 text-xs text-gray-300">
                <button onClick={() => scrollToId("contact-form")} className="hover:text-sapforce-lime text-left transition-colors cursor-pointer">Request Demo</button>
                <button onClick={() => scrollToId("testimonials")} className="hover:text-sapforce-lime text-left transition-colors cursor-pointer">Reviews</button>
              </div>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-gray-500">
          <p>© {new Date().getFullYear()} Sapforce Showcase. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="hover:text-gray-300 transition-colors cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-gray-300 transition-colors cursor-pointer">Privacy Policy</span>
          </div>
        </div>
      </footer>

      {/* 9. "How It Works" Workflow Modal Overlay */}
      <WorkflowModal isOpen={workflowOpen} onClose={() => setWorkflowOpen(false)} />

    </div>
  );
}
