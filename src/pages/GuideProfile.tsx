
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  MapPin,
  Star,
  Users,
  Calendar,
  Bookmark,
  MessageCircle,
  Languages,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

interface GuideData {
  id: string;
  name: string;
  avatar: string;
  location: string;
  specialties: string[];
  languages: string[];
  rating: number;
  reviewCount: number;
  tourCount: number;
  completedTours: number;
  verified: boolean;
  since: string;
  about: string;
  reviews: {
    id: string;
    name: string;
    avatar: string;
    date: string;
    rating: number;
    comment: string;
  }[];
  schedule: {
    id: string;
    date: string;
    destination: string;
    time: string;
    status: string;
  }[];
}

const GuideProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [guide, setGuide] = useState<GuideData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, fetch guide data from your API
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Mock data for the guide
      const mockGuide: GuideData = {
        id: id || "guide-001",
        name: "Wayan Surya",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        location: "Denpasar, Bali",
        specialties: ["Wisata Budaya", "Fotografi", "Spiritual"],
        languages: ["Indonesia", "Inggris", "Jepang"],
        rating: 4.9,
        reviewCount: 124,
        tourCount: 12,
        completedTours: 138,
        verified: true,
        since: "Maret 2022",
        about: "Saya adalah pemandu wisata berpengalaman dengan pengetahuan mendalam tentang budaya dan tradisi Bali. Saya sangat senang berbagi keindahan pulau Bali dengan para wisatawan dan membantu mereka menemukan pengalaman yang otentik di luar rute wisata biasa. Saya fasih berbicara dalam beberapa bahasa dan selalu berusaha memberikan pengalaman wisata yang berkesan.",
        reviews: [
          {
            id: "rev-1",
            name: "Sarah Johnson",
            avatar: "https://randomuser.me/api/portraits/women/33.jpg",
            date: "15 Apr 2023",
            rating: 5,
            comment: "Wayan adalah pemandu yang luar biasa! Pengetahuannya tentang budaya Bali sangat mendalam dan dia membawa kami ke tempat-tempat yang tidak ada di panduan wisata."
          },
          {
            id: "rev-2",
            name: "Michael Chen",
            avatar: "https://randomuser.me/api/portraits/men/44.jpg",
            date: "28 Mar 2023",
            rating: 5,
            comment: "Tur dengan Wayan adalah highlight dari kunjungan kami ke Bali. Dia sangat ramah dan fotografi-nya luar biasa!"
          },
          {
            id: "rev-3",
            name: "Emma Wilson",
            avatar: "https://randomuser.me/api/portraits/women/55.jpg",
            date: "10 Feb 2023",
            rating: 4,
            comment: "Pengalaman yang menyenangkan dan mendalam. Wayan sangat fleksibel dengan jadwal dan kebutuhan kami."
          }
        ],
        schedule: [
          {
            id: "sch-1",
            date: "25 Mei 2023",
            destination: "Pura Tanah Lot",
            time: "08:00 - 12:00",
            status: "Tersedia"
          },
          {
            id: "sch-2",
            date: "26 Mei 2023",
            destination: "Tegallalang Rice Terraces",
            time: "14:00 - 18:00",
            status: "Tersedia"
          },
          {
            id: "sch-3",
            date: "27 Mei 2023",
            destination: "Ubud Monkey Forest",
            time: "09:00 - 13:00",
            status: "Terpesan"
          }
        ]
      };

      setGuide(mockGuide);
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow bg-gray-50 py-8">
          <div className="container mx-auto px-4 text-center">
            <p>Memuat data pemandu...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!guide) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow bg-gray-50 py-8">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <h1 className="text-2xl font-bold mb-4">Pemandu Tidak Ditemukan</h1>
              <p className="mb-6">Detail pemandu yang Anda cari tidak dapat ditemukan.</p>
              <Button onClick={() => navigate(-1)}>Kembali</Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex flex-col md:flex-row">
              <div className="md:mr-8 mb-4 md:mb-0 flex justify-center">
                <Avatar className="h-32 w-32">
                  <AvatarImage src={guide.avatar} alt={guide.name} />
                  <AvatarFallback>{guide.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </div>
              
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                  <div>
                    <div className="flex items-center">
                      <h1 className="text-2xl font-bold mr-2">{guide.name}</h1>
                      {guide.verified && (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Terverifikasi
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center text-gray-500 mt-1">
                      <MapPin size={16} className="mr-1" />
                      <span>{guide.location}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 md:mt-0">
                    <Button className="mr-2">Hubungi Pemandu</Button>
                    <Button variant="outline">Jadwalkan Tur</Button>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1 my-3">
                  {guide.specialties.map((specialty, index) => (
                    <Badge key={index} variant="secondary" className="bg-gray-100">
                      {specialty}
                    </Badge>
                  ))}
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  <div className="flex flex-col items-center p-2 bg-gray-50 rounded-md">
                    <Star className="text-amber-500 mb-1" size={20} fill="currentColor" />
                    <span className="font-bold">{guide.rating}</span>
                    <span className="text-xs text-gray-500">{guide.reviewCount} ulasan</span>
                  </div>
                  
                  <div className="flex flex-col items-center p-2 bg-gray-50 rounded-md">
                    <Users className="text-blue-500 mb-1" size={20} />
                    <span className="font-bold">{guide.completedTours}</span>
                    <span className="text-xs text-gray-500">tur selesai</span>
                  </div>
                  
                  <div className="flex flex-col items-center p-2 bg-gray-50 rounded-md">
                    <Calendar className="text-green-500 mb-1" size={20} />
                    <span className="font-bold">{guide.since}</span>
                    <span className="text-xs text-gray-500">bergabung</span>
                  </div>
                  
                  <div className="flex flex-col items-center p-2 bg-gray-50 rounded-md">
                    <Languages className="text-purple-500 mb-1" size={20} />
                    <span className="font-bold">{guide.languages.length}</span>
                    <span className="text-xs text-gray-500">bahasa</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="about">
            <TabsList className="mb-6">
              <TabsTrigger value="about">Tentang</TabsTrigger>
              <TabsTrigger value="reviews">Ulasan</TabsTrigger>
              <TabsTrigger value="schedule">Jadwal</TabsTrigger>
            </TabsList>
            
            <TabsContent value="about">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Tentang {guide.name}</h2>
                  <p className="mb-4">{guide.about}</p>
                  
                  <h3 className="font-semibold mt-6 mb-2">Keahlian</h3>
                  <div className="flex flex-wrap gap-2">
                    {guide.specialties.map((specialty, index) => (
                      <Badge key={index} variant="outline" className="px-3 py-1">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                  
                  <h3 className="font-semibold mt-6 mb-2">Bahasa</h3>
                  <div className="flex flex-wrap gap-2">
                    {guide.languages.map((language, index) => (
                      <Badge key={index} variant="outline" className="px-3 py-1">
                        {language}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold">Ulasan ({guide.reviewCount})</h2>
                    <div className="flex items-center">
                      <Star className="text-amber-500 mr-1" size={20} fill="currentColor" />
                      <span className="font-bold text-lg">{guide.rating}</span>
                      <span className="text-gray-500 ml-1">/ 5</span>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    {guide.reviews.map((review) => (
                      <div key={review.id} className="border-b pb-6 last:border-b-0">
                        <div className="flex items-start">
                          <Avatar className="h-10 w-10 mr-4">
                            <AvatarImage src={review.avatar} alt={review.name} />
                            <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex justify-between items-center">
                              <h3 className="font-semibold">{review.name}</h3>
                              <span className="text-sm text-gray-500">{review.date}</span>
                            </div>
                            <div className="flex text-amber-500 my-1">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  size={14} 
                                  fill={i < review.rating ? "currentColor" : "none"}
                                  stroke={i >= review.rating ? "currentColor" : "currentColor"}
                                  strokeWidth={i >= review.rating ? 2 : 0}
                                  className="mr-0.5"
                                />
                              ))}
                            </div>
                            <p className="text-gray-700">{review.comment}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="schedule">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-6">Jadwal Pemandu</h2>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4">Tanggal</th>
                          <th className="text-left py-3 px-4">Destinasi</th>
                          <th className="text-left py-3 px-4">Waktu</th>
                          <th className="text-left py-3 px-4">Status</th>
                          <th className="text-right py-3 px-4">Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {guide.schedule.map((item) => (
                          <tr key={item.id} className="border-b last:border-b-0">
                            <td className="py-3 px-4">{item.date}</td>
                            <td className="py-3 px-4">{item.destination}</td>
                            <td className="py-3 px-4">{item.time}</td>
                            <td className="py-3 px-4">
                              <Badge className={
                                item.status === "Tersedia" 
                                  ? "bg-green-100 text-green-800" 
                                  : "bg-amber-100 text-amber-800"
                              }>
                                {item.status}
                              </Badge>
                            </td>
                            <td className="py-3 px-4 text-right">
                              {item.status === "Tersedia" ? (
                                <Button size="sm">Pesan</Button>
                              ) : (
                                <Button size="sm" variant="outline" disabled>Terpesan</Button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GuideProfile;
