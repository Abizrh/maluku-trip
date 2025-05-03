
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import GuideInviteForm from "@/components/forms/GuideInviteForm";

const InviteGuide = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h1 className="text-2xl font-bold mb-2">Undang Pemandu Baru</h1>
            <p className="text-gray-600 mb-6">
              Undang pemandu berkualitas untuk bergabung dengan tim Anda dan meningkatkan
              pengalaman wisatawan di destinasi yang Anda kelola.
            </p>
            <GuideInviteForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default InviteGuide;
