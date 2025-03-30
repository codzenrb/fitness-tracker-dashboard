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
        "rounded-xl bg-gray-900 p-6",
        "shadow-[5px_5px_12px_0px_rgba(0,0,0,0.5),-5px_-5px_12px_0px_rgba(30,41,59,0.2)]",
        "border border-gray-800",
        className
      )}
    >
      {children}
    </div>
  );
}