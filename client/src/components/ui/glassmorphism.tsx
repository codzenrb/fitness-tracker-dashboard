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
    ? "transition-all duration-300 hover:bg-opacity-25 hover:shadow-lg"
    : "";

  const borderStyles = borderEffect
    ? "border border-white/20"
    : "";

  return (
    <motion.div
      className={cn(
        "bg-white rounded-xl shadow-md",
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
        "bg-white bg-opacity-15 backdrop-blur-md rounded-xl shadow-xl border border-white/20 overflow-hidden",
        className
      )}
      whileHover={
        hoverEffect
          ? { scale: hoverScale, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }
          : undefined
      }
      transition={{ duration: 0.2 }}
    >
      {(title || icon) && (
        <div className="flex items-center p-4 border-b border-white/10">
          {icon && <div className="mr-3">{icon}</div>}
          {title && <h3 className="font-semibold text-neutral-800">{title}</h3>}
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
    indigo: "from-indigo-500/20 to-indigo-600/20 border-indigo-500/30",
    purple: "from-purple-500/20 to-purple-600/20 border-purple-500/30",
    pink: "from-pink-500/20 to-pink-600/20 border-pink-500/30",
    blue: "from-blue-500/20 to-blue-600/20 border-blue-500/30",
    green: "from-green-500/20 to-green-600/20 border-green-500/30",
    orange: "from-orange-500/20 to-orange-600/20 border-orange-500/30",
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
  glowColor = "rgba(99, 102, 241, 0.4)", // Indigo by default
}: GlassPanelProps) {
  return (
    <div className={cn("relative rounded-xl overflow-hidden", className)}>
      {glow && (
        <div
          className="absolute inset-0 blur-xl opacity-30"
          style={{ backgroundColor: glowColor }}
        />
      )}
      <div className="relative bg-white bg-opacity-10 backdrop-blur-lg border border-white/20 rounded-xl shadow-xl p-6">
        {children}
      </div>
    </div>
  );
}