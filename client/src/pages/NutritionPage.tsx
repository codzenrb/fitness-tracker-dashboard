import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CaloriesSection from "@/components/CaloriesSection";
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
  NutritionSVG, 
  GradientText, 
  DecorativeCircle,
  DecorativeBlob 
} from "@/components/ui/decorative-elements";
import { 
  BarChart3, 
  Utensils, 
  BookOpen, 
  Coffee, 
  Salad,
  Fish,
  Apple,
  LineChart,
  Clock,
  CalendarDays
} from "lucide-react";

// Custom Food Icon Component
const FoodIcon = ({ icon: Icon, label, color }: { icon: any, label: string, color: string }) => (
  <motion.div 
    className="flex flex-col items-center"
    whileHover={{ scale: 1.05 }}
  >
    <div className={`rounded-full p-2 mb-2 ${color}`}>
      <Icon className="h-6 w-6 text-white" />
    </div>
    <span className="text-xs font-medium">{label}</span>
  </motion.div>
);

export default function NutritionPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // Handle date change
  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <PageBackground variant="nutrition">
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
                <NutritionSVG color="#10b981" size={48} />
              </motion.div>
              <div>
                <h1 className="text-3xl font-heading font-bold text-neutral-800 mb-2">
                  <GradientText 
                    text="Nutrition Tracker" 
                    from="from-green-600" 
                    via="via-teal-600" 
                    to="to-blue-600" 
                  />
                </h1>
                <p className="text-neutral-600">
                  Monitor your calorie intake and track your daily nutrition for {format(selectedDate, "MMMM d, yyyy")}
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
            {/* Enhanced Calories Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <GlassPanel glow={true} glowColor="rgba(16, 185, 129, 0.2)">
                <div className="flex items-center mb-6">
                  <BarChart3 className="mr-2 h-5 w-5 text-green-500" />
                  <h2 className="text-xl font-heading font-semibold text-neutral-800">
                    Daily Calories
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <motion.div
                    className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 flex flex-col items-center" 
                    whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  >
                    <div className="text-sm text-neutral-600 mb-1">Calories Consumed</div>
                    <div className="text-3xl font-bold text-green-600">1,850</div>
                    <div className="text-xs text-neutral-500 mt-1">of 2,000 goal</div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                      <motion.div 
                        className="bg-green-600 h-2 rounded-full" 
                        initial={{ width: 0 }}
                        animate={{ width: "85%" }}
                        transition={{ duration: 1 }}
                      ></motion.div>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 flex flex-col items-center" 
                    whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  >
                    <div className="text-sm text-neutral-600 mb-1">Proteins</div>
                    <div className="text-3xl font-bold text-blue-600">85g</div>
                    <div className="text-xs text-neutral-500 mt-1">of 120g goal</div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                      <motion.div 
                        className="bg-blue-600 h-2 rounded-full" 
                        initial={{ width: 0 }}
                        animate={{ width: "70%" }}
                        transition={{ duration: 1, delay: 0.1 }}
                      ></motion.div>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 flex flex-col items-center" 
                    whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  >
                    <div className="text-sm text-neutral-600 mb-1">Carbs</div>
                    <div className="text-3xl font-bold text-amber-600">210g</div>
                    <div className="text-xs text-neutral-500 mt-1">of 200g goal</div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                      <motion.div 
                        className="bg-amber-600 h-2 rounded-full" 
                        initial={{ width: 0 }}
                        animate={{ width: "105%" }}
                        transition={{ duration: 1, delay: 0.2 }}
                      ></motion.div>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 flex flex-col items-center" 
                    whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  >
                    <div className="text-sm text-neutral-600 mb-1">Fats</div>
                    <div className="text-3xl font-bold text-pink-600">55g</div>
                    <div className="text-xs text-neutral-500 mt-1">of 60g goal</div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                      <motion.div 
                        className="bg-pink-600 h-2 rounded-full" 
                        initial={{ width: 0 }}
                        animate={{ width: "92%" }}
                        transition={{ duration: 1, delay: 0.3 }}
                      ></motion.div>
                    </div>
                  </motion.div>
                </div>
                
                <div className="flex justify-center mt-2">
                  <GlassCapsule className="text-sm text-green-700 font-medium" color="green">
                    On Track
                  </GlassCapsule>
                </div>
              </GlassPanel>
            </motion.div>
            
            {/* Meal Planner Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <GlassmorphicCard 
                title="Meal Planner" 
                icon={<Utensils className="h-5 w-5 text-green-500" />}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {/* Breakfast Card */}
                  <motion.div 
                    className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
                    whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  >
                    <div className="flex items-center mb-3">
                      <Coffee className="h-4 w-4 text-amber-500 mr-2" />
                      <h3 className="font-medium">Breakfast</h3>
                    </div>
                    <p className="text-sm text-neutral-600 mb-2">Oatmeal with banana and honey</p>
                    <div className="text-xs text-neutral-500">385 calories</div>
                  </motion.div>
                  
                  {/* Lunch Card */}
                  <motion.div 
                    className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
                    whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  >
                    <div className="flex items-center mb-3">
                      <Salad className="h-4 w-4 text-green-500 mr-2" />
                      <h3 className="font-medium">Lunch</h3>
                    </div>
                    <p className="text-sm text-neutral-600 mb-2">Grilled chicken salad with avocado</p>
                    <div className="text-xs text-neutral-500">520 calories</div>
                  </motion.div>
                  
                  {/* Dinner Card */}
                  <motion.div 
                    className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
                    whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  >
                    <div className="flex items-center mb-3">
                      <Fish className="h-4 w-4 text-blue-500 mr-2" />
                      <h3 className="font-medium">Dinner</h3>
                    </div>
                    <p className="text-sm text-neutral-600 mb-2">Baked salmon with quinoa and vegetables</p>
                    <div className="text-xs text-neutral-500">650 calories</div>
                  </motion.div>
                </div>
                
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 py-4">
                  <FoodIcon icon={Apple} label="Fruits" color="bg-red-500" />
                  <FoodIcon icon={Coffee} label="Breakfast" color="bg-amber-500" />
                  <FoodIcon icon={Salad} label="Lunch" color="bg-green-500" />
                  <FoodIcon icon={Fish} label="Dinner" color="bg-blue-500" />
                  <FoodIcon icon={Clock} label="Snacks" color="bg-purple-500" />
                </div>
                
                <div className="flex justify-center mt-4">
                  <motion.button
                    className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-4 py-2 rounded-full shadow-md flex items-center"
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(16, 185, 129, 0.3)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Utensils className="h-4 w-4 mr-2" />
                    <span>Plan Meals</span>
                  </motion.button>
                </div>
              </GlassmorphicCard>
            </motion.div>
            
            {/* Nutrition History Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Neumorphic className="p-6 relative overflow-hidden">
                <DecorativeBlob 
                  className="absolute -top-20 -right-10 opacity-5 pointer-events-none" 
                  color="success" 
                  scale={0.6} 
                />
                
                <div className="flex items-center mb-4">
                  <LineChart className="mr-2 h-5 w-5 text-green-500" />
                  <h2 className="text-xl font-heading font-semibold">
                    Nutrition History
                  </h2>
                </div>
                
                <div className="flex flex-col md:flex-row items-center justify-center gap-6 py-6">
                  <motion.div 
                    className="flex flex-col items-center p-6 rounded-xl bg-green-50 shadow-sm w-full md:w-1/3"
                    whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  >
                    <LineChart className="h-10 w-10 text-green-500 mb-4" />
                    <p className="text-neutral-700">
                      Weekly nutrition trends
                    </p>
                  </motion.div>
                  
                  <motion.div 
                    className="flex flex-col items-center p-6 rounded-xl bg-blue-50 shadow-sm w-full md:w-1/3"
                    whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  >
                    <CalendarDays className="h-10 w-10 text-blue-500 mb-4" />
                    <p className="text-neutral-700">
                      Monthly calorie reports
                    </p>
                  </motion.div>
                  
                  <motion.div 
                    className="flex flex-col items-center p-6 rounded-xl bg-purple-50 shadow-sm w-full md:w-1/3"
                    whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  >
                    <BookOpen className="h-10 w-10 text-purple-500 mb-4" />
                    <p className="text-neutral-700">
                      Nutritional insights
                    </p>
                  </motion.div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg mt-4 border border-green-100/20">
                  <p className="text-neutral-700">
                    <span className="font-semibold text-green-600">Tip of the day:</span> Incorporate a variety of colorful vegetables into your meals for a wider range of nutrients. Aim for at least 5 servings of fruits and vegetables daily.
                  </p>
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