import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Neumorphic } from "./ui/neumorphic";
import AnalogClock from "./AnalogClock";

export default function ClockSection() {
  const [digitalTime, setDigitalTime] = useState("");
  const [dateString, setDateString] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      
      // Format digital time
      const hours = now.getHours();
      const formattedHours = hours % 12 || 12;
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const minutes = now.getMinutes();
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      
      setDigitalTime(`${formattedHours}:${formattedMinutes} ${ampm}`);
      
      // Format date
      const options: Intl.DateTimeFormatOptions = { 
        weekday: 'long', 
        day: 'numeric', 
        month: 'long' 
      };
      setDateString(now.toLocaleDateString('en-US', options));
    };
    
    // Initial update
    updateTime();
    
    // Update every second
    const intervalId = setInterval(updateTime, 1000);
    
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Neumorphic className="p-6 flex flex-col items-center">
      <h2 className="text-xl font-heading font-semibold mb-6 self-start">Time Tracker</h2>
      
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-4"
      >
        <AnalogClock />
      </motion.div>
      
      <motion.div 
        className="text-2xl font-medium mb-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {digitalTime}
      </motion.div>
      
      <motion.div 
        className="text-sm text-neutral-600 mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {dateString}
      </motion.div>
      
      <motion.div 
        className="w-full space-y-3 mt-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      >
        <div className="flex justify-between items-center">
          <span className="text-sm text-neutral-600">Active time today</span>
          <span className="font-medium">1h 45m</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-neutral-600">Remaining workouts</span>
          <span className="font-medium">1</span>
        </div>
      </motion.div>
    </Neumorphic>
  );
}
