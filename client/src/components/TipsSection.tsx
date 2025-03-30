import { motion } from "framer-motion";
import { Neumorphic } from "./ui/neumorphic";
import { Glassmorphism } from "./ui/glassmorphism";

export default function TipsSection() {
  const tips = [
    {
      icon: "bx-bulb",
      iconColor: "text-warning",
      title: "Hydration Reminder",
      content: "Remember to drink water consistently throughout the day instead of all at once. This helps with better absorption."
    },
    {
      icon: "bx-heart",
      iconColor: "text-danger",
      title: "Today's Motivation",
      content: "\"The only bad workout is the one that didn't happen. Every step counts toward your goals.\""
    }
  ];

  return (
    <Neumorphic className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-heading font-semibold">Quick Tips</h2>
        <motion.button 
          className="p-1 rounded-full hover:bg-neutral-200 transition-colors"
          whileHover={{ rotate: 180 }}
          transition={{ duration: 0.4 }}
        >
          <i className="bx bx-refresh text-neutral-600"></i>
        </motion.button>
      </div>
      
      {tips.map((tip, index) => (
        <motion.div 
          key={index} 
          className={index === 0 ? "mb-4" : ""}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2, duration: 0.4 }}
        >
          <Glassmorphism className="p-5">
            <div className="flex gap-3">
              <i className={`bx ${tip.icon} text-xl ${tip.iconColor}`}></i>
              <div>
                <h3 className="font-medium">{tip.title}</h3>
                <p className="text-sm text-neutral-600 mt-1">{tip.content}</p>
              </div>
            </div>
          </Glassmorphism>
        </motion.div>
      ))}
    </Neumorphic>
  );
}
