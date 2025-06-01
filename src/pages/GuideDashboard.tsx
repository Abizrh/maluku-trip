import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Calendar,
  Clock,
  CreditCard,
  MessageCircle,
  Settings,
  Star,
  User,
  Users,
  MapPin,
  PlusCircle,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { usePemanduStore } from "@/stores/pemanduStore";

const GuideDashboard = () => {
  // Mock guide data
  const guide = {
    name: "Wayan Surya",
    email: "wayan.surya@gmail.com",
    type: "pemandu", // wisatawan, pemandu, pengelola
    avatar: "https://randomuser.me/api/portraits/men/85.jpg",
    joinDate: "Jan 2022",
    tours: 32,
    activeBookings: 3,
    rating: 4.8,
    completionRate: 98,
    specialties: ["Wisata Budaya", "Wisata Sejarah", "Fotografi"],
    location: "Bali",
    verified: true,
  };

  const { fetchOrderGuides, updateOrderGuide, orderGuides } = usePemanduStore();

  useEffect(() => {
    fetchOrderGuides();
  }, [fetchOrderGuides]);

  const handleEvent = async (id, event: "cancelled" | "confirmed") => {
    const resp = await updateOrderGuide(id, event);

    fetchOrderGuides();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar */}
            <div className="md:w-1/4 lg:w-1/5">
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <div className="flex flex-col items-center text-center mb-6">
                  <Avatar className="h-20 w-20 mb-3">
                    <AvatarImage src={guide.avatar} alt={guide.name} />
                    <AvatarFallback>{guide.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-semibold">{guide.name}</h2>
                  <div className="flex items-center mt-1 mb-1">
                    <Badge
                      variant="outline"
                      className="bg-jelajah-blue/10 text-jelajah-blue mr-2"
                    >
                      Pemandu Lokal
                    </Badge>
                    {guide.verified && (
                      <Badge
                        variant="outline"
                        className="bg-jelajah-green/10 text-jelajah-green"
                      >
                        Terverifikasi
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center text-amber-500 mt-1">
                    <Star size={16} fill="currentColor" className="mr-1" />
                    <span className="font-medium">{guide.rating}</span>
                    <span className="text-gray-500 text-sm ml-1">
                      ({guide.tours} tur)
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Bergabung {guide.joinDate}
                  </p>
                </div>

                <div className="space-y-2">
                  <a
                    href="#"
                    className="flex items-center py-2 px-3 rounded-lg hover:bg-gray-100"
                  >
                    <User size={18} className="mr-3 text-jelajah-blue" />
                    <span>Profil</span>
                  </a>
                  <a
                    href="#"
                    className="flex items-center py-2 px-3 rounded-lg hover:bg-gray-100"
                  >
                    <BookOpen size={18} className="mr-3 text-jelajah-blue" />
                    <span>Tur Saya</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              <Tabs defaultValue="bookings">
                <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                  <TabsList className="grid grid-cols-3">
                    <TabsTrigger value="bookings">Pemesanan</TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="bookings">
                  <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-6">
                      Pemesanan Masuk
                    </h2>

                    <Tabs defaultValue="pending">
                      <TabsList className="mb-6">
                        <TabsTrigger value="pending">Menunggu</TabsTrigger>
                        <TabsTrigger value="confirmed">
                          Terkonfirmasi
                        </TabsTrigger>
                        <TabsTrigger value="completed">Selesai</TabsTrigger>
                        <TabsTrigger value="canceled">Dibatalkan</TabsTrigger>
                      </TabsList>

                      <TabsContent value="pending">
                        <div className="space-y-4">
                          {orderGuides
                            ?.filter((b) => b.status === "pending")
                            .map((booking, index) => (
                              <Card key={index}>
                                <CardContent className="p-6">
                                  <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                                    <div className="mb-4 md:mb-0">
                                      <div className="flex items-center mb-2">
                                        <Avatar className="h-10 w-10 mr-3">
                                          <AvatarImage
                                            src={booking?.destination?.image}
                                          />
                                          <AvatarFallback>
                                            {booking?.traveler?.name.charAt(0)}
                                          </AvatarFallback>
                                        </Avatar>
                                        <div>
                                          <div className="font-medium">
                                            {booking?.traveler?.name}
                                          </div>
                                          <div className="text-sm text-gray-500">
                                            {booking?.traveler?.email}
                                          </div>
                                        </div>
                                      </div>

                                      <h3 className="font-semibold mt-4">
                                        {booking?.destination?.name}
                                      </h3>
                                      <div className="flex items-center text-gray-500 mt-1">
                                        <Calendar size={14} className="mr-1" />
                                        <span className="text-sm">
                                          {booking?.createdAt}
                                        </span>
                                      </div>
                                    </div>

                                    <div className="md:text-right">
                                      <div className="text-sm text-gray-500">
                                        Total
                                      </div>
                                      <div className="font-bold text-lg mb-4">
                                        Rp{" "}
                                        {booking?.booking?.totalPrice?.toLocaleString()}
                                      </div>

                                      <div className="flex space-x-2 md:justify-end">
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          onClick={() =>
                                            handleEvent(
                                              booking?._id,
                                              "cancelled",
                                            )
                                          }
                                        >
                                          Tolak
                                        </Button>
                                        <Button
                                          size="sm"
                                          onClick={() =>
                                            handleEvent(
                                              booking?._id,
                                              "confirmed",
                                            )
                                          }
                                        >
                                          Konfirmasi
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                        </div>
                      </TabsContent>

                      <TabsContent value="confirmed">
                        <div className="space-y-4">
                          {orderGuides
                            .filter((b) => b.status === "confirmed")
                            .map((booking, index) => (
                              <Card key={index}>
                                <CardContent className="p-6">
                                  <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                                    <div className="mb-4 md:mb-0">
                                      <div className="flex items-center mb-2">
                                        <Avatar className="h-10 w-10 mr-3">
                                          <AvatarImage
                                            src={booking?.destination?.image}
                                          />
                                          <AvatarFallback>
                                            {booking?.traveler?.name.charAt(0)}
                                          </AvatarFallback>
                                        </Avatar>
                                        <div>
                                          <div className="font-medium">
                                            {booking?.traveler?.name}
                                          </div>
                                          <div className="text-sm text-gray-500">
                                            {booking?.traveler?.email}
                                          </div>
                                        </div>
                                      </div>

                                      <h3 className="font-semibold mt-4">
                                        {booking?.destination?.name}
                                      </h3>
                                      <div className="flex items-center text-gray-500 mt-1">
                                        <Calendar size={14} className="mr-1" />
                                        <span className="text-sm">
                                          {booking?.createdAt}
                                        </span>
                                      </div>
                                    </div>

                                    <div className="md:text-right">
                                      <div className="text-sm text-gray-500">
                                        Total
                                      </div>
                                      <div className="font-bold text-lg mb-4">
                                        Rp{" "}
                                        {booking?.booking?.totalPrice?.toLocaleString()}
                                      </div>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                        </div>
                      </TabsContent>

                      <TabsContent value="completed">
                        <div className="text-center text-gray-500 py-8">
                          Tidak ada pemesanan selesai untuk ditampilkan
                        </div>
                      </TabsContent>

                      <TabsContent value="canceled">
                        <div className="text-center text-gray-500 py-8">
                          Tidak ada pemesanan dibatalkan untuk ditampilkan
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

// Mock data
const bookings = [
  {
    id: "booking-001",
    touristName: "Ahmad Farhan",
    touristImage: "https://randomuser.me/api/portraits/men/32.jpg",
    email: "ahmad.farhan@gmail.com",
    tourName: "Tur Pura Tanah Lot & Sunset",
    date: "21 Jun 2023",
    status: "Baru",
    people: 2,
    total: 600000,
  },
  {
    id: "booking-002",
    touristName: "Siti Rahma",
    touristImage: "https://randomuser.me/api/portraits/women/44.jpg",
    email: "siti.rahma@gmail.com",
    tourName: "Tur Budaya Ubud",
    date: "23 Jun 2023",
    status: "Terkonfirmasi",
    people: 3,
    total: 900000,
  },
  {
    id: "booking-003",
    touristName: "Budi Santoso",
    touristImage: "https://randomuser.me/api/portraits/men/67.jpg",
    email: "budi.santoso@gmail.com",
    tourName: "Tur Pantai Kuta & Seminyak",
    date: "25 Jun 2023",
    status: "Menunggu Pembayaran",
    people: 2,
    total: 500000,
  },
];

const reviews = [
  {
    id: "review-001",
    touristName: "Ahmad Farhan",
    touristImage: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
    comment:
      "Pemandu yang sangat berpengalaman dan menjelaskan sejarah dengan menarik!",
    tourName: "Tur Pura Besakih",
    date: "15 Mei 2023",
  },
  {
    id: "review-002",
    touristName: "Siti Rahma",
    touristImage: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
    comment: "Pengalaman terbaik di Bali, terimakasih Pak Wayan!",
    tourName: "Tur Pura Tanah Lot & Sunset",
    date: "28 Apr 2023",
  },
  {
    id: "review-003",
    touristName: "Budi Santoso",
    touristImage: "https://randomuser.me/api/portraits/men/67.jpg",
    rating: 4,
    comment: "Sangat informatif dan ramah, tapi jadwalnya agak molor.",
    tourName: "Tur Budaya Ubud",
    date: "10 Apr 2023",
  },
];

const tours = [
  {
    id: "tour-001",
    name: "Tur Pura Tanah Lot & Sunset",
    category: "Budaya",
    location: "Tabanan, Bali",
    image:
      "https://images.unsplash.com/photo-1604999286549-9775ca576cd3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dGFuYWglMjBsb3R8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
    price: 300000,
    rating: 4.9,
    reviewCount: 124,
    status: "Aktif",
    availableDates: "Setiap hari",
    duration: "5 jam",
  },
  {
    id: "tour-002",
    name: "Tur Budaya Ubud",
    category: "Budaya",
    location: "Ubud, Bali",
    image:
      "https://images.unsplash.com/photo-1555400038-63f5ba517a47?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dWJ1ZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
    price: 350000,
    rating: 4.8,
    reviewCount: 98,
    status: "Aktif",
    availableDates: "Sen, Rab, Jum",
    duration: "7 jam",
  },
  {
    id: "tour-003",
    name: "Tur Pantai Kuta & Seminyak",
    category: "Pantai",
    location: "Kuta, Bali",
    image:
      "https://images.unsplash.com/photo-1588867702719-08eae92adc33?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8a3V0YSUyMGJlYWNofGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    price: 250000,
    rating: 4.7,
    reviewCount: 86,
    status: "Aktif",
    availableDates: "Setiap hari",
    duration: "6 jam",
  },
];

export default GuideDashboard;
