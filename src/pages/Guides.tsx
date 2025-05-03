
import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { MapPin, Search, Star, Users } from "lucide-react";

const Guides = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Pemandu Lokal Terpercaya</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Temukan pemandu lokal berpengalaman yang akan membuat perjalanan Anda di Indonesia menjadi lebih berkesan
            </p>
          </div>

          <div className="max-w-3xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                type="text"
                placeholder="Cari pemandu berdasarkan lokasi, keahlian, nama..."
                className="pl-10 py-6"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <Tabs defaultValue="all" className="mb-8">
            <TabsList className="mx-auto">
              <TabsTrigger value="all">Semua Pemandu</TabsTrigger>
              <TabsTrigger value="popular">Terpopuler</TabsTrigger>
              <TabsTrigger value="bali">Bali</TabsTrigger>
              <TabsTrigger value="jogja">Yogyakarta</TabsTrigger>
              <TabsTrigger value="lombok">Lombok</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {guides.map((guide, index) => (
                  <GuideCard key={index} guide={guide} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="popular" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {guides.filter(g => g.rating >= 4.8).map((guide, index) => (
                  <GuideCard key={index} guide={guide} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="bali" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {guides.filter(g => g.location === "Bali").map((guide, index) => (
                  <GuideCard key={index} guide={guide} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="jogja" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {guides.filter(g => g.location === "Yogyakarta").map((guide, index) => (
                  <GuideCard key={index} guide={guide} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="lombok" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {guides.filter(g => g.location === "Lombok").map((guide, index) => (
                  <GuideCard key={index} guide={guide} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

interface GuideProps {
  id: string;
  name: string;
  avatar: string;
  location: string;
  specialties: string[];
  rating: number;
  reviewCount: number;
  tourCount: number;
  verified: boolean;
}

const GuideCard = ({ guide }: { guide: GuideProps }) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardContent className="p-0">
        <div className="p-5">
          <div className="flex items-center mb-4">
            <Avatar className="h-12 w-12 mr-4">
              <AvatarImage src={guide.avatar} alt={guide.name} />
              <AvatarFallback>{guide.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center">
                <h3 className="font-semibold">{guide.name}</h3>
                {guide.verified && (
                  <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200">
                    Terverifikasi
                  </Badge>
                )}
              </div>
              <div className="flex items-center text-gray-500 text-sm">
                <MapPin size={14} className="mr-1" />
                {guide.location}
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-1 mb-4">
            {guide.specialties.map((specialty, index) => (
              <Badge key={index} variant="secondary" className="bg-gray-100">
                {specialty}
              </Badge>
            ))}
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Star size={16} fill="currentColor" className="text-amber-500 mr-1" />
              <span className="font-medium">{guide.rating}</span>
              <span className="text-gray-500 text-sm ml-1">({guide.reviewCount})</span>
            </div>
            <div className="flex items-center text-gray-500 text-sm">
              <Users size={14} className="mr-1" />
              {guide.tourCount} tur
            </div>
          </div>
        </div>
        
        <div className="border-t p-4 bg-gray-50">
          <Link to={`/guide/${guide.id}`}>
            <Button className="w-full">Lihat Profil</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

// Mock data
const guides = [
  {
    id: "guide-001",
    name: "Wayan Surya",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    location: "Bali",
    specialties: ["Budaya Bali", "Wisata Alam", "Fotografi"],
    rating: 4.9,
    reviewCount: 124,
    tourCount: 32,
    verified: true,
  },
  {
    id: "guide-002",
    name: "Rina Wijaya",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    location: "Yogyakarta",
    specialties: ["Sejarah", "Kuliner", "Seni"],
    rating: 4.8,
    reviewCount: 98,
    tourCount: 27,
    verified: true,
  },
  {
    id: "guide-003",
    name: "Ahmad Firdaus",
    avatar: "https://randomuser.me/api/portraits/men/67.jpg",
    location: "Lombok",
    specialties: ["Pantai", "Snorkeling", "Hiking"],
    rating: 4.7,
    reviewCount: 86,
    tourCount: 19,
    verified: false,
  },
  {
    id: "guide-004",
    name: "Dewi Sartika",
    avatar: "https://randomuser.me/api/portraits/women/23.jpg",
    location: "Bali",
    specialties: ["Spiritual", "Yoga", "Meditasi"],
    rating: 4.9,
    reviewCount: 112,
    tourCount: 29,
    verified: true,
  },
  {
    id: "guide-005",
    name: "Budi Santoso",
    avatar: "https://randomuser.me/api/portraits/men/91.jpg",
    location: "Yogyakarta",
    specialties: ["Candi", "Kerajaan", "Batik"],
    rating: 4.6,
    reviewCount: 74,
    tourCount: 22,
    verified: true,
  },
  {
    id: "guide-006",
    name: "Lina Pratiwi",
    avatar: "https://randomuser.me/api/portraits/women/63.jpg",
    location: "Lombok",
    specialties: ["Desa Wisata", "Kerajinan", "Kuliner"],
    rating: 4.8,
    reviewCount: 92,
    tourCount: 24,
    verified: true,
  },
];

export default Guides;
