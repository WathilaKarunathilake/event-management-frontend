import { AddEvent } from "@/pages/admin/AddEvent"
import { GetEvents } from "@/pages/admin/GetEvents"
import { Login } from "@/pages/auth/Login"
import { Register } from "@/pages/auth/Register"
import { ViewRegistrations } from "@/pages/user/ViewRegistrations"
import { Route, Routes } from "react-router-dom"
import NotFoundPage from "@/pages/common/NotFoundPage"
import UnauthorizedPage from "@/pages/common/UnauthorizedPage"
import ViewEvents from "@/pages/user/ViewEvents"
import { UpdateEvent } from "@/pages/admin/UpdateEvent"
import { GetRegistrations } from "@/pages/admin/GetRegistrations"

export const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/admin/add-event" element={<AddEvent />} />
        <Route path="/admin/update-event/:id" element={<UpdateEvent />} />
        <Route path="/admin/events/registrations/:id" element={<GetRegistrations />} />
        <Route path="/admin/events" element={<GetEvents />} />
        
        <Route path="/user/events" element={<ViewEvents />} />
        <Route path="/user/registrations" element={<ViewRegistrations />} />

        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
