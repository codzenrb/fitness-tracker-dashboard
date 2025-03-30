import { useState } from "react";
import { motion } from "framer-motion";
import { Neumorphic } from "./ui/neumorphic";

export default function ActivitySection() {
  const [selectedDay, setSelectedDay] = useState(3); // Thursday (0-indexed)
  
  const weekDays = [
    { abbr: "MON", day: 24 },
    { abbr: "TUE", day: 25 },
    { abbr: "WED", day: 26 },
    { abbr: "THU", day: 27 },
    { abbr: "FRI", day: 28 },
    { abbr: "SAT", day: 29 },
    { abbr: "SUN", day: 30 }
  ];
  
  const activityLog = [
    {
      icon: "bx-dumbbell",
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
      title: "Upper Body Strength",
      details: "45 mins · 320 calories · 9:30 AM",
      status: "Completed",
      statusColor: "bg-green-100 text-success"
    },
    {
      icon: "bx-run",
      iconBg: "bg-blue-500/10",
      iconColor: "text-blue-500",
      title: "Morning Walk",
      details: "25 mins · 180 calories · 7:15 AM",
      status: "Completed",
      statusColor: "bg-green-100 text-success"
    },
    {
      icon: "bx-water",
      iconBg: "bg-purple-500/10",
      iconColor: "text-purple-500",
      title: "Hydration Goal",
      details: "1.8 / 2.5 L · 72% complete",
      status: "In Progress",
      statusColor: "bg-blue-100 text-blue-600"
    }
  ];

  return (
    <Neumorphic className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-heading font-semibold">Activity Log</h2>
        <motion.button 
          className="text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
          whileHover={{ x: 3 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <span>View All</span>
          <i className="bx bx-chevron-right"></i>
        </motion.button>
      </div>
      
      <div className="overflow-x-auto">
        <div className="flex min-w-max space-x-3 mb-6">
          {weekDays.map((day, index) => (
            <motion.button 
              key={index}
              className={`min-w-[60px] py-3 px-2 flex flex-col items-center border-2 ${selectedDay === index ? 'border-primary' : 'border-transparent hover:border-primary/10'} transition-colors bg-neutral-100 rounded-lg shadow-[5px_5px_10px_#d9d9d9,_-5px_-5px_10px_#ffffff]`}
              onClick={() => setSelectedDay(index)}
              whileHover={{ y: -3 }}
              whileTap={{ y: 0 }}
            >
              <span className={`text-xs ${selectedDay === index ? 'text-primary font-medium' : 'text-neutral-500'}`}>{day.abbr}</span>
              <span className={`text-lg font-medium mt-1 ${selectedDay === index ? 'text-primary' : ''}`}>{day.day}</span>
            </motion.button>
          ))}
        </div>
      </div>
      
      <motion.div 
        className="space-y-4"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
          }
        }}
      >
        {activityLog.map((activity, index) => (
          <motion.div 
            key={index}
            className="flex items-center p-3 rounded-lg hover:bg-neutral-200/50 transition-colors"
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
            }}
          >
            <div className={`w-10 h-10 flex items-center justify-center rounded-full ${activity.iconBg} ${activity.iconColor}`}>
              <i className={`bx ${activity.icon} text-xl`}></i>
            </div>
            <div className="ml-4 flex-1">
              <h4 className="font-medium">{activity.title}</h4>
              <p className="text-sm text-neutral-600">{activity.details}</p>
            </div>
            <div className={`px-3 py-1 rounded-full ${activity.statusColor} text-xs font-medium`}>
              {activity.status}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Neumorphic>
  );
}
