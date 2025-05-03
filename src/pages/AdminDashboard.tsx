
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  Building,
  Calendar,
  CheckCircle,
  CreditCard,
  Download,
  FileText,
  Home,
  LineChart,
  MessageCircle,
  PieChart,
  Search,
  Settings,
  ShieldAlert,
  Star,
  User,
  Users,
  XCircle,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");
  
  const handleAction = (action, itemId, type) => {
    toast.success(`${action} ${type} dengan ID ${itemId}`);
  };
  
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col fixed inset-y-0 bg-jelajah-dark text-white">
        <div className="p-5 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="bg-jelajah-blue p-1.5 rounded-md">
              <ShieldAlert className="h-5 w-5 text-white" />
            </div>
            <span className="font-semibold text-lg">Admin Panel</span>
          </div>
        </div>
        
        <div className="flex-1 overflow-auto py-4">
          <nav className="px-3 space-y-1">
            <button 
              onClick={() => setActiveTab("dashboard")}
              className={`flex w-full items-center py-3 px-4 rounded-md ${activeTab === "dashboard" ? "bg-gray-800 font-medium" : "hover:bg-gray-800 text-gray-300 hover:text-white transition-colors"}`}
            >
              <Home size={18} className="mr-3" />
              <span>Dashboard</span>
            </button>
            <button 
              onClick={() => setActiveTab("users")}
              className={`flex w-full items-center py-3 px-4 rounded-md ${activeTab === "users" ? "bg-gray-800 font-medium" : "hover:bg-gray-800 text-gray-300 hover:text-white transition-colors"}`}
            >
              <Users size={18} className="mr-3" />
              <span>Pengguna</span>
            </button>
            <button 
              onClick={() => setActiveTab("destinations")}
              className={`flex w-full items-center py-3 px-4 rounded-md ${activeTab === "destinations" ? "bg-gray-800 font-medium" : "hover:bg-gray-800 text-gray-300 hover:text-white transition-colors"}`}
            >
              <Building size={18} className="mr-3" />
              <span>Destinasi</span>
            </button>
            <button 
              onClick={() => setActiveTab("transactions")}
              className={`flex w-full items-center py-3 px-4 rounded-md ${activeTab === "transactions" ? "bg-gray-800 font-medium" : "hover:bg-gray-800 text-gray-300 hover:text-white transition-colors"}`}
            >
              <CreditCard size={18} className="mr-3" />
              <span>Transaksi</span>
            </button>
            <button 
              onClick={() => setActiveTab("reports")}
              className={`flex w-full items-center py-3 px-4 rounded-md ${activeTab === "reports" ? "bg-gray-800 font-medium" : "hover:bg-gray-800 text-gray-300 hover:text-white transition-colors"}`}
            >
              <FileText size={18} className="mr-3" />
              <span>Laporan</span>
            </button>
            <button 
              onClick={() => setActiveTab("settings")}
              className={`flex w-full items-center py-3 px-4 rounded-md ${activeTab === "settings" ? "bg-gray-800 font-medium" : "hover:bg-gray-800 text-gray-300 hover:text-white transition-colors"}`}
            >
              <Settings size={18} className="mr-3" />
              <span>Pengaturan</span>
            </button>
          </nav>
        </div>
        
        <div className="p-5 border-t border-gray-700">
          <div className="flex items-center">
            <Avatar className="h-9 w-9 mr-3">
              <AvatarImage src="https://randomuser.me/api/portraits/men/21.jpg" alt="Admin" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">Admin Jelajah</div>
              <div className="text-sm text-gray-400">Super Admin</div>
            </div>
          </div>
          <a href="#" className="mt-4 flex items-center py-2 px-3 rounded-md hover:bg-gray-800 text-gray-300 hover:text-white transition-colors">
            <Settings size={18} className="mr-3" />
            <span>Pengaturan</span>
          </a>
        </div>
      </aside>
      
      {/* Main Content */}
      <div className="flex-1 md:ml-64">
        {/* Top Bar */}
        <div className="bg-white border-b p-4 md:flex items-center justify-between">
          <div className="flex items-center justify-between mb-4 md:mb-0">
            <h1 className="text-xl font-semibold">Dashboard Admin</h1>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu />
            </Button>
          </div>
          <div className="relative max-w-xs">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input 
              type="search" 
              placeholder="Cari pengguna, destinasi..." 
              className="pl-8" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <main className="p-6">
          {activeTab === "dashboard" && (
            <DashboardContent />
          )}
          
          {activeTab === "users" && (
            <UsersContent handleAction={handleAction} />
          )}
          
          {activeTab === "destinations" && (
            <DestinationsContent handleAction={handleAction} />
          )}
          
          {activeTab === "transactions" && (
            <TransactionsContent handleAction={handleAction} />
          )}
          
          {activeTab === "reports" && (
            <ReportsContent />
          )}
          
          {activeTab === "settings" && (
            <SettingsContent />
          )}
        </main>
      </div>
    </div>
  );
};

// Dashboard content
const DashboardContent = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Pengguna
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-bold">12,586</div>
            <p className="text-xs text-gray-500">
              <span className="text-green-600">+12%</span> dari bulan lalu
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Pemesanan
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-bold">2,845</div>
            <p className="text-xs text-gray-500">
              <span className="text-green-600">+8%</span> dari bulan lalu
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-500">
              Pendapatan
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-bold">Rp 456,240,000</div>
            <p className="text-xs text-gray-500">
              <span className="text-green-600">+15%</span> dari bulan lalu
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-500">
              Rating Platform
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center">
              <span className="text-2xl font-bold mr-2">4.8</span>
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    fill={i < 4 ? "currentColor" : "none"}
                    stroke={i === 4 ? "currentColor" : "currentColor"}
                    strokeWidth={i === 4 ? 2 : 0}
                    className="mr-0.5"
                  />
                ))}
              </div>
            </div>
            <p className="text-xs text-gray-500">
              Berdasarkan 8,452 ulasan
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-3 flex flex-row items-center justify-between">
            <div>
              <CardTitle>Tren Pengguna & Pendapatan</CardTitle>
              <CardDescription>
                Pertumbuhan 6 bulan terakhir
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Download size={14} className="mr-1" />
                Export
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <LineChart size={80} className="text-gray-300" />
              <div className="ml-4 text-gray-500">
                <h3 className="font-medium">Data Grafik Pengguna & Pendapatan</h3>
                <p className="text-sm">Menampilkan tren pengguna dan pendapatan per bulan</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Distribusi Pengguna</CardTitle>
            <CardDescription>
              Berdasarkan tipe pengguna
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center mb-4">
              <PieChart size={80} className="text-gray-300" />
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Wisatawan</span>
                  <span className="text-sm font-medium">84%</span>
                </div>
                <Progress value={84} className="h-2 bg-gray-200" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Pemandu Lokal</span>
                  <span className="text-sm font-medium">12%</span>
                </div>
                <Progress value={12} className="h-2 bg-gray-200" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Pengelola Wisata</span>
                  <span className="text-sm font-medium">4%</span>
                </div>
                <Progress value={4} className="h-2 bg-gray-200" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Pengguna Baru Menunggu Verifikasi</CardTitle>
            <CardDescription>
              Pengguna yang perlu diverifikasi sebelum dapat menggunakan fitur platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="h-10 px-4 text-left font-medium text-gray-500">Nama</th>
                    <th className="h-10 px-4 text-left font-medium text-gray-500">Email</th>
                    <th className="h-10 px-4 text-left font-medium text-gray-500">Tipe</th>
                    <th className="h-10 px-4 text-left font-medium text-gray-500">Tanggal Daftar</th>
                    <th className="h-10 px-4 text-right font-medium text-gray-500">Tindakan</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingUsers.map((user, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-4">
                        <div className="flex items-center">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarImage src={user.image} alt={user.name} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span>{user.name}</span>
                        </div>
                      </td>
                      <td className="p-4">{user.email}</td>
                      <td className="p-4">
                        <Badge variant="outline" className={
                          user.type === 'Wisatawan' ? 'bg-jelajah-blue/10 text-jelajah-blue' :
                          user.type === 'Pemandu' ? 'bg-jelajah-green/10 text-jelajah-green' :
                          'bg-jelajah-orange/10 text-jelajah-orange'
                        }>
                          {user.type}
                        </Badge>
                      </td>
                      <td className="p-4">{user.date}</td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button size="sm" variant="outline">
                            <XCircle size={14} className="mr-1" />
                            Tolak
                          </Button>
                          <Button size="sm">
                            <CheckCircle size={14} className="mr-1" />
                            Verifikasi
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">Lihat Semua Permintaan</Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

// Users content
const UsersContent = ({ handleAction }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manajemen Pengguna</h2>
        <Button>
          <User className="mr-2 h-4 w-4" />
          Tambah Pengguna
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Daftar Pengguna</CardTitle>
          <CardDescription>
            Kelola semua pengguna pada platform Jelajah Nusantara
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Tindakan</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allUsers.map((user, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src={user.image} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span>{user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={
                      user.role === 'Wisatawan' ? 'bg-jelajah-blue/10 text-jelajah-blue' :
                      user.role === 'Pemandu' ? 'bg-jelajah-green/10 text-jelajah-green' :
                      user.role === 'Pengelola' ? 'bg-jelajah-orange/10 text-jelajah-orange' :
                      'bg-red-100 text-red-600'
                    }>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.status === 'Aktif' ? 'default' : 'outline'}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleAction('Detail', user.id, 'pengguna')}>
                        Detail
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleAction('Nonaktifkan', user.id, 'pengguna')}>
                        {user.status === 'Aktif' ? 'Nonaktifkan' : 'Aktifkan'}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-xs text-gray-500">
            Menampilkan 10 dari 120 pengguna
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">Sebelumnya</Button>
            <Button variant="outline" size="sm">Selanjutnya</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

// Destinations content
const DestinationsContent = ({ handleAction }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manajemen Destinasi</h2>
        <Button>
          <Building className="mr-2 h-4 w-4" />
          Tambah Destinasi
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Daftar Destinasi Wisata</CardTitle>
          <CardDescription>
            Kelola semua destinasi wisata pada platform Jelajah Nusantara
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama Destinasi</TableHead>
                <TableHead>Lokasi</TableHead>
                <TableHead>Pengelola</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Tindakan</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {destinations.map((destination, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-md overflow-hidden mr-2">
                        <img 
                          src={destination.image} 
                          alt={destination.name} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <span>{destination.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{destination.location}</TableCell>
                  <TableCell>{destination.manager}</TableCell>
                  <TableCell>
                    <Badge variant={destination.status === 'Aktif' ? 'default' : 'outline'}>
                      {destination.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleAction('Detail', destination.id, 'destinasi')}>
                        Detail
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleAction('Edit', destination.id, 'destinasi')}>
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleAction('Nonaktifkan', destination.id, 'destinasi')}>
                        {destination.status === 'Aktif' ? 'Nonaktifkan' : 'Aktifkan'}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-xs text-gray-500">
            Menampilkan 10 dari 85 destinasi
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">Sebelumnya</Button>
            <Button variant="outline" size="sm">Selanjutnya</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

// Transactions content
const TransactionsContent = ({ handleAction }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manajemen Transaksi</h2>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="outline">
            Filter
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Daftar Transaksi</CardTitle>
          <CardDescription>
            Kelola semua transaksi pada platform Jelajah Nusantara
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID Transaksi</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead>Pengguna</TableHead>
                <TableHead>Destinasi</TableHead>
                <TableHead>Jumlah</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Tindakan</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction, index) => (
                <TableRow key={index}>
                  <TableCell>{transaction.id}</TableCell>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>{transaction.user}</TableCell>
                  <TableCell>{transaction.destination}</TableCell>
                  <TableCell>Rp {transaction.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge className={
                      transaction.status === 'Dibayar' ? 'bg-green-100 text-green-700' :
                      transaction.status === 'Menunggu' ? 'bg-yellow-100 text-yellow-700' :
                      transaction.status === 'Dibatalkan' ? 'bg-red-100 text-red-700' :
                      'bg-gray-100 text-gray-700'
                    }>
                      {transaction.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleAction('Detail', transaction.id, 'transaksi')}>
                        Detail
                      </Button>
                      {transaction.status === 'Menunggu' && (
                        <Button variant="outline" size="sm" onClick={() => handleAction('Konfirmasi', transaction.id, 'transaksi')}>
                          Konfirmasi
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-xs text-gray-500">
            Menampilkan 10 dari 245 transaksi
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">Sebelumnya</Button>
            <Button variant="outline" size="sm">Selanjutnya</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

// Reports content
const ReportsContent = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Laporan</h2>
        <div className="flex space-x-2">
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Download Laporan
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Pendapatan Bulanan</CardTitle>
            <CardDescription>
              Pendapatan platform dalam 12 bulan terakhir
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <BarChart3 size={80} className="text-gray-300" />
              <div className="ml-4 text-gray-500">
                <h3 className="font-medium">Grafik Pendapatan</h3>
                <p className="text-sm">Data pendapatan bulanan</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">Detail Laporan Pendapatan</Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Destinasi Terpopuler</CardTitle>
            <CardDescription>
              Destinasi dengan jumlah pengunjung tertinggi
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <BarChart3 size={80} className="text-gray-300" />
              <div className="ml-4 text-gray-500">
                <h3 className="font-medium">Grafik Destinasi</h3>
                <p className="text-sm">Data jumlah kunjungan per destinasi</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">Detail Laporan Destinasi</Button>
          </CardFooter>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Laporan Tersedia</CardTitle>
            <CardDescription>
              Daftar laporan yang dapat diunduh
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {reports.map((report, index) => (
                <div key={index} className="border rounded-md p-4">
                  <div className="flex items-start">
                    <div className="bg-jelajah-blue/10 text-jelajah-blue p-2 rounded-md mr-4">
                      <FileText size={24} />
                    </div>
                    <div>
                      <h3 className="font-medium">{report.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">{report.description}</p>
                      <div className="mt-3">
                        <Button size="sm" variant="outline" className="w-full">
                          <Download size={14} className="mr-1" />
                          Unduh
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Settings content
const SettingsContent = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Pengaturan Platform</h2>
        <Button>
          Simpan Perubahan
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Menu Pengaturan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <Button variant="ghost" className="w-full justify-start">
                  <User className="mr-2 h-4 w-4" />
                  Pengaturan Profil
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Settings className="mr-2 h-4 w-4" />
                  Pengaturan Umum
                </Button>
                <Button variant="ghost" className="w-full justify-start bg-gray-100">
                  <ShieldAlert className="mr-2 h-4 w-4" />
                  Keamanan
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Notifikasi
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan Keamanan</CardTitle>
              <CardDescription>
                Kelola pengaturan keamanan platform
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="current-password">Password Saat Ini</Label>
                <Input type="password" id="current-password" placeholder="Masukkan password saat ini" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">Password Baru</Label>
                <Input type="password" id="new-password" placeholder="Masukkan password baru" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Konfirmasi Password</Label>
                <Input type="password" id="confirm-password" placeholder="Konfirmasi password baru" />
              </div>
              <Button>Ubah Password</Button>
              
              <div className="pt-4 border-t mt-6">
                <h3 className="font-medium mb-4">Keamanan Lanjutan</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Two-Factor Authentication</h4>
                      <p className="text-sm text-gray-500">Tingkatkan keamanan dengan verifikasi 2 langkah</p>
                    </div>
                    <Button variant="outline">Aktifkan</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Sesi Aktif</h4>
                      <p className="text-sm text-gray-500">Kelola sesi login yang aktif</p>
                    </div>
                    <Button variant="outline">Kelola</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Component for mobile
const Menu = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
};

// Mock data
const pendingUsers = [
  {
    name: "Rudi Hartono",
    email: "rudi.hartono@gmail.com",
    type: "Pemandu",
    date: "2023-05-21",
    image: "https://randomuser.me/api/portraits/men/42.jpg",
  },
  {
    name: "Dewi Lestari",
    email: "dewi.lestari@gmail.com",
    type: "Pengelola",
    date: "2023-05-20",
    image: "https://randomuser.me/api/portraits/women/42.jpg",
  },
  {
    name: "Anton Wijaya",
    email: "anton.wijaya@gmail.com",
    type: "Wisatawan",
    date: "2023-05-19",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Siti Rahayu",
    email: "siti.rahayu@gmail.com",
    type: "Pemandu",
    date: "2023-05-18",
    image: "https://randomuser.me/api/portraits/women/32.jpg",
  },
];

const popularDestinations = [
  {
    name: "Pulau Bali",
    location: "Bali",
    visitors: 25480,
    image: "https://images.unsplash.com/photo-1573790387438-4da905039392?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmFsaXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
  },
  {
    name: "Candi Borobudur",
    location: "Jawa Tengah",
    visitors: 18340,
    image: "https://images.unsplash.com/photo-1596402184230-21c23c44fac0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Ym9yb2J1ZHVyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
  },
  {
    name: "Raja Ampat",
    location: "Papua Barat",
    visitors: 14560,
    image: "https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmFqYSUyMGFtcGF0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
  },
  {
    name: "Labuan Bajo",
    location: "NTT",
    visitors: 12780,
    image: "https://images.unsplash.com/photo-1570789210967-2cac24afeb00?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFidWFuJTIwYmFqb3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
  },
  {
    name: "Danau Toba",
    location: "Sumatera Utara",
    visitors: 10340,
    image: "https://images.unsplash.com/photo-1595140792979-e7ae0bad7455?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFrZSUyMHRvYmF8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
  },
];

const activityLogs = [
  {
    type: "user",
    description: "Verifikasi pemandu lokal baru: Wayan Surya",
    time: "Hari ini, 10:45",
    admin: "Admin Jelajah",
  },
  {
    type: "destination",
    description: "Menambahkan destinasi baru: Pulau Komodo",
    time: "Hari ini, 09:20",
    admin: "Admin Wisata",
  },
  {
    type: "payment",
    description: "Menyelesaikan pembayaran #INV-2023-1240",
    time: "Kemarin, 15:30",
    admin: "Admin Keuangan",
  },
  {
    type: "system",
    description: "Update sistem ke versi 2.4.0",
    time: "Kemarin, 12:15",
    admin: "System Admin",
  },
];

// Additional mock data for new sections
const allUsers = [
  { 
    id: 'USR1001', 
    name: 'Ahmad Farhan', 
    email: 'ahmad@example.com', 
    role: 'Wisatawan', 
    status: 'Aktif',
    image: 'https://randomuser.me/api/portraits/men/32.jpg' 
  },
  { 
    id: 'USR1002', 
    name: 'Siti Nuraini', 
    email: 'siti@example.com', 
    role: 'Pemandu', 
    status: 'Aktif',
    image: 'https://randomuser.me/api/portraits/women/44.jpg' 
  },
  { 
    id: 'USR1003', 
    name: 'Budi Santoso', 
    email: 'budi@example.com', 
    role: 'Pengelola', 
    status: 'Aktif',
    image: 'https://randomuser.me/api/portraits/men/67.jpg' 
  },
  { 
    id: 'USR1004', 
    name: 'Dewi Anggraini', 
    email: 'dewi@example.com', 
    role: 'Wisatawan', 
    status: 'Nonaktif',
    image: 'https://randomuser.me/api/portraits/women/22.jpg' 
  },
  { 
    id: 'USR1005', 
    name: 'Rudi Setiawan', 
    email: 'rudi@example.com', 
    role: 'Pemandu', 
    status: 'Aktif',
    image: 'https://randomuser.me/api/portraits/men/45.jpg' 
  },
  { 
    id: 'USR1006', 
    name: 'Lina Marlina', 
    email: 'lina@example.com', 
    role: 'Wisatawan', 
    status: 'Aktif',
    image: 'https://randomuser.me/api/portraits/women/28.jpg' 
  },
  { 
    id: 'USR1007', 
    name: 'Dimas Prakoso', 
    email: 'dimas@example.com', 
    role: 'Pemandu', 
    status: 'Nonaktif',
    image: 'https://randomuser.me/api/portraits/men/15.jpg' 
  },
];

const destinations = [
  {
    id: 'DST1001',
    name: 'Pantai Kuta',
    location: 'Bali',
    manager: 'Wayan Sukarta',
    status: 'Aktif',
    image: 'https://images.unsplash.com/photo-1558901591-37685eb2ada9'
  },
  {
    id: 'DST1002',
    name: 'Candi Borobudur',
    location: 'Jawa Tengah',
    manager: 'Bambang Sutrisno',
    status: 'Aktif',
    image: 'https://images.unsplash.com/photo-1596402184230-21c23c44fac0'
  },
  {
    id: 'DST1003',
    name: 'Kawah Putih',
    location: 'Jawa Barat',
    manager: 'Asep Sunandar',
    status: 'Aktif',
    image: 'https://images.unsplash.com/photo-1587550722014-867a89226c06'
  },
  {
    id: 'DST1004',
    name: 'Taman Nasional Komodo',
    location: 'Nusa Tenggara Timur',
    manager: 'Maria Lakabola',
    status: 'Aktif',
    image: 'https://images.unsplash.com/photo-1516748088067-ed3a743613c1'
  },
  {
    id: 'DST1005',
    name: 'Raja Ampat',
    location: 'Papua Barat',
    manager: 'Frans Rumaseb',
    status: 'Aktif',
    image: 'https://images.unsplash.com/photo-1516690561799-46d8f74f9abf'
  },
  {
    id: 'DST1006',
    name: 'Danau Toba',
    location: 'Sumatera Utara',
    manager: 'Tigor Simatupang',
    status: 'Nonaktif',
    image: 'https://images.unsplash.com/photo-1595140792979-e7ae0bad7455'
  },
];

const transactions = [
  {
    id: 'TRX1001',
    date: '2023-05-24',
    user: 'Ahmad Farhan',
    destination: 'Pantai Kuta',
    amount: 1500000,
    status: 'Dibayar'
  },
  {
    id: 'TRX1002',
    date: '2023-05-23',
    user: 'Dewi Anggraini',
    destination: 'Raja Ampat',
    amount: 4500000,
    status: 'Dibayar'
  },
  {
    id: 'TRX1003',
    date: '2023-05-23',
    user: 'Lina Marlina',
    destination: 'Candi Borobudur',
    amount: 750000,
    status: 'Menunggu'
  },
  {
    id: 'TRX1004',
    date: '2023-05-22',
    user: 'Budi Santoso',
    destination: 'Taman Nasional Komodo',
    amount: 3250000,
    status: 'Dibatalkan'
  },
  {
    id: 'TRX1005',
    date: '2023-05-21',
    user: 'Siti Nuraini',
    destination: 'Danau Toba',
    amount: 1250000,
    status: 'Dibayar'
  },
];

const reports = [
  {
    title: 'Laporan Pendapatan Bulanan',
    description: 'Ringkasan pendapatan platform per bulan dalam 12 bulan terakhir'
  },
  {
    title: 'Laporan Pengguna Aktif',
    description: 'Data pengguna aktif dan pertumbuhan jumlah pengguna'
  },
  {
    title: 'Laporan Destinasi Populer',
    description: 'Statistik destinasi berdasarkan jumlah kunjungan'
  },
  {
    title: 'Laporan Pemandu Teratas',
    description: 'Daftar pemandu dengan rating dan jumlah tur tertinggi'
  },
  {
    title: 'Laporan Transaksi',
    description: 'Detail seluruh transaksi dalam periode tertentu'
  },
  {
    title: 'Laporan Pajak',
    description: 'Laporan pajak untuk keperluan administrasi'
  }
];

export default AdminDashboard;
