"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { getRandomPosition } from "@/lib/utils";
import { CopyX } from "lucide-react"; // Using an icon if needed, or just text

interface RunawayButtonProps {
  label: string;
}

export default function RunawayButton({ label }: RunawayButtonProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isMoved, setIsMoved] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const controls = useAnimation();

  // Initial position is static (relative to flow). 
  // Once moved, we switch to absolute positioning or just transform.
  // Actually, to make it jump around freely, 'fixed' or 'absolute' relative to a fullscreen container is best.
  // Ideally, it starts in flow, then on first hover, it switches to absolute.
  
  const handleRunaway = () => {
    if (!buttonRef.current) return;
    
    // Get viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    const rect = buttonRef.current.getBoundingClientRect();
    
    const { x, y } = getRandomPosition(
      viewportWidth,
      viewportHeight,
      rect.width,
      rect.height
    );

    setPosition({ x, y });
    setIsMoved(true);
    
    controls.start({
      x: x - rect.left, // Offset from current position if using transform, BUT:
                        // If we use fixed/absolute, we can just animate left/top.
                        // Let's use simple fixed positioning for the "runaway" state.
    });
  };

  // Improved Strategy:
  // Instead of complex transforms, when it runs away, we set it to 'fixed' position.
  // But transitioning from static flow to fixed layout can be jumpy.
  // Alternative: The button is always in a container, and we animate x/y transform.
  // But transform is relative to original position.
  // Let's try: calculated new position relative to window, minus original position = transform delta.

  const moveButton = () => {
     if (!buttonRef.current) return;

     const viewportWidth = window.innerWidth;
     const viewportHeight = window.innerHeight;
     const rect = buttonRef.current.getBoundingClientRect();
     
     // Current Transform (approximate if needed, but we calculate fresh every time)
     // Actually, we want to jump to a random spot on the SCREEN.
     // Best way: Use fixed position for the moving button? 
     // Or just large translation values.
     
     const { x, y } = getRandomPosition(
      viewportWidth, 
      viewportHeight, 
      rect.width, 
      rect.height
     );
     
     // We need to calculate the delta from the ORIGINAL position to the NEW TARGET (x, y).
     // Wait, if we keep adding deltas, it gets complex.
     // Simpler: Set position to 'fixed' after first interaction?
     // Let's keep it simple: Use Framer Motion layout animations or just animate x/y.
     
     // Let's stick to "random delta"? No, that might go off screen.
     // We need absolute coordinates.
     // "fixed" positioning is easiest for "don't go off screen".
  };

  // Re-implementation with 'fixed' strategy for simplicity and safety
  const [coords, setCoords] = useState<{top: number, left: number} | null>(null);

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
      onTouchStart={move} // Mobile - runs before click? Usually.
      animate={coords ? { x: coords.left, y: coords.top, position: "fixed", left: 0, top: 0 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      whileTap={{ scale: 0.9 }} // Visual feedback if they manage to touch it (unlikely)
      className={`px-8 py-4 bg-gray-200 text-gray-500 rounded-full font-bold shadow-lg 
                  ${coords ? 'z-50' : ''} whitespace-nowrap transition-colors duration-200`}
    >
      {label}
    </motion.button>
  );
}
