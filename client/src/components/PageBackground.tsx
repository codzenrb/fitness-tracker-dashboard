import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { 
  DecorativeCircle, 
  DecorativeBlob, 
  DecorativeDots,
  WavyBackground,
  PageDecorations
} from "./ui/decorative-elements";

interface PageBackgroundProps {
  children: ReactNode;
  variant?: "default" | "workout" | "nutrition" | "progress";
}

export default function PageBackground({ 
  children, 
  variant = "default" 
}: PageBackgroundProps) {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex flex-col relative overflow-hidden">
      {/* Common decorative elements for all variants */}
      <PageDecorations />
      
      {/* Variant specific decorations */}
      {variant === "workout" && (
        <>
          <DecorativeCircle
            className="top-[5%] right-[5%]"
            color="accent"
            size={150}
            opacity={0.15}
          />
          <DecorativeDots
            className="absolute top-[10%] left-[5%]"
            color="primary"
            rows={4}
            cols={4}
          />
        </>
      )}
      
      {variant === "nutrition" && (
        <>
          <DecorativeCircle
            className="bottom-[15%] left-[10%]"
            color="success"
            size={180}
            opacity={0.12}
          />
          <DecorativeBlob
            className="top-[20%] right-[15%] rotate-12"
            color="warning"
            scale={0.7}
            opacity={0.08}
          />
        </>
      )}
      
      {variant === "progress" && (
        <>
          <DecorativeCircle
            className="top-[15%] left-[8%]"
            color="secondary"
            size={120}
            opacity={0.1}
          />
          <DecorativeDots
            className="absolute bottom-[15%] right-[8%]"
            color="accent"
            rows={3}
            cols={5}
          />
        </>
      )}
      
      <div className="z-10 w-full relative">
        {children}
      </div>
    </div>
  );
}