import { useState } from "react";
import { motion } from "framer-motion";
import { Neumorphic } from "./ui/neumorphic";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Pencil, Check, X, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { apiRequest } from "@/lib/queryClient";
import { toast } from "@/hooks/use-toast";

export type GoalItemProps = {
  id?: number;
  title: string;
  description: string;
  progress: string;
  progressColor: string;
  progressPercentage: number;
  startDate?: string;
  endDate?: string;
  progressText: string;
  timeLeft?: string;
  targetValue: number;
  currentValue: number;
  unit: string;
  onUpdate?: () => void;
};

export default function EditableGoal({ 
  id, 
  title, 
  description, 
  progress, 
  progressColor, 
  progressPercentage, 
  startDate, 
  endDate, 
  progressText, 
  timeLeft, 
  targetValue,
  currentValue,
  unit,
  onUpdate 
}: GoalItemProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title,
    description,
    targetValue,
    currentValue,
    unit
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'targetValue' || name === 'currentValue' 
        ? parseFloat(value) || 0 
        : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (id) { // Update existing goal
        const response = await apiRequest(`/api/goals/${id}`, {
          method: 'PATCH',
          body: JSON.stringify(formData)
        });
        
        if (response) {
          toast({
            title: "Goal Updated",
            description: "Your goal has been successfully updated!",
            variant: "default",
          });
        }
      } else { // Create new goal
        const response = await apiRequest('/api/goals', {
          method: 'POST',
          body: JSON.stringify({
            ...formData,
            startDate: new Date().toISOString(),
            endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days from now
          })
        });
        
        if (response) {
          toast({
            title: "Goal Created",
            description: "Your new goal has been created!",
            variant: "default",
          });
        }
      }
      
      // Close dialog and refresh data
      setIsEditDialogOpen(false);
      if (onUpdate) onUpdate();
    } catch (error) {
      console.error("Failed to save goal:", error);
      toast({
        title: "Error",
        description: "Failed to save your goal. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    
    try {
      const response = await apiRequest(`/api/goals/${id}`, {
        method: 'DELETE'
      });
      
      if (response || response === "") { // DELETE may return empty body
        toast({
          title: "Goal Deleted",
          description: "Your goal has been deleted.",
          variant: "default",
        });
        
        // Close dialog and refresh data
        setIsEditDialogOpen(false);
        if (onUpdate) onUpdate();
      }
    } catch (error) {
      console.error("Failed to delete goal:", error);
      toast({
        title: "Error",
        description: "Failed to delete your goal. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Neumorphic className="p-5 relative group">
        <button 
          onClick={() => setIsEditDialogOpen(true)}
          className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Pencil className="h-4 w-4 text-neutral-400 hover:text-primary" />
        </button>
        
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-medium">{title}</h3>
            <p className="text-sm text-neutral-600">{description}</p>
          </div>
          <span className="text-sm font-medium text-success">{progress}</span>
        </div>
        
        <div className="h-2 rounded-full w-full bg-neutral-100 shadow-[inset_2px_2px_5px_#d9d9d9,_inset_-2px_-2px_5px_#ffffff]">
          <motion.div 
            className={`${progressColor} h-full rounded-full`}
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.8 }}
          ></motion.div>
        </div>
        
        <div className="flex justify-between mt-2">
          <span className="text-xs text-neutral-500">{progressText}: {startDate}</span>
          <span className="text-xs text-neutral-500">{timeLeft || `Target: ${endDate}`}</span>
        </div>
      </Neumorphic>
      
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{id ? "Edit Goal" : "Create New Goal"}</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="title">Goal Title</Label>
              <Input 
                id="title" 
                name="title" 
                value={formData.title} 
                onChange={handleChange} 
                placeholder="e.g., Weight Loss Goal" 
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
                placeholder="e.g., Lose 10 pounds" 
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid w-full items-center gap-2">
                <Label htmlFor="currentValue">Current Value</Label>
                <Input 
                  id="currentValue" 
                  name="currentValue" 
                  type="number" 
                  value={formData.currentValue} 
                  onChange={handleChange} 
                  step="0.1"
                  min="0"
                  required
                />
              </div>
              
              <div className="grid w-full items-center gap-2">
                <Label htmlFor="targetValue">Target Value</Label>
                <Input 
                  id="targetValue" 
                  name="targetValue" 
                  type="number" 
                  value={formData.targetValue} 
                  onChange={handleChange} 
                  step="0.1"
                  min="0"
                  required
                />
              </div>
            </div>
            
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="unit">Unit</Label>
              <Input 
                id="unit" 
                name="unit" 
                value={formData.unit} 
                onChange={handleChange} 
                placeholder="e.g., lbs, miles, kg" 
                required
              />
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