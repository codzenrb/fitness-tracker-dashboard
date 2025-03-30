import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Neumorphic } from "./ui/neumorphic";
import { 
  Plus, 
  Loader2, 
  ChevronRight 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { 
  format, 
  startOfWeek, 
  addDays, 
  isToday, 
  parseISO, 
  isSameDay,
  subDays,
  addHours
} from "date-fns";
import { apiRequest } from "@/lib/queryClient";
import { toast } from "@/hooks/use-toast";
import EditableActivity, { ActivityItemProps } from "./EditableActivity";

interface ActivityData {
  id: number;
  activityType: string;
  description: string;
  duration: number;
  caloriesBurned: number | null;
  status: string;
  date: string;
  createdAt: string;
  userId: number;
}

export default function ActivitySection() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [weekDays, setWeekDays] = useState<Array<{date: Date, abbr: string, day: number}>>([]);
  const [activities, setActivities] = useState<ActivityItemProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Generate week days
  useEffect(() => {
    const today = new Date();
    const start = subDays(today, 3); // Start 3 days before today
    
    const days = Array.from({ length: 7 }, (_, i) => {
      const date = addDays(start, i);
      return {
        date,
        abbr: format(date, "EEE").toUpperCase(),
        day: date.getDate()
      };
    });
    
    setWeekDays(days);
    
    // Set default selected day to today
    const todayIndex = days.findIndex(day => isToday(day.date));
    if (todayIndex >= 0) {
      setSelectedDate(days[todayIndex].date);
    }
  }, []);
  
  const fetchActivities = async () => {
    if (!selectedDate) return;
    
    setIsRefreshing(true);
    try {
      // Format the date as an ISO string for the API request
      const formattedDate = format(selectedDate, "yyyy-MM-dd");
      const data = await apiRequest<ActivityData[]>(`/api/activities?date=${formattedDate}`);
      
      if (data) {
        // Transform API data into UI format
        const formattedActivities = data.map(activity => {
          // Transform status strings
          let statusText = "";
          let statusColorClass = "";
          
          switch (activity.status) {
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
          
          // Get icon based on activity type
          const getActivityIcon = (type: string) => {
            switch (type.toLowerCase()) {
              case 'workout':
                return 'bx-dumbbell';
              case 'running':
                return 'bx-run';
              case 'walking':
                return 'bx-walk';
              case 'cycling':
                return 'bx-cycling';
              case 'swimming':
                return 'bx-swim';
              case 'hydration':
                return 'bx-water';
              case 'sleep':
                return 'bx-moon';
              default:
                return 'bx-pulse';
            }
          };
          
          // Get colors based on activity type
          const getActivityColors = (type: string) => {
            switch (type.toLowerCase()) {
              case 'workout':
                return { bg: 'bg-primary/10', color: 'text-primary' };
              case 'running':
                return { bg: 'bg-blue-500/10', color: 'text-blue-500' };
              case 'walking':
                return { bg: 'bg-teal-500/10', color: 'text-teal-500' };
              case 'cycling':
                return { bg: 'bg-green-500/10', color: 'text-green-500' };
              case 'swimming':
                return { bg: 'bg-cyan-500/10', color: 'text-cyan-500' };
              case 'hydration':
                return { bg: 'bg-purple-500/10', color: 'text-purple-500' };
              case 'sleep':
                return { bg: 'bg-indigo-500/10', color: 'text-indigo-500' };
              default:
                return { bg: 'bg-gray-500/10', color: 'text-gray-500' };
            }
          };
          
          const colors = getActivityColors(activity.activityType);
          
          // Format details string
          const activityDate = parseISO(activity.date);
          let detailsStr = `${activity.duration} mins`;
          
          if (activity.caloriesBurned) {
            detailsStr += ` · ${activity.caloriesBurned} calories`;
          }
          
          detailsStr += ` · ${format(activityDate, "h:mm a")}`;
          
          return {
            id: activity.id,
            activityType: activity.activityType,
            icon: getActivityIcon(activity.activityType),
            iconBg: colors.bg,
            iconColor: colors.color,
            title: activity.description,
            details: detailsStr,
            status: statusText,
            statusColor: statusColorClass,
            duration: activity.duration,
            caloriesBurned: activity.caloriesBurned || 0,
            date: activity.date,
            description: activity.description
          };
        });
        
        // Sort activities by date (most recent first)
        formattedActivities.sort((a, b) => {
          const dateA = a.date instanceof Date ? a.date : new Date(a.date);
          const dateB = b.date instanceof Date ? b.date : new Date(b.date);
          
          // First by status (in_progress, scheduled, completed)
          if (a.status === "In Progress" && b.status !== "In Progress") return -1;
          if (b.status === "In Progress" && a.status !== "In Progress") return 1;
          if (a.status === "Scheduled" && b.status === "Completed") return -1;
          if (b.status === "Scheduled" && a.status === "Completed") return 1;
          
          // Then by time (newest to oldest)
          return dateB.getTime() - dateA.getTime();
        });
        
        setActivities(formattedActivities);
      }
    } catch (error) {
      console.error("Failed to fetch activities:", error);
      toast({
        title: "Error",
        description: "Failed to load activities. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  // Load activities when selected date changes
  useEffect(() => {
    if (selectedDate) {
      fetchActivities();
    }
  }, [selectedDate]);

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

  // Empty activity for the create form - set for selected date
  const createEmptyActivity = () => {
    const now = new Date(selectedDate);
    now.setHours(new Date().getHours(), new Date().getMinutes());
    
    return {
      activityType: "workout",
      icon: "bx-dumbbell",
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
      title: "",
      details: "",
      status: "Completed",
      statusColor: "bg-green-100 text-success",
      duration: 30,
      caloriesBurned: 0,
      date: now,
      description: ""
    };
  };

  return (
    <Neumorphic className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-heading font-semibold">Activity Log</h2>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <motion.button 
              className="text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
              whileHover={{ x: 3 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <span>Add Activity</span>
              <Plus className="h-4 w-4" />
            </motion.button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Log New Activity</DialogTitle>
              <DialogDescription>
                Record your activity for {format(selectedDate, "PPPP")}
              </DialogDescription>
            </DialogHeader>
            <EditableActivity 
              {...createEmptyActivity()} 
              onUpdate={() => {
                fetchActivities();
                setIsAddDialogOpen(false);
              }} 
            />
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="overflow-x-auto">
        <div className="flex min-w-max space-x-3 mb-6">
          {weekDays.map((day, index) => (
            <motion.button 
              key={index}
              className={`min-w-[60px] py-3 px-2 flex flex-col items-center border-2 ${
                isSameDay(selectedDate, day.date) 
                  ? 'border-primary' 
                  : 'border-transparent hover:border-primary/10'
              } transition-colors bg-neutral-100 rounded-lg shadow-[5px_5px_10px_#d9d9d9,_-5px_-5px_10px_#ffffff]`}
              onClick={() => setSelectedDate(day.date)}
              whileHover={{ y: -3 }}
              whileTap={{ y: 0 }}
            >
              <span className={`text-xs ${
                isSameDay(selectedDate, day.date) 
                  ? 'text-primary font-medium' 
                  : 'text-neutral-500'
              }`}>
                {day.abbr}
              </span>
              <span className={`text-lg font-medium mt-1 ${
                isSameDay(selectedDate, day.date) 
                  ? 'text-primary' 
                  : isToday(day.date) 
                    ? 'text-success' 
                    : ''
              }`}>
                {day.day}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <>
          {activities.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-neutral-500 mb-4">No activities for {format(selectedDate, "MMMM d, yyyy")}</p>
              <Button onClick={() => setIsAddDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Activity
              </Button>
            </div>
          ) : (
            <motion.div 
              className="space-y-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {activities.map((activity, index) => (
                <motion.div 
                  key={activity.id || index}
                  variants={itemVariants}
                >
                  <EditableActivity 
                    {...activity} 
                    onUpdate={fetchActivities}
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
