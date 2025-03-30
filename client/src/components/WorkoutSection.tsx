import { motion } from "framer-motion";
import { Neumorphic } from "./ui/neumorphic";
import { Glassmorphism } from "./ui/glassmorphism";

export default function WorkoutSection() {
  const workouts = [
    {
      title: "Upper Body Strength",
      status: "Completed",
      statusColor: "bg-green-100 text-success",
      details: "45 mins · 320 calories · 5 exercises"
    },
    {
      title: "Evening Run",
      status: "Scheduled",
      statusColor: "bg-blue-100 text-primary",
      details: "30 mins · 280 calories · 7:00 PM",
      buttons: true
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <Neumorphic className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-heading font-semibold">Today's Workout</h2>
        <motion.button 
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <i className="bx bx-plus"></i>
          <span>Add Workout</span>
        </motion.button>
      </div>
      
      <motion.div 
        className="space-y-5"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {workouts.map((workout, index) => (
          <motion.div 
            key={index}
            variants={itemVariants}
          >
            <Glassmorphism className="p-5 transition-all hover:translate-y-[-3px]">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-lg">{workout.title}</span>
                    <span className={`px-2 py-0.5 rounded-full ${workout.statusColor} text-xs`}>{workout.status}</span>
                  </div>
                  <p className="text-neutral-600 text-sm mt-1">{workout.details}</p>
                </div>
                <div className="flex items-center gap-2">
                  <motion.button 
                    className="p-2 rounded-full hover:bg-neutral-200 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <i className="bx bx-edit text-neutral-600"></i>
                  </motion.button>
                  <motion.button 
                    className="p-2 rounded-full hover:bg-neutral-200 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <i className="bx bx-dots-vertical-rounded text-neutral-600"></i>
                  </motion.button>
                </div>
              </div>
              
              {workout.buttons && (
                <div className="mt-3 flex items-center gap-3">
                  <motion.button 
                    className="flex-1 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Start Workout
                  </motion.button>
                  <motion.button 
                    className="px-3 py-2 rounded-lg border border-neutral-300 hover:bg-neutral-200 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Reschedule
                  </motion.button>
                </div>
              )}
            </Glassmorphism>
          </motion.div>
        ))}
      </motion.div>
    </Neumorphic>
  );
}
