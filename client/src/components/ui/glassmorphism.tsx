import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassmorphismProps {
  children: ReactNode;
  className?: string;
}

export function Glassmorphism({ children, className }: GlassmorphismProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-gray-200 bg-white/40 p-6 backdrop-blur-md",
        "shadow-[0_8px_30px_rgb(0,0,0,0.03)]",
        "border-opacity-70",
        className
      )}
    >
      {children}
    </div>
  );
}