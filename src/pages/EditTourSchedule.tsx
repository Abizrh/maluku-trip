
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock, ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const formSchema = z.object({
  tourId: z.string().min(1, "Pilih tur"),
  date: z.date({
    required_error: "Tanggal wajib dipilih",
  }),
  startTime: z.string().min(1, "Waktu mulai wajib diisi"),
  duration: z.string().min(1, "Durasi wajib diisi"),
  maxParticipants: z.number().min(1, "Minimal 1 peserta").max(100, "Maksimal 100 peserta"),
  price: z.number().min(1000, "Harga minimal Rp 1.000").max(10000000, "Harga maksimal Rp 10.000.000"),
  notes: z.string().optional(),
  status: z.enum(["scheduled", "cancelled"]),
});

type FormValues = z.infer<typeof formSchema>;

const EditTourSchedule = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [schedule, setSchedule] = useState<any>(null);

  // Mock data for tours
  const tours = [
    { id: "tour-001", name: "Tur Pura Tanah Lot & Sunset" },
    { id: "tour-002", name: "Tur Budaya Ubud" },
    { id: "tour-003", name: "Tur Pantai Kuta & Seminyak" },
  ];

  // Mock data for duration options
  const durationOptions = [
    { value: "2", label: "2 jam" },
    { value: "3", label: "3 jam" },
    { value: "4", label: "4 jam" },
    { value: "5", label: "5 jam" },
    { value: "6", label: "6 jam" },
    { value: "7", label: "7 jam" },
    { value: "8", label: "8 jam" },
  ];

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tourId: "",
      maxParticipants: 10,
      price: 300000,
      notes: "",
      status: "scheduled",
    },
  });

  useEffect(() => {
    // In a real app, fetch schedule data from your API
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Mock schedule data
      const mockSchedule = {
        id: id,
        tourId: "tour-001",
        tourName: "Tur Pura Tanah Lot & Sunset",
        destination: "Pura Tanah Lot, Tabanan",
        date: new Date("2023-05-25"),
        startTime: "15:00",
        duration: "4",
        maxParticipants: 10,
        bookedParticipants: 6,
        price: 300000,
        notes: "Peserta akan dijemput di hotel masing-masing",
        status: "scheduled"
      };
      
      setSchedule(mockSchedule);
      
      // Set form values
      form.reset({
        tourId: mockSchedule.tourId,
        date: mockSchedule.date,
        startTime: mockSchedule.startTime,
        duration: mockSchedule.duration,
        maxParticipants: mockSchedule.maxParticipants,
        price: mockSchedule.price,
        notes: mockSchedule.notes,
        status: mockSchedule.status as "scheduled" | "cancelled",
      });
      
      setLoading(false);
    }, 500);
  }, [id, form]);

  function onSubmit(data: FormValues) {
    setIsSubmitting(true);
    
    // In a real app, send data to your API
    console.log("Form submitted:", data);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Jadwal tur berhasil diperbarui");
      navigate("/tour-schedule");
    }, 1000);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow bg-gray-50 py-8">
          <div className="container mx-auto px-4 text-center">
            <p>Memuat data jadwal tur...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!schedule) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow bg-gray-50 py-8">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <h1 className="text-2xl font-bold mb-4">Jadwal Tidak Ditemukan</h1>
              <p className="mb-6">Jadwal tur yang Anda cari tidak dapat ditemukan.</p>
              <Button onClick={() => navigate("/tour-schedule")}>
                Kembali ke Daftar Jadwal
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/tour-schedule")}
            className="mb-4"
          >
            <ArrowLeft size={16} className="mr-2" />
            Kembali ke Daftar Jadwal
          </Button>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h1 className="text-2xl font-bold mb-6">Edit Jadwal Tur</h1>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="tourId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tur</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih tur" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {tours.map((tour) => (
                            <SelectItem key={tour.id} value={tour.id}>
                              {tour.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Tanggal</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pilih tanggal</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date < new Date() && !format(date, "yyyy-MM-dd").includes(format(field.value || new Date(), "yyyy-MM-dd"))}
                              initialFocus
                              className={cn("p-3 pointer-events-auto")}
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="scheduled">Terjadwal</SelectItem>
                            <SelectItem value="cancelled">Dibatalkan</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="startTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Waktu Mulai</FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input
                              type="time"
                              placeholder="00:00"
                              {...field}
                            />
                          </FormControl>
                          <Clock className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Durasi</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih durasi" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {durationOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="maxParticipants"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Jumlah Peserta Maksimum</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                            min={schedule.bookedParticipants || 1}
                            max={100}
                          />
                        </FormControl>
                        <FormDescription>
                          Minimum sesuai jumlah pemesanan saat ini ({schedule.bookedParticipants})
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Harga per Orang</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <span className="absolute left-3 top-2.5">Rp</span>
                            <Input
                              type="number"
                              className="pl-8"
                              {...field}
                              onChange={(e) => field.onChange(Number(e.target.value))}
                              min={1000}
                            />
                          </div>
                        </FormControl>
                        <FormDescription>
                          Dalam Rupiah
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Catatan</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Informasi tambahan tentang jadwal tur ini"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Opsional
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end space-x-4">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => navigate("/tour-schedule")}
                    disabled={isSubmitting}
                  >
                    Batal
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default EditTourSchedule;
