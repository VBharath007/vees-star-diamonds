"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { GlassButton } from "../../components/ui/glass-button";
import dynamic from "next/dynamic";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Compass,
  Eye,
  Layers,
  Award,
  RotateCw,
  ShieldCheck,
  ChevronDown,
  HelpCircle,
} from "lucide-react";

// Safe Dynamic Import
const AboutNecklaceScroll = dynamic(
  () => import("../../components/AboutNecklaceScroll"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-screen bg-[#0E0C0A] flex flex-col items-center justify-center text-[#FAF7F2]">
        <div className="w-10 h-10 border border-[#C9A84C] border-t-transparent rounded-full animate-spin mb-4" />
        <span className="text-[10px] tracking-[0.25em] text-[#C9A84C]/50 uppercase font-bold">
          Loading Heritage...
        </span>
      </div>
    )
  }
);

const VeesScrollTimeline = dynamic(
  () => import("../../components/ui/ScrollTimeline"),
  { ssr: false }
);

/* ─────────────────────────── DATA ─────────────────────────── */

const cDefs = [
  { key: "cut", title: "1. Cut", subtitle: "Laser faceting & fire", icon: Compass },
  { key: "clarity", title: "2. Clarity", subtitle: "Pure microscopic crystal", icon: Eye },
  { key: "carat", title: "3. Carat", subtitle: "Weight & volume scale", icon: Layers },
  { key: "color", title: "4. Color", subtitle: "Ice white spectrum", icon: Sparkles },
  { key: "cert", title: "5. Certificate", subtitle: "GIA official records", icon: Award },
  { key: "craft", title: "6. Craftsmanship", subtitle: "Handcrafted metal setting", icon: RotateCw },
  { key: "confidence", title: "7. Confidence", subtitle: "Conflict-free warranty", icon: ShieldCheck },
];

const cContent = {
  cut: { heading: "The Master Alignment", label: "Cut Precision", body: "A diamond's Cut dictates its brilliance. We facet Vees Star diamonds with absolute precision. When light hits the top table, it enters the crystal, refracts across 58 facets, and returns through the crown in a kaleidoscope of white-blue fire." },
  clarity: { heading: "Microscopic Purity", label: "Clarity Grade", body: "We deal exclusively in FL (Flawless), IF (Internally Flawless), and VVS1/VVS2 diamonds. Under 10× magnification, our gems display no inclusion clouds, giving a crystal-clear prism for light transmission." },
  carat: { heading: "Geometric Scale", label: "Carat Mass", body: "Carat weight represents the physical mass of the diamond. Larger carats are geometrically rarer, and we offer bespoke settings up to 15.0 carats, tailored in proportion to maintain flawless faceting brilliance." },
  color: { heading: "Ice-Cold D-Color Standard", label: "Color Spectrum", body: "Color grades range from D (colorless) to Z. Vees Star selections operate strictly between D, E, and F color bands — the absolute peak of icy white diamond brilliance with zero yellow tinting." },
  cert: { heading: "GIA Certified Legacy", label: "Official Certificate", body: "Each individual Vees Star Diamond is laser-engraved with a microscopic GIA registry number. This certificate guarantees the cut grade, carat accuracy, color validity, and ethical origin values of your custom stone." },
  craft: { heading: "Bespoke Metal Mountings", label: "Craftsmanship Setting", body: "A great diamond deserves an equally brilliant mount. Our South Indian workshop handcrafts every platinum claw setting, optimising physical balance and ensuring the diamond catches ambient light from all vertical axes." },
  confidence: { heading: "Conflict-Free Guarantee", label: "Ethical Confidence", body: "Vees Star strictly adheres to the Kimberley Process. All diamonds are sourced from conflict-free mines, ensuring every brilliant facet brings light to our communities without compromises." },
};

/* ─────────────────────────── GOLD PARTICLES ─────────────────────────── */

function GoldParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    let W, H;

    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 35 }, () => ({
      x: Math.random() * 1000,
      y: Math.random() * 1000,
      r: Math.random() * 1.2 + 0.4,
      vy: -(Math.random() * 0.22 + 0.08),
      vx: (Math.random() - 0.5) * 0.10,
      alpha: Math.random() * 0.4 + 0.15,
      life: Math.random(),
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life += 0.003;
        if (p.y < -4 || p.life > 1) {
          p.x = Math.random() * W;
          p.y = H + 4;
          p.life = 0;
          p.alpha = Math.random() * 0.4 + 0.15;
        }
        const pulse = Math.sin(p.life * Math.PI);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,168,76,${p.alpha * pulse})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    />
  );
}

/* ─────────────────────────── SECTION WRAPPER ─────────────────────────── */

function RevealSection({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay, ease: [0.4, 0, 0.2, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const atelierTabs = [
  { key: "design", label: "Design & CAD Studio" },
  { key: "craft", label: "Artisan Benchwork" },
  { key: "setting", label: "Setting & Polishing" },
];

const atelierItems = [
  {
    url: "/work image/cad-239174.webp",
    title: "Digital 3D CAD modeling of custom solitaires",
    tab: "design",
    category: "Creative Office",
  },
  {
    url: "/work image/abt-us-1.webp",
    title: "Inspecting diamond clarity under microscope",
    tab: "design",
    category: "Quality Studio",
  },
  {
    url: "/work image/Jewllery 1.webp",
    title: "Bespoke hand-sketched design scaling",
    tab: "design",
    category: "Artistic Conception",
  },
  {
    url: "/work image/IMG-20251112-WA0055.webp",
    title: "Shaping ring bands with fine precision files",
    tab: "craft",
    category: "Atelier Bench",
  },
  {
    url: "/work image/IMG-20251112-WA0056.webp",
    title: "Calibrating gold parameters at the workbench",
    tab: "craft",
    category: "Artisan Workshop",
  },
  {
    url: "/work image/IMG-20251112-WA0058.webp",
    title: "Aligning platinum components with specialized tweezers",
    tab: "craft",
    category: "Metal Calibration",
  },
  {
    url: "/work image/IMG-20251112-WA0059.webp",
    title: "Verifying structural details post-casting",
    tab: "craft",
    category: "Casting Inspection",
  },
  {
    url: "/work image/IMG-20251112-WA0057.webp",
    title: "Setting micro-diamonds under stereo zoom magnification",
    tab: "setting",
    category: "Prong Setting",
  },
  {
    url: "/work image/IMG-20251112-WA0060.webp",
    title: "Rounding claw tips snuggly over solitaire girdles",
    tab: "setting",
    category: "Claw Mounting",
  },
  {
    url: "/work image/IMG-20251112-WA0061.webp",
    title: "Mirror polishing with high-speed luster buff wheels",
    tab: "setting",
    category: "Finish Polishing",
  },
  {
    url: "/work image/IMG-20251112-WA0062.webp",
    title: "Final quality review of the setting security",
    tab: "setting",
    category: "Quality Review",
  },
  {
    url: "/work image/Jewellery 2.webp",
    title: "Completed customized wedding ring inspection",
    tab: "setting",
    category: "Final Masterpiece",
  },
];

/* ─────────────────────────── MAIN COMPONENT ─────────────────────────── */

export default function AboutClient({ faqs }) {
  const [activeC, setActiveC] = useState("cut");
  const [openFaq, setOpenFaq] = useState(null);
  const [activeAtelierTab, setActiveAtelierTab] = useState("design");
  const filteredAtelierItems = atelierItems.filter((item) => item.tab === activeAtelierTab);
  const active = cContent[activeC];
  const ActiveIcon = cDefs.find((c) => c.key === activeC)?.icon || Sparkles;

  const cardVariants = {
    hidden: { opacity: 0, y: 32 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.08, duration: 0.55, ease: [0.4, 0, 0.2, 1] },
    }),
  };

  return (
    // CRITICAL FIX: Removed ALL overflow-hidden and clip properties. This allows position:sticky to work perfectly!
    <div className="relative w-full bg-[#0E0C0A] text-[#FAF7F2]">

      {/* ── 1. CINEMATIC HERO SEQUENCE ── */}
      <AboutNecklaceScroll />

      {/* ── 2. CORE LAYOUT BLOCKS ── */}
      <div className="relative w-full bg-[#0E0C0A] z-10">

        {/* Floating gold particles */}
        <div className="absolute inset-0 pointer-events-none">
          <GoldParticles />
        </div>

        {/* Ambient glows */}
        <div className="absolute top-0 right-0 w-[300px] sm:w-[600px] h-[500px] bg-[#C9A84C]/4 rounded-full blur-[180px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] sm:w-[500px] h-[400px] bg-[#C9A84C]/3 rounded-full blur-[160px] pointer-events-none" />

        <div
          className="w-full h-px"
          style={{
            background: "linear-gradient(90deg, transparent 0%, #C9A84C33 30%, #C9A84C66 50%, #C9A84C33 70%, transparent 100%)",
          }}
          aria-hidden="true"
        />

        <div className="py-20 px-6 md:px-12 w-full">
          <div className="max-w-7xl mx-auto space-y-32 relative z-10">

            {/* ── THE 7 C's CRITERIA SECTION ── */}
            <RevealSection delay={0}>
              <section id="7cs" className="scroll-mt-36 w-full space-y-16">
                <div className="text-center space-y-3">
                  <span className="text-[9px] uppercase tracking-[0.35em] text-[#C9A84C] font-bold block">
                    Gemmology Standard
                  </span>
                  <h2 className="text-4xl md:text-5xl font-light text-[#FAF7F2] leading-tight">
                    The 7 C's Criteria
                    <br />
                    <span className="font-display italic gold-gradient-text">
                      Of Excellence
                    </span>
                  </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
                  {/* Tab List */}
                  <div className="lg:col-span-4 flex flex-col space-y-2.5 text-left w-full">
                    {cDefs.map((c) => {
                      const TabIcon = c.icon;
                      const isActive = activeC === c.key;
                      return (
                        <button
                          key={c.key}
                          onClick={() => setActiveC(c.key)}
                          className={`group p-4 rounded-xl border text-left transition-luxury cursor-pointer flex items-center space-x-4 ${isActive
                            ? "border-[#C9A84C]/40 bg-[#C9A84C]/8 luxury-shadow"
                            : "border-[#C9A84C]/8 bg-[#181410]/50 hover:border-[#C9A84C]/20"
                            }`}
                        >
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-luxury shrink-0 ${isActive ? "bg-[#C9A84C]/10 border-[#C9A84C]/30" : "bg-[#C9A84C]/4 border-[#C9A84C]/10 group-hover:bg-[#C9A84C]/8"
                            }`}>
                            <TabIcon className={`w-4 h-4 transition-luxury ${isActive ? "text-[#C9A84C]" : "text-[#7A6E66] group-hover:text-[#C9A84C]"}`} />
                          </div>
                          <div>
                            <h4 className={`text-sm font-semibold transition-luxury ${isActive ? "text-[#E8D5A0]" : "text-[#FAF7F2] group-hover:text-[#E8D5A0]"}`}>
                              {c.title}
                            </h4>
                            <span className="text-xs text-[#C4BAB0] font-light block mt-0.5">
                              {c.subtitle}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Detail Panel */}
                  <div className="lg:col-span-8 glass-panel luxury-shadow p-6 sm:p-10 rounded-3xl min-h-[360px] flex flex-col justify-between text-left border border-[#C9A84C]/8 bg-[#0E0C0A] w-full box-border">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeC}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-5"
                      >
                        <div className="flex items-center space-x-3 text-[#C9A84C]">
                          <ActiveIcon className="w-4 h-4" />
                          <span className="text-[9px] uppercase tracking-widest font-bold">
                            {active.label}
                          </span>
                        </div>
                        <h3 className="text-3xl font-light text-[#FAF7F2] leading-tight">
                          {active.heading}
                        </h3>
                        <p className="text-sm md:text-base text-[#C4BAB0] font-light leading-relaxed">
                          {active.body}
                        </p>
                      </motion.div>
                    </AnimatePresence>

                    <div className="border-t border-[#C9A84C]/8 pt-6 mt-6 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center text-xs">
                      <span className="text-[10px] uppercase tracking-widest text-[#eeeee] font-bold">
                        GIA Registry Approved
                      </span>
                      <Link
                        href="/custom-build"
                        className="flex items-center space-x-2 text-[10px] text-[#7A6E66] font-bold uppercase tracking-wider hover:text-[#C9A84C] transition-luxury"
                      >
                        <span>Build Custom Design</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </section>
            </RevealSection>

            {/* ── ABOUT INTRODUCTION ── */}
            <RevealSection delay={0}>
              <section className="w-full space-y-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-5 space-y-4 text-center lg:text-left">
                    <span className="text-[9px] uppercase tracking-[0.35em] text-[#C9A84C] font-bold block">
                      About Vees Star
                    </span>
                    <h2 className="text-4xl md:text-5xl font-light text-[#FAF7F2] leading-tight">
                      The Quintessential
                      <br />
                      <span className="font-display italic gold-gradient-text">
                        Diamond Boutique
                      </span>
                    </h2>
                  </div>
                  <div className="lg:col-span-7 text-left space-y-6">
                    <p className="text-sm md:text-base text-[#C4BAB0] font-light leading-relaxed">
                      Vees star Diamonds and Jewellery is the quintessential diamond boutique that strives to acquire success through carefully executed plans and retention of customer satisfaction. With the vision of giving exquisite diamonds at genuine prices, we believe that the company is certainly marching in the right direction.
                    </p>
                    <p className="text-sm md:text-base text-[#C4BAB0] font-light leading-relaxed">
                      At Vees Star, we understand the emotional power of jewellery. We're proud to help our customers create precious moments; in fact, Our History puts us in a unique position to do so. With our artisans' skills and our company's deeply held values, you can count on us to deliver truly special items, like we have been doing it for over 20 years.
                    </p>
                  </div>
                </div>

                {/* ── USP ROW ── */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                  {[
                    { value: "Manufacturer", label: "LEADING MANUFACTURER", text: "Motivated to maintain the legacy of perfection for future years to follow." },
                    { value: "Heritage", label: "GOODWILL FOCUS", text: "Aggressive effort on long term relationships, maintaining the highest quality of diamonds." },
                    { value: "Expertise", label: "MANAGEMENT TEAM", text: "Our crew includes professionals who deliver best in the industry finishes." },
                  ].map((s, idx) => (
                    <div
                      key={idx}
                      className="shimmer-card glass-panel luxury-shadow p-7 rounded-2xl border border-[#C9A84C]/8 hover:border-[#C9A84C]/25 transition-luxury flex flex-col justify-between text-left space-y-6 h-full"
                    >
                      <div className="space-y-4">
                        <span className="font-display italic gold-gradient-text text-2xl tracking-tight block">{s.value}</span>
                        <span className="text-[9px] uppercase tracking-widest text-[#C9A84C] font-bold block">{s.label}</span>
                        <p className="text-xs text-[#C4BAB0] font-light leading-relaxed">{s.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </RevealSection>

            {/* ── INSIDE OUR ATELIER & DESIGN OFFICE ── */}
            <RevealSection delay={0.05}>
              <section className="space-y-16 w-full">
                <div className="text-center space-y-4 max-w-3xl mx-auto">
                  <span className="text-[9px] uppercase tracking-[0.35em] text-[#C9A84C] font-bold block">
                    Inside Our Atelier & Office
                  </span>
                  <h2 className="text-4xl md:text-5xl font-light text-[#FAF7F2] leading-tight">
                    Where Artistry Meets{" "}
                    <span className="font-display italic gold-gradient-text">
                      Precision
                    </span>
                  </h2>
                  <p className="text-sm text-[#C4BAB0] font-light leading-relaxed max-w-2xl mx-auto">
                    A behind-the-scenes look into our daily work. From initial CAD blueprints to the physical carving, setting, and mirror-polishing of precious metals, our crew delivers world-class craftsmanship.
                  </p>
                </div>

                {/* Tab Controls */}
                <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8">
                  {atelierTabs.map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveAtelierTab(tab.key)}
                      className={`px-6 py-2.5 rounded-full text-[10px] md:text-xs font-semibold uppercase tracking-widest transition-all duration-300 border cursor-pointer ${
                        activeAtelierTab === tab.key
                          ? "bg-[#C9A84C] text-[#0E0C0A] border-[#C9A84C] shadow-lg shadow-[#C9A84C]/25"
                          : "border-[#C9A84C]/20 text-[#C4BAB0] hover:text-[#FAF7F2] hover:border-[#C9A84C]/45"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Gallery Grid */}
                <motion.div 
                  layout
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  <AnimatePresence mode="popLayout">
                    {filteredAtelierItems.map((item) => (
                      <motion.div
                        layout
                        key={item.url}
                        initial={{ opacity: 0, scale: 0.92 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.92 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        whileHover={{ y: -6 }}
                        className="group relative rounded-2xl overflow-hidden border border-[#C9A84C]/10 bg-[#14110F] aspect-[4/3] flex flex-col justify-end shadow-2xl hover:border-[#C9A84C]/35 transition-all duration-500"
                      >
                        <img
                          src={item.url}
                          alt={item.title}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
                          loading="lazy"
                        />
                        {/* Elegant overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent transition-opacity duration-500" />
                        
                        <div className="relative z-10 p-6 space-y-1.5 text-left">
                          <span className="text-[8px] uppercase tracking-widest text-[#C9A84C] font-bold">
                            {item.category}
                          </span>
                          <h4 className="text-xs md:text-sm font-light text-white tracking-wide leading-relaxed">
                            {item.title}
                          </h4>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              </section>
            </RevealSection>

            {/* ── OUR PILLARS ── */}
            {/* ── OUR PILLARS TIMELINE INTEGRATION ── */}
            <RevealSection delay={0.05}>
              <section className="space-y-16 w-full">
                <div className="text-left space-y-3">
                  <span className="text-[9px] uppercase tracking-[0.35em] text-[#C9A84C] font-bold block">
                    Our Excellence
                  </span>
                  <h2 className="text-4xl font-light text-[#FAF7F2] leading-tight">
                    The Standards We{" "}
                    <span className="font-display italic gold-gradient-text">Uphold</span>
                  </h2>
                </div>

                {/* Using your ScrollTimeline component */}
                <VeesScrollTimeline
                  events={[
                    { year: "01", title: "Hand Picked Diamonds", description: "Our diamonds are obtained from the very best sources in the world's market. Handpicked and graded for quality, cut and color." },
                    { year: "02", title: "Manufacturing Fine Jewellery", description: "Manufactured by the lost wax vacuum pressure castings process. Imported luster and buff wheels provide a mirror finish." },
                    { year: "03", title: "Product, Design & Quality", description: "Diamonds studded in 18k or 22k gold. With a design collection of over 20,000 pieces, we specialize in Bespoke Jewellery." },
                    { year: "04", title: "Unique Finds", description: "All our jewellery is made on-site by talented artisans, you won't find anything like it at other retailers." },
                    { step: "05", title: "Highest Quality", description: "Since we manufacture every item we sell, we have immense control over quality." },
                    { step: "06", title: "Excellent Customer Service", description: "All of our associates are dedicated to helping customers find the perfect accessory for any occasion." },
                  ]}
                  title=""
                  subtitle=""
                  cardEffect="glow"
                  cardVariant="outlined"
                  connectorStyle="line"
                  animationOrder="sequential"
                  className="bg-transparent"
                />
              </section>
            </RevealSection>

            {/* ── FAQ ── */}
            <RevealSection delay={0.05}>
              <section id="faq" className="scroll-mt-36 space-y-16 max-w-4xl mx-auto w-full">
                <div className="text-center space-y-3">
                  <span className="text-[9px] uppercase tracking-[0.35em] text-[#C9A84C] font-bold block">
                    Customer FAQ
                  </span>
                  <h2 className="text-3xl md:text-4xl font-light text-[#FAF7F2]">
                    Frequently{" "}
                    <span className="font-display italic gold-gradient-text">Inquired</span>
                  </h2>
                  <div className="gold-divider mt-4" />
                </div>

                <div className="space-y-4 w-full">
                  {faqs.map((faq, idx) => {
                    const isOpen = openFaq === idx;
                    return (
                      <div
                        key={idx}
                        className={`glass-panel border rounded-xl overflow-hidden transition-luxury luxury-shadow ${isOpen ? "border-[#C9A84C]/40" : "border-[#C9A84C]/8"} w-full`}
                      >
                        <button
                          onClick={() => setOpenFaq(isOpen ? null : idx)}
                          className="w-full p-4 sm:p-5 flex items-center justify-between text-[#FAF7F2] hover:text-[#E8D5A0] transition-luxury cursor-pointer focus:outline-none"
                        >
                          <span className="text-sm font-medium tracking-wide flex items-center space-x-3">
                            <HelpCircle className="w-4 h-4 text-[#C9A84C] shrink-0" />
                            <span className="text-left">{faq.q}</span>
                          </span>
                          <ChevronDown
                            className={`w-4 h-4 shrink-0 transition-transform duration-300 text-[#C9A84C] ${isOpen ? "rotate-180" : ""}`}
                          />
                        </button>
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25 }}
                            >
                              <div className="px-4 sm:px-5 pb-5 text-sm text-[#C4BAB0] font-light leading-relaxed border-t border-[#C9A84C]/8 pt-4 bg-[#0E0C0A]/60 tracking-wide">
                                {faq.a}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </section>
            </RevealSection>

            {/* ── CTA BANNER ── */}
            <RevealSection delay={0}>
              <section className="relative overflow-hidden rounded-3xl border border-[#C9A84C]/8 p-8 sm:p-12 md:p-16 text-center space-y-8 w-full box-border bg-[#181410]">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_50%,rgba(201,168,76,0.06),transparent)] pointer-events-none" />

                <div className="max-w-xl mx-auto space-y-4">
                  <Sparkles className="w-6 h-6 text-[#C9A84C] mx-auto" />
                  <h2 className="text-3xl md:text-4xl font-light text-[#FAF7F2] leading-tight">
                    Visit Our Boutique
                  </h2>
                  <p className="text-[#C4BAB0] font-light text-xs sm:text-sm leading-relaxed px-2">
                    You are welcome to visit our boutique in Chennai to have a look at a wider choice of our products.
                    Head on to the Contact Us page to navigate to our studio.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xs sm:max-w-none mx-auto pt-2">
                  <GlassButton size="lg" onClick={() => window.location.href = "/contact"}>
                    Contact Us
                  </GlassButton>
                  <GlassButton size="lg" onClick={() => window.location.href = "/gallery"}>
                    View Collection
                  </GlassButton>
                </div>
              </section>
            </RevealSection>

          </div>
        </div>
      </div>
    </div>
  );
}