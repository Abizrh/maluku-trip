import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { DestinationCard } from "@/components/DestinationCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Search, SlidersHorizontal } from "lucide-react";
import { useState } from "react";

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 2000000]);
  const [filterOpen, setFilterOpen] = useState(false);
  
  // Mock filter state
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("popular");

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleRatingChange = (rating: string) => {
    setSelectedRatings(prev => 
      prev.includes(rating) 
        ? prev.filter(r => r !== rating)
        : [...prev, rating]
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-jelajah-blue text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-6">Eksplorasi Destinasi</h1>
            <div className="flex items-center gap-4 bg-white rounded-lg p-2">
              <div className="flex items-center gap-2 flex-grow px-2">
                <Search size={20} className="text-gray-500" />
                <input 
                  type="text" 
                  placeholder="Cari destinasi wisata..." 
                  className="bg-transparent border-none outline-none w-full text-gray-800"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button>Cari</Button>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Semua Destinasi</h2>
            <div className="flex items-center gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Urut berdasarkan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Paling Populer</SelectItem>
                  <SelectItem value="rating">Rating Tertinggi</SelectItem>
                  <SelectItem value="price-low">Harga: Rendah ke Tinggi</SelectItem>
                  <SelectItem value="price-high">Harga: Tinggi ke Rendah</SelectItem>
                </SelectContent>
              </Select>
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => setFilterOpen(!filterOpen)}
                className="md:hidden"
              >
                <SlidersHorizontal size={18} />
              </Button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Filter sidebar - hidden on mobile unless opened */}
            <div className={`md:w-1/4 lg:w-1/5 bg-white p-4 rounded-lg ${filterOpen ? 'block' : 'hidden'} md:block`}>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-3">Kategori</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`category-${category}`} 
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={() => handleCategoryChange(category)}
                        />
                        <Label htmlFor={`category-${category}`}>{category}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-3">Rating</h3>
                  <div className="space-y-2">
                    {ratings.map((rating) => (
                      <div key={rating} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`rating-${rating}`} 
                          checked={selectedRatings.includes(rating)}
                          onCheckedChange={() => handleRatingChange(rating)}
                        />
                        <Label htmlFor={`rating-${rating}`}>{rating} & ke atas</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-3">Rentang Harga</h3>
                  <div className="space-y-4">
                    <Slider 
                      min={0} 
                      max={2000000} 
                      step={50000}
                      value={priceRange}
                      onValueChange={setPriceRange}
                    />
                    <div className="flex items-center justify-between text-sm">
                      <span>Rp {priceRange[0].toLocaleString()}</span>
                      <span>Rp {priceRange[1].toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                
                <Button className="w-full">Terapkan Filter</Button>
              </div>
            </div>

            {/* Destinations grid */}
            <div className="flex-1">
              <Tabs defaultValue="grid" className="mb-6">
                <TabsList className="grid w-full max-w-xs grid-cols-2">
                  <TabsTrigger value="grid">Grid</TabsTrigger>
                  <TabsTrigger value="map">Peta</TabsTrigger>
                </TabsList>
                <TabsContent value="grid">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {allDestinations.map((destination) => (
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
                </TabsContent>
                <TabsContent value="map" className="h-[600px] bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center p-6">
                    <MapPin size={40} className="mx-auto text-gray-400 mb-3" />
                    <p className="text-gray-500">Peta destinasi akan ditampilkan di sini</p>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex items-center justify-center mt-8">
                <Button variant="outline">Muat Lebih Banyak</Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

// Mock data
const categories = [
  "Pantai",
  "Gunung",
  "Sejarah",
  "Budaya",
  "Alam",
  "Kuliner",
  "Petualangan",
];

const ratings = ["5", "4", "3", "2"];

const allDestinations = [
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
  {
    id: "lombok-001",
    name: "Gili Trawangan",
    location: "Lombok",
    image: "https://images.unsplash.com/photo-1570703334047-c8ba5099a432?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Z2lsaSUyMHRyYXdhbmdhbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
    rating: 4.6,
    price: 800000,
    category: "Pantai",
  },
  {
    id: "bromo-001",
    name: "Gunung Bromo",
    location: "Jawa Timur",
    image: "https://images.unsplash.com/photo-1589100534833-4947a5a9766c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YnJvbW8lMjBtb3VudGFpbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
    rating: 4.8,
    price: 450000,
    category: "Gunung",
  },
  {
    id: "maluku-001",
    name: "Pantai Ora",
    location: "Maluku",
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?fit=crop&w=800&q=60",
    rating: 4.9,
    price: 1200000,
    category: "Pantai",
  },
  {
    id: "maluku-002",
    name: "Pulau Banda",
    location: "Maluku",
    image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?fit=crop&w=800&q=60",
    rating: 4.7,
    price: 900000,
    category: "Sejarah",
  },
  {
    id: "toraja-001",
    name: "Tana Toraja",
    location: "Sulawesi Selatan",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?fit=crop&w=800&q=60",
    rating: 4.6,
    price: 650000,
    category: "Budaya",
  },
  {
    id: "flores-001",
    name: "Danau Kelimutu",
    location: "Flores",
    image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?fit=crop&w=800&q=60",
    rating: 4.8,
    price: 750000,
    category: "Alam",
  },
  {
    id: "sumbar-001",
    name: "Danau Maninjau",
    location: "Sumatera Barat",
    image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?fit=crop&w=800&q=60",
    rating: 4.5,
    price: 400000,
    category: "Alam",
  },
  {
    id: "jogja-002",
    name: "Pantai Parangtritis",
    location: "Yogyakarta",
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?fit=crop&w=800&q=60",
    rating: 4.4,
    price: 250000,
    category: "Pantai",
  }
];

export default Explore;
