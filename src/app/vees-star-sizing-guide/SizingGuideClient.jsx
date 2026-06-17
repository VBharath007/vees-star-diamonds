"use client";
import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ActivitySquare, Gem, Ruler } from "lucide-react";

export default function SizingGuideClient() {
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
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#C9A84C] font-bold">Measurement Standard</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-light text-[#FAF7F2] leading-tight">
            Vees Star <span className="font-display italic gold-gradient-text">Sizing Guide</span>
          </h1>
          <p className="text-[#C4BAB0] font-light text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
            An engagement ring is the ultimate symbol of commitment. Here is how to subtly discover their ring size for the perfect proposal moment.
          </p>
          <div className="gold-divider mx-auto" />
        </motion.div>

        {/* ── Content Blocks ── */}
        <div className="space-y-16">
          
          {/* Block 1: Ring Sizing */}
          <motion.div 
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          >
            <div className="order-2 md:order-1 glass-panel luxury-shadow p-10 rounded-3xl border border-[#C9A84C]/10 flex flex-col justify-center min-h-[300px] relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#C9A84C]/5 to-transparent pointer-events-none" />
               <Gem className="w-10 h-10 text-[#C9A84C] mb-6" />
               <h3 className="text-2xl font-light text-[#FAF7F2] mb-4">Using Existing Rings</h3>
               <p className="text-[#C4BAB0] text-sm leading-relaxed font-light mb-4">
                 One of the easiest ways to learn your ring size is to take a look at the rings you own. Comparing the size of these rings to the printable Vees Star ring size chart will allow you to discover the size you need to buy.
               </p>
               <p className="text-[#C4BAB0] text-sm leading-relaxed font-light">
                 Do be sure that the ring fits the ring finger – in most Western cultures engagement rings are traditionally worn on the fourth finger of the left hand.
               </p>
            </div>
            <div className="order-1 md:order-2 space-y-4">
               <span className="text-[10px] tracking-[0.32em] uppercase text-[#C9A84C] font-semibold">
                 01 / Ring Size
               </span>
               <h2 className="text-3xl font-light text-[#FAF7F2] leading-tight">
                 Finding the <em className="italic text-[#C9A84C]">Perfect</em> Fit
               </h2>
               <p className="text-[#C4BAB0] text-sm leading-relaxed font-light">
                 A perfectly sized ring ensures both absolute comfort and the safety of your precious solitaire.
               </p>
            </div>
          </motion.div>

          {/* Block 2: Bangle Sizing Header */}
          <motion.div 
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-center space-y-4 max-w-2xl mx-auto pt-8"
          >
             <span className="text-[10px] tracking-[0.32em] uppercase text-[#C9A84C] font-semibold">
               02 / Bangle Measurement
             </span>
             <h2 className="text-3xl font-light text-[#FAF7F2] leading-tight">
               Bangle <em className="italic text-[#C9A84C]">Sizing Guide</em>
             </h2>
          </motion.div>

          {/* Block 3: Bangle Methods */}
          <motion.div 
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {/* Method A: Existing Bangle */}
            <div className="glass-panel luxury-shadow p-10 rounded-3xl border border-[#C9A84C]/10 flex flex-col justify-center relative overflow-hidden group">
               <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-[#C9A84C]/5 to-transparent pointer-events-none group-hover:from-[#C9A84C]/10 transition-all duration-500" />
               <ActivitySquare className="w-10 h-10 text-[#C9A84C] mb-6" />
               <h3 className="text-xl font-light text-[#FAF7F2] mb-4">If you have an existing bangle:</h3>
               <ul className="space-y-3 text-[#C4BAB0] text-sm font-light">
                 <li className="flex items-start space-x-3">
                   <span className="text-[#C9A84C] font-bold text-xs mt-0.5">1.</span>
                   <span>Measure the diameter (mm/in.) of a bangle that is the desired size.</span>
                 </li>
                 <li className="flex items-start space-x-3">
                   <span className="text-[#C9A84C] font-bold text-xs mt-0.5">2.</span>
                   <span>Download the Bangle Sizing Chart to locate the size that best suits you.</span>
                 </li>
               </ul>
            </div>

            {/* Method B: Measure Hand */}
            <div className="glass-panel luxury-shadow p-10 rounded-3xl border border-[#C9A84C]/10 flex flex-col justify-center relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#C9A84C]/5 to-transparent pointer-events-none group-hover:from-[#C9A84C]/10 transition-all duration-500" />
               <Ruler className="w-10 h-10 text-[#C9A84C] mb-6" />
               <h3 className="text-xl font-light text-[#FAF7F2] mb-4">If not, measure the widest point of your hand:</h3>
               <ul className="space-y-3 text-[#C4BAB0] text-sm font-light">
                 <li className="flex items-start space-x-3">
                   <span className="text-[#C9A84C] font-bold text-xs mt-0.5">1.</span>
                   <span>Tuck your thumb in towards the palm of your hand and then wrap a piece of string or strip of paper around the widest part, marking the point at which the two ends meet.</span>
                 </li>
                 <li className="flex items-start space-x-3">
                   <span className="text-[#C9A84C] font-bold text-xs mt-0.5">2.</span>
                   <span>Measure the string or paper from mark to mark to find your bangle circumference (mm/in.).</span>
                 </li>
                 <li className="flex items-start space-x-3">
                   <span className="text-[#C9A84C] font-bold text-xs mt-0.5">3.</span>
                   <span>Download the Bangle Sizing Chart to locate the size that best suits you.</span>
                 </li>
               </ul>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
