"use client";

import {
  motion,
  AnimatePresence,
} from "framer-motion";
import { useRef, useState } from "react";

function DockItem({
  icon,
  label,
  onClick,
  baseItemSize,
  isActive,
}) {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      style={{ 
        width: baseItemSize, 
        height: baseItemSize,
        background: isActive ? "linear-gradient(135deg, #E8D5A0 0%, #C9A84C 100%)" : undefined
      }}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      onClick={onClick}
      className={`relative inline-flex items-center justify-center rounded-full shadow-lg transition-all cursor-pointer ${
        isActive
          ? "border border-[#FAF7F2]/30"
          : "bg-[#1F1B18] border border-[#C9A84C]/30 hover:border-[#C9A84C]/70"
      }`}
      tabIndex={0}
      role="button"
      aria-label={label}
      aria-current={isActive ? "page" : undefined}
    >
      <div className={`flex items-center justify-center font-semibold ${
        isActive ? "text-[#0E0C0A]" : "text-[#C9A84C]"
      }`}>
        {icon}
      </div>
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-1/2 mt-2.5 w-fit whitespace-nowrap rounded-lg border border-[#C9A84C]/30 bg-[#0E0C0A]/95 backdrop-blur-md px-3 py-1.5 text-xs text-[#C9A84C] font-semibold shadow-xl"
            style={{ x: "-50%" }}
            role="tooltip"
          >
            {label}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Dock({
  items,
  className = "",
  panelHeight = 64,
  baseItemSize = 50,
}) {
  return (
    <div style={{ height: panelHeight }} className="flex max-w-full items-center justify-center w-full">
      <div
        className={`relative flex items-center justify-center gap-2 sm:gap-3 rounded-3xl border px-3 sm:px-4 ${className}`}
        style={{ height: panelHeight }}
        role="toolbar"
        aria-label="Application dock"
      >
        {items.map((item, index) => (
          <DockItem
            key={index}
            icon={item.icon}
            label={item.label}
            onClick={item.onClick}
            baseItemSize={baseItemSize}
            isActive={item.isActive}
          />
        ))}
      </div>
    </div>
  );
}
