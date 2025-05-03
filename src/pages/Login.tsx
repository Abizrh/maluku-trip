
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/dashboard";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Demo accounts for easy testing
      if (email === "demo" && password === "demo") {
        toast.info(
          "Demo accounts tersedia:\n" +
          "- ahmad@example.com / password123 (Wisatawan)\n" +
          "- siti@example.com / password123 (Pemandu)\n" +
          "- budi@example.com / password123 (Pengelola)\n" +
          "- admin@example.com / admin123 (Admin)", 
          { duration: 8000 }
        );
        setIsSubmitting(false);
        return;
      }
      
      const success = await login(email, password);
      
      if (success) {
        // Redirect to the page user was trying to access or dashboard
        navigate(from);
      }
    } catch (error) {
      console.error("Login error:", error);
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
              <CardTitle className="text-2xl font-bold text-center">Masuk</CardTitle>
              <CardDescription className="text-center">
                Masukkan email dan password untuk melanjutkan
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
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
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link to="/forgot-password" className="text-xs text-jelajah-blue hover:underline">
                      Lupa password?
                    </Link>
                  </div>
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
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Memproses..." : "Masuk"}
                </Button>
                <div className="text-center text-sm">
                  Belum punya akun?{" "}
                  <Link to="/register" className="text-jelajah-blue hover:underline">
                    Daftar sekarang
                  </Link>
                </div>
              </CardFooter>
            </form>
          </Card>
          
          {/* Demo accounts info */}
          <div className="mt-4 bg-blue-50 p-3 rounded-md border border-blue-100">
            <h3 className="font-medium text-blue-800 text-sm mb-1">Akun Demo:</h3>
            <ul className="text-xs text-blue-700 space-y-1">
              <li>- ahmad@example.com / password123 (Wisatawan)</li>
              <li>- siti@example.com / password123 (Pemandu)</li>
              <li>- budi@example.com / password123 (Pengelola)</li>
              <li>- admin@example.com / admin123 (Admin)</li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
