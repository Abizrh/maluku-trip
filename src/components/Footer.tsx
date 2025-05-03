
import { Heart, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-jelajah-dark text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Jelajah Nusantara</h3>
            <p className="text-gray-300 mb-4">
              Menjelajahi keindahan Indonesia bersama pemandu lokal terpercaya.
            </p>
            <div className="flex items-center space-x-2 text-gray-300">
              <Heart size={18} className="text-red-500" />
              <span>Dibuat dengan cinta di Indonesia</span>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-4">Destinasi Populer</h4>
            <ul className="space-y-2">
              <li><Link to="/explore/bali" className="text-gray-300 hover:text-white">Bali</Link></li>
              <li><Link to="/explore/yogyakarta" className="text-gray-300 hover:text-white">Yogyakarta</Link></li>
              <li><Link to="/explore/raja-ampat" className="text-gray-300 hover:text-white">Raja Ampat</Link></li>
              <li><Link to="/explore/labuan-bajo" className="text-gray-300 hover:text-white">Labuan Bajo</Link></li>
              <li><Link to="/explore/lombok" className="text-gray-300 hover:text-white">Lombok</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-4">Informasi</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-300 hover:text-white">Tentang Kami</Link></li>
              <li><Link to="/guides" className="text-gray-300 hover:text-white">Menjadi Pemandu</Link></li>
              <li><Link to="/faq" className="text-gray-300 hover:text-white">FAQ</Link></li>
              <li><Link to="/terms" className="text-gray-300 hover:text-white">Syarat & Ketentuan</Link></li>
              <li><Link to="/privacy" className="text-gray-300 hover:text-white">Kebijakan Privasi</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-4">Kontak</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <MapPin size={18} />
                <span className="text-gray-300">Jakarta, Indonesia</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={18} />
                <span className="text-gray-300">+62 812 3456 7890</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={18} />
                <span className="text-gray-300">info@jelajahnusantara.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Jelajah Nusantara. Hak Cipta Dilindungi.</p>
        </div>
      </div>
    </footer>
  );
}
