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
import loginIllustration from "@/assets/images/login-illustration.svg";
import { 
  Award, 
  Dumbbell, 
  TrendingUp, 
  Heart 
} from "lucide-react";

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
            <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
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
            
            {/* Welcome Dashboard Banner */}
            <motion.div 
              variants={itemVariants}
              className="mb-8 relative overflow-hidden rounded-xl bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 backdrop-filter backdrop-blur-sm"
            >
              <div className="flex flex-col md:flex-row items-center px-6 py-8 relative">
                <div className="md:w-2/3 mb-6 md:mb-0 z-10">
                  <h2 className="text-2xl font-bold text-indigo-900 mb-2">
                    Your Fitness Journey Dashboard
                  </h2>
                  <p className="text-indigo-800 mb-4 max-w-lg">
                    Track your progress, manage your workouts, and achieve your fitness goals all in one place. Stay motivated and celebrate every milestone!
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <motion.div
                      className="flex items-center bg-white/30 px-4 py-2 rounded-full shadow-sm"
                      whileHover={{ y: -3, boxShadow: "0 10px 25px -5px rgba(79, 70, 229, 0.2)" }}
                    >
                      <Dumbbell className="h-4 w-4 text-indigo-600 mr-2" />
                      <span className="text-sm font-medium text-indigo-800">Workouts</span>
                    </motion.div>
                    
                    <motion.div
                      className="flex items-center bg-white/30 px-4 py-2 rounded-full shadow-sm"
                      whileHover={{ y: -3, boxShadow: "0 10px 25px -5px rgba(139, 92, 246, 0.2)" }}
                    >
                      <TrendingUp className="h-4 w-4 text-purple-600 mr-2" />
                      <span className="text-sm font-medium text-purple-800">Progress</span>
                    </motion.div>
                    
                    <motion.div
                      className="flex items-center bg-white/30 px-4 py-2 rounded-full shadow-sm"
                      whileHover={{ y: -3, boxShadow: "0 10px 25px -5px rgba(236, 72, 153, 0.2)" }}
                    >
                      <Award className="h-4 w-4 text-pink-600 mr-2" />
                      <span className="text-sm font-medium text-pink-800">Goals</span>
                    </motion.div>
                    
                    <motion.div
                      className="flex items-center bg-white/30 px-4 py-2 rounded-full shadow-sm"
                      whileHover={{ y: -3, boxShadow: "0 10px 25px -5px rgba(239, 68, 68, 0.2)" }}
                    >
                      <Heart className="h-4 w-4 text-red-600 mr-2" />
                      <span className="text-sm font-medium text-red-800">Health</span>
                    </motion.div>
                  </div>
                </div>
                <div className="md:w-1/3 flex justify-center z-10">
                  <motion.img 
                    src={loginIllustration} 
                    alt="Fitness Dashboard Illustration" 
                    className="max-w-full md:max-w-xs"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  />
                </div>
                
                {/* Decorative Background Elements */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500 rounded-full opacity-10"></div>
                <div className="absolute -bottom-20 -left-20 w-56 h-56 bg-pink-500 rounded-full opacity-10"></div>
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
