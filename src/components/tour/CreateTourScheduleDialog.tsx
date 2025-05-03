
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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

interface CreateTourScheduleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

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
});

type FormValues = z.infer<typeof formSchema>;

export function CreateTourScheduleDialog({ open, onOpenChange }: CreateTourScheduleDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tourId: "",
      maxParticipants: 10,
      price: 300000,
      notes: "",
    },
  });

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

  function onSubmit(data: FormValues) {
    setIsSubmitting(true);
    
    // In a real app, send data to your API
    console.log("Form submitted:", data);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      onOpenChange(false);
      form.reset();
      
      toast.success("Jadwal tur berhasil dibuat");
    }, 1000);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Buat Jadwal Tur Baru</DialogTitle>
          <DialogDescription>
            Isi detail jadwal tur baru yang ingin Anda buat.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="tourId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pilih Tur</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih tur untuk dijadwalkan" />
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
                        disabled={(date) => date < new Date()}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
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

            <div className="grid grid-cols-2 gap-4">
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
                        min={1}
                        max={100}
                      />
                    </FormControl>
                    <FormDescription>
                      Kapasitas maksimal
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

            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Batal
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Menyimpan..." : "Simpan Jadwal"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
