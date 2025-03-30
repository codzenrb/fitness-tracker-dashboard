import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function AnalogClock() {
  const [hourDeg, setHourDeg] = useState(0);
  const [minuteDeg, setMinuteDeg] = useState(0);
  const [secondDeg, setSecondDeg] = useState(0);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      
      const hourDegrees = ((hours % 12) * 30) + (minutes * 0.5);
      const minuteDegrees = minutes * 6;
      const secondDegrees = seconds * 6;
      
      setHourDeg(hourDegrees);
      setMinuteDeg(minuteDegrees);
      setSecondDeg(secondDegrees);
    };
    
    // Initial update
    updateClock();
    
    // Update every second
    const intervalId = setInterval(updateClock, 1000);
    
    return () => clearInterval(intervalId);
  }, []);

  // Create clock markers for hours
  const hourMarkers = Array.from({ length: 12 }, (_, i) => {
    const angle = (i * 30 * Math.PI) / 180;
    const x = 46 * Math.sin(angle);
    const y = -46 * Math.cos(angle);
    return { x, y, angle };
  });

  return (
    <div className="mx-auto flex items-center justify-center">
      <div className="relative w-[130px] h-[130px] rounded-full bg-gradient-to-br from-white to-gray-50 
        shadow-[6px_6px_16px_rgba(0,0,0,0.1),_-6px_-6px_16px_rgba(255,255,255,0.8),_inset_1px_1px_2px_rgba(0,0,0,0.05)]
        before:content-[''] before:absolute before:inset-[2px] before:rounded-full before:bg-gradient-to-tr before:from-white before:to-gray-50 before:opacity-80">
        
        {/* Decorative ring */}
        <div className="absolute inset-[-5px] rounded-full border-[1px] border-purple-100 opacity-70"></div>
        <div className="absolute inset-[-10px] rounded-full border-[1px] border-purple-50 opacity-40"></div>
        
        {/* Subtle glow behind the clock */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-100 to-indigo-50 opacity-20 blur-sm"></div>
        
        {/* Hour markers */}
        {hourMarkers.map((marker, i) => (
          <div
            key={i}
            className={`absolute ${i % 3 === 0 ? 'w-[5px] h-[5px] bg-gradient-purple' : 'w-[3px] h-[3px] bg-gray-400'} rounded-full`}
            style={{
              left: "calc(50% + " + marker.x + "px)",
              top: "calc(50% + " + marker.y + "px)",
              transform: "translate(-50%, -50%)"
            }}
          />
        ))}
        
        {/* Clock hands */}
        <motion.div 
          className="absolute w-[4px] h-[32px] bg-gradient-to-b from-purple-900 to-purple-700 rounded-full left-1/2 top-[25px] origin-bottom 
            shadow-[0_1px_3px_rgba(0,0,0,0.2)] after:content-[''] after:absolute after:w-[10px] after:h-[10px] after:rounded-full 
            after:bg-purple-200 after:top-0 after:left-1/2 after:transform after:-translate-x-1/2 after:-translate-y-1/2 after:opacity-50"
          style={{ translateX: "-50%" }}
          animate={{ rotate: hourDeg }}
          transition={{ type: "tween", ease: "anticipate" }}
        />
        
        <motion.div 
          className="absolute w-[3px] h-[42px] bg-gradient-to-b from-indigo-800 to-indigo-600 rounded-full left-1/2 top-[15px] origin-bottom 
            shadow-[0_1px_3px_rgba(0,0,0,0.15)] after:content-[''] after:absolute after:w-[8px] after:h-[8px] after:rounded-full 
            after:bg-indigo-200 after:top-0 after:left-1/2 after:transform after:-translate-x-1/2 after:-translate-y-1/2 after:opacity-50"
          style={{ translateX: "-50%" }}
          animate={{ rotate: minuteDeg }}
          transition={{ type: "tween", ease: "anticipate" }}
        />
        
        <motion.div 
          className="absolute w-[2px] h-[48px] bg-gradient-to-b from-red-500 to-red-600 rounded-full left-1/2 top-[12px] origin-bottom shadow-sm"
          style={{ translateX: "-50%" }}
          animate={{ rotate: secondDeg }}
          transition={{ type: "tween", ease: "linear" }}
        />
        
        {/* Center dot with glow effect */}
        <div className="absolute w-[12px] h-[12px] bg-gradient-to-br from-gray-700 to-gray-900 rounded-full top-1/2 left-1/2 transform 
          -translate-x-1/2 -translate-y-1/2 shadow-sm z-10 before:content-[''] before:absolute before:inset-[-3px] 
          before:rounded-full before:bg-white before:opacity-20 before:blur-[2px]"></div>
        
        {/* Inner decorative circles for depth */}
        <div className="absolute inset-[15px] rounded-full bg-transparent border border-gray-100 opacity-30"></div>
        <div className="absolute inset-[25px] rounded-full bg-transparent border border-gray-200 opacity-20"></div>
        
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,_transparent_30%,_rgba(255,255,255,0.1)_70%)] opacity-30"></div>
      </div>
    </div>
  );
}
