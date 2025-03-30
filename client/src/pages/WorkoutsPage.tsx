import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WorkoutSection from "@/components/WorkoutSection";
import PageBackground from "@/components/PageBackground";
import { DatePicker } from "@/components/DatePickerWithRange";
import { format } from "date-fns";
import { Neumorphic } from "@/components/ui/neumorphic";
import { 
  FitnessSVG, 
  GradientText, 
  DecorativeCircle,
  DecorativeBlob 
} from "@/components/ui/decorative-elements";
import { Calendar, BarChart3, History, Dumbbell, Award } from "lucide-react";
import fitnessIllustration from "@/assets/images/fitness-illustration.svg";

export default function WorkoutsPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // Handle date change
  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <PageBackground variant="workout">
      <div className="min-h-screen flex flex-col text-neutral-800 font-sans">
        <Header />
        
        <main className="flex-1 container mx-auto px-4 py-6 md:px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center"
          >
            <div className="flex items-center">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, type: "spring" }}
                className="mr-4 hidden md:block"
              >
                <FitnessSVG color="#6366f1" size={48} />
              </motion.div>
              <div>
                <h1 className="text-3xl font-heading font-bold text-neutral-800 mb-2">
                  <GradientText 
                    text="Workout Plan" 
                    from="from-indigo-600" 
                    via="via-purple-600" 
                    to="to-pink-600" 
                  />
                </h1>
                <p className="text-neutral-600">
                  Schedule, track, and manage all your workout sessions for {format(selectedDate, "MMMM d, yyyy")}
                </p>
              </div>
            </div>
            
            <div className="mt-4 md:mt-0">
              <DatePicker 
                date={selectedDate}
                setDate={handleDateChange}
                className="w-full sm:w-auto"
              />
            </div>
          </motion.div>

          {/* Fitness Illustration Banner */}
          <motion.div 
            className="mb-6 relative overflow-hidden rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-600/20 backdrop-filter backdrop-blur-sm"></div>
            <div className="flex flex-col md:flex-row items-center px-6 py-8 relative">
              <div className="md:w-1/2 mb-6 md:mb-0">
                <h2 className="text-2xl font-bold text-indigo-900 mb-2">
                  Your Fitness Journey Starts Here
                </h2>
                <p className="text-indigo-800 mb-4">
                  Track workouts, set goals, and achieve your personal best with our comprehensive fitness tracking tools.
                </p>
                <motion.button
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-full shadow-lg flex items-center"
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(79, 70, 229, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Dumbbell className="h-4 w-4 mr-2" />
                  <span>Start Workout</span>
                </motion.button>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <motion.img 
                  src={fitnessIllustration} 
                  alt="Fitness Illustration" 
                  className="max-w-full md:max-w-sm"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                />
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 gap-6">
            <WorkoutSection selectedDate={selectedDate} />
            
            {/* Calendar View Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Neumorphic className="p-6">
                <div className="flex items-center mb-4">
                  <Calendar className="mr-2 h-5 w-5 text-indigo-500" />
                  <h2 className="text-xl font-heading font-semibold">
                    Workout Calendar
                  </h2>
                </div>
                
                <div className="flex flex-col md:flex-row items-center justify-center gap-6 py-10 text-center">
                  <motion.div 
                    className="flex flex-col items-center p-6 rounded-xl bg-indigo-50 shadow-sm w-full md:w-1/3"
                    whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  >
                    <Dumbbell className="h-10 w-10 text-indigo-500 mb-4" />
                    <p className="text-neutral-700">
                      View your weekly workout schedule
                    </p>
                  </motion.div>
                  
                  <motion.div 
                    className="flex flex-col items-center p-6 rounded-xl bg-purple-50 shadow-sm w-full md:w-1/3"
                    whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  >
                    <Award className="h-10 w-10 text-purple-500 mb-4" />
                    <p className="text-neutral-700">
                      Track your workout achievements
                    </p>
                  </motion.div>
                  
                  <motion.div 
                    className="flex flex-col items-center p-6 rounded-xl bg-pink-50 shadow-sm w-full md:w-1/3"
                    whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  >
                    <BarChart3 className="h-10 w-10 text-pink-500 mb-4" />
                    <p className="text-neutral-700">
                      Analyze your exercise trends
                    </p>
                  </motion.div>
                </div>
                
                <p className="text-center text-sm text-neutral-500 mt-4">
                  Advanced calendar features coming soon!
                </p>
              </Neumorphic>
            </motion.div>
            
            {/* Workout History Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Neumorphic className="p-6 relative overflow-hidden">
                <DecorativeBlob 
                  className="absolute -bottom-20 -right-10 opacity-5 pointer-events-none" 
                  color="primary" 
                  scale={0.6} 
                />
                
                <div className="flex items-center mb-4">
                  <History className="mr-2 h-5 w-5 text-indigo-500" />
                  <h2 className="text-xl font-heading font-semibold">
                    Workout History
                  </h2>
                </div>
                
                <div className="flex justify-center py-8">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg blur opacity-20"></div>
                    <motion.div 
                      className="relative bg-white rounded-lg p-8 shadow-sm text-center"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <p className="text-neutral-700 max-w-lg">
                        Track your complete workout history, including duration, intensity, and progress over time. Detailed statistics and history will be available soon!
                      </p>
                    </motion.div>
                  </div>
                </div>
              </Neumorphic>
            </motion.div>
          </div>
        </main>
        
        <Footer />
      </div>
    </PageBackground>
  );
}