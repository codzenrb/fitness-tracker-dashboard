import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GoalsSection from "@/components/GoalsSection";
import ActivitySection from "@/components/ActivitySection";
import StatsOverview from "@/components/StatsOverview";

export default function ProgressPage() {
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
            Progress Tracker
          </h1>
          <p className="text-neutral-600">
            Track your fitness journey and monitor your goals
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6">
          <StatsOverview />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <GoalsSection />
            <ActivitySection />
          </div>
          
          {/* Charts and Progress Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200"
          >
            <h2 className="text-xl font-heading font-semibold mb-4">
              Trend Analysis
            </h2>
            <p className="text-neutral-600 text-center py-8">
              Detailed progress charts and analytics coming soon!
            </p>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}