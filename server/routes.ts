import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertGoalSchema, insertWorkoutSchema, insertNutritionLogSchema, insertActivityLogSchema, insertStatsSchema } from "@shared/schema";
import { ZodError } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);

  // Error handling middleware for Zod validation errors
  const handleZodError = (err: any, res: any) => {
    if (err instanceof ZodError) {
      return res.status(400).json({ 
        message: "Validation error", 
        errors: err.errors 
      });
    }
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  };

  // Demo user ID (in production this would come from auth)
  const DEMO_USER_ID = 1;

  // Goals routes
  app.get("/api/goals", async (req, res) => {
    try {
      const goals = await storage.getGoals(DEMO_USER_ID);
      res.json(goals);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to fetch goals" });
    }
  });

  app.post("/api/goals", async (req, res) => {
    try {
      const validatedData = insertGoalSchema.parse({
        ...req.body,
        userId: DEMO_USER_ID
      });
      const goal = await storage.createGoal(validatedData);
      res.status(201).json(goal);
    } catch (err) {
      handleZodError(err, res);
    }
  });

  app.patch("/api/goals/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const goal = await storage.getGoal(id);
      
      if (!goal) {
        return res.status(404).json({ message: "Goal not found" });
      }
      
      if (goal.userId !== DEMO_USER_ID) {
        return res.status(403).json({ message: "Unauthorized" });
      }
      
      const updatedGoal = await storage.updateGoal(id, req.body);
      res.json(updatedGoal);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to update goal" });
    }
  });

  app.delete("/api/goals/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const goal = await storage.getGoal(id);
      
      if (!goal) {
        return res.status(404).json({ message: "Goal not found" });
      }
      
      if (goal.userId !== DEMO_USER_ID) {
        return res.status(403).json({ message: "Unauthorized" });
      }
      
      await storage.deleteGoal(id);
      res.status(204).send();
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to delete goal" });
    }
  });

  // Workouts routes
  app.get("/api/workouts", async (req, res) => {
    try {
      const workouts = await storage.getWorkouts(DEMO_USER_ID);
      res.json(workouts);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to fetch workouts" });
    }
  });

  app.post("/api/workouts", async (req, res) => {
    try {
      const validatedData = insertWorkoutSchema.parse({
        ...req.body,
        userId: DEMO_USER_ID
      });
      const workout = await storage.createWorkout(validatedData);
      res.status(201).json(workout);
    } catch (err) {
      handleZodError(err, res);
    }
  });

  app.patch("/api/workouts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const workout = await storage.getWorkout(id);
      
      if (!workout) {
        return res.status(404).json({ message: "Workout not found" });
      }
      
      if (workout.userId !== DEMO_USER_ID) {
        return res.status(403).json({ message: "Unauthorized" });
      }
      
      // If marking as completed, set completedAt
      if (req.body.status === "completed" && workout.status !== "completed") {
        req.body.completedAt = new Date();
      }
      
      const updatedWorkout = await storage.updateWorkout(id, req.body);
      res.json(updatedWorkout);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to update workout" });
    }
  });

  app.delete("/api/workouts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const workout = await storage.getWorkout(id);
      
      if (!workout) {
        return res.status(404).json({ message: "Workout not found" });
      }
      
      if (workout.userId !== DEMO_USER_ID) {
        return res.status(403).json({ message: "Unauthorized" });
      }
      
      await storage.deleteWorkout(id);
      res.status(204).send();
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to delete workout" });
    }
  });

  // Nutrition logs routes
  app.get("/api/nutrition", async (req, res) => {
    try {
      let date: Date | undefined = undefined;
      
      if (req.query.date) {
        date = new Date(req.query.date as string);
      }
      
      const logs = await storage.getNutritionLogs(DEMO_USER_ID, date);
      res.json(logs);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to fetch nutrition logs" });
    }
  });

  app.post("/api/nutrition", async (req, res) => {
    try {
      const validatedData = insertNutritionLogSchema.parse({
        ...req.body,
        userId: DEMO_USER_ID
      });
      const log = await storage.createNutritionLog(validatedData);
      res.status(201).json(log);
    } catch (err) {
      handleZodError(err, res);
    }
  });

  app.delete("/api/nutrition/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteNutritionLog(id);
      res.status(204).send();
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to delete nutrition log" });
    }
  });

  // Activity logs routes
  app.get("/api/activities", async (req, res) => {
    try {
      let date: Date | undefined = undefined;
      
      if (req.query.date) {
        date = new Date(req.query.date as string);
      }
      
      const logs = await storage.getActivityLogs(DEMO_USER_ID, date);
      res.json(logs);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to fetch activity logs" });
    }
  });

  app.post("/api/activities", async (req, res) => {
    try {
      const validatedData = insertActivityLogSchema.parse({
        ...req.body,
        userId: DEMO_USER_ID
      });
      const log = await storage.createActivityLog(validatedData);
      res.status(201).json(log);
    } catch (err) {
      handleZodError(err, res);
    }
  });

  app.patch("/api/activities/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updatedLog = await storage.updateActivityLog(id, req.body);
      
      if (!updatedLog) {
        return res.status(404).json({ message: "Activity log not found" });
      }
      
      res.json(updatedLog);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to update activity log" });
    }
  });

  app.delete("/api/activities/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteActivityLog(id);
      res.status(204).send();
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to delete activity log" });
    }
  });

  // Stats routes
  app.get("/api/stats", async (req, res) => {
    try {
      let date = new Date();
      
      if (req.query.date) {
        date = new Date(req.query.date as string);
      }
      
      const stats = await storage.getStats(DEMO_USER_ID, date);
      
      if (!stats) {
        // Return default stats if none exist
        return res.json({
          userId: DEMO_USER_ID,
          date,
          steps: 0,
          calories: 0,
          caloriesGoal: 2200,
          waterIntake: 0,
          waterGoal: 2500,
          sleepHours: 0,
          sleepGoal: 8
        });
      }
      
      res.json(stats);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to fetch stats" });
    }
  });

  app.post("/api/stats", async (req, res) => {
    try {
      const validatedData = insertStatsSchema.parse({
        ...req.body,
        userId: DEMO_USER_ID
      });
      const stats = await storage.createOrUpdateStats(validatedData);
      res.status(201).json(stats);
    } catch (err) {
      handleZodError(err, res);
    }
  });

  // Tips routes
  app.get("/api/tips", async (req, res) => {
    try {
      const category = req.query.category as string | undefined;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 2;
      
      const tips = await storage.getTips(category, limit);
      res.json(tips);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to fetch tips" });
    }
  });

  // Initialize the database with sample data for the demo
  await initializeDemo();

  return httpServer;
}

async function initializeDemo() {
  const DEMO_USER_ID = 1;
  
  // Create demo workouts
  await storage.createWorkout({
    userId: DEMO_USER_ID,
    title: "Upper Body Strength",
    description: "Focus on chest, shoulders, and arms",
    duration: 45,
    caloriesBurned: 320,
    status: "completed",
    scheduledFor: new Date(new Date().setHours(9, 30, 0, 0)),
    completedAt: new Date(new Date().setHours(10, 15, 0, 0))
  });
  
  await storage.createWorkout({
    userId: DEMO_USER_ID,
    title: "Evening Run",
    description: "5K run around the park",
    duration: 30,
    caloriesBurned: 280,
    status: "scheduled",
    scheduledFor: new Date(new Date().setHours(19, 0, 0, 0)),
    completedAt: null
  });
  
  // Create activity logs
  await storage.createActivityLog({
    userId: DEMO_USER_ID,
    activityType: "workout",
    description: "Upper Body Strength",
    duration: 45,
    caloriesBurned: 320,
    date: new Date(),
    status: "completed"
  });
  
  await storage.createActivityLog({
    userId: DEMO_USER_ID,
    activityType: "walking",
    description: "Morning Walk",
    duration: 25,
    caloriesBurned: 180,
    date: new Date(),
    status: "completed"
  });
  
  await storage.createActivityLog({
    userId: DEMO_USER_ID,
    activityType: "hydration",
    description: "Hydration Goal",
    duration: 0,
    caloriesBurned: 0,
    date: new Date(),
    status: "in_progress"
  });
  
  // Create nutrition logs
  await storage.createNutritionLog({
    userId: DEMO_USER_ID,
    mealType: "breakfast",
    description: "Oatmeal with fruits and nuts",
    calories: 460,
    date: new Date()
  });
  
  await storage.createNutritionLog({
    userId: DEMO_USER_ID,
    mealType: "lunch",
    description: "Grilled chicken salad with quinoa",
    calories: 650,
    date: new Date()
  });
  
  await storage.createNutritionLog({
    userId: DEMO_USER_ID,
    mealType: "dinner",
    description: "Salmon with roasted vegetables",
    calories: 590,
    date: new Date()
  });
  
  await storage.createNutritionLog({
    userId: DEMO_USER_ID,
    mealType: "snack",
    description: "Greek yogurt with honey",
    calories: 142,
    date: new Date()
  });
  
  // Create goals
  await storage.createGoal({
    userId: DEMO_USER_ID,
    title: "Weight Goal",
    description: "Lose 10 pounds",
    targetValue: 10,
    currentValue: 4,
    unit: "lbs",
    startDate: new Date("2023-05-10"),
    endDate: new Date("2023-07-10")
  });
  
  await storage.createGoal({
    userId: DEMO_USER_ID,
    title: "Running Goal",
    description: "Run 50 miles this month",
    targetValue: 50,
    currentValue: 31,
    unit: "mi",
    startDate: new Date("2023-06-01"),
    endDate: new Date("2023-06-30")
  });
  
  await storage.createGoal({
    userId: DEMO_USER_ID,
    title: "Strength Goal",
    description: "Bench press 200 lbs",
    targetValue: 200,
    currentValue: 185,
    unit: "lbs",
    startDate: new Date("2023-04-15"),
    endDate: new Date("2023-07-15")
  });
  
  // Create stats for today
  await storage.createOrUpdateStats({
    userId: DEMO_USER_ID,
    date: new Date(),
    steps: 8946,
    calories: 1842,
    caloriesGoal: 2200,
    waterIntake: 1800,
    waterGoal: 2500,
    sleepHours: 6.5,
    sleepGoal: 8
  });
}
