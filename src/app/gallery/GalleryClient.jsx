"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, MessageSquare, Play, Pause, Volume2, VolumeX, Maximize, X, ArrowRight, Eye, ChevronLeft, ChevronRight, Grid, Camera, Heart } from "lucide-react";
import InfiniteWebGLScroll from "../../components/InfiniteWebGLScroll";

// 19 Model Images (The Campaign)
const CAMPAIGN_GALLERY_IMAGES = [
  "/Model images/1.jpg",
  "/Model images/2.jpg",
  "/Model images/3.jpg",
  "/Model images/4.png",
  "/Model images/5.png",
  "/Model images/6.png",
  "/Model images/7.png",
  "/Model images/8.png",
  "/Model images/9.png",
  "/Model images/10.png",
  "/Model images/11.png",
  "/Model images/12.png",
  "/Model images/13.png",
  "/Model images/14.png",
  "/Model images/15.png",
  "/Model images/16.png",
  "/Model images/17.png",
  "/Model images/18.png",
  "/Model images/19.png",
];

// Product Images from /Product images/
const PROJECT_GALLERY_IMAGES = [
  '/Product images/1.jpg', '/Product images/2.jpg', '/Product images/3.jpg',
  '/Product images/4.jpg', '/Product images/5.png', '/Product images/6.png',
  '/Product images/7.png', '/Product images/8.png', '/Product images/9.png',
  '/Product images/10.png', '/Product images/11.png', '/Product images/12.png',
  '/Product images/13.png', '/Product images/14.png', '/Product images/15.png',
  '/Product images/16.png', '/Product images/17.png', '/Product images/18.png',
  '/Product images/19.png', '/Product images/20.png', '/Product images/21.png',
  '/Product images/22.png', '/Product images/23.png', '/Product images/24.png',
];

// Lookbook items containing all 19 model images
const CAMPAIGN_ITEMS = [
  { id: "c1", type: "campaign", title: "The Sovereign Empress Solitaire", spec: "D Flawless // 3.5 Carat PT950 Platinum", url: "/Model images/1.jpg", aspect: "h-[340px]", desc: "A flawless D-color round brilliant diamond centerpiece, mounted on raw burnished platinum claws with sacred temple geometric proportions.", details: { color: "D Colorless", clarity: "Flawless (FL)", carat: "3.5 Carats", metal: "PT950 Platinum", cut: "Round Brilliant", cert: "GIA Laser Engraved" } },
  { id: "c2", type: "campaign", title: "Celestial Marquise Droplet", spec: "E VVS1 // 2.8 Carat 18K Champagne Gold", url: "/Model images/2.jpg", aspect: "h-[400px]", desc: "An elongated marquise solitaire featuring unmatched fire, suspended from a hand-twisted champagne gold loop structure.", details: { color: "E Rare White", clarity: "VVS1", carat: "2.8 Carats", metal: "18K Champagne Gold", cut: "Marquise Cut", cert: "GIA Certified" } },
  { id: "c3", type: "campaign", title: "Adora Cushion Halo Ring", spec: "D IF // 4.1 Carat Platinum Mount", url: "/Model images/3.jpg", aspect: "h-[320px]", desc: "A rare internally flawless cushion-cut diamond bordered by micro-paved brilliant diamonds, capturing ambient light at 58 angles.", details: { color: "D Colorless", clarity: "Internally Flawless (IF)", carat: "4.1 Carats (Total)", metal: "PT950 Platinum", cut: "Cushion Cut", cert: "GIA Certified" } },
  { id: "c4", type: "campaign", title: "Vees Star Muse Signature Set", spec: "D Flawless // High Jewellery Collection", url: "/Model images/4.png", aspect: "h-[380px]", desc: "A showcase set featuring a structured collar necklace and matching drops, representing the pinnacle of South Indian diamond casting heritage.", details: { color: "D Colorless", clarity: "Flawless", carat: "18.5 Carats Total", metal: "PT950 & 18K White Gold", cut: "Round & Pear Brilliant", cert: "GIA Registry Certified" } },
  { id: "c5", type: "campaign", title: "The Royal Oval Solitaire", spec: "F VVS2 // 3.0 Carat Rose Gold Base", url: "/Model images/5.png", aspect: "h-[350px]", desc: "An elegant oval diamond with excellent light return, held by ancestral double prongs on a minimal rose gold band.", details: { color: "F Exceptional", clarity: "VVS2 Clarity", carat: "3.0 Carats Solitaire", metal: "18K Rose Gold", cut: "Oval Cut", cert: "GIA Certified" } },
  { id: "c6", type: "campaign", title: "Aurelia Cascade Earrings", spec: "E Flawless // 4.6 Carat Total Weight", url: "/Model images/6.png", aspect: "h-[420px]", desc: "A waterfall cascade of round and marquise diamonds, engineered to sway gracefully and catch light with every micro-movement.", details: { color: "E Rare White", clarity: "Flawless (FL)", carat: "4.6 Carats Total Weight", metal: "18K White Gold", cut: "Multi-Cut Cascade", cert: "GIA Certified Pair" } },
  { id: "c7", type: "campaign", title: "Temple Symmetry Choker", spec: "E VVS1 // Handcrafted Gold Mounting", url: "/Model images/7.png", aspect: "h-[330px]", desc: "A structured chiseled gold mounting drawing inspiration from Chettinad temple pillars, embedded with GIA-graded solitaires.", details: { color: "E Rare White", clarity: "VVS1", carat: "9.2 Carats Total", metal: "18K Yellow Gold & Platinum", cut: "Round Brilliant Accents", cert: "GIA Certified" } },
  { id: "c8", type: "campaign", title: "Elysian Emerald Step Ring", spec: "D IF // 3.2 Carat GIA Solitaire", url: "/Model images/8.png", aspect: "h-[360px]", desc: "Emerald-cut solitaire showing infinite mirror-like steps of brilliance, mounted in a secure platinum bezel.", details: { color: "D Colorless", clarity: "Internally Flawless (IF)", carat: "3.2 Carats", metal: "PT950 Platinum", cut: "Emerald Step Cut", cert: "GIA Laser Registry" } },
  { id: "c9", type: "campaign", title: "The Empress Droplet Pendant", spec: "F IF // 2.5 Carat 18K White Gold", url: "/Model images/9.png", aspect: "h-[390px]", desc: "A classic drop pendant holding a pear-shaped solitaire of absolute transparency, hanging from an 18K white gold chain.", details: { color: "F Exceptional", clarity: "Internally Flawless (IF)", carat: "2.5 Carats Solitaire", metal: "18K White Gold", cut: "Pear Cut Solitaire", cert: "GIA Certified" } },
  { id: "c10", type: "campaign", title: "The Sovereign Solitaire Band", spec: "D Flawless // 2.0 Carat PT950", url: "/Model images/10.png", aspect: "h-[310px]", desc: "A sleek modern band highlighting a singular, flawless round diamond, burnished directly into the solid platinum shank.", details: { color: "D Colorless", clarity: "Flawless (FL)", carat: "2.0 Carats", metal: "PT950 Platinum", cut: "Round Brilliant", cert: "GIA Certified" } },
  { id: "c11", type: "campaign", title: "Aura Round Brilliant Halo", spec: "E VVS1 // 3.8 Carat Champagne Gold", url: "/Model images/11.png", aspect: "h-[370px]", desc: "A brilliant cut diamond surrounded by an intricate, hand-milled halo of diamond seed gems in rich champagne gold.", details: { color: "E Rare White", clarity: "VVS1", carat: "3.8 Carats Total", metal: "18K Champagne Gold", cut: "Round Brilliant Halo", cert: "GIA Certified" } },
  { id: "c12", type: "campaign", title: "Celestial Arch Drop Earrings", spec: "D IF // 5.2 Carat Diamond Drops", url: "/Model images/12.png", aspect: "h-[410px]", desc: "Dramatic, high-jewelry arch drop earrings featuring exceptional GIA solitaires for red-carpet grandeur.", details: { color: "D Colorless", clarity: "Internally Flawless (IF)", carat: "5.2 Carats Total", metal: "PT950 Platinum", cut: "Graduated Drop Cuts", cert: "GIA Certified Pair" } },
  { id: "c13", type: "campaign", title: "Lumina Pear-Cut Solitaire", spec: "E VVS2 // 2.7 Carat Platinum Prongs", url: "/Model images/13.png", aspect: "h-[340px]", desc: "A crisp pear-cut diamond featuring an optimal length-to-width ratio, secured by five signature platinum claws.", details: { color: "E Rare White", clarity: "VVS2 Clarity", carat: "2.7 Carats", metal: "PT950 Platinum", cut: "Pear Cut", cert: "GIA Certified" } },
  { id: "c14", type: "campaign", title: "The Seraphina Bridal Choker", spec: "D Flawless // Multi-Carat Masterpiece", url: "/Model images/14.png", aspect: "h-[430px]", desc: "A majestic custom bridal commission, featuring an array of calibrated marquise and pear diamonds forming a continuous web of light.", details: { color: "D Colorless", clarity: "Flawless (FL)", carat: "32.5 Carats Total", metal: "PT950 Platinum Claws", cut: "Marquise & Pear Lattice", cert: "GIA Custom Certified" } },
  { id: "c15", type: "campaign", title: "Sovereign Heritage Pendant", spec: "E IF // 3.4 Carat Karaikudi Setting", url: "/Model images/15.png", aspect: "h-[320px]", desc: "A heritage pendant highlighting traditional geometric engraving, housing a premium D-color solitaire gem.", details: { color: "E Rare White", clarity: "Internally Flawless (IF)", carat: "3.4 Carats", metal: "18K Yellow Gold & Platinum", cut: "Princess & Round Mix", cert: "GIA Certified" } },
  { id: "c16", type: "campaign", title: "Classic D-Flawless Studs", spec: "D Flawless // 2.0 Carat Each", url: "/Model images/16.png", aspect: "h-[360px]", desc: "Classic four-claw solitaire studs that optimize direct light access, guaranteeing unparalleled fire and scintillation.", details: { color: "D Colorless", clarity: "Flawless (FL)", carat: "4.0 Carats Total (2ct each)", metal: "PT950 Platinum Claws", cut: "Ideal Round Brilliant", cert: "GIA Dual Certified" } },
  { id: "c17", type: "campaign", title: "Radiant Princess Cut Band", spec: "F VVS1 // 3.1 Carat 18K Yellow Gold", url: "/Model images/17.png", aspect: "h-[380px]", desc: "A princess-cut diamond band featuring straight, clean geometric lines, nestled inside an 18K yellow gold setting.", details: { color: "F Exceptional", clarity: "VVS1", carat: "3.1 Carats Total", metal: "18K Yellow Gold", cut: "Princess Cut Channel", cert: "GIA Certified" } },
  { id: "c18", type: "campaign", title: "Vees Muse Tiara Band", spec: "D VVS1 // 4.5 Carat Platinum Crown", url: "/Model images/18.png", aspect: "h-[350px]", desc: "An architectural tiara ring shaped like a delicate crown, embedded with a row of graduated brilliant-cut solitaire gems.", details: { color: "D Colorless", clarity: "VVS1", carat: "4.5 Carats Total", metal: "PT950 Platinum", cut: "Crown Curve Faceted", cert: "GIA Certified" } },
  { id: "c19", type: "campaign", title: "The Sovereign Marquise Set", spec: "E IF // Bespoke Bridal Commission", url: "/Model images/19.png", aspect: "h-[390px]", desc: "An matching marquise ring and earring suite, custom-molded for an elite bridal commission in Chennai.", details: { color: "E Rare White", clarity: "Internally Flawless (IF)", carat: "8.4 Carats Suite Total", metal: "18K White Gold & Pt", cut: "Marquise Solitaire Suite", cert: "GIA Custom Set" } },
];

// Product Items from /Product images/
const PROJECT_ITEMS = [
  { id: "p1", type: "project", title: "Solitaire Diamond Ring I", spec: "D Flawless // Bespoke Commission", url: "/Product images/1.jpg", aspect: "h-[340px]", desc: "A masterfully crafted solitaire ring from our bespoke workshop, featuring a GIA-certified diamond in a precision platinum mount.", details: { color: "D Colorless", clarity: "Flawless (FL)", carat: "2.1 Carats", metal: "PT950 Platinum", cut: "Round Brilliant", cert: "GIA Laser Registry" } },
  { id: "p2", type: "project", title: "Solitaire Diamond Ring II", spec: "E VVS1 // PT950 Platinum", url: "/Product images/2.jpg", aspect: "h-[380px]", desc: "Refined platinum solitaire ring with an excellent-cut brilliant diamond, showcasing the Vees Star signature prong geometry.", details: { color: "E Rare White", clarity: "VVS1", carat: "1.8 Carats", metal: "PT950 Platinum", cut: "Round Brilliant", cert: "GIA Certified" } },
  { id: "p3", type: "project", title: "Solitaire Diamond Ring III", spec: "F IF // 18K Yellow Gold", url: "/Product images/3.jpg", aspect: "h-[320px]", desc: "Internally flawless brilliant solitaire in warm 18K yellow gold, inspired by ancestral Karaikudi goldsmithing traditions.", details: { color: "F Exceptional", clarity: "Internally Flawless (IF)", carat: "2.5 Carats", metal: "18K Yellow Gold", cut: "Ideal Round Cut", cert: "GIA Laser Registered" } },
  { id: "p4", type: "project", title: "Diamond Jewellery Set I", spec: "D VVS2 // High Jewellery", url: "/Product images/4.jpg", aspect: "h-[400px]", desc: "An exceptional high jewellery set showcasing precisely matched diamonds in seamless handcrafted settings.", details: { color: "D Colorless", clarity: "VVS2", carat: "8.6 Carats Total", metal: "18K White Gold", cut: "Mixed Round & Marquise", cert: "GIA Certified Set" } },
  { id: "p5", type: "project", title: "Diamond Jewellery Set II", spec: "E IF // Bespoke Commission", url: "/Product images/5.png", aspect: "h-[360px]", desc: "A bespoke commissioned jewellery ensemble, each piece individually verified for colour and clarity consistency.", details: { color: "E Rare White", clarity: "Internally Flawless (IF)", carat: "11.2 Carats Total", metal: "PT950 Platinum", cut: "Pear & Round Cuts", cert: "GIA Certified Suite" } },
  { id: "p6", type: "project", title: "Diamond Jewellery Set III", spec: "D Flawless // 18K White Gold", url: "/Product images/6.png", aspect: "h-[350px]", desc: "White gold jewellery set of exceptional purity, every diamond hand-selected from our GIA-certified inventory.", details: { color: "D Colorless", clarity: "Flawless (FL)", carat: "6.4 Carats Total", metal: "18K White Gold", cut: "Princess & Round Mix", cert: "GIA Certified" } },
  { id: "p7", type: "project", title: "Diamond Jewellery Set IV", spec: "E VVS1 // PT950 Platinum", url: "/Product images/7.png", aspect: "h-[420px]", desc: "Platinum-mounted jewellery suite featuring exceptional fire and brilliance across each matched diamond.", details: { color: "E Rare White", clarity: "VVS1", carat: "7.8 Carats Total", metal: "PT950 Platinum", cut: "Round Brilliant Cut", cert: "GIA Certified Suite" } },
  { id: "p8", type: "project", title: "Diamond Jewellery Set V", spec: "F IF // Champagne Gold", url: "/Product images/8.png", aspect: "h-[330px]", desc: "Champagne gold setting bringing warmth and brilliance together in a classic Vees Star commission.", details: { color: "F Exceptional", clarity: "Internally Flawless (IF)", carat: "5.5 Carats Total", metal: "18K Champagne Gold", cut: "Cushion & Round Halo", cert: "GIA Certified" } },
  { id: "p9", type: "project", title: "Diamond Jewellery Set VI", spec: "D IF // Bespoke Bridal", url: "/Product images/9.png", aspect: "h-[390px]", desc: "A stunning bridal commission featuring internally flawless diamonds, crafted for a once-in-a-lifetime occasion.", details: { color: "D Colorless", clarity: "Internally Flawless (IF)", carat: "14.2 Carats Total", metal: "PT950 Platinum", cut: "Pear-Cut Cascade", cert: "GIA Custom Certified" } },
  { id: "p10", type: "project", title: "Diamond Jewellery Set VII", spec: "E Flawless // 18K Rose Gold", url: "/Product images/10.png", aspect: "h-[310px]", desc: "Flawless diamonds in a rose gold setting, combining modern design sensibility with ancestral craft precision.", details: { color: "E Rare White", clarity: "Flawless (FL)", carat: "4.8 Carats Total", metal: "18K Rose Gold", cut: "Brilliant Cuts", cert: "GIA Certified" } },
  { id: "p11", type: "project", title: "Diamond Jewellery Set VIII", spec: "D VVS1 // PT950 Platinum", url: "/Product images/11.png", aspect: "h-[370px]", desc: "Premium platinum jewellery commission showcasing round brilliant diamonds in the finest VVS1 clarity grade.", details: { color: "D Colorless", clarity: "VVS1", carat: "6.2 Carats Total", metal: "PT950 Platinum", cut: "Round Brilliant", cert: "GIA Certified" } },
  { id: "p12", type: "project", title: "Diamond Jewellery Set IX", spec: "F IF // High Jewellery", url: "/Product images/12.png", aspect: "h-[410px]", desc: "High jewellery piece combining traditional South Indian motifs with contemporary diamond setting techniques.", details: { color: "F Exceptional", clarity: "Internally Flawless (IF)", carat: "9.5 Carats Total", metal: "18K Yellow Gold & Pt", cut: "Traditional Motif Facets", cert: "GIA Certified" } },
  { id: "p13", type: "project", title: "Diamond Jewellery Set X", spec: "D IF // Bespoke Commission", url: "/Product images/13.png", aspect: "h-[340px]", desc: "A signature Vees Star bespoke commission, handcrafted over several weeks to achieve perfect symmetry.", details: { color: "D Colorless", clarity: "Internally Flawless (IF)", carat: "5.1 Carats Total", metal: "PT950 Platinum", cut: "Marquise & Round Mix", cert: "GIA Certified" } },
  { id: "p14", type: "project", title: "Diamond Jewellery Set XI", spec: "E VVS2 // 18K Yellow Gold", url: "/Product images/14.png", aspect: "h-[360px]", desc: "Yellow gold jewellery set with VVS2 clarity diamonds, reflecting the warmth of the Karaikudi goldsmithing legacy.", details: { color: "E Rare White", clarity: "VVS2", carat: "4.3 Carats Total", metal: "18K Yellow Gold", cut: "Brilliant & Princess", cert: "GIA Certified" } },
  { id: "p15", type: "project", title: "Diamond Jewellery Set XII", spec: "D Flawless // PT950 Platinum", url: "/Product images/15.png", aspect: "h-[380px]", desc: "A pinnacle platinum commission, every facet of every diamond aligned to maximise scintillation and light performance.", details: { color: "D Colorless", clarity: "Flawless (FL)", carat: "15.5 Carats Total", metal: "PT950 Platinum", cut: "Ideal Round Cuts", cert: "GIA Certified Suite" } },
  { id: "p16", type: "project", title: "Diamond Jewellery Set XIII", spec: "F VVS1 // White Gold", url: "/Product images/16.png", aspect: "h-[320px]", desc: "White gold jewellery featuring well-matched VVS1 brilliant diamonds in clean, architectural settings.", details: { color: "F Exceptional", clarity: "VVS1", carat: "3.9 Carats Total", metal: "18K White Gold", cut: "Round Brilliant", cert: "GIA Certified" } },
  { id: "p17", type: "project", title: "Diamond Jewellery Set XIV", spec: "E IF // Bespoke Commission", url: "/Product images/17.png", aspect: "h-[350px]", desc: "An internally flawless diamond commission, hand-set by our master craftsman using ancestral bezel techniques.", details: { color: "E Rare White", clarity: "Internally Flawless (IF)", carat: "5.8 Carats Total", metal: "PT950 Platinum Claws", cut: "Bezel Cushion Cuts", cert: "GIA Certified" } },
  { id: "p18", type: "project", title: "Diamond Jewellery Set XV", spec: "D VVS1 // High Jewellery", url: "/Product images/18.png", aspect: "h-[400px]", desc: "High jewellery crafted from conflict-free D-colour diamonds, each certified by GIA for complete assurance.", details: { color: "D Colorless", clarity: "VVS1", carat: "8.2 Carats Total", metal: "18K White Gold", cut: "Round Brilliant", cert: "GIA Certified Set" } },
  { id: "p19", type: "project", title: "Diamond Jewellery Set XVI", spec: "E Flawless // PT950 Platinum", url: "/Product images/19.png", aspect: "h-[330px]", desc: "Flawless platinum jewellery commission with an impeccable surface finish achieved through precision hand-polishing.", details: { color: "E Rare White", clarity: "Flawless (FL)", carat: "7.1 Carats Total", metal: "PT950 Platinum", cut: "Ideal Cut Brilliant", cert: "GIA Certified" } },
  { id: "p20", type: "project", title: "Diamond Jewellery Set XVII", spec: "D IF // 18K Champagne Gold", url: "/Product images/20.png", aspect: "h-[390px]", desc: "Champagne gold setting housing an internally flawless solitaire, a warm and elegant heirloom-quality piece.", details: { color: "D Colorless", clarity: "Internally Flawless (IF)", carat: "4.8 Carats Total", metal: "18K Champagne Gold", cut: "Princess Channel Cut", cert: "GIA Certified" } },
  { id: "p21", type: "project", title: "Diamond Jewellery Set XVIII", spec: "F VVS2 // Bespoke Commission", url: "/Product images/21.png", aspect: "h-[360px]", desc: "A carefully designed bespoke jewellery commission blending geometric precision with classic South Indian proportions.", details: { color: "F Exceptional", clarity: "VVS2", carat: "6.5 Carats Total", metal: "18K Yellow Gold", cut: "Round & Marquise Mix", cert: "GIA Certified" } },
  { id: "p22", type: "project", title: "Diamond Jewellery Set XIX", spec: "D Flawless // White Gold", url: "/Product images/22.png", aspect: "h-[340px]", desc: "White gold solitaire jewellery of absolute diamond perfection, from our exclusive D-Flawless collection.", details: { color: "D Colorless", clarity: "Flawless (FL)", carat: "5.3 Carats Total", metal: "18K White Gold", cut: "Ideal Round Cuts", cert: "GIA Certified Set" } },
  { id: "p23", type: "project", title: "Diamond Jewellery Set XX", spec: "E IF // PT950 Platinum", url: "/Product images/23.png", aspect: "h-[380px]", desc: "Platinum jewellery featuring an internally flawless round brilliant, crafted to be passed through generations.", details: { color: "E Rare White", clarity: "Internally Flawless (IF)", carat: "4.9 Carats Solitaire", metal: "PT950 Platinum", cut: "Round Brilliant", cert: "GIA Certified" } },
  { id: "p24", type: "project", title: "Diamond Jewellery Set XXI", spec: "D VVS1 // High Jewellery", url: "/Product images/24.png", aspect: "h-[420px]", desc: "The crown jewel of our bespoke portfolio — a multi-piece high jewellery commission in platinum and D-colour diamonds.", details: { color: "D Colorless", clarity: "VVS1", carat: "22.4 Carats Suite Total", metal: "PT950 Platinum & 18K", cut: "High Jewellery Cuts Suite", cert: "GIA Registry Certified Set" } },
];

// Weddings by VVS Images
const WEDDINGS_GALLERY_IMAGES = [
  "/Weddings by VVS/IMG_7340.JPG (1).jpeg",
  "/Weddings by VVS/IMG_7341.JPG.jpeg",
  "/Weddings by VVS/IMG_7342.JPG.jpeg",
  "/Weddings by VVS/IMG_7343.JPG.jpeg",
];

const WEDDINGS_ITEMS = [
  { id: "w1", type: "weddings", title: "VVS Golden Wedding Heritage I", spec: "Bespoke Bridal Gold Set", url: "/Weddings by VVS/IMG_7340.JPG (1).jpeg", aspect: "h-[340px]", desc: "Exquisite traditional wedding jewellery curated from our premium heritage designs, celebrating timeless luxury.", details: { metal: "22K Traditional Yellow Gold", weight: "Gold Weight: 84.5 grams", gemstones: "Polki Uncut Diamonds & Rubies", craft: "Chettinad Temple Antique Finish", hallmark: "BIS 916 Hallmarked", design: "Chidambaram Haram Heritage" } },
  { id: "w2", type: "weddings", title: "VVS Golden Wedding Heritage II", spec: "Bespoke Bridal Gold Set", url: "/Weddings by VVS/IMG_7341.JPG.jpeg", aspect: "h-[380px]", desc: "A majestic bridal jewellery composition displaying hand-chiselled detailing and high-quality gold elements.", details: { metal: "22K Antique Yellow Gold", weight: "Gold Weight: 124.8 grams", gemstones: "Flawless GIA Emeralds & Diamonds", craft: "Lost-Wax Traditional Casting", hallmark: "BIS 916 Hallmarked", design: "Manga Malai Royal Collar Set" } },
  { id: "w3", type: "weddings", title: "VVS Golden Wedding Heritage III", spec: "Bespoke Bridal Gold Set", url: "/Weddings by VVS/IMG_7342.JPG.jpeg", aspect: "h-[320px]", desc: "Finely matched traditional wedding ornaments reflecting the grandeur of Tamil bridal heritage.", details: { metal: "22K Gold & Platinum accents", weight: "Gold Weight: 62.3 grams", gemstones: "High-grade Rubies & Rose-Cut Diamonds", craft: "Madras Hand-Burnished", hallmark: "BIS 916 Hallmarked", design: "Guttapusalu Wedding Pendant" } },
  { id: "w4", type: "weddings", title: "VVS Golden Wedding Heritage IV", spec: "Bespoke Bridal Gold Set", url: "/Weddings by VVS/IMG_7343.JPG.jpeg", aspect: "h-[400px]", desc: "An exceptional bridal set hand-crafted by Vees Star master goldsmiths for a perfect wedding celebration.", details: { metal: "22K Traditional Gold", weight: "Gold Weight: 145.0 grams", gemstones: "Fine Uncut Diamonds & South Sea Pearls", craft: "Temple Filigree Handcrafted", hallmark: "BIS 916 Hallmarked", design: "Kasu Mala Heritage Bridal Suite" } },
];

export default function GalleryClient() {
  const [activeTab, setActiveTab] = useState("campaign"); // "campaign" or "project"
  const [selectedVideo, setSelectedVideo] = useState(1); // 1 = 1.MP4, 2 = 2.MP4
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [videoProgress, setVideoProgress] = useState(0);
  const [activeItem, setActiveItem] = useState(null); // lightbox item
  const videoRef = useRef(null);

  // Elevate parent z-index and disable scrolling when modal is active
  useEffect(() => {
    const parentContainer = document.querySelector(".flex.flex-col.min-h-screen.relative");
    if (activeItem) {
      document.body.style.overflow = "hidden";
      if (parentContainer) {
        parentContainer.style.zIndex = "9999";
      }
    } else {
      document.body.style.overflow = "";
      if (parentContainer) {
        parentContainer.style.zIndex = "1";
      }
    }
    return () => {
      document.body.style.overflow = "";
      if (parentContainer) {
        parentContainer.style.zIndex = "1";
      }
    };
  }, [activeItem]);

  const activeItems =
    activeTab === "campaign" ? CAMPAIGN_ITEMS :
      activeTab === "project" ? PROJECT_ITEMS :
        WEDDINGS_ITEMS;

  const activeImages =
    activeTab === "campaign" ? CAMPAIGN_GALLERY_IMAGES :
      activeTab === "project" ? PROJECT_GALLERY_IMAGES :
        WEDDINGS_GALLERY_IMAGES;

  // Play/Pause handler
  const handlePlayPause = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          if (err.name !== "AbortError") {
            console.log("Video play interrupted:", err);
          }
        });
      }
    }
    setIsPlaying(!isPlaying);
  };

  // Mute handler
  const handleMuteToggle = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  // Update progress bar
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
    setVideoProgress(progress || 0);
  };

  // Scrub progress bar
  const handleScrub = (e) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newTime = (clickX / width) * videoRef.current.duration;
    videoRef.current.currentTime = newTime;
    setVideoProgress((clickX / width) * 100);
  };

  // Switch videos
  const switchVideo = (index) => {
    setSelectedVideo(index);
    setIsPlaying(true);
    setVideoProgress(0);
    if (videoRef.current) {
      videoRef.current.load();
      setTimeout(() => {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(err => {
            if (err.name !== "AbortError") {
              console.log("Play failed after switch:", err);
            }
          });
        }
      }, 150);
    }
  };

  // Trigger WhatsApp Inquiry
  const handleWhatsAppInquiry = (item, e) => {
    if (e) e.stopPropagation();
    const typeLabel = item.type === "campaign" ? "Model Campaign Lookbook" : item.type === "weddings" ? "Weddings by VVS" : "Bespoke Portfolio";
    let detailsText = item.spec;
    if (item.details) {
      if (item.type === "weddings") {
        detailsText = `${item.details.metal}, ${item.details.weight}, Gemstones: ${item.details.gemstones}, Craft: ${item.details.craft}, Design: ${item.details.design}`;
      } else {
        detailsText = `${item.details.metal}, ${item.details.carat}, Cut: ${item.details.cut}, Color: ${item.details.color}, Clarity: ${item.details.clarity}`;
      }
    }
    const msg = `Hi Vees Star Diamonds! I am viewing your ${typeLabel} and am interested in the "${item.title}" (${detailsText}). Please share pricing and customization details.`;
    window.open(`https://api.whatsapp.com/send?phone=919383007477&text=${encodeURIComponent(msg)}`, "_blank");
  };

  // Navigate in lightbox
  const handlePrevItem = (e) => {
    e.stopPropagation();
    const currentIndex = activeItems.findIndex(item => item.id === activeItem.id);
    const prevIndex = (currentIndex - 1 + activeItems.length) % activeItems.length;
    setActiveItem(activeItems[prevIndex]);
  };

  const handleNextItem = (e) => {
    e.stopPropagation();
    const currentIndex = activeItems.findIndex(item => item.id === activeItem.id);
    const nextIndex = (currentIndex + 1) % activeItems.length;
    setActiveItem(activeItems[nextIndex]);
  };

  return (
    <div className="relative min-h-screen bg-[#0E0C0A] text-[#FAF7F2] overflow-x-hidden">

      {/* Dynamic Ambient Background Glows */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#C9A84C]/4 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-0 w-[500px] h-[500px] bg-[#C9A84C]/3 rounded-full blur-[150px] pointer-events-none" />

      {/* ── 1. HEADER SECTION ── */}
      <div className="pt-[140px] pb-6 px-6 md:px-12 relative z-10">
        <div className="max-w-7xl mx-auto text-center space-y-4 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="badge-gold w-fit mx-auto"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C9A84C]" />
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#C9A84C] font-bold">Design & Campaign Portfolio</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-6xl font-light text-[#FAF7F2] leading-tight"
          >
            The <span className="font-display italic gold-gradient-text">Vees Star Gallery</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[#C4BAB0] font-light text-sm max-w-xl mx-auto leading-relaxed"
          >
            Explore our design legacy. Switch between the cinematic lookbook films featuring our brand muse, and the portfolio of raw bespoke commissions made in our workshop.
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="gold-divider mx-auto"
          />
        </div>
      </div>

      {/* ── 2. CINEMATIC VIDEO INTERACTIVE PLAYER ── */}
      <section className="px-6 md:px-12 pb-12 relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center glass-panel p-6 md:p-8 rounded-3xl border border-[#C9A84C]/10 luxury-shadow relative overflow-hidden">

          {/* Subtle glow layer */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(201,168,76,0.04),transparent)] pointer-events-none" />

          {/* Left Column: Player Display */}
          <div className="lg:col-span-8 w-full aspect-video bg-black/40 rounded-2xl border border-[#C9A84C]/8 relative overflow-hidden group">
            <video
              ref={videoRef}
              src={`/Model videos/${selectedVideo}.MP4`}
              className="w-full h-full object-cover"
              autoPlay
              muted={isMuted}
              loop
              playsInline
              preload="metadata"
              onTimeUpdate={handleTimeUpdate}
            />

            {/* Custom Control Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 md:p-6 space-y-4">

              {/* Timeline Progress */}
              <div
                className="w-full h-1 bg-white/20 rounded-full cursor-pointer relative overflow-hidden hover:h-1.5 transition-all"
                onClick={handleScrub}
              >
                <div
                  className="h-full bg-gradient-to-r from-[#C9A84C] to-[#E8D5A0]"
                  style={{ width: `${videoProgress}%` }}
                />
              </div>

              {/* Action Buttons row */}
              <div className="flex items-center justify-between text-[#FAF7F2]">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handlePlayPause}
                    className="p-2 rounded-full hover:bg-white/10 hover:text-[#C9A84C] transition-colors cursor-pointer"
                    title={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                  </button>
                  <button
                    onClick={handleMuteToggle}
                    className="p-2 rounded-full hover:bg-white/10 hover:text-[#C9A84C] transition-colors cursor-pointer"
                    title={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                </div>

                <div className="flex items-center space-x-2 text-[10px] tracking-widest uppercase text-neutral-400 font-bold">
                  <span>Vees Star Campaign Video {selectedVideo}</span>
                </div>
              </div>
            </div>

            {/* Play Button Indicator when paused */}
            {!isPlaying && (
              <div
                onClick={handlePlayPause}
                className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer"
              >
                <div className="w-16 h-16 rounded-full bg-[#C9A84C]/90 hover:bg-[#E8D5A0] flex items-center justify-center shadow-lg transition-transform hover:scale-110">
                  <Play className="w-6 h-6 text-[#0E0C0A] fill-current translate-x-0.5" />
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Campaign Info & Video Switcher */}
          <div className="lg:col-span-4 text-left flex flex-col justify-between h-full space-y-6 lg:pl-4">
            <div className="space-y-4">
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#C9A84C] font-extrabold block">Cinematic Concept</span>
              <h2 className="text-2xl md:text-3xl font-light text-[#FAF7F2] leading-tight">
                Challenging the<br />
                <span className="font-display italic gold-gradient-text">Geometry of Light</span>
              </h2>
              <p className="text-xs md:text-sm text-[#C4BAB0] font-light leading-relaxed">
                Our twin cinematic campaigns represent the refraction of light through D-Flawless solitaire facets. Toggle the buttons below to switch perspectives.
              </p>
            </div>

            {/* Switcher Controls */}
            <div className="space-y-3 pt-4 border-t border-[#C9A84C]/10">
              <span className="text-[9px] uppercase tracking-widest text-[#7A6E66] font-bold block mb-1">Select Campaign Film</span>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => switchVideo(1)}
                  className={`flex-1 px-4 py-3 rounded-xl border text-[10px] uppercase tracking-widest font-bold text-center cursor-pointer transition-all ${selectedVideo === 1
                    ? "bg-[#C9A84C] text-[#0E0C0A] border-[#C9A84C]"
                    : "bg-[#0A0806]/40 border-[#C9A84C]/20 text-[#C4BAB0] hover:border-[#C9A84C]/50 hover:text-white"}`}
                >
                  Perspective I (1.MP4)
                </button>
                <button
                  onClick={() => switchVideo(2)}
                  className={`flex-1 px-4 py-3 rounded-xl border text-[10px] uppercase tracking-widest font-bold text-center cursor-pointer transition-all ${selectedVideo === 2
                    ? "bg-[#C9A84C] text-[#0E0C0A] border-[#C9A84C]"
                    : "bg-[#0A0806]/40 border-[#C9A84C]/20 text-[#C4BAB0] hover:border-[#C9A84C]/50 hover:text-white"}`}
                >
                  Perspective II (2.MP4)
                </button>
              </div>
            </div>

            {/* Direct inquiry CTA */}
            <button
              onClick={() => {
                const msg = `Hi Vees Star! I watched your Campaign video films and would like to learn more about the custom solitaire jewellery collections featured in them.`;
                window.open(`https://api.whatsapp.com/send?phone=919383007477&text=${encodeURIComponent(msg)}`, "_blank");
              }}
              className="w-full py-3.5 bg-gradient-to-r from-[#C9A84C]/12 to-[#C9A84C]/4 hover:from-[#C9A84C]/20 hover:to-[#C9A84C]/10 border border-[#C9A84C]/25 hover:border-[#C9A84C] text-[10px] uppercase tracking-widest text-[#C9A84C] font-extrabold rounded-xl transition-luxury flex items-center justify-center space-x-2.5 cursor-pointer mt-4"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Inquire Campaign Collection</span>
            </button>
          </div>

        </div>
      </section>

      {/* ── 3. FILTER TABS SYSTEM ── */}
      <section className="px-6 md:px-12 pb-8 max-w-7xl mx-auto z-10 relative">
        <div className="flex justify-center">
          <div className="p-1.5 rounded-2xl bg-[#14110F] border border-[#C9A84C]/10 flex flex-wrap gap-2 justify-center shadow-xl">
            <button
              onClick={() => setActiveTab("campaign")}
              className={`px-6 py-3 rounded-xl text-[10px] sm:text-xs uppercase tracking-widest font-extrabold flex items-center space-x-2 cursor-pointer transition-all ${activeTab === "campaign"
                  ? "bg-[#C9A84C] text-[#0E0C0A]"
                  : "text-[#C4BAB0] hover:text-white"
                }`}
            >
              <Camera className="w-3.5 h-3.5" />
              <span>The Campaign Looks</span>
            </button>
            <button
              onClick={() => setActiveTab("project")}
              className={`px-6 py-3 rounded-xl text-[10px] sm:text-xs uppercase tracking-widest font-extrabold flex items-center space-x-2 cursor-pointer transition-all ${activeTab === "project"
                  ? "bg-[#C9A84C] text-[#0E0C0A]"
                  : "text-[#C4BAB0] hover:text-white"
                }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Bespoke Portfolio</span>
            </button>
            <button
              onClick={() => setActiveTab("weddings")}
              className={`px-6 py-3 rounded-xl text-[10px] sm:text-xs uppercase tracking-widest font-extrabold flex items-center space-x-2 cursor-pointer transition-all ${activeTab === "weddings"
                  ? "bg-[#C9A84C] text-[#0E0C0A]"
                  : "text-[#C4BAB0] hover:text-white"
                }`}
            >
              <Heart className="w-3.5 h-3.5" />
              <span>Weddings by VVS</span>
            </button>
          </div>
        </div>
      </section>

      {/* ── 4. INFINITE WEBGL HORIZONTAL SCROLL ── */}
      <div className="w-full relative" style={{ height: "75vh" }}>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/20 to-transparent z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/20 to-transparent z-10" />

        {/* Dynamic Key Prop to force WebGL Canvas re-init on Tab Switch */}
        <InfiniteWebGLScroll
          key={activeTab}
          images={activeImages}
          imageWidth={270}
          imageHeight={360}
          gap={25}
          inertia={0.93}
          bulgeStrength={0.5}
          bulgeRadius={1.5}
        />
      </div>

      {/* ── 5. LOOKBOOK MASONRY GRID (19 IMAGES OR 6 PROJECT IMAGES) ── */}
      <div className="py-20 px-6 md:px-12 relative z-10">
        <div className="max-w-7xl mx-auto space-y-12">

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4"
          >
            <div className="h-px flex-1 bg-[#C9A84C]/12" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#C9A84C] font-bold">
              {activeTab === "campaign" ? "The Complete Campaign looks (19 items)" : "Bespoke Jewelry Masterpieces"}
            </span>
            <div className="h-px flex-1 bg-[#C9A84C]/12" />
          </motion.div>

          {/* Masonry Columns Layout */}
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            <AnimatePresence mode="popLayout">
              {activeItems.map((item, idx) => (
                <motion.div
                  key={item.id}
                  layoutId={`grid-${item.id}`}
                  initial={{ opacity: 0, scale: 0.96, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: 15 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: (idx % 4) * 0.05, duration: 0.5 }}
                  onClick={() => setActiveItem(item)}
                  className={`break-inside-avoid relative rounded-2xl overflow-hidden border border-[#C9A84C]/8 group shadow-lg ${item.aspect} bg-[#181410] cursor-pointer hover:border-[#C9A84C]/30 transition-all duration-500`}
                >
                  {/* Lazy loaded image background */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url('${item.url}')` }}
                  />

                  {/* Gradient shade overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0806]/95 via-[#0A0806]/20 to-transparent transition-opacity duration-300" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Top thin gold border shine */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/40 to-transparent" />

                  {/* Floating Quick view & WhatsApp Actions */}
                  <div className="absolute top-4 right-4 flex items-center space-x-2.5 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
                    <button
                      onClick={(e) => handleWhatsAppInquiry(item, e)}
                      className="p-2.5 rounded-full bg-[#0A0806]/80 backdrop-blur-md border border-[#C9A84C]/25 hover:border-[#C9A84C] hover:bg-[#C9A84C] text-[#C4BAB0] hover:text-[#0E0C0A] transition-all cursor-pointer"
                      title="Inquire on WhatsApp"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                    </button>
                    <div className="p-2.5 rounded-full bg-[#0A0806]/80 backdrop-blur-md border border-white/10 text-white/70 hover:text-white transition-all">
                      <Eye className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Bottom Details */}
                  <div className="absolute bottom-5 left-5 right-5 text-left space-y-1.5 z-10 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-[9px] uppercase tracking-widest text-[#C9A84C] font-bold block">{item.spec}</span>
                    <h4 className="text-sm font-semibold text-[#FAF7F2] tracking-wide leading-snug group-hover:text-[#E8D5A0] transition-colors">{item.title}</h4>

                    {/* Subtle chevron teaser */}
                    <div className="flex items-center space-x-1.5 text-[9px] text-[#7A6E66] font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300 pt-1">
                      <span>Inspect Piece</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1.5 transition-transform" />
                    </div>
                  </div>

                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ── 6. IMMERSIVE LIGHTBOX LIGHTBOX MODAL ── */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#0E0C0A]/95 backdrop-blur-md overflow-y-auto"
            onClick={() => setActiveItem(null)}
          >
            <div className="min-h-full w-full flex items-center justify-center p-4 md:p-10">
              {/* Modal Glass Container */}
              <motion.div
                initial={{ scale: 0.95, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.95, y: 20, opacity: 0 }}
                transition={{ type: "spring", damping: 28 }}
                className="w-full max-w-5xl bg-[#14110F] border border-[#C9A84C]/15 rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-12 shadow-2xl relative"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button inside the container */}
                <button
                  onClick={() => setActiveItem(null)}
                  className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full bg-[#0E0C0A]/60 border border-white/10 hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all z-30 cursor-pointer"
                  title="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Swipe Left Arrow */}
                <button
                  onClick={handlePrevItem}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 border border-white/10 hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all z-20 cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Swipe Right Arrow */}
                <button
                  onClick={handleNextItem}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 border border-white/10 hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all z-20 cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Left Side: Image Display (7 Columns) */}
                <div className="md:col-span-7 bg-black/40 relative aspect-[4/5] md:aspect-auto md:h-[75vh] flex items-center justify-center overflow-hidden border-b md:border-b-0 md:border-r border-[#C9A84C]/10">
                  <img
                    src={activeItem.url}
                    alt={activeItem.title}
                    className="w-full h-full object-contain max-h-[50vh] md:max-h-full"
                  />

                  {/* Floating look specs badge */}
                  <div className="absolute bottom-6 left-6 bg-black/70 backdrop-blur-md border border-[#C9A84C]/20 px-4 py-2 rounded-full shadow-lg">
                    <span className="text-[10px] tracking-widest font-extrabold text-[#C9A84C] uppercase">{activeItem.spec}</span>
                  </div>
                </div>

                {/* Right Side: Specifications & Inquiry (5 Columns) */}
                <div className="md:col-span-5 p-6 pr-14 md:p-8 md:pr-16 flex flex-col justify-between text-left space-y-6 relative">

                  {/* Spec details */}
                  <div className="space-y-5">
                    <div className="flex items-center space-x-2">
                      <Sparkles className="w-4 h-4 text-[#C9A84C]" />
                      <span className="text-[9px] uppercase tracking-[0.25em] text-[#C9A84C] font-extrabold">
                        {activeItem.type === "campaign" ? "Campaign Look Details" : "Commission Specifications"}
                      </span>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-light text-[#FAF7F2] leading-tight">
                      {activeItem.title}
                    </h3>

                    <div className="w-12 h-px bg-[#C9A84C]/25" />

                    <p className="text-xs md:text-sm text-[#C4BAB0] font-light leading-relaxed">
                      {activeItem.desc}
                    </p>

                    {/* Materials & Gemmology Guide */}
                    {activeItem.details ? (
                      <div className="bg-[#0A0806] border border-[#C9A84C]/8 p-4 rounded-xl space-y-2.5">
                        <span className="text-[8.5px] uppercase tracking-widest text-[#7A6E66] font-extrabold block">
                          {activeItem.type === "weddings" ? "Heritage Specifications" : activeItem.type === "campaign" ? "GIA Quality Metrics" : "Crafting Specifications"}
                        </span>
                        <div className="grid grid-cols-2 gap-3 text-[10px] uppercase font-bold text-neutral-400">
                          {activeItem.type === "weddings" ? (
                            <>
                              <div className="col-span-2">Metal: <span className="text-[#C9A84C]">{activeItem.details.metal}</span></div>
                              <div className="col-span-2">Weight: <span className="text-neutral-200">{activeItem.details.weight}</span></div>
                              <div className="col-span-2">Gemstones: <span className="text-[#C9A84C]">{activeItem.details.gemstones}</span></div>
                              <div className="col-span-2">Craft: <span className="text-neutral-200">{activeItem.details.craft}</span></div>
                              <div className="col-span-2">Design: <span className="text-neutral-200">{activeItem.details.design}</span></div>
                              <div className="col-span-2">Hallmark: <span className="text-[#C9A84C]">{activeItem.details.hallmark}</span></div>
                            </>
                          ) : (
                            <>
                              <div>Color: <span className="text-[#C9A84C]">{activeItem.details.color}</span></div>
                              <div>Clarity: <span className="text-[#C9A84C]">{activeItem.details.clarity}</span></div>
                              <div>Carat: <span className="text-neutral-200">{activeItem.details.carat}</span></div>
                              <div>Metal: <span className="text-[#C9A84C]">{activeItem.details.metal}</span></div>
                              <div>Cut Shape: <span className="text-neutral-200">{activeItem.details.cut}</span></div>
                              <div>Certificate: <span className="text-[#C9A84C]">{activeItem.details.cert}</span></div>
                            </>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="bg-[#0A0806] border border-[#C9A84C]/8 p-4 rounded-xl space-y-2.5">
                        <span className="text-[8.5px] uppercase tracking-widest text-[#7A6E66] font-extrabold block">
                          {activeItem.type === "campaign" ? "GIA Quality Metrics" : "Crafting Specifications"}
                        </span>
                        <div className="grid grid-cols-2 gap-3 text-[10px] uppercase font-bold text-neutral-400">
                          <div>Color Grade: <span className="text-[#C9A84C]">D / E Rare</span></div>
                          <div>Clarity: <span className="text-[#C9A84C]">Flawless / IF</span></div>
                          <div>Polish: <span className="text-neutral-200">Excellent</span></div>
                          <div>Symmetry: <span className="text-neutral-200">Excellent</span></div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Bottom WhatsApp Inquiry Button */}
                  <div className="space-y-4 pt-6 border-t border-[#C9A84C]/10">
                    <button
                      onClick={() => handleWhatsAppInquiry(activeItem)}
                      className="w-full py-4 bg-[#C9A84C] hover:bg-[#E8D5A0] text-[#0E0C0A] text-[10px] uppercase tracking-widest font-extrabold rounded-xl transition-luxury flex items-center justify-center space-x-2.5 cursor-pointer shadow-lg gold-pulse-ring"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Inquire this Piece</span>
                    </button>
                    <p className="text-[9px] text-[#7A6E66] tracking-wider text-center uppercase">Est. 1978 · Karaikudi Temple Goldsmithing Heritage</p>
                  </div>

                </div>

              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
