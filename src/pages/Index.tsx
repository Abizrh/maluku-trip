
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { DestinationCard } from "@/components/DestinationCard";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Search, Star, Users } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-jelajah-blue text-white">
          <div className="hero-pattern absolute inset-0 opacity-10"></div>
          <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-5xl font-bold mb-6 animate-fade-in">
                Jelajahi Keindahan Nusantara Bersama Pemandu Lokal Terbaik
              </h1>
              <p className="text-xl mb-8 text-white/90 animate-fade-in" style={{animationDelay: "0.2s"}}>
                Temukan destinasi impian dan pengalaman wisata autentik di seluruh Indonesia
              </p>
              <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 max-w-2xl mx-auto animate-fade-in" style={{animationDelay: "0.3s"}}>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-grow">
                    <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-4 py-3">
                      <Search size={20} className="text-gray-500" />
                      <input 
                        type="text" 
                        placeholder="Cari destinasi wisata..." 
                        className="bg-transparent border-none outline-none w-full text-gray-800"
                      />
                    </div>
                  </div>
                  <Button className="md:w-auto">
                    Cari Sekarang
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
        </section>

        {/* Popular Destinations */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">Destinasi Populer</h2>
              <Link to="/explore" className="text-jelajah-blue flex items-center hover:underline">
                Lihat Semua <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {popularDestinations.map((destination) => (
                <DestinationCard
                  key={destination.id}
                  id={destination.id}
                  name={destination.name}
                  location={destination.location}
                  image={destination.image}
                  rating={destination.rating}
                  price={destination.price}
                  category={destination.category}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Mengapa Memilih Jelajah Nusantara?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Platform wisata lokal yang menghubungkan wisatawan dengan pemandu terbaik di seluruh Indonesia
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm text-center">
                  <div className="w-16 h-16 bg-jelajah-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-jelajah-green text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Siap Menjelajahi Keindahan Nusantara?</h2>
              <p className="text-xl mb-8">
                Bergabunglah dengan ribuan traveler yang telah menemukan pengalaman wisata tak terlupakan
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/register">
                  <Button variant="default" size="lg" className="bg-white text-jelajah-green hover:bg-gray-100 hover:text-jelajah-green">
                    Daftar Sekarang
                  </Button>
                </Link>
                <Link to="/explore">
                  <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                    Jelajahi Destinasi
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

// Mock data
const popularDestinations = [
  {
    id: "bali-001",
    name: "Pantai Kuta",
    location: "Bali",
    image: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGt1dGElMjBiZWFjaHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
    rating: 4.8,
    price: 500000,
    category: "Pantai",
  },
  {
    id: "yogya-001",
    name: "Candi Borobudur",
    location: "Yogyakarta",
    image: "https://images.unsplash.com/photo-1584810359583-96fc3448beaa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Ym9yb2J1ZHVyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    rating: 4.9,
    price: 350000,
    category: "Sejarah",
  },
  {
    id: "raja-001",
    name: "Pulau Wayag",
    location: "Raja Ampat",
    image: "https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmFqYSUyMGFtcGF0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    rating: 4.7,
    price: 1500000,
    category: "Alam",
  },
  {
    id: "bajo-001",
    name: "Taman Nasional Komodo",
    location: "Labuan Bajo",
    image: "https://images.unsplash.com/photo-1516748088067-ed3a29cccd39?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8a29tb2RvfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    rating: 4.8,
    price: 1200000,
    category: "Petualangan",
  },
];

const features = [
  {
    title: "Pemandu Lokal Terverifikasi",
    description: "Semua pemandu wisata kami telah melalui proses verifikasi ketat untuk memastikan kualitas terbaik",
    icon: <Users size={32} className="text-jelajah-blue" />
  },
  {
    title: "Destinasi Terbaik",
    description: "Akses ke ratusan destinasi wisata terbaik di seluruh Indonesia dengan informasi lengkap",
    icon: <MapPin size={32} className="text-jelajah-blue" />
  },
  {
    title: "Pengalaman Terpercaya",
    description: "Ribuan ulasan positif dari wisatawan yang telah menggunakan layanan kami",
    icon: <Star size={32} className="text-jelajah-blue" />
  },
];

export default Index;
