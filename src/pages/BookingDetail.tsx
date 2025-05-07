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
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { usePengelolaStore } from "@/stores/pengelolaStore";
import { useWisatawanStore } from "@/stores/wisatawanStore";

const BookingDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const {
    detailDestination: destination,
    isLoading,
    getDetailDestination,
  } = usePengelolaStore();
  const { bookTrip, detailTrip, getBookingDetail } = useWisatawanStore();

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
    // const resp = await bookTrip({
    //   destinasiId: id,
    // });
  };
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

                  <Button className="w-full mb-3" onClick={bookingHandler}>
                    Bayar
                  </Button>
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
const destinationsData = [
  {
    id: "bali-001",
    name: "Pantai Kuta",
    location: "Bali",
    address: "Jl. Pantai Kuta, Kuta, Badung, Bali",
    howToGet:
      "Anda dapat mencapai Pantai Kuta dengan taksi dari Bandara Internasional Ngurah Rai (sekitar 15 menit) atau dengan berjalan kaki dari area Kuta.",
    image:
      "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGt1dGElMjBiZWFjaHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
    rating: 4.8,
    reviewCount: 245,
    price: 500000,
    category: "Pantai",
    description:
      "Pantai Kuta adalah salah satu pantai paling terkenal di Bali dengan pasir putih yang membentang sepanjang 2,5 km. Ideal untuk berenang, berselancar, atau sekadar bersantai menikmati matahari.",
    detailedDescription:
      "Pantai Kuta menawarkan panorama matahari terbenam yang spektakuler dan suasana yang ramai. Di sepanjang pantai tersedia berbagai fasilitas seperti kursi pantai, restoran, bar, dan tempat penyewaan papan selancar. Pantai ini cocok untuk peselancar pemula karena ombaknya yang tidak terlalu besar. Selain itu, di sekitar Pantai Kuta juga terdapat pusat perbelanjaan, hotel, dan hiburan malam yang dapat dinikmati pengunjung.",
    duration: "Full Day (8 jam)",
    minParticipants: 1,
    maxParticipants: 15,
    availability: "Setiap hari (08.00 - 18.00)",
    guide: "Wayan Surya",
    includes: [
      "Pemandu lokal berpengalaman",
      "Tiket masuk",
      "Makan siang di restoran lokal",
      "Transportasi AC dari/ke hotel (area Kuta & Seminyak)",
      "Penyewaan papan selancar selama 1 jam",
      "Asuransi perjalanan",
    ],
    facilities: [
      "Parkir",
      "Toilet",
      "Penyewaan peralatan",
      "Kursi pantai",
      "Warung makan",
      "Penjaga pantai",
      "Tempat bilas",
    ],
    reviews: [
      {
        userName: "Budi Santoso",
        userImage: "https://randomuser.me/api/portraits/men/1.jpg",
        rating: 5,
        date: "15 Mar 2023",
        comment:
          "Pantainya sangat indah dan bersih. Pemandunya sangat ramah dan informatif. Pengalaman yang luar biasa!",
      },
      {
        userName: "Siti Nuraini",
        userImage: "https://randomuser.me/api/portraits/women/2.jpg",
        rating: 4,
        date: "2 Feb 2023",
        comment:
          "Saya sangat menikmati matahari terbenam di pantai ini. Sayang agak terlalu ramai di beberapa area.",
      },
      {
        userName: "Reza Pradana",
        userImage: "https://randomuser.me/api/portraits/men/3.jpg",
        rating: 5,
        date: "20 Jan 2023",
        comment:
          "Pengalaman berselancar yang menyenangkan! Air jernih dan ombaknya cocok untuk pemula seperti saya.",
      },
    ],
  },
  {
    id: "yogya-001",
    name: "Candi Borobudur",
    location: "Yogyakarta",
    address:
      "Jl. Badrawati, Kw. Candi Borobudur, Borobudur, Magelang, Jawa Tengah",
    howToGet:
      "Dari pusat kota Yogyakarta, Anda dapat menyewa taksi atau mengikuti tur yang menyediakan transportasi (sekitar 1-1,5 jam perjalanan).",
    image:
      "https://images.unsplash.com/photo-1584810359583-96fc3448beaa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Ym9yb2J1ZHVyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    rating: 4.9,
    reviewCount: 352,
    price: 350000,
    category: "Sejarah",
    description:
      "Candi Borobudur adalah candi Buddha terbesar di dunia yang dibangun pada abad ke-9 dan telah menjadi Situs Warisan Dunia UNESCO.",
    detailedDescription:
      "Borobudur adalah monumen Buddha terbesar di dunia dengan 72 stupa berbentuk lonceng, masing-masing berisi patung Buddha. Struktur batu raksasa ini memiliki 9 tingkat yang mewakili tingkat pencerahan Buddha. Ukiran detail menggambarkan kisah kehidupan Buddha dan filosofi Buddhisme. Pengunjung dapat menikmati pemandangan matahari terbit yang spektakuler dari puncak candi dengan pemandangan Gunung Merapi dan Merbabu di kejauhan.",
    duration: "Half Day (4 jam)",
    minParticipants: 1,
    maxParticipants: 20,
    availability: "Setiap hari (06.00 - 17.00)",
    guide: "Rina Wijaya",
    includes: [
      "Tiket masuk",
      "Pemandu lokal bersertifikat",
      "Transportasi AC dari/ke hotel di Yogyakarta",
      "Air mineral",
      "Sarapan ringan untuk paket sunrise",
      "Asuransi perjalanan",
    ],
    facilities: [
      "Parkir",
      "Toilet",
      "Pusat Informasi",
      "Museum",
      "Toko Suvenir",
      "Restoran",
      "Area Istirahat",
    ],
    reviews: [
      {
        userName: "Anwar Hidayat",
        userImage: "https://randomuser.me/api/portraits/men/5.jpg",
        rating: 5,
        date: "20 Apr 2023",
        comment:
          "Pengalaman spiritual yang luar biasa. Relief-reliefnya sangat detail dan menakjubkan. Sangat direkomendasikan!",
      },
      {
        userName: "Dewi Lestari",
        userImage: "https://randomuser.me/api/portraits/women/6.jpg",
        rating: 5,
        date: "12 Mar 2023",
        comment:
          "Matahari terbit di Borobudur adalah momen yang tak terlupakan. Pemandunya sangat berpengetahuan luas tentang sejarah candi.",
      },
    ],
  },
  {
    id: "raja-001",
    name: "Pulau Wayag",
    location: "Raja Ampat",
    address: "Kepulauan Wayag, Raja Ampat, Papua Barat",
    howToGet:
      "Dari Sorong, Anda harus mengambil kapal cepat atau kapal tradisional ke Waisai, lalu perahu ke Pulau Wayag (sekitar 4-5 jam perjalanan total).",
    image:
      "https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmFqYSUyMGFtcGF0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    rating: 4.7,
    reviewCount: 186,
    price: 1500000,
    category: "Alam",
    description:
      "Pulau Wayag terkenal dengan formasi karst berbentuk jamur yang menjulang di atas laguna biru turquoise, menawarkan pemandangan ikonik Raja Ampat.",
    detailedDescription:
      "Wayag adalah surga tersembunyi di Raja Ampat dengan pulau-pulau kecil karst berbentuk kerucut yang tersebar di lautan biru jernih. Pulau ini menawarkan beberapa titik snorkeling dan diving terbaik di dunia dengan keanekaragaman hayati laut yang luar biasa. Pendakian singkat ke Puncak Wayag memberikan pemandangan panorama kepulauan yang menakjubkan dan menjadi spot foto ikonik Raja Ampat.",
    duration: "Full Day (10 jam)",
    minParticipants: 4,
    maxParticipants: 12,
    availability: "Setiap hari (bergantung pada kondisi cuaca)",
    guide: "Piter Wonggor",
    includes: [
      "Transportasi perahu dari/ke Waisai",
      "Pemandu lokal berpengalaman",
      "Peralatan snorkeling",
      "Makan siang piknik",
      "Air mineral",
      "Perizinan area konservasi",
      "Dokumentasi foto dasar",
    ],
    facilities: [
      "Area Istirahat Dasar",
      "Pos Penjaga",
      "Tempat Berlabuh Perahu",
    ],
    reviews: [
      {
        userName: "Johan Sulaiman",
        userImage: "https://randomuser.me/api/portraits/men/8.jpg",
        rating: 5,
        date: "5 Jun 2023",
        comment:
          "Tempat paling indah yang pernah saya kunjungi! Air lautnya sangat jernih dan pemandangan dari puncak benar-benar menakjubkan.",
      },
      {
        userName: "Amelia Putri",
        userImage: "https://randomuser.me/api/portraits/women/9.jpg",
        rating: 4,
        date: "22 Mei 2023",
        comment:
          "Pengalaman yang luar biasa, meski perjalanan kesana cukup menantang. Pastikan membawa perlengkapan yang cukup dan siap secara fisik.",
      },
    ],
  },
  {
    id: "maluku-001",
    name: "Pantai Ora",
    location: "Maluku",
    address: "Pulau Seram, Maluku Tengah, Maluku",
    howToGet:
      "Dari Ambon, naik kapal cepat ke Masohi (2 jam), lalu naik kendaraan darat ke Sawai (3 jam), diikuti perjalanan perahu ke Pantai Ora (30 menit).",
    image:
      "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?fit=crop&w=800&q=60",
    rating: 4.9,
    reviewCount: 124,
    price: 1200000,
    category: "Pantai",
    description:
      "Pantai Ora dikenal sebagai 'surga tersembunyi' di Maluku dengan pasir putih lembut dan air laut biru kristal yang menampilkan beragam kehidupan bawah laut.",
    detailedDescription:
      "Pantai Ora adalah salah satu pantai terindah di Indonesia dengan air laut berwarna biru toska yang sangat jernih. Pasir putihnya yang halus berbatasan langsung dengan hutan hujan tropis yang masih asri. Terumbu karang yang terletak hanya beberapa meter dari pantai menawarkan pengalaman snorkeling yang luar biasa dengan keanekaragaman hayati laut yang menakjubkan, termasuk ikan karang berwarna-warni dan berbagai jenis terumbu karang.",
    duration: "2 Hari 1 Malam",
    minParticipants: 2,
    maxParticipants: 10,
    availability: "Setiap hari (tergantung cuaca)",
    guide: "Daniel Manuhutu",
    includes: [
      "Transportasi perahu dari/ke Sawai",
      "Akomodasi penginapan sederhana",
      "Makan 3x sehari (masakan lokal)",
      "Pemandu lokal",
      "Peralatan snorkeling",
      "Air mineral",
      "Dokumentasi foto dasar",
    ],
    facilities: [
      "Penginapan Sederhana",
      "Toilet",
      "Area Makan",
      "Hammock",
      "Tempat Istirahat Pantai",
    ],
    reviews: [
      {
        userName: "Lina Wijaya",
        userImage: "https://randomuser.me/api/portraits/women/11.jpg",
        rating: 5,
        date: "10 Apr 2023",
        comment:
          "Pantai terindah yang pernah saya kunjungi! Air lautnya sangat jernih seperti kaca dan terumbu karangnya masih sangat sehat.",
      },
      {
        userName: "Toni Saputra",
        userImage: "https://randomuser.me/api/portraits/men/12.jpg",
        rating: 5,
        date: "28 Mar 2023",
        comment:
          "Walaupun perjalanan cukup jauh, hasilnya sangat sepadan. Tempat yang sempurna untuk melepaskan diri dari keramaian kota.",
      },
    ],
  },
  {
    id: "maluku-002",
    name: "Pulau Banda",
    location: "Maluku",
    address: "Kepulauan Banda, Maluku Tengah, Maluku",
    howToGet:
      "Dari Ambon, naik pesawat kecil ke Bandaneira (1 jam) atau kapal laut (8-12 jam tergantung kondisi cuaca).",
    image:
      "https://images.unsplash.com/photo-1518495973542-4542c06a5843?fit=crop&w=800&q=60",
    rating: 4.7,
    reviewCount: 98,
    price: 900000,
    category: "Sejarah",
    description:
      "Kepulauan Banda adalah pusat perdagangan rempah-rempah bersejarah dengan benteng kolonial, kebun pala, dan keindahan bawah laut yang menakjubkan.",
    detailedDescription:
      "Kepulauan Banda memiliki peran penting dalam sejarah perdagangan rempah dunia, khususnya pala yang dulu berharga lebih mahal dari emas. Kawasan ini memiliki benteng-benteng peninggalan kolonial Belanda yang terawat baik, seperti Benteng Belgica dan Nassau. Pengunjung dapat menjelajahi kebun pala tradisional, museum lokal, dan rumah-rumah tua bergaya kolonial. Selain nilai sejarahnya, Banda juga menawarkan keindahan bawah laut yang spektakuler untuk snorkeling dan diving, dengan dinding karang vertikal yang terjal dan keanekaragaman hayati laut yang luar biasa.",
    duration: "3 Hari 2 Malam",
    minParticipants: 2,
    maxParticipants: 8,
    availability: "Setiap hari (September-November direkomendasikan)",
    guide: "Maria Pattiasina",
    includes: [
      "Tiket pesawat pulang-pergi Ambon-Bandaneira (opsional)",
      "Akomodasi di guest house lokal",
      "Makan 3x sehari",
      "Transportasi lokal di kepulauan",
      "Tur benteng dan kebun pala",
      "Snorkeling di spot pilihan",
      "Pemandu lokal berpengalaman",
    ],
    facilities: [
      "Penginapan",
      "Restoran Lokal",
      "Pusat Informasi Turis",
      "Mini Market",
      "Penyewaan Peralatan Snorkeling",
    ],
    reviews: [
      {
        userName: "Agus Hermawan",
        userImage: "https://randomuser.me/api/portraits/men/15.jpg",
        rating: 5,
        date: "12 Mei 2023",
        comment:
          "Perjalanan yang penuh dengan nilai sejarah dan keindahan alam. Sangat direkomendasikan bagi pencinta sejarah dan diving!",
      },
      {
        userName: "Siska Maharani",
        userImage: "https://randomuser.me/api/portraits/women/16.jpg",
        rating: 4,
        date: "3 Apr 2023",
        comment:
          "Bangunan kolonialnya sangat terawat dan pemandunya sangat berpengetahuan. Jangan lewatkan mencoba makanan lokalnya yang khas.",
      },
    ],
  },
  {
    id: "toraja-001",
    name: "Tana Toraja",
    location: "Sulawesi Selatan",
    address: "Kabupaten Tana Toraja, Sulawesi Selatan",
    howToGet:
      "Dari Makassar, naik bus atau mobil sewa ke Tana Toraja (sekitar 8 jam perjalanan).",
    image:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?fit=crop&w=800&q=60",
    rating: 4.6,
    reviewCount: 210,
    price: 650000,
    category: "Budaya",
    description:
      "Tana Toraja menawarkan pengalaman budaya yang unik dengan rumah adat Tongkonan, upacara pemakaman tradisional, dan pemandangan alam yang menakjubkan.",
    detailedDescription:
      "Tana Toraja adalah wilayah pegunungan di Sulawesi Selatan yang terkenal dengan tradisi budaya yang unik dan rumah adat berbentuk perahu yang disebut Tongkonan. Daerah ini terkenal dengan upacara pemakaman Rambu Solo yang rumit dan megah, dimana keluarga menyimpan jenazah di rumah hingga upacara dapat dilaksanakan, yang kadang butuh waktu bertahun-tahun. Pengunjung dapat melihat kuburan batu di tebing, patung tau-tau (patung orang yang telah meninggal), dan situs pemakaman bayi di pohon. Selain budaya, Tana Toraja juga menawarkan pemandangan alam yang spektakuler dengan sawah terasering, hutan pinus, dan jalur trekking yang menakjubkan.",
    duration: "3 Hari 2 Malam",
    minParticipants: 2,
    maxParticipants: 12,
    availability: "Setiap hari (Juli-Agustus untuk melihat upacara)",
    guide: "Samuel Pongtiku",
    includes: [
      "Transportasi dari/ke Makassar",
      "Akomodasi di homestay lokal",
      "Makan 3x sehari",
      "Tur ke situs budaya utama",
      "Transportasi lokal selama tur",
      "Pemandu lokal berbahasa Indonesia/Inggris",
      "Donasi untuk masyarakat lokal",
    ],
    facilities: [
      "Homestay",
      "Rumah Makan Lokal",
      "Toko Suvenir",
      "Pusat Informasi",
      "Toilet Umum",
    ],
    reviews: [
      {
        userName: "Hendrik Wijaya",
        userImage: "https://randomuser.me/api/portraits/men/18.jpg",
        rating: 4,
        date: "25 Jul 2023",
        comment:
          "Pengalaman budaya yang mendalam dan berbeda dari tempat wisata lainnya. Pemandunya sangat menghormati tradisi lokal.",
      },
      {
        userName: "Maya Kusuma",
        userImage: "https://randomuser.me/api/portraits/women/19.jpg",
        rating: 5,
        date: "10 Jun 2023",
        comment:
          "Tempat yang luar biasa untuk belajar tentang budaya Indonesia yang beragam. Pemandangan alamnya juga sangat indah.",
      },
    ],
  },
];

export default BookingDetail;
