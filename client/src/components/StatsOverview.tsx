import { motion } from "framer-motion";
import { Neumorphic } from "./ui/neumorphic";

export default function StatsOverview() {
  const stats = [
    {
      title: "Calories",
      value: "1,842 / 2,200",
      icon: "bx-flame",
      iconBgColor: "bg-red-100",
      iconColor: "text-danger",
      progress: 83,
      progressColor: "bg-danger"
    },
    {
      title: "Steps",
      value: "8,946 / 10,000",
      icon: "bx-walk",
      iconBgColor: "bg-blue-100",
      iconColor: "text-primary",
      progress: 89,
      progressColor: "bg-primary"
    },
    {
      title: "Water",
      value: "1.8 / 2.5 L",
      icon: "bx-droplet",
      iconBgColor: "bg-blue-100",
      iconColor: "text-blue-500",
      progress: 72,
      progressColor: "bg-blue-500"
    },
    {
      title: "Sleep",
      value: "6.5 / 8 hrs",
      icon: "bx-moon",
      iconBgColor: "bg-purple-100",
      iconColor: "text-purple-600",
      progress: 81,
      progressColor: "bg-purple-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          className="overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
        >
          <Neumorphic className="p-5 transition-all hover:translate-y-[-5px]">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-neutral-500 text-sm">{stat.title}</h3>
                <p className="text-2xl font-semibold mt-1">{stat.value}</p>
              </div>
              <div className={`w-10 h-10 flex items-center justify-center rounded-full ${stat.iconBgColor}`}>
                <i className={`bx ${stat.icon} ${stat.iconColor} text-xl`}></i>
              </div>
            </div>
            <div className="h-2.5 rounded-full w-full bg-neutral-100 shadow-[inset_2px_2px_5px_#d9d9d9,_inset_-2px_-2px_5px_#ffffff]">
              <div 
                className={`${stat.progressColor} h-full rounded-full`} 
                style={{ width: `${stat.progress}%` }}
              ></div>
            </div>
          </Neumorphic>
        </motion.div>
      ))}
    </div>
  );
}
