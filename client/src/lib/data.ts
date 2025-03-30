// Types for fitness tracking data
export type StatItem = {
  title: string;
  value: string;
  icon: string;
  iconBgColor: string;
  iconColor: string;
  progress: number;
  progressColor: string;
};

export type WorkoutItem = {
  title: string;
  status: string;
  statusColor: string;
  details: string;
  buttons?: boolean;
};

export type CalorieSource = {
  label: string;
  color: string;
  percentage: number;
  calories: number;
};

export type DayItem = {
  abbr: string;
  day: number;
};

export type ActivityItem = {
  icon: string;
  iconBg: string;
  iconColor: string;
  title: string;
  details: string;
  status: string;
  statusColor: string;
};

export type GoalItem = {
  title: string;
  description: string;
  progress: string;
  progressColor: string;
  progressPercentage: number;
  startDate?: string;
  endDate?: string;
  progressText: string;
  timeLeft?: string;
};

export type TipItem = {
  icon: string;
  iconColor: string;
  title: string;
  content: string;
};

// Mock data for the dashboard
export const stats: StatItem[] = [
  {
    title: "Calories",
    value: "1,842 / 2,200",
    icon: "bx-flame",
    iconBgColor: "bg-red-100",
    iconColor: "text-danger",
    progress: 83,
    progressColor: "bg-danger"
  },
  {
    title: "Steps",
    value: "8,946 / 10,000",
    icon: "bx-walk",
    iconBgColor: "bg-blue-100",
    iconColor: "text-primary",
    progress: 89,
    progressColor: "bg-primary"
  },
  {
    title: "Water",
    value: "1.8 / 2.5 L",
    icon: "bx-droplet",
    iconBgColor: "bg-blue-100",
    iconColor: "text-blue-500",
    progress: 72,
    progressColor: "bg-blue-500"
  },
  {
    title: "Sleep",
    value: "6.5 / 8 hrs",
    icon: "bx-moon",
    iconBgColor: "bg-purple-100",
    iconColor: "text-purple-600",
    progress: 81,
    progressColor: "bg-purple-600"
  }
];

export const workouts: WorkoutItem[] = [
  {
    title: "Upper Body Strength",
    status: "Completed",
    statusColor: "bg-green-100 text-success",
    details: "45 mins · 320 calories · 5 exercises"
  },
  {
    title: "Evening Run",
    status: "Scheduled",
    statusColor: "bg-blue-100 text-primary",
    details: "30 mins · 280 calories · 7:00 PM",
    buttons: true
  }
];

export const caloriesSources: CalorieSource[] = [
  { label: "Breakfast", color: "bg-primary", percentage: 25, calories: 460 },
  { label: "Lunch", color: "bg-success", percentage: 35, calories: 650 },
  { label: "Dinner", color: "bg-warning", percentage: 32, calories: 590 },
  { label: "Snacks", color: "bg-danger", percentage: 8, calories: 142 }
];

export const burnedSources: CalorieSource[] = [
  { label: "Workout", color: "bg-blue-500", percentage: 52, calories: 320 },
  { label: "Walking", color: "bg-purple-500", percentage: 34, calories: 210 },
  { label: "NEAT", color: "bg-pink-500", percentage: 15, calories: 90 }
];

export const weekDays: DayItem[] = [
  { abbr: "MON", day: 24 },
  { abbr: "TUE", day: 25 },
  { abbr: "WED", day: 26 },
  { abbr: "THU", day: 27 },
  { abbr: "FRI", day: 28 },
  { abbr: "SAT", day: 29 },
  { abbr: "SUN", day: 30 }
];

export const activityLog: ActivityItem[] = [
  {
    icon: "bx-dumbbell",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    title: "Upper Body Strength",
    details: "45 mins · 320 calories · 9:30 AM",
    status: "Completed",
    statusColor: "bg-green-100 text-success"
  },
  {
    icon: "bx-run",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-500",
    title: "Morning Walk",
    details: "25 mins · 180 calories · 7:15 AM",
    status: "Completed",
    statusColor: "bg-green-100 text-success"
  },
  {
    icon: "bx-water",
    iconBg: "bg-purple-500/10",
    iconColor: "text-purple-500",
    title: "Hydration Goal",
    details: "1.8 / 2.5 L · 72% complete",
    status: "In Progress",
    statusColor: "bg-blue-100 text-blue-600"
  }
];

export const goals: GoalItem[] = [
  {
    title: "Weight Goal",
    description: "Lose 10 pounds",
    progress: "4.2/10 lbs",
    progressColor: "bg-success",
    progressPercentage: 42,
    startDate: "May 10",
    endDate: "Jul 10",
    progressText: "Started"
  },
  {
    title: "Running Goal",
    description: "Run 50 miles this month",
    progress: "31.5/50 mi",
    progressColor: "bg-primary",
    progressPercentage: 63,
    progressText: "Progress: 63%",
    timeLeft: "18 days left"
  },
  {
    title: "Strength Goal",
    description: "Bench press 200 lbs",
    progress: "185/200 lbs",
    progressColor: "bg-warning",
    progressPercentage: 92,
    progressText: "Progress: 92%",
    timeLeft: "Almost there!"
  }
];

export const tips: TipItem[] = [
  {
    icon: "bx-bulb",
    iconColor: "text-warning",
    title: "Hydration Reminder",
    content: "Remember to drink water consistently throughout the day instead of all at once. This helps with better absorption."
  },
  {
    icon: "bx-heart",
    iconColor: "text-danger",
    title: "Today's Motivation",
    content: ""The only bad workout is the one that didn't happen. Every step counts toward your goals.""
  }
];
