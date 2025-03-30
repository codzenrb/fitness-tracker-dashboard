import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Glassmorphism } from "@/components/ui/glassmorphism";
import { 
  RunningIcon, 
  DumbbellIcon, 
  MeditationIcon, 
  NutritionIcon, 
  HeartRateIcon, 
  CyclingIcon,
  FitnessBackground
} from "@/assets/workout-icons";

// Login schema validation
const loginSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  mobileNumber: z.string().min(10, { message: "Please enter a valid mobile number" }),
  height: z.coerce.number().min(100, { message: "Height must be at least 100 cm" }).max(250, { message: "Height must be less than 250 cm" }),
  weight: z.coerce.number().min(30, { message: "Weight must be at least 30 kg" }).max(250, { message: "Weight must be less than 250 kg" }),
  goal: z.string().min(5, { message: "Please share your fitness goal" })
});

// Login form values type
type LoginFormValues = z.infer<typeof loginSchema>;

// Login props
export type LoginProps = {
  onLogin: (userData: LoginFormValues) => void;
};

export default function Login({ onLogin }: LoginProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form definition
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      name: "",
      mobileNumber: "",
      height: 170,
      weight: 70,
      goal: ""
    }
  });

  // Handle form submission
  const onSubmit = (data: LoginFormValues) => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      onLogin(data);
      setIsSubmitting(false);
    }, 1000);
  };

  // Animation variants
  const iconVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }),
    hover: {
      scale: 1.1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  return (
    <div className="min-h-screen w-full overflow-hidden relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-500 to-pink-500"></div>
      
      {/* Animated fitness icons */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-10 left-10"
          custom={0}
          initial="initial"
          animate="animate"
          whileHover="hover"
          variants={iconVariants}
        >
          <RunningIcon size={60} className="text-indigo-200" />
        </motion.div>
        
        <motion.div
          className="absolute top-20 right-20"
          custom={1}
          initial="initial"
          animate="animate"
          whileHover="hover"
          variants={iconVariants}
        >
          <DumbbellIcon size={70} className="text-purple-200" />
        </motion.div>
        
        <motion.div
          className="absolute bottom-20 left-24"
          custom={2}
          initial="initial"
          animate="animate"
          whileHover="hover"
          variants={iconVariants}
        >
          <MeditationIcon size={80} className="text-pink-200" />
        </motion.div>
        
        <motion.div
          className="absolute top-1/2 right-20"
          custom={3}
          initial="initial"
          animate="animate"
          whileHover="hover"
          variants={iconVariants}
        >
          <NutritionIcon size={65} className="text-indigo-200" />
        </motion.div>
        
        <motion.div
          className="absolute bottom-32 right-32"
          custom={4}
          initial="initial"
          animate="animate"
          whileHover="hover"
          variants={iconVariants}
        >
          <HeartRateIcon size={75} className="text-purple-200" />
        </motion.div>
        
        <motion.div
          className="absolute top-32 left-1/3"
          custom={5}
          initial="initial"
          animate="animate"
          whileHover="hover"
          variants={iconVariants}
        >
          <CyclingIcon size={55} className="text-pink-200" />
        </motion.div>
      </div>
      
      {/* Wave decoration at bottom */}
      <div className="absolute bottom-0 w-full">
        <FitnessBackground width="100%" height={200} />
      </div>
      
      {/* Login form */}
      <div className="min-h-screen w-full flex items-center justify-center p-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="w-full max-w-md"
        >
          <Glassmorphism className="w-full backdrop-blur-lg bg-white/50">
            <Card className="border-none bg-transparent shadow-none">
              <CardHeader className="text-center pb-2">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17, delay: 0.7 }}
                  className="mx-auto mb-2"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center mb-2 mx-auto shadow-lg">
                    <HeartRateIcon size={32} className="text-white" />
                  </div>
                </motion.div>
                <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-purple-700">
                  FitTrack
                </CardTitle>
                <CardDescription className="text-gray-700 font-medium">
                  Your personal fitness journey starts here
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-800">Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="John Doe" 
                              {...field} 
                              className="border-indigo-200 focus:border-indigo-400 bg-white/70" 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="mobileNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-800">Mobile Number</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="+1 234 567 8900" 
                              {...field} 
                              className="border-indigo-200 focus:border-indigo-400 bg-white/70" 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="height"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-800">Height (cm)</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                {...field} 
                                className="border-indigo-200 focus:border-indigo-400 bg-white/70"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="weight"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-800">Weight (kg)</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                {...field} 
                                className="border-indigo-200 focus:border-indigo-400 bg-white/70"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="goal"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-800">Fitness Goal</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="e.g., Lose 5kg in 3 months, run a 5K, build muscle..."
                              {...field}
                              className="resize-none border-indigo-200 focus:border-indigo-400 bg-white/70"
                              rows={3}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Starting Your Journey..." : "Begin Fitness Journey"}
                      </Button>
                    </motion.div>
                  </form>
                </Form>
              </CardContent>
              
              <CardFooter className="flex justify-center pb-1 pt-0">
                <div className="text-xs text-gray-600">
                  Unlock your fitness potential with personalized tracking
                </div>
              </CardFooter>
            </Card>
          </Glassmorphism>
        </motion.div>
      </div>
    </div>
  );
}