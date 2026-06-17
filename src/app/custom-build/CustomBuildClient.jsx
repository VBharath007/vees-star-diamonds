"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ShieldCheck, Volume2, VolumeX, Phone, Check } from "lucide-react";
import dynamic from "next/dynamic";

const CustomBuildHero = dynamic(() => import("../../components/CustomBuildHero"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen bg-[#0E0C0A] flex flex-col items-center justify-center text-[#FAF7F2]">
      <div className="w-10 h-10 border border-[#C9A84C] border-t-transparent rounded-full animate-spin mb-4" />
      <span className="text-[10px] tracking-[0.25em] text-[#C9A84C]/50 uppercase font-bold">
        Loading Blueprint System...
      </span>
    </div>
  )
});

// ─── DATA FOR CUSTOM CONFIG GALLERY ──────────────────────────────────────────

const CONFIG_MEDIA = [
  {
    id: "round-classic",
    title: "Classic Round Brilliant Solitaire",
    type: "video",
    src: "/custom config/1  (6).mp4",
    category: "Rings",
    carats: "1.50 ct",
    metal: "18K Yellow Gold",
    description: "The timeless six-prong classic round brilliant solitaire. A perfect balance of fire, brilliance, and scintillation."
  },
  {
    id: "hidden-halo",
    title: "Luminous Hidden Halo Solitaire",
    type: "video",
    src: "/custom config/1  (12).mp4",
    category: "Rings",
    carats: "2.00 ct",
    metal: "18K Rose Gold",
    description: "A brilliant cut solitaire with a delicate collar of diamonds set just beneath the main stone, visible only from the profile view."
  },
  {
    id: "princess-pave",
    title: "Princess Cut Pavé Solitaire",
    type: "video",
    src: "/custom config/1  (14).mp4",
    category: "Rings",
    carats: "1.75 ct",
    metal: "Platinum PT950",
    description: "Modern princess cut diamond set on a sparkling micro-pavé band, capturing light from every possible angle."
  },
  {
    id: "vintage-cushion",
    title: "Vintage Cushion Solitaire",
    type: "video",
    src: "/custom config/1  (25).mp4",
    category: "Rings",
    carats: "2.10 ct",
    metal: "18K Yellow Gold",
    description: "Soft, rounded pillow-cut diamond in a custom claw setting, blending historic charm with modern faceting techniques."
  },
  {
    id: "double-band-halo",
    title: "Double Band Halo Statement",
    type: "video",
    src: "/custom config/1  (27).mp4",
    category: "Rings",
    carats: "3.00 ct total",
    metal: "18K White Gold",
    description: "An opulent design featuring a split shank double band, adorned with micro-diamonds and crowned by a pavé halo."
  },
  {
    id: "radiant-platinum",
    title: "Radiant Cut Classic Solitaire",
    type: "video",
    src: "/custom config/1  (46).mp4",
    category: "Rings",
    carats: "2.30 ct",
    metal: "Platinum PT950",
    description: "A rectangular radiant-cut diamond combining the elegance of the emerald shape with the brilliant faceting of a round cut."
  },
  {
    id: "lotus-setting",
    title: "Chettinad Lotus Setting",
    type: "video",
    src: "/custom config/POS0009.mp4",
    category: "Rings",
    carats: "1.60 ct",
    metal: "18K Champagne Gold",
    description: "Inspired by ancient Dravidian temple carvings, the basket is hand-carved in a sacred blooming lotus geometry."
  },
  {
    id: "pear-imperial",
    title: "Imperial Pear Drop Solitaire",
    type: "video",
    src: "/custom config/POS0012.mp4",
    category: "Rings",
    carats: "2.05 ct",
    metal: "18K Rose Gold",
    description: "Elegant pear-shaped diamond that visually elongates the finger, set in an ultra-slim, high-polish wire basket."
  },
  {
    id: "knife-edge-band",
    title: "Knife-Edge Solitaire Band",
    type: "video",
    src: "/custom config/POS0015.mp4",
    category: "Rings",
    carats: "1.90 ct",
    metal: "Platinum PT950",
    description: "Sleek knife-edge band design that reflects light in two directions, drawing all focus to the elevated diamond crown."
  },
  {
    id: "crown-setting",
    title: "Bespoke Crown Setting",
    type: "video",
    src: "/custom config/POS0015_1.mp4",
    category: "Rings",
    carats: "2.40 ct",
    metal: "18K Yellow Gold",
    description: "A magnificent crown-inspired mounting with 8 delicate prongs, offering ultimate security and a regal side-profile silhouette."
  },
  {
    id: "marquise-halo",
    title: "Majestic Marquise Solitaire",
    type: "video",
    src: "/custom config/POS0016.mp4",
    category: "Rings",
    carats: "1.70 ct",
    metal: "18K White Gold",
    description: "Stately marquise-cut diamond with pointed ends, optimized for maximum face-up area and unparalleled presence."
  },
  {
    id: "eternity-prong",
    title: "Prong-Set Eternity Band",
    type: "video",
    src: "/custom config/1  (7).mp4",
    category: "Bands",
    carats: "2.50 ct total",
    metal: "18K White Gold",
    description: "A continuous flow of meticulously matched round brilliant diamonds, each secured in a low-profile prong setting."
  },
  {
    id: "oval-halo",
    title: "Signature Oval Halo Solitaire",
    type: "image",
    src: "/custom config/1  (1).webp",
    category: "Rings",
    carats: "1.80 ct",
    metal: "18K White Gold",
    description: "An exquisite oval-cut solitaire framed by a brilliant pavé halo, designed to maximize sparkle and presence."
  },
  {
    id: "emerald-bespoke",
    title: "Bespoke Emerald Cut Solitaire",
    type: "image",
    src: "/custom config/POS0015.webp",
    category: "Rings",
    carats: "2.20 ct",
    metal: "Platinum PT950",
    description: "Classic step-cut emerald diamond featuring long, linear facets for a hall-of-mirrors effect, nestled in a secure cathedral setting."
  }
];

export default function CustomBuildClient() {
  const [selectedMedia, setSelectedMedia] = useState(CONFIG_MEDIA[0]);
  const [isMuted, setIsMuted] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(err => {
        console.warn("Video play interrupted or blocked by browser:", err);
      });
    }
  }, [selectedMedia]);

  const filteredMedia = CONFIG_MEDIA.filter(item => {
    if (activeCategory === "All") return true;
    return item.category === activeCategory;
  });

  const handleWhatsAppInquiry = (item) => {
    const msg = `Hi Vees Star Diamonds! I am interested in commission details for this custom design configuration:
• Design: ${item.title}
• Metal: ${item.metal}
• Est. Carats: ${item.carats}
• Category: ${item.category}

Could you please share the design blueprint or pricing estimates?`;
    window.open(`https://api.whatsapp.com/send?phone=919383007477&text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div className="relative min-h-screen bg-[#0E0C0A] text-[#FAF7F2]">
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
          border-radius: 9999px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(201, 168, 76, 0.3);
          border-radius: 9999px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(201, 168, 76, 0.6);
        }
      `}} />
      {/* 3D Hero Section */}
      <CustomBuildHero />

      {/* ── PROCESS INTRO ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="pt-28 pb-8 px-6 md:px-12 max-w-4xl mx-auto text-center space-y-8 relative z-10"
      >
        <div className="badge-gold w-fit mx-auto">
          <Sparkles className="w-3.5 h-3.5 text-[#C9A84C]" />
          <span className="text-[10px] tracking-[0.2em] uppercase text-[#C9A84C] font-bold">
            The VSDJ custom jewellery process
          </span>
        </div>
        <h2 className="text-3xl md:text-5xl font-light text-[#FAF7F2] leading-tight">
          Commission a <span className="font-display italic gold-gradient-text">Master Craftsman</span>
        </h2>
        <div className="space-y-6 text-[#C4BAB0] font-light text-base md:text-lg leading-relaxed">
          <p>
            When you come into Vees Star Diamonds and Jewellery, you're not just ordering a piece of jewellery. 
            You're commissioning a master craftsman to create a singular work of art.
          </p>
          <p>
            Because our customers are buying directly from the people who make the jewellery, prices are about 
            half of what you'd pay in traditional jewellery stores.
          </p>
        </div>
        <p className="text-[#C9A84C] font-display italic text-2xl pt-4 drop-shadow-md">
          Inspired by you. Designed by us.
        </p>
      </motion.div>

      {/* ── CUSTOM CONFIG SHOWCASE GALLERY ── */}
      <div id="configurator-start" className="py-24 px-6 md:px-12 max-w-7xl mx-auto space-y-16 scroll-mt-6 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="text-center space-y-4 max-w-3xl mx-auto"
        >
          <div className="badge-gold w-fit mx-auto">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A84C]" />
            <span className="text-[10px] tracking-[0.22em] uppercase text-[#C9A84C] font-bold">Bespoke Workshop</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-light text-[#FAF7F2] leading-tight">
            Exquisite <span className="font-display italic gold-gradient-text">Custom Configurations</span>
          </h2>
          <p className="text-[#C4BAB0] font-light text-sm max-w-2xl mx-auto leading-relaxed">
            Explore live renders of custom-crafted solitaire rings and bands designed by Vees Star. 
            Select any configuration to view its rotating 3D video profile and request a blueprint estimate.
          </p>

          {/* Category Filters */}
          <div className="flex items-center justify-center gap-3 pt-6">
            {["All", "Rings", "Bands"].map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  // Default to first item of new category
                  const firstOfCat = CONFIG_MEDIA.find(i => cat === "All" || i.category === cat);
                  if (firstOfCat) setSelectedMedia(firstOfCat);
                }}
                className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-[#C9A84C] text-[#0E0C0A] shadow-[0_0_15px_rgba(201,168,76,0.3)] border border-transparent"
                    : "bg-transparent text-[#C4BAB0] border border-[#C9A84C]/20 hover:border-[#C9A84C]/50"
                }`}
              >
                {cat} {cat === "All" ? "Collection" : ""}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Interactive Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Active Media Player */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 bg-[#0A0806] rounded-3xl border border-[#C9A84C]/10 relative overflow-hidden flex flex-col p-5 shadow-2xl"
          >
            {/* Top gold lines */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/20 to-transparent" />

            {/* Active Specs Header */}
            <div className="flex justify-between items-center relative z-10 shrink-0 mb-3 px-1">
              <span className="text-[9px] font-bold text-[#C9A84C] uppercase tracking-[0.15em]">
                Live Showcase
              </span>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider bg-[#C9A84C]/10 border border-[#C9A84C]/30 text-[#C9A84C]">
                  {selectedMedia.metal}
                </span>
                <span className="px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider bg-white/5 border border-white/10 text-white">
                  {selectedMedia.carats}
                </span>
              </div>
            </div>

            {/* Media Player viewport */}
            <div className="relative rounded-2xl overflow-hidden bg-black/50 aspect-square flex items-center justify-center" style={{ minHeight: 400 }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedMedia.id}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.35 }}
                  className="absolute inset-0 w-full h-full"
                >
                  {selectedMedia.type === "video" ? (
                    <div className="w-full h-full relative">
                      <video
                        ref={videoRef}
                        src={selectedMedia.src}
                        autoPlay
                        loop
                        muted={isMuted}
                        playsInline
                        preload="auto"
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Audio Toggle control overlay */}
                      <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="absolute bottom-4 right-4 z-20 p-2.5 bg-black/70 hover:bg-[#C9A84C] hover:text-[#0E0C0A] border border-white/10 rounded-full transition-all duration-300 text-white shadow-lg"
                        title={isMuted ? "Unmute Showcase Audio" : "Mute Showcase Audio"}
                      >
                        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </button>
                    </div>
                  ) : (
                    <img
                      src={selectedMedia.src}
                      alt={selectedMedia.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                  
                  {/* Subtle vignette overlays */}
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom info description and WhatsApp CTA */}
            <div className="mt-5 p-5 rounded-2xl bg-[#0E0C0A]/80 border border-white/5 relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
              <div className="space-y-1.5 flex-1 text-left">
                <span className="text-[9px] font-bold text-[#C9A84C] tracking-[0.2em] uppercase block">
                  {selectedMedia.category} · Spec Detail
                </span>
                <h3 className="text-xl font-semibold text-[#FAF7F2]">
                  {selectedMedia.title}
                </h3>
                <p className="text-xs text-[#C4BAB0] font-light leading-relaxed max-w-xl">
                  {selectedMedia.description}
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleWhatsAppInquiry(selectedMedia)}
                className="px-5 py-3.5 bg-[#C9A84C] hover:bg-[#E8D5A0] text-[#0E0C0A] font-extrabold uppercase tracking-widest rounded-xl transition-all duration-300 cursor-pointer shadow-lg flex items-center justify-center gap-2 text-[10px] shrink-0"
              >
                <Phone className="w-3.5 h-3.5 fill-[#0E0C0A]" />
                Inquire Blueprint
              </motion.button>
            </div>

          </motion.div>

          {/* RIGHT: Scrollable Thumbnail Grid */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 flex flex-col glass-panel border border-[#C9A84C]/12 p-6 rounded-3xl text-left h-full max-h-[820px]"
          >
            <span className="text-[10px] font-bold text-[#C9A84C] uppercase tracking-[0.2em] mb-4 block">
              Configured Settings ({filteredMedia.length})
            </span>

            {/* Scrollable list container */}
            <div className="flex flex-col gap-3.5 overflow-y-auto pr-1 custom-scrollbar max-h-[700px]">
              {filteredMedia.map((item) => {
                const isActive = item.id === selectedMedia.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedMedia(item)}
                    className={`group flex items-center gap-4 p-3 rounded-2xl border transition-all duration-300 cursor-pointer relative overflow-hidden ${
                      isActive
                        ? "bg-[#C9A84C]/8 border-[#C9A84C]/40 shadow-lg"
                        : "bg-black/20 border-white/5 hover:border-[#C9A84C]/25 hover:bg-white/5"
                    }`}
                  >
                    {/* Left Thumbnail icon/image */}
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-black/40 border border-white/10 shrink-0 relative flex items-center justify-center">
                      {item.type === "video" ? (
                        <>
                          <video
                            src={item.src}
                            muted
                            playsInline
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <div className="w-6 h-6 rounded-full bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
                            </div>
                          </div>
                        </>
                      ) : (
                        <img
                          src={item.src}
                          alt={item.title}
                          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                        />
                      )}
                    </div>

                    {/* Middle Text Details */}
                    <div className="flex-1 min-w-0 text-left">
                      <span className="text-[8px] font-bold text-[#C9A84C]/80 uppercase tracking-widest block mb-0.5">
                        {item.category} · {item.carats}
                      </span>
                      <h4 className="text-sm font-semibold text-white truncate group-hover:text-[#C9A84C] transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-[10px] text-[#C4BAB0] truncate font-light">
                        {item.metal}
                      </p>
                    </div>

                    {/* Active Check Indicator */}
                    {isActive && (
                      <div className="w-5 h-5 rounded-full bg-[#C9A84C] text-[#0E0C0A] flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </motion.div>

        </div>

        {/* GIA Disclaimer Bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="shimmer-card glass-panel p-6 rounded-2xl border border-[#C9A84C]/10 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto luxury-shadow"
        >
          <div className="flex items-start space-x-3 text-left">
            <ShieldCheck className="w-5 h-5 text-[#C9A84C] shrink-0 mt-0.5" />
            <p className="text-sm font-light leading-relaxed text-[#C4BAB0]">
              Every order undergoes micro-prong burnishing and includes an official GIA grading certificate verifying color, cut, and clarity specifications.
            </p>
          </div>
          <Link
            href="/about#7cs"
            className="text-xs text-[#C9A84C] uppercase font-bold tracking-wider hover:text-[#E8D5A0] shrink-0 transition-all duration-300"
          >
            Learn 7 C's Standards
          </Link>
        </motion.div>

      </div>
    </div>
  );
}
