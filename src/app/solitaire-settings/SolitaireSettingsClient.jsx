"use client";
import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Diamond, CircleDot, Stars } from "lucide-react";

export default function SolitaireSettingsClient() {
  return (
    <div className="relative min-h-screen bg-[#0E0C0A] text-[#FAF7F2] pt-[180px] pb-24 px-6 md:px-12 overflow-hidden">
      
      {/* Ambient Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C9A84C]/4 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#C9A84C]/3 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-5xl mx-auto space-y-24 relative z-10">
        
        {/* ── Header ── */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          className="text-center space-y-6 max-w-3xl mx-auto"
        >
          <div className="badge-gold w-fit mx-auto">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A84C]" />
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#C9A84C] font-bold">Timeless Classics</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-light text-[#FAF7F2] leading-tight">
            Solitaire <span className="font-display italic gold-gradient-text">Settings</span>
          </h1>
          <p className="text-[#C4BAB0] font-light text-base md:text-lg leading-relaxed">
            A diamond solitaire refers to any piece of jewellery with a single diamond. They have come in a variety of shapes and settings over the years.
          </p>
          <div className="gold-divider mx-auto" />
        </motion.div>

        {/* ── Features ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="glass-panel luxury-shadow p-10 rounded-3xl border border-[#C9A84C]/10 flex flex-col justify-center text-center relative overflow-hidden group"
          >
             <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#C9A84C]/5 to-transparent pointer-events-none group-hover:from-[#C9A84C]/10 transition-all duration-500" />
             <Diamond className="w-10 h-10 text-[#C9A84C] mb-6 mx-auto" />
             <h3 className="text-2xl font-light text-[#FAF7F2] mb-4">Rings & Bands</h3>
             <p className="text-[#C4BAB0] text-sm leading-relaxed font-light">
               The quintessential engagement ring style. A single, flawless diamond taking center stage, symbolizing singular love and devotion.
             </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="glass-panel luxury-shadow p-10 rounded-3xl border border-[#C9A84C]/10 flex flex-col justify-center text-center relative overflow-hidden group"
          >
             <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-[#C9A84C]/5 to-transparent pointer-events-none group-hover:from-[#C9A84C]/10 transition-all duration-500" />
             <CircleDot className="w-10 h-10 text-[#C9A84C] mb-6 mx-auto" />
             <h3 className="text-2xl font-light text-[#FAF7F2] mb-4">Necklaces</h3>
             <p className="text-[#C4BAB0] text-sm leading-relaxed font-light">
               Elegant solitaire pendants rest perfectly against the collarbone, offering a sophisticated flash of brilliance for any occasion.
             </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="glass-panel luxury-shadow p-10 rounded-3xl border border-[#C9A84C]/10 flex flex-col justify-center text-center relative overflow-hidden group"
          >
             <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#C9A84C]/5 to-transparent pointer-events-none group-hover:from-[#C9A84C]/10 transition-all duration-500" />
             <Stars className="w-10 h-10 text-[#C9A84C] mb-6 mx-auto" />
             <h3 className="text-2xl font-light text-[#FAF7F2] mb-4">Earrings & Men's Jewellery</h3>
             <p className="text-[#C4BAB0] text-sm leading-relaxed font-light">
               From classic solitaire studs to bold men's rings, the singular diamond design provides versatile, timeless luxury for everyone.
             </p>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
