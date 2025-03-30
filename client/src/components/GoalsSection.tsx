import { motion } from "framer-motion";
import { Neumorphic } from "./ui/neumorphic";

export default function GoalsSection() {
  const goals = [
    {
      title: "Weight Goal",
      description: "Lose 10 pounds",
      progress: "4.2/10 lbs",
      progressColor: "bg-success",
      progressPercentage: 42,
      startDate: "May 10",
      endDate: "Jul 10",
      progressText: "Started"
    },
    {
      title: "Running Goal",
      description: "Run 50 miles this month",
      progress: "31.5/50 mi",
      progressColor: "bg-primary",
      progressPercentage: 63,
      progressText: "Progress: 63%",
      timeLeft: "18 days left"
    },
    {
      title: "Strength Goal",
      description: "Bench press 200 lbs",
      progress: "185/200 lbs",
      progressColor: "bg-warning",
      progressPercentage: 92,
      progressText: "Progress: 92%",
      timeLeft: "Almost there!"
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
        <h2 className="text-xl font-heading font-semibold">Fitness Goals</h2>
        <motion.button 
          className="text-neutral-600 hover:text-neutral-800 transition-colors"
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2 }}
        >
          <i className="bx bx-plus-circle text-xl"></i>
        </motion.button>
      </div>
      
      <motion.div 
        className="space-y-5"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {goals.map((goal, index) => (
          <motion.div 
            key={index}
            variants={itemVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <Neumorphic className="p-5">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-medium">{goal.title}</h3>
                  <p className="text-sm text-neutral-600">{goal.description}</p>
                </div>
                <span className="text-sm font-medium text-success">{goal.progress}</span>
              </div>
              <div className="h-2 rounded-full w-full bg-neutral-100 shadow-[inset_2px_2px_5px_#d9d9d9,_inset_-2px_-2px_5px_#ffffff]">
                <motion.div 
                  className={`${goal.progressColor} h-full rounded-full`}
                  initial={{ width: 0 }}
                  animate={{ width: `${goal.progressPercentage}%` }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                ></motion.div>
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-xs text-neutral-500">{goal.progressText}: {goal.startDate}</span>
                <span className="text-xs text-neutral-500">{goal.timeLeft || `Target: ${goal.endDate}`}</span>
              </div>
            </Neumorphic>
          </motion.div>
        ))}
      </motion.div>
    </Neumorphic>
  );
}
