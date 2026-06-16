"use client";
import React from "react";
import { motion } from "framer-motion";
import { Sparkles, MessageSquare, ChevronRight, Mail } from "lucide-react";
import Link from "next/link";

export default function PendantsClient() {
  const items = [
    {
      id: 3,
      title: "The Imperial Emerald Pendant",
      carats: "4.2 Carat // White Gold Chain",
      url: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=500&q=80",
      aspect: "h-[400px]"
    },
    {
      id: 7,
      title: "Diamond Halo Drop Pendant",
      carats: "1.8 Carat // 18K Yellow Gold",
      url: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=500&q=80",
      aspect: "h-[320px]"
    },
    {
      id: 8,
      title: "Solitaire Pearl & Diamond Pendant",
      carats: "South Sea Pearl // Rose Gold",
      url: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=500&q=80",
      aspect: "h-[350px]"
    }
  ];

  const handleWhatsAppInquiry = (item) => {
    const msg = `Hi Vees Star Diamonds! I saw the pendant "${item.title}" (${item.carats}) in your gallery and would like to inquire about its availability and customization.`;
    const url = `https://api.whatsapp.com/send?phone=919383007477&text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="relative min-h-screen bg-[#0E0C0A] text-[#FAF7F2] pt-[180px] pb-16 px-6 md:px-12 overflow-hidden">
      {/* Ambient Glows */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#C9A84C]/3 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#C9A84C]/3 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* ── Breadcrumbs ── */}
        <div className="flex flex-wrap items-center space-x-2 text-[10px] tracking-widest uppercase font-bold text-[#7A6E66]">
          <Link href="/" className="hover:text-[#C9A84C] transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/gallery" className="hover:text-[#C9A84C] transition-colors">Gallery</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#C9A84C]">Pendants</span>
        </div>

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          className="text-left space-y-4 max-w-2xl border-b border-[#C9A84C]/10 pb-8"
        >
          <div className="badge-gold">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A84C]" />
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#C9A84C] font-bold">Neckware</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-light text-[#FAF7F2] leading-tight">
            Diamond <span className="font-display italic gold-gradient-text">Pendants</span>
          </h1>
        </motion.div>

        {/* ── Masonry Grid ── */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {items.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className={`break-inside-avoid relative rounded-2xl overflow-hidden border border-[#C9A84C]/8 group shadow-lg ${item.aspect} bg-[#181410] cursor-pointer hover:border-[#C9A84C]/25 transition-colors duration-500`}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url('${item.url}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0806]/95 via-[#0A0806]/30 to-transparent" />
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/40 to-transparent" />

              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                <button
                  onClick={() => handleWhatsAppInquiry(item)}
                  className="p-2.5 rounded-full bg-[#0A0806]/80 backdrop-blur-md border border-[#C9A84C]/20 hover:border-[#C9A84C] text-[#C4BAB0] hover:text-[#C9A84C] transition-all"
                  title="Inquire on WhatsApp"
                >
                  <MessageSquare className="w-4 h-4" />
                </button>
              </div>

              <div className="absolute bottom-5 left-5 right-5 text-left space-y-1 z-10">
                <span className="text-[8.5px] uppercase tracking-widest text-[#C9A84C] font-bold block">
                  {item.carats}
                </span>
                <h4 className="text-sm font-semibold text-[#FAF7F2] tracking-wide">
                  {item.title}
                </h4>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Newsletter CTA ── */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 glass-panel luxury-shadow p-10 rounded-3xl border border-[#C9A84C]/10 flex flex-col md:flex-row items-center justify-between gap-8 max-w-4xl mx-auto"
        >
          <div className="space-y-3">
            <h4 className="text-xl font-light text-[#FAF7F2]">Subscribe to our Newsletter</h4>
            <p className="text-sm text-[#C4BAB0] font-light">We wish to keep in touch with you. Enter your email address below to stay updated.</p>
          </div>
          <div className="flex w-full md:w-auto relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <Mail className="w-4 h-4 text-[#7A6E66]" />
            </div>
            <input 
              type="email" 
              placeholder="Email Address" 
              className="w-full md:w-[250px] bg-[#0A0806] border border-[#C9A84C]/20 text-[#FAF7F2] text-sm rounded-l-xl pl-11 pr-4 py-3 focus:outline-none focus:border-[#C9A84C]/50 transition-colors"
            />
            <button className="bg-[#C9A84C] hover:bg-[#E8D5A0] text-[#0E0C0A] font-bold uppercase tracking-widest text-[10px] px-6 py-3 rounded-r-xl transition-colors shrink-0">
              Subscribe
            </button>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
