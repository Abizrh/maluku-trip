
import { useState } from "react";
import { User } from "@/contexts/AuthContext";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface ProfileSettingsProps {
  user: User;
}

export const ProfileSettings = ({ user }: ProfileSettingsProps) => {
  const [notificationEmail, setNotificationEmail] = useState(true);
  const [notificationApp, setNotificationApp] = useState(true);
  const [newsletter, setNewsletter] = useState(false);
  const [twoFactor, setTwoFactor] = useState(false);
  
  const handleSaveSettings = () => {
    toast.success("Pengaturan berhasil disimpan");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Notifikasi</CardTitle>
          <CardDescription>Kelola preferensi notifikasi Anda.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="notification-email">Notifikasi Email</Label>
              <p className="text-sm text-gray-500">Terima pemberitahuan melalui email</p>
            </div>
            <Switch 
              id="notification-email" 
              checked={notificationEmail}
              onCheckedChange={setNotificationEmail}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="notification-app">Notifikasi Aplikasi</Label>
              <p className="text-sm text-gray-500">Terima pemberitahuan di dalam aplikasi</p>
            </div>
            <Switch 
              id="notification-app"
              checked={notificationApp} 
              onCheckedChange={setNotificationApp}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="notification-newsletter">Newsletter</Label>
              <p className="text-sm text-gray-500">Berlangganan newsletter bulanan kami</p>
            </div>
            <Switch 
              id="notification-newsletter"
              checked={newsletter} 
              onCheckedChange={setNewsletter}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Keamanan</CardTitle>
          <CardDescription>Kelola pengaturan keamanan akun Anda.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="two-factor">Autentikasi Dua Faktor</Label>
              <p className="text-sm text-gray-500">Tingkatkan keamanan dengan verifikasi dua langkah</p>
            </div>
            <Switch 
              id="two-factor"
              checked={twoFactor} 
              onCheckedChange={setTwoFactor}
            />
          </div>
          <Button variant="outline" className="w-full">Ubah Kata Sandi</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Preferensi</CardTitle>
          <CardDescription>Kelola preferensi bahasa dan tema aplikasi.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="lang">Bahasa</Label>
              <select 
                id="lang"
                className="w-full mt-1 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                defaultValue="id"
              >
                <option value="id">Indonesia</option>
                <option value="en">English</option>
              </select>
            </div>
            <div>
              <Label htmlFor="theme">Tema</Label>
              <select 
                id="theme"
                className="w-full mt-1 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                defaultValue="light"
              >
                <option value="light">Terang</option>
                <option value="dark">Gelap</option>
                <option value="system">Sistem</option>
              </select>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handleSaveSettings}>Simpan Pengaturan</Button>
        </CardFooter>
      </Card>

      {user.role === "wisatawan" && (
        <Card className="border-red-200">
          <CardHeader className="text-red-600">
            <CardTitle>Hapus Akun</CardTitle>
            <CardDescription className="text-red-400">
              Menghapus akun akan menghilangkan semua data dan riwayat perjalanan Anda.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              variant="destructive"
              onClick={() => toast.error("Fitur belum tersedia")}
            >
              Hapus Akun Saya
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
