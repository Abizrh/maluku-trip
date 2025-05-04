import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Define user types and roles
export type UserRole = "wisatawan" | "pemandu" | "pengelola" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
}

// Define Authentication Context type
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (
    name: string,
    email: string,
    password: string,
    role: UserRole,
  ) => Promise<boolean>;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for demo purposes
const mockUsers = [
  {
    id: "1",
    name: "Ahmad Farhan",
    email: "ahmad@gmail.com",
    password: "password123",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    role: "wisatawan" as UserRole,
  },
  {
    id: "2",
    name: "Siti Nuraini",
    email: "siti@gmail.com",
    password: "password123",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    role: "pemandu" as UserRole,
  },
  {
    id: "3",
    name: "Budi Santoso",
    email: "budi@gmail.com",
    password: "password123",
    avatar: "https://randomuser.me/api/portraits/men/67.jpg",
    role: "pengelola" as UserRole,
  },
  {
    id: "4",
    name: "Admin",
    email: "admin@gmail.com",
    password: "admin123",
    avatar: "https://randomuser.me/api/portraits/women/22.jpg",
    role: "admin" as UserRole,
  },
];

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  // Check for existing session on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call with mock data
    try {
      const foundUser = mockUsers.find(
        (u) => u.email === email && u.password === password,
      );

      if (foundUser) {
        // Omit password before storing user data
        const { password: _, ...userWithoutPassword } = foundUser;

        // Store user in state and localStorage
        setUser(userWithoutPassword);
        setIsAuthenticated(true);
        localStorage.setItem("user", JSON.stringify(userWithoutPassword));

        toast.success(
          `Login berhasil. Selamat datang, ${userWithoutPassword.name}!`,
        );
        return true;
      } else {
        toast.error("Email atau password salah");
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Gagal login. Silakan coba lagi.");
      return false;
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    toast.info("Anda telah keluar dari akun");
    navigate("/");
  };

  // Register function
  const register = async (
    name: string,
    email: string,
    password: string,
    role: UserRole,
  ): Promise<boolean> => {
    try {
      // Check if email already exists
      if (mockUsers.some((u) => u.email === email)) {
        toast.error("Email sudah terdaftar");
        return false;
      }

      // Create new user (in real app, this would be an API call)
      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        role,
        avatar: `https://randomuser.me/api/portraits/${role === "pemandu" ? "men" : "women"}/${Math.floor(Math.random() * 70)}.jpg`,
      };

      // Store user in state and localStorage
      setUser(newUser);
      setIsAuthenticated(true);
      localStorage.setItem("user", JSON.stringify(newUser));

      toast.success("Pendaftaran berhasil!");
      return true;
    } catch (error) {
      console.error("Register error:", error);
      toast.error("Gagal mendaftar. Silakan coba lagi.");
      return false;
    }
  };

  // Context value
  const value = {
    user,
    isAuthenticated,
    login,
    logout,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook for using auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
