"use client";
import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Clock, Gem, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function FranchiseClient() {
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
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#C9A84C] font-bold">Partner With Us</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-light text-[#FAF7F2] leading-tight">
            Work From Home <span className="font-display italic gold-gradient-text">Franchise</span>
          </h1>
          <p className="text-[#C4BAB0] font-light text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
            Join the Vees Star family. Showcase over 4000+ unique diamond jewellery designs with a flexible schedule and earn from a premium product portfolio.
          </p>
          <div className="gold-divider mx-auto" />
        </motion.div>

        {/* ── Franchise Steps ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Step 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="glass-panel luxury-shadow p-10 rounded-3xl border border-[#C9A84C]/10 flex flex-col items-center text-center relative overflow-hidden group"
          >
             <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#C9A84C]/5 to-transparent pointer-events-none group-hover:from-[#C9A84C]/10 transition-all duration-500" />
             <div className="w-16 h-16 rounded-full bg-[#C9A84C]/10 flex items-center justify-center mb-6">
               <Clock className="w-8 h-8 text-[#C9A84C]" />
             </div>
             <span className="text-[10px] tracking-[0.32em] uppercase text-[#C9A84C] font-semibold block mb-3">Step 1</span>
             <h3 className="text-2xl font-light text-[#FAF7F2] mb-4">Flexible Schedule</h3>
             <p className="text-[#C4BAB0] text-sm leading-relaxed font-light">
               Work on your own terms. The schedule is completely flexible, allowing you to manage your time and connect with prospective clients at your convenience.
             </p>
          </motion.div>

          {/* Step 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="glass-panel luxury-shadow p-10 rounded-3xl border border-[#C9A84C]/10 flex flex-col items-center text-center relative overflow-hidden group"
          >
             <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-[#C9A84C]/5 to-transparent pointer-events-none group-hover:from-[#C9A84C]/10 transition-all duration-500" />
             <div className="w-16 h-16 rounded-full bg-[#C9A84C]/10 flex items-center justify-center mb-6">
               <Gem className="w-8 h-8 text-[#C9A84C]" />
             </div>
             <span className="text-[10px] tracking-[0.32em] uppercase text-[#C9A84C] font-semibold block mb-3">Step 2</span>
             <h3 className="text-2xl font-light text-[#FAF7F2] mb-4">Premium Portfolio</h3>
             <p className="text-[#C4BAB0] text-sm leading-relaxed font-light">
               Showcase 4000+ unique designs. Offer diamond studded gold jewellery like Earrings, Solitaire rings, Pendants, Necklaces, Bracelets, Long Chains, and Bangles. Price ranges from Rs.4000 to Rs.45,00,000/-.
             </p>
          </motion.div>

          {/* Step 3 */}
          <motion.div 
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="glass-panel luxury-shadow p-10 rounded-3xl border border-[#C9A84C]/10 flex flex-col items-center text-center relative overflow-hidden group"
          >
             <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#C9A84C]/5 to-transparent pointer-events-none group-hover:from-[#C9A84C]/10 transition-all duration-500" />
             <div className="w-16 h-16 rounded-full bg-[#C9A84C]/10 flex items-center justify-center mb-6">
               <TrendingUp className="w-8 h-8 text-[#C9A84C]" />
             </div>
             <span className="text-[10px] tracking-[0.32em] uppercase text-[#C9A84C] font-semibold block mb-3">Step 3</span>
             <h3 className="text-2xl font-light text-[#FAF7F2] mb-4">Earn</h3>
             <p className="text-[#C4BAB0] text-sm leading-relaxed font-light mb-6">
               Turn your network into a thriving business. Earn competitive returns while offering your clients lifetime service and unparalleled luxury.
             </p>
             <Link
               href="/contact"
               className="mt-auto px-6 py-2.5 bg-[#C9A84C] hover:bg-[#E8D5A0] text-[#0E0C0A] text-[10px] tracking-wider uppercase font-bold rounded-lg transition-all cursor-pointer inline-flex items-center space-x-2 shrink-0"
             >
               Contact Us
             </Link>
          </motion.div>

        </div>

        {/* Footer Quick Links representation */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="border-t border-[#C9A84C]/10 pt-12 flex flex-wrap justify-center gap-6 text-[10px] uppercase tracking-widest text-[#7A6E66] font-bold"
        >
          <span>Necklace</span>
          <span>&bull;</span>
          <span>Diamond Rings</span>
          <span>&bull;</span>
          <span>Pendent</span>
          <span>&bull;</span>
          <span>Earrings</span>
          <span>&bull;</span>
          <span>Bracelets</span>
          <span className="w-full h-px bg-transparent my-1"></span>
          <Link href="/lifetime-of-service" className="text-[#C9A84C] hover:text-[#E8D5A0] transition-colors">Lifetime of Service</Link>
          <span>&bull;</span>
          <Link href="/contact" className="text-[#C9A84C] hover:text-[#E8D5A0] transition-colors">Book Appointment</Link>
        </motion.div>

      </div>
    </div>
  );
}
