import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Menu, X } from "lucide-react";

interface NavbarProps {
  onContactClick: () => void;
  onPricingClick: () => void;
  onHowItWorksClick: () => void;
}

export default function Navbar({ onContactClick, onPricingClick, onHowItWorksClick }: NavbarProps) {
  const [activeTab, setActiveTab] = useState("Services");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Services", action: null },
    { name: "Pricing", action: onPricingClick },
    { name: "About", action: onHowItWorksClick },
    { name: "Insights", action: null },
    { name: "Contact", action: onContactClick },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-4 md:px-8 py-4 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center"
        >
          <span className="text-xl md:text-2xl font-display font-black tracking-tighter text-gray-900 flex items-center gap-1 cursor-pointer">
            SAPFORCE<span className="text-sapforce-lime font-black">.</span>
          </span>
        </motion.div>

        {/* Center Pill Navigation */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="hidden md:flex items-center bg-white/70 backdrop-blur-md rounded-full px-1.5 py-1.5 border border-gray-100 shadow-sm"
        >
          {navItems.map((item) => {
            const isActive = activeTab === item.name;
            return (
              <button
                key={item.name}
                onClick={() => {
                  setActiveTab(item.name);
                  if (item.action) item.action();
                }}
                className={`relative px-4 py-1.5 text-sm font-medium transition-colors duration-200 cursor-pointer ${
                  isActive ? "text-gray-900" : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-gray-100 rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {item.name}
              </button>
            );
          })}
        </motion.div>

        {/* Right CTA */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden md:flex items-center gap-4"
        >
          <button className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors cursor-pointer">
            Login
          </button>
          <button
            onClick={onContactClick}
            className="group flex items-center gap-1.5 bg-gray-950 hover:bg-gray-900 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-300 shadow-sm cursor-pointer hover:shadow-md"
          >
            Get Started
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onContactClick}
            className="bg-gray-950 text-white text-xs font-semibold px-4 py-2 rounded-full cursor-pointer"
          >
            Get Started
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-gray-700 hover:text-gray-900 focus:outline-none cursor-pointer"
            id="mobile-menu-btn"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-xl px-6 py-8 flex flex-col gap-5 md:hidden z-40"
        >
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  setActiveTab(item.name);
                  setMobileMenuOpen(false);
                  if (item.action) item.action();
                }}
                className={`text-left text-base font-medium py-2 border-b border-gray-50 cursor-pointer ${
                  activeTab === item.name ? "text-sapforce-dark font-semibold" : "text-gray-500"
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-3 pt-2">
            <button className="text-center font-medium text-gray-600 hover:text-gray-900 py-2 border border-gray-100 rounded-full cursor-pointer">
              Login
            </button>
          </div>
        </motion.div>
      )}
    </header>
  );
}
