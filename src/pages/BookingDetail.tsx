import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Clock,
  Heart,
  MapPin,
  MessageCircle,
  Share2,
  Star,
  User,
  Users,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { usePengelolaStore } from "@/stores/pengelolaStore";
import { useWisatawanStore } from "@/stores/wisatawanStore";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";

const BookingDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const {
    detailDestination: destination,
    isLoading,
    getDetailDestination,
  } = usePengelolaStore();
  const { bookTrip, detailTrip, getBookingDetail, updateBookingStatus } =
    useWisatawanStore();

  console.log("detail", id);
  useEffect(() => {
    if (id) {
      getBookingDetail(id);
    }
  }, [getBookingDetail, id]);

  useEffect(() => {
    if (detailTrip && detailTrip.destinasi?._id) {
      console.log("detailTrip", detailTrip);
      getDetailDestination(detailTrip.destinasi._id);
    }
  }, [detailTrip, getDetailDestination]);

  const bookingHandler = async () => {
    const resp = await updateBookingStatus(id, { status: "completed" });
    if (resp) {
      toast.success("Perjalanan berhasil dibatalkan");
      navigate("/dashboard");
    }
  };

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const query = useQuery();
  const status = query.get("status");
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">{isLoading && <p>Loading...</p>}</main>
      {!isLoading && (
        <main className="flex-grow">
          {/* Hero Image Gallery */}
          <div className="relative">
            <div className="h-[300px] md:h-[500px] overflow-hidden">
              <img
                src={destination?.image}
                alt={destination?.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute top-4 right-4 flex gap-2">
              <Button
                variant="secondary"
                size="icon"
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="rounded-full backdrop-blur-md"
              >
                <Heart
                  className={`h-5 w-5 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`}
                />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="rounded-full backdrop-blur-md"
              >
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Main Content */}
              <div className="lg:w-2/3">
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-jelajah-blue/10 text-jelajah-blue px-2 py-1 rounded-full text-xs font-medium">
                      {destination?.category}
                    </span>
                    <div className="flex items-center text-yellow-500">
                      <Star size={16} fill="currentColor" />
                      <span className="ml-1 text-sm font-medium">
                        {destination?.rating}
                      </span>
                      <span className="ml-1 text-sm text-gray-500">
                        ({destination?.reviewCount} ulasan)
                      </span>
                    </div>
                  </div>
                  <h1 className="text-3xl font-bold mb-2">
                    {destination?.name}
                  </h1>
                  <div className="flex items-center text-gray-500 mb-4">
                    <MapPin size={16} className="mr-1" />
                    <span>{destination?.location}</span>
                  </div>
                </div>

                <Tabs defaultValue="deskripsi">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="deskripsi">Deskripsi</TabsTrigger>
                    <TabsTrigger value="fasilitas">Fasilitas</TabsTrigger>
                    <TabsTrigger value="ulasan">Ulasan</TabsTrigger>
                    <TabsTrigger value="lokasi">Lokasi</TabsTrigger>
                  </TabsList>
                  <TabsContent value="deskripsi" className="mt-6">
                    <h3 className="text-xl font-semibold mb-4">
                      Tentang Destinasi
                    </h3>
                    <p className="text-gray-700 mb-4">
                      {destination?.description}
                    </p>
                    <div className="mt-6">
                      <h4 className="text-lg font-semibold mb-3">
                        Yang Termasuk
                      </h4>
                      <ul className="space-y-2">
                        {destination?.includes?.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <span className="mr-2 text-green-500">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </TabsContent>
                  <TabsContent value="fasilitas" className="mt-6">
                    <h3 className="text-xl font-semibold mb-4">Fasilitas</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {destination?.facilities?.map((facility, index) => (
                        <div key={index} className="flex items-center">
                          <div className="w-8 h-8 bg-jelajah-blue/10 rounded-full flex items-center justify-center mr-3">
                            <span className="text-jelajah-blue">✓</span>
                          </div>
                          <span>{facility}</span>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="ulasan" className="mt-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-semibold">
                        Ulasan Pengunjung
                      </h3>
                      <Button variant="outline">Tulis Ulasan</Button>
                    </div>
                    <div className="space-y-6">
                      {destination?.reviews?.map((review, index) => (
                        <div key={index} className="border-b pb-6">
                          <div className="flex items-center mb-3">
                            <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden mr-3">
                              <img
                                src={
                                  review.userImage ||
                                  "https://via.placeholder.com/40"
                                }
                                alt={review.userName}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <h4 className="font-medium">{review.userName}</h4>
                              <div className="flex items-center">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star
                                    key={i}
                                    size={14}
                                    className={`${i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                                  />
                                ))}
                                <span className="ml-2 text-sm text-gray-500">
                                  {review.date}
                                </span>
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-700">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="lokasi" className="mt-6">
                    <h3 className="text-xl font-semibold mb-4">Lokasi</h3>
                    <div className="bg-gray-100 rounded-lg h-[300px] flex items-center justify-center mb-4">
                      <MapPin size={40} className="text-gray-400" />
                      <span className="ml-2 text-gray-500">
                        Peta akan ditampilkan di sini
                      </span>
                    </div>
                    <h4 className="font-medium mb-2">Alamat</h4>
                    <p className="text-gray-700 mb-4">
                      {destination?.location}
                    </p>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Booking Card */}
              <div className="lg:w-1/3">
                <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
                  <div className="mb-4">
                    <div className="text-2xl font-bold mb-2">
                      Rp {destination?.price?.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">per orang</div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center">
                      <Clock size={18} className="text-gray-500 mr-3" />
                      <div>
                        <div className="text-sm font-medium">Durasi</div>
                        <div className="text-gray-700">
                          {destination?.duration}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Users size={18} className="text-gray-500 mr-3" />
                      <div>
                        <div className="text-sm font-medium">
                          Jumlah Peserta
                        </div>
                        <div className="text-gray-700">
                          Min {destination?.minParticipants} - Max{" "}
                          {destination?.maxParticipants} orang
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Calendar size={18} className="text-gray-500 mr-3" />
                      <div>
                        <div className="text-sm font-medium">Ketersediaan</div>
                        <div className="text-gray-700">
                          {destination?.availability}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <User size={18} className="text-gray-500 mr-3" />
                      <div>
                        <div className="text-sm font-medium">Pemandu</div>
                        <div className="text-gray-700">
                          {destination?.guide}
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full mb-3 bg-blue-500" disabled>
                    Lunas
                  </Button>
                  {status === "confirmed" && (
                    <Button
                      className="w-full mb-3 bg-green-500"
                      onClick={bookingHandler}
                    >
                      Selesai
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      )}
      <Footer />
    </div>
  );
};

// Mock data - extended with more destinations

export default BookingDetail;
