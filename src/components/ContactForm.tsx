import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, CheckCircle, Sparkles, AlertCircle } from "lucide-react";

interface ContactFormProps {
  initialVolume: number;
}

export default function ContactForm({ initialVolume }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    teamSize: Math.round(initialVolume * 2.5),
    objective: "Enterprise Design",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Sync teamSize state when initialVolume changes in parent
  useState(() => {
    setFormData((p) => ({ ...p, teamSize: Math.round(initialVolume * 2.5) }));
  });

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please provide a valid email address";
    }
    if (!formData.message.trim()) newErrors.message = "Please describe your project or needs";
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Simulate sending API request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <section className="py-24 bg-gray-50 border-t border-gray-100" id="contact-form">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Title */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="px-3.5 py-1.5 rounded-full bg-sapforce-lime/20 text-gray-800 text-[11px] font-mono font-bold tracking-widest uppercase inline-block mb-3"
          >
            Get in Touch
          </motion.span>
          <h2 className="text-3xl md:text-5xl font-display font-black tracking-tight text-gray-950">
            Request an invite<span className="text-sapforce-lime">.</span>
          </h2>
          <p className="text-sm text-gray-500 mt-4 max-w-lg mx-auto leading-relaxed">
            Fill out the form below to connect with our design engineers. We'll build a custom deployment plan for your team size.
          </p>
        </div>

        {/* Form Panel container */}
        <div className="bg-white rounded-3xl border border-gray-150 p-6 md:p-10 shadow-sm relative overflow-hidden">
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.form
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="flex flex-col gap-6"
                id="sapforce-query-form"
              >
                {/* Name / Email row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full bg-gray-50 border rounded-2xl px-4 py-3.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:bg-white transition-all ${
                        errors.name ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-gray-950"
                      }`}
                      id="form-input-name"
                    />
                    {errors.name && (
                      <span className="text-xs text-red-500 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.name}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="jane@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full bg-gray-50 border rounded-2xl px-4 py-3.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:bg-white transition-all ${
                        errors.email ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-gray-950"
                      }`}
                      id="form-input-email"
                    />
                    {errors.email && (
                      <span className="text-xs text-red-500 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.email}
                      </span>
                    )}
                  </div>
                </div>

                {/* Team Volume Size & Objective */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider">
                      Workspace Seat Volume
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="1000"
                      value={formData.teamSize}
                      onChange={(e) => setFormData({ ...formData, teamSize: Number(e.target.value) })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3.5 text-sm text-gray-800 focus:outline-none focus:bg-white focus:border-gray-950 transition-all font-mono"
                      id="form-input-teamsize"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider">
                      Main Objective
                    </label>
                    <select
                      value={formData.objective}
                      onChange={(e) => setFormData({ ...formData, objective: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3.5 text-sm text-gray-800 focus:outline-none focus:bg-white focus:border-gray-950 transition-all"
                      id="form-input-objective"
                    >
                      <option value="Enterprise Design">Enterprise Design Workspace</option>
                      <option value="Procedural Animation">Procedural Animation Tools</option>
                      <option value="Full-stack Integration">Full-stack Cloud Nodes</option>
                      <option value="Consultancy Trial">Consultancy & Agency Trial</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider">
                    How can we assist you?
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your team size, custom render needs, or what you are excited to build with Sapforce."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`w-full bg-gray-50 border rounded-2xl px-4 py-3.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:bg-white transition-all resize-none ${
                      errors.message ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-gray-950"
                    }`}
                    id="form-input-message"
                  />
                  {errors.message && (
                    <span className="text-xs text-red-500 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.message}
                    </span>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gray-950 hover:bg-gray-900 disabled:bg-gray-300 text-white font-display font-bold py-4 px-6 rounded-2xl mt-4 flex items-center justify-center gap-2.5 transition-colors cursor-pointer"
                  id="form-submit-btn"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Submit Invite Request
                    </>
                  )}
                </button>
              </motion.form>
            ) : (
              /* Success Panel */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center py-10 flex flex-col items-center gap-6"
                id="form-success-card"
              >
                <div className="w-16 h-16 rounded-full bg-sapforce-lime/20 flex items-center justify-center text-sapforce-lime animate-bounce">
                  <CheckCircle className="w-10 h-10 text-sapforce-dark" />
                </div>

                <div>
                  <h3 className="text-2xl font-display font-black text-gray-950">
                    Invite request registered!
                  </h3>
                  <p className="text-sm text-gray-500 mt-2.5 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-gray-900">{formData.name}</strong>. We've received your request for a workspace with <strong className="text-gray-900">{formData.teamSize} seats</strong>. Our staff will email you at <strong className="text-gray-900">{formData.email}</strong> shortly.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-emerald-500" />
                  <span className="text-xs font-mono font-semibold text-gray-600">
                    Temporary Sandbox Access granted to client node: {Math.floor(Math.random() * 90000) + 10000}
                  </span>
                </div>

                <button
                  onClick={() => {
                    setIsSuccess(false);
                    setFormData({ name: "", email: "", teamSize: 15, objective: "Enterprise Design", message: "" });
                  }}
                  className="text-xs font-semibold text-gray-500 hover:text-gray-900 underline transition-colors cursor-pointer"
                >
                  Send another request
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
