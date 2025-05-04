import { create } from "zustand";
import { toast } from "sonner";
import apiClient from "@/lib/api-client";
import { UserRole, User } from "@/contexts/AuthContext";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<User>;
  logout: () => void;
  register: (
    name: string,
    email: string,
    password: string,
    role: UserRole,
  ) => Promise<boolean>;
  checkAuthStatus: () => void;
}

// Create the auth store with Zustand
export const useAuthStore = create<AuthState>()((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  // Check if user is already authenticated (from localStorage)
  checkAuthStatus: () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      set({
        user: JSON.parse(storedUser),
        isAuthenticated: true,
      });
    }
  },

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const resp = await apiClient.post("/auth/login", { email, password });
      const data: { token: string; user: User } = resp.data;
      set({
        user: data.user,
        isAuthenticated: true,
        isLoading: false,
      });
      localStorage.setItem("accessToken", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      toast.success(`Login berhasil. Selamat datang, ${data.user.name}!`);
      return data.user;
    } catch (error) {
      console.error("Login error:", error);
      set({
        error: "Gagal login. Silakan coba lagi.",
        isLoading: false,
      });
      toast.error("Gagal login. Silakan coba lagi.");
    }
  },

  // Logout function
  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    set({
      user: null,
      isAuthenticated: false,
    });
    toast.info("Anda telah keluar dari akun");
  },

  // Register function - in a real app this would use the API client
  register: async (
    name: string,
    email: string,
    password: string,
    role: UserRole,
  ) => {
    set({ isLoading: true, error: null });
    try {
      const resp = await apiClient.post("/auth/register", {
        name,
        email,
        password,
        role,
      });
      toast.success("Pendaftaran berhasil!");
      return true;
    } catch (error) {
      console.error("Register error:", error);
      set({
        error: "Gagal mendaftar. Silakan coba lagi.",
        isLoading: false,
      });
      toast.error("Gagal mendaftar. Silakan coba lagi.");
      return false;
    }
  },
}));

// Initialize auth state from localStorage on import
useAuthStore.getState().checkAuthStatus();
