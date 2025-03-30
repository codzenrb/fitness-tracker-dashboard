import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GoalsSection from "@/components/GoalsSection";
import ActivitySection from "@/components/ActivitySection";
import StatsOverview from "@/components/StatsOverview";
import PageBackground from "@/components/PageBackground";
import { DatePicker } from "@/components/DatePickerWithRange";
import { format } from "date-fns";
import { Neumorphic } from "@/components/ui/neumorphic";
import { 
  GlassmorphicCard, 
  GlassCapsule,
  GlassPanel
} from "@/components/ui/glassmorphism";
import { 
  ProgressSVG,
  GradientText, 
  DecorativeCircle,
  DecorativeBlob,
  DecorativeDots 
} from "@/components/ui/decorative-elements";
import { 
  BarChart3, 
  LineChart, 
  Activity, 
  TrendingUp, 
  Award,
  Zap,
  Flame,
  Heart,
  ArrowUp,
  ArrowDown
} from "lucide-react";

// Custom stat card component
const StatCard = ({ 
  title, 
  value, 
  trend, 
  trendValue, 
  icon: Icon, 
  color 
}: { 
  title: string;
  value: string;
  trend: "up" | "down" | "neutral";
  trendValue: string;
  icon: any;
  color: string;
}) => {
  const trendColors = {
    up: "text-green-600",
    down: "text-red-600",
    neutral: "text-blue-600"
  };
  
  const TrendIcon = trend === "up" ? ArrowUp : trend === "down" ? ArrowDown : TrendingUp;
  
  return (
    <motion.div
      className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
    >
      <div className="flex justify-between items-start mb-3">
        <span className="text-sm text-neutral-600">{title}</span>
        <div className={`${color} p-2 rounded-full`}>
          <Icon className="h-4 w-4 text-white" />
        </div>
      </div>
      <div className="text-2xl font-bold">{value}</div>
      <div className={`flex items-center text-xs mt-2 ${trendColors[trend]}`}>
        <TrendIcon className="h-3 w-3 mr-1" />
        <span>{trendValue}</span>
      </div>
    </motion.div>
  );
};

export default function ProgressPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // Handle date change
  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <PageBackground variant="progress">
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
                <ProgressSVG color="#8b5cf6" size={48} />
              </motion.div>
              <div>
                <h1 className="text-3xl font-heading font-bold text-neutral-800 mb-2">
                  <GradientText 
                    text="Progress Tracker" 
                    from="from-indigo-600" 
                    via="via-purple-600" 
                    to="to-pink-600" 
                  />
                </h1>
                <p className="text-neutral-600">
                  Track your fitness journey and monitor your goals for {format(selectedDate, "MMMM d, yyyy")}
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

          <div className="grid grid-cols-1 gap-6">
            {/* Enhanced Stats Overview Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <GlassPanel glow={true} glowColor="rgba(139, 92, 246, 0.2)">
                <div className="flex items-center mb-6">
                  <Activity className="mr-2 h-5 w-5 text-purple-500" />
                  <h2 className="text-xl font-heading font-semibold text-neutral-800">
                    Fitness Stats
                  </h2>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <StatCard 
                    title="Calories Burned" 
                    value="1,248" 
                    trend="up" 
                    trendValue="+15% from last week"
                    icon={Flame}
                    color="bg-orange-500"
                  />
                  
                  <StatCard 
                    title="Active Minutes" 
                    value="142" 
                    trend="up" 
                    trendValue="+23% from last week"
                    icon={Zap}
                    color="bg-indigo-500"
                  />
                  
                  <StatCard 
                    title="Workouts" 
                    value="5" 
                    trend="neutral" 
                    trendValue="Same as last week"
                    icon={Activity}
                    color="bg-purple-500"
                  />
                  
                  <StatCard 
                    title="Heart Rate (avg)" 
                    value="72 bpm" 
                    trend="down" 
                    trendValue="-5% from last week"
                    icon={Heart}
                    color="bg-red-500"
                  />
                </div>
                
                <div className="flex justify-center mt-6">
                  <GlassCapsule className="text-sm text-purple-700 font-medium" color="purple" animated={true}>
                    Looking Good!
                  </GlassCapsule>
                </div>
              </GlassPanel>
            </motion.div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Enhanced Goals Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <GoalsSection />
              </motion.div>
              
              {/* Enhanced Activity Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <ActivitySection selectedDate={selectedDate} />
              </motion.div>
            </div>
            
            {/* Enhanced Charts and Progress Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <GlassmorphicCard 
                title="Trend Analysis" 
                icon={<LineChart className="h-5 w-5 text-purple-500" />}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                  <div className="relative p-4 flex flex-col items-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-lg"></div>
                    <motion.div 
                      className="relative"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <div className="flex justify-center mb-3">
                        <BarChart3 className="h-8 w-8 text-indigo-500" />
                      </div>
                      <h3 className="text-center font-medium mb-2">Weight Progress</h3>
                      <div className="text-sm text-center text-neutral-600">
                        Track your weight changes over time with detailed charts
                      </div>
                    </motion.div>
                  </div>
                  
                  <div className="relative p-4 flex flex-col items-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg"></div>
                    <motion.div 
                      className="relative"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      <div className="flex justify-center mb-3">
                        <Activity className="h-8 w-8 text-purple-500" />
                      </div>
                      <h3 className="text-center font-medium mb-2">Workout Analysis</h3>
                      <div className="text-sm text-center text-neutral-600">
                        Visualize your workout intensity and performance
                      </div>
                    </motion.div>
                  </div>
                  
                  <div className="relative p-4 flex flex-col items-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-orange-500/10 rounded-lg"></div>
                    <motion.div 
                      className="relative"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      <div className="flex justify-center mb-3">
                        <Award className="h-8 w-8 text-pink-500" />
                      </div>
                      <h3 className="text-center font-medium mb-2">Goal Completion</h3>
                      <div className="text-sm text-center text-neutral-600">
                        Monitor your goal progress and achievement rate
                      </div>
                    </motion.div>
                  </div>
                </div>
                
                <div className="mt-8 p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium text-purple-800">Your Fitness Journey</h3>
                    <div className="text-xs text-neutral-500">Last 6 months</div>
                  </div>
                  
                  <div className="h-36 relative">
                    <div className="absolute inset-0 flex items-end">
                      <div className="w-1/6 h-[20%] bg-indigo-200 mx-0.5 rounded-t"></div>
                      <div className="w-1/6 h-[35%] bg-indigo-300 mx-0.5 rounded-t"></div>
                      <div className="w-1/6 h-[30%] bg-indigo-400 mx-0.5 rounded-t"></div>
                      <div className="w-1/6 h-[45%] bg-indigo-500 mx-0.5 rounded-t"></div>
                      <div className="w-1/6 h-[60%] bg-indigo-600 mx-0.5 rounded-t"></div>
                      <motion.div 
                        className="w-1/6 h-[80%] bg-indigo-700 mx-0.5 rounded-t"
                        initial={{ height: "20%" }}
                        animate={{ height: "80%" }}
                        transition={{ duration: 1, delay: 0.5 }}
                      ></motion.div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between mt-2 text-xs text-neutral-500">
                    <div>Nov</div>
                    <div>Dec</div>
                    <div>Jan</div>
                    <div>Feb</div>
                    <div>Mar</div>
                    <div>Apr</div>
                  </div>
                </div>
              </GlassmorphicCard>
            </motion.div>
          </div>
        </main>
        
        <Footer />
      </div>
    </PageBackground>
  );
}