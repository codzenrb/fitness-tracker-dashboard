import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Glassmorphism } from "@/components/ui/glassmorphism";

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

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Glassmorphism className="w-full">
          <Card className="border-none bg-transparent shadow-none">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-gray-800">FitTrack</CardTitle>
              <CardDescription className="text-gray-600">
                Enter your details to get started with your fitness journey
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
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
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
                        <FormLabel>Mobile Number</FormLabel>
                        <FormControl>
                          <Input placeholder="+1 234 567 8900" {...field} />
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
                          <FormLabel>Height (cm)</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
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
                          <FormLabel>Weight (kg)</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
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
                        <FormLabel>Fitness Goal</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="e.g., Lose 5kg in 3 months, run a 5K, build muscle..."
                            {...field}
                            className="resize-none"
                            rows={3}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Logging in..." : "Start Tracking"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </Glassmorphism>
      </motion.div>
    </div>
  );
}