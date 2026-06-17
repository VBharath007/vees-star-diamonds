"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Heart, Compass, Gem, Eye, Play, Pause, Volume2, VolumeX, ChevronLeft, ChevronRight } from "lucide-react";
import dynamic from "next/dynamic";
const CinematicScroll = dynamic(() => import("../components/CinematicScroll"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen bg-black flex flex-col items-center justify-center text-[#FAF7F2]">
      <div className="w-10 h-10 border border-[#C9A84C] border-t-transparent rounded-full animate-spin mb-4" />
      <span className="text-[10px] tracking-[0.25em] text-[#C9A84C]/50 uppercase font-bold">
        Loading Campaign...
      </span>
    </div>
  )
});
import ThreeDImageCarousel from "../components/ThreeDImageCarousel";

const WHEEL_ITEMS = [
  {
    index: 0,
    title: "Celestial Marquise Band",
    year: "2026",
    desc: "An ultra-premium marquise-cut diamond set in a modern channel platinum band.",
    image: "/Product images/12.png",
  },
  {
    index: 1,
    title: "Imperial Pear Solitaire",
    year: "2026",
    desc: "A stunning pear-shaped solitaire suspended in an elegant three-prong white gold mounting.",
    image: "/Product images/13.png",
  },
  {
    index: 2,
    title: "Classic Eternity Ring",
    year: "2026",
    desc: "A continuous circle of brilliant round cut diamonds set in masterfully crafted gold alloys.",
    image: "/Product images/14.png",
  },
  {
    index: 3,
    title: "Blush Regency Halo",
    year: "2026",
    desc: "A radiant cut diamond halo design surrounded by micro-paved brilliant diamonds.",
    image: "/Product images/20.png",
  },
];

export default function HomeClient() {
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [isMuted, setIsMuted] = React.useState(true);
  const videoRef = React.useRef(null);
  
  const [activeWheelIndex, setActiveWheelIndex] = React.useState(0);

  const prevWheelItem = () => {
    setActiveWheelIndex((prev) => (prev - 1 + WHEEL_ITEMS.length) % WHEEL_ITEMS.length);
  };

  const nextWheelItem = () => {
    setActiveWheelIndex((prev) => (prev + 1) % WHEEL_ITEMS.length);
  };


  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          if (err.name !== "AbortError") {
            console.log(err);
          }
        });
      }
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };
  const teasers = [
    {
      title: "Our Heritage & Standards",
      tag: "The 7 C's Gemmology",
      desc: "Learn our unique grading metrics, GIA certification standards, and how we select D-color flawless raw gemstones.",
      href: "/about",
      icon: Gem,
    },
    {
      title: "South Indian Symmetries",
      tag: "Karaikudi Temple Roots",
      desc: "Examine our multi-generational Chennai casting workshop, using architectural design ratios for diamond mounts.",
      href: "/karaikudi",
      icon: Compass,
    },
    {
      title: "Bespoke 3D Configurator",
      tag: "Interactive Live Builder",
      desc: "Customize metal settings, carat weights, and cut geometry. Instantly visualize your bespoke piece in WebGL.",
      href: "/custom-build",
      icon: Sparkles,
    },
    {
      title: "Signature Editions",
      tag: "High Jewellery Solitaire Collection",
      desc: "Explore finished works including the Adora and Sovereign Drop signature diamond rings.",
      href: "/solitaires",
      icon: Eye,
    },
  ];

  const testimonials = [
    {
      quote:
        "Vees Star crafted our family's custom solitaire ring. The 3D preview matched the final custom gold mounting.",
      author: "Surya, Chennai",
    },
    {
      quote:
        "The GIA certified D-color emerald step ring exceeds our expectations. A masterclass in craftsmanship.",
      author: "Shiva, Mumbai",
    },
    {
      quote:
        "Their Madras workshop's burnishing renders a level of gold reflection I have never seen elsewhere.",
      author: "Shankar, Bangalore",
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 32 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.08, duration: 0.55, ease: [0.4, 0, 0.2, 1] },
    }),
  };

  return (
    <div className="relative min-h-screen bg-[#0E0C0A] text-[#FAF7F2]">

      {/* ── 1. CINEMATIC HERO ── */}
      <CinematicScroll />

      {/* ── 1.5. BRAND VISION & HERITAGE ── */}
      <section className="py-28 border-t border-[#C9A84C]/8 relative overflow-hidden bg-[#0E0C0A]">
        {/* Ambient radial glow */}
        <div className="absolute -top-20 right-[10%] w-[600px] h-[400px] bg-[#C9A84C]/4 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-20 left-[5%] w-[500px] h-[350px] bg-[#C9A84C]/3 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-20 relative z-10">

          {/* Main Intro */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
              className="lg:col-span-5 space-y-4 text-left"
            >
              <span className="text-[9px] uppercase tracking-[0.35em] text-[#C9A84C] font-bold block">
                The Legacy House
              </span>
              <h2 className="text-4xl md:text-5xl font-light text-[#FAF7F2] leading-tight">
                Vees Star
                <br />
                <span className="font-display italic gold-gradient-text">
                  Diamonds & Jewellery
                </span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
              className="lg:col-span-7 text-left"
            >
              <p className="text-sm md:text-base text-[#C4BAB0] font-light leading-relaxed">
                Discover the unique universe of Vees Star Diamonds and Jewellery's extravagant pieces.
                As we harmoniously combine our ancestral and modern knowledge of diamonds and expertise
                in the design of fine jewellery, we are able to create and craft extraordinary pieces,
                as you've never seen before. Vees Star challenges the potential and beauty of diamonds
                to break the barriers, delivering rare and unparalleled grandeur and grace.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

            {/* Left Box: Vision & Story */}
            <motion.div
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
              className="lg:col-span-7 flex flex-col justify-between space-y-8 glass-panel p-8 md:p-10 rounded-3xl border border-[#C9A84C]/8 relative overflow-hidden text-left shadow-xl"
            >
              {/* Corner accent glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#C9A84C]/4 to-transparent pointer-events-none" />

              <div className="space-y-6">
                <div className="space-y-2.5">
                  <span className="text-[9px] uppercase tracking-widest text-[#C9A84C] font-bold block">
                    Our Vision
                  </span>
                  <p className="text-base font-light text-[#FAF7F2] leading-relaxed">
                    Our vision for Vees Star Diamonds and Jewellery is to revolutionize the way customers look at fine jewellery and to normalize the option of customization.
                  </p>
                </div>

                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.35, ease: [0.4, 0, 0.2, 1] }}
                  style={{ originX: 0 }}
                  className="w-16 h-px bg-[#C9A84C]/25"
                />

                <div className="space-y-2.5">
                  <span className="text-[9px] uppercase tracking-widest text-[#7A6E66] font-bold block">
                    Company Story
                  </span>
                  <p className="text-xs text-[#C4BAB0] font-light leading-relaxed">
                    Vees Star Diamonds & Jewellery is a fascinating story of how dedication and proper planning and careful execution can give business success through customer satisfaction retention. Vision of Vees Star - giving exquisite diamonds at unbelievable prices. And the Company is certainly marching in the right direction.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right Box: Key Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.65, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
              className="lg:col-span-5 flex flex-col justify-between glass-panel p-8 md:p-10 rounded-3xl border border-[#C9A84C]/8 text-left shadow-xl relative overflow-hidden"
            >
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tr from-[#C9A84C]/3 to-transparent pointer-events-none" />

              <div className="space-y-8 h-full flex flex-col justify-center">
                <span className="text-[9px] uppercase tracking-widest text-[#C9A84C] font-bold block">
                  Key Highlights
                </span>

                <div className="space-y-6">
                  {[
                    "Our artistic and functional designs blend in to emerge as an epitome of fine jewellery",
                    "Every diamond in the boutique is elite and hand picked",
                    "Our diamonds are cut to exemplary standards"
                  ].map((highlight, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -18 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.25 + idx * 0.12, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                      className="flex items-start space-x-3.5"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#C9A84C]/8 border border-[#C9A84C]/15 flex items-center justify-center shrink-0 mt-0.5">
                        <Sparkles className="w-4 h-4 text-[#C9A84C]" />
                      </div>
                      <p className="text-xs md:text-sm text-[#C4BAB0] font-light leading-relaxed">
                        {highlight}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* ── 1.7. THE CAMPAIGN: VEES MUSE ── */}
      <section className="py-28 border-t border-[#C9A84C]/8 relative overflow-hidden bg-[#0E0C0A]">
        {/* Subtle decorative glow */}
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#C9A84C]/3 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Col: Text Copy (5 Columns) */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
              className="lg:col-span-5 text-left space-y-6"
            >
              <div className="badge-gold">
                <Sparkles className="w-3.5 h-3.5 text-[#C9A84C]" />
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#C9A84C] font-bold">Lookbook 2026</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-light text-[#FAF7F2] leading-tight">
                The Vees Star<br />
                <span className="font-display italic gold-gradient-text font-semibold">
                  Muse Campaign
                </span>
              </h2>
              
              <p className="text-sm md:text-base text-[#C4BAB0] font-light leading-relaxed">
                Experience a sensory journey of light, beauty, and absolute precision. 
                Our brand new campaign illustrates GIA-certified diamond solitaires 
                as they interact with ambient illumination. Crafted by our multi-generational 
                Chennai casting workshop in absolute alignment with sacred architectural geometries.
              </p>

              <div className="w-16 h-px bg-[#C9A84C]/25" />

              <div className="flex flex-col sm:flex-row items-start gap-4">
                <Link
                  href="/gallery"
                  className="px-8 py-3.5 bg-[#C9A84C] hover:bg-[#E8D5A0] text-[#0E0C0A] text-xs tracking-widest uppercase font-extrabold rounded-md shadow-lg transition-luxury inline-flex items-center space-x-2 cursor-pointer"
                >
                  <span>Explore Lookbook</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/gallery"
                  className="px-8 py-3.5 border border-[#C9A84C]/20 hover:border-[#C9A84C] text-[#C4BAB0] hover:text-[#FAF7F2] text-xs tracking-widest uppercase font-bold rounded-md hover:bg-[#C9A84C]/6 transition-luxury cursor-pointer"
                >
                  Watch Campaign Films
                </Link>
              </div>
            </motion.div>

            {/* Right Col: Media & Look Overlays (7 Columns) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
              className="lg:col-span-7 relative w-full aspect-video sm:aspect-[16/10] lg:aspect-auto lg:h-[480px] bg-black/30 rounded-3xl border border-[#C9A84C]/10 overflow-hidden flex items-center justify-center group luxury-shadow"
            >
              {/* HTML5 video element */}
              <video
                ref={videoRef}
                src="/Vees Star Final.mp4"
                className="w-full h-full object-cover"
                autoPlay
                muted={isMuted}
                loop
                playsInline
                preload="metadata"
              />

              {/* Black overlay on hover */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300 pointer-events-none" />

              {/* Custom Controller Overlays */}
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between z-20">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={togglePlay}
                    className="p-2.5 rounded-full bg-[#0E0C0A]/80 backdrop-blur-md border border-[#C9A84C]/25 text-[#FAF7F2] hover:text-[#C9A84C] hover:border-[#C9A84C] transition-all cursor-pointer"
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                  </button>
                  <button
                    onClick={toggleMute}
                    className="p-2.5 rounded-full bg-[#0E0C0A]/80 backdrop-blur-md border border-[#C9A84C]/25 text-[#FAF7F2] hover:text-[#C9A84C] hover:border-[#C9A84C] transition-all cursor-pointer"
                  >
                    {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <Link 
                  href="/gallery"
                  className="flex items-center space-x-2 bg-[#0E0C0A]/80 backdrop-blur-md border border-[#C9A84C]/20 px-4 py-2.5 rounded-full text-[9px] uppercase tracking-widest text-[#C9A84C] font-extrabold hover:bg-[#C9A84C] hover:text-[#0E0C0A] transition-all shadow-lg cursor-pointer"
                >
                  <span>Interactive Gallery</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>


             </motion.div>

          </div>
        </div>
      </section>

      {/* ── 1.8. DYNAMIC CIRCULAR WHEEL GALLERY ── */}
      <section className="py-28 border-t border-[#C9A84C]/8 relative overflow-hidden bg-[#0E0C0A]">
        {/* Decorative background glow */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-[#C9A84C]/4 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Brand & Active Info */}
            <div className="lg:col-span-5 text-left space-y-8 flex flex-col justify-between h-full min-h-[480px]">
              <div className="space-y-6">
                {/* Brand Monogram */}
                <div className="flex items-center space-x-2">
                  <span className="font-display italic text-3xl md:text-4xl text-[#C9A84C] font-light tracking-wide">
                    VS
                  </span>
                </div>

                <div className="w-16 h-px bg-[#C9A84C]/25" />

                {/* Main Dynamic Display */}
                <div className="space-y-4">
                  <span className="text-5xl md:text-6xl font-light text-white tracking-wide block font-display">
                    {WHEEL_ITEMS[activeWheelIndex].year}
                  </span>
                  <span className="text-xs tracking-[0.25em] uppercase text-[#C9A84C] font-extrabold block">
                    {WHEEL_ITEMS[activeWheelIndex].title}
                  </span>
                  <div className="w-24 h-px bg-[#C9A84C]/25" />
                  <p className="text-xs md:text-sm text-[#C4BAB0] font-light leading-relaxed max-w-sm">
                    {WHEEL_ITEMS[activeWheelIndex].desc}
                  </p>
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={prevWheelItem}
                  className="p-3.5 rounded-full border border-[#C9A84C]/20 hover:border-[#C9A84C] text-[#C4BAB0] hover:text-[#C9A84C] hover:bg-[#C9A84C]/5 transition-all cursor-pointer"
                  aria-label="Previous Item"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <div className="flex items-center space-x-1 text-[10px] tracking-widest text-[#7A6E66] font-bold uppercase">
                  <span className="text-[#C9A84C]">
                    {String(activeWheelIndex + 1).padStart(2, "0")}
                  </span>
                  <span>/</span>
                  <span>{String(WHEEL_ITEMS.length).padStart(2, "0")}</span>
                </div>
                <button
                  onClick={nextWheelItem}
                  className="p-3.5 rounded-full border border-[#C9A84C]/20 hover:border-[#C9A84C] text-[#C4BAB0] hover:text-[#C9A84C] hover:bg-[#C9A84C]/5 transition-all cursor-pointer"
                  aria-label="Next Item"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Contact Footer Info */}
              <div className="space-y-3 pt-6 border-t border-[#C9A84C]/10 text-[9px] tracking-[0.2em] uppercase text-[#7A6E66] font-bold leading-relaxed">
                <div>
                  <span className="text-[#C9A84C] block mb-0.5">Contact Info</span>
                  <span className="text-[#C4BAB0] font-light">+91 93830 07477 / +91 98848 56057</span>
                </div>
                <div>
                  <span className="text-[#C9A84C] block mb-0.5">Email</span>
                  <span className="text-[#C4BAB0] font-light text-neutral-300">vsdjbusiness@gmail.com</span>
                </div>
                <div>
                  <span className="text-[#C9A84C] block mb-0.5">Showroom Location</span>
                  <span className="text-[#C4BAB0] font-light text-neutral-300">CATHEDRAL ROAD, CHENNAI</span>
                </div>
              </div>
            </div>

            {/* Right Column: 3D Cascade Carousel Showcase */}
            <div className="lg:col-span-7 flex items-center justify-center relative min-h-[380px] sm:min-h-[500px] lg:min-h-[600px] w-full overflow-hidden">
              <ThreeDImageCarousel
                slides={WHEEL_ITEMS.map((item) => ({
                  id: item.index,
                  src: item.image,
                  href: "#",
                }))}
                itemCount={3}
                autoplay={true}
                delay={4.5}
                activeIndex={activeWheelIndex}
                onActiveChange={(index) => setActiveWheelIndex(index)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. SHOWROOM DIRECTORY ── */}
      <section
        id="showroom"
        className="py-28 border-t border-[#C9A84C]/8 relative scroll-mt-24 overflow-hidden bg-[#0E0C0A]"
      >
        {/* Ambient radial glow */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#C9A84C]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16 relative z-10">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-4"
          >
            <div className="space-y-3">
              <span className="text-[9px] uppercase tracking-[0.35em] text-[#C9A84C] font-bold block">
                The Showroom Directory
              </span>
              <h2 className="text-3xl md:text-4xl font-light text-[#FAF7F2]">
                Experience Our{" "}
                <span className="font-display italic gold-gradient-text">
                  Brand Architecture
                </span>
              </h2>
            </div>
            <span className="text-[10px] uppercase tracking-widest text-[#7A6E66] font-bold border border-[#C9A84C]/15 px-4 py-2 rounded-full self-start md:self-auto">
              Est. 1978 · Karaikudi
            </span>
          </motion.div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teasers.map((teaser, idx) => {
              const IconComp = teaser.icon;
              return (
                <motion.div
                  key={idx}
                  custom={idx}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                >
                  <Link
                    href={teaser.href}
                    className="shimmer-card luxury-shadow luxury-shadow-hover glass-panel p-7 rounded-2xl border border-[#C9A84C]/8 hover:border-[#C9A84C]/25 transition-luxury flex flex-col justify-between text-left space-y-6 group cursor-pointer h-full"
                  >
                    {/* Icon */}
                    <div className="space-y-5">
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#C9A84C]/10 to-[#C9A84C]/3 border border-[#C9A84C]/15 flex items-center justify-center group-hover:from-[#C9A84C]/20 transition-luxury">
                        <IconComp className="w-5 h-5 text-[#7A6E66] group-hover:text-[#C9A84C] transition-luxury" />
                      </div>
                      <div>
                        <span className="text-[8px] uppercase tracking-widest text-[#C9A84C] font-bold block mb-1.5">
                          {teaser.tag}
                        </span>
                        <h4 className="text-base font-semibold text-[#FAF7F2] group-hover:text-[#E8D5A0] transition-luxury leading-snug">
                          {teaser.title}
                        </h4>
                      </div>
                      <p className="text-xs text-[#C4BAB0] font-light leading-relaxed">
                        {teaser.desc}
                      </p>
                    </div>

                    {/* Footer CTA */}
                    <div className="flex items-center space-x-2 text-[10px] text-[#7A6E66] font-bold uppercase tracking-wider group-hover:text-[#C9A84C] transition-luxury pt-4 border-t border-[#C9A84C]/8">
                      <span>Explore Route</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 3. TRUST BAR ── */}
      <section className="py-10 border-t border-b border-[#C9A84C]/8 bg-[#181410]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "GIA Certified", label: "Every Diamond" },
              { value: "Est. 1978", label: "Karaikudi Legacy" },
              { value: "D–F Color", label: "Exclusive Grade" },
              { value: "PT950 & 18K", label: "Metal Standards" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                className="space-y-1"
              >
                <p className="font-display italic gold-gradient-text text-xl tracking-tight">
                  {stat.value}
                </p>
                <p className="text-[10px] uppercase tracking-widest text-[#7A6E66] font-bold">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. TESTIMONIALS ── */}
      <section
        id="testimonials"
        className="py-28 border-t border-[#C9A84C]/8 scroll-mt-28 overflow-hidden relative bg-[#0E0C0A]"
      >
        <div className="absolute bottom-0 right-0 w-[500px] h-[300px] bg-[#C9A84C]/4 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
            className="text-center space-y-3"
          >
            <span className="text-[9px] uppercase tracking-[0.35em] text-[#C9A84C] font-bold block">
              Verified Opinions
            </span>
            <h2 className="text-3xl md:text-4xl font-light text-[#FAF7F2]">
              Clients of{" "}
              <span className="font-display italic gold-gradient-text">Vees Star</span>
            </h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
              style={{ originX: 0.5 }}
              className="gold-divider mt-4"
            />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {testimonials.map((t, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.1, duration: 0.55 }}
                className="shimmer-card glass-panel luxury-shadow p-8 rounded-2xl border border-[#C9A84C]/8 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <span className="font-display text-6xl leading-none text-[#C9A84C]/15 select-none">
                    &ldquo;
                  </span>
                  <p className="text-sm text-[#C4BAB0] font-light italic leading-relaxed -mt-6">
                    {t.quote}
                  </p>
                </div>
                <div className="border-t border-[#C9A84C]/8 pt-4 flex items-center space-x-2">
                  <Heart className="w-3.5 h-3.5 text-[#C9A84C] shrink-0" />
                  <span className="text-[10px] uppercase tracking-widest text-[#7A6E66] font-bold">
                    {t.author}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. FINAL CTA ── */}
      <section className="py-28 border-t border-[#C9A84C]/8 relative overflow-hidden bg-[#181410]">
        {/* Decorative floating particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-12 left-[10%] w-1.5 h-1.5 rounded-full bg-[#C9A84C]/30 particle-float" />
          <div className="absolute top-24 left-[20%] w-1 h-1 rounded-full bg-[#C9A84C]/20 particle-float particle-float-delay-1" />
          <div className="absolute top-8 right-[15%] w-2 h-2 rounded-full bg-[#C9A84C]/15 particle-float particle-float-delay-2" />
          <div className="absolute bottom-16 left-[30%] w-1 h-1 rounded-full bg-[#C9A84C]/25 particle-float particle-float-delay-3" />
          <div className="absolute bottom-8 right-[25%] w-1.5 h-1.5 rounded-full bg-[#C9A84C]/20 particle-float particle-float-delay-1" />
          <div className="absolute top-1/2 left-[5%] w-1 h-1 rounded-full bg-[#C9A84C]/30 particle-float particle-float-delay-2" />
        </div>
        {/* Radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_50%,rgba(201,168,76,0.06),transparent)] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center space-y-10 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            className="space-y-6"
          >
            <h2 className="text-4xl md:text-6xl font-light text-[#FAF7F2] leading-tight">
              Some Diamonds Shine.
              <br />
              <span className="font-display italic gold-gradient-text">
                Some Become History.
              </span>
            </h2>
            <p className="text-[#C4BAB0] font-light text-sm max-w-md mx-auto leading-relaxed">
              Unlock your custom gemstone legacy. Book an appointment online or
              consult with our master gemmologists on Cathedral Road, Chennai.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/contact"
              className="gold-pulse-ring relative px-10 py-4 bg-[#C9A84C] hover:bg-[#E8D5A0] text-[#0E0C0A] text-xs tracking-widest uppercase font-extrabold rounded-md shadow-lg transition-luxury inline-block cursor-pointer"
            >
              Request Private Consultation
            </Link>
            <Link
              href="/custom-build"
              className="px-10 py-4 border border-[#C9A84C]/25 hover:border-[#C9A84C] text-[#C4BAB0] hover:text-[#FAF7F2] text-xs tracking-widest uppercase font-bold rounded-md hover:bg-[#C9A84C]/8 transition-luxury inline-block cursor-pointer"
            >
              Configure Ring
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
