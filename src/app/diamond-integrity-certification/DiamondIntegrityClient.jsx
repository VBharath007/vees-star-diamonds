"use client";
import React from "react";
import { motion } from "framer-motion";
import { Sparkles, FileCheck, ShieldCheck, Search } from "lucide-react";

export default function DiamondIntegrityClient() {
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
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#C9A84C] font-bold">Guaranteed Purity</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-light text-[#FAF7F2] leading-tight">
            Diamond Integrity & <span className="font-display italic gold-gradient-text">Certification</span>
          </h1>
          <p className="text-[#C4BAB0] font-light text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
            When buying a diamond engagement ring, make sure it comes with a recognized international certificate.
          </p>
          <div className="gold-divider mx-auto" />
        </motion.div>

        {/* ── Content Blocks ── */}
        <div className="space-y-16">
          
          {/* Block 1: International Recognition */}
          <motion.div 
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          >
            <div className="order-2 md:order-1 glass-panel luxury-shadow p-10 rounded-3xl border border-[#C9A84C]/10 flex flex-col justify-center min-h-[300px] relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#C9A84C]/5 to-transparent pointer-events-none" />
               <FileCheck className="w-10 h-10 text-[#C9A84C] mb-6" />
               <h3 className="text-2xl font-light text-[#FAF7F2] mb-4">GIA Grading Reports</h3>
               <p className="text-[#C4BAB0] text-sm leading-relaxed font-light">
                 A diamond certification or a grading report is a document provided by expert gemologists who assess the quality of a diamond, including its cut, clarity, polish, and dimensions. The GIA is the world's leading diamond grading organization.
               </p>
            </div>
            <div className="order-1 md:order-2 space-y-4">
               <span className="text-[10px] tracking-[0.32em] uppercase text-[#C9A84C] font-semibold">
                 01 / Verification
               </span>
               <h2 className="text-3xl font-light text-[#FAF7F2] leading-tight">
                 International <em className="italic text-[#C9A84C] not-italic" style={{ fontStyle: "italic" }}>Standards</em>
               </h2>
               <p className="text-[#C4BAB0] text-sm leading-relaxed font-light">
                 Every masterpiece requires authentication. We ensure that our diamonds are graded by the most rigorous gemological authorities globally.
               </p>
            </div>
          </motion.div>

          {/* Block 2: Vees Star Promise */}
          <motion.div 
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          >
            <div className="space-y-4">
               <span className="text-[10px] tracking-[0.32em] uppercase text-[#C9A84C] font-semibold">
                 02 / The Vees Star Promise
               </span>
               <h2 className="text-3xl font-light text-[#FAF7F2] leading-tight">
                 Solitaire <em className="italic text-[#C9A84C] not-italic" style={{ fontStyle: "italic" }}>Excellence</em>
               </h2>
               <p className="text-[#C4BAB0] text-sm leading-relaxed font-light">
                 We do not compromise on clarity or confidence. The certificate you receive is the ultimate proof of value and precision for your investment.
               </p>
            </div>
            <div className="glass-panel luxury-shadow p-10 rounded-3xl border border-[#C9A84C]/10 flex flex-col justify-center min-h-[300px] relative overflow-hidden">
               <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-[#C9A84C]/5 to-transparent pointer-events-none" />
               <ShieldCheck className="w-10 h-10 text-[#C9A84C] mb-6" />
               <h3 className="text-2xl font-light text-[#FAF7F2] mb-4">Complete Transparency</h3>
               <p className="text-[#C4BAB0] text-sm leading-relaxed font-light">
                 Vees Star Diamonds provides a GIA certificate for every Solitaire purchased. The GIA certificate provides in-depth information on the cut, clarity, color, and caratage of the solitaire.
               </p>
            </div>
          </motion.div>

          {/* Block 3: Laser Inscription & Traceability */}
          <motion.div 
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          >
            <div className="order-2 md:order-1 glass-panel luxury-shadow p-10 rounded-3xl border border-[#C9A84C]/10 flex flex-col justify-center min-h-[300px] relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#C9A84C]/5 to-transparent pointer-events-none" />
               <Search className="w-10 h-10 text-[#C9A84C] mb-6" />
               <h3 className="text-2xl font-light text-[#FAF7F2] mb-4">Laser Inscription</h3>
               <p className="text-[#C4BAB0] text-sm leading-relaxed font-light">
                 Some solitaires also have a laser inscribed unique identification number which denotes that the diamond you buy adheres to strict industry guidelines and represents a commitment to integrity. We keep careful track of our diamonds to ensure that each and every diamond is natural, untreated, and conflict-free.
               </p>
            </div>
            <div className="order-1 md:order-2 space-y-4">
               <span className="text-[10px] tracking-[0.32em] uppercase text-[#C9A84C] font-semibold">
                 03 / Traceability
               </span>
               <h2 className="text-3xl font-light text-[#FAF7F2] leading-tight">
                 A Mark of <em className="italic text-[#C9A84C] not-italic" style={{ fontStyle: "italic" }}>Integrity</em>
               </h2>
               <p className="text-[#C4BAB0] text-sm leading-relaxed font-light">
                 Your peace of mind is paramount. Our tracking systems ensure that from the moment of origin to the final setting, your diamond remains unequivocally pure.
               </p>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
