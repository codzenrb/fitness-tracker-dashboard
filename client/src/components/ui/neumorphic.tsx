import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface NeumorphicProps {
  children: ReactNode;
  className?: string;
}

export function Neumorphic({ children, className }: NeumorphicProps) {
  return (
    <div
      className={cn(
        "rounded-xl bg-slate-100 p-6",
        "shadow-[6px_6px_12px_0px_#a3b1c6,-6px_-6px_12px_0px_#ffffff]",
        className
      )}
    >
      {children}
    </div>
  );
}