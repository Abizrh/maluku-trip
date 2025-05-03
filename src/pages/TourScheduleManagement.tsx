
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { TourScheduleList } from "@/components/tour/TourScheduleList";
import { CreateTourScheduleDialog } from "@/components/tour/CreateTourScheduleDialog";

const TourScheduleManagement = () => {
  const navigate = useNavigate();
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">Kelola Jadwal Tur</h1>
              <Button 
                className="mt-4 md:mt-0" 
                onClick={() => setCreateDialogOpen(true)}
              >
                <PlusCircle size={16} className="mr-2" />
                Buat Jadwal Baru
              </Button>
            </div>

            <Tabs defaultValue="upcoming">
              <TabsList className="mb-6">
                <TabsTrigger value="upcoming">Akan Datang</TabsTrigger>
                <TabsTrigger value="past">Selesai</TabsTrigger>
                <TabsTrigger value="all">Semua Jadwal</TabsTrigger>
              </TabsList>
              
              <TabsContent value="upcoming">
                <TourScheduleList 
                  filter="upcoming" 
                  onEdit={(id) => navigate(`/tour-schedule/edit/${id}`)}
                />
              </TabsContent>
              
              <TabsContent value="past">
                <TourScheduleList 
                  filter="past" 
                  onEdit={(id) => navigate(`/tour-schedule/edit/${id}`)}
                />
              </TabsContent>
              
              <TabsContent value="all">
                <TourScheduleList 
                  filter="all" 
                  onEdit={(id) => navigate(`/tour-schedule/edit/${id}`)}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
      
      <CreateTourScheduleDialog 
        open={createDialogOpen} 
        onOpenChange={setCreateDialogOpen} 
      />
    </div>
  );
};

export default TourScheduleManagement;
