
import { create } from "zustand";
import apiClient from "@/lib/api-client";
import { toast } from "sonner";

// Define types for tour schedules and bookings
interface TourSchedule {
  id: string;
  destinationId: string;
  destinationName: string;
  date: string;
  time: string;
  duration: number; // in hours
  maxCapacity: number;
  price: number;
  isAvailable: boolean;
  description?: string;
}

interface Booking {
  id: string;
  scheduleId: string;
  touristId: string;
  touristName: string;
  date: string;
  status: "confirmed" | "completed" | "cancelled";
  contactInfo: string;
}

interface PemanduState {
  schedules: TourSchedule[];
  bookings: Booking[];
  isLoading: boolean;
  error: string | null;
  fetchSchedules: () => Promise<TourSchedule[]>;
  fetchBookings: () => Promise<Booking[]>;
  createSchedule: (scheduleData: Omit<TourSchedule, "id">) => Promise<boolean>;
  updateSchedule: (scheduleId: string, scheduleData: Partial<TourSchedule>) => Promise<boolean>;
  deleteSchedule: (scheduleId: string) => Promise<boolean>;
  confirmBooking: (bookingId: string) => Promise<boolean>;
  completeBooking: (bookingId: string) => Promise<boolean>;
}

// Mock data for tour schedules and bookings
const mockSchedules: TourSchedule[] = [
  {
    id: "1",
    destinationId: "101",
    destinationName: "Pantai Kuta, Bali",
    date: "2025-06-15",
    time: "08:00",
    duration: 4,
    maxCapacity: 10,
    price: 350000,
    isAvailable: true,
    description: "Eksplorasi keindahan pantai kuta dengan pemandu berpengalaman"
  },
  {
    id: "2",
    destinationId: "102",
    destinationName: "Gunung Bromo",
    date: "2025-06-20",
    time: "04:00",
    duration: 6,
    maxCapacity: 8,
    price: 500000,
    isAvailable: true,
    description: "Tour sunrise di Gunung Bromo dengan pemandangan spektakuler"
  }
];

const mockBookings: Booking[] = [
  {
    id: "1",
    scheduleId: "1",
    touristId: "101",
    touristName: "Ahmad Farhan",
    date: "2025-06-15",
    status: "confirmed",
    contactInfo: "0812-3456-7890"
  },
  {
    id: "2",
    scheduleId: "1",
    touristId: "102",
    touristName: "Dewi Lestari",
    date: "2025-06-15",
    status: "confirmed",
    contactInfo: "0823-4567-8901"
  }
];

export const usePemanduStore = create<PemanduState>()((set, get) => ({
  schedules: [],
  bookings: [],
  isLoading: false,
  error: null,

  // Fetch tour schedules for the guide
  fetchSchedules: async () => {
    set({ isLoading: true, error: null });
    try {
      // In a real app: const response = await apiClient.get("/pemandu/schedules");
      // Simulate API call with mock data
      await new Promise(resolve => setTimeout(resolve, 500)); // Fake delay
      
      set({ 
        schedules: mockSchedules,
        isLoading: false
      });
      
      return mockSchedules;
    } catch (error) {
      console.error("Fetch schedules error:", error);
      set({
        error: "Gagal mengambil data jadwal tur",
        isLoading: false
      });
      return [];
    }
  },

  // Fetch bookings for the guide's schedules
  fetchBookings: async () => {
    set({ isLoading: true, error: null });
    try {
      // In a real app: const response = await apiClient.get("/pemandu/bookings");
      // Simulate API call with mock data
      await new Promise(resolve => setTimeout(resolve, 500)); // Fake delay
      
      set({ 
        bookings: mockBookings,
        isLoading: false
      });
      
      return mockBookings;
    } catch (error) {
      console.error("Fetch bookings error:", error);
      set({
        error: "Gagal mengambil data booking",
        isLoading: false
      });
      return [];
    }
  },

  // Create a new tour schedule
  createSchedule: async (scheduleData) => {
    set({ isLoading: true, error: null });
    try {
      // In a real app: const response = await apiClient.post("/pemandu/schedules", scheduleData);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800)); // Fake delay
      
      const newSchedule: TourSchedule = {
        ...scheduleData,
        id: Date.now().toString()
      };
      
      set(state => ({ 
        schedules: [...state.schedules, newSchedule],
        isLoading: false
      }));
      
      toast.success("Jadwal tur berhasil dibuat!");
      return true;
    } catch (error) {
      console.error("Create schedule error:", error);
      set({
        error: "Gagal membuat jadwal tur",
        isLoading: false
      });
      toast.error("Gagal membuat jadwal tur");
      return false;
    }
  },

  // Update a tour schedule
  updateSchedule: async (scheduleId, scheduleData) => {
    set({ isLoading: true, error: null });
    try {
      // In a real app: const response = await apiClient.put(`/pemandu/schedules/${scheduleId}`, scheduleData);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500)); // Fake delay
      
      set(state => ({ 
        schedules: state.schedules.map(schedule => 
          schedule.id === scheduleId ? { ...schedule, ...scheduleData } : schedule
        ),
        isLoading: false
      }));
      
      toast.success("Jadwal tur berhasil diperbarui");
      return true;
    } catch (error) {
      console.error("Update schedule error:", error);
      set({
        error: "Gagal memperbarui jadwal tur",
        isLoading: false
      });
      toast.error("Gagal memperbarui jadwal tur");
      return false;
    }
  },

  // Delete a tour schedule
  deleteSchedule: async (scheduleId) => {
    set({ isLoading: true, error: null });
    try {
      // In a real app: const response = await apiClient.delete(`/pemandu/schedules/${scheduleId}`);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500)); // Fake delay
      
      set(state => ({ 
        schedules: state.schedules.filter(schedule => schedule.id !== scheduleId),
        isLoading: false
      }));
      
      toast.success("Jadwal tur berhasil dihapus");
      return true;
    } catch (error) {
      console.error("Delete schedule error:", error);
      set({
        error: "Gagal menghapus jadwal tur",
        isLoading: false
      });
      toast.error("Gagal menghapus jadwal tur");
      return false;
    }
  },

  // Confirm a booking
  confirmBooking: async (bookingId) => {
    set({ isLoading: true, error: null });
    try {
      // In a real app: const response = await apiClient.put(`/pemandu/bookings/${bookingId}/confirm`);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500)); // Fake delay
      
      set(state => ({ 
        bookings: state.bookings.map(booking => 
          booking.id === bookingId ? { ...booking, status: "confirmed" } : booking
        ),
        isLoading: false
      }));
      
      toast.success("Booking berhasil dikonfirmasi");
      return true;
    } catch (error) {
      console.error("Confirm booking error:", error);
      set({
        error: "Gagal mengkonfirmasi booking",
        isLoading: false
      });
      toast.error("Gagal mengkonfirmasi booking");
      return false;
    }
  },

  // Complete a booking
  completeBooking: async (bookingId) => {
    set({ isLoading: true, error: null });
    try {
      // In a real app: const response = await apiClient.put(`/pemandu/bookings/${bookingId}/complete`);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500)); // Fake delay
      
      set(state => ({ 
        bookings: state.bookings.map(booking => 
          booking.id === bookingId ? { ...booking, status: "completed" } : booking
        ),
        isLoading: false
      }));
      
      toast.success("Booking telah selesai");
      return true;
    } catch (error) {
      console.error("Complete booking error:", error);
      set({
        error: "Gagal menyelesaikan booking",
        isLoading: false
      });
      toast.error("Gagal menyelesaikan booking");
      return false;
    }
  }
}));
