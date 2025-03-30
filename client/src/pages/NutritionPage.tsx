import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CaloriesSection from "@/components/CaloriesSection";
import PageBackground from "@/components/PageBackground";
import { DatePicker } from "@/components/DatePickerWithRange";
import { format } from "date-fns";
import { Neumorphic } from "@/components/ui/neumorphic";

export default function NutritionPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // Handle date change
  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <PageBackground>
      <div className="min-h-screen flex flex-col text-neutral-800 font-sans">
        <Header />
        
        <main className="flex-1 container mx-auto px-4 py-6 md:px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center"
          >
            <div>
              <h1 className="text-3xl font-heading font-bold text-neutral-800 mb-2">
                Nutrition Tracker
              </h1>
              <p className="text-neutral-600">
                Monitor your calorie intake and track your daily nutrition for {format(selectedDate, "MMMM d, yyyy")}
              </p>
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
            <CaloriesSection />
            
            {/* Meal Planner Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Neumorphic className="p-6">
                <h2 className="text-xl font-heading font-semibold mb-4">
                  Meal Planner
                </h2>
                <p className="text-neutral-600 text-center py-8">
                  Meal planning feature coming soon!
                </p>
              </Neumorphic>
            </motion.div>
            
            {/* Nutrition History Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Neumorphic className="p-6">
                <h2 className="text-xl font-heading font-semibold mb-4">
                  Nutrition History
                </h2>
                <p className="text-neutral-600 text-center py-8">
                  Detailed nutrition history and analytics coming soon!
                </p>
              </Neumorphic>
            </motion.div>
          </div>
        </main>
        
        <Footer />
      </div>
    </PageBackground>
  );
}