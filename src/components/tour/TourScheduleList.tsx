
import { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  MoreHorizontal,
  Edit,
  Trash2,
  AlertCircle
} from "lucide-react";
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

interface TourScheduleListProps {
  filter: "upcoming" | "past" | "all";
  onEdit: (id: string) => void;
}

interface TourSchedule {
  id: string;
  tourName: string;
  destination: string;
  date: string;
  time: string;
  duration: string;
  maxParticipants: number;
  bookedParticipants: number;
  price: number;
  status: "scheduled" | "ongoing" | "completed" | "cancelled";
}

export function TourScheduleList({ filter, onEdit }: TourScheduleListProps) {
  const [schedules, setSchedules] = useState<TourSchedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [scheduleToDelete, setScheduleToDelete] = useState<string | null>(null);

  useEffect(() => {
    // In a real app, fetch schedules from your API
    // This is a mockup with timeout to simulate API call
    setLoading(true);
    
    setTimeout(() => {
      // Mock data
      const mockSchedules: TourSchedule[] = [
        {
          id: "sch-001",
          tourName: "Tur Pura Tanah Lot & Sunset",
          destination: "Pura Tanah Lot, Tabanan",
          date: "25 Mei 2023",
          time: "15:00 - 19:00",
          duration: "4 jam",
          maxParticipants: 10,
          bookedParticipants: 6,
          price: 300000,
          status: "scheduled"
        },
        {
          id: "sch-002",
          tourName: "Tur Budaya Ubud",
          destination: "Ubud, Gianyar",
          date: "27 Mei 2023",
          time: "09:00 - 16:00",
          duration: "7 jam",
          maxParticipants: 8,
          bookedParticipants: 8,
          price: 350000,
          status: "scheduled"
        },
        {
          id: "sch-003",
          tourName: "Tur Pantai Kuta & Seminyak",
          destination: "Kuta, Badung",
          date: "10 Apr 2023",
          time: "10:00 - 16:00",
          duration: "6 jam",
          maxParticipants: 12,
          bookedParticipants: 12,
          price: 250000,
          status: "completed"
        },
      ];
      
      // Filter based on selected filter
      let filteredSchedules = mockSchedules;
      if (filter === "upcoming") {
        filteredSchedules = mockSchedules.filter(s => 
          s.status === "scheduled" || s.status === "ongoing"
        );
      } else if (filter === "past") {
        filteredSchedules = mockSchedules.filter(s => 
          s.status === "completed" || s.status === "cancelled"
        );
      }
      
      setSchedules(filteredSchedules);
      setLoading(false);
    }, 500);
  }, [filter]);

  const handleDelete = (id: string) => {
    setScheduleToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (!scheduleToDelete) return;
    
    // In a real app, send delete request to your API
    // Simulate successful deletion
    setSchedules(schedules.filter(s => s.id !== scheduleToDelete));
    toast.success("Jadwal tur berhasil dihapus");
    
    setDeleteDialogOpen(false);
    setScheduleToDelete(null);
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <p>Memuat jadwal tur...</p>
      </div>
    );
  }

  if (schedules.length === 0) {
    return (
      <div className="text-center py-12 border rounded-lg">
        <AlertCircle className="mx-auto h-8 w-8 text-gray-400 mb-2" />
        <h3 className="text-lg font-medium mb-1">Tidak ada jadwal tur</h3>
        <p className="text-gray-500">
          {filter === "upcoming" 
            ? "Anda belum memiliki jadwal tur yang akan datang" 
            : filter === "past" 
            ? "Anda belum memiliki jadwal tur yang selesai"
            : "Anda belum memiliki jadwal tur"}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {schedules.map((schedule) => (
        <Card key={schedule.id}>
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row">
              <div className="p-4 md:p-6 flex-1">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="flex items-center mb-2">
                      <Badge className={
                        schedule.status === "scheduled" 
                          ? "bg-blue-100 text-blue-800" 
                          : schedule.status === "ongoing" 
                          ? "bg-amber-100 text-amber-800" 
                          : schedule.status === "completed" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-red-100 text-red-800"
                      }>
                        {schedule.status === "scheduled" && "Terjadwal"}
                        {schedule.status === "ongoing" && "Berlangsung"}
                        {schedule.status === "completed" && "Selesai"}
                        {schedule.status === "cancelled" && "Dibatalkan"}
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-lg mb-1">{schedule.tourName}</h3>
                    <div className="flex items-center text-gray-500 mb-2">
                      <MapPin size={14} className="mr-1" />
                      <span className="text-sm">{schedule.destination}</span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
                      <div className="flex items-center text-gray-500">
                        <Calendar size={14} className="mr-1" />
                        <span className="text-sm">{schedule.date}</span>
                      </div>
                      <div className="flex items-center text-gray-500">
                        <Clock size={14} className="mr-1" />
                        <span className="text-sm">{schedule.time} ({schedule.duration})</span>
                      </div>
                      <div className="flex items-center text-gray-500">
                        <Users size={14} className="mr-1" />
                        <span className="text-sm">
                          {schedule.bookedParticipants}/{schedule.maxParticipants} peserta
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 md:mt-0 text-right">
                    <div className="text-sm text-gray-500">Harga</div>
                    <div className="font-bold text-lg">Rp {schedule.price.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">per orang</div>
                    <div className="mt-4 flex justify-end items-center">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="mr-2" 
                        onClick={() => onEdit(schedule.id)}
                        disabled={schedule.status === "completed" || schedule.status === "cancelled"}
                      >
                        <Edit size={14} className="mr-1" />
                        Edit
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem 
                            onClick={() => onEdit(schedule.id)}
                            disabled={schedule.status === "completed" || schedule.status === "cancelled"}
                          >
                            <Edit size={14} className="mr-2" />
                            Edit Jadwal
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-red-600" 
                            onClick={() => handleDelete(schedule.id)}
                            disabled={schedule.status === "completed" || schedule.bookedParticipants > 0}
                          >
                            <Trash2 size={14} className="mr-2" />
                            Hapus Jadwal
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Jadwal Tur</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin menghapus jadwal tur ini? Tindakan ini tidak dapat dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
