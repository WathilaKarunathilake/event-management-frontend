import { AddEvent } from "@/pages/admin/AddEvent";
import { GetEvents } from "@/pages/admin/GetEvents";
import { Login } from "@/pages/auth/Login";
import { Register } from "@/pages/auth/Register";
import { ViewRegistrations } from "@/pages/user/ViewRegistrations";
import { Route, Routes } from "react-router-dom";
import NotFoundPage from "@/pages/common/NotFoundPage";
import UnauthorizedPage from "@/pages/common/UnauthorizedPage";
import ViewEvents from "@/pages/user/ViewEvents";
import { UpdateEvent } from "@/pages/admin/UpdateEvent";
import { GetRegistrations } from "@/pages/admin/GetRegistrations";
import { ProtectedRoute } from "@/context/auth/ProtectedRoute";
import ViewCalendar from "@/pages/user/ViewCalendar";
import HomePage from "@/pages/user/Home";
import { OrganizerDashboard } from "@/pages/admin/OrganizerDashboard";

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Admin Protected Routes */}
      <Route
        path="/admin/add-event"
        element={
          <ProtectedRoute roles={["ADMIN"]}>
            <AddEvent />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute roles={["ADMIN"]}>
            <OrganizerDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/events/update-event/:id"
        element={
          <ProtectedRoute roles={["ADMIN"]}>
            <UpdateEvent />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/events/registrations/:eventId"
        element={
          <ProtectedRoute roles={["ADMIN"]}>
            <GetRegistrations />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/events"
        element={
          <ProtectedRoute roles={["ADMIN"]}>
            <GetEvents />
          </ProtectedRoute>
        }
      />

      {/* User Protected Routes */}
      <Route
        path="/user/events"
        element={
          <ProtectedRoute roles={["PUBLICUSER"]}>
            <ViewEvents />
          </ProtectedRoute>
        }
      />

      <Route
        path="/user/home"
        element={
          <ProtectedRoute roles={["PUBLICUSER"]}>
            <HomePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/user/registrations"
        element={
          <ProtectedRoute roles={["PUBLICUSER"]}>
            <ViewRegistrations />
          </ProtectedRoute>
        }
      />

      <Route
        path="/user/calendar"
        element={
          <ProtectedRoute roles={["PUBLICUSER"]}>
            <ViewCalendar />
          </ProtectedRoute>
        }
      />

      {/* Error Pages */}
      <Route path="/unauthorized" element={<UnauthorizedPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
