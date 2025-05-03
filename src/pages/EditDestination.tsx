
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { DestinationForm } from "@/components/forms/DestinationForm";
import { Button } from "@/components/ui/button";

const EditDestination = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, fetch destination data from your API
    // This is a mockup with timeout to simulate API call
    setLoading(true);
    
    // Find destination from managed destinations (mocked)
    setTimeout(() => {
      // Simulate API response
      const mockDestination = {
        id: id,
        name: "Pura Tanah Lot",
        category: "Budaya",
        location: "Tabanan, Bali",
        description: "Pura Tanah Lot adalah salah satu pura terpenting di Bali yang terletak di atas batu karang di tepi pantai. Pura ini menawarkan pemandangan matahari terbenam yang spektakuler dan menjadi salah satu tujuan wisata paling populer di Bali.",
        images: [
          "https://images.unsplash.com/photo-1604999286549-9775ca576cd3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dGFuYWglMjBsb3R8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
          "https://images.unsplash.com/photo-1588453862374-8a1f79dd639a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dGFuYWglMjBsb3R8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
        ],
        price: 50000,
        maxVisitors: 1000,
        rating: 4.9,
        reviewCount: 532,
        status: "Aktif",
        guideCount: 8,
        visitorCount: 1240,
      };
      
      setDestination(mockDestination);
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow bg-gray-50 py-8">
          <div className="container mx-auto px-4 text-center">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <p>Memuat data destinasi...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow bg-gray-50 py-8">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <h1 className="text-2xl font-bold mb-4">Destinasi Tidak Ditemukan</h1>
              <p className="mb-6">Destinasi yang Anda cari tidak dapat ditemukan.</p>
              <Button onClick={() => navigate("/manager-dashboard")}>
                Kembali ke Dashboard
              </Button>
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
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h1 className="text-2xl font-bold mb-6">Edit Destinasi: {destination.name}</h1>
            <DestinationForm initialData={destination} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EditDestination;
