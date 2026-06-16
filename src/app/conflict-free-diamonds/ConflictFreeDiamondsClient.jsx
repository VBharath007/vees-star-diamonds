"use client";
import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Globe2, HeartHandshake, ShieldCheck } from "lucide-react";

export default function ConflictFreeDiamondsClient() {
  return (
    <div className="relative min-h-screen bg-[#0E0C0A] text-[#FAF7F2] pt-[180px] pb-24 px-6 md:px-12 overflow-hidden">
      
      {/* Ambient Glows */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#C9A84C]/4 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#C9A84C]/3 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto space-y-24 relative z-10">
        
        {/* ── Header ── */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          className="text-center space-y-6 max-w-3xl mx-auto"
        >
          <div className="badge-gold w-fit mx-auto">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A84C]" />
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#C9A84C] font-bold">Ethical Commitment</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-light text-[#FAF7F2] leading-tight">
            Conflict Free <span className="font-display italic gold-gradient-text">Diamonds</span>
          </h1>
          <p className="text-[#C4BAB0] font-light text-base md:text-lg leading-relaxed">
            Mined and shipped without connection to rebel or terror groups, ensuring ethical standards at every step.
          </p>
          <div className="gold-divider mx-auto" />
        </motion.div>

        {/* ── Content Blocks ── */}
        <div className="space-y-16">
          
          {/* Block 1: What is it? */}
          <motion.div 
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          >
            <div className="order-2 md:order-1 glass-panel luxury-shadow p-10 rounded-3xl border border-[#C9A84C]/10 flex flex-col justify-center min-h-[300px] relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#C9A84C]/5 to-transparent pointer-events-none" />
               <ShieldCheck className="w-10 h-10 text-[#C9A84C] mb-6" />
               <h3 className="text-2xl font-light text-[#FAF7F2] mb-4">The Kimberley Process</h3>
               <p className="text-[#C4BAB0] text-sm leading-relaxed font-light">
                 A conflict-free diamond means a diamond that's mined and shipped without connection to rebel or terror groups. Procedures and agreements like The Kimberley Process are in place to guarantee that diamonds are mined and shipped according to certain ethical standards.
               </p>
            </div>
            <div className="order-1 md:order-2 space-y-4">
               <span className="text-[10px] tracking-[0.32em] uppercase text-[#C9A84C] font-semibold">
                 01 / Definition
               </span>
               <h2 className="text-3xl font-light text-[#FAF7F2] leading-tight">
                 What is a <em className="italic text-[#C9A84C] not-italic" style={{ fontStyle: "italic" }}>Conflict-Free</em> Diamond?
               </h2>
               <p className="text-[#C4BAB0] text-sm leading-relaxed font-light">
                 True luxury cannot be born from suffering. We ensure our supply chain remains uncompromised from origin to your hands.
               </p>
            </div>
          </motion.div>

          {/* Block 2: Ethical Sources */}
          <motion.div 
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          >
            <div className="space-y-4">
               <span className="text-[10px] tracking-[0.32em] uppercase text-[#C9A84C] font-semibold">
                 02 / Reliable Origins
               </span>
               <h2 className="text-3xl font-light text-[#FAF7F2] leading-tight">
                 Truly <em className="italic text-[#C9A84C] not-italic" style={{ fontStyle: "italic" }}>Ethical</em> Sources
               </h2>
               <p className="text-[#C4BAB0] text-sm leading-relaxed font-light">
                 There are only a few reliable sources for truly Conflict Free Diamonds or Ethically Sourced Diamonds. Australia, Canada, and Botswana Africa are the most well-known and prolific.
               </p>
            </div>
            <div className="glass-panel luxury-shadow p-10 rounded-3xl border border-[#C9A84C]/10 flex flex-col justify-center min-h-[300px] relative overflow-hidden">
               <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-[#C9A84C]/5 to-transparent pointer-events-none" />
               <Globe2 className="w-10 h-10 text-[#C9A84C] mb-6" />
               <h3 className="text-2xl font-light text-[#FAF7F2] mb-4">Why are they ethical?</h3>
               <p className="text-[#C4BAB0] text-sm leading-relaxed font-light">
                 Mining practices, fair wages, and humanitarian efforts are the prominent reasons. The mining practices are considered safer with worker safety being at the top of management's concerns. Hospitals, social infrastructure, and education work hand in hand with economic stability to better the lives of the people in the mining regions.
               </p>
            </div>
          </motion.div>

          {/* Block 3: What Sets Us Apart */}
          <motion.div 
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          >
            <div className="order-2 md:order-1 glass-panel luxury-shadow p-10 rounded-3xl border border-[#C9A84C]/10 flex flex-col justify-center min-h-[300px] relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#C9A84C]/5 to-transparent pointer-events-none" />
               <HeartHandshake className="w-10 h-10 text-[#C9A84C] mb-6" />
               <h3 className="text-2xl font-light text-[#FAF7F2] mb-4">Going Above and Beyond</h3>
               <p className="text-[#C4BAB0] text-sm leading-relaxed font-light">
                 Vees Star goes above and beyond the current industry standards to offer Conflict Free Diamonds. Our select group of diamond suppliers demonstrate a robust chain of custody protocol for their diamonds and have the ability to track and segregate diamonds by origin. 
               </p>
            </div>
            <div className="order-1 md:order-2 space-y-4">
               <span className="text-[10px] tracking-[0.32em] uppercase text-[#C9A84C] font-semibold">
                 03 / Vees Star Standards
               </span>
               <h2 className="text-3xl font-light text-[#FAF7F2] leading-tight">
                 What Sets Us <em className="italic text-[#C9A84C] not-italic" style={{ fontStyle: "italic" }}>Apart</em>
               </h2>
               <p className="text-[#C4BAB0] text-sm leading-relaxed font-light">
                 These suppliers are required to source diamonds that originate from specific mine operations or specific countries that have demonstrated their commitment to follow internationally recognized labor, trade, and environmental standards.
               </p>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
