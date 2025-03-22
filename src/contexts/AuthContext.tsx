
import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'sonner';

// Types
export type UserRole = 'student' | 'teacher';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  studentId?: string;
  department?: string;
  photo?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
}

// Mock users for demo
const MOCK_USERS = [
  {
    id: '1',
    name: 'John Student',
    email: 'student@svu.ac.in',
    password: 'password',
    role: 'student' as UserRole,
    studentId: 'SVU2023001',
    department: 'Computer Science',
    photo: 'https://i.pravatar.cc/150?img=11'
  },
  {
    id: '2',
    name: 'Jane Teacher',
    email: 'teacher@svu.ac.in',
    password: 'password',
    role: 'teacher' as UserRole,
    department: 'Computer Science',
    photo: 'https://i.pravatar.cc/150?img=5'
  },
];

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for saved user in localStorage on initial load
    const savedUser = localStorage.getItem('svu_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user with matching credentials
      const foundUser = MOCK_USERS.find(
        u => u.email === email && u.password === password && u.role === role
      );
      
      if (!foundUser) {
        throw new Error('Invalid credentials');
      }
      
      // Exclude password from saved user
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      
      // Save user to localStorage
      localStorage.setItem('svu_user', JSON.stringify(userWithoutPassword));
      
      toast.success(`Welcome back, ${foundUser.name}!`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Login failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('svu_user');
    toast.success('You have been logged out');
  };

  const value = {
    user,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook for using auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
