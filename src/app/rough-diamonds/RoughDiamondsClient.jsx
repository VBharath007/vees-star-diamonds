"use client";
import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Map, ScanEye, ShieldCheck } from "lucide-react";

export default function RoughDiamondsClient() {
  return (
    <div className="relative min-h-screen text-[#FAF7F2] pt-[180px] pb-24 px-6 md:px-12 overflow-hidden">
      {/* Ambient Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C9A84C]/4 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#C9A84C]/3 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto space-y-24 relative z-10">
        
        {/* ── Header ── */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          className="text-center space-y-6 max-w-3xl mx-auto"
        >
          <div className="badge-gold w-fit mx-auto">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A84C]" />
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#C9A84C] font-bold">Uncut Brilliance</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-light text-[#FAF7F2] leading-tight">
            Rough <span className="font-display italic gold-gradient-text">Diamonds</span>
          </h1>
          <p className="text-[#C4BAB0] font-light text-base md:text-lg leading-relaxed">
            All rough diamonds are studies in potential. Our job is to make the absolute most of that potential.
          </p>
          <div className="gold-divider mx-auto" />
        </motion.div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-2xl mx-auto rounded-3xl overflow-hidden border border-[#C9A84C]/15 bg-[#14110F] aspect-video md:aspect-[21/10] relative group shadow-2xl"
        >
          <img
            src="/rough daimond/CLEAR FACETS ROUGH (42).webp"
            alt="Rough Diamond Masterpiece"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s] ease-out"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-8">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#C9A84C] font-bold">Unveiling Potential</span>
          </div>
        </motion.div>

        {/* ── Content Blocks ── */}
        <div className="space-y-20">
          
          {/* Block 1: Sourcing */}
          <motion.div 
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            <div className="lg:col-span-4 space-y-4 text-left">
               <span className="text-[10px] tracking-[0.32em] uppercase text-[#C9A84C] font-semibold">
                 01 / Origins
               </span>
               <h2 className="text-3xl font-light text-[#FAF7F2] leading-tight">
                 The <em className="italic text-[#C9A84C] not-italic" style={{ fontStyle: "italic" }}>Kimberly</em> Standard
               </h2>
               <p className="text-[#C4BAB0] text-sm leading-relaxed font-light">
                 Ensuring conflict-free origins allows us to confidently pass on a legacy of purity to our clients.
               </p>
            </div>
            
            <div className="lg:col-span-4 glass-panel luxury-shadow p-8 rounded-3xl border border-[#C9A84C]/10 flex flex-col justify-center min-h-[280px] relative overflow-hidden text-left">
               <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#C9A84C]/5 to-transparent pointer-events-none" />
               <ShieldCheck className="w-8 h-8 text-[#C9A84C] mb-4" />
               <h3 className="text-xl font-light text-[#FAF7F2] mb-3">Ethical Sourcing</h3>
               <p className="text-[#C4BAB0] text-xs leading-relaxed font-light">
                 We are the first diamond jewellery manufacturer in South India to import rough diamonds via the Kimberly Process. We specialize in rough diamond sourcing and we follow the highest industry standards.
               </p>
            </div>

            <div className="lg:col-span-4 rounded-3xl overflow-hidden border border-[#C9A84C]/10 bg-[#14110F] aspect-[4/3] lg:aspect-square relative group shadow-lg">
              <img
                src="/Product images/19.png"
                alt="Ethical Sourcing Origins"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
                loading="lazy"
              />
            </div>
          </motion.div>

          {/* Block 2: Craftsmanship */}
          <motion.div 
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            <div className="lg:col-span-4 order-3 lg:order-1 rounded-3xl overflow-hidden border border-[#C9A84C]/10 bg-[#14110F] aspect-[4/3] lg:aspect-square relative group shadow-lg">
              <img
                src="/Product images/3.jpg"
                alt="Surat Polishing Center Craftsmanship"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
                loading="lazy"
              />
            </div>

            <div className="lg:col-span-4 order-1 lg:order-2 space-y-4 text-left">
               <span className="text-[10px] tracking-[0.32em] uppercase text-[#C9A84C] font-semibold">
                 02 / Polishing
               </span>
               <h2 className="text-3xl font-light text-[#FAF7F2] leading-tight">
                 Nature & <em className="italic text-[#C9A84C] not-italic" style={{ fontStyle: "italic" }}>Man</em>
               </h2>
               <p className="text-[#C4BAB0] text-sm leading-relaxed font-light">
                 Our diamond is the result of a close collaboration between nature and man: after nature provides the raw material, our craftsmen use their skill and sheer love for their work to produce a stone expertly cut and polished to reveal its brilliance.
               </p>
            </div>

            <div className="lg:col-span-4 order-2 lg:order-3 glass-panel luxury-shadow p-8 rounded-3xl border border-[#C9A84C]/10 flex flex-col justify-center min-h-[280px] relative overflow-hidden text-left">
               <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-[#C9A84C]/5 to-transparent pointer-events-none" />
               <Map className="w-8 h-8 text-[#C9A84C] mb-4" />
               <h3 className="text-xl font-light text-[#FAF7F2] mb-3">Surat Polishing Center</h3>
               <p className="text-[#C4BAB0] text-xs leading-relaxed font-light">
                 We manufacture our diamonds in a highly specialized polishing center in Surat, India.
               </p>
            </div>
          </motion.div>

          {/* Block 3: Traceability */}
          <motion.div 
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            <div className="lg:col-span-4 glass-panel luxury-shadow p-8 rounded-3xl border border-[#C9A84C]/10 flex flex-col justify-center min-h-[280px] relative overflow-hidden text-left">
               <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#C9A84C]/5 to-transparent pointer-events-none" />
               <ScanEye className="w-8 h-8 text-[#C9A84C] mb-4" />
               <h3 className="text-xl font-light text-[#FAF7F2] mb-3">100% Traceable</h3>
               <p className="text-[#C4BAB0] text-xs leading-relaxed font-light">
                 Our factory has been designed and built so we can offer our customers a process that's completely traceable, from start to finish, for each and every stone. Our manufacturing is scrupulously monitored by internal systems that record everything from the moment we receive the rough diamonds.
               </p>
            </div>

            <div className="lg:col-span-4 rounded-3xl overflow-hidden border border-[#C9A84C]/10 bg-[#14110F] aspect-[4/3] lg:aspect-square relative group shadow-lg">
              <img
                src="/Product images/5.png"
                alt="Traceable Diamond Custody"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
                loading="lazy"
              />
            </div>

            <div className="lg:col-span-4 space-y-4 text-left">
               <span className="text-[10px] tracking-[0.32em] uppercase text-[#C9A84C] font-semibold">
                 03 / Trust
               </span>
               <h2 className="text-3xl font-light text-[#FAF7F2] leading-tight">
                 Sight Unseen, <em className="italic text-[#C9A84C] not-italic" style={{ fontStyle: "italic" }}>Recorded</em>
               </h2>
               <p className="text-[#C4BAB0] text-sm leading-relaxed font-light">
                 Why would you ever let something so beautiful out of your sight? We ensure an unbroken chain of custody for complete peace of mind.
               </p>
            </div>
          </motion.div>

        </div>

        {/* ── ROUGH DIAMONDS GEOMETRY SHOWCASE ── */}
        <div className="space-y-12 pt-16">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <div className="badge-gold w-fit mx-auto">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A84C]" />
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#C9A84C] font-bold">Nature's Art</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-light text-[#FAF7F2]">
              The Geometry Of <span className="font-display italic gold-gradient-text">Uncut Diamonds</span>
            </h2>
            <p className="text-sm text-[#C4BAB0] font-light leading-relaxed max-w-xl mx-auto">
              Observe the raw octahedral shape, crystalline structures, and natural facets of our ethically imported rough stones before they undergo mapping and cutting.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                url: "/rough daimond/CLEAR FACETS ROUGH (1).webp",
                title: "Octahedral Crystal Form",
                desc: "Classic double-pyramid crystal form formed billions of years ago under extreme pressure."
              },
              {
                url: "/rough daimond/CLEAR FACETS ROUGH (30).webp",
                title: "Trigon Surface Growths",
                desc: "Triangular indentations on the rough facets that prove natural diamond growth."
              },
              {
                url: "/rough daimond/CLEAR FACETS ROUGH (31).webp",
                title: "Dodecahedral Raw Form",
                desc: "A rare 12-sided natural geometry exhibiting rounded faces and high clarity."
              },
              {
                url: "/rough daimond/CLEAR FACETS ROUGH (32).webp",
                title: "Ethically Sourced Octahedron",
                desc: "A pure, conflict-free rough diamond selected directly from official mines."
              },
              {
                url: "/rough daimond/CLEAR FACETS ROUGH (33).webp",
                title: "Crystalline Lattice Structure",
                desc: "Showing the clean growth grains that our lasers map before faceting begins."
              },
              {
                url: "/rough daimond/CLEAR FACETS ROUGH (42).webp",
                title: "Premium Uncut Specimen",
                desc: "A large-carat raw specimen demonstrating exceptional purity and surface lustre."
              },
            ].map((stone, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                whileHover={{ y: -6 }}
                className="group relative rounded-3xl overflow-hidden border border-[#C9A84C]/10 bg-[#14110F] aspect-[4/3] flex flex-col justify-end shadow-xl hover:border-[#C9A84C]/35 transition-all duration-500"
              >
                <img
                  src={stone.url}
                  alt={stone.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent transition-opacity duration-500" />
                <div className="relative z-10 p-6 space-y-1 text-left">
                  <span className="text-[8px] uppercase tracking-widest text-[#C9A84C] font-bold">
                    Raw Diamond Geometry
                  </span>
                  <h4 className="text-sm font-light text-white tracking-wide">
                    {stone.title}
                  </h4>
                  <p className="text-[10px] text-[#C4BAB0]/90 font-light leading-relaxed">
                    {stone.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
