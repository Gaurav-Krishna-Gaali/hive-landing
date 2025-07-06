"use client";
import { cn } from "@/utils/cn";
import React, { useEffect, useRef } from "react";

export const BackgroundBeams = ({ className }: { className?: string }) => {
  const beamsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!beamsRef.current) return;
    const beams = beamsRef.current;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = beams.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      beams.style.setProperty("--mouse-x", `${mouseX}px`);
      beams.style.setProperty("--mouse-y", `${mouseY}px`);
    };
    beams.addEventListener("mousemove", handleMouseMove);
    return () => beams.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={beamsRef}
      className={cn(
        "pointer-events-none absolute inset-0 z-30 transition duration-300 lg:absolute",
        className
      )}
    >
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.5 }}>
        <defs>
          <radialGradient id="beam-gradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#a21caf" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="50%" cy="50%" r="80%" fill="url(#beam-gradient)" />
      </svg>
    </div>
  );
}; 