import { createContext, useContext, ReactNode } from 'react';
import { useState, useEffect } from 'react';

// User interface
export interface UserData {
  name: string;
  mobileNumber: string;
  height: number;
  weight: number;
  goal: string;
  isLoggedIn: boolean;
}

// Initial user state
const initialUserState: UserData = {
  name: '',
  mobileNumber: '',
  height: 0,
  weight: 0,
  goal: '',
  isLoggedIn: false
};

// Context type
interface UserContextType {
  user: UserData;
  login: (userData: Omit<UserData, 'isLoggedIn'>) => void;
  logout: () => void;
  updateUser: (data: Partial<UserData>) => void;
}

// Create context with a default value
const UserContext = createContext<UserContextType>({
  user: initialUserState,
  login: () => {},
  logout: () => {},
  updateUser: () => {}
});

// Provider props
interface UserProviderProps {
  children: ReactNode;
}

// Context provider
export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<UserData>(() => {
    try {
      // Try to get user data from local storage
      const storedUser = localStorage.getItem('fitTrackUser');
      return storedUser ? JSON.parse(storedUser) : initialUserState;
    } catch (error) {
      console.error('Error loading user from local storage:', error);
      return initialUserState;
    }
  });

  // Save user data to local storage when it changes
  useEffect(() => {
    try {
      localStorage.setItem('fitTrackUser', JSON.stringify(user));
    } catch (error) {
      console.error('Error saving user to local storage:', error);
    }
  }, [user]);

  // Login function
  const login = (userData: Omit<UserData, 'isLoggedIn'>) => {
    setUser({
      ...userData,
      isLoggedIn: true
    });
  };

  // Logout function
  const logout = () => {
    setUser(initialUserState);
  };

  // Update user data
  const updateUser = (data: Partial<UserData>) => {
    setUser(prevUser => ({
      ...prevUser,
      ...data
    }));
  };

  // Context value
  const value = {
    user,
    login,
    logout,
    updateUser
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

// Custom hook for using this context
export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}