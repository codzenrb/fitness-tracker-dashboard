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
      <div className="relative w-[120px] h-[120px] rounded-full bg-gradient-to-br from-white to-gray-100 shadow-[4px_4px_10px_rgba(0,0,0,0.1),_-4px_-4px_10px_rgba(255,255,255,0.8),_inset_1px_1px_2px_rgba(0,0,0,0.05)]">
        {/* Hour markers */}
        {hourMarkers.map((marker, i) => (
          <div
            key={i}
            className={`absolute w-[4px] h-[4px] bg-gray-600 rounded-full`}
            style={{
              left: "calc(50% + " + marker.x + "px)",
              top: "calc(50% + " + marker.y + "px)",
              transform: "translate(-50%, -50%)"
            }}
          />
        ))}
        
        {/* Clock hands */}
        <motion.div 
          className="absolute w-[4px] h-[30px] bg-gradient-to-b from-purple-900 to-purple-700 rounded-full left-1/2 top-[25px] origin-bottom shadow-sm"
          style={{ translateX: "-50%" }}
          animate={{ rotate: hourDeg }}
          transition={{ type: "tween", ease: "linear" }}
        />
        
        <motion.div 
          className="absolute w-[3px] h-[40px] bg-gradient-to-b from-indigo-800 to-indigo-600 rounded-full left-1/2 top-[15px] origin-bottom shadow-sm"
          style={{ translateX: "-50%" }}
          animate={{ rotate: minuteDeg }}
          transition={{ type: "tween", ease: "linear" }}
        />
        
        <motion.div 
          className="absolute w-[2px] h-[45px] bg-red-500 rounded-full left-1/2 top-[15px] origin-bottom shadow-sm"
          style={{ translateX: "-50%" }}
          animate={{ rotate: secondDeg }}
          transition={{ type: "tween", ease: "linear" }}
        />
        
        {/* Center dot */}
        <div className="absolute w-[10px] h-[10px] bg-gradient-to-br from-gray-800 to-gray-600 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-sm z-10"></div>
        
        {/* Inner shadow circle for depth */}
        <div className="absolute inset-[10px] rounded-full bg-transparent border border-gray-100 opacity-50"></div>
      </div>
    </div>
  );
}
