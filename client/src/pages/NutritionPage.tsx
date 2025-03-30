import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CaloriesSection from "@/components/CaloriesSection";

export default function NutritionPage() {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <Header />
      
      <main className="flex-1 px-4 md:px-8 py-6 max-w-screen-xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-heading font-bold text-neutral-800 mb-2">
            Nutrition Tracker
          </h1>
          <p className="text-neutral-600">
            Monitor your calorie intake and track your daily nutrition
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6">
          <CaloriesSection />
          
          {/* Meal Planner Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200"
          >
            <h2 className="text-xl font-heading font-semibold mb-4">
              Meal Planner
            </h2>
            <p className="text-neutral-600 text-center py-8">
              Meal planning feature coming soon!
            </p>
          </motion.div>
          
          {/* Nutrition History Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200"
          >
            <h2 className="text-xl font-heading font-semibold mb-4">
              Nutrition History
            </h2>
            <p className="text-neutral-600 text-center py-8">
              Detailed nutrition history and analytics coming soon!
            </p>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}