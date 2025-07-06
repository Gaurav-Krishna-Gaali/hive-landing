"use client";
import * as React from "react";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";

export interface SparklesProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: string;
  size?: number;
  className?: string;
}

export const Sparkles = React.forwardRef<HTMLSpanElement, SparklesProps>(
  ({ color = "#fbbf24", size = 20, className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn("relative inline-block", className)}
        {...props}
      >
        <motion.svg
          width={size}
          height={size}
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="absolute -top-1 -left-1"
        >
          <path
            d="M10 0L12.4721 7.52786L20 10L12.4721 12.4721L10 20L7.52786 12.4721L0 10L7.52786 7.52786L10 0Z"
            fill={color}
          />
        </motion.svg>
        {props.children}
      </span>
    );
  }
);
Sparkles.displayName = "Sparkles"; 