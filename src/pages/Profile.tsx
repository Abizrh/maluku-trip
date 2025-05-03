
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { UserProfile } from "@/components/profile/UserProfile";
import { ProfileSettings } from "@/components/profile/ProfileSettings";

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("profile");
  
  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex flex-col md:flex-row items-start gap-6 mb-8">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="text-2xl">{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <p className="text-gray-600">{user.email}</p>
                <div className="mt-2 inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium capitalize">
                  {user.role === "wisatawan" ? "Wisatawan" : 
                   user.role === "pemandu" ? "Pemandu Lokal" :
                   user.role === "pengelola" ? "Pengelola Wisata" : "Admin"}
                </div>
              </div>
              <div className="mt-4 md:mt-0">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    toast.success("Perubahan profil disimpan");
                  }}
                >
                  Edit Profil
                </Button>
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="profile">Profil</TabsTrigger>
                <TabsTrigger value="settings">Pengaturan</TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile">
                <UserProfile user={user} />
              </TabsContent>
              
              <TabsContent value="settings">
                <ProfileSettings user={user} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
