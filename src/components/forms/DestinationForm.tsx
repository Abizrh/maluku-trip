import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePengelolaStore } from "@/stores/pengelolaStore";
import { useUserStore } from "@/stores/userStore";
import { usePemanduStore } from "@/stores/pemanduStore";

// Define the form schema
const destinationSchema = z.object({
  name: z.string().min(1, { message: "Nama destinasi harus diisi" }),
  location: z.string().min(1, { message: "Lokasi harus diisi" }),
  description: z.string().min(10, { message: "Deskripsi minimal 10 karakter" }),
  category: z.string().min(1, { message: "Kategori harus dipilih" }),
  guide_id: z.string().min(1, { message: "Pemandu harus dipilih" }),
  price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Harga harus berupa angka positif",
  }),
  maxVisitors: z
    .string()
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Maksimal pengunjung harus berupa angka positif",
    }),
});

type DestinationFormProps = {
  initialData?: any; // For edit mode
};

export const DestinationForm = ({ initialData }: DestinationFormProps) => {
  const navigate = useNavigate();
  const isEditMode = !!initialData;
  const [images, setImages] = useState<string[]>(initialData?.images || []);
  const [uploading, setUploading] = useState(false);
  const { createDestination } = usePengelolaStore();
  const { fetchUsers } = useUserStore();
  const { fetchGuides, guides } = usePemanduStore();
  const [manualImage, setManualImage] = useState("");
  // Initialize the form with default values or existing data for editing
  const form = useForm<z.infer<typeof destinationSchema>>({
    resolver: zodResolver(destinationSchema),
    defaultValues: {
      name: initialData?.name || "",
      location: initialData?.location || "",
      description: initialData?.description || "",
      category: initialData?.category || "",
      guide_id: initialData?.quide_id || "",
      price: initialData?.price ? initialData.price.toString() : "",
      maxVisitors: initialData?.maxVisitors
        ? initialData.maxVisitors.toString()
        : "",
    },
  });

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof destinationSchema>) => {
    if (images.length === 0) {
      toast.error("Minimal satu gambar harus diunggah");
      return;
    }

    // In a real app, this would send data to your backend
    const destinationData = {
      ...values,
      price: Number(values.price),
      // maxVisitors: Number(values.maxVisitors),
      image: images[0],
      // status: "Aktif",
      // id: initialData?.id || `dest-${Date.now()}`,
    };

    const destinasi = await createDestination(destinationData);

    if (destinasi) {
      toast.success(
        isEditMode
          ? "Destinasi berhasil diperbarui"
          : "Destinasi baru berhasil ditambahkan",
      );
      navigate("/manager-dashboard");
    }

    // Simulate API call
    // setTimeout(() => {
    // }, 500);
  };

  // Handle image upload (mock implementation)
  // const handleImageUpload = () => {
  //   setUploading(true);
  //   // Simulate upload delay
  //   setTimeout(() => {
  //     // Add a placeholder image (in a real app, this would be the uploaded image)
  //     const randomId = Math.floor(Math.random() * 90) + 10;
  //     const newImage = `blob:https://web.whatsapp.com/210c6cc3-c658-4712-ab73-78c231fccc29`;
  //     setImages([...images, newImage]);
  //     setUploading(false);
  //   }, 1000);
  // };

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const imageURL = URL.createObjectURL(file);

    setTimeout(() => {
      setImages((prev) => [...prev, imageURL]);
      setUploading(false);
    }, 1000);
  };

  // Remove image from the list
  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  useEffect(() => {
    fetchGuides();
  }, [fetchGuides]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Destinasi</FormLabel>
                <FormControl>
                  <Input placeholder="Masukkan nama destinasi" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lokasi</FormLabel>
                <FormControl>
                  <Input placeholder="Kota, Provinsi" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kategori</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih kategori" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Alam">Wisata Alam</SelectItem>
                    <SelectItem value="Budaya">Wisata Budaya</SelectItem>
                    <SelectItem value="Pantai">Pantai</SelectItem>
                    <SelectItem value="Gunung">Pegunungan</SelectItem>
                    <SelectItem value="Sejarah">Sejarah</SelectItem>
                    <SelectItem value="Kuliner">Kuliner</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="guide_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pemandu</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih pemandu" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {guides.map((guide) => (
                      <SelectItem key={guide._id} value={guide._id}>
                        {guide.name}
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
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Harga Tiket (Rp)</FormLabel>
                <FormControl>
                  <Input type="number" min="0" placeholder="25000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="maxVisitors"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rating</FormLabel>
                <FormControl>
                  <Input type="number" min="1" placeholder="100" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="col-span-full">
                <FormLabel>Deskripsi</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tuliskan deskripsi lengkap tentang destinasi ini"
                    className="min-h-32"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormLabel className="block mb-2">Foto Destinasi</FormLabel>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative rounded-md overflow-hidden h-32"
            >
              <img
                src={image}
                alt={`Destination ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 bg-black bg-opacity-50 text-white p-1 rounded-full hover:bg-opacity-70"
              >
                <X size={14} />
              </button>
            </div>
          ))}

          {/* Upload via tombol */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleImageUpload}
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="border-2 border-dashed border-gray-300 flex flex-col items-center justify-center h-32 rounded-md hover:border-gray-400 transition-colors"
          >
            <Upload size={24} className="mb-2 text-gray-500" />
            <span className="text-sm text-gray-500">
              {uploading ? "Mengunggah..." : "Tambahkan Foto"}
            </span>
          </button>
        </div>

        {/* Input manual link gambar */}
        <div className="flex items-center gap-2 mb-2">
          <input
            type="text"
            value={manualImage}
            onChange={(e) => setManualImage(e.target.value)}
            placeholder="Tempelkan link gambar manual..."
            className="flex-1 border rounded-md px-3 py-2 text-sm"
          />
          <button
            type="button"
            onClick={() => {
              if (manualImage.trim()) {
                setImages((prev) => [...prev, manualImage.trim()]);
                setManualImage("");
              }
            }}
            className="px-3 py-2 text-sm rounded-md bg-primary text-white hover:bg-primary/90"
          >
            Tambahkan
          </button>
        </div>

        {images.length === 0 && (
          <p className="text-sm text-destructive">
            Minimal satu foto harus diunggah
          </p>
        )}
        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/manager-dashboard")}
          >
            Batalkan
          </Button>
          <Button type="submit">
            {isEditMode ? "Simpan Perubahan" : "Tambahkan Destinasi"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default DestinationForm;
