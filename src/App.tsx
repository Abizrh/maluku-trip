import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Explore from "./pages/Explore";
import DestinationDetail from "./pages/DestinationDetail";
import BookingDetail from "./pages/BookingDetail";
import Payment from "./pages/Payment";
import Dashboard from "./pages/Dashboard";
import GuideDashboard from "./pages/GuideDashboard";
import ManagerDashboard from "./pages/ManagerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Guides from "./pages/Guides";
import GuideProfile from "./pages/GuideProfile";
import AddDestination from "./pages/AddDestination";
import EditDestination from "./pages/EditDestination";
import InviteGuide from "./pages/InviteGuide";
import TourScheduleManagement from "./pages/TourScheduleManagement";
import EditTourSchedule from "./pages/EditTourSchedule";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/explore/:region" element={<Explore />} />
            <Route path="/destination/:id" element={<DestinationDetail />} />
            <Route
              path="/payment/:id"
              element={
                <ProtectedRoute>
                  <Payment />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/guide-dashboard"
              element={
                <ProtectedRoute allowedRoles={["pemandu"]}>
                  <GuideDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manager-dashboard"
              element={
                <ProtectedRoute allowedRoles={["pengelola"]}>
                  <ManagerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/booking/:id"
              element={
                <ProtectedRoute>
                  <BookingDetail />
                </ProtectedRoute>
              }
            />
            {/* New destination manager routes */}
            <Route
              path="/destination/add"
              element={
                <ProtectedRoute allowedRoles={["pengelola"]}>
                  <AddDestination />
                </ProtectedRoute>
              }
            />
            <Route
              path="/destination/edit/:id"
              element={
                <ProtectedRoute allowedRoles={["pengelola"]}>
                  <EditDestination />
                </ProtectedRoute>
              }
            />
            <Route
              path="/guide/invite"
              element={
                <ProtectedRoute allowedRoles={["pengelola"]}>
                  <InviteGuide />
                </ProtectedRoute>
              }
            />
            {/* New tour schedule management routes for guides */}
            <Route
              path="/tour-schedule"
              element={
                <ProtectedRoute allowedRoles={["pemandu"]}>
                  <TourScheduleManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/tour-schedule/edit/:id"
              element={
                <ProtectedRoute allowedRoles={["pemandu"]}>
                  <EditTourSchedule />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/guides" element={<Guides />} />
            <Route path="/guide/:id" element={<GuideProfile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
