"use client";
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Sparkles, Cpu } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ManufacturingClient() {
  const containerRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current || !triggerRef.current) return;
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray(".craft-panel");
      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (panels.length - 1),
          end: () => `+=${triggerRef.current.offsetWidth}`,
          invalidateOnRefresh: true,
        },
      });
    }, triggerRef);
    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const steps = [
    {
      idx: "01",
      title: "Raw Geometry Selection",
      subtitle: "Rough Stone Sorting",
      desc: "Our master gemmologists select conflict-free octahedral diamonds from Botswana and Canada. Out of 10,000 carats, only 5 meet the inclusion clarity threshold required for our Vees Star standard.",
      image: "/rough_sorting.png",
    },
    {
      idx: "02",
      title: "Laser Structural Mapping",
      subtitle: "Prism Blueprinting",
      desc: "Inside our Chennai facility, high-precision lasers map the internal crystal lattice to identify grain lines. 3D models simulate facet layouts to maximize refractive return before cutting.",
      image: "/laser_mapping.png",
    },
    {
      idx: "03",
      title: "The Faceting Polishing",
      subtitle: "Ancestral Precision",
      desc: "Traditional iron wheels covered in diamond dust are used to align facets. Each brilliant segment is placed at precise angles to create a prism.",
      image: "/diamond_polishing.png",
    },
    {
      idx: "04",
      title: "Setting the Prongs",
      subtitle: "Flawless Metallurgy",
      desc: "Platinum claws are burnished and rounded over the girdle using micro-pushers. This balances physical security and ambient light access.",
      image: "/prong_setting.png",
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#0E0C0A] text-[#FAF7F2] overflow-x-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-[#C9A84C]/4 rounded-full blur-[160px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        className="max-w-4xl mx-auto text-left pt-[180px] px-6 md:px-12 space-y-6 relative z-10"
      >
        <div className="badge-gold">
          <Sparkles className="w-3.5 h-3.5 text-[#C9A84C]" />
          <span className="text-[10px] tracking-[0.2em] uppercase text-[#C9A84C] font-bold">The Craft Process</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-light text-[#FAF7F2] leading-tight">
          From Rough Stone<br />
          <span className="font-display italic gold-gradient-text text-glow-gold">To Masterpiece</span>
        </h1>
        <p className="text-[#C4BAB0] font-light text-sm max-w-xl leading-relaxed">
          Scroll down to experience how we take raw carbon lattices and shape them into brilliant solitaire creations.
        </p>
      </motion.div>

      <div ref={triggerRef} className="w-full relative min-h-screen flex items-center overflow-hidden">
        <div ref={containerRef} className="flex h-[75vh] flex-nowrap w-[400vw] z-10">
          {steps.map((step, idx) => (
            <div key={idx} className="craft-panel w-screen h-full shrink-0 flex items-center justify-center px-6 md:px-24">
              <div className="glass-panel luxury-shadow w-full max-w-5xl h-full rounded-3xl p-8 md:p-12 border border-[#C9A84C]/10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative overflow-hidden group">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] h-[50%] bg-[#C9A84C]/3 blur-[140px] pointer-events-none" />
                <div className="lg:col-span-6 text-left space-y-6 z-10">
                  <div className="flex items-center justify-between border-b border-[#C9A84C]/10 pb-4">
                    <span className="text-5xl font-light text-[#C9A84C] font-display">{step.idx}</span>
                    <span className="text-[10px] tracking-widest text-[#7A6E66] uppercase font-bold">{step.subtitle}</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-light text-[#FAF7F2]">{step.title}</h3>
                  <p className="text-sm text-[#C4BAB0] font-light leading-relaxed">{step.desc}</p>
                </div>
                <div className="lg:col-span-6 h-full min-h-[260px] bg-[#0A0806]/60 rounded-2xl border border-[#C9A84C]/8 flex items-center justify-center relative overflow-hidden z-10">
                  <img src={step.image} alt={step.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s]" loading="lazy" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 3. THE ART OF MAKING FEATURE SHOWCASE (Making ft. Viikram) ── */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto z-10 relative">
        <div className="space-y-12 text-center">
          <div className="badge-gold w-fit mx-auto">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A84C]" />
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#C9A84C] font-bold">Artisan Heritage</span>
          </div>
          <div className="space-y-4 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-light text-[#FAF7F2] leading-tight">
              The Making Process<br />
              <span className="font-display italic gold-gradient-text text-glow-gold">featuring Viikram</span>
            </h2>
            <p className="text-[#C4BAB0] font-light text-sm leading-relaxed max-w-xl mx-auto">
              A behind-the-scenes visual journey inside our master workshop. Observe the meticulous craftsmanship, detailing, and passion that goes into creating every bespoke piece of fine jewellery.
            </p>
          </div>
          
          {/* Grid Layout for the 8 Making Process Images */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-8">
            {[
              { url: "/Making ft. Viikram/1.png", title: "Select Gold Inspection" },
              { url: "/Making ft. Viikram/2.png", title: "Lost Wax Casting Preparation" },
              { url: "/Making ft. Viikram/3.png", title: "Micro-Pave Diamond Sorting" },
              { url: "/Making ft. Viikram/4.png", title: "Precision Hand Mounting" },
              { url: "/Making ft. Viikram/5.png", title: "Master Bench Alignment" },
              { url: "/Making ft. Viikram/6.png", title: "Mirror Finish Buffing" },
              { url: "/Making ft. Viikram/7.png", title: "Prong Setting Under Microscope" },
              { url: "/Making ft. Viikram/8.png", title: "Final Quality Assurance Review" },
            ].map((img, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group relative rounded-2xl overflow-hidden border border-[#C9A84C]/10 bg-[#14110F] aspect-square flex items-center justify-center shadow-lg hover:border-[#C9A84C]/35 transition-all duration-500"
              >
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-out"
                  loading="lazy"
                />
                {/* Elegant overlay hover gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-5 text-left" >
                  <div className="space-y-1">
                    <span className="text-[8.5px] uppercase tracking-widest text-[#C9A84C] font-bold">Phase 0{index + 1}</span>
                    <h4 className="text-xs font-semibold text-white tracking-wide">{img.title}</h4>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-24 max-w-4xl mx-auto px-6 md:px-12 text-center space-y-6 relative z-10"
      >
        <div className="w-12 h-12 rounded-xl bg-[#C9A84C]/8 border border-[#C9A84C]/15 flex items-center justify-center mx-auto">
          <Cpu className="w-5 h-5 text-[#C9A84C]" />
        </div>
        <h3 className="text-2xl font-light text-[#FAF7F2]">Certified Workshop Facilities</h3>
        <p className="text-sm text-[#7A6E66] max-w-md mx-auto leading-relaxed">
          Our processes adhere to international labor and safety standards, verifying both gemmological quality and ethical workspace conditions.
        </p>
      </motion.div>
    </div>
  );
}
