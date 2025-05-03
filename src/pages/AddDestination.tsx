
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { DestinationForm } from "@/components/forms/DestinationForm";

const AddDestination = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h1 className="text-2xl font-bold mb-6">Tambah Destinasi Baru</h1>
            <DestinationForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AddDestination;
