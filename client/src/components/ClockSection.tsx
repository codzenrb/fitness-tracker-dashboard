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
    <Neumorphic className="p-6 flex flex-col items-center relative overflow-hidden animate-fade-in">
      <div className="flex items-center justify-between w-full mb-6">
        <div className="flex items-center">
          <Timer className="h-5 w-5 text-purple-400 mr-2" />
          <h2 className="text-xl font-heading font-semibold text-white text-shadow">Time Tracker</h2>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-28 h-28 bg-purple-500 rounded-full opacity-10 -mr-10 -mt-10 animate-pulse-slow"></div>
      <div className="absolute bottom-0 left-0 w-20 h-20 bg-indigo-500 rounded-full opacity-10 -ml-8 -mb-8 animate-pulse-slow"></div>
      <div className="absolute top-1/4 left-1/4 w-12 h-12 bg-pink-400 rounded-full opacity-10 -ml-6"></div>
      
      <div className="relative z-10 flex flex-col items-center w-full">
        <div className="flex justify-center w-full">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-4 mx-auto text-center relative"
          >
            {/* Add a subtle glow effect behind the clock */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[100%] h-[100%] rounded-full bg-gradient-to-r from-purple-900 to-indigo-900 blur-xl opacity-20 -z-10"></div>
            <AnalogClock />
          </motion.div>
        </div>
        
        <motion.div 
          className="text-2xl font-medium mb-1 text-center text-white text-glow glassmorphism px-4 py-1 rounded-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {digitalTime}
        </motion.div>
        
        <motion.div 
          className="flex items-center justify-center text-sm text-gray-300 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Calendar className="h-3.5 w-3.5 mr-2 text-purple-400" />
          <span className="bg-gray-800 bg-opacity-60 px-2 py-0.5 rounded-md border border-gray-700">{dateString}</span>
        </motion.div>
        
        <motion.div 
          className="w-full space-y-4 mt-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          <motion.div 
            className="glassmorphism rounded-lg p-3 flex justify-between items-center cursor-pointer card-hover"
            whileHover={{ scale: 1.02, boxShadow: "0 4px 15px -1px rgba(124, 58, 237, 0.2)" }}
            onClick={toggleActivityTimer}
          >
            <div className="flex items-center">
              <div className={`gradient-purple rounded-full p-1.5 mr-3 ${isActivityRunning ? 'animate-pulse-slow' : ''}`}>
                <Activity className={`h-4 w-4 text-white`} />
              </div>
              <span className="text-sm font-medium text-gray-200">Active time today</span>
            </div>
            <div className="flex items-center gap-2">
              <motion.span 
                className={`font-medium ${isActivityRunning ? "text-green-400" : "text-purple-300"} bg-gray-800 px-2 py-1 rounded-md shadow-sm border border-gray-700`}
                whileHover={{ y: -2, boxShadow: "0 4px 6px -1px rgba(124, 58, 237, 0.2)" }}
              >
                {activeTime}
              </motion.span>
              <motion.button
                className={`p-1.5 rounded-full ${isActivityRunning ? "bg-red-900 button-glow" : "bg-green-900 button-glow"}`}
                whileHover={{ scale: 1.1 }}
                onClick={toggleActivityTimer}
              >
                {isActivityRunning ? 
                  <Pause className="h-3.5 w-3.5 text-red-300" /> : 
                  <Play className="h-3.5 w-3.5 text-green-300" />
                }
              </motion.button>
              <motion.button
                className="p-1.5 rounded-full bg-gray-800 button-glow"
                whileHover={{ scale: 1.1 }}
                onClick={resetTimer}
              >
                <RotateCw className="h-3.5 w-3.5 text-gray-300" />
              </motion.button>
            </div>
          </motion.div>
          
          <Link href="/workouts" className="block no-underline">
            <motion.div 
              className="glassmorphism rounded-lg p-3 flex justify-between items-center cursor-pointer card-hover"
              whileHover={{ scale: 1.02, boxShadow: "0 4px 15px -1px rgba(56, 189, 248, 0.2)" }}
            >
              <div className="flex items-center">
                <div className="gradient-blue rounded-full p-1.5 mr-3">
                  <Dumbbell className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-200">Remaining workouts</span>
              </div>
              <motion.span 
                className="font-medium text-blue-300 bg-gray-800 px-3 py-1 rounded-md shadow-sm border border-gray-700"
                whileHover={{ y: -2, boxShadow: "0 4px 6px -1px rgba(56, 189, 248, 0.2)" }}
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
