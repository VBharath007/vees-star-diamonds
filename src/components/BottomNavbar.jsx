"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home, Info, Sparkles, Store, Image,
  Menu, X, MapPin, Diamond, Factory, Mail, Phone
} from "lucide-react";

const TABS = [
  { name: "Home",    href: "/",            icon: Home },
  { name: "About",   href: "/about",        icon: Info },
  { name: "Build",   href: "/custom-build", icon: Sparkles },
  { name: "Store",   href: "/solitaires",   icon: Store },
  { name: "Gallery", href: "/gallery",      icon: Image },
  { name: "Menu",    href: "#",             icon: Menu },
];

const DRAWER = [
  { name: "Karaikudi",      href: "/karaikudi",      icon: MapPin },
  { name: "Rough Diamonds", href: "/rough-diamonds", icon: Diamond },
  { name: "Manufacturing",  href: "/manufacturing",  icon: Factory },
  { name: "Contact",        href: "/contact",        icon: Mail },
  { name: "VIP Desk",       href: "/contact",        icon: Phone },
];

// ── layout constants ────────────────────────────────────────────
const H        = 78;   // total container height px
const BAR_Y    = 28;   // bar top edge  (space above = circle top half)
const CIR_R    = 28;   // circle radius → 56 px diameter
const NOTCH_HW = 38;   // notch half-width at bar level
// circle center sits exactly at y = BAR_Y, so top = 0, bottom = BAR_Y*2 = 56

function buildPath(width, cx, hasActive) {
  if (width === 0) return "";
  const r = 16;          // bar corner radius
  const barTop = BAR_Y;

  if (!hasActive) {
    return [
      `M 0 ${barTop + r}`,
      `A ${r} ${r} 0 0 1 ${r} ${barTop}`,
      `L ${width - r} ${barTop}`,
      `A ${r} ${r} 0 0 1 ${width} ${barTop + r}`,
      `L ${width} ${H - r}`,
      `A ${r} ${r} 0 0 1 ${width - r} ${H}`,
      `L ${r} ${H}`,
      `A ${r} ${r} 0 0 1 0 ${H - r}`,
      "Z",
    ].join(" ");
  }

  const sx = Math.max(0, cx - NOTCH_HW);
  const ex = Math.min(width, cx + NOTCH_HW);
  const deep = barTop + CIR_R;   // deepest point of notch (= circle bottom)

  const cpL = cx - sx;
  const cpR = ex - cx;
  
  const cpL_factor = Math.min(24, cpL * 0.65);
  const cpR_factor = Math.min(24, cpR * 0.65);

  let path = `M 0 ${barTop + r}`;
  
  // Left corner & line to notch start
  if (sx > r) {
    path += ` A ${r} ${r} 0 0 1 ${r} ${barTop} L ${sx} ${barTop}`;
  } else {
    // Notch starts before or at the corner radius
    path += ` L 0 ${barTop + (r * (sx / r))} L ${sx} ${barTop}`;
  }

  // Left curve down, right curve up
  path += ` C ${sx + cpL_factor} ${barTop}, ${cx - cpL_factor} ${deep}, ${cx} ${deep}`;
  path += ` C ${cx + cpR_factor} ${deep}, ${ex - cpR_factor} ${barTop}, ${ex} ${barTop}`;

  // Right line & corner
  if (ex < width - r) {
    path += ` L ${width - r} ${barTop} A ${r} ${r} 0 0 1 ${width} ${barTop + r}`;
  } else {
    const ratio = Math.max(0, (width - ex) / r);
    path += ` L ${ex} ${barTop} L ${width} ${barTop + (r * ratio)}`;
  }

  // Bottom parts
  path += ` L ${width} ${H - r}
           A ${r} ${r} 0 0 1 ${width - r} ${H}
           L ${r} ${H}
           A ${r} ${r} 0 0 1 0 ${H - r}
           Z`;

  return path;
}

export default function BottomNavbar() {
  const pathname        = usePathname();
  const ref             = useRef(null);
  const [width, setW]   = useState(360);
  const [drawer, setDr] = useState(false);
  const [mounted, setM] = useState(false);

  const path = pathname || "/";
  const activeIdx = TABS.slice(0, 5).findIndex((t) =>
    t.href === "/" ? path === "/" : path.startsWith(t.href)
  );
  const hasActive  = activeIdx !== -1;
  const activeTabX = hasActive ? ((activeIdx + 0.5) * width) / TABS.length : 0;

  useEffect(() => { setM(true); }, []);
  useEffect(() => {
    if (!mounted || !ref.current) return;
    const update = () => {
      const w = ref.current?.getBoundingClientRect().width;
      if (w && w > 0) setW(w);
    };
    update();
    const t  = setTimeout(update, 150);
    const ro = new ResizeObserver(update);
    ro.observe(ref.current);
    return () => { ro.disconnect(); clearTimeout(t); };
  }, [mounted]);

  if (!mounted) return null;

  const clampedX = activeTabX;
  const svgPath = buildPath(width, clampedX, hasActive);

  return (
    <>
      <style>{`
        @media (min-width: 1024px) { .vsd-bnav { display: none !important; } }
      `}</style>

      {/* ── NAVBAR CONTAINER ── */}
      <div
        className="vsd-bnav"
        style={{
          position: "fixed",
          bottom: 24,
          left: "50%",
          transform: "translateX(-50%)",
          width: "94vw",
          maxWidth: 440,
          height: H,
          zIndex: 9999,
          pointerEvents: "auto",
        }}
      >
        <div ref={ref} style={{ position: "relative", width: "100%", height: H }}>

          {/* ── SVG BAR with notch ── */}
          <svg
            width={width} height={H}
            viewBox={`0 0 ${width} ${H}`}
            style={{
              position: "absolute", top: 0, left: 0,
              width: "100%", height: "100%",
              pointerEvents: "none",
              filter: "drop-shadow(0 8px 28px rgba(0,0,0,0.9))",
            }}
          >
            {width > 0 && (
              <path
                d={svgPath}
                style={{
                  fill: "rgba(18,15,13,0.97)",
                  stroke: "rgba(201,168,76,0.22)",
                  strokeWidth: "1.2px",
                }}
              />
            )}
          </svg>

          {/* ── SLIDING GOLD CIRCLE ── */}
          {hasActive && width > 0 && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width:  CIR_R * 2,
                height: CIR_R * 2,
                borderRadius: "50%",
                background: "linear-gradient(145deg, #F5E8B4 0%, #D4A832 45%, #A8802A 100%)",
                boxShadow:
                  "0 0 0 3px rgba(14,12,10,0.95), " +
                  "0 6px 22px rgba(201,168,76,0.6), " +
                  "inset 0 2px 4px rgba(255,255,255,0.25)",
                transform: `translate3d(${clampedX - CIR_R}px, 0, 0)`,
                transition: "transform 0.48s cubic-bezier(0.34, 1.56, 0.64, 1)",
                zIndex: 20,
                pointerEvents: "none",
              }}
            />
          )}

          {/* ── ACTIVE ICON — pinned at container level, same coords as circle ── */}
          {hasActive && width > 0 && (() => {
            const ActiveIcon = TABS[activeIdx].icon;
            return (
              <span
                style={{
                  position: "absolute",
                  top:  CIR_R,       // circle center Y
                  left: clampedX,    // circle center X — SAME as circle
                  transform: "translate(-50%, -50%)",
                  zIndex: 40,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#1A1208",
                  pointerEvents: "none",
                  transition: "left 0.48s cubic-bezier(0.34, 1.56, 0.64, 1)",
                }}
              >
                <ActiveIcon size={22} strokeWidth={2.8} style={{ display: "block" }} />
              </span>
            );
          })()}

          {/* ── TAB ROW — click targets + inactive icons ── */}
          <div
            style={{
              position: "absolute",
              top: 0, left: 0, right: 0,
              height: H,
              display: "flex",
              alignItems: "stretch",
              zIndex: 30,
            }}
          >
            {TABS.map((tab, idx) => {
              const isActive = idx === activeIdx;
              const Icon     = tab.icon;
              const isMenu   = tab.name === "Menu";

              // inactive: icon + label in bar area
              const inner = !isActive ? (
                <div style={{
                  width: "100%", height: "100%", position: "relative",
                }}>
                  <div style={{
                    position: "absolute",
                    top: BAR_Y, left: 0, right: 0, bottom: 0,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 4,
                  }}>
                    <Icon size={19} strokeWidth={2}
                      style={{ display: "block", color: "#6A6460" }} />
                    <span style={{
                      fontSize: 9, fontWeight: 700,
                      letterSpacing: "0.07em", lineHeight: 1,
                      color: "#5A5450", userSelect: "none",
                    }}>
                      {tab.name}
                    </span>
                  </div>
                </div>
              ) : (
                // active tab cell is transparent (icon renders above at container level)
                <div style={{ width: "100%", height: "100%" }} />
              );

              const shared = {
                flex: 1, height: "100%", display: "flex",
                outline: "none", WebkitTapHighlightColor: "transparent",
              };

              if (isMenu) return (
                <button key={tab.name} onClick={() => setDr(true)}
                  style={{ ...shared, background: "none", border: "none", cursor: "pointer", padding: 0 }}
                >{inner}</button>
              );

              return (
                <a key={tab.name} href={tab.href}
                  style={{ ...shared, textDecoration: "none" }}
                >{inner}</a>
              );
            })}
          </div>

        </div>
      </div>


      {/* ── SLIDE-UP DRAWER ── */}
      <AnimatePresence>
        {drawer && (
          <React.Fragment key="drawer">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setDr(false)}
              style={{
                position: "fixed", inset: 0,
                background: "rgba(0,0,0,0.75)",
                backdropFilter: "blur(5px)",
                zIndex: 9000,
              }}
            />
            <motion.div
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 280 }}
              style={{
                position: "fixed", bottom: 0, left: 0, right: 0,
                background: "rgba(14,12,10,0.98)",
                backdropFilter: "blur(20px)",
                borderTop: "1px solid rgba(201,168,76,0.25)",
                borderRadius: "24px 24px 0 0",
                zIndex: 9001,
                padding: "20px 24px 40px",
                maxHeight: "85vh",
                overflowY: "auto",
              }}
            >
              {/* handle */}
              <div style={{ width: 48, height: 5, background: "rgba(201,168,76,0.28)", borderRadius: 4, margin: "0 auto 20px" }} />

              {/* header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(201,168,76,0.14)", paddingBottom: 16, marginBottom: 22 }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, letterSpacing: "0.2em", color: "#FAF7F2", textTransform: "uppercase" }}>Vees Star</div>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.3em", color: "#C9A84C", textTransform: "uppercase", marginTop: 4 }}>Diamonds</div>
                </div>
                <button onClick={() => setDr(false)} style={{ background: "rgba(255,255,255,0.06)", border: "none", borderRadius: "50%", padding: 8, cursor: "pointer", color: "#C4BAB0", display: "flex" }}>
                  <X size={20} />
                </button>
              </div>

              {/* links */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {DRAWER.map((lnk) => {
                  const active = path === lnk.href;
                  return (
                    <Link key={lnk.name} href={lnk.href} onClick={() => setDr(false)}
                      style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        padding: "15px 20px", borderRadius: 12,
                        border: `1px solid ${active ? "rgba(201,168,76,0.45)" : "transparent"}`,
                        background: active ? "rgba(201,168,76,0.1)" : "rgba(255,255,255,0.025)",
                        color: active ? "#C9A84C" : "#C4BAB0",
                        textDecoration: "none",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                        {React.createElement(lnk.icon, { size: 19 })}
                        <span style={{ fontSize: 14, fontWeight: 600, letterSpacing: "0.07em" }}>{lnk.name}</span>
                      </div>
                      <span style={{ color: "#4A4440", fontSize: 13 }}>›</span>
                    </Link>
                  );
                })}
              </div>

              {/* call CTA */}
              <div style={{ marginTop: 30, paddingTop: 22, borderTop: "1px solid rgba(201,168,76,0.14)" }}>
                <a href="tel:+919383007477" style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                  padding: "14px 20px", borderRadius: 12,
                  background: "linear-gradient(135deg, rgba(201,168,76,0.18), rgba(232,213,160,0.08))",
                  border: "1px solid rgba(201,168,76,0.32)",
                  color: "#C9A84C", fontWeight: 600, fontSize: 14,
                  textDecoration: "none",
                }}>
                  <Phone size={16} />
                  <span>Call VIP Desk: +91 93830 07477</span>
                </a>
              </div>
            </motion.div>
          </React.Fragment>
        )}
      </AnimatePresence>
    </>
  );
}
