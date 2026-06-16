"use client";
import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ShieldCheck, Compass, Heart, ArrowRight } from "lucide-react";

const cards = [
  {
    icon: Compass,
    title: "Chettinad Ratios",
    body: "Chettinad architecture utilizes strict visual grids to distribute weight. Similarly, we design claw settings with balanced spatial distributions to suspend solitaires safely at every angle.",
  },
  {
    icon: ShieldCheck,
    title: "Ancestral Metallurgy",
    body: "We employ centuries-old lost-wax casting methods combined with modern high-vacuum platinum alloy systems. This provides strong, warp-resistant settings that last generations.",
  },
  {
    icon: Heart,
    title: "Madras Burnishing",
    body: "The metal undergoes high-grade hand-burnishing using natural friction compounds. This results in a liquid-mirror surface that reflects diamond prisms at every viewing angle.",
  },
];

export default function KaraikudiClient() {
  return (
    <div className="relative min-h-screen bg-[#0E0C0A] text-[#FAF7F2] pt-[180px] pb-16 px-6 md:px-12 overflow-x-hidden">

      {/* Ambient glows */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#C9A84C]/4 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#C9A84C]/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-24 relative z-10">

        {/* ── INTRO ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            className="lg:col-span-7 text-left space-y-6"
          >
            <div className="badge-gold w-fit">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A84C]" />
              <span className="text-[10px] tracking-[0.22em] uppercase text-[#C9A84C] font-bold">
                Madras to Chettinad Legacy
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#FAF7F2] leading-tight">
              Karaikudi – The Pride <br />
              <span className="font-display italic gold-gradient-text">of Chettinad</span>
            </h1>

            <div className="text-[#C4BAB0] font-light text-sm leading-relaxed max-w-lg space-y-4">
              <p>
                The Chettinad houses in Karaikudi, Pallathur, and Athangudi are the most lavish and exquisite examples of architectural beauty. Our roots lie here — regions renowned for architectural precision, complex wood carvings, and master gold casting.
              </p>
              <p>
                In our workshops, we translate these ancestral ratios into our curated collection of exquisite micro-prong solitaire settings.
              </p>
            </div>

            <motion.a
              href="https://api.whatsapp.com/send?phone=919383007477&text=Hi%20Vees%20Star!%20I%20would%20like%20to%20book%20a%20private%20heritage%20design%20consultation."
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center space-x-2 px-7 py-3.5 bg-[#C9A84C] hover:bg-[#E8D5A0] text-[#0E0C0A] text-xs tracking-widest uppercase font-extrabold rounded-md transition-luxury cursor-pointer gold-pulse-ring"
            >
              <span>Book Heritage Consultation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="lg:col-span-5 relative h-[380px] rounded-3xl overflow-hidden border border-[#C9A84C]/15 shadow-xl"
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: "url('/Product%20images/2.jpg')",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0806]/95 via-[#0A0806]/30 to-transparent" />
            {/* Gold shimmer lines */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/30 to-transparent" />
            <div className="absolute bottom-6 left-6 text-left space-y-1">
              <span className="text-[10px] tracking-widest text-[#C9A84C] uppercase font-bold">
                Est. 1978
              </span>
              <h4 className="text-lg font-semibold text-[#FAF7F2]">
                Our Ancestral Workshop
              </h4>
            </div>
          </motion.div>
        </div>

        {/* ── GEOMETRY CARDS ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
                className="shimmer-card glass-panel luxury-shadow luxury-shadow-hover p-8 rounded-2xl border border-[#C9A84C]/8 hover:border-[#C9A84C]/25 transition-luxury space-y-5"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#C9A84C]/10 to-[#C9A84C]/3 border border-[#C9A84C]/15 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-[#C9A84C]" />
                </div>
                <h3 className="text-xl font-light text-[#FAF7F2]">{card.title}</h3>
                <p className="text-sm text-[#C4BAB0] font-light leading-relaxed">{card.body}</p>
              </motion.div>
            );
          })}
        </div>

        {/* ── CTA BANNER ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="shimmer-card glass-panel luxury-shadow p-10 md:p-14 rounded-3xl border border-[#C9A84C]/12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between text-left gap-8"
        >
          {/* Decorative corner accent */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-[#C9A84C]/6 to-transparent rounded-bl-3xl pointer-events-none" />

          <div className="space-y-4 max-w-xl relative z-10">
            <span className="text-[10px] tracking-widest text-[#C9A84C] uppercase font-bold">
              Virtual Private Viewing
            </span>
            <h2 className="text-2xl md:text-3xl text-[#FAF7F2] font-light leading-snug">
              Experience Our{" "}
              <span className="font-display italic gold-gradient-text">Heritage Designs</span>
            </h2>
            <p className="text-sm text-[#C4BAB0] font-light leading-relaxed">
              We coordinate private consultations with gemmologists at our
              Cathedral Road showroom in Chennai or virtually via secure live
              channels. Connect to view design blueprints and gemstone catalogs.
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() =>
              window.open(
                "https://api.whatsapp.com/send?phone=919383007477&text=Hi%20Vees%20Star!%20I%20would%20like%20to%20book%20a%20private%20heritage%20design%20consultation.",
                "_blank"
              )
            }
            className="relative z-10 px-8 py-4 bg-[#C9A84C] hover:bg-[#E8D5A0] text-[#0E0C0A] text-xs tracking-widest uppercase font-extrabold rounded-full transition-luxury shrink-0 cursor-pointer shadow-lg"
          >
            Connect on WhatsApp
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
