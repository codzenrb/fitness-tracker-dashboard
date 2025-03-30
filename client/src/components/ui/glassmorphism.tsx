import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassmorphismProps {
  children: ReactNode;
  className?: string;
  intensity?: "light" | "medium" | "heavy";
  hoverEffect?: boolean;
  borderEffect?: boolean;
}

export function Glassmorphism({
  children,
  className,
  intensity = "medium",
  hoverEffect = false,
  borderEffect = true,
}: GlassmorphismProps) {
  const intensityMap = {
    light: "bg-opacity-10 backdrop-blur-sm",
    medium: "bg-opacity-15 backdrop-blur-md",
    heavy: "bg-opacity-20 backdrop-blur-lg",
  };

  const hoverStyles = hoverEffect
    ? "transition-all duration-300 hover:bg-opacity-30 hover:shadow-lg"
    : "";

  const borderStyles = borderEffect
    ? "border border-gray-800/60"
    : "";

  return (
    <motion.div
      className={cn(
        "bg-gray-900 rounded-xl shadow-md",
        intensityMap[intensity],
        hoverStyles,
        borderStyles,
        className
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}

interface GlassmorphicCardProps {
  children: ReactNode;
  className?: string;
  title?: string;
  icon?: ReactNode;
  hoverEffect?: boolean;
  hoverScale?: number;
}

export function GlassmorphicCard({
  children,
  className,
  title,
  icon,
  hoverEffect = true,
  hoverScale = 1.02,
}: GlassmorphicCardProps) {
  return (
    <motion.div
      className={cn(
        "bg-gray-900 bg-opacity-60 backdrop-blur-md rounded-xl shadow-xl border border-gray-700/30 overflow-hidden",
        className
      )}
      whileHover={
        hoverEffect
          ? { scale: hoverScale, boxShadow: "0 10px 30px rgba(0,0,0,0.3)" }
          : undefined
      }
      transition={{ duration: 0.2 }}
    >
      {(title || icon) && (
        <div className="flex items-center p-4 border-b border-gray-700/30">
          {icon && <div className="mr-3">{icon}</div>}
          {title && <h3 className="font-semibold text-gray-100">{title}</h3>}
        </div>
      )}
      <div className="p-4">{children}</div>
    </motion.div>
  );
}

interface GlassCapsuleProps {
  children: ReactNode;
  className?: string;
  color?: "indigo" | "purple" | "pink" | "blue" | "green" | "orange";
  animated?: boolean;
}

export function GlassCapsule({
  children,
  className,
  color = "indigo",
  animated = false,
}: GlassCapsuleProps) {
  const colorMap = {
    indigo: "from-indigo-600/30 to-indigo-700/30 border-indigo-500/40",
    purple: "from-purple-600/30 to-purple-700/30 border-purple-500/40",
    pink: "from-pink-600/30 to-pink-700/30 border-pink-500/40",
    blue: "from-blue-600/30 to-blue-700/30 border-blue-500/40",
    green: "from-green-600/30 to-green-700/30 border-green-500/40",
    orange: "from-orange-600/30 to-orange-700/30 border-orange-500/40",
  };

  return (
    <motion.div
      className={cn(
        "inline-block py-1 px-4 rounded-full backdrop-blur-md border",
        `bg-gradient-to-r ${colorMap[color]}`,
        className
      )}
      whileHover={{ y: -2 }}
      animate={
        animated
          ? {
              y: [0, -3, 0],
              scale: [1, 1.02, 1],
            }
          : undefined
      }
      transition={
        animated
          ? {
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }
          : { duration: 0.2 }
      }
    >
      {children}
    </motion.div>
  );
}

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
  glow?: boolean;
  glowColor?: string;
}

export function GlassPanel({
  children,
  className,
  glow = false,
  glowColor = "rgba(124, 58, 237, 0.3)", // Purple by default
}: GlassPanelProps) {
  return (
    <div className={cn("relative rounded-xl overflow-hidden", className)}>
      {glow && (
        <div
          className="absolute inset-0 blur-xl opacity-20"
          style={{ backgroundColor: glowColor }}
        />
      )}
      <div className="relative bg-gray-900 bg-opacity-60 backdrop-blur-lg border border-gray-700/30 rounded-xl shadow-xl p-6">
        {children}
      </div>
    </div>
  );
}