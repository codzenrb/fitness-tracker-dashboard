import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "./Header";
import Footer from "./Footer";
import StatsOverview from "./StatsOverview";
import WorkoutSection from "./WorkoutSection";
import CaloriesSection from "./CaloriesSection";
import ActivitySection from "./ActivitySection";
import GoalsSection from "./GoalsSection";
import ClockSection from "./ClockSection";
import TipsSection from "./TipsSection";
import { useUser } from "@/contexts/UserContext";

export default function Dashboard() {
  const { user, logout } = useUser();
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    };
    setCurrentDate(date.toLocaleDateString('en-US', options));
  }, []);

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-100 text-neutral-800 font-sans">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6 md:px-6">
        <motion.section 
          className="mb-8"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h2 className="text-3xl font-heading font-semibold">Hello, {user.name || 'Fitness Enthusiast'} 👋</h2>
              <p className="text-neutral-600 mt-1">Here's your fitness summary for today</p>
            </div>
            
            <motion.div 
              className="bg-neutral-100 px-4 py-3 flex items-center gap-3 mt-4 md:mt-0 rounded-lg shadow-[5px_5px_10px_#d9d9d9,_-5px_-5px_10px_#ffffff]"
              whileHover={{ y: -3, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
              transition={{ duration: 0.3 }}
            >
              <i className="bx bx-calendar text-primary text-xl"></i>
              <span className="font-medium">{currentDate}</span>
            </motion.div>
          </motion.div>
          
          <StatsOverview />
        </motion.section>
        
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
            <WorkoutSection />
            <CaloriesSection />
            <ActivitySection />
          </motion.div>
          
          <motion.div variants={itemVariants} className="space-y-6">
            <GoalsSection />
            <ClockSection />
            <TipsSection />
          </motion.div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
}
