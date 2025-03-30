import { useState } from "react";
import { motion } from "framer-motion";
import { Glassmorphism } from "./ui/glassmorphism";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription, 
} from "@/components/ui/dialog";
import { Pencil, Check, X, Trash, Clock, Calendar, Share2, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { apiRequest } from "@/lib/queryClient";
import { toast } from "@/hooks/use-toast";
import { format, addHours, parseISO, isToday, formatDistance } from "date-fns";
import ShareAchievement from "./ShareAchievement";

export type WorkoutItemProps = {
  id?: number;
  title: string;
  description?: string;
  status: string;
  statusColor: string;
  details: string;
  duration: number;
  caloriesBurned?: number;
  scheduledFor: Date | string;
  completedAt?: Date | string | null;
  buttons?: boolean;
  onUpdate?: () => void;
};

export default function EditableWorkout({ 
  id, 
  title, 
  description = "", 
  status, 
  statusColor, 
  details, 
  duration,
  caloriesBurned,
  scheduledFor,
  completedAt,
  buttons, 
  onUpdate 
}: WorkoutItemProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isRescheduleDialogOpen, setIsRescheduleDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title,
    description,
    duration,
    caloriesBurned: caloriesBurned || 0,
    status: status === "Completed" ? "completed" : status === "In Progress" ? "in_progress" : "scheduled",
    scheduledFor: scheduledFor instanceof Date ? scheduledFor : new Date(scheduledFor),
  });
  
  const [scheduleDate, setScheduleDate] = useState<Date | undefined>(
    formData.scheduledFor instanceof Date ? formData.scheduledFor : new Date(formData.scheduledFor)
  );
  const [scheduleTime, setScheduleTime] = useState(
    format(formData.scheduledFor instanceof Date ? formData.scheduledFor : new Date(formData.scheduledFor), "HH:mm")
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'duration' || name === 'caloriesBurned' 
        ? parseFloat(value) || 0 
        : value
    }));
  };

  const handleStatusChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      status: value
    }));
  };

  const handleScheduleDateChange = (date: Date | undefined) => {
    setScheduleDate(date);
  };

  const handleScheduleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScheduleTime(e.target.value);
  };

  const formatWorkoutDetails = () => {
    const scheduledForDate = formData.scheduledFor instanceof Date 
      ? formData.scheduledFor 
      : new Date(formData.scheduledFor);
    
    const timeStr = format(scheduledForDate, "h:mm a");
    return `${formData.duration} mins · ${formData.caloriesBurned || 0} calories · ${isToday(scheduledForDate) ? timeStr : format(scheduledForDate, "MMM d")}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Convert scheduledFor to ISO string if it's a Date object
      const submitData = { 
        ...formData,
        scheduledFor: formData.scheduledFor instanceof Date 
          ? formData.scheduledFor.toISOString()
          : formData.scheduledFor
      };
      
      if (id) { // Update existing workout
        const response = await apiRequest(`/api/workouts/${id}`, {
          method: 'PATCH',
          body: JSON.stringify(submitData)
        });
        
        if (response) {
          toast({
            title: "Workout Updated",
            description: "Your workout has been successfully updated!",
            variant: "default",
          });
        }
      } else { // Create new workout
        const response = await apiRequest('/api/workouts', {
          method: 'POST',
          body: JSON.stringify(submitData)
        });
        
        if (response) {
          toast({
            title: "Workout Created",
            description: "Your new workout has been created!",
            variant: "default",
          });
        }
      }
      
      // Close dialog and refresh data
      setIsEditDialogOpen(false);
      // Force immediate refresh
      setTimeout(() => {
        if (onUpdate) onUpdate();
      }, 100);
    } catch (error) {
      console.error("Failed to save workout:", error);
      toast({
        title: "Error",
        description: "Failed to save your workout. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleReschedule = async () => {
    if (!id || !scheduleDate) return;
    
    try {
      // Combine date and time
      const [hours, minutes] = scheduleTime.split(':').map(Number);
      const newScheduledDate = new Date(scheduleDate);
      newScheduledDate.setHours(hours, minutes);
      
      const response = await apiRequest(`/api/workouts/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          scheduledFor: newScheduledDate.toISOString(),
          status: "scheduled"
        })
      });
      
      if (response) {
        toast({
          title: "Workout Rescheduled",
          description: `Your workout has been rescheduled to ${format(newScheduledDate, "MMM d, h:mm a")}`,
          variant: "default",
        });
        
        // Close dialog and refresh data
        setIsRescheduleDialogOpen(false);
        // Force immediate refresh
        setTimeout(() => {
          if (onUpdate) onUpdate();
        }, 100);
      }
    } catch (error) {
      console.error("Failed to reschedule workout:", error);
      toast({
        title: "Error",
        description: "Failed to reschedule your workout. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleStartWorkout = async () => {
    if (!id) return;
    
    try {
      const response = await apiRequest(`/api/workouts/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          status: "in_progress"
        })
      });
      
      if (response) {
        toast({
          title: "Workout Started",
          description: "Your workout is now in progress!",
          variant: "default",
        });
        
        // Force immediate refresh
        setTimeout(() => {
          if (onUpdate) onUpdate();
        }, 100);
      }
    } catch (error) {
      console.error("Failed to start workout:", error);
      toast({
        title: "Error",
        description: "Failed to start your workout. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleCompleteWorkout = async () => {
    if (!id) return;
    
    try {
      const response = await apiRequest(`/api/workouts/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          status: "completed",
          completedAt: new Date().toISOString()
        })
      });
      
      if (response) {
        toast({
          title: "Workout Completed",
          description: "Congratulations on completing your workout!",
          variant: "default",
        });
        
        // Force immediate refresh
        setTimeout(() => {
          if (onUpdate) onUpdate();
        }, 100);
      }
    } catch (error) {
      console.error("Failed to complete workout:", error);
      toast({
        title: "Error",
        description: "Failed to mark your workout as completed. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    
    try {
      const response = await apiRequest(`/api/workouts/${id}`, {
        method: 'DELETE'
      });
      
      if (response || response === "") { // DELETE may return empty body
        toast({
          title: "Workout Deleted",
          description: "Your workout has been deleted.",
          variant: "default",
        });
        
        // Close dialog and refresh data
        setIsEditDialogOpen(false);
        // Force immediate refresh
        setTimeout(() => {
          if (onUpdate) onUpdate();
        }, 100);
      }
    } catch (error) {
      console.error("Failed to delete workout:", error);
      toast({
        title: "Error",
        description: "Failed to delete your workout. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Glassmorphism className="p-5 transition-all card-hover animate-fade-in">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-lg text-shadow">{title}</span>
              <span className={`px-2 py-0.5 rounded-full ${statusColor} text-xs glassmorphism border border-white/20`}>{status}</span>
            </div>
            <p className="text-neutral-600 text-sm mt-1 opacity-80">{details}</p>
          </div>
          <div className="flex items-center gap-2">
            <motion.button 
              onClick={() => setIsEditDialogOpen(true)}
              className="p-2 rounded-full hover:bg-white/40 transition-colors button-glow"
              whileHover={{ scale: 1.1, boxShadow: "0 4px 12px rgba(138, 43, 226, 0.15)" }}
              whileTap={{ scale: 0.9 }}
            >
              <Pencil className="h-4 w-4 text-purple-600" />
            </motion.button>
          </div>
        </div>
        
        {status === "Scheduled" && (
          <div className="mt-3 flex items-center gap-3">
            <motion.button 
              onClick={handleStartWorkout}
              className="flex-1 py-2 rounded-lg gradient-purple text-white transition-all shadow-md button-glow"
              whileHover={{ scale: 1.02, boxShadow: "0 6px 15px rgba(138, 43, 226, 0.25)" }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="flex items-center justify-center gap-2">
                <Clock className="h-4 w-4" />
                Start Workout
              </span>
            </motion.button>
            <motion.button 
              onClick={() => setIsRescheduleDialogOpen(true)}
              className="px-3 py-2 rounded-lg glassmorphism border border-white/30 hover:bg-white/20 transition-colors button-glow"
              whileHover={{ scale: 1.02, boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)" }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="flex items-center justify-center gap-2">
                <Calendar className="h-4 w-4" />
                Reschedule
              </span>
            </motion.button>
          </div>
        )}
        
        {status === "In Progress" && (
          <div className="mt-3 flex items-center gap-3">
            <motion.button 
              onClick={handleCompleteWorkout}
              className="flex-1 py-2 rounded-lg gradient-green text-white transition-all shadow-md button-glow"
              whileHover={{ scale: 1.02, boxShadow: "0 6px 15px rgba(67, 160, 71, 0.25)" }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="flex items-center justify-center gap-2">
                <Check className="h-4 w-4" />
                Complete Workout
              </span>
            </motion.button>
          </div>
        )}
        
        {status === "Completed" && completedAt && (
          <div className="mt-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-yellow-500" />
                <span className="text-sm text-gray-300">
                  Completed {format(
                    typeof completedAt === 'string' ? new Date(completedAt) : completedAt,
                    "MMM d, yyyy 'at' h:mm a"
                  )}
                </span>
              </div>
            </div>
            
            <ShareAchievement
              title={title}
              description={`Completed a ${duration} minute workout${caloriesBurned ? ` burning ${caloriesBurned} calories` : ''}`}
              date={completedAt ? format(
                typeof completedAt === 'string' ? new Date(completedAt) : completedAt,
                "MMM d, yyyy"
              ) : undefined}
              type="workout"
              value={`${duration} mins`}
              triggerComponent={
                <motion.button 
                  className="w-full py-2 rounded-lg gradient-blue text-white transition-all shadow-md button-glow"
                  whileHover={{ scale: 1.02, boxShadow: "0 6px 15px rgba(59, 130, 246, 0.25)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="flex items-center justify-center gap-2">
                    <Share2 className="h-4 w-4" />
                    Share Achievement
                  </span>
                </motion.button>
              }
            />
          </div>
        )}
      </Glassmorphism>
      
      {/* Edit Workout Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px] glassmorphism border border-white/20 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-purple-800 text-shadow">{id ? "Edit Workout" : "Create New Workout"}</DialogTitle>
            <DialogDescription className="text-neutral-600">
              {id ? "Update the details of your workout" : "Add a new workout to your schedule"}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="title">Workout Title</Label>
              <Input 
                id="title" 
                name="title" 
                value={formData.title} 
                onChange={handleChange} 
                placeholder="e.g., Upper Body Strength" 
                required
              />
            </div>
            
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="description">Description</Label>
              <Input 
                id="description" 
                name="description" 
                value={formData.description} 
                onChange={handleChange} 
                placeholder="e.g., Focus on chest, shoulders, and arms" 
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid w-full items-center gap-2">
                <Label htmlFor="duration">Duration (mins)</Label>
                <Input 
                  id="duration" 
                  name="duration" 
                  type="number" 
                  value={formData.duration} 
                  onChange={handleChange} 
                  min="0"
                  required
                />
              </div>
              
              <div className="grid w-full items-center gap-2">
                <Label htmlFor="caloriesBurned">Calories Burned</Label>
                <Input 
                  id="caloriesBurned" 
                  name="caloriesBurned" 
                  type="number" 
                  value={formData.caloriesBurned} 
                  onChange={handleChange} 
                  min="0"
                />
              </div>
            </div>
            
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="status">Status</Label>
              <Select 
                name="status"
                value={formData.status} 
                onValueChange={handleStatusChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid w-full items-center gap-2">
              <Label>Scheduled For</Label>
              <div className="flex gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex-1 justify-start text-left font-normal"
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {formData.scheduledFor instanceof Date 
                        ? format(formData.scheduledFor, "PP")
                        : format(new Date(formData.scheduledFor), "PP")
                      }
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent
                      mode="single"
                      selected={formData.scheduledFor instanceof Date 
                        ? formData.scheduledFor 
                        : new Date(formData.scheduledFor)
                      }
                      onSelect={(date) => {
                        if (date) {
                          // Keep the time but change the date
                          const currentTime = formData.scheduledFor instanceof Date
                            ? formData.scheduledFor
                            : new Date(formData.scheduledFor);
                          
                          const newDate = new Date(date);
                          newDate.setHours(
                            currentTime.getHours(),
                            currentTime.getMinutes()
                          );
                          
                          setFormData({
                            ...formData,
                            scheduledFor: newDate
                          });
                        }
                      }}
                    />
                  </PopoverContent>
                </Popover>
                
                <Input
                  type="time"
                  value={format(formData.scheduledFor instanceof Date 
                    ? formData.scheduledFor 
                    : new Date(formData.scheduledFor), "HH:mm")}
                  onChange={(e) => {
                    if (e.target.value) {
                      const [hours, minutes] = e.target.value.split(':').map(Number);
                      const newDate = formData.scheduledFor instanceof Date
                        ? new Date(formData.scheduledFor)
                        : new Date(formData.scheduledFor);
                      
                      newDate.setHours(hours, minutes);
                      
                      setFormData({
                        ...formData,
                        scheduledFor: newDate
                      });
                    }
                  }}
                  className="w-[150px]"
                />
              </div>
            </div>
            
            <div className="flex justify-between pt-4">
              {id && (
                <Button 
                  type="button" 
                  variant="destructive" 
                  onClick={handleDelete}
                  className="flex items-center gap-1 button-glow shadow-md hover:shadow-lg transition-shadow"
                >
                  <Trash className="h-4 w-4" />
                  <span>Delete</span>
                </Button>
              )}
              
              <div className="flex gap-2 ml-auto">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsEditDialogOpen(false)}
                  className="flex items-center gap-1 button-glow"
                >
                  <X className="h-4 w-4" />
                  <span>Cancel</span>
                </Button>
                
                <Button 
                  type="submit" 
                  className="flex items-center gap-1 gradient-purple border-0 text-white button-glow shadow-md hover:shadow-lg transition-shadow"
                >
                  <Check className="h-4 w-4" />
                  <span>Save</span>
                </Button>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Reschedule Dialog */}
      <Dialog open={isRescheduleDialogOpen} onOpenChange={setIsRescheduleDialogOpen}>
        <DialogContent className="sm:max-w-[425px] glassmorphism border border-white/20 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-purple-800 text-shadow">Reschedule Workout</DialogTitle>
            <DialogDescription className="text-neutral-600">
              Choose a new date and time for your workout.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label>Date</Label>
                <CalendarComponent
                  mode="single"
                  selected={scheduleDate}
                  onSelect={handleScheduleDateChange}
                  className="border rounded-md p-3"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={scheduleTime}
                  onChange={handleScheduleTimeChange}
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-2 mt-6">
              <Button 
                variant="outline" 
                onClick={() => setIsRescheduleDialogOpen(false)}
                className="button-glow flex items-center gap-1"
              >
                <X className="h-4 w-4" />
                <span>Cancel</span>
              </Button>
              <Button 
                onClick={handleReschedule}
                disabled={!scheduleDate}
                className="gradient-purple border-0 text-white button-glow flex items-center gap-1"
              >
                <Calendar className="h-4 w-4" />
                <span>Reschedule</span>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}