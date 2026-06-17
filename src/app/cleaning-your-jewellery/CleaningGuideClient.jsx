"use client";
import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Droplets, ShieldAlert, Wrench } from "lucide-react";

export default function CleaningGuideClient() {
  return (
    <div className="relative min-h-screen bg-[#0E0C0A] text-[#FAF7F2] pt-[180px] pb-24 px-6 md:px-12 overflow-hidden">
      
      {/* Ambient Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C9A84C]/4 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#C9A84C]/3 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto space-y-24 relative z-10">
        
        {/* ── Header ── */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          className="text-center space-y-6 max-w-4xl mx-auto"
        >
          <div className="badge-gold w-fit mx-auto">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A84C]" />
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#C9A84C] font-bold">Care & Maintenance</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-light text-[#FAF7F2] leading-tight">
            Cleaning Your <span className="font-display italic gold-gradient-text">Jewellery</span>
          </h1>
          <p className="text-[#C4BAB0] font-light text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
            From your everyday jewellery to stately pieces worn only on special occasions, discover how to safely polish and protect your beloved baubles.
          </p>
          <div className="gold-divider mx-auto" />
        </motion.div>

        {/* ── Content Blocks ── */}
        <div className="space-y-16">
          
          {/* Block 1: Intro */}
          <motion.div 
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          >
            <div className="order-2 md:order-1 glass-panel luxury-shadow p-10 rounded-3xl border border-[#C9A84C]/10 flex flex-col justify-center min-h-[300px] relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#C9A84C]/5 to-transparent pointer-events-none" />
               <ShieldAlert className="w-10 h-10 text-[#C9A84C] mb-6" />
               <h3 className="text-2xl font-light text-[#FAF7F2] mb-4">A Moderate Approach</h3>
               <p className="text-[#C4BAB0] text-sm leading-relaxed font-light mb-4">
                 Some people clean their jewellery excessively while others rarely clean their jewellery at all. Since baubles are wearable items and can be fragile, it's best to take a moderate approach when cleaning your jewellery.
               </p>
               <p className="text-[#C4BAB0] text-sm leading-relaxed font-light">
                 Rinsing and rubbing it too much can cause unnecessary damage and premature wear, and cleaning it too little can cause your beloved pieces to degrade over time.
               </p>
            </div>
            <div className="order-1 md:order-2 space-y-4">
               <span className="text-[10px] tracking-[0.32em] uppercase text-[#C9A84C] font-semibold">
                 01 / Balance
               </span>
               <h2 className="text-3xl font-light text-[#FAF7F2] leading-tight">
                 Finding the Right <em className="italic text-[#C9A84C]">Frequency</em>
               </h2>
               <p className="text-[#C4BAB0] text-sm leading-relaxed font-light">
                 Protecting your investment means knowing exactly when and how to cleanse the precious metals and stones.
               </p>
            </div>
          </motion.div>

          {/* Block 2: Maintaining */}
          <motion.div 
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          >
            <div className="space-y-4">
               <span className="text-[10px] tracking-[0.32em] uppercase text-[#C9A84C] font-semibold">
                 02 / Fragile Materials
               </span>
               <h2 className="text-3xl font-light text-[#FAF7F2] leading-tight">
                 Maintaining Fine <em className="italic text-[#C9A84C]">Gems</em>
               </h2>
               <p className="text-[#C4BAB0] text-sm leading-relaxed font-light">
                 Most fine jewellery should only be cleaned every other month or so to prevent unnecessary exposure to liquids. Be sure to use a gentle method and avoid ultrasonic cleaners or steamers.
               </p>
            </div>
            <div className="glass-panel luxury-shadow p-10 rounded-3xl border border-[#C9A84C]/10 flex flex-col justify-center min-h-[300px] relative overflow-hidden">
               <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-[#C9A84C]/5 to-transparent pointer-events-none" />
               <Wrench className="w-10 h-10 text-[#C9A84C] mb-6" />
               <h3 className="text-2xl font-light text-[#FAF7F2] mb-4">Handling with Care</h3>
               <p className="text-[#C4BAB0] text-sm leading-relaxed font-light mb-4">
                 All fine jewellery should be cleaned with care, but some gemstones require a more gentle approach so that they don't crack or chip. Fragile materials—like pearls and cameos made from shells, emeralds, opals, or turquoise—should be handled with extreme care.
               </p>
               <p className="text-[#C4BAB0] text-sm leading-relaxed font-light">
                 Excessive use of at-home ultrasonic machines can eventually loosen stones, wear down the metal, and cause even more significant damage. Have your jewellery checked by a trusted professional jeweler twice a year.
               </p>
            </div>
          </motion.div>

          {/* Block 3: DIY Solution */}
          <motion.div 
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          >
            <div className="order-2 md:order-1 glass-panel luxury-shadow p-10 rounded-3xl border border-[#C9A84C]/10 flex flex-col justify-center min-h-[300px] relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#C9A84C]/5 to-transparent pointer-events-none" />
               <Droplets className="w-10 h-10 text-[#C9A84C] mb-6" />
               <h3 className="text-2xl font-light text-[#FAF7F2] mb-4">The DIY Home Method</h3>
               <ul className="space-y-4 text-[#C4BAB0] text-sm font-light">
                 <li className="flex items-start space-x-3">
                   <span className="text-[#C9A84C] font-bold text-xs mt-0.5">1.</span>
                   <span>Mix a drop of mild dish soap in a bowl with some lukewarm water.</span>
                 </li>
                 <li className="flex items-start space-x-3">
                   <span className="text-[#C9A84C] font-bold text-xs mt-0.5">2.</span>
                   <span>Soak the jewellery in the mixture for a few minutes (delicate gemstones should never be saturated for more than a few seconds).</span>
                 </li>
                 <li className="flex items-start space-x-3">
                   <span className="text-[#C9A84C] font-bold text-xs mt-0.5">3.</span>
                   <span>Use a soft-bristle toothbrush to buff away dirt gently. Use a toothpick carefully for hard-to-reach spots.</span>
                 </li>
                 <li className="flex items-start space-x-3">
                   <span className="text-[#C9A84C] font-bold text-xs mt-0.5">4.</span>
                   <span>Pat dry and allow it to air dry completely before storage. Take note of any loose stones and stop wearing it until fixed.</span>
                 </li>
               </ul>
            </div>
            <div className="order-1 md:order-2 space-y-4">
               <span className="text-[10px] tracking-[0.32em] uppercase text-[#C9A84C] font-semibold">
                 03 / Gentle Cleaning
               </span>
               <h2 className="text-3xl font-light text-[#FAF7F2] leading-tight">
                 Safely Cleaning Fine <em className="italic text-[#C9A84C]">Jewellery</em>
               </h2>
               <p className="text-[#C4BAB0] text-sm leading-relaxed font-light">
                 The most gentle way to clean fine jewellery is to do so at home using this DIY solution: a dish, lukewarm water, a soft-bristle toothbrush, and some mild dish detergent. The milder the soap, the better.
               </p>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
