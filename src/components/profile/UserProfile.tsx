
import { User, UserRole } from "@/contexts/AuthContext";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent
} from "@/components/ui/card";

interface UserProfileProps {
  user: User;
}

export const UserProfile = ({ user }: UserProfileProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Informasi Pribadi</CardTitle>
          <CardDescription>Detail akun dan informasi kontak Anda.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Nama Lengkap</p>
              <p className="text-base">{user.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Email</p>
              <p className="text-base">{user.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Tipe Akun</p>
              <p className="text-base capitalize">
                {user.role === "wisatawan" ? "Wisatawan" : 
                 user.role === "pemandu" ? "Pemandu Lokal" :
                 user.role === "pengelola" ? "Pengelola Wisata" : "Admin"}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Tanggal Bergabung</p>
              <p className="text-base">Mei 2023</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Role-specific content */}
      {user.role === "wisatawan" && (
        <Card>
          <CardHeader>
            <CardTitle>Riwayat Perjalanan</CardTitle>
            <CardDescription>Riwayat perjalanan Anda bersama Jelajah Nusantara.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500 italic">Anda belum melakukan perjalanan. Jelajahi destinasi menarik dan buat reservasi sekarang!</p>
          </CardContent>
        </Card>
      )}

      {user.role === "pemandu" && (
        <Card>
          <CardHeader>
            <CardTitle>Informasi Pemandu</CardTitle>
            <CardDescription>Detail profil Anda sebagai pemandu lokal.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Spesialisasi</p>
              <p className="text-base">Wisata Budaya, Alam</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Bahasa</p>
              <p className="text-base">Indonesia, Inggris</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Area Operasi</p>
              <p className="text-base">Yogyakarta, Jawa Tengah</p>
            </div>
          </CardContent>
        </Card>
      )}

      {user.role === "pengelola" && (
        <Card>
          <CardHeader>
            <CardTitle>Informasi Pengelola Wisata</CardTitle>
            <CardDescription>Detail bisnis dan lokasi wisata yang Anda kelola.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Nama Usaha</p>
              <p className="text-base">Pesona Wisata Indonesia</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Lokasi Operasi</p>
              <p className="text-base">Bali, Indonesia</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Jumlah Destinasi</p>
              <p className="text-base">3 destinasi</p>
            </div>
          </CardContent>
        </Card>
      )}

      {user.role === "admin" && (
        <Card>
          <CardHeader>
            <CardTitle>Informasi Admin</CardTitle>
            <CardDescription>Detail akses sistem dan hak kelola.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Level Akses</p>
              <p className="text-base">Penuh</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Departemen</p>
              <p className="text-base">Platform Management</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
