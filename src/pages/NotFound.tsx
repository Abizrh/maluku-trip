
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center p-6 bg-white rounded-lg shadow-sm max-w-md">
        <h1 className="text-6xl font-bold mb-4 text-jelajah-blue">404</h1>
        <p className="text-2xl font-medium text-gray-700 mb-6">Halaman Tidak Ditemukan</p>
        <p className="text-gray-600 mb-8">
          Maaf, halaman yang Anda cari tidak tersedia di Jelajah Nusantara.
        </p>
        <Link to="/">
          <Button size="lg">Kembali ke Beranda</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
