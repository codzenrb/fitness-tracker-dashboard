import { useState } from "react";
import { motion } from "framer-motion";
import { Neumorphic } from "./ui/neumorphic";

export default function CaloriesSection() {
  const [viewMode, setViewMode] = useState<'day' | 'week'>('day');
  
  const caloriesSources = [
    { label: "Breakfast", color: "bg-primary", percentage: 25, calories: 460 },
    { label: "Lunch", color: "bg-success", percentage: 35, calories: 650 },
    { label: "Dinner", color: "bg-warning", percentage: 32, calories: 590 },
    { label: "Snacks", color: "bg-danger", percentage: 8, calories: 142 }
  ];
  
  const burnedSources = [
    { label: "Workout", color: "bg-blue-500", percentage: 52, calories: 320 },
    { label: "Walking", color: "bg-purple-500", percentage: 34, calories: 210 },
    { label: "NEAT", color: "bg-pink-500", percentage: 15, calories: 90 }
  ];

  return (
    <Neumorphic className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-heading font-semibold">Calorie Breakdown</h2>
        <div className="flex">
          <motion.button 
            className={`px-4 py-2 ${viewMode === 'day' ? 'bg-neutral-200' : 'bg-neutral-100'} text-neutral-700 rounded-l-lg hover:bg-neutral-300 transition-colors`}
            whileTap={{ scale: 0.95 }}
            onClick={() => setViewMode('day')}
          >
            Day
          </motion.button>
          <motion.button 
            className={`px-4 py-2 ${viewMode === 'week' ? 'bg-neutral-200' : 'bg-neutral-100'} text-neutral-700 rounded-r-lg hover:bg-neutral-300 transition-colors`}
            whileTap={{ scale: 0.95 }}
            onClick={() => setViewMode('week')}
          >
            Week
          </motion.button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Calories Consumed */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-neutral-600 font-medium">Consumed</h3>
            <span className="text-lg font-semibold">1,842 cal</span>
          </div>
          <div className="space-y-3">
            {caloriesSources.map((source, index) => (
              <motion.div 
                key={index} 
                className="flex items-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className={`w-2 h-2 rounded-full ${source.color} mr-2`}></div>
                <span className="text-sm text-neutral-600">{source.label}</span>
                <div className="h-2 flex-1 mx-3 bg-neutral-100 rounded-full shadow-[inset_2px_2px_5px_#d9d9d9,_inset_-2px_-2px_5px_#ffffff]">
                  <motion.div 
                    className={`${source.color} h-full rounded-full`} 
                    initial={{ width: 0 }}
                    animate={{ width: `${source.percentage}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  ></motion.div>
                </div>
                <span className="text-sm font-medium">{source.calories} cal</span>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Calories Burned */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-neutral-600 font-medium">Burned</h3>
            <span className="text-lg font-semibold">620 cal</span>
          </div>
          <div className="space-y-3">
            {burnedSources.map((source, index) => (
              <motion.div 
                key={index} 
                className="flex items-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
              >
                <div className={`w-2 h-2 rounded-full ${source.color} mr-2`}></div>
                <span className="text-sm text-neutral-600">{source.label}</span>
                <div className="h-2 flex-1 mx-3 bg-neutral-100 rounded-full shadow-[inset_2px_2px_5px_#d9d9d9,_inset_-2px_-2px_5px_#ffffff]">
                  <motion.div 
                    className={`${source.color} h-full rounded-full`} 
                    initial={{ width: 0 }}
                    animate={{ width: `${source.percentage}%` }}
                    transition={{ duration: 1, delay: index * 0.1 + 0.2 }}
                  ></motion.div>
                </div>
                <span className="text-sm font-medium">{source.calories} cal</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      <motion.div 
        className="mt-6 pt-6 border-t border-neutral-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-medium">Net Calories</h3>
            <p className="text-sm text-neutral-600">Daily Goal: 1,800 cal</p>
          </div>
          <div className="text-2xl font-semibold text-primary">1,222 cal</div>
        </div>
      </motion.div>
    </Neumorphic>
  );
}
