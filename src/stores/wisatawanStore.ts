import { create } from "zustand";
import apiClient from "@/lib/api-client";
import { toast } from "sonner";
import { Destination } from "./pengelolaStore";

// Define types for trips
interface Trip {
  id: string;
  destinationId: string;
  destinationName: string;
  date: string;
  status: "upcoming" | "completed" | "cancelled";
  guideId?: string;
  guideName?: string;
  price: number;
  imageUrl: string;
}

export interface Booking {
  _id: string;
  destinasiId: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  destinasi?: Destination;
}

interface WisatawanState {
  trips: Booking[];
  detailTrip: Booking | null;
  isLoading: boolean;
  error: string | null;
  fetchMyBooking: () => Promise<Booking[]>;
  getBookingDetail: (id: string) => Promise<Booking>;
  bookTrip: (
    tripData: Omit<Booking, "id" | "status" | "destinasi">,
  ) => Promise<boolean>;
  cancelTrip: (tripId: string) => Promise<boolean>;
}

// Mock data for tourist trips
const mockTrips: Trip[] = [
  {
    id: "1",
    destinationId: "101",
    destinationName: "Pantai Kuta, Bali",
    date: "2025-06-15",
    status: "upcoming",
    guideId: "2",
    guideName: "Siti Nuraini",
    price: 350000,
    imageUrl: "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8",
  },
  {
    id: "2",
    destinationId: "102",
    destinationName: "Candi Borobudur",
    date: "2025-05-20",
    status: "upcoming",
    guideId: "5",
    guideName: "Rizky Pratama",
    price: 250000,
    imageUrl: "https://images.unsplash.com/photo-1580131683190-48e034839c4d",
  },
];

export const useWisatawanStore = create<WisatawanState>()((set, get) => ({
  trips: [],
  detailTrip: null,
  isLoading: false,
  error: null,

  // Fetch tourist trips
  fetchMyBooking: async () => {
    set({ isLoading: true, error: null });
    try {
      const resp = await apiClient.get("/booking/myBookings");
      const { data } = resp.data;

      set({
        trips: data,
        isLoading: false,
      });

      return data;
    } catch (error) {
      console.error("Fetch trips error:", error);
      set({
        error: "Gagal mengambil data perjalanan",
        isLoading: false,
      });
      return [];
    }
  },

  getBookingDetail: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const resp = await apiClient.get(`/booking/${id}`);
      const { data } = resp.data;
      console.log("Booking detail response:", resp);
      set({ detailTrip: data, isLoading: false });
      return data;
    } catch (error) {
      console.error("Get booking detail error:", error);
      set({
        error: "Gagal mengambil detail perjalanan",
        isLoading: false,
      });
      return null;
    }
  },

  // Book a new trip
  bookTrip: async (tripData) => {
    set({ isLoading: true, error: null });
    try {
      const resp = await apiClient.post("/booking", tripData);
      const { data } = resp.data;
      console.log("Booking response:", resp);
      // In a real app: const response = await apiClient.post("/wisatawan/trips", tripData);
      // Simulate API call
      // await new Promise(resolve => setTimeout(resolve, 800)); // Fake delay
      //

      set((state) => ({
        trips: data,
        isLoading: false,
      }));

      toast.success("Perjalanan berhasil dibooking!");
      return true;
    } catch (error) {
      console.error("Book trip error:", error);
      set({
        error: "Gagal membooking perjalanan",
        isLoading: false,
      });
      toast.error("Gagal membooking perjalanan");
      return false;
    }
  },

  // Cancel a booked trip
  cancelTrip: async (tripId) => {
    set({ isLoading: true, error: null });
    try {
      // In a real app: const response = await apiClient.put(`/wisatawan/trips/${tripId}/cancel`);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500)); // Fake delay

      set((state) => ({
        trips: state.trips.map((trip) =>
          trip.id === tripId ? { ...trip, status: "cancelled" } : trip,
        ),
        isLoading: false,
      }));

      toast.success("Perjalanan berhasil dibatalkan");
      return true;
    } catch (error) {
      console.error("Cancel trip error:", error);
      set({
        error: "Gagal membatalkan perjalanan",
        isLoading: false,
      });
      toast.error("Gagal membatalkan perjalanan");
      return false;
    }
  },
}));
