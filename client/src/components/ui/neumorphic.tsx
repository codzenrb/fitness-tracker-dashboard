import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface NeumorphicProps {
  children: ReactNode;
  className?: string;
}

export function Neumorphic({ children, className }: NeumorphicProps) {
  return (
    <motion.div
      className={cn(
        "bg-neutral-100 rounded-xl shadow-[5px_5px_10px_#d9d9d9,_-5px_-5px_10px_#ffffff]",
        className
      )}
      whileHover={{ boxShadow: "7px 7px 14px #d9d9d9, -7px -7px 14px #ffffff" }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}
