import { motion } from "framer-motion";
import { Neumorphic } from "./ui/neumorphic";
import { GlassmorphicCard } from "./ui/glassmorphism";
import { Lightbulb, Heart, RefreshCw, Droplets, Flame, Utensils } from "lucide-react";
import { DecorativeBlob } from "./ui/decorative-elements";

export default function TipsSection() {
  const tips = [
    {
      icon: Droplets,
      iconColor: "text-blue-500",
      bgColor: "bg-blue-100",
      title: "Hydration Reminder",
      content: "Remember to drink water consistently throughout the day instead of all at once. This helps with better absorption."
    },
    {
      icon: Heart,
      iconColor: "text-pink-500",
      bgColor: "bg-pink-100",
      title: "Today's Motivation",
      content: "\"The only bad workout is the one that didn't happen. Every step counts toward your goals.\""
    },
    {
      icon: Flame,
      iconColor: "text-orange-500",
      bgColor: "bg-orange-100",
      title: "Calorie Tip",
      content: "Include protein in every meal to help maintain muscle mass and keep you feeling full longer."
    }
  ];

  return (
    <Neumorphic className="p-6 relative overflow-hidden">
      <div className="relative z-10">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Lightbulb className="h-5 w-5 text-amber-500 mr-2" />
            <h2 className="text-xl font-heading font-semibold">Quick Tips</h2>
          </div>
          <motion.button 
            className="p-2 rounded-full hover:bg-neutral-200 transition-colors"
            whileHover={{ rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.4 }}
          >
            <RefreshCw className="h-4 w-4 text-neutral-600" />
          </motion.button>
        </div>
        
        <div className="space-y-4">
          {tips.map((tip, index) => {
            const Icon = tip.icon;
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.4 }}
              >
                <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-white/20 shadow-sm">
                  <div className="flex gap-3">
                    <div className={`${tip.bgColor} rounded-full p-2 h-10 w-10 flex items-center justify-center shrink-0`}>
                      <Icon className={`h-5 w-5 ${tip.iconColor}`} />
                    </div>
                    <div>
                      <h3 className="font-medium">{tip.title}</h3>
                      <p className="text-sm text-neutral-600 mt-1">{tip.content}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        
        <div className="flex justify-center mt-4">
          <motion.div 
            className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm flex items-center"
            whileHover={{ scale: 1.05, boxShadow: "0 5px 15px -5px rgba(251, 146, 60, 0.4)" }}
          >
            <Utensils className="h-3 w-3 mr-2" />
            <span>More Nutrition Tips</span>
          </motion.div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <DecorativeBlob 
        className="absolute -bottom-24 -right-24 opacity-5 pointer-events-none" 
        color="warning" 
        scale={0.8} 
      />
      <div className="absolute top-8 right-8 h-20 w-20 rounded-full bg-amber-500 opacity-5"></div>
      <div className="absolute bottom-12 left-6 h-12 w-12 rounded-full bg-orange-500 opacity-5"></div>
    </Neumorphic>
  );
}
