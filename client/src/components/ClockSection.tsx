import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Neumorphic } from "./ui/neumorphic";
import AnalogClock from "./AnalogClock";
import { Clock, Timer, Calendar, Activity, Dumbbell, Play, Pause, RotateCw } from "lucide-react";
import { Link } from "wouter";
import { apiRequest } from "@/lib/queryClient";

export default function ClockSection() {
  const [digitalTime, setDigitalTime] = useState("");
  const [dateString, setDateString] = useState("");
  const [isActivityRunning, setIsActivityRunning] = useState(false);
  const [activeTime, setActiveTime] = useState("1h 45m");
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [remainingWorkouts, setRemainingWorkouts] = useState(0);
  
  // Fetch workouts data
  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await apiRequest('/api/workouts');
        if (response) {
          const workouts = response.filter((workout: any) => 
            workout.status === 'scheduled' || workout.status === 'in_progress'
          );
          setRemainingWorkouts(workouts.length);
        }
      } catch (error) {
        console.error("Failed to fetch workouts:", error);
        setRemainingWorkouts(0);
      }
    };
    
    fetchWorkouts();
    // Refresh every 5 minutes
    const intervalId = setInterval(fetchWorkouts, 5 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, []);

  // Toggle activity timer
  const toggleActivityTimer = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (isActivityRunning) {
      // Stop timer
      if (timer) {
        clearInterval(timer);
        setTimer(null);
      }
    } else {
      // Start timer - add seconds to elapsed time
      const newTimer = setInterval(() => {
        setElapsedSeconds(prev => prev + 1);
      }, 1000);
      setTimer(newTimer);
    }
    
    setIsActivityRunning(!isActivityRunning);
  };

  // Format elapsed seconds to time string
  useEffect(() => {
    const hours = Math.floor(elapsedSeconds / 3600);
    const minutes = Math.floor((elapsedSeconds % 3600) / 60);
    const timeString = `${hours}h ${minutes}m`;
    setActiveTime(timeString);
  }, [elapsedSeconds]);

  // Reset timer
  const resetTimer = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (timer) {
      clearInterval(timer);
      setTimer(null);
    }
    setElapsedSeconds(0);
    setIsActivityRunning(false);
  };

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
    
    return () => {
      clearInterval(intervalId);
      if (timer) clearInterval(timer);
    };
  }, [timer]);

  return (
    <Neumorphic className="p-6 flex flex-col items-center relative overflow-hidden">
      <div className="flex items-center justify-between w-full mb-6">
        <div className="flex items-center">
          <Timer className="h-5 w-5 text-purple-500 mr-2" />
          <h2 className="text-xl font-heading font-semibold">Time Tracker</h2>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-28 h-28 bg-purple-500 rounded-full opacity-5 -mr-10 -mt-10"></div>
      <div className="absolute bottom-0 left-0 w-20 h-20 bg-indigo-500 rounded-full opacity-5 -ml-8 -mb-8"></div>
      
      <div className="relative z-10 flex flex-col items-center w-full">
        <div className="flex justify-center w-full">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-4 mx-auto text-center"
          >
            <AnalogClock />
          </motion.div>
        </div>
        
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
          <motion.div 
            className="bg-purple-50 rounded-lg p-3 flex justify-between items-center cursor-pointer"
            whileHover={{ scale: 1.02, boxShadow: "0 4px 6px -1px rgba(139, 92, 246, 0.1)" }}
            onClick={toggleActivityTimer}
          >
            <div className="flex items-center">
              <div className="bg-purple-100 rounded-full p-1.5 mr-3">
                <Activity className={`h-4 w-4 ${isActivityRunning ? "text-green-600" : "text-purple-600"}`} />
              </div>
              <span className="text-sm font-medium text-purple-800">Active time today</span>
            </div>
            <div className="flex items-center gap-2">
              <motion.span 
                className={`font-medium ${isActivityRunning ? "text-green-700" : "text-purple-700"} bg-white px-2 py-1 rounded-md shadow-sm`}
                whileHover={{ y: -2, boxShadow: "0 4px 6px -1px rgba(139, 92, 246, 0.1)" }}
              >
                {activeTime}
              </motion.span>
              <motion.button
                className={`p-1.5 rounded-full ${isActivityRunning ? "bg-red-100" : "bg-green-100"}`}
                whileHover={{ scale: 1.1 }}
                onClick={toggleActivityTimer}
              >
                {isActivityRunning ? 
                  <Pause className="h-3.5 w-3.5 text-red-600" /> : 
                  <Play className="h-3.5 w-3.5 text-green-600" />
                }
              </motion.button>
              <motion.button
                className="p-1.5 rounded-full bg-gray-100"
                whileHover={{ scale: 1.1 }}
                onClick={resetTimer}
              >
                <RotateCw className="h-3.5 w-3.5 text-gray-600" />
              </motion.button>
            </div>
          </motion.div>
          
          <Link href="/workouts" className="block no-underline">
            <motion.div 
              className="bg-indigo-50 rounded-lg p-3 flex justify-between items-center cursor-pointer"
              whileHover={{ scale: 1.02, boxShadow: "0 4px 6px -1px rgba(99, 102, 241, 0.1)" }}
            >
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
                {remainingWorkouts}
              </motion.span>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </Neumorphic>
  );
}
