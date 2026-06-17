"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, ShieldCheck } from "lucide-react";

export default function SolitairesClient() {
  const [imageType, setImageType] = useState("product"); // "product" or "model"

  const collections = [
    {
      id: "royal-crest",
      title: "The Royal Crest Solitaire",
      cut: "round",
      metal: "platinum",
      desc: "An exceptional round brilliant diamond suspended in a custom 6-prong platinum crown, maximizing light entry from all facets.",
      price: "₹1,18,500",
      tag: "Round Brilliant // PT950 Platinum",
      productImage: "/Product images/1.jpg",
      modelImage: "/Model images/1.jpg",
    },
    {
      id: "golden-majesty",
      title: "The Golden Majesty Ring",
      cut: "cushion",
      metal: "gold",
      desc: "A gorgeous cushion cut solitaire nestled inside an elevated micro-pavé yellow gold setting, delivering traditional warmth and brilliance.",
      price: "₹1,45,000",
      tag: "Cushion Cut // 18K Yellow Gold",
      productImage: "/Product images/2.jpg",
      modelImage: "/Model images/2.jpg",
    },
    {
      id: "empress-halo",
      title: "The Empress Halo Solitaire",
      cut: "oval",
      metal: "gold",
      desc: "An oval solitaire bordered by a brilliant micro-diamond halo, designed to visually amplify the central stone's size and fire.",
      price: "₹1,62,000",
      tag: "Oval Cut // 18K White Gold",
      productImage: "/Product images/3.jpg",
      modelImage: "/Model images/3.jpg",
    },
    {
      id: "blush-regency",
      title: "The Blush Regency Crown",
      cut: "pear",
      metal: "rose_gold",
      desc: "A stunning pear-shaped solitaire set on a delicate rose gold band with sparkling shoulder accents for an asymmetrical vintage finish.",
      price: "₹1,28,000",
      tag: "Pear Cut // 18K Rose Gold",
      productImage: "/Product images/4.jpg",
      modelImage: "/Model images/4.png",
    },
  ];

  const handleInquiry = (ring) => {
    const msg = `Hi Vees Star! I am interested in inquiring about the Signature Edition: ${ring.title} (${ring.tag}) priced at ${ring.price}.`;
    window.open(`https://api.whatsapp.com/send?phone=919383007477&text=${encodeURIComponent(msg)}`, "_blank");
  };

  const [heroActiveIdx, setHeroActiveIdx] = useState(0);
  const activeRing = collections[heroActiveIdx];

  const HERO_THEMES = [
    {
      // Green (Emerald)
      badgeBorder: "border-[#10B981]/25",
      badgeBg: "bg-[#10B981]/5",
      textPrimary: "text-[#10B981]",
      textSecondary: "text-[#A7F3D0]",
      borderLeft: "border-[#10B981]/30",
      bgPrimary: "bg-[#10B981]",
      bgPrimaryHover: "hover:bg-[#34D399]",
      btnText: "text-[#0E0C0A]",
      btnShadow: "hover:shadow-[#10B981]/20",
      borderBtnSec: "border-[#10B981]/20 hover:border-[#10B981]/60",
      activeThumbBorder: "border-[#10B981] shadow-[0_0_12px_rgba(16,185,129,0.35)]",
      thumbHoverBorder: "hover:border-[#10B981]/40",
      bgGlow: "rgba(16,185,129,0.08)",
      imgBorder: "border-[#10B981]/12",
      tagBorder: "border-[#10B981]/15 text-[#10B981]",
    },
    {
      // Blue (Sapphire)
      badgeBorder: "border-[#3B82F6]/25",
      badgeBg: "bg-[#3B82F6]/5",
      textPrimary: "text-[#3B82F6]",
      textSecondary: "text-[#93C5FD]",
      borderLeft: "border-[#3B82F6]/30",
      bgPrimary: "bg-[#3B82F6]",
      bgPrimaryHover: "hover:bg-[#60A5FA]",
      btnText: "text-white",
      btnShadow: "hover:shadow-[#3B82F6]/20",
      borderBtnSec: "border-[#3B82F6]/20 hover:border-[#3B82F6]/60",
      activeThumbBorder: "border-[#3B82F6] shadow-[0_0_12px_rgba(59,130,246,0.35)]",
      thumbHoverBorder: "hover:border-[#3B82F6]/40",
      bgGlow: "rgba(59,130,246,0.08)",
      imgBorder: "border-[#3B82F6]/12",
      tagBorder: "border-[#3B82F6]/15 text-[#3B82F6]",
    },
    {
      // Red (Ruby)
      badgeBorder: "border-[#EF4444]/25",
      badgeBg: "bg-[#EF4444]/5",
      textPrimary: "text-[#EF4444]",
      textSecondary: "text-[#FCA5A5]",
      borderLeft: "border-[#EF4444]/30",
      bgPrimary: "bg-[#EF4444]",
      bgPrimaryHover: "hover:bg-[#F87171]",
      btnText: "text-white",
      btnShadow: "hover:shadow-[#EF4444]/20",
      borderBtnSec: "border-[#EF4444]/20 hover:border-[#EF4444]/60",
      activeThumbBorder: "border-[#EF4444] shadow-[0_0_12px_rgba(239,68,68,0.35)]",
      thumbHoverBorder: "hover:border-[#EF4444]/40",
      bgGlow: "rgba(239,68,68,0.08)",
      imgBorder: "border-[#EF4444]/12",
      tagBorder: "border-[#EF4444]/15 text-[#EF4444]",
    },
    {
      // Gold/Yellow (Default)
      badgeBorder: "border-[#C9A84C]/25",
      badgeBg: "bg-[#C9A84C]/5",
      textPrimary: "text-[#C9A84C]",
      textSecondary: "text-[#E8D5A0]",
      borderLeft: "border-[#C9A84C]/30",
      bgPrimary: "bg-[#C9A84C]",
      bgPrimaryHover: "hover:bg-[#E8D5A0]",
      btnText: "text-[#0E0C0A]",
      btnShadow: "hover:shadow-[#C9A84C]/20",
      borderBtnSec: "border-[#C9A84C]/20 hover:border-[#C9A84C]/60",
      activeThumbBorder: "border-[#C9A84C] shadow-[0_0_12px_rgba(201,168,76,0.35)]",
      thumbHoverBorder: "hover:border-[#C9A84C]/40",
      bgGlow: "rgba(201,168,76,0.08)",
      imgBorder: "border-[#C9A84C]/12",
      tagBorder: "border-[#C9A84C]/15 text-[#C9A84C]",
    },
  ];

  const activeTheme = HERO_THEMES[heroActiveIdx] || HERO_THEMES[3];

  const handleHeroInquiry = () => {
    const msg = `Hi Vees Star! I am interested in inquiring about the Signature Edition: ${activeRing.title} (${activeRing.tag}) priced at ${activeRing.price}.`;
    window.open(`https://api.whatsapp.com/send?phone=919383007477&text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div className="w-full bg-[#0E0C0A] text-[#FAF7F2] overflow-hidden">
      
      {/* ── INTERACTIVE LUXURY SOLITAIRE HERO ── */}
      <div className="w-full bg-[#0E0C0A] text-[#FAF7F2] font-sans relative overflow-hidden select-none pt-[190px] pb-12 px-6 md:px-12 border-b border-[#C9A84C]/10">
        
        {/* Decorative Golden Ambient Glows */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#C9A84C]/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 right-[10%] w-[400px] h-[400px] bg-[#C9A84C]/3 rounded-full blur-[120px] pointer-events-none" />

        {/* Hero Content Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 py-10">
          
          {/* Left Side: Large Dynamic Product/Model Showcase */}
          <div className="lg:col-span-6 flex justify-center items-center relative">
            {/* Dynamic themed backdrop glow for ring */}
            <div 
              className="absolute inset-0 pointer-events-none transition-all duration-500"
              style={{
                background: `radial-gradient(circle at center, ${activeTheme.bgGlow} 0%, transparent 65%)`
              }}
            />
            
            <div className={`w-full md:w-[480px] h-[480px] rounded-3xl bg-[#0A0806] flex items-center justify-center relative overflow-hidden group shadow-[0_20px_50px_rgba(0,0,0,0.6)] transition-all duration-500 ${activeTheme.imgBorder}`}>
              <AnimatePresence mode="wait">
                <motion.img 
                  key={heroActiveIdx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.45 }}
                  src={encodeURI(activeRing.modelImage)}
                  alt={activeRing.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </AnimatePresence>
              
              {/* Image Type Tag Indicator */}
              <div className={`absolute bottom-5 left-5 px-3.5 py-1.5 rounded-lg bg-[#0E0C0A]/80 border backdrop-blur-md text-[9px] uppercase tracking-widest font-bold transition-all duration-500 ${activeTheme.tagBorder}`}>
                Signature Design
              </div>
            </div>
          </div>
          
          {/* Right Side: Copywriting, Dynamic Specs and Interactive Slider */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left space-y-7 lg:pl-6">
            
            {/* Brand Header */}
            <div className="space-y-3.5">
              <div className={`inline-flex items-center space-x-2 px-3 py-1.5 rounded-full border text-[9.5px] tracking-widest uppercase font-semibold transition-all duration-500 ${activeTheme.badgeBorder} ${activeTheme.badgeBg} ${activeTheme.textPrimary}`}>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Signature Collections</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#FAF7F2] leading-[1.15] tracking-wide">
                The Solitaire <span className={`font-display italic block sm:inline transition-colors duration-500 ${activeTheme.textPrimary}`}>Signature Editions</span>
              </h1>
            </div>
            
            {/* Dynamic Interactive Product Specifications */}
            <div className={`space-y-4 border-l-2 pl-5 py-1 transition-all duration-500 ${activeTheme.borderLeft}`}>
              <span className={`text-[10px] uppercase tracking-[0.25em] font-bold block transition-all duration-500 ${activeTheme.textPrimary}`}>{activeRing.tag}</span>
              <h2 className="text-2xl font-semibold text-[#FAF7F2] tracking-wide">{activeRing.title}</h2>
              <p className="text-sm text-[#C4BAB0] font-light leading-relaxed max-w-lg">{activeRing.desc}</p>
              
              <div className="flex items-end space-x-6 pt-2">
                <div>
                  <span className="text-[8px] uppercase tracking-widest text-[#7A6E66] font-bold block">Base Price</span>
                  <span className={`text-xl font-bold transition-colors duration-500 ${activeTheme.textSecondary}`}>{activeRing.price}</span>
                </div>
              </div>
            </div>
            
            {/* Interactive Control & CTA */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button 
                onClick={handleHeroInquiry}
                className={`px-8 py-3.5 text-[11px] tracking-widest uppercase font-extrabold rounded-xl transition-all shadow-lg cursor-pointer border-0 duration-500 ${activeTheme.bgPrimary} ${activeTheme.bgPrimaryHover} ${activeTheme.btnText} ${activeTheme.btnShadow}`}
              >
                Inquire via WhatsApp
              </button>
              
              <Link 
                href="/custom-build" 
                className={`px-6 py-3.5 border text-[#C4BAB0] hover:text-[#FAF7F2] text-[11px] tracking-widest uppercase font-bold rounded-xl transition-all duration-500 ${activeTheme.borderBtnSec}`}
              >
                Configure Custom Build
              </Link>
            </div>
            
            {/* Interactive Thumbnail Carousel (4 Products) */}
            <div className="space-y-3 pt-4">
              <span className="text-[9px] uppercase tracking-[0.2em] text-[#7A6E66] font-bold block">Switch Showcase Design</span>
              <div className="flex items-center space-x-3.5">
                {collections.map((ring, idx) => {
                  const ringTheme = HERO_THEMES[idx] || HERO_THEMES[3];
                  return (
                    <div 
                      key={ring.id}
                      onClick={() => setHeroActiveIdx(idx)}
                      className={`w-[84px] h-[84px] rounded-xl overflow-hidden border bg-[#0A0806] flex items-center justify-center p-1 transition-all cursor-pointer ${
                        heroActiveIdx === idx 
                          ? `${ringTheme.activeThumbBorder} scale-[1.05]` 
                          : `border-[#C9A84C]/15 opacity-65 hover:opacity-100 ${ringTheme.thumbHoverBorder}`
                      }`}
                      title={ring.title}
                    >
                      <img 
                        src={encodeURI(ring.modelImage)} 
                        alt={ring.title} 
                        className="w-full h-full object-cover rounded-lg animate-fade-in" 
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            
          </div>
          
        </div>
      </div>

      {/* Main Solitaire Content */}
      <div className="relative min-h-screen bg-[#0E0C0A] text-[#FAF7F2] pt-20 pb-16 px-6 md:px-12 overflow-hidden">
      <div className="absolute top-0 left-0 w-[600px] h-[400px] bg-[#C9A84C]/4 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#C9A84C]/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#C9A84C]/10 pb-8 text-left gap-6"
        >
          <div className="space-y-4">
            <div className="badge-gold">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A84C]" />
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#C9A84C] font-bold">Signature Collections</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-light text-[#FAF7F2] leading-tight">
              The Solitaire <span className="font-display italic gold-gradient-text">Signature Editions</span>
            </h1>
          </div>
          <div className="text-[#C4BAB0] font-light text-sm max-w-md leading-relaxed space-y-3">
            <p>A diamond solitaire refers to any piece of jewellery with a single diamond. Diamond solitaires can be a ring, necklace, earrings, or even men's jewellery.</p>
            <p>Explore curated GIA-certified diamond creations showcasing structural symmetry and traditional gold cast alloys.</p>
          </div>
        </motion.div>


        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {collections.map((ring, idx) => (
            <motion.div
              key={ring.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: idx * 0.1, duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
              className="shimmer-card glass-panel luxury-shadow-hover rounded-3xl p-8 flex flex-col sm:flex-row items-center gap-8 border border-[#C9A84C]/8 hover:border-[#C9A84C]/25 transition-all duration-500 relative group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#C9A84C]/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <div className="w-full sm:w-[200px] h-[200px] rounded-2xl bg-[#0A0806] border border-[#C9A84C]/10 flex items-center justify-center shrink-0 relative overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={`${ring.id}-${imageType}`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                    src={encodeURI(imageType === "product" ? ring.productImage : ring.modelImage)}
                    alt={ring.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </AnimatePresence>
              </div>
              <div className="flex-1 text-left flex flex-col justify-between h-full space-y-5 relative z-10">
                <div className="space-y-2.5">
                  <span className="text-[9px] uppercase tracking-widest text-[#C9A84C] font-bold block">{ring.tag}</span>
                  <h3 className="text-xl font-semibold text-[#FAF7F2] tracking-wide">{ring.title}</h3>
                  <p className="text-sm text-[#C4BAB0] font-light leading-relaxed">{ring.desc}</p>
                </div>
                <div className="flex items-center justify-between border-t border-[#C9A84C]/10 pt-4">
                  <div>
                    <span className="text-[8px] uppercase tracking-widest text-[#7A6E66] font-bold block">Base Price</span>
                    <span className="text-lg font-bold text-[#E8D5A0]">{ring.price}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button onClick={() => handleInquiry(ring)} className="px-4 py-2.5 bg-[#C9A84C] hover:bg-[#E8D5A0] text-[#0E0C0A] text-[10px] tracking-wider uppercase font-bold rounded-lg transition-all cursor-pointer">
                      Inquire
                    </button>
                    <Link href={`/custom-build?cut=${ring.cut}&metal=${ring.metal}`} className="p-2.5 rounded-lg border border-[#C9A84C]/15 hover:border-[#C9A84C]/40 text-[#7A6E66] hover:text-[#C9A84C] transition-all" title="Configure Live">
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="shimmer-card glass-panel luxury-shadow p-8 rounded-3xl border border-[#C9A84C]/12 flex flex-col md:flex-row items-center justify-between text-left gap-6 max-w-4xl mx-auto"
        >
          <div className="space-y-2">
            <h4 className="text-lg font-light text-[#FAF7F2]">Looking for custom carat weight?</h4>
            <p className="text-sm text-[#C4BAB0] font-light leading-relaxed">Every signature design can be customized to support weights up to 15.0 carats. Access our 3D custom configurator to select GIA criteria.</p>
          </div>
          <Link href="/custom-build" className="px-6 py-3 bg-[#C9A84C] hover:bg-[#E8D5A0] text-[#0E0C0A] text-xs tracking-wider uppercase font-bold rounded-xl transition-all cursor-pointer inline-flex items-center space-x-2 shrink-0">
            <span>Launch Configurator</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>
      </div>
    </div>
  </div>
  );
}
