
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale"; // Correct import for locale
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const formSchema = z.object({
  date: z.date({
    required_error: "Tanggal kunjungan wajib dipilih.",
  }),
  guests: z
    .number()
    .min(1, "Minimal 1 orang")
    .max(10, "Maksimal 10 orang"),
});

type DestinationProps = {
  name: string;
  price: number;
};

const BookingForm = ({ name, price }: DestinationProps) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isAuthenticated } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      guests: 1,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    // Check if user is authenticated before proceeding
    if (!isAuthenticated) {
      toast.error("Silakan login terlebih dahulu untuk melakukan pemesanan");
      navigate("/login", { state: { from: `/destination/${id}` } });
      setIsSubmitting(false);
      return;
    }
    
    // Navigasi ke halaman pembayaran dengan detail booking
    navigate(`/payment/${id}`, {
      state: {
        bookingDetails: {
          destinationName: name,
          date: format(values.date, "EEEE, d MMMM yyyy", { locale: idLocale }),
          guests: values.guests,
          price: price * values.guests,
        }
      }
    });
    
    setIsSubmitting(false);
  }

  return (
    <Card className="w-full lg:w-80">
      <CardHeader>
        <CardTitle className="text-lg">Pesan sekarang</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Tanggal kunjungan</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "EEEE, d MMMM yyyy", { locale: idLocale })
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
                        disabled={(date) =>
                          date < new Date() || date > new Date(new Date().setMonth(new Date().getMonth() + 6))
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="guests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jumlah orang</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}
                      max={10}
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="border-t pt-4">
              <div className="flex justify-between">
                <span>Rp {price} x {form.watch("guests") || 1} orang</span>
                <span>Rp {price * (form.watch("guests") || 1)}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span>Pajak & biaya layanan</span>
                <span>Rp {Math.round(price * (form.watch("guests") || 1) * 0.1)}</span>
              </div>
              <div className="flex justify-between mt-4 border-t pt-2 font-bold">
                <span>Total</span>
                <span>Rp {Math.round(price * (form.watch("guests") || 1) * 1.1)}</span>
              </div>
            </div>
            
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Memproses..." : "Pesan Sekarang"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default BookingForm;
