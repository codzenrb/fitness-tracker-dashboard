import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface GlassmorphismProps {
  children: ReactNode;
  className?: string;
}

export function Glassmorphism({ children, className }: GlassmorphismProps) {
  return (
    <motion.div 
      className={cn(
        "bg-white/70 backdrop-blur-md rounded-lg border border-white/25",
        className
      )}
      whileHover={{ boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}
