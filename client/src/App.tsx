import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Dashboard from "@/components/Dashboard";
import Login from "@/components/Login";
import NotFound from "@/pages/not-found";
import WorkoutsPage from "@/pages/WorkoutsPage";
import NutritionPage from "@/pages/NutritionPage";
import ProgressPage from "@/pages/ProgressPage";
import { UserProvider, useUser } from "./contexts/UserContext";

function AppRouter() {
  const { user, login } = useUser();

  // Handle login submission
  const handleLogin = (userData: {
    name: string; 
    mobileNumber: string; 
    height: number; 
    weight: number; 
    goal: string;
    otpVerified?: boolean;
  }) => {
    login({
      ...userData,
      otpVerified: userData.otpVerified || false
    });
  };

  // If not logged in, redirect to login page
  if (!user.isLoggedIn) {
    return (
      <>
        <Login onLogin={handleLogin} />
        <Toaster />
      </>
    );
  }

  // If logged in, show the appropriate page based on the route
  return (
    <>
      <Switch>
        <Route path="/workouts">
          <WorkoutsPage />
        </Route>
        <Route path="/nutrition">
          <NutritionPage />
        </Route>
        <Route path="/progress">
          <ProgressPage />
        </Route>
        <Route path="/">
          <Dashboard />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
      <Toaster />
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <AppRouter />
      </UserProvider>
    </QueryClientProvider>
  );
}

export default App;
