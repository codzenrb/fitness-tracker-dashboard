import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription, 
} from "@/components/ui/dialog";
import { Pencil, Check, X, Trash, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { apiRequest } from "@/lib/queryClient";
import { toast } from "@/hooks/use-toast";
import { format } from "date-fns";

export type ActivityItemProps = {
  id?: number;
  icon: string;
  iconBg: string;
  iconColor: string;
  title: string;
  details: string;
  status: string;
  statusColor: string;
  activityType: string;
  duration: number;
  caloriesBurned?: number;
  date: Date | string;
  description?: string;
  onUpdate?: () => void;
};

export default function EditableActivity({ 
  id, 
  icon, 
  iconBg, 
  iconColor, 
  title, 
  details, 
  status, 
  statusColor, 
  activityType,
  duration,
  caloriesBurned,
  date,
  description,
  onUpdate 
}: ActivityItemProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    activityType: activityType,
    description: description || title,
    duration,
    caloriesBurned: caloriesBurned || 0,
    status: status === "Completed" ? "completed" : status === "In Progress" ? "in_progress" : "scheduled",
    date: date instanceof Date ? date : new Date(date),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'duration' || name === 'caloriesBurned' 
        ? parseFloat(value) || 0 
        : value
    }));
  };

  const handleActivityTypeChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      activityType: value
    }));
  };

  const handleStatusChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      status: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const submitData = { 
        ...formData,
        date: formData.date.toISOString()
      };
      
      if (id) { // Update existing activity
        const response = await apiRequest(`/api/activities/${id}`, {
          method: 'PATCH',
          body: JSON.stringify(submitData)
        });
        
        if (response) {
          toast({
            title: "Activity Updated",
            description: "Your activity has been successfully updated!",
            variant: "default",
          });
        }
      } else { // Create new activity
        const response = await apiRequest('/api/activities', {
          method: 'POST',
          body: JSON.stringify(submitData)
        });
        
        if (response) {
          toast({
            title: "Activity Created",
            description: "Your new activity has been recorded!",
            variant: "default",
          });
        }
      }
      
      // Close dialog and refresh data
      setIsEditDialogOpen(false);
      if (onUpdate) onUpdate();
    } catch (error) {
      console.error("Failed to save activity:", error);
      toast({
        title: "Error",
        description: "Failed to save your activity. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    
    try {
      const response = await apiRequest(`/api/activities/${id}`, {
        method: 'DELETE'
      });
      
      if (response || response === "") { // DELETE may return empty body
        toast({
          title: "Activity Deleted",
          description: "Your activity has been deleted.",
          variant: "default",
        });
        
        // Close dialog and refresh data
        setIsEditDialogOpen(false);
        if (onUpdate) onUpdate();
      }
    } catch (error) {
      console.error("Failed to delete activity:", error);
      toast({
        title: "Error",
        description: "Failed to delete your activity. Please try again.",
        variant: "destructive",
      });
    }
  };

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

  return (
    <>
      <motion.div 
        className="flex items-center p-3 rounded-lg hover:bg-neutral-200/50 transition-colors group"
      >
        <div className={`w-10 h-10 flex items-center justify-center rounded-full ${iconBg} ${iconColor}`}>
          <i className={`bx ${icon} text-xl`}></i>
        </div>
        <div className="ml-4 flex-1">
          <h4 className="font-medium">{title}</h4>
          <p className="text-sm text-neutral-600">{details}</p>
        </div>
        <div className="flex items-center">
          <div className={`px-3 py-1 rounded-full ${statusColor} text-xs font-medium mr-2`}>
            {status}
          </div>
          <motion.button 
            onClick={() => setIsEditDialogOpen(true)}
            className="p-2 rounded-full hover:bg-neutral-200 transition-colors opacity-0 group-hover:opacity-100"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Pencil className="h-4 w-4 text-neutral-600" />
          </motion.button>
        </div>
      </motion.div>
      
      {/* Edit Activity Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{id ? "Edit Activity" : "Log New Activity"}</DialogTitle>
            <DialogDescription>
              {id ? "Update your activity details" : "Add a new activity to your log"}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="activityType">Activity Type</Label>
              <Select 
                name="activityType"
                value={formData.activityType} 
                onValueChange={handleActivityTypeChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="workout">Workout</SelectItem>
                  <SelectItem value="running">Running</SelectItem>
                  <SelectItem value="walking">Walking</SelectItem>
                  <SelectItem value="cycling">Cycling</SelectItem>
                  <SelectItem value="swimming">Swimming</SelectItem>
                  <SelectItem value="hydration">Hydration</SelectItem>
                  <SelectItem value="sleep">Sleep</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="description">Description</Label>
              <Input 
                id="description" 
                name="description" 
                value={formData.description} 
                onChange={handleChange} 
                placeholder="e.g., Morning jog in the park" 
                required
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
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid w-full items-center gap-2">
              <Label>Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {format(formData.date, "PPP")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <CalendarComponent
                    mode="single"
                    selected={formData.date}
                    onSelect={(date) => {
                      if (date) {
                        setFormData({
                          ...formData,
                          date
                        });
                      }
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="flex justify-between pt-4">
              {id && (
                <Button 
                  type="button" 
                  variant="destructive" 
                  onClick={handleDelete}
                  className="flex items-center gap-1"
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
                  className="flex items-center gap-1"
                >
                  <X className="h-4 w-4" />
                  <span>Cancel</span>
                </Button>
                
                <Button 
                  type="submit" 
                  className="flex items-center gap-1"
                >
                  <Check className="h-4 w-4" />
                  <span>Save</span>
                </Button>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}