"use client";
import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Folder } from "lucide-react";
import Link from "next/link";

const articles = [
  {
    title: "Diamond Shape and Cut guide",
    excerpt: "In order to select your perfect diamond engagement ring, it can be helpful to understand the difference between diamond shape and cut.",
    link: "#",
    tag: "Uncategorized"
  }
];

export default function UncategorizedClient() {
  return (
    <div className="relative min-h-screen bg-[#0E0C0A] text-[#FAF7F2] pt-[180px] pb-24 px-6 md:px-12 overflow-hidden">
      
      {/* Ambient Glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#C9A84C]/4 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#C9A84C]/3 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto space-y-20 relative z-10">
        
        {/* ── Header ── */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          className="text-center space-y-6 max-w-4xl mx-auto border-b border-[#C9A84C]/10 pb-12"
        >
          <div className="badge-gold w-fit mx-auto">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A84C]" />
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#C9A84C] font-bold">Category Archives</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-light text-[#FAF7F2] leading-tight">
            Uncategorized <span className="font-display italic gold-gradient-text">Archives</span>
          </h1>
          <p className="text-[#C4BAB0] font-light text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            A collection of legacy articles, general insights, and guides from our editorial team.
          </p>
        </motion.div>

        {/* ── Blog Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: (idx % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="glass-panel luxury-shadow p-8 rounded-3xl border border-[#C9A84C]/10 hover:border-[#C9A84C]/25 transition-all duration-500 flex flex-col justify-between group overflow-hidden relative h-full"
            >
              {/* Corner Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#C9A84C]/5 to-transparent pointer-events-none group-hover:from-[#C9A84C]/15 transition-all duration-500" />
              
              <div className="space-y-5 relative z-10">
                <div className="flex items-center space-x-2">
                  <Folder className="w-3.5 h-3.5 text-[#C9A84C]" />
                  <span className="text-[9px] tracking-widest uppercase text-[#C9A84C] font-bold">
                    {article.tag}
                  </span>
                </div>
                
                <h3 className="text-xl font-light text-[#FAF7F2] leading-snug group-hover:text-[#E8D5A0] transition-colors">
                  {article.title}
                </h3>
                
                <p className="text-sm text-[#C4BAB0] font-light leading-relaxed line-clamp-3">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-8 mt-auto relative z-10 border-t border-[#C9A84C]/10 group-hover:border-[#C9A84C]/25 transition-colors">
                <Link 
                  href={article.link} 
                  className="inline-flex items-center space-x-2 text-[10px] uppercase tracking-widest font-bold text-[#C9A84C] hover:text-[#E8D5A0] transition-colors group/btn"
                >
                  <span>Continue Reading</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
