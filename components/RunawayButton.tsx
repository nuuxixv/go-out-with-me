"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { getRandomPosition } from "@/lib/utils";

interface RunawayButtonProps {
  label: string;
}

export default function RunawayButton({ label }: RunawayButtonProps) {
  const [coords, setCoords] = useState<{top: number, left: number} | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const move = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const btnW = buttonRef.current?.offsetWidth || 100;
    const btnH = buttonRef.current?.offsetHeight || 50;

    const { x, y } = getRandomPosition(width, height, btnW, btnH);
    setCoords({ top: y, left: x });
  };

  return (
    <motion.button
      ref={buttonRef}
      onMouseEnter={move} // Desktop
      onTouchStart={move} // Mobile
      animate={coords ? { x: coords.left, y: coords.top, position: "fixed", left: 0, top: 0 } : {}}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      whileTap={{ scale: 0.95 }}
      className={`
        px-5 py-4 w-full rounded-2xl font-bold transition-colors duration-200
        ${coords 
            ? 'z-50 bg-[#e51d36] text-white shadow-lg' // When running away (Red for danger/reject)
            : 'bg-[#f2f4f6] text-[#4e5968] hover:bg-[#e5e8eb]' // Default secondary style
        }
      `}
      style={{ fontSize: '1.1rem' }}
    >
      {label}
    </motion.button>
  );
}
