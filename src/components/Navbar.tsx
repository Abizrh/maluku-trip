import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import {
  Building,
  ChevronDown,
  Home,
  Map,
  Search,
  Settings,
  User,
  Users,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { useAuthStore } from "@/stores/authStore";

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  const getDashboardLink = () => {
    if (!user) return "/dashboard";

    switch (user.role) {
      case "pemandu":
        return "/guide-dashboard";
      case "pengelola":
        return "/manager-dashboard";
      case "admin":
        return "/admin";
      default:
        return "/dashboard";
    }
  };

  const onLogout = () => {
    logout();
    navigate("/login");
  };

  const showLink = () => {
    return !user || user.role === "wisatawan";
  };

  return (
    <div className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center space-x-2 mr-6">
          <div className="bg-jelajah-blue p-1 rounded-lg">
            <Map className="h-6 w-6 text-white" />
          </div>
          <span className="font-bold text-xl text-jelajah-dark">
            MalukuTrip
          </span>
        </Link>
        {showLink() && (
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link
                  to="/explore"
                  className={cn(
                    "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
                  )}
                >
                  Explore
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        )}
        <div className="ml-auto flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Search className="h-5 w-5" />
          </Button>
          <div className="hidden md:flex">
            <Link to="/search">
              <Button variant="ghost">
                <Search className="h-5 w-5 mr-2" />
                Cari
              </Button>
            </Link>
          </div>
          {isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-full h-8 w-8 p-0"
                >
                  <Avatar>
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to={getDashboardLink()} className="cursor-pointer">
                    {user.role === "admin" ? (
                      <Settings className="mr-2 h-4 w-4" />
                    ) : (
                      <User className="mr-2 h-4 w-4" />
                    )}
                    <span>
                      {user.role === "admin"
                        ? "Admin Panel"
                        : user.role === "pemandu"
                          ? "Dashboard Pemandu"
                          : user.role === "pengelola"
                            ? "Dashboard Pengelola"
                            : "Dashboard Saya"}
                    </span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profil Saya</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={logout}
                  className="text-red-600 cursor-pointer focus:bg-red-50 focus:text-red-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-4 w-4"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                  </svg>
                  <span>Keluar</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-2">
              <Link to="/login">
                <Button variant="ghost">Masuk</Button>
              </Link>
              <Link to="/register">
                <Button>Daftar</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="md:hidden border-t">
        <div className="flex items-center justify-around py-2">
          <Link to="/" className="flex flex-col items-center px-3 py-1 text-xs">
            <Home className="h-5 w-5 mb-1" />
            Beranda
          </Link>
          <Link
            to="/explore"
            className="flex flex-col items-center px-3 py-1 text-xs"
          >
            <Map className="h-5 w-5 mb-1" />
            Explore
          </Link>
          <Link
            to="/search"
            className="flex flex-col items-center px-3 py-1 text-xs"
          >
            <Search className="h-5 w-5 mb-1" />
            Cari
          </Link>
          {isAuthenticated && user ? (
            <Link
              to="/profile"
              className="flex flex-col items-center px-3 py-1 text-xs"
            >
              <User className="h-5 w-5 mb-1" />
              Profil
            </Link>
          ) : (
            <Link
              to="/login"
              className="flex flex-col items-center px-3 py-1 text-xs"
            >
              <User className="h-5 w-5 mb-1" />
              Masuk
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

const destinations = [
  {
    title: "Bali",
    description:
      "Pulau Dewata dengan pantai indah, budaya kaya, dan pemandangan alam yang menakjubkan.",
    href: "/explore/bali",
  },
  {
    title: "Yogyakarta",
    description:
      "Kota budaya dengan candi Borobudur, Prambanan, dan Keraton yang megah.",
    href: "/explore/yogyakarta",
  },
  {
    title: "Raja Ampat",
    description:
      "Surga bawah laut dengan keanekaragaman hayati laut terkaya di dunia.",
    href: "/explore/raja-ampat",
  },
  {
    title: "Labuan Bajo",
    description:
      "Gerbang menuju Taman Nasional Komodo dan pulau-pulau eksotis.",
    href: "/explore/labuan-bajo",
  },
  {
    title: "Lombok",
    description:
      "Pantai-pantai indah di Gili dan Gunung Rinjani yang menantang untuk didaki.",
    href: "/explore/lombok",
  },
  {
    title: "Bandung",
    description:
      "Kota dengan suhu sejuk, kuliner lezat, dan pemandangan alam yang indah.",
    href: "/explore/bandung",
  },
];
