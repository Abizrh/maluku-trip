import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/sonner";
import { useWisatawanStore } from "@/stores/wisatawanStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { Receipt, CreditCard, WalletCards } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import * as z from "zod";

const paymentSchema = z.object({
  cardNumber: z.string().min(16, "Nomor kartu harus memiliki minimal 16 digit"),
  cardholderName: z.string().min(3, "Nama pemegang kartu wajib diisi"),
  expiryDate: z.string().min(5, "Format tanggal tidak valid"),
  cvv: z.string().min(3, "CVV tidak valid"),
  paymentMethod: z.string(),
});

type PaymentFormValues = z.infer<typeof paymentSchema>;

const Payment = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const bookingDetails = location.state?.bookingDetails || {};

  const { bookTrip } = useWisatawanStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultValues: Partial<PaymentFormValues> = {
    paymentMethod: "credit-card",
  };

  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues,
  });

  const onSubmit = async (data: PaymentFormValues) => {
    setIsSubmitting(true);

    const resp = await bookTrip({
      destinasiId: id,
    });

    if (resp) {
      toast.success("Pembayaran berhasil!", {
        description: "Terima kasih telah melakukan pemesanan.",
      });
      navigate(`/dashboard`);
    }

    // Simulasi proses pembayaran
    // setTimeout(() => {
    //   console.log("Payment data:", data);
    //   console.log("Booking details:", bookingDetails);
    //
    //
    //   // Redirect ke halaman sukses atau ke detail destinasi
    //   navigate(`/destination/${id}`);
    //   setIsSubmitting(false);
    // }, 2000);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Pembayaran</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Pilih Metode Pembayaran</CardTitle>
              <CardDescription>
                Masukkan detail pembayaran Anda dengan aman
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="paymentMethod"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Metode Pembayaran</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih metode pembayaran" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="credit-card">
                              <div className="flex items-center gap-2">
                                <CreditCard className="h-4 w-4" />
                                <span>Kartu Kredit</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="debit-card">
                              <div className="flex items-center gap-2">
                                <WalletCards className="h-4 w-4" />
                                <span>Kartu Debit</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="bank-transfer">
                              <div className="flex items-center gap-2">
                                <Receipt className="h-4 w-4" />
                                <span>Transfer Bank</span>
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="cardNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nomor Kartu</FormLabel>
                        <FormControl>
                          <Input placeholder="1234 5678 9012 3456" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="cardholderName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nama Pemegang Kartu</FormLabel>
                        <FormControl>
                          <Input placeholder="Nama Lengkap" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="expiryDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tanggal Kadaluarsa</FormLabel>
                          <FormControl>
                            <Input placeholder="MM/YY" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="cvv"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CVV</FormLabel>
                          <FormControl>
                            <Input placeholder="123" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Memproses..." : "Bayar Sekarang"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Ringkasan Pemesanan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Destinasi</p>
                <p className="font-medium">
                  {bookingDetails.destinationName || "Wisata Indonesia"}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tanggal</p>
                <p className="font-medium">{bookingDetails.date || "TBD"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Jumlah Orang</p>
                <p className="font-medium">{bookingDetails.guests || 1}</p>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between">
                  <p className="font-medium">Subtotal</p>
                  <p className="font-medium">
                    Rp {bookingDetails.price || 500000}
                  </p>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <p>Pajak</p>
                  <p>Rp {Math.round((bookingDetails.price || 500000) * 0.1)}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t">
              <div className="w-full flex justify-between">
                <p className="font-bold">Total</p>
                <p className="font-bold">
                  Rp {Math.round((bookingDetails.price || 500000) * 1.1)}
                </p>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Payment;
