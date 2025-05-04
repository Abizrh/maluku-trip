import { create } from "zustand";
import apiClient from "@/lib/api-client";
import { toast } from "sonner";

// Define types for destinations and guides
interface Destination {
  id: string;
  name: string;
  description: string;
  location: string;
  region: string;
  price: number;
  rating: number;
  image: string;
  features: string[];
  managerId: string;
}

interface Guide {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  specialties: string[];
  languages: string[];
  experience: number; // in years
  rating: number;
  isActive: boolean;
  destinationIds: string[];
}

interface PengelolaState {
  destinations: Destination[];
  guides: Guide[];
  isLoading: boolean;
  error: string | null;
  fetchDestinations: () => Promise<Destination[]>;
  fetchGuides: () => Promise<Guide[]>;
  createDestination: (
    destinationData: Omit<Destination, "id" | "managerId" | "rating">,
  ) => Promise<boolean>;
  updateDestination: (
    destinationId: string,
    destinationData: Partial<Destination>,
  ) => Promise<boolean>;
  deleteDestination: (destinationId: string) => Promise<boolean>;
  inviteGuide: (email: string, destinationIds: string[]) => Promise<boolean>;
  removeGuide: (guideId: string, destinationId: string) => Promise<boolean>;
}

const mockGuides: Guide[] = [
  {
    id: "2",
    name: "Siti Nuraini",
    email: "siti@example.com",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    specialties: ["Wisata Budaya", "Sejarah"],
    languages: ["Indonesia", "Inggris"],
    experience: 3,
    rating: 4.7,
    isActive: true,
    destinationIds: ["101", "102"],
  },
  {
    id: "5",
    name: "Rizky Pratama",
    email: "rizky@example.com",
    avatar: "https://randomuser.me/api/portraits/men/28.jpg",
    specialties: ["Ekowisata", "Petualangan"],
    languages: ["Indonesia", "Inggris", "Jepang"],
    experience: 5,
    rating: 4.9,
    isActive: true,
    destinationIds: ["102"],
  },
];

export const usePengelolaStore = create<PengelolaState>()((set, get) => ({
  destinations: [],
  guides: [],
  isLoading: false,
  error: null,

  // Fetch destinations managed by the user
  fetchDestinations: async () => {
    set({ isLoading: true, error: null });
    try {
      const resp = await apiClient.get("/destinasi");
      const { data } = resp.data;
      set({
        destinations: data,
        isLoading: false,
      });

      return data;
    } catch (error) {
      console.error("Fetch destinations error:", error);
      set({
        error: "Gagal mengambil data destinasi",
        isLoading: false,
      });
      return [];
    }
  },

  // Fetch guides associated with the user's destinations
  fetchGuides: async () => {
    set({ isLoading: true, error: null });
    try {
      // In a real app: const response = await apiClient.get("/pengelola/guides");
      // Simulate API call with mock data
      await new Promise((resolve) => setTimeout(resolve, 500)); // Fake delay

      set({
        guides: mockGuides,
        isLoading: false,
      });

      return mockGuides;
    } catch (error) {
      console.error("Fetch guides error:", error);
      set({
        error: "Gagal mengambil data pemandu",
        isLoading: false,
      });
      return [];
    }
  },

  // Create a new destination
  createDestination: async (destinationData) => {
    set({ isLoading: true, error: null });
    try {
      // Get current user ID
      const userJson = localStorage.getItem("user");
      if (!userJson) {
        throw new Error("User not logged in");
      }
      const user = JSON.parse(userJson);

      // In a real app: const response = await apiClient.post("/pengelola/destinations", destinationData);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800)); // Fake delay

      const newDestination: Destination = {
        ...destinationData,
        id: Date.now().toString(),
        managerId: user.id,
        rating: 0, // New destination starts with no rating
      };

      set((state) => ({
        destinations: [...state.destinations, newDestination],
        isLoading: false,
      }));

      toast.success("Destinasi wisata berhasil dibuat!");
      return true;
    } catch (error) {
      console.error("Create destination error:", error);
      set({
        error: "Gagal membuat destinasi wisata",
        isLoading: false,
      });
      toast.error("Gagal membuat destinasi wisata");
      return false;
    }
  },

  // Update a destination
  updateDestination: async (destinationId, destinationData) => {
    set({ isLoading: true, error: null });
    try {
      // In a real app: const response = await apiClient.put(`/pengelola/destinations/${destinationId}`, destinationData);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500)); // Fake delay

      set((state) => ({
        destinations: state.destinations.map((destination) =>
          destination.id === destinationId
            ? { ...destination, ...destinationData }
            : destination,
        ),
        isLoading: false,
      }));

      toast.success("Destinasi wisata berhasil diperbarui");
      return true;
    } catch (error) {
      console.error("Update destination error:", error);
      set({
        error: "Gagal memperbarui destinasi wisata",
        isLoading: false,
      });
      toast.error("Gagal memperbarui destinasi wisata");
      return false;
    }
  },

  // Delete a destination
  deleteDestination: async (destinationId) => {
    set({ isLoading: true, error: null });
    try {
      // In a real app: const response = await apiClient.delete(`/pengelola/destinations/${destinationId}`);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500)); // Fake delay

      set((state) => ({
        destinations: state.destinations.filter(
          (destination) => destination.id !== destinationId,
        ),
        isLoading: false,
      }));

      toast.success("Destinasi wisata berhasil dihapus");
      return true;
    } catch (error) {
      console.error("Delete destination error:", error);
      set({
        error: "Gagal menghapus destinasi wisata",
        isLoading: false,
      });
      toast.error("Gagal menghapus destinasi wisata");
      return false;
    }
  },

  // Invite a guide to manage destinations
  inviteGuide: async (email, destinationIds) => {
    set({ isLoading: true, error: null });
    try {
      // In a real app: const response = await apiClient.post("/pengelola/guides/invite", { email, destinationIds });
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800)); // Fake delay

      toast.success(`Undangan telah dikirim ke ${email}`);
      return true;
    } catch (error) {
      console.error("Invite guide error:", error);
      set({
        error: "Gagal mengirim undangan ke pemandu",
        isLoading: false,
      });
      toast.error("Gagal mengirim undangan ke pemandu");
      return false;
    }
  },

  // Remove a guide from a destination
  removeGuide: async (guideId, destinationId) => {
    set({ isLoading: true, error: null });
    try {
      // In a real app: const response = await apiClient.delete(`/pengelola/destinations/${destinationId}/guides/${guideId}`);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500)); // Fake delay

      set((state) => ({
        guides: state.guides.map((guide) => {
          if (guide.id === guideId) {
            return {
              ...guide,
              destinationIds: guide.destinationIds.filter(
                (id) => id !== destinationId,
              ),
            };
          }
          return guide;
        }),
        isLoading: false,
      }));

      toast.success("Pemandu berhasil dihapus dari destinasi");
      return true;
    } catch (error) {
      console.error("Remove guide error:", error);
      set({
        error: "Gagal menghapus pemandu dari destinasi",
        isLoading: false,
      });
      toast.error("Gagal menghapus pemandu dari destinasi");
      return false;
    }
  },
}));
