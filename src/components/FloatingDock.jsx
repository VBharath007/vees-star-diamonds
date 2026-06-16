"use client";
import { useRef, useState, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { Home, Sparkles, Gem, Images, PhoneCall, BookOpen, Landmark } from "lucide-react";

const DOCK_ITEMS = [
  { label: "Home", href: "/", icon: Home },
  { label: "About", href: "/about", icon: BookOpen },
  { label: "Karaikudi", href: "/karaikudi", icon: Landmark },
  { label: "Custom Build", href: "/custom-build", icon: Sparkles },
  { label: "Solitaires", href: "/solitaires", icon: Gem },
  { label: "Gallery", href: "/gallery", icon: Images },
  { label: "Contact", href: "/contact", icon: PhoneCall },
];

const SPRING = { mass: 0.1, stiffness: 150, damping: 12 };
const BASE_SIZE = 46;
const MAGNIFY = 72;
const DISTANCE = 140;
const PANEL_H = 68;

function useDockItemSize(mouseX, idx, dockLeftRef) {
  const mouseDistance = useTransform(mouseX, (val) => {
    if (!isFinite(val)) return DISTANCE + 1;
    // Calculate center coordinate without triggering DOM reflow
    const itemCenter = dockLeftRef.current + 20 + idx * 58 + 23;
    return val - itemCenter;
  });
  const targetSize = useTransform(
    mouseDistance,
    [-DISTANCE, 0, DISTANCE],
    [BASE_SIZE, MAGNIFY, BASE_SIZE]
  );
  return useSpring(targetSize, SPRING);
}

function DockItem({ icon: Icon, label, href, mouseX, idx, dockLeftRef, isActive }) {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);
  const size = useDockItemSize(mouseX, idx, dockLeftRef);

  return (
    <motion.div
      ref={ref}
      style={{ width: size, height: size }}
      className="relative flex items-center justify-center flex-shrink-0"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {/* Icon button */}
      <Link
        href={href}
        aria-label={label}
        className={`w-full h-full flex items-center justify-center rounded-2xl transition-all duration-200 ${isActive
          ? "bg-[#C9A84C]/18 border border-[#C9A84C]/55 shadow-[0_0_16px_rgba(201,168,76,0.25)]"
          : "bg-white/4 border border-[#C9A84C]/10 hover:border-[#C9A84C]/35 hover:bg-[#C9A84C]/8"
          }`}
      >
        <Icon
          strokeWidth={isActive ? 2.2 : 1.8}
          className={`w-[42%] h-[42%] transition-colors duration-200 ${isActive ? "text-[#C9A84C]" : "text-[#C4BAB0]"
            }`}
        />
      </Link>

      {/* Active dot — below icon (dock is at top) */}
      {isActive && (
        <motion.div
          layoutId="dock-active-dot"
          className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#C9A84C]"
          style={{ boxShadow: "0 0 6px rgba(201,168,76,0.8)" }}
        />
      )}

      {/* Tooltip — appears below item */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.9 }}
            animate={{ opacity: 1, y: 10, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full mt-1 left-1/2 -translate-x-1/2 pointer-events-none whitespace-nowrap"
          >
            <span className="bg-[#0A0806]/92 backdrop-blur-md border border-[#C9A84C]/20 text-[#FAF7F2] text-[9px] font-bold tracking-[0.18em] uppercase px-2.5 py-1 rounded-lg block">
              {label}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FloatingDock() {
  const pathname = usePathname();
  const mouseX = useMotionValue(Infinity);
  const isHov = useMotionValue(0);
  const containerRef = useRef(null);
  const dockLeftRef = useRef(0);

  const maxH = useMemo(() => MAGNIFY + MAGNIFY / 2 + 4, []);
  const animH = useSpring(
    useTransform(isHov, [0, 1], [PANEL_H, maxH]),
    SPRING
  );

  const handleMouseEnter = () => {
    if (containerRef.current) {
      dockLeftRef.current = containerRef.current.getBoundingClientRect().left;
    }
    isHov.set(1);
  };

  const handleMouseMove = (e) => {
    mouseX.set(e.pageX);
  };

  const handleMouseLeave = () => {
    isHov.set(0);
    mouseX.set(Infinity);
  };

  return (
    /* Visible only on lg+ screens */
    <motion.div
      style={{ height: animH }}
      className="fixed top-[40px] left-1/2 -translate-x-1/2 z-[50] items-start hidden lg:flex pointer-events-none select-none "
    >
      <motion.div
        ref={containerRef}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="pointer-events-auto relative flex items-center gap-3 px-5 py-3 rounded-2xl"
        role="toolbar"
        aria-label="Quick navigation dock"
        style={{
          height: PANEL_H,
          background: "#0E0C0A/95",
          backdropFilter: "blur(28px)",
          WebkitBackdropFilter: "blur(28px)",
          border: "1px solid rgba(201,168,76,0.20)",
          boxShadow:
            "0 12px 48px rgba(0,0,0,0.65), 0 0 0 1px rgba(201,168,76,0.06), inset 0 1px 0 rgba(255,255,255,0.04)",
        }}
      >
        {/* Gold shimmer bottom edge */}
        <div
          className="absolute bottom-0 left-[15%] right-[15%] h-px rounded-full pointer-events-none"
          style={{ background: "linear-gradient(90deg,transparent,rgba(201,168,76,0.45),transparent)" }}
        />

        {DOCK_ITEMS.map((item, idx) => (
          <DockItem
            key={idx}
            idx={idx}
            icon={item.icon}
            label={item.label}
            href={item.href}
            mouseX={mouseX}
            dockLeftRef={dockLeftRef}
            isActive={
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href)
            }
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
