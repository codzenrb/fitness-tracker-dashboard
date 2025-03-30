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

  return (
    <div className="relative w-[100px] h-[100px] rounded-full bg-neutral-100 shadow-[5px_5px_10px_#d9d9d9,_-5px_-5px_10px_#ffffff]">
      <motion.div 
        className="absolute w-[4px] h-[30px] bg-neutral-800 rounded-full left-1/2 top-[20px] origin-bottom"
        style={{ translateX: "-50%" }}
        animate={{ rotate: hourDeg }}
        transition={{ type: "tween", ease: "linear" }}
      ></motion.div>
      
      <motion.div 
        className="absolute w-[2px] h-[40px] bg-neutral-800 rounded-full left-1/2 top-[10px] origin-bottom"
        style={{ translateX: "-50%" }}
        animate={{ rotate: minuteDeg }}
        transition={{ type: "tween", ease: "linear" }}
      ></motion.div>
      
      <motion.div 
        className="absolute w-[1px] h-[45px] bg-red-500 rounded-full left-1/2 top-[5px] origin-bottom"
        style={{ translateX: "-50%" }}
        animate={{ rotate: secondDeg }}
        transition={{ type: "tween", ease: "linear" }}
      ></motion.div>
      
      <div className="absolute w-[8px] h-[8px] bg-neutral-800 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
    </div>
  );
}
