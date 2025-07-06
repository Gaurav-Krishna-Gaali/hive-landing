"use client";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
import React from "react";

export const MovingBorder = ({
  children,
  duration = 2000,
  rx = 16,
  ry = 16,
  className,
  ...otherProps
}: {
  children: React.ReactNode;
  duration?: number;
  rx?: number;
  ry?: number;
  className?: string;
  [key: string]: any;
}) => {
  return (
    <div
      className={cn(
        "relative flex h-full w-full items-center justify-center overflow-hidden rounded-[inherit] bg-transparent",
        className
      )}
      {...otherProps}
    >
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
        className="mask-radial-faded pointer-events-none absolute inset-0 z-30 rounded-[inherit] bg-gradient-to-r from-purple-500/20 to-pink-500/20"
      />
      <motion.div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
        className="mask-radial-faded pointer-events-none absolute inset-0 z-30 rounded-[inherit] bg-gradient-to-r from-purple-500/20 to-pink-500/20"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            background: "conic-gradient(from 0deg, transparent 0deg, #a855f7 72deg, #ec4899 144deg, transparent 216deg, transparent 360deg)",
          }}
          className="absolute inset-0 rounded-[inherit]"
        />
      </motion.div>
      <div className="pointer-events-none absolute inset-0 z-30 rounded-[inherit] bg-background [mask:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}; 