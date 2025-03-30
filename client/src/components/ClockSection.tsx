import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Neumorphic } from "./ui/neumorphic";
import AnalogClock from "./AnalogClock";
import { Clock, Timer, Calendar, Activity, Dumbbell } from "lucide-react";
import { DecorativeCircle } from "./ui/decorative-elements";

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
    <Neumorphic className="p-6 flex flex-col items-center relative overflow-hidden">
      <div className="flex items-center self-start mb-6">
        <Timer className="h-5 w-5 text-purple-500 mr-2" />
        <h2 className="text-xl font-heading font-semibold">Time Tracker</h2>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0">
        <DecorativeCircle color="purple" opacity={0.05} size={100} className="relative -top-10 -right-10" />
      </div>
      <div className="absolute bottom-0 left-0">
        <DecorativeCircle color="indigo" opacity={0.05} size={80} className="relative -bottom-10 -left-10" />
      </div>
      
      <div className="relative z-10">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <AnalogClock />
        </motion.div>
        
        <motion.div 
          className="text-2xl font-medium mb-1 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {digitalTime}
        </motion.div>
        
        <motion.div 
          className="flex items-center justify-center text-sm text-neutral-600 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Calendar className="h-3.5 w-3.5 mr-2 text-purple-400" />
          <span>{dateString}</span>
        </motion.div>
        
        <motion.div 
          className="w-full space-y-4 mt-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          <div className="bg-purple-50 rounded-lg p-3 flex justify-between items-center">
            <div className="flex items-center">
              <div className="bg-purple-100 rounded-full p-1.5 mr-3">
                <Activity className="h-4 w-4 text-purple-600" />
              </div>
              <span className="text-sm font-medium text-purple-800">Active time today</span>
            </div>
            <motion.span 
              className="font-medium text-purple-700 bg-white px-2 py-1 rounded-md shadow-sm"
              whileHover={{ y: -2, boxShadow: "0 4px 6px -1px rgba(139, 92, 246, 0.1)" }}
            >
              1h 45m
            </motion.span>
          </div>
          
          <div className="bg-indigo-50 rounded-lg p-3 flex justify-between items-center">
            <div className="flex items-center">
              <div className="bg-indigo-100 rounded-full p-1.5 mr-3">
                <Dumbbell className="h-4 w-4 text-indigo-600" />
              </div>
              <span className="text-sm font-medium text-indigo-800">Remaining workouts</span>
            </div>
            <motion.span 
              className="font-medium text-indigo-700 bg-white px-2 py-1 rounded-md shadow-sm"
              whileHover={{ y: -2, boxShadow: "0 4px 6px -1px rgba(99, 102, 241, 0.1)" }}
            >
              1
            </motion.span>
          </div>
        </motion.div>
      </div>
    </Neumorphic>
  );
}
