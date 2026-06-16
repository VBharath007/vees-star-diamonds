"use client";
import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ShieldCheck, Check } from "lucide-react";
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

// ─── DATA ────────────────────────────────────────────────────────────────────

const CUTS = [
  { key: "round",    label: "Round",    sub: "Brilliant" },
  { key: "princess", label: "Princess", sub: "Square"    },
  { key: "emerald",  label: "Emerald",  sub: "Step"      },
  { key: "pear",     label: "Pear",     sub: "Drop"      },
];

const METALS = [
  {
    key: "platinum", label: "Platinum",  sub: "PT950",
    gradient: "linear-gradient(135deg,#F4F4F4 0%,#C8C8C8 40%,#EBEBEB 65%,#A8A8A8 100%)",
    glow: "rgba(200,200,200,0.55)",
  },
  {
    key: "gold",     label: "18K Gold",  sub: "Champagne",
    gradient: "linear-gradient(135deg,#C9A84C 0%,#F0D882 40%,#C9A84C 65%,#8B6914 100%)",
    glow: "rgba(201,168,76,0.55)",
  },
  {
    key: "rose_gold",label: "Rose Gold", sub: "18K Pink",
    gradient: "linear-gradient(135deg,#D4937F 0%,#F2C4B2 40%,#C8806A 65%,#9A4A38 100%)",
    glow: "rgba(212,147,127,0.55)",
  },
];

const PRODUCTS = [
  { key: "ring",     label: "Bespoke Ring",     image: "/custom_ring.png",     basePrice: 5500 },
  { key: "earrings", label: "Bespoke Earrings", image: "/custom_earrings.png", basePrice: 4200 },
  { key: "necklace", label: "Bespoke Necklace", image: "/custom_necklace.png", basePrice: 8500 },
];

// ── Full 12-image map: key = `${cut}_${metal}` ────────────────────────────
// Ring  : public/rings/1.png … 12.png  (4 cuts × 3 metals, real photos)
// Necklace: 12 frames evenly spaced from public/neckless/ (real photos)
// Earrings: no folder yet → falls back to CSS-filtered base image
const PRODUCT_COMBO_IMAGES = {
  ring: {
    round_platinum:     "/rings/1.png",
    round_gold:         "/rings/2.png",
    round_rose_gold:    "/rings/3.png",
    princess_platinum:  "/rings/4.png",
    princess_gold:      "/rings/5.png",
    princess_rose_gold: "/rings/6.png",
    emerald_platinum:   "/rings/7.png",
    emerald_gold:       "/rings/8.png",
    emerald_rose_gold:  "/rings/9.png",
    pear_platinum:      "/rings/10.png",
    pear_gold:          "/rings/11.png",
    pear_rose_gold:     "/rings/12.png",
  },
  necklace: {
    round_platinum:     "/necklace/1.jpg",
    round_gold:         "/necklace/2.jpg",
    round_rose_gold:    "/necklace/3.jpg",
    princess_platinum:  "/necklace/4.jpg",
    princess_gold:      "/necklace/5.jpg",
    princess_rose_gold: "/necklace/6.jpg",
    emerald_platinum:   "/necklace/7.jpg",
    emerald_gold:       "/necklace/8.jpg",
    emerald_rose_gold:  "/necklace/9.jpg",
    pear_platinum:      "/necklace/10.jpg",
    pear_gold:          "/necklace/11.jpg",
    pear_rose_gold:     "/necklace/12.jpg",
  },
  earrings: {
    round_platinum:     "/earing/1.png",
    round_gold:         "/earing/2.png",
    round_rose_gold:    "/earing/3.png",
    princess_platinum:  "/earing/4.png",
    princess_gold:      "/earing/5.png",
    princess_rose_gold: "/earing/6.png",
    emerald_platinum:   "/earing/7.png",
    emerald_gold:       "/earing/8.png",
    emerald_rose_gold:  "/earing/9.png",
    pear_platinum:      "/earing/10.png",
    pear_gold:          "/earing/11.png",
    pear_rose_gold:     "/earing/12.png",
  },
};

// CSS metal tint — only applied for earrings (no per-combo photos yet)
// Ring and necklace use real photos so no filter is needed
const METAL_CSS_FILTER = {
  platinum: "brightness(1.18) saturate(0.55) contrast(1.1)",
  gold:     "sepia(50%) saturate(230%) brightness(1.06)",
  rose_gold:"sepia(25%) saturate(170%) hue-rotate(328deg) brightness(1.1)",
};


// ─── SVG CUT ICONS ───────────────────────────────────────────────────────────

function RoundIcon({ active }) {
  const c  = active ? "#C9A84C" : "#3A3430";
  const c2 = active ? "#E8D5A0" : "#2A2420";
  const f  = active ? "rgba(201,168,76,0.18)" : "rgba(255,255,255,0.02)";
  const sw = active ? 2 : 1.2;
  return (
    <svg viewBox="0 0 44 44" fill="none" className="w-10 h-10">
      <circle cx="22" cy="22" r="17" stroke={c}  strokeWidth={sw} fill={f} />
      <circle cx="22" cy="22" r="8"  stroke={c2} strokeWidth="0.9" />
      {[0,45,90,135,180,225,270,315].map((deg) => {
        const rad = Math.PI / 180 * deg;
        return <line key={deg}
          x1={22 + Math.cos(rad)*8}  y1={22 + Math.sin(rad)*8}
          x2={22 + Math.cos(rad)*17} y2={22 + Math.sin(rad)*17}
          stroke={c2} strokeWidth="0.8" />;
      })}
    </svg>
  );
}

function PrincessIcon({ active }) {
  const c  = active ? "#C9A84C" : "#3A3430";
  const c2 = active ? "#E8D5A0" : "#2A2420";
  const f  = active ? "rgba(201,168,76,0.18)" : "rgba(255,255,255,0.02)";
  const sw = active ? 2 : 1.2;
  return (
    <svg viewBox="0 0 44 44" fill="none" className="w-10 h-10">
      <rect x="7" y="7" width="30" height="30" stroke={c}  strokeWidth={sw} fill={f} />
      <rect x="13" y="13" width="18" height="18" stroke={c2} strokeWidth="0.9" />
      <line x1="7"  y1="7"  x2="13" y2="13" stroke={c2} strokeWidth="0.8" />
      <line x1="37" y1="7"  x2="31" y2="13" stroke={c2} strokeWidth="0.8" />
      <line x1="7"  y1="37" x2="13" y2="31" stroke={c2} strokeWidth="0.8" />
      <line x1="37" y1="37" x2="31" y2="31" stroke={c2} strokeWidth="0.8" />
      <line x1="22" y1="7"  x2="22" y2="37" stroke={c2} strokeWidth="0.8" />
      <line x1="7"  y1="22" x2="37" y2="22" stroke={c2} strokeWidth="0.8" />
    </svg>
  );
}

function EmeraldIcon({ active }) {
  const c  = active ? "#C9A84C" : "#3A3430";
  const c2 = active ? "#E8D5A0" : "#2A2420";
  const f  = active ? "rgba(201,168,76,0.18)" : "rgba(255,255,255,0.02)";
  const sw = active ? 2 : 1.2;
  return (
    <svg viewBox="0 0 44 44" fill="none" className="w-10 h-10">
      <path d="M10 8 L34 8 L38 14 L38 30 L34 36 L10 36 L6 30 L6 14 Z" stroke={c}  strokeWidth={sw} fill={f} />
      <path d="M14 13 L30 13 L33 17 L33 27 L30 31 L14 31 L11 27 L11 17 Z" stroke={c2} strokeWidth="0.9" />
      <line x1="6"  y1="16" x2="38" y2="16" stroke={c2} strokeWidth="0.8" />
      <line x1="6"  y1="28" x2="38" y2="28" stroke={c2} strokeWidth="0.8" />
      <line x1="22" y1="8"  x2="22" y2="36" stroke={c2} strokeWidth="0.8" />
    </svg>
  );
}

function PearIcon({ active }) {
  const c  = active ? "#C9A84C" : "#3A3430";
  const c2 = active ? "#E8D5A0" : "#2A2420";
  const f  = active ? "rgba(201,168,76,0.18)" : "rgba(255,255,255,0.02)";
  const sw = active ? 2 : 1.2;
  return (
    <svg viewBox="0 0 44 44" fill="none" className="w-10 h-10">
      <path d="M22 38 C22 38 7 28 7 17 C7 10 13.5 5 22 5 C30.5 5 37 10 37 17 C37 28 22 38 22 38 Z" stroke={c}  strokeWidth={sw} fill={f} />
      <ellipse cx="22" cy="14" rx="7" ry="5" stroke={c2} strokeWidth="0.9" />
      <line x1="22" y1="5"  x2="22" y2="38" stroke={c2} strokeWidth="0.8" />
      <line x1="9"  y1="19" x2="35" y2="19" stroke={c2} strokeWidth="0.8" />
      <line x1="11" y1="25" x2="33" y2="25" stroke={c2} strokeWidth="0.8" />
    </svg>
  );
}

const CUT_ICON_MAP = {
  round: RoundIcon, princess: PrincessIcon,
  emerald: EmeraldIcon, pear: PearIcon,
};

// Small icon variant (for thumbnails)
function CutIconSmall({ cut, active }) {
  const c = active ? "#C9A84C" : "rgba(255,255,255,0.7)";
  const iconSize = "w-7 h-7";
  const sw = 1.8;
  if (cut === "round")
    return (
      <svg viewBox="0 0 44 44" fill="none" className={iconSize}>
        <circle cx="22" cy="22" r="17" stroke={c} strokeWidth={sw} fill="none" />
        <circle cx="22" cy="22" r="8" stroke={c} strokeWidth="1" opacity="0.7" />
        {[0,45,90,135,180,225,270,315].map(deg => {
          const r = Math.PI/180*deg;
          return <line key={deg} x1={22+Math.cos(r)*8} y1={22+Math.sin(r)*8} x2={22+Math.cos(r)*17} y2={22+Math.sin(r)*17} stroke={c} strokeWidth="0.9" opacity="0.7" />;
        })}
      </svg>
    );
  if (cut === "princess")
    return (
      <svg viewBox="0 0 44 44" fill="none" className={iconSize}>
        <rect x="7" y="7" width="30" height="30" stroke={c} strokeWidth={sw} fill="none" />
        <line x1="22" y1="7" x2="22" y2="37" stroke={c} strokeWidth="0.9" opacity="0.7" />
        <line x1="7" y1="22" x2="37" y2="22" stroke={c} strokeWidth="0.9" opacity="0.7" />
        <line x1="7" y1="7" x2="37" y2="37" stroke={c} strokeWidth="0.7" opacity="0.6" />
        <line x1="37" y1="7" x2="7" y2="37" stroke={c} strokeWidth="0.7" opacity="0.6" />
      </svg>
    );
  if (cut === "emerald")
    return (
      <svg viewBox="0 0 44 44" fill="none" className={iconSize}>
        <path d="M10 8 L34 8 L38 14 L38 30 L34 36 L10 36 L6 30 L6 14 Z" stroke={c} strokeWidth={sw} fill="none" />
        <line x1="6" y1="16" x2="38" y2="16" stroke={c} strokeWidth="0.9" opacity="0.7" />
        <line x1="6" y1="28" x2="38" y2="28" stroke={c} strokeWidth="0.9" opacity="0.7" />
      </svg>
    );
  // pear
  return (
    <svg viewBox="0 0 44 44" fill="none" className={iconSize}>
      <path d="M22 38 C22 38 7 28 7 17 C7 10 13.5 5 22 5 C30.5 5 37 10 37 17 C37 28 22 38 22 38 Z" stroke={c} strokeWidth={sw} fill="none" />
      <line x1="22" y1="5" x2="22" y2="38" stroke={c} strokeWidth="0.9" opacity="0.7" />
    </svg>
  );
}

// ─── CARAT STOPS ─────────────────────────────────────────────────────────────
const CARAT_STOPS = [
  { ct: 0.5, sz: 7 }, { ct: 1.0, sz: 10 }, { ct: 1.5, sz: 13 },
  { ct: 2.5, sz: 16 }, { ct: 3.5, sz: 20 }, { ct: 5.0, sz: 24 },
];

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export default function CustomBuildClient() {
  const [activeProduct, setActiveProduct] = useState("ring");
  const [activeCut,     setActiveCut]     = useState("round");
  const [activeMetal,   setActiveMetal]   = useState("platinum");
  const [caratWeight,   setCaratWeight]   = useState(1.5);
  const [flash,         setFlash]         = useState(false);

  useEffect(() => {
    setFlash(true);
    const t = setTimeout(() => setFlash(false), 520);
    return () => clearTimeout(t);
  }, [activeCut, activeMetal, activeProduct]);

  const calculatedPrice = useMemo(() => {
    const prod = PRODUCTS.find((p) => p.key === activeProduct) || PRODUCTS[0];
    let base = activeCut === "princess" ? 5000 : activeCut === "emerald" ? 5300 : activeCut === "pear" ? 5700 : 5500;
    if (activeProduct === "earrings") base *= 0.8;
    if (activeProduct === "necklace") base *= 1.5;
    const metal = activeMetal === "platinum" ? 1800 : activeMetal === "rose_gold" ? 1100 : 1200;
    return Math.round(prod.basePrice + base * Math.pow(caratWeight, 1.35) + metal);
  }, [activeProduct, activeCut, activeMetal, caratWeight]);

  const handleBooking = () => {
    const prodName = PRODUCTS.find((p) => p.key === activeProduct)?.label || "Ring";
    const msg = `Hi Vees Star Diamonds! I have configured a custom ${prodName}:\n• Diamond Cut: ${activeCut.toUpperCase()}\n• Metal: ${activeMetal.replace("_", " ").toUpperCase()}\n• Carat Weight: ${caratWeight} ct\n• Estimated Price: ₹${calculatedPrice.toLocaleString("en-IN")}\n\nPlease let me know the process to start drafting blueprints.`;
    window.open(`https://api.whatsapp.com/send?phone=919383007477&text=${encodeURIComponent(msg)}`, "_blank");
  };

  const pct = ((caratWeight - 0.5) / 4.5) * 100;

  return (
    <div className="relative min-h-screen bg-[#0E0C0A] text-[#FAF7F2]">

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
          <p>When you come into Vees Star Diamonds and Jewellery, you're not just ordering a piece of jewellery. You're commissioning a master craftsman to create a singular work of art.</p>
          <p>Because our customers are buying directly from the people who make the jewellery, prices are about half of what you'd pay in traditional jewellery stores.</p>
        </div>
        <p className="text-[#C9A84C] font-display italic text-2xl pt-4 drop-shadow-md">Inspired by you. Designed by us.</p>
      </motion.div>

      {/* ── CONFIGURATOR ── */}
      <div id="configurator-start" className="py-28 px-6 md:px-12 max-w-7xl mx-auto space-y-20 scroll-mt-6">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="text-center space-y-4 max-w-2xl mx-auto"
        >
          <div className="badge-gold w-fit mx-auto">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A84C]" />
            <span className="text-[10px] tracking-[0.22em] uppercase text-[#C9A84C] font-bold">Bespoke Workshop</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-light text-[#FAF7F2] leading-tight">
            Configure Your{" "}
            <AnimatePresence mode="wait">
              <motion.span
                key={activeProduct}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.28 }}
                className="font-display italic gold-gradient-text inline-block"
              >
                Custom {activeProduct === "ring" ? "Ring" : activeProduct === "earrings" ? "Earrings" : "Necklace"}
              </motion.span>
            </AnimatePresence>
          </h2>
          <p className="text-[#C4BAB0] font-light text-sm">
            Select cut, metal, and carat weight — preview all 12 combinations in the grid, or use 3D mode.
          </p>
        </motion.div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          {/* ════════════════════════════════════════
              LEFT — Preview Panel (4×3 combo grid)
              ════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 bg-[#0A0806] rounded-3xl border border-[#C9A84C]/10 relative overflow-hidden flex flex-col gap-3 p-5 shadow-2xl"
          >
            {/* Flash overlay */}
            <AnimatePresence>
              {flash && (
                <motion.div key="flash" initial={{ opacity: 0.3 }} animate={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 z-30 pointer-events-none rounded-3xl"
                  style={{ background: "radial-gradient(ellipse at 50% 40%, rgba(201,168,76,0.2) 0%, transparent 70%)" }}
                />
              )}
            </AnimatePresence>
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/20 to-transparent" />

            {/* Active badge */}
            <div className="flex justify-end items-center relative z-10 shrink-0">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full border border-white/20 shrink-0"
                  style={{ background: METALS.find(m => m.key === activeMetal)?.gradient }} />
                <span style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: "#C9A84C" }}>
                  {CUTS.find(c => c.key === activeCut)?.label} · {METALS.find(m => m.key === activeMetal)?.label}
                </span>
              </div>
            </div>

            {/* Content area */}
            <div className="relative flex-1 rounded-2xl overflow-hidden" style={{ minHeight: 420 }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeProduct}-${activeCut}-${activeMetal}`}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
                  className="absolute inset-0"
                >
                  <img
                    src={PRODUCT_COMBO_IMAGES[activeProduct][`${activeCut}_${activeMetal}`]}
                    alt={`${activeCut} ${activeMetal}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 pointer-events-none" style={{
                    background: `linear-gradient(150deg, ${METALS.find(m => m.key === activeMetal)?.glow.replace("0.55","0.22")} 0%, transparent 55%)`,
                    mixBlendMode: "screen",
                  }} />
                  <div className="absolute inset-0 pointer-events-none" style={{
                    background: "linear-gradient(to bottom, rgba(0,0,0,0.52) 0%, transparent 32%, transparent 58%, rgba(0,0,0,0.88) 100%)",
                  }} />
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full border border-white/30"
                      style={{ background: METALS.find(m => m.key === activeMetal)?.gradient }} />
                    <span style={{
                      fontSize: 9, fontWeight: 700, textTransform: "uppercase",
                      letterSpacing: "0.18em", color: "#FFFFFF",
                      textShadow: "0 1px 6px rgba(0,0,0,0.8)",
                    }}>
                      {CUTS.find(c => c.key === activeCut)?.label} {CUTS.find(c => c.key === activeCut)?.sub}
                      {" · "}
                      {METALS.find(m => m.key === activeMetal)?.label}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom info card */}
            <div className="shrink-0 p-3.5 rounded-2xl relative z-10 flex items-start gap-3"
              style={{ background: "rgba(0,0,0,0.78)", backdropFilter: "blur(14px)", border: "1px solid rgba(255,255,255,0.09)" }}
            >
              <div className="flex-1">
                <span style={{ fontSize: 8, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.2em", color: "#C9A84C", display: "block", marginBottom: 3 }}>
                  Bespoke Design Preview
                </span>
                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.82)", fontWeight: 300, lineHeight: 1.65 }}>
                  {`${PRODUCTS.find(p=>p.key===activeProduct)?.label} · GIA certified ${CUTS.find(c=>c.key===activeCut)?.label} ${CUTS.find(c=>c.key===activeCut)?.sub} cut · ${METALS.find(m=>m.key===activeMetal)?.label} ${METALS.find(m=>m.key===activeMetal)?.sub} prong setting`}
                </p>
              </div>
              <div className="shrink-0 flex flex-col items-end gap-1">
                {[
                  { label: CUTS.find(c=>c.key===activeCut)?.label },
                  { label: METALS.find(m=>m.key===activeMetal)?.label },
                ].map((t, i) => (
                  <span key={i} style={{
                    padding: "2px 7px", borderRadius: 9999, fontSize: 8, fontWeight: 700,
                    textTransform: "uppercase", letterSpacing: "0.1em",
                    background: "rgba(201,168,76,0.14)", border: "1px solid rgba(201,168,76,0.3)", color: "#C9A84C",
                  }}>{t.label}</span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ════════════════════════════════════════
              RIGHT — Controls Panel (all 4 steps)
              ════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 flex flex-col justify-between shimmer-card glass-panel luxury-shadow border border-[#C9A84C]/12 p-7 rounded-3xl text-left"
          >
            <div className="space-y-6">

              {/* ── 01 — Jewellery Piece ── */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.22em", color: "#C9A84C" }}>
                    01 — Jewellery Piece
                  </span>
                  <span style={{ fontSize: 8, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "#5A5048" }}>
                    {PRODUCTS.find(p=>p.key===activeProduct)?.label}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2.5">
                  {PRODUCTS.map(item => (
                    <button key={item.key} onClick={() => setActiveProduct(item.key)}
                      className="relative overflow-hidden rounded-xl cursor-pointer group transition-all duration-300"
                      style={{
                        aspectRatio: "3/4",
                        outline: activeProduct === item.key ? "2px solid #C9A84C" : "1px solid rgba(201,168,76,0.1)",
                        outlineOffset: activeProduct === item.key ? 2 : 0,
                      }}
                    >
                      <img src={item.image} alt={item.label}
                        className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                        style={{ opacity: activeProduct === item.key ? 0.9 : 0.45 }} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
                      {activeProduct === item.key && (
                        <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[#C9A84C] flex items-center justify-center z-10">
                          <Check className="w-2.5 h-2.5 text-[#0E0C0A]" strokeWidth={3} />
                        </div>
                      )}
                      <span className="absolute bottom-2 left-0 right-0 text-center"
                        style={{ fontSize: 8, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em",
                          color: activeProduct === item.key ? "#C9A84C" : "#C4BAB0" }}>
                        {item.label.replace("Bespoke ","")}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* ── 02 — Diamond Cut ── */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.22em", color: "#C9A84C" }}>
                    02 — Diamond Cut
                  </span>
                  <span style={{ fontSize: 8, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "#5A5048" }}>
                    {CUTS.find(c=>c.key===activeCut)?.label} {CUTS.find(c=>c.key===activeCut)?.sub}
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {CUTS.map(cut => {
                    const Icon = CUT_ICON_MAP[cut.key];
                    const isActive = activeCut === cut.key;
                    return (
                      <motion.button key={cut.key} onClick={() => setActiveCut(cut.key)}
                        whileHover={{ scale: isActive ? 1 : 1.04 }}
                        whileTap={{ scale: 0.94 }}
                        className="flex flex-col items-center gap-2 py-4 px-1 rounded-xl cursor-pointer relative overflow-hidden"
                        style={{
                          border: isActive ? "2px solid #C9A84C" : "1px solid #1E1A16",
                          background: isActive
                            ? "linear-gradient(160deg,rgba(201,168,76,0.22) 0%,rgba(201,168,76,0.08) 100%)"
                            : "#0D0B09",
                          boxShadow: isActive ? "0 0 20px rgba(201,168,76,0.30),inset 0 1px 0 rgba(201,168,76,0.15)" : "none",
                        }}
                      >
                        {isActive && (
                          <motion.div layoutId="cut-topbar"
                            className="absolute top-0 left-0 right-0 h-0.5 rounded-t-xl"
                            style={{ background: "linear-gradient(90deg,transparent,#C9A84C,transparent)" }}
                          />
                        )}
                        <Icon active={isActive} />
                        <div className="text-center leading-tight">
                          <p style={{ color: isActive ? "#C9A84C" : "#4A4440", fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                            {cut.label}
                          </p>
                          <p style={{ color: isActive ? "#E8D5A0" : "#2A2420", fontSize: 8 }}>{cut.sub}</p>
                        </div>
                        {isActive && (
                          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                            className="absolute top-1.5 right-1.5 w-3 h-3 rounded-full bg-[#C9A84C] flex items-center justify-center">
                            <Check className="w-2 h-2 text-[#0E0C0A]" strokeWidth={3} />
                          </motion.div>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* ── 03 — Metal Prong Setting ── */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.22em", color: "#C9A84C" }}>
                    03 — Metal Setting
                  </span>
                  <span style={{ fontSize: 8, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "#5A5048" }}>
                    {METALS.find(m=>m.key===activeMetal)?.label}
                  </span>
                </div>
                <div className="flex items-stretch gap-2.5">
                  {METALS.map(metal => {
                    const isActive = activeMetal === metal.key;
                    return (
                      <motion.button key={metal.key} onClick={() => setActiveMetal(metal.key)}
                        whileHover={{ scale: isActive ? 1 : 1.03 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 flex flex-col items-center rounded-xl cursor-pointer overflow-hidden"
                        style={{
                          border: isActive ? `2px solid ${metal.glow.replace("0.55","0.9")}` : "1px solid #1E1A16",
                          boxShadow: isActive ? `0 0 22px ${metal.glow}` : "none",
                          transition: "box-shadow 0.3s,border 0.3s",
                        }}
                      >
                        <div className="w-full transition-all duration-300"
                          style={{
                            height: 50, background: metal.gradient,
                            opacity: isActive ? 1 : 0.32,
                            filter: isActive ? "none" : "grayscale(55%)",
                          }}
                        />
                        <div className="w-full py-2.5 px-1 flex flex-col items-center gap-0.5"
                          style={{ background: isActive ? "rgba(201,168,76,0.10)" : "#0D0B09" }}>
                          {isActive && (
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                              className="mb-1 w-4 h-4 rounded-full flex items-center justify-center"
                              style={{ background: metal.gradient }}>
                              <Check className="w-2.5 h-2.5 text-[#0E0C0A]" strokeWidth={3} />
                            </motion.div>
                          )}
                          <p style={{ color: isActive ? "#FFFFFF" : "#4A4440", fontSize: 8, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", textAlign: "center" }}>
                            {metal.label}
                          </p>
                          <p style={{ color: isActive ? "rgba(255,255,255,0.55)" : "#2A2420", fontSize: 7, textAlign: "center" }}>
                            {metal.sub}
                          </p>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* ── 04 — Carat Weight ── */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.22em", color: "#C9A84C" }}>
                    04 — Carat Weight
                  </span>
                  <AnimatePresence mode="wait">
                    <motion.span key={caratWeight}
                      initial={{ scale: 1.2, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                      exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
                      style={{ fontSize: 15, fontWeight: 700, color: "#E8D5A0", fontStyle: "italic", fontFamily: "var(--font-display)" }}>
                      {caratWeight} ct
                    </motion.span>
                  </AnimatePresence>
                </div>
                {/* Visual size comparison */}
                <div className="flex items-end justify-between px-1 pb-1">
                  {CARAT_STOPS.map(({ ct, sz }) => {
                    const nearest = CARAT_STOPS.reduce((a,b) => Math.abs(b.ct-caratWeight) < Math.abs(a.ct-caratWeight) ? b : a);
                    const isNearest = nearest.ct === ct;
                    return (
                      <div key={ct} className="flex flex-col items-center gap-1.5 cursor-pointer"
                        onClick={() => setCaratWeight(ct)}>
                        <motion.div
                          animate={{
                            background: isNearest ? "#C9A84C" : "rgba(90,80,72,0.4)",
                            boxShadow: isNearest ? "0 0 12px rgba(201,168,76,0.5)" : "none",
                          }}
                          transition={{ duration: 0.3 }}
                          className="rounded-full"
                          style={{ width: sz, height: sz }}
                        />
                        <span style={{ fontSize: 7, fontWeight: 700, color: isNearest ? "#C9A84C" : "#4A4440" }}>
                          {ct}ct
                        </span>
                      </div>
                    );
                  })}
                </div>
                <input type="range" min="0.5" max="5.0" step="0.1" value={caratWeight}
                  onChange={e => setCaratWeight(parseFloat(e.target.value))}
                  className="w-full appearance-none h-1.5 rounded-full cursor-pointer"
                  style={{ background: `linear-gradient(to right,#C9A84C ${pct}%,rgba(201,168,76,0.15) ${pct}%)` }}
                />
                <div className="flex justify-between"
                  style={{ fontSize: 7, color: "#4A4440", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em" }}>
                  <span>0.5 ct</span><span>2.5 ct</span><span>5.0 ct</span>
                </div>
              </div>
            </div>

            {/* Price + CTA */}
            <div className="border-t border-[#C9A84C]/12 pt-5 mt-5 flex items-end justify-between gap-4">
              <div>
                <span style={{ fontSize: 8, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: "#5A5048", display: "block", marginBottom: 4 }}>
                  Bespoke Estimate
                </span>
                <AnimatePresence mode="wait">
                  <motion.p key={calculatedPrice}
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.22 }}
                    style={{ fontSize: 22, fontWeight: 300, color: "#FAF7F2" }}>
                    ₹{calculatedPrice.toLocaleString("en-IN")}
                    <span style={{ fontSize: 11, color: "#7A6E66", marginLeft: 4 }}>INR</span>
                  </motion.p>
                </AnimatePresence>
              </div>
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                onClick={handleBooking}
                className="px-6 py-3.5 bg-[#C9A84C] hover:bg-[#E8D5A0] text-[#0E0C0A] font-extrabold uppercase tracking-widest rounded-xl transition-luxury cursor-pointer shadow-lg shrink-0 gold-pulse-ring"
                style={{ fontSize: 9 }}>
                Book Design
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* GIA disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="shimmer-card glass-panel p-6 rounded-2xl border border-[#C9A84C]/10 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto luxury-shadow"
        >
          <div className="flex items-start space-x-3">
            <ShieldCheck className="w-5 h-5 text-[#C9A84C] shrink-0 mt-0.5" />
            <p className="text-sm font-light leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>
              Every order undergoes micro-prong burnishing and includes an official GIA grading certificate verifying color, cut, and clarity specifications.
            </p>
          </div>
          <Link href="/about#7cs"
            className="text-xs text-[#C9A84C] uppercase font-bold tracking-wider hover:text-[#E8D5A0] shrink-0 transition-luxury">
            Learn 7 C's Standards
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
