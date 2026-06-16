"use client";
import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Pickaxe, Flame, Droplets } from "lucide-react";

export default function PrimaryGoldClient() {
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
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#C9A84C] font-bold">Materials Guide</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-light text-[#FAF7F2] leading-tight">
            Jewellery – The Primary <span className="font-display italic gold-gradient-text">Use of Gold</span>
          </h1>
          <p className="text-[#C4BAB0] font-light text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
            Gold has been used to make ornamental objects and jewellery for thousands of years. It remains the most coveted material in high-end craftsmanship.
          </p>
          <div className="gold-divider mx-auto" />
        </motion.div>

        {/* ── Content Blocks ── */}
        <div className="space-y-16">
          
          {/* Block 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          >
            <div className="order-2 md:order-1 glass-panel luxury-shadow p-10 rounded-3xl border border-[#C9A84C]/10 flex flex-col justify-center min-h-[300px] relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#C9A84C]/5 to-transparent pointer-events-none" />
               <Pickaxe className="w-10 h-10 text-[#C9A84C] mb-6" />
               <h3 className="text-2xl font-light text-[#FAF7F2] mb-4">A History of Ornamentation</h3>
               <p className="text-[#C4BAB0] text-sm leading-relaxed font-light mb-4">
                 Gold has been used to make ornamental objects and jewellery for thousands of years. It is widely considered the ultimate material for crafting personal adornments across virtually all civilizations.
               </p>
               <p className="text-[#C4BAB0] text-sm leading-relaxed font-light">
                 Its inherent beauty, resistance to tarnish, and supreme malleability have cemented its position as the primary metal of choice for fine jewellery and luxury creations.
               </p>
            </div>
            <div className="order-1 md:order-2 space-y-4">
               <span className="text-[10px] tracking-[0.32em] uppercase text-[#C9A84C] font-semibold">
                 01 / Heritage
               </span>
               <h2 className="text-3xl font-light text-[#FAF7F2] leading-tight">
                 Thousands of Years of <em className="italic text-[#C9A84C] not-italic" style={{ fontStyle: "italic" }}>Craft</em>
               </h2>
               <p className="text-[#C4BAB0] text-sm leading-relaxed font-light">
                 From ancient royalties to modern master artisans, gold remains the foundational canvas for high jewellery.
               </p>
            </div>
          </motion.div>

          {/* Block 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          >
            <div className="space-y-4">
               <span className="text-[10px] tracking-[0.32em] uppercase text-[#C9A84C] font-semibold">
                 02 / Malleability
               </span>
               <h2 className="text-3xl font-light text-[#FAF7F2] leading-tight">
                 Easy to <em className="italic text-[#C9A84C] not-italic" style={{ fontStyle: "italic" }}>Work</em>
               </h2>
               <p className="text-[#C4BAB0] text-sm leading-relaxed font-light">
                 Gold nuggets found in a stream are very easy to work, making gold one of the first metals ever manipulated by early mankind.
               </p>
            </div>
            <div className="glass-panel luxury-shadow p-10 rounded-3xl border border-[#C9A84C]/10 flex flex-col justify-center min-h-[300px] relative overflow-hidden">
               <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-[#C9A84C]/5 to-transparent pointer-events-none" />
               <Flame className="w-10 h-10 text-[#C9A84C] mb-6" />
               <h3 className="text-2xl font-light text-[#FAF7F2] mb-4">Shaping Perfection</h3>
               <p className="text-[#C4BAB0] text-sm leading-relaxed font-light mb-4">
                 Unlike other metals that require immense heat and specialized equipment just to become pliable, pure gold can be shaped easily. 
               </p>
               <p className="text-[#C4BAB0] text-sm leading-relaxed font-light">
                 At Vees Star, we utilize this incredible property in our casting and burnishing process to create perfectly calibrated micro-prongs that secure your solitaires flawlessly.
               </p>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
