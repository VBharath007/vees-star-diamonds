"use client";
import React from "react";
import { motion } from "framer-motion";
import { Sparkles, MessageSquare, ChevronRight, Mail, Play, Volume2 } from "lucide-react";
import Link from "next/link";

export default function EarringsClient() {
  const items = [
    {
      id: 1,
      title: "The Aurelia Cascade Drop",
      carats: "E Flawless // 4.6 Carat Total Weight",
      url: "/earing/1.png",
      aspect: "h-[400px]"
    },
    {
      id: 2,
      title: "The Celestial Arch Studs",
      carats: "D IF // 5.2 Carat Diamond Drops",
      url: "/earing/2.png",
      aspect: "h-[320px]"
    },
    {
      id: 3,
      title: "The Empress Solitaire Hoop",
      carats: "E IF // Bespoke Bridal Commission",
      url: "/earing/3.png",
      aspect: "h-[350px]"
    },
    {
      id: 4,
      title: "The Blush Regency Chandelier",
      carats: "F VVS1 // 3.8 Carat Rose Gold Settings",
      url: "/earing/4.png",
      aspect: "h-[380px]"
    }
  ];

  const handleWhatsAppInquiry = (item) => {
    const msg = `Hi Vees Star Diamonds! I saw the earrings "${item.title}" (${item.carats}) in your gallery and would like to inquire about its availability and customization.`;
    const url = `https://api.whatsapp.com/send?phone=919383007477&text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  };

  const handleVideoInquiry = () => {
    const msg = "Hi Vees Star Diamonds! I watched the Earring Couture showcase model video and would like to book a VIP consultation to view your complete ear wear collections.";
    const url = `https://api.whatsapp.com/send?phone=919383007477&text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="relative min-h-screen bg-[#0E0C0A] text-[#FAF7F2] pt-[180px] pb-16 px-6 md:px-12 overflow-hidden">
      {/* Ambient Glows */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#C9A84C]/3 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#C9A84C]/3 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* ── Breadcrumbs ── */}
        <div className="flex flex-wrap items-center space-x-2 text-[10px] tracking-widest uppercase font-bold text-[#7A6E66]">
          <Link href="/" className="hover:text-[#C9A84C] transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/gallery" className="hover:text-[#C9A84C] transition-colors">Gallery</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#C9A84C]">Ear Rings</span>
        </div>

        {/* ── Header ── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between border-b border-[#C9A84C]/10 pb-8 text-left gap-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            className="space-y-4 max-w-xl"
          >
            <div className="badge-gold">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A84C]" />
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#C9A84C] font-bold">Earwear</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-light text-[#FAF7F2] leading-tight">
              Diamond <span className="font-display italic gold-gradient-text">Ear Rings</span>
            </h1>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-sm text-[#C4BAB0] font-light max-w-md leading-relaxed"
          >
            Explore our curated selection of GIA-certified diamond solitaire studs, hoops, and custom bridal chandeliers, designed to catch light with every gesture.
          </motion.p>
        </div>

        {/* ── 1. Couture Model Video Section ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-5xl mx-auto rounded-3xl overflow-hidden border border-[#C9A84C]/15 bg-[#0A0806] relative shadow-[0_25px_60px_rgba(0,0,0,0.85)] group"
        >
          {/* Subtle gold top outline */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/45 to-transparent z-10" />

          {/* Model video loop */}
          <div className="aspect-[16/9] w-full relative">
            <video
              className="w-full h-full object-cover"
              src="/Model videos/1.MP4"
              autoPlay
              loop
              muted
              playsInline
            />
            {/* Cinematic overlay vignetting */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0E0C0A]/95 via-transparent to-[#0E0C0A]/35" />

            {/* Video Watermark & Info */}
            <div className="absolute top-6 left-6 flex items-center space-x-3 text-[10px] tracking-[0.25em] text-[#C9A84C] font-bold uppercase z-20">
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Earring Couture Showcase // Live Reel</span>
            </div>

            {/* Call to Action Inside Video */}
            <div className="absolute bottom-8 left-8 right-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 z-20">
              <div className="space-y-1.5 text-left">
                <span className="text-[9px] uppercase tracking-widest text-[#C9A84C] font-bold">VIP Feature</span>
                <h3 className="text-xl md:text-2xl font-light text-white tracking-wide">
                  Experience <span className="italic">Bridal Splendour</span>
                </h3>
              </div>
              <button
                onClick={handleVideoInquiry}
                className="px-6 py-3 bg-[#C9A84C] hover:bg-[#E8D5A0] text-[#0E0C0A] font-extrabold uppercase tracking-widest text-[10px] rounded-xl transition-all shadow-lg hover:shadow-[#C9A84C]/15 border-0 cursor-pointer"
              >
                Inquire Collection
              </button>
            </div>
          </div>
        </motion.div>

        {/* ── 2. Masonry Image Grid ── */}
        <div className="space-y-8 pt-8">
          <div className="text-left">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#C9A84C] font-bold">The Showcase</span>
            <h2 className="text-2xl md:text-3xl font-light text-[#FAF7F2] mt-1.5">Masterpiece Designs</h2>
          </div>

          <div className="columns-1 md:columns-2 gap-6 space-y-6 max-w-5xl mx-auto">
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
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0806]/95 via-[#0A0806]/35 to-transparent" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/40 to-transparent" />

                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                  <button
                    onClick={() => handleWhatsAppInquiry(item)}
                    className="p-2.5 rounded-full bg-[#0A0806]/85 backdrop-blur-md border border-[#C9A84C]/25 hover:border-[#C9A84C] text-[#C4BAB0] hover:text-[#C9A84C] transition-all"
                    title="Inquire on WhatsApp"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </button>
                </div>

                <div className="absolute bottom-5 left-5 right-5 text-left space-y-1.5 z-10">
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
        </div>

        {/* ── Newsletter CTA ── */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 glass-panel luxury-shadow p-10 rounded-3xl border border-[#C9A84C]/10 flex flex-col md:flex-row items-center justify-between gap-8 max-w-4xl mx-auto"
        >
          <div className="space-y-3 text-left">
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
