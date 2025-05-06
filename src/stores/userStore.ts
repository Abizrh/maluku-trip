import { create } from "zustand";
import apiClient from "@/lib/api-client";
import { User } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface UserState {
  allUsers: User[];
  profile: User | null;
  isLoading: boolean;
  error: string | null;
  fetchProfile: () => Promise<User | null>;
  fetchUsers: () => Promise<User | null>;
  updateProfile: (userData: Partial<User>) => Promise<boolean>;
}

export const useUserStore = create<UserState>()((set, get) => ({
  allUsers: [],
  profile: null,
  isLoading: false,
  error: null,

  fetchUsers: async () => {
    set({ isLoading: true, error: null });
    try {
      const resp = await apiClient.get("/users");
      const { data } = resp.data;
      set({
        allUsers: data,
        isLoading: false,
      });
      return data;
    } catch (error) {
      console.error("Fetch profile error:", error);
      set({
        error: "Gagal mengambil data profil",
        isLoading: false,
      });
      return null;
    }
  },
  // Fetch user profile
  fetchProfile: async () => {
    set({ isLoading: true, error: null });
    try {
      // In a real app: const response = await apiClient.get("/users/profile");
      // Simulate API call with localStorage data
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        set({
          profile: user,
          isLoading: false,
        });
        return user;
      }
      set({ isLoading: false });
      return null;
    } catch (error) {
      console.error("Fetch profile error:", error);
      set({
        error: "Gagal mengambil data profil",
        isLoading: false,
      });
      return null;
    }
  },

  // Update user profile
  updateProfile: async (userData: Partial<User>) => {
    set({ isLoading: true, error: null });
    try {
      // In a real app: const response = await apiClient.put("/users/profile", userData);
      // Simulate API call with localStorage data
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const currentUser = JSON.parse(storedUser);
        const updatedUser = { ...currentUser, ...userData };

        // Update localStorage and state
        localStorage.setItem("user", JSON.stringify(updatedUser));
        set({
          profile: updatedUser,
          isLoading: false,
        });

        toast.success("Profil berhasil diperbarui");
        return true;
      }
      set({ isLoading: false });
      toast.error("Tidak dapat memperbarui profil");
      return false;
    } catch (error) {
      console.error("Update profile error:", error);
      set({
        error: "Gagal memperbarui profil",
        isLoading: false,
      });
      toast.error("Gagal memperbarui profil");
      return false;
    }
  },
}));
