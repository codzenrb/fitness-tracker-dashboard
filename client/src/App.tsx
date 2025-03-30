import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Dashboard from "@/components/Dashboard";
import Login from "@/components/Login";
import NotFound from "@/pages/not-found";
import { UserProvider, useUser, UserData } from "./contexts/UserContext";

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

  return (
    <>
      <Switch>
        <Route path="/login">
          {user.isLoggedIn ? <Dashboard /> : <Login onLogin={handleLogin} />}
        </Route>
        <Route path="/">
          {user.isLoggedIn ? <Dashboard /> : <Login onLogin={handleLogin} />}
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
