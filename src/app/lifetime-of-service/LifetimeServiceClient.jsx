"use client";
import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Infinity, Wand2, Award, FileText, Droplets, PenTool } from "lucide-react";

export default function LifetimeServiceClient() {
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
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#C9A84C] font-bold">The Vees Star Family</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-light text-[#FAF7F2] leading-tight">
            Lifetime of <span className="font-display italic gold-gradient-text">Service</span>
          </h1>
          <p className="text-[#C4BAB0] font-light text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
            Only the best diamonds in purity, color, cut and carat are worthy of adorning your jewellery. All our products are created to express a dream, fulfilling the desires of the woman who receives them as a gift. An instantaneous journey through time and space that brings back memorable moments.
          </p>
          <div className="gold-divider mx-auto" />
        </motion.div>

        {/* ── Content Blocks ── */}
        <div className="space-y-8">
          
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* A Lifetime of Service */}
            <motion.div 
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="glass-panel luxury-shadow p-10 rounded-3xl border border-[#C9A84C]/10 flex flex-col justify-center relative overflow-hidden group"
            >
               <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#C9A84C]/5 to-transparent pointer-events-none group-hover:from-[#C9A84C]/10 transition-all duration-500" />
               <Infinity className="w-10 h-10 text-[#C9A84C] mb-6" />
               <h3 className="text-2xl font-light text-[#FAF7F2] mb-4">A Lifetime of Service</h3>
               <p className="text-[#C4BAB0] text-sm leading-relaxed font-light">
                 When you purchase a product, you become a valued member of the Vees Star family. We pride ourselves on providing continuous premium service, including care and repair, complimentary polishing, and a full lifetime warranty.
               </p>
            </motion.div>

            {/* Customization */}
            <motion.div 
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="glass-panel luxury-shadow p-10 rounded-3xl border border-[#C9A84C]/10 flex flex-col justify-center relative overflow-hidden group"
            >
               <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-[#C9A84C]/5 to-transparent pointer-events-none group-hover:from-[#C9A84C]/10 transition-all duration-500" />
               <Wand2 className="w-10 h-10 text-[#C9A84C] mb-6" />
               <h3 className="text-2xl font-light text-[#FAF7F2] mb-4">Engagement Ring Customization</h3>
               <p className="text-[#C4BAB0] text-sm leading-relaxed font-light">
                 We want you to have the ring of your dreams. From designing unique engagement rings to personalizing engravable wedding bands, our Diamond Experts will work with you to create a unique symbol of your love.
               </p>
            </motion.div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* GIA */}
            <motion.div 
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="glass-panel luxury-shadow p-10 rounded-3xl border border-[#C9A84C]/10 flex flex-col justify-center relative overflow-hidden group"
            >
               <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-[#C9A84C]/5 to-transparent pointer-events-none group-hover:from-[#C9A84C]/10 transition-all duration-500" />
               <Award className="w-10 h-10 text-[#C9A84C] mb-6" />
               <h3 className="text-2xl font-light text-[#FAF7F2] mb-4">GIA Certified Solitaires</h3>
               <p className="text-[#C4BAB0] text-sm leading-relaxed font-light">
                 The GIA is the world's leading diamond grading organization. Vees Star Diamonds provides a GIA certificate for every Solitaire purchased. The GIA certificate provides in-depth information on the cut, clarity, color, and caratage of the solitaire.
               </p>
            </motion.div>

            {/* Lifetime Warranty */}
            <motion.div 
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="glass-panel luxury-shadow p-10 rounded-3xl border border-[#C9A84C]/10 flex flex-col justify-center relative overflow-hidden group"
            >
               <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#C9A84C]/5 to-transparent pointer-events-none group-hover:from-[#C9A84C]/10 transition-all duration-500" />
               <FileText className="w-10 h-10 text-[#C9A84C] mb-6" />
               <h3 className="text-2xl font-light text-[#FAF7F2] mb-4">Product Certificate & Warranty</h3>
               <p className="text-[#C4BAB0] text-sm leading-relaxed font-light">
                 The Certificate is issued by Vees Star Diamonds to certify the authenticity and integrity of serialized diamonds. This document contains vital statistics related to your product and acts as your Full Lifetime Warranty.
               </p>
            </motion.div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Cleaning */}
            <motion.div 
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="glass-panel luxury-shadow p-10 rounded-3xl border border-[#C9A84C]/10 flex flex-col justify-center relative overflow-hidden group"
            >
               <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#C9A84C]/5 to-transparent pointer-events-none group-hover:from-[#C9A84C]/10 transition-all duration-500" />
               <Droplets className="w-10 h-10 text-[#C9A84C] mb-6" />
               <h3 className="text-2xl font-light text-[#FAF7F2] mb-4">Complimentary Cleaning</h3>
               <p className="text-[#C4BAB0] text-sm leading-relaxed font-light">
                 This complimentary service is offered over the lifetime of your product and not only ensures that your diamonds or gemstones are cleaned, but also that the stones are secure in their settings. With proper care, your product will retain its beauty for generations. Contact us or bring your product to our stores for cleaning.
               </p>
            </motion.div>

            {/* Repairs */}
            <motion.div 
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="glass-panel luxury-shadow p-10 rounded-3xl border border-[#C9A84C]/10 flex flex-col justify-center relative overflow-hidden group"
            >
               <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-[#C9A84C]/5 to-transparent pointer-events-none group-hover:from-[#C9A84C]/10 transition-all duration-500" />
               <PenTool className="w-10 h-10 text-[#C9A84C] mb-6" />
               <h3 className="text-2xl font-light text-[#FAF7F2] mb-4">Repairs & Maintenance</h3>
               <p className="text-[#C4BAB0] text-sm leading-relaxed font-light mb-4">
                 We ensure that our craftsmanship is to the highest standards and repair all items made by Vees Star Diamonds. You may either bring your item to our store or send in your item by mail.
               </p>
               <p className="text-[#C4BAB0] text-sm leading-relaxed font-light">
                 After we make an assessment, we will send you a free estimate. At this time, we can only accept shipments from clients residing in India. You may call us at +91 93830 07477 / +91 98848 56057 for assistance.
               </p>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}
