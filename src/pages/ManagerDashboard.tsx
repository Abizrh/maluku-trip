import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
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
  BarChart3,
  BookOpen,
  Building,
  Calendar,
  Clock,
  CreditCard,
  Edit,
  Eye,
  FileText,
  MessageCircle,
  PlusCircle,
  Settings,
  Star,
  User,
  Users,
  MapPin,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { usePengelolaStore } from "@/stores/pengelolaStore";
import { useUserStore } from "@/stores/userStore";

const ManagerDashboard = () => {
  const { fetchDestinations, destinations } = usePengelolaStore();
  const { profile, fetchProfile } = useUserStore();
  // Mock manager data
  const manager = {
    name: "Amin",
    email: "amdin@gmail.com",
    type: "pengelola",
    avatar: "https://randomuser.me/api/portraits/men/42.jpg",
    joinDate: "Mar 2022",
    destinations: 5,
    activeBookings: 28,
    totalEarnings: 45600000,
    verificationStatus: "Terverifikasi",
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const loadData = async () => {
      const userProfile = await fetchProfile();
      if (userProfile?.id) {
        await fetchDestinations({ manager_id: userProfile.id });
      } else {
        await fetchDestinations({});
      }
    };

    loadData();
  }, [fetchDestinations, fetchProfile]);

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
                    <AvatarImage src={manager.avatar} alt={manager.name} />
                    <AvatarFallback>{manager.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-semibold">{manager.name}</h2>
                  <div className="flex items-center mt-1 mb-1">
                    <Badge
                      variant="outline"
                      className="bg-jelajah-orange/10 text-jelajah-orange mr-2"
                    >
                      Pengelola Wisata
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-jelajah-green/10 text-jelajah-green"
                    >
                      {manager.verificationStatus}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Bergabung {manager.joinDate}
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
                  <Link
                    to="/destination/add"
                    className="flex items-center py-2 px-3 rounded-lg hover:bg-gray-100"
                  >
                    <Building size={18} className="mr-3 text-jelajah-blue" />
                    <span>Destinasi</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              <Tabs defaultValue="destinations">
                <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                  <TabsList className="grid grid-cols-4">
                    <TabsTrigger value="destinations">Destinasi</TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="overview">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium text-gray-500">
                          Destinasi Aktif
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="text-2xl font-bold">
                          {manager.destinations}
                        </div>
                        <p className="text-xs text-gray-500">
                          Total destinasi yang dikelola
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium text-gray-500">
                          Pemesanan
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="text-2xl font-bold">
                          {manager.activeBookings}
                        </div>
                        <p className="text-xs text-gray-500">
                          Total pemesanan bulan ini
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium text-gray-500">
                          Pendapatan
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="text-2xl font-bold">
                          Rp {manager.totalEarnings.toLocaleString()}
                        </div>
                        <p className="text-xs text-gray-500">
                          Total pendapatan bulan ini
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium text-gray-500">
                          Review
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex items-center">
                          <span className="text-2xl font-bold mr-2">4.8</span>
                          <div className="flex text-amber-500">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={16}
                                fill={i < 4 ? "currentColor" : "none"}
                                stroke={
                                  i === 4 ? "currentColor" : "currentColor"
                                }
                                strokeWidth={i === 4 ? 2 : 0}
                                className="mr-0.5"
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-xs text-gray-500">Dari 342 ulasan</p>
                      </CardContent>
                    </Card>
                  </div>

                  <h2 className="text-xl font-semibold mb-4">
                    Kinerja Destinasi
                  </h2>
                  <Card className="mb-8">
                    <CardContent className="p-6">
                      <div className="h-[240px] flex items-center justify-center">
                        <BarChart3 size={80} className="text-gray-300" />
                        <div className="ml-4 text-gray-500">
                          <h3 className="font-medium">
                            Data Grafik Kinerja Destinasi
                          </h3>
                          <p className="text-sm">
                            Menampilkan statistik pengunjung dan pendapatan per
                            destinasi
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <Card>
                      <CardHeader>
                        <CardTitle>Destinasi Teratas</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {topDestinations.map((destination, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                            >
                              <div className="flex items-center">
                                <div className="w-10 h-10 rounded-md overflow-hidden mr-3">
                                  <img
                                    src={destination.image}
                                    alt={destination.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div>
                                  <div className="font-medium">
                                    {destination.name}
                                  </div>
                                  <div className="flex items-center text-sm text-gray-500">
                                    <MapPin size={12} className="mr-1" />
                                    {destination.location}
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-semibold">
                                  {destination.visitCount}
                                </div>
                                <div className="text-xs text-gray-500">
                                  pengunjung
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full">
                          Lihat Semua
                        </Button>
                      </CardFooter>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Pemandu Terbaik</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {topGuides.map((guide, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                            >
                              <div className="flex items-center">
                                <Avatar className="h-10 w-10 mr-3">
                                  <AvatarImage
                                    src={guide.image}
                                    alt={guide.name}
                                  />
                                  <AvatarFallback>
                                    {guide.name.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium">
                                    {guide.name}
                                  </div>
                                  <div className="flex items-center text-sm">
                                    <Star
                                      size={12}
                                      className="text-amber-500 mr-1"
                                      fill="currentColor"
                                    />
                                    <span>{guide.rating}</span>
                                    <span className="text-gray-500 ml-1">
                                      ({guide.reviewCount})
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-semibold">
                                  {guide.tourCount}
                                </div>
                                <div className="text-xs text-gray-500">
                                  tur bulan ini
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full">
                          Lihat Semua
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="destinations">
                  <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-semibold">Destinasi Saya</h2>
                      <Link to="/destination/add">
                        <Button>
                          <PlusCircle size={16} className="mr-2" />
                          Tambah Destinasi
                        </Button>
                      </Link>
                    </div>

                    <div className="space-y-4">
                      {destinations.map((destination, index) => (
                        <Card key={index}>
                          <CardContent className="p-0">
                            <div className="flex flex-col md:flex-row">
                              <div className="md:w-1/4">
                                <img
                                  src={destination.image}
                                  alt={destination.name}
                                  className="w-full h-40 md:h-full object-cover"
                                />
                              </div>
                              <div className="p-4 md:p-6 flex-1">
                                <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                                  <div>
                                    <div className="flex items-center mb-2">
                                      <Badge
                                        className={`bg-green-100 text-green-800 mr-2`}
                                      >
                                        Aktif
                                      </Badge>
                                      <Badge variant="outline">
                                        {destination.category}
                                      </Badge>
                                    </div>
                                    <h3 className="font-semibold text-lg mb-1">
                                      {destination.name}
                                    </h3>
                                    <div className="flex items-center text-gray-500 mb-2">
                                      <MapPin size={14} className="mr-1" />
                                      <span className="text-sm">
                                        {destination.location}
                                      </span>
                                    </div>
                                    <div className="flex items-center text-amber-500">
                                      <Star
                                        size={16}
                                        fill="currentColor"
                                        className="mr-1"
                                      />
                                      <span className="text-sm font-medium">
                                        {destination.rating}
                                      </span>
                                      <span className="text-xs text-gray-500 ml-1">
                                        ({destination.reviewCount} ulasan)
                                      </span>
                                    </div>
                                  </div>

                                  <div className="mt-4 md:mt-0 text-right">
                                    <div className="text-sm text-gray-500">
                                      Harga Tiket
                                    </div>
                                    <div className="font-bold text-lg">
                                      Rp {destination.price.toLocaleString()}
                                    </div>
                                  </div>
                                </div>

                                <div className="border-t my-4"></div>

                                <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                                  <div className="mb-3 md:mb-0">
                                    <div className="text-sm text-gray-500">
                                      Pemandu: {destination.guideCount} orang
                                    </div>
                                    <div className="text-sm text-gray-500 mt-1">
                                      Pengunjung bulan ini:{" "}
                                      {destination.visitorCount}
                                    </div>
                                  </div>

                                  <div className="flex space-x-2">
                                    <Link
                                      to={`/destination/edit/${destination.id}`}
                                    >
                                      <Button size="sm" variant="outline">
                                        <Edit size={14} className="mr-1.5" />
                                        Edit
                                      </Button>
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="guides">
                  <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-semibold">Pemandu Lokal</h2>
                      <Link to="/guide/invite">
                        <Button>
                          <PlusCircle size={16} className="mr-2" />
                          Undang Pemandu Baru
                        </Button>
                      </Link>
                    </div>

                    <div className="space-y-4">
                      {managedGuides.map((guide, index) => (
                        <Card key={index}>
                          <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                              <div className="flex items-center mb-4 md:mb-0">
                                <Avatar className="h-14 w-14 mr-4">
                                  <AvatarImage
                                    src={guide.image}
                                    alt={guide.name}
                                  />
                                  <AvatarFallback>
                                    {guide.name.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <h3 className="font-semibold text-lg">
                                    {guide.name}
                                  </h3>
                                  <div className="flex items-center text-amber-500 mb-1">
                                    <Star
                                      size={16}
                                      fill="currentColor"
                                      className="mr-1"
                                    />
                                    <span className="text-sm font-medium">
                                      {guide.rating}
                                    </span>
                                    <span className="text-xs text-gray-500 ml-1">
                                      ({guide.reviewCount} ulasan)
                                    </span>
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {guide.specialties.join(", ")}
                                  </div>
                                </div>
                              </div>

                              <div className="flex flex-col items-end">
                                <Badge
                                  className={`mb-3 ${guide.status === "Aktif" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`}
                                >
                                  {guide.status}
                                </Badge>
                                <div className="text-sm text-gray-500 mb-4">
                                  {guide.tourCount} tur bulan ini •{" "}
                                  {guide.completedTours} total tur
                                </div>
                                <div className="flex space-x-2">
                                  <Link to={`/guide/${guide.id}`}>
                                    <Button size="sm" variant="outline">
                                      Lihat Profil
                                    </Button>
                                  </Link>
                                  <Button size="sm">Jadwalkan</Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="reports">
                  <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-6">
                      Laporan Keuangan
                    </h2>

                    <Tabs defaultValue="monthly">
                      <TabsList className="mb-6">
                        <TabsTrigger value="monthly">Bulanan</TabsTrigger>
                        <TabsTrigger value="quarterly">Kuartal</TabsTrigger>
                        <TabsTrigger value="annual">Tahunan</TabsTrigger>
                      </TabsList>

                      <TabsContent value="monthly">
                        <Card>
                          <CardContent className="p-6">
                            <div className="h-[240px] flex items-center justify-center mb-4">
                              <BarChart3 size={80} className="text-gray-300" />
                              <div className="ml-4 text-gray-500">
                                <h3 className="font-medium">
                                  Data Grafik Pendapatan Bulanan
                                </h3>
                                <p className="text-sm">
                                  Menampilkan pendapatan dan biaya per bulan
                                </p>
                              </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                              <div className="border rounded-lg p-4">
                                <div className="text-sm text-gray-500 mb-1">
                                  Pendapatan Kotor
                                </div>
                                <div className="text-xl font-bold">
                                  Rp 45.600.000
                                </div>
                              </div>
                              <div className="border rounded-lg p-4">
                                <div className="text-sm text-gray-500 mb-1">
                                  Biaya Operasional
                                </div>
                                <div className="text-xl font-bold">
                                  Rp 12.400.000
                                </div>
                              </div>
                              <div className="border rounded-lg p-4">
                                <div className="text-sm text-gray-500 mb-1">
                                  Pendapatan Bersih
                                </div>
                                <div className="text-xl font-bold text-jelajah-green">
                                  Rp 33.200.000
                                </div>
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter>
                            <Button variant="outline" className="w-full">
                              Unduh Laporan Lengkap
                            </Button>
                          </CardFooter>
                        </Card>
                      </TabsContent>

                      <TabsContent value="quarterly">
                        <Card>
                          <CardContent className="p-6 text-center py-12">
                            <div className="text-gray-500">
                              Data laporan kuartalan belum tersedia
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>

                      <TabsContent value="annual">
                        <Card>
                          <CardContent className="p-6 text-center py-12">
                            <div className="text-gray-500">
                              Data laporan tahunan belum tersedia
                            </div>
                          </CardContent>
                        </Card>
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
const topDestinations = [
  {
    name: "Pura Tanah Lot",
    location: "Tabanan, Bali",
    image:
      "https://images.unsplash.com/photo-1604999286549-9775ca576cd3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dGFuYWglMjBsb3R8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
    visitCount: 1240,
  },
  {
    name: "Tegallalang Rice Terraces",
    location: "Ubud, Bali",
    image:
      "https://images.unsplash.com/photo-1592364395653-83e648b20cc2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dGVnYWxsYWxhbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
    visitCount: 980,
  },
  {
    name: "Pantai Kuta",
    location: "Kuta, Bali",
    image:
      "https://images.unsplash.com/photo-1588867702719-08eae92adc33?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8a3V0YSUyMGJlYWNofGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    visitCount: 865,
  },
];

const topGuides = [
  {
    name: "Wayan Surya",
    rating: 4.9,
    reviewCount: 124,
    tourCount: 12,
    image: "https://randomuser.me/api/portraits/men/85.jpg",
  },
  {
    name: "Made Artha",
    rating: 4.8,
    reviewCount: 98,
    tourCount: 10,
    image: "https://randomuser.me/api/portraits/men/55.jpg",
  },
  {
    name: "Ketut Devi",
    rating: 4.7,
    reviewCount: 86,
    tourCount: 8,
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
];

const managedDestinations = [
  {
    id: "dest-001",
    name: "Pura Tanah Lot",
    category: "Budaya",
    location: "Tabanan, Bali",
    image:
      "https://images.unsplash.com/photo-1604999286549-9775ca576cd3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dGFuYWglMjBsb3R8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
    price: 50000,
    rating: 4.9,
    reviewCount: 532,
    status: "Aktif",
    guideCount: 8,
    visitorCount: 1240,
  },
  {
    id: "dest-002",
    name: "Tegallalang Rice Terraces",
    category: "Alam",
    location: "Ubud, Bali",
    image:
      "https://images.unsplash.com/photo-1592364395653-83e648b20cc2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dGVnYWxsYWxhbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
    price: 40000,
    rating: 4.8,
    reviewCount: 425,
    status: "Aktif",
    guideCount: 6,
    visitorCount: 980,
  },
  {
    id: "dest-003",
    name: "Pantai Kuta",
    category: "Pantai",
    location: "Kuta, Bali",
    image:
      "https://images.unsplash.com/photo-1588867702719-08eae92adc33?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8a3V0YSUyMGJlYWNofGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    price: 25000,
    rating: 4.7,
    reviewCount: 387,
    status: "Aktif",
    guideCount: 5,
    visitorCount: 865,
  },
  {
    id: "dest-004",
    name: "Monkey Forest Ubud",
    category: "Alam",
    location: "Ubud, Bali",
    image:
      "https://images.unsplash.com/photo-1578469550956-0e16b69c6a3d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bW9ua2V5JTIwZm9yZXN0JTIwdWJ1ZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
    price: 80000,
    rating: 4.6,
    reviewCount: 312,
    status: "Aktif",
    guideCount: 4,
    visitorCount: 720,
  },
];

const managedGuides = [
  {
    id: "guide-001",
    name: "Wayan Surya",
    specialties: ["Wisata Budaya", "Fotografi"],
    rating: 4.9,
    reviewCount: 124,
    tourCount: 12,
    status: "Aktif",
    completedTours: 138,
    image: "https://randomuser.me/api/portraits/men/85.jpg",
  },
  {
    id: "guide-002",
    name: "Made Artha",
    specialties: ["Wisata Alam", "Hiking"],
    rating: 4.8,
    reviewCount: 98,
    tourCount: 10,
    status: "Aktif",
    completedTours: 115,
    image: "https://randomuser.me/api/portraits/men/55.jpg",
  },
  {
    id: "guide-003",
    name: "Ketut Devi",
    specialties: ["Wisata Budaya", "Kuliner"],
    rating: 4.7,
    reviewCount: 86,
    tourCount: 8,
    status: "Aktif",
    completedTours: 97,
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    id: "guide-004",
    name: "Nyoman Putra",
    specialties: ["Diving", "Snorkeling"],
    rating: 4.8,
    reviewCount: 74,
    tourCount: 6,
    status: "Cuti",
    completedTours: 82,
    image: "https://randomuser.me/api/portraits/men/42.jpg",
  },
];

export default ManagerDashboard;
