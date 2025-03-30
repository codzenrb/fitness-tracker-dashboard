import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface PageBackgroundProps {
  children: ReactNode;
}

export default function PageBackground({ children }: PageBackgroundProps) {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex flex-col">
      {/* Decorative elements similar to login page */}
      <motion.div
        className="fixed top-[-10%] right-[10%] w-[300px] h-[300px] rounded-full bg-gradient-to-br from-primary/60 to-purple-600/60 blur-3xl opacity-20"
        animate={{
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      
      <motion.div
        className="fixed bottom-[-10%] left-[15%] w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-pink-500/40 to-indigo-500/40 blur-3xl opacity-20"
        animate={{
          y: [0, -40, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      
      <div className="z-10 w-full">
        {children}
      </div>
    </div>
  );
}