
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
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

// Define the form schema
const guideInviteSchema = z.object({
  email: z.string().email({ message: "Email tidak valid" }),
  name: z.string().min(1, { message: "Nama harus diisi" }),
  specialties: z.string().min(1, { message: "Keahlian harus dipilih" }),
  message: z.string().optional(),
});

export const GuideInviteForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize the form
  const form = useForm<z.infer<typeof guideInviteSchema>>({
    resolver: zodResolver(guideInviteSchema),
    defaultValues: {
      email: "",
      name: "",
      specialties: "",
      message: "",
    },
  });

  // Handle form submission
  const onSubmit = (values: z.infer<typeof guideInviteSchema>) => {
    setIsSubmitting(true);

    // In a real app, this would send an invitation to the guide
    // Simulate API call with timeout
    setTimeout(() => {
      toast.success(`Undangan telah dikirim ke ${values.email}`);
      form.reset();
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Pemandu</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="email@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Pemandu</FormLabel>
                <FormControl>
                  <Input placeholder="Nama lengkap pemandu" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="specialties"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Keahlian Utama</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih keahlian" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Wisata Alam">Wisata Alam</SelectItem>
                    <SelectItem value="Wisata Budaya">Wisata Budaya</SelectItem>
                    <SelectItem value="Kuliner">Kuliner</SelectItem>
                    <SelectItem value="Fotografi">Fotografi</SelectItem>
                    <SelectItem value="Diving">Diving</SelectItem>
                    <SelectItem value="Hiking">Hiking</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="col-span-full">
                <FormLabel>Pesan Undangan (Opsional)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Pesan untuk calon pemandu"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Mengirim..." : "Kirim Undangan"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default GuideInviteForm;
