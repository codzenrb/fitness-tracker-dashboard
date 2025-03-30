import { 
  users, type User, type InsertUser, 
  goals, type Goal, type InsertGoal,
  workouts, type Workout, type InsertWorkout,
  nutritionLogs, type NutritionLog, type InsertNutritionLog,
  activityLogs, type ActivityLog, type InsertActivityLog,
  stats, type Stat, type InsertStat,
  tips, type Tip, type InsertTip
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Goal operations
  getGoals(userId: number): Promise<Goal[]>;
  getGoal(id: number): Promise<Goal | undefined>;
  createGoal(goal: InsertGoal): Promise<Goal>;
  updateGoal(id: number, goal: Partial<Goal>): Promise<Goal | undefined>;
  deleteGoal(id: number): Promise<boolean>;
  
  // Workout operations
  getWorkouts(userId: number): Promise<Workout[]>;
  getWorkout(id: number): Promise<Workout | undefined>;
  createWorkout(workout: InsertWorkout): Promise<Workout>;
  updateWorkout(id: number, workout: Partial<Workout>): Promise<Workout | undefined>;
  deleteWorkout(id: number): Promise<boolean>;
  
  // Nutrition log operations
  getNutritionLogs(userId: number, date?: Date): Promise<NutritionLog[]>;
  createNutritionLog(log: InsertNutritionLog): Promise<NutritionLog>;
  deleteNutritionLog(id: number): Promise<boolean>;
  
  // Activity log operations
  getActivityLogs(userId: number, date?: Date): Promise<ActivityLog[]>;
  createActivityLog(log: InsertActivityLog): Promise<ActivityLog>;
  updateActivityLog(id: number, log: Partial<ActivityLog>): Promise<ActivityLog | undefined>;
  deleteActivityLog(id: number): Promise<boolean>;
  
  // Stats operations
  getStats(userId: number, date: Date): Promise<Stat | undefined>;
  createOrUpdateStats(stats: InsertStat): Promise<Stat>;
  
  // Tips operations
  getTips(category?: string, limit?: number): Promise<Tip[]>;
  getTip(id: number): Promise<Tip | undefined>;
  createTip(tip: InsertTip): Promise<Tip>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private goals: Map<number, Goal>;
  private workouts: Map<number, Workout>;
  private nutritionLogs: Map<number, NutritionLog>;
  private activityLogs: Map<number, ActivityLog>;
  private statsLogs: Map<number, Stat>;
  private tips: Map<number, Tip>;
  
  private userIdCounter: number;
  private goalIdCounter: number;
  private workoutIdCounter: number;
  private nutritionLogIdCounter: number;
  private activityLogIdCounter: number;
  private statsIdCounter: number;
  private tipIdCounter: number;

  constructor() {
    this.users = new Map();
    this.goals = new Map();
    this.workouts = new Map();
    this.nutritionLogs = new Map();
    this.activityLogs = new Map();
    this.statsLogs = new Map();
    this.tips = new Map();
    
    this.userIdCounter = 1;
    this.goalIdCounter = 1;
    this.workoutIdCounter = 1;
    this.nutritionLogIdCounter = 1;
    this.activityLogIdCounter = 1;
    this.statsIdCounter = 1;
    this.tipIdCounter = 1;
    
    // Initialize with some tips
    this.createTip({
      title: "Hydration Reminder",
      content: "Remember to drink water consistently throughout the day instead of all at once. This helps with better absorption.",
      category: "hydration",
      iconName: "bx-droplet"
    });
    
    this.createTip({
      title: "Today's Motivation",
      content: "The only bad workout is the one that didn't happen. Every step counts toward your goals.",
      category: "motivation",
      iconName: "bx-heart"
    });
    
    // Create a demo user
    this.createUser({
      username: "johnsmith",
      password: "password123",
      name: "John Smith",
      email: "john@example.com"
    });
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Goal operations
  async getGoals(userId: number): Promise<Goal[]> {
    return Array.from(this.goals.values()).filter(
      (goal) => goal.userId === userId
    );
  }
  
  async getGoal(id: number): Promise<Goal | undefined> {
    return this.goals.get(id);
  }
  
  async createGoal(insertGoal: InsertGoal): Promise<Goal> {
    const id = this.goalIdCounter++;
    const now = new Date();
    const goal: Goal = { 
      ...insertGoal, 
      id, 
      createdAt: now
    };
    this.goals.set(id, goal);
    return goal;
  }
  
  async updateGoal(id: number, updatedGoal: Partial<Goal>): Promise<Goal | undefined> {
    const goal = this.goals.get(id);
    if (!goal) return undefined;
    
    const updated = { ...goal, ...updatedGoal };
    this.goals.set(id, updated);
    return updated;
  }
  
  async deleteGoal(id: number): Promise<boolean> {
    return this.goals.delete(id);
  }
  
  // Workout operations
  async getWorkouts(userId: number): Promise<Workout[]> {
    return Array.from(this.workouts.values())
      .filter(workout => workout.userId === userId)
      .sort((a, b) => {
        return new Date(b.scheduledFor).getTime() - new Date(a.scheduledFor).getTime();
      });
  }
  
  async getWorkout(id: number): Promise<Workout | undefined> {
    return this.workouts.get(id);
  }
  
  async createWorkout(insertWorkout: InsertWorkout): Promise<Workout> {
    const id = this.workoutIdCounter++;
    const now = new Date();
    const workout: Workout = { 
      ...insertWorkout, 
      id, 
      completedAt: null,
      createdAt: now
    };
    this.workouts.set(id, workout);
    return workout;
  }
  
  async updateWorkout(id: number, updatedWorkout: Partial<Workout>): Promise<Workout | undefined> {
    const workout = this.workouts.get(id);
    if (!workout) return undefined;
    
    const updated = { ...workout, ...updatedWorkout };
    this.workouts.set(id, updated);
    return updated;
  }
  
  async deleteWorkout(id: number): Promise<boolean> {
    return this.workouts.delete(id);
  }
  
  // Nutrition log operations
  async getNutritionLogs(userId: number, date?: Date): Promise<NutritionLog[]> {
    let logs = Array.from(this.nutritionLogs.values())
      .filter(log => log.userId === userId);
    
    if (date) {
      const dateStr = date.toISOString().split('T')[0];
      logs = logs.filter(log => log.date.toISOString().split('T')[0] === dateStr);
    }
    
    return logs.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
  
  async createNutritionLog(insertLog: InsertNutritionLog): Promise<NutritionLog> {
    const id = this.nutritionLogIdCounter++;
    const now = new Date();
    const log: NutritionLog = { 
      ...insertLog, 
      id, 
      createdAt: now
    };
    this.nutritionLogs.set(id, log);
    return log;
  }
  
  async deleteNutritionLog(id: number): Promise<boolean> {
    return this.nutritionLogs.delete(id);
  }
  
  // Activity log operations
  async getActivityLogs(userId: number, date?: Date): Promise<ActivityLog[]> {
    let logs = Array.from(this.activityLogs.values())
      .filter(log => log.userId === userId);
    
    if (date) {
      const dateStr = date.toISOString().split('T')[0];
      logs = logs.filter(log => log.date.toISOString().split('T')[0] === dateStr);
    }
    
    return logs.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
  
  async createActivityLog(insertLog: InsertActivityLog): Promise<ActivityLog> {
    const id = this.activityLogIdCounter++;
    const now = new Date();
    const log: ActivityLog = { 
      ...insertLog, 
      id, 
      createdAt: now
    };
    this.activityLogs.set(id, log);
    return log;
  }
  
  async updateActivityLog(id: number, updatedLog: Partial<ActivityLog>): Promise<ActivityLog | undefined> {
    const log = this.activityLogs.get(id);
    if (!log) return undefined;
    
    const updated = { ...log, ...updatedLog };
    this.activityLogs.set(id, updated);
    return updated;
  }
  
  async deleteActivityLog(id: number): Promise<boolean> {
    return this.activityLogs.delete(id);
  }
  
  // Stats operations
  async getStats(userId: number, date: Date): Promise<Stat | undefined> {
    const dateStr = date.toISOString().split('T')[0];
    
    return Array.from(this.statsLogs.values()).find(
      stat => stat.userId === userId && stat.date.toISOString().split('T')[0] === dateStr
    );
  }
  
  async createOrUpdateStats(insertStat: InsertStat): Promise<Stat> {
    // Check if a stat for this user and date already exists
    const existingStat = await this.getStats(insertStat.userId, insertStat.date);
    
    if (existingStat) {
      // Update existing stat
      const updated = { 
        ...existingStat, 
        ...insertStat,
        updatedAt: new Date()
      };
      this.statsLogs.set(existingStat.id, updated);
      return updated;
    } else {
      // Create new stat
      const id = this.statsIdCounter++;
      const now = new Date();
      const stat: Stat = { 
        ...insertStat, 
        id, 
        createdAt: now,
        updatedAt: now
      };
      this.statsLogs.set(id, stat);
      return stat;
    }
  }
  
  // Tips operations
  async getTips(category?: string, limit: number = 5): Promise<Tip[]> {
    let tips = Array.from(this.tips.values());
    
    if (category) {
      tips = tips.filter(tip => tip.category === category);
    }
    
    // Shuffle the array and take the first 'limit' elements
    tips = tips.sort(() => 0.5 - Math.random()).slice(0, limit);
    
    return tips;
  }
  
  async getTip(id: number): Promise<Tip | undefined> {
    return this.tips.get(id);
  }
  
  async createTip(insertTip: InsertTip): Promise<Tip> {
    const id = this.tipIdCounter++;
    const now = new Date();
    const tip: Tip = { 
      ...insertTip, 
      id, 
      createdAt: now
    };
    this.tips.set(id, tip);
    return tip;
  }
}

export const storage = new MemStorage();
