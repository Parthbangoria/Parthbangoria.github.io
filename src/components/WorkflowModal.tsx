import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Play, ArrowRight, Compass, Layers, Milestone, Sliders } from "lucide-react";

interface WorkflowModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WorkflowModal({ isOpen, onClose }: WorkflowModalProps) {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      icon: <Sliders className="w-5 h-5 text-sapforce-lime" />,
      title: "1. Calibrate Your Volume Workspace",
      desc: "Use the Dynamic Volume pricing calculator to adjust required active seats, cloud nodes, and API processing limits. The system scales resources immediately.",
    },
    {
      icon: <Compass className="w-5 h-5 text-emerald-400" />,
      title: "2. Procedural Canvas Generation",
      desc: "Deploy AI vector design models. Choose, search, and customize templates inside the procedural library, or compile raw text strings into gorgeous typography presets.",
    },
    {
      icon: <Layers className="w-5 h-5 text-cyan-400" />,
      title: "3. Synchronous Live Collaboration",
      desc: "Invite teammates to work co-present in the same real-time canvas with zero sync latency. Work procedurally with custom randomizable identity avatars.",
    },
    {
      icon: <Milestone className="w-5 h-5 text-violet-400" />,
      title: "4. Deploy & Run Globally",
      desc: "Compile design variables with a single click and deliver vector blueprints instantly to your development environments and live web systems globally.",
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-sapforce-dark/80 backdrop-blur-md"
          />

          {/* Dialog Body */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            className="bg-sapforce-grey border border-white/10 text-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative z-10 p-6 md:p-8"
            id="workflow-modal-body"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-sapforce-lime animate-pulse" />
                <h3 className="text-lg font-display font-black tracking-tight uppercase">
                  Sapforce Workflow Guide
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all cursor-pointer"
                id="close-modal-btn"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content body split (interactive list & visual) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-8">
              {/* Left Side: Step List */}
              <div className="md:col-span-7 flex flex-col gap-3">
                {steps.map((step, index) => {
                  const isActive = activeStep === index;
                  return (
                    <button
                      key={index}
                      onClick={() => setActiveStep(index)}
                      className={`text-left p-4 rounded-2xl border transition-all flex gap-3.5 cursor-pointer ${
                        isActive
                          ? "bg-sapforce-dark border-sapforce-lime/30 shadow-md"
                          : "bg-white/5 border-transparent hover:bg-white/10"
                      }`}
                    >
                      <div className={`p-2 rounded-xl flex items-center justify-center ${isActive ? "bg-sapforce-lime/10" : "bg-white/5"}`}>
                        {step.icon}
                      </div>
                      <div>
                        <h4 className={`text-xs md:text-sm font-display font-bold ${isActive ? "text-sapforce-lime" : "text-gray-200"}`}>
                          {step.title}
                        </h4>
                        {isActive && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="text-xs text-gray-400 mt-2 leading-relaxed"
                          >
                            {step.desc}
                          </motion.p>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Right Side: Visual representation */}
              <div className="md:col-span-5 bg-sapforce-dark rounded-3xl p-6 border border-white/5 flex flex-col justify-between h-[280px]">
                <div>
                  <span className="text-[9px] font-mono font-bold text-sapforce-lime uppercase tracking-wider block mb-1">
                    Visual Pipeline
                  </span>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Interactive simulation node running in standard sandbox container.
                  </p>
                </div>

                {/* Animated Node pipeline connection */}
                <div className="relative flex items-center justify-center h-28 my-2">
                  {/* Glowing central node */}
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 0.95, 1],
                      boxShadow: [
                        "0 0 12px rgba(191,254,27,0.2)",
                        "0 0 24px rgba(191,254,27,0.5)",
                        "0 0 12px rgba(191,254,27,0.2)",
                      ],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="w-14 h-14 rounded-full bg-sapforce-lime text-sapforce-dark flex items-center justify-center relative z-10"
                  >
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </motion.div>

                  {/* Circling path */}
                  <svg className="absolute w-full h-full" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="35" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="4 4" />
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="35"
                      fill="none"
                      stroke="#bffe1b"
                      strokeWidth="1.5"
                      strokeDasharray="20 80"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                    />
                  </svg>
                </div>

                <div className="flex justify-between items-center text-[10px] font-mono text-gray-500">
                  <span>LATENCY: 4.2ms</span>
                  <span>NODE: ONLINE</span>
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex gap-3 justify-end border-t border-white/5 pt-5">
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                Close Guide
              </button>
              <button
                onClick={() => {
                  setActiveStep((prev) => (prev + 1) % steps.length);
                }}
                className="px-4 py-2 text-xs font-bold bg-sapforce-lime text-sapforce-dark rounded-xl flex items-center gap-1.5 hover:bg-white transition-colors cursor-pointer"
              >
                Next Step
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
