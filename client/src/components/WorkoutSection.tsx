import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Neumorphic } from "./ui/neumorphic";
import { Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { format, parseISO, isToday } from "date-fns";
import { apiRequest } from "@/lib/queryClient";
import { toast } from "@/hooks/use-toast";
import EditableWorkout, { WorkoutItemProps } from "./EditableWorkout";

interface WorkoutData {
  id: number;
  title: string;
  description: string | null;
  duration: number;
  caloriesBurned: number | null;
  status: string;
  scheduledFor: string;
  completedAt: string | null;
  createdAt: string;
  userId: number;
}

export default function WorkoutSection() {
  const [workouts, setWorkouts] = useState<WorkoutItemProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchWorkouts = async () => {
    setIsRefreshing(true);
    try {
      const data = await apiRequest<WorkoutData[]>('/api/workouts');
      
      if (data) {
        // Transform API data into UI format
        const formattedWorkouts = data.map(workout => {
          // Transform status strings
          let statusText = "";
          let statusColorClass = "";
          
          switch (workout.status) {
            case "completed":
              statusText = "Completed";
              statusColorClass = "bg-green-100 text-success";
              break;
            case "in_progress":
              statusText = "In Progress";
              statusColorClass = "bg-orange-100 text-warning";
              break;
            default:
              statusText = "Scheduled";
              statusColorClass = "bg-blue-100 text-primary";
          }
          
          // Format details string
          const scheduledForDate = parseISO(workout.scheduledFor);
          let detailsStr = `${workout.duration} mins`;
          
          if (workout.caloriesBurned) {
            detailsStr += ` · ${workout.caloriesBurned} calories`;
          }
          
          detailsStr += ` · ${isToday(scheduledForDate) ? format(scheduledForDate, "h:mm a") : format(scheduledForDate, "MMM d")}`;
          
          return {
            id: workout.id,
            title: workout.title,
            description: workout.description || "",
            status: statusText,
            statusColor: statusColorClass,
            details: detailsStr,
            duration: workout.duration,
            caloriesBurned: workout.caloriesBurned || 0,
            scheduledFor: workout.scheduledFor,
            completedAt: workout.completedAt,
            buttons: workout.status === "scheduled"
          };
        });
        
        // Sort so upcoming workouts are at the top
        formattedWorkouts.sort((a, b) => {
          // In progress workouts first
          if (a.status === "In Progress" && b.status !== "In Progress") return -1;
          if (b.status === "In Progress" && a.status !== "In Progress") return 1;
          
          // Then scheduled workouts
          if (a.status === "Scheduled" && b.status !== "Scheduled") return -1;
          if (b.status === "Scheduled" && a.status !== "Scheduled") return 1;
          
          // Then by date
          const dateA = a.scheduledFor instanceof Date ? a.scheduledFor : new Date(a.scheduledFor);
          const dateB = b.scheduledFor instanceof Date ? b.scheduledFor : new Date(b.scheduledFor);
          return dateA.getTime() - dateB.getTime();
        });
        
        setWorkouts(formattedWorkouts);
      }
    } catch (error) {
      console.error("Failed to fetch workouts:", error);
      toast({
        title: "Error",
        description: "Failed to load workouts. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  // Load workouts on component mount
  useEffect(() => {
    fetchWorkouts();
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

  // Empty workout for the create form - set for today
  const today = new Date();
  today.setHours(today.getHours() + 1, 0, 0, 0); // Set to the next hour
  
  const emptyWorkout: WorkoutItemProps = {
    title: "",
    description: "",
    status: "Scheduled",
    statusColor: "bg-blue-100 text-primary",
    details: "",
    duration: 30,
    caloriesBurned: 0,
    scheduledFor: today,
    buttons: false
  };

  return (
    <Neumorphic className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-heading font-semibold">Today's Workout</h2>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <motion.button 
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Plus className="h-4 w-4" />
              <span>Add Workout</span>
            </motion.button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Workout</DialogTitle>
              <DialogDescription>
                Add a new workout to your schedule
              </DialogDescription>
            </DialogHeader>
            <EditableWorkout {...emptyWorkout} onUpdate={() => {
              fetchWorkouts();
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
          {workouts.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-neutral-500 mb-4">You don't have any workouts scheduled.</p>
              <Button onClick={() => setIsAddDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Schedule Your First Workout
              </Button>
            </div>
          ) : (
            <motion.div 
              className="space-y-5"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {workouts.map((workout, index) => (
                <motion.div 
                  key={workout.id || index}
                  variants={itemVariants}
                >
                  <EditableWorkout 
                    {...workout} 
                    onUpdate={fetchWorkouts}
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
