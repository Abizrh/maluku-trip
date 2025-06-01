import { useEffect, useState } from "react";
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
  Heart,
  MessageCircle,
  Settings,
  Star,
  User,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DestinationCard } from "@/components/DestinationCard";
import { useWisatawanStore } from "@/stores/wisatawanStore";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { fetchMyBooking, trips } = useWisatawanStore();
  // Mock user data - In a real app, this would come from authentication state
  const user = {
    name: "Ahmad Farhan",
    email: "ahmad.farhan@gmail.com",
    type: "wisatawan", // wisatawan, pemandu, pengelola
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    joinDate: "Jan 2023",
    trips: 8,
    savedDestinations: 12,
    reviews: 5,
  };

  useEffect(() => {
    fetchMyBooking();
  }, [fetchMyBooking]);

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
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-semibold">{user.name}</h2>
                  <Badge variant="outline" className="mt-2">
                    {user.type === "wisatawan"
                      ? "Wisatawan"
                      : user.type === "pemandu"
                        ? "Pemandu Lokal"
                        : "Pengelola Wisata"}
                  </Badge>
                  <p className="text-sm text-gray-500 mt-1">
                    Bergabung {user.joinDate}
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
                    <span>Perjalanan Saya</span>
                  </a>
                  <a
                    href="#"
                    className="flex items-center py-2 px-3 rounded-lg hover:bg-gray-100"
                  >
                    <Heart size={18} className="mr-3 text-jelajah-blue" />
                    <span>Wishlist</span>
                  </a>
                  <a
                    href="#"
                    className="flex items-center py-2 px-3 rounded-lg hover:bg-gray-100"
                  >
                    <MessageCircle
                      size={18}
                      className="mr-3 text-jelajah-blue"
                    />
                    <span>Pesan</span>
                  </a>
                  <a
                    href="#"
                    className="flex items-center py-2 px-3 rounded-lg hover:bg-gray-100"
                  >
                    <CreditCard size={18} className="mr-3 text-jelajah-blue" />
                    <span>Pembayaran</span>
                  </a>
                  <a
                    href="#"
                    className="flex items-center py-2 px-3 rounded-lg hover:bg-gray-100"
                  >
                    <Settings size={18} className="mr-3 text-jelajah-blue" />
                    <span>Pengaturan</span>
                  </a>
                </div>
              </div>

              <div className="bg-jelajah-blue/10 rounded-lg p-6">
                <h3 className="font-semibold mb-2">Tingkatkan Akun</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Daftar sebagai Pemandu Lokal dan bagikan pengalaman Anda
                </p>
                <Button size="sm" className="w-full">
                  Upgrade sekarang
                </Button>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              <Tabs defaultValue="overview">
                <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                  <TabsList className="grid grid-cols-3">
                    <TabsTrigger value="overview">Ringkasan</TabsTrigger>
                    <TabsTrigger value="trips">Perjalanan</TabsTrigger>
                    <TabsTrigger value="saved">Wishlist</TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="overview">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium text-gray-500">
                          Perjalanan
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="text-2xl font-bold">{user.trips}</div>
                        <p className="text-xs text-gray-500">
                          {user.trips > 0
                            ? "Terakhir: 2 minggu lalu"
                            : "Belum ada perjalanan"}
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium text-gray-500">
                          Wishlist
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="text-2xl font-bold">
                          {user.savedDestinations}
                        </div>
                        <p className="text-xs text-gray-500">
                          Destinasi tersimpan
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium text-gray-500">
                          Ulasan
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="text-2xl font-bold">{user.reviews}</div>
                        <p className="text-xs text-gray-500">
                          Ulasan diberikan
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  <h2 className="text-xl font-semibold mb-4">
                    Perjalanan Mendatang
                  </h2>

                  {trips.length > 0 ? (
                    <div className="space-y-4">
                      {trips.map((trip, index) => (
                        <Card key={index}>
                          <CardContent className="p-0">
                            <div className="flex flex-col md:flex-row">
                              <div className="md:w-1/4">
                                <img
                                  src={trip?.destinasi?.image}
                                  alt={trip?.destinasi?.name}
                                  className="w-full h-40 md:h-full object-cover"
                                />
                              </div>
                              <div className="p-4 md:p-6 flex-1">
                                <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                                  <div>
                                    <Badge className="mb-2">
                                      {trip.status}
                                    </Badge>
                                    <h3 className="font-semibold text-lg mb-1">
                                      {trip?.destinasi?.name}
                                    </h3>
                                    <div className="flex items-center text-gray-500 mb-4">
                                      <Calendar size={14} className="mr-1" />
                                      <span className="text-sm">
                                        {trip?.createdAt}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="mt-2 md:mt-0">
                                    <div className="text-sm text-gray-500">
                                      Total
                                    </div>
                                    <div className="font-bold text-lg">
                                      Rp {trip?.totalPrice?.toLocaleString()}
                                    </div>
                                  </div>
                                </div>

                                <div className="flex flex-col md:flex-row md:justify-between md:items-center mt-4">
                                  <div className="flex items-center mb-3 md:mb-0">
                                    <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                                      <img
                                        src={
                                          "https://randomuser.me/api/portraits/men/85.jpg"
                                        }
                                        className="w-full h-full object-cover"
                                      />
                                    </div>
                                    <div>
                                      <div className="text-xs text-gray-500">
                                        Pemandu
                                      </div>
                                      <div className="text-sm font-medium">
                                        ari
                                      </div>
                                    </div>
                                  </div>

                                  <div className="flex space-x-2">
                                    <Link
                                      to={`/booking/${trip._id}?status=${trip.status}`}
                                    >
                                      <Button size="sm" variant="outline">
                                        Detail
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
                  ) : (
                    <div className="text-center py-12">
                      <Calendar
                        size={48}
                        className="mx-auto text-gray-300 mb-4"
                      />
                      <h3 className="text-lg font-medium mb-2">
                        Belum Ada Perjalanan
                      </h3>
                      <p className="text-gray-500 mb-6">
                        Anda belum memiliki perjalanan mendatang
                      </p>
                      <Button>Jelajahi Destinasi</Button>
                    </div>
                  )}

                  <h2 className="text-xl font-semibold mb-4">
                    Rekomendasi Untuk Anda
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {recommendedDestinations.map((destinasi) => (
                      <DestinationCard
                        key={destinasi.id}
                        id={destinasi.id}
                        name={destinasi.name}
                        location={destinasi.location}
                        image={destinasi.image}
                        rating={destinasi.rating}
                        price={destinasi.price}
                        category={destinasi.category}
                      />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="trips">
                  <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <Tabs defaultValue="upcoming">
                      <TabsList className="mb-6">
                        <TabsTrigger value="pending">Menunggu</TabsTrigger>
                        <TabsTrigger value="confirmed">
                          Terkonfirmasi
                        </TabsTrigger>
                        <TabsTrigger value="completed">Selesai</TabsTrigger>
                        <TabsTrigger value="canceled">Dibatalkan</TabsTrigger>
                      </TabsList>
                      <TabsContent value="pending">
                        {trips.length > 0 ? (
                          <div className="space-y-4">
                            {trips
                              ?.filter((b) => b.status === "pending")
                              ?.map((trip, index) => (
                                <Card key={index}>
                                  <CardContent className="p-0">
                                    <div className="flex flex-col md:flex-row">
                                      <div className="md:w-1/4">
                                        <img
                                          src={trip?.destinasi?.image}
                                          alt={trip?.destinasi?.name}
                                          className="w-full h-40 md:h-full object-cover"
                                        />
                                      </div>
                                      <div className="p-4 md:p-6 flex-1">
                                        <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                                          <div>
                                            <Badge className="mb-2">
                                              {trip.status}
                                            </Badge>
                                            <h3 className="font-semibold text-lg mb-1">
                                              {trip?.destinasi?.name}
                                            </h3>
                                            <div className="flex items-center text-gray-500 mb-4">
                                              <Calendar
                                                size={14}
                                                className="mr-1"
                                              />
                                              <span className="text-sm">
                                                {trip?.createdAt}
                                              </span>
                                            </div>
                                          </div>
                                          <div className="mt-2 md:mt-0">
                                            <div className="text-sm text-gray-500">
                                              Total
                                            </div>
                                            <div className="font-bold text-lg">
                                              Rp{" "}
                                              {trip?.totalPrice?.toLocaleString()}
                                            </div>
                                          </div>
                                        </div>

                                        <div className="flex flex-col md:flex-row md:justify-between md:items-center mt-4">
                                          <div className="flex items-center mb-3 md:mb-0">
                                            <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                                              <img
                                                src={
                                                  "https://randomuser.me/api/portraits/men/85.jpg"
                                                }
                                                className="w-full h-full object-cover"
                                              />
                                            </div>
                                            <div>
                                              <div className="text-xs text-gray-500">
                                                Pemandu
                                              </div>
                                              <div className="text-sm font-medium">
                                                ari
                                              </div>
                                            </div>
                                          </div>

                                          <div className="flex space-x-2">
                                            <Link
                                              to={`/booking/${trip._id}?status=pending`}
                                            >
                                              <Button
                                                size="sm"
                                                variant="outline"
                                              >
                                                Detail
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
                        ) : (
                          <div className="text-center py-12">
                            <Calendar
                              size={48}
                              className="mx-auto text-gray-300 mb-4"
                            />
                            <h3 className="text-lg font-medium mb-2">
                              Belum Ada Perjalanan
                            </h3>
                            <p className="text-gray-500 mb-6">
                              Anda belum memiliki perjalanan mendatang
                            </p>
                            <Button>Jelajahi Destinasi</Button>
                          </div>
                        )}
                      </TabsContent>
                      <TabsContent value="confirmed">
                        {trips.length > 0 ? (
                          <div className="space-y-4">
                            {trips
                              ?.filter((b) => b.status === "confirmed")
                              ?.map((trip, index) => (
                                <Card key={index}>
                                  <CardContent className="p-0">
                                    <div className="flex flex-col md:flex-row">
                                      <div className="md:w-1/4">
                                        <img
                                          src={trip?.destinasi?.image}
                                          alt={trip?.destinasi?.name}
                                          className="w-full h-40 md:h-full object-cover"
                                        />
                                      </div>
                                      <div className="p-4 md:p-6 flex-1">
                                        <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                                          <div>
                                            <Badge className="mb-2">
                                              {trip.status}
                                            </Badge>
                                            <Badge className="mb-2">
                                              {trip.paymentStatus}
                                            </Badge>
                                            <h3 className="font-semibold text-lg mb-1">
                                              {trip?.destinasi?.name}
                                            </h3>
                                            <div className="flex items-center text-gray-500 mb-4">
                                              <Calendar
                                                size={14}
                                                className="mr-1"
                                              />
                                              <span className="text-sm">
                                                {trip?.createdAt}
                                              </span>
                                            </div>
                                          </div>
                                          <div className="mt-2 md:mt-0">
                                            <div className="text-sm text-gray-500">
                                              Total
                                            </div>
                                            <div className="font-bold text-lg">
                                              Rp{" "}
                                              {trip?.totalPrice?.toLocaleString()}
                                            </div>
                                          </div>
                                        </div>

                                        <div className="flex flex-col md:flex-row md:justify-between md:items-center mt-4">
                                          <div className="flex items-center mb-3 md:mb-0">
                                            <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                                              <img
                                                src={
                                                  "https://randomuser.me/api/portraits/men/85.jpg"
                                                }
                                                className="w-full h-full object-cover"
                                              />
                                            </div>
                                            <div>
                                              <div className="text-xs text-gray-500">
                                                Pemandu
                                              </div>
                                              <div className="text-sm font-medium">
                                                ari
                                              </div>
                                            </div>
                                          </div>

                                          <div className="flex space-x-2">
                                            <Link
                                              to={`/booking/${trip._id}?status=confirmed`}
                                            >
                                              <Button
                                                size="sm"
                                                variant="outline"
                                              >
                                                Detail
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
                        ) : (
                          <div className="text-center py-12">
                            <Calendar
                              size={48}
                              className="mx-auto text-gray-300 mb-4"
                            />
                            <h3 className="text-lg font-medium mb-2">
                              Belum Ada Perjalanan
                            </h3>
                            <p className="text-gray-500 mb-6">
                              Anda belum memiliki perjalanan mendatang
                            </p>
                            <Button>Jelajahi Destinasi</Button>
                          </div>
                        )}
                      </TabsContent>
                      <TabsContent value="completed">
                        {trips.length > 0 ? (
                          <div className="space-y-4">
                            {trips
                              ?.filter((b) => b.status === "completed")
                              ?.map((trip, index) => (
                                <Card key={index}>
                                  <CardContent className="p-0">
                                    <div className="flex flex-col md:flex-row">
                                      <div className="md:w-1/4">
                                        <img
                                          src={trip?.destinasi?.image}
                                          alt={trip?.destinasi?.name}
                                          className="w-full h-40 md:h-full object-cover"
                                        />
                                      </div>
                                      <div className="p-4 md:p-6 flex-1">
                                        <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                                          <div>
                                            <Badge className="mb-2">
                                              {trip.status}
                                            </Badge>
                                            <h3 className="font-semibold text-lg mb-1">
                                              {trip?.destinasi?.name}
                                            </h3>
                                            <div className="flex items-center text-gray-500 mb-4">
                                              <Calendar
                                                size={14}
                                                className="mr-1"
                                              />
                                              <span className="text-sm">
                                                {trip?.createdAt}
                                              </span>
                                            </div>
                                          </div>
                                          <div className="mt-2 md:mt-0">
                                            <div className="text-sm text-gray-500">
                                              Total
                                            </div>
                                            <div className="font-bold text-lg">
                                              Rp{" "}
                                              {trip?.totalPrice?.toLocaleString()}
                                            </div>
                                          </div>
                                        </div>

                                        <div className="flex flex-col md:flex-row md:justify-between md:items-center mt-4">
                                          <div className="flex items-center mb-3 md:mb-0">
                                            <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                                              <img
                                                src={
                                                  "https://randomuser.me/api/portraits/men/85.jpg"
                                                }
                                                className="w-full h-full object-cover"
                                              />
                                            </div>
                                            <div>
                                              <div className="text-xs text-gray-500">
                                                Pemandu
                                              </div>
                                              <div className="text-sm font-medium">
                                                ari
                                              </div>
                                            </div>
                                          </div>

                                          <div className="flex space-x-2">
                                            <Link
                                              to={`/booking/${trip._id}?status=completed`}
                                            >
                                              <Button
                                                size="sm"
                                                variant="outline"
                                              >
                                                Detail
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
                        ) : (
                          <div className="text-center py-12">
                            <Calendar
                              size={48}
                              className="mx-auto text-gray-300 mb-4"
                            />
                            <h3 className="text-lg font-medium mb-2">
                              Belum Ada Perjalanan
                            </h3>
                            <p className="text-gray-500 mb-6">
                              Anda belum memiliki perjalanan mendatang
                            </p>
                            <Button>Jelajahi Destinasi</Button>
                          </div>
                        )}
                      </TabsContent>
                      <TabsContent value="canceled">
                        {trips.length > 0 ? (
                          <div className="space-y-4">
                            {trips
                              ?.filter((b) => b.status === "cancelled")
                              ?.map((trip, index) => (
                                <Card key={index}>
                                  <CardContent className="p-0">
                                    <div className="flex flex-col md:flex-row">
                                      <div className="md:w-1/4">
                                        <img
                                          src={trip?.destinasi?.image}
                                          alt={trip?.destinasi?.name}
                                          className="w-full h-40 md:h-full object-cover"
                                        />
                                      </div>
                                      <div className="p-4 md:p-6 flex-1">
                                        <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                                          <div>
                                            <Badge className="mb-2">
                                              {trip.status}
                                            </Badge>
                                            <h3 className="font-semibold text-lg mb-1">
                                              {trip?.destinasi?.name}
                                            </h3>
                                            <div className="flex items-center text-gray-500 mb-4">
                                              <Calendar
                                                size={14}
                                                className="mr-1"
                                              />
                                              <span className="text-sm">
                                                {trip?.createdAt}
                                              </span>
                                            </div>
                                          </div>
                                          <div className="mt-2 md:mt-0">
                                            <div className="text-sm text-gray-500">
                                              Total
                                            </div>
                                            <div className="font-bold text-lg">
                                              Rp{" "}
                                              {trip?.totalPrice?.toLocaleString()}
                                            </div>
                                          </div>
                                        </div>

                                        <div className="flex flex-col md:flex-row md:justify-between md:items-center mt-4">
                                          <div className="flex items-center mb-3 md:mb-0">
                                            <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                                              <img
                                                src={
                                                  "https://randomuser.me/api/portraits/men/85.jpg"
                                                }
                                                className="w-full h-full object-cover"
                                              />
                                            </div>
                                            <div>
                                              <div className="text-xs text-gray-500">
                                                Pemandu
                                              </div>
                                              <div className="text-sm font-medium">
                                                ari
                                              </div>
                                            </div>
                                          </div>

                                          <div className="flex space-x-2">
                                            <Link
                                              to={`/booking/${trip._id}?status=cancelled`}
                                            >
                                              <Button
                                                size="sm"
                                                variant="outline"
                                              >
                                                Detail
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
                        ) : (
                          <div className="text-center py-12">
                            <Calendar
                              size={48}
                              className="mx-auto text-gray-300 mb-4"
                            />
                            <h3 className="text-lg font-medium mb-2">
                              Belum Ada Perjalanan
                            </h3>
                            <p className="text-gray-500 mb-6">
                              Anda belum memiliki perjalanan mendatang
                            </p>
                            <Button>Jelajahi Destinasi</Button>
                          </div>
                        )}
                      </TabsContent>
                    </Tabs>
                  </div>
                </TabsContent>

                <TabsContent value="saved">
                  <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4">
                      Destinasi Tersimpan
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {savedDestinations.map((destinasi) => (
                        <DestinationCard
                          key={destinasi.id}
                          id={destinasi.id}
                          name={destinasi.name}
                          location={destinasi.location}
                          image={destinasi.image}
                          rating={destinasi.rating}
                          price={destinasi.price}
                          category={destinasi.category}
                        />
                      ))}
                    </div>
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
const upcomingTrips = [
  {
    id: "trip-001",
    destinasi: "Pantai Kuta, Bali",
    date: "21-23 Jun 2023",
    status: "Terkonfirmasi",
    price: 1500000,
    guide: "Wayan Surya",
    guideImage: "https://randomuser.me/api/portraits/men/85.jpg",
    image:
      "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGt1dGElMjBiZWFjaHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
  },
];

const recommendedDestinations = [
  {
    id: "bali-002",
    name: "Pura Uluwatu",
    location: "Bali",
    image:
      "https://images.unsplash.com/photo-1518002054494-3a6f94352e0d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dWx1d2F0dXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
    rating: 4.7,
    price: 350000,
    category: "Budaya",
  },
  {
    id: "prambanan-001",
    name: "Candi Prambanan",
    location: "Yogyakarta",
    image:
      "https://images.unsplash.com/photo-1594385880555-010f4cbc147d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJhbWJhbmFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    rating: 4.8,
    price: 320000,
    category: "Sejarah",
  },
  {
    id: "toba-001",
    name: "Danau Toba",
    location: "Sumatera Utara",
    image:
      "https://images.unsplash.com/photo-1595140792979-e7ae0bad7455?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFrZSUyMHRvYmF8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
    rating: 4.9,
    price: 900000,
    category: "Alam",
  },
];

const savedDestinations = [
  {
    id: "raja-001",
    name: "Pulau Wayag",
    location: "Raja Ampat",
    image:
      "https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmFqYSUyMGFtcGF0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    rating: 4.7,
    price: 1500000,
    category: "Alam",
  },
  {
    id: "bajo-001",
    name: "Taman Nasional Komodo",
    location: "Labuan Bajo",
    image:
      "https://images.unsplash.com/photo-1516748088067-ed3a29cccd39?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8a29tb2RvfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    rating: 4.8,
    price: 1200000,
    category: "Petualangan",
  },
  {
    id: "bromo-001",
    name: "Gunung Bromo",
    location: "Jawa Timur",
    image:
      "https://images.unsplash.com/photo-1589100534833-4947a5a9766c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YnJvbW8lMjBtb3VudGFpbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
    rating: 4.8,
    price: 450000,
    category: "Gunung",
  },
];

export default Dashboard;
