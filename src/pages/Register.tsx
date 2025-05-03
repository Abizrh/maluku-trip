
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { UserRole } from "@/contexts/AuthContext";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<UserRole>("wisatawan");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error("Password dan konfirmasi password tidak sama");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const success = await register(name, email, password, userType);
      
      if (success) {
        // Redirect based on user role
        switch (userType) {
          case "pemandu":
            navigate("/guide-dashboard");
            break;
          case "pengelola":
            navigate("/manager-dashboard");
            break;
          case "admin":
            navigate("/admin");
            break;
          default:
            navigate("/dashboard");
        }
      }
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center bg-gray-50 py-12">
        <div className="w-full max-w-md px-4">
          <Card className="shadow-lg">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">Daftar Akun</CardTitle>
              <CardDescription className="text-center">
                Buat akun untuk mulai menjelajah Nusantara
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nama Lengkap</Label>
                  <Input
                    id="name"
                    placeholder="Nama lengkap Anda"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="nama@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Daftar Sebagai</Label>
                  <RadioGroup 
                    value={userType} 
                    onValueChange={(value) => setUserType(value as UserRole)} 
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="wisatawan" id="wisatawan" />
                      <Label htmlFor="wisatawan">Wisatawan</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="pemandu" id="pemandu" />
                      <Label htmlFor="pemandu">Pemandu Lokal</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="pengelola" id="pengelola" />
                      <Label htmlFor="pengelola">Pengelola Wisata</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="terms" 
                    checked={agreeTerms}
                    onCheckedChange={(checked) => setAgreeTerms(!!checked)}
                    required
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm text-gray-500 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Saya setuju dengan{" "}
                    <Link to="/terms" className="text-jelajah-blue hover:underline">
                      Syarat & Ketentuan
                    </Link>
                    {" "}dan{" "}
                    <Link to="/privacy" className="text-jelajah-blue hover:underline">
                      Kebijakan Privasi
                    </Link>
                  </label>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button type="submit" className="w-full" disabled={!agreeTerms || isSubmitting}>
                  {isSubmitting ? "Memproses..." : "Daftar"}
                </Button>
                <div className="text-center text-sm">
                  Sudah punya akun?{" "}
                  <Link to="/login" className="text-jelajah-blue hover:underline">
                    Masuk
                  </Link>
                </div>
              </CardFooter>
            </form>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Register;
