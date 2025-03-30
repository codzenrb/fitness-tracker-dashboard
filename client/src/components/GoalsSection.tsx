import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Neumorphic } from "./ui/neumorphic";
import EditableGoal, { GoalItemProps } from "./EditableGoal";
import { Plus, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { format, parseISO } from "date-fns";
import { apiRequest } from "@/lib/queryClient";
import { toast } from "@/hooks/use-toast";

interface GoalData {
  id: number;
  title: string;
  description: string;
  targetValue: number;
  currentValue: number;
  unit: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  userId: number;
}

export default function GoalsSection() {
  const [goals, setGoals] = useState<GoalItemProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchGoals = async () => {
    setIsRefreshing(true);
    try {
      const data = await apiRequest<GoalData[]>('/api/goals');
      
      if (data) {
        // Transform API data into UI format
        const formattedGoals = data.map(goal => {
          const percentage = Math.round((goal.currentValue / goal.targetValue) * 100);
          const getProgressColor = (percentage: number) => {
            if (percentage < 30) return "bg-neutral-400";
            if (percentage < 60) return "bg-primary";
            if (percentage < 90) return "bg-warning";
            return "bg-success";
          };
          
          const startDateFormatted = format(parseISO(goal.startDate), 'MMM d');
          const endDateFormatted = format(parseISO(goal.endDate), 'MMM d');
          
          // Calculate days left
          const today = new Date();
          const endDate = parseISO(goal.endDate);
          const daysLeft = Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
          
          return {
            id: goal.id,
            title: goal.title,
            description: goal.description,
            targetValue: goal.targetValue,
            currentValue: goal.currentValue,
            unit: goal.unit,
            progress: `${goal.currentValue}/${goal.targetValue} ${goal.unit}`,
            progressColor: getProgressColor(percentage),
            progressPercentage: percentage,
            startDate: startDateFormatted,
            endDate: endDateFormatted,
            progressText: percentage < 5 ? "Started" : `Progress: ${percentage}%`,
            timeLeft: daysLeft > 0 ? `${daysLeft} days left` : "Time's up!"
          };
        });
        
        setGoals(formattedGoals);
      }
    } catch (error) {
      console.error("Failed to fetch goals:", error);
      toast({
        title: "Error",
        description: "Failed to load goals. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  // Load goals on component mount
  useEffect(() => {
    fetchGoals();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  // Empty goal for the create form
  const emptyGoal: GoalItemProps = {
    title: "",
    description: "",
    progress: "0/0",
    progressColor: "bg-neutral-400",
    progressPercentage: 0,
    progressText: "New",
    targetValue: 0,
    currentValue: 0,
    unit: "",
  };

  return (
    <Neumorphic className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-heading font-semibold">Fitness Goals</h2>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <motion.button 
              className="text-neutral-600 hover:text-neutral-800 transition-colors"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <Plus className="h-5 w-5" />
            </motion.button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Goal</DialogTitle>
            </DialogHeader>
            <EditableGoal {...emptyGoal} onUpdate={() => {
              fetchGoals();
              setIsAddDialogOpen(false);
            }} />
          </DialogContent>
        </Dialog>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <>
          {goals.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-neutral-500 mb-4">You don't have any goals yet.</p>
              <Button onClick={() => setIsAddDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Goal
              </Button>
            </div>
          ) : (
            <motion.div 
              className="space-y-5"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {goals.map((goal, index) => (
                <motion.div 
                  key={goal.id || index}
                  variants={itemVariants}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <EditableGoal 
                    {...goal} 
                    onUpdate={fetchGoals}
                  />
                </motion.div>
              ))}
              
              {isRefreshing && (
                <div className="flex justify-center py-2">
                  <Loader2 className="h-5 w-5 animate-spin text-primary" />
                </div>
              )}
            </motion.div>
          )}
        </>
      )}
    </Neumorphic>
  );
}
