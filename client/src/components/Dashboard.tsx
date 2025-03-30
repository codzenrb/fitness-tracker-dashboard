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
import PageBackground from "./PageBackground";
import { DatePicker } from "./DatePickerWithRange";
import { format } from "date-fns";

export default function Dashboard() {
  const { user, logout } = useUser();
  const [currentDate, setCurrentDate] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  useEffect(() => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    };
    setCurrentDate(selectedDate.toLocaleDateString('en-US', options));
  }, [selectedDate]);

  // Handle date change
  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

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
    <PageBackground>
      <div className="min-h-screen flex flex-col text-neutral-800 font-sans">
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
                <p className="text-neutral-600 mt-1">Here's your fitness summary for {format(selectedDate, "MMMM d, yyyy")}</p>
              </div>
              
              <div className="mt-4 md:mt-0 flex flex-col sm:flex-row items-center gap-4">
                <DatePicker 
                  date={selectedDate}
                  setDate={handleDateChange}
                  className="w-full sm:w-auto"
                />
              </div>
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
              <WorkoutSection selectedDate={selectedDate} />
              <CaloriesSection />
              <ActivitySection selectedDate={selectedDate} />
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
    </PageBackground>
  );
}
