import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function DecorativeCircle({ 
  className, 
  size = 120, 
  color = "primary",
  delay = 0,
  duration = 10,
  x = 20,
  y = 20,
  opacity = 0.15,
}: { 
  className?: string;
  size?: number;
  color?: "primary" | "secondary" | "accent" | "success" | "warning" | "error";
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  opacity?: number;
}) {
  const colorMap = {
    primary: "bg-gradient-to-br from-indigo-500 to-purple-600",
    secondary: "bg-gradient-to-br from-pink-500 to-red-500",
    accent: "bg-gradient-to-br from-cyan-400 to-blue-500",
    success: "bg-gradient-to-br from-green-400 to-green-600",
    warning: "bg-gradient-to-br from-amber-400 to-orange-500",
    error: "bg-gradient-to-br from-red-400 to-rose-600",
  };

  return (
    <motion.div
      className={cn(
        "rounded-full absolute blur-3xl", 
        colorMap[color],
        className
      )}
      style={{ 
        width: size, 
        height: size,
        opacity 
      }}
      animate={{
        x: [0, x, 0],
        y: [0, y, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }}
    />
  );
}

export function DecorativeBlob({
  className,
  color = "primary",
  delay = 0,
  opacity = 0.1,
  scale = 1,
  duration = 20
}: {
  className?: string;
  color?: "primary" | "secondary" | "accent" | "success" | "warning" | "error";
  delay?: number;
  opacity?: number;
  scale?: number;
  duration?: number;
}) {
  const colorMap = {
    primary: "fill-indigo-500",
    secondary: "fill-pink-500",
    accent: "fill-blue-500",
    success: "fill-green-500",
    warning: "fill-amber-500",
    error: "fill-red-500",
  };

  return (
    <motion.div
      className={cn("absolute pointer-events-none", className)}
      initial={{ opacity: 0 }}
      animate={{ opacity }}
      transition={{ duration: 1 }}
    >
      <motion.svg
        viewBox="0 0 200 200"
        width={200 * scale}
        height={200 * scale}
        className="overflow-visible"
        animate={{
          scale: [1, 1.05, 1],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration,
          delay,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      >
        <motion.path
          d="M40.9,-50.8C49.5,-38.9,50.5,-23.1,51.4,-8.4C52.2,6.3,52.8,19.8,46.6,30.2C40.3,40.6,27.1,47.7,11.9,53.3C-3.3,58.9,-20.6,62.9,-33.7,57.5C-46.9,52.1,-56,37.2,-60.2,21.3C-64.5,5.5,-64,-11.4,-56.9,-24C-49.8,-36.7,-36.1,-45.1,-22.6,-54.1C-9.1,-63.2,4.1,-72.9,15.9,-69.7C27.7,-66.6,32.3,-62.6,40.9,-50.8Z"
          transform="translate(100 100)"
          className={cn(colorMap[color])}
        />
      </motion.svg>
    </motion.div>
  );
}

export function DecorativeDots({
  className,
  color = "primary",
  size = 4,
  gap = 20,
  rows = 5,
  cols = 5,
  delay = 0,
  stagger = 0.05,
}: {
  className?: string;
  color?: "primary" | "secondary" | "accent" | "success" | "warning" | "error";
  size?: number;
  gap?: number;
  rows?: number;
  cols?: number;
  delay?: number;
  stagger?: number;
}) {
  const colorMap = {
    primary: "bg-indigo-500",
    secondary: "bg-pink-500",
    accent: "bg-blue-500",
    success: "bg-green-500",
    warning: "bg-amber-500",
    error: "bg-red-500",
  };

  const totalWidth = cols * (size + gap) - gap;
  const totalHeight = rows * (size + gap) - gap;

  // Create grid of dots
  const dots = [];
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const index = i * cols + j;
      dots.push(
        <motion.div
          key={index}
          className={cn("rounded-full", colorMap[color])}
          style={{
            width: size,
            height: size,
            position: "absolute",
            top: i * (size + gap),
            left: j * (size + gap),
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{
            delay: delay + index * stagger,
            duration: 0.5,
          }}
        />
      );
    }
  }

  return (
    <div
      className={cn("relative", className)}
      style={{
        width: totalWidth,
        height: totalHeight,
      }}
    >
      {dots}
    </div>
  );
}

export function FitnessSVG({ className, color = "currentColor", size = 80 }: { 
  className?: string;
  color?: string;
  size?: number;
}) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      width={size} 
      height={size} 
      fill="none" 
      stroke={color} 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <motion.path 
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        d="M6.5 6.5L17.5 17.5M6.5 17.5L17.5 6.5"
      />
      <motion.circle 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        cx="5" cy="5" r="3" 
      />
      <motion.circle 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        cx="19" cy="5" r="3" 
      />
      <motion.circle 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        cx="5" cy="19" r="3" 
      />
      <motion.circle 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        cx="19" cy="19" r="3" 
      />
    </svg>
  );
}

export function NutritionSVG({ className, color = "currentColor", size = 80 }: { 
  className?: string;
  color?: string;
  size?: number;
}) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      width={size} 
      height={size} 
      fill="none" 
      stroke={color} 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <motion.path 
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
      />
      <motion.path 
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }}
        d="M12 6v6l4 2"
      />
    </svg>
  );
}

export function ProgressSVG({ className, color = "currentColor", size = 80 }: { 
  className?: string;
  color?: string;
  size?: number;
}) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      width={size} 
      height={size} 
      fill="none" 
      stroke={color} 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <motion.path 
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        d="M20 20H4V4"
      />
      <motion.path 
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 0.3 }}
        d="M4 16.5L12 9l3 3 4.5-4.5"
      />
      <motion.circle 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        cx="16" cy="7" r="2" 
      />
    </svg>
  );
}

export function WavyBackground({ className }: { className?: string }) {
  return (
    <div className={cn("absolute inset-x-0 -z-10 transform-gpu overflow-hidden", className)}>
      <svg
        className="absolute left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
        viewBox="0 0 1155 678"
      >
        <motion.path
          fill="url(#9b2541ea-d39d-499b-bd42-aeea3e93f5ff)"
          fillOpacity=".3"
          d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        <defs>
          <linearGradient
            id="9b2541ea-d39d-499b-bd42-aeea3e93f5ff"
            x1="1155.49"
            x2="-78.208"
            y1=".177"
            y2="474.645"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#9089FC" />
            <stop offset={1} stopColor="#FF80B5" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

// Animated gradient text component
export function GradientText({ 
  text, 
  className, 
  from = "from-indigo-600", 
  via = "via-purple-600", 
  to = "to-pink-600" 
}: { 
  text: string, 
  className?: string,
  from?: string,
  via?: string,
  to?: string
}) {
  return (
    <span className={cn(
      `bg-gradient-to-r ${from} ${via} ${to} bg-clip-text text-transparent 
       animate-gradient-x bg-300%`,
      className
    )}>
      {text}
    </span>
  );
}

// Page decorative elements
export function PageDecorations() {
  return (
    <>
      <DecorativeCircle
        className="top-[10%] left-[5%]"
        color="primary"
        size={200}
        opacity={0.1}
        delay={0}
      />
      <DecorativeCircle
        className="bottom-[10%] right-[5%]"
        color="secondary"
        size={250}
        opacity={0.08}
        delay={2}
      />
      <DecorativeBlob
        className="top-[15%] right-[10%] -rotate-12"
        color="accent"
        scale={0.8}
        delay={1}
      />
      <DecorativeBlob
        className="bottom-[15%] left-[10%] rotate-45"
        color="primary"
        scale={1.2}
        opacity={0.08}
        delay={0.5}
      />
      <WavyBackground className="bottom-0" />
    </>
  );
}