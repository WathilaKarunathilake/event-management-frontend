import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth/AuthProvider";
import {
  Ticket,
  ShoppingBag,
  UserRoundPlus,
  LogOut,
  CalendarPlus
} from "lucide-react"; 

export const Navbar = () => {
  const { user, logout, hasRole } = useAuth();
  const navigate = useNavigate()

  const logoutUser = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="fixed top-0 left-0 z-50 bg-white shadow-sm px-4 w-full">
      <div className="flex items-center justify-between h-16 max-w-screen-xl mx-auto">
        <Link to="/home" className="text-xl text-purple-700 font-bold">
          Event<span className="text-gray-800 font-semibold">ify</span>
        </Link>

        {user ? (
          <>
            <div className="flex items-center gap-6 ml-10">
              {hasRole("PUBLICUSER") ? (
                <>
                  <Link
                    to="/user/events"
                    className="text-black hover:text-purple-700 text-sm font-medium flex items-center gap-1"
                  >
                    <ShoppingBag className="w-4 h-4" /> Events
                  </Link>
                  <Link
                    to="/customer/ticket-history"
                    className="text-black hover:text-purple-700 text-sm font-medium flex items-center gap-1"
                  >
                    <Ticket className="w-4 h-4" /> Registrations
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/admin/events"
                    className="text-black hover:text-purple-700 text-sm font-medium flex items-center gap-1"
                  >
                    <ShoppingBag className="w-4 h-4" /> Your Events
                  </Link>
                  <Link
                    to="/admin/add-event"
                    className="text-black hover:text-purple-700 text-sm font-medium flex items-center gap-1"
                  >
                    <CalendarPlus className="w-4 h-4" /> Add Event
                  </Link>
                </>
              )}
            </div>

            <div className="flex items-center gap-4">
              <div className="text-sm text-right font-medium leading-tight">
                <div>{user.name}</div>
                <div className="text-xs text-purple-700 font-medium">
                  {user.role}
                </div>
              </div>
              <Button
                className="cursor-pointer bg-purple-700 hover:bg-purple-800 text-white flex items-center gap-1"
                onClick={logoutUser}
              >
                <LogOut className="w-4 h-4" /> Log out
              </Button>
            </div>
          </>
        ) : (
          <div className="flex items-center gap-2">
            <Link to="/login">
              <Button
                variant="outline"
                className="border-purple-700 text-purple-700 hover:bg-purple-50 cursor-pointer"
              >
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button className="bg-purple-700 hover:bg-purple-800 text-white cursor-pointer flex items-center gap-1">
                <UserRoundPlus className="w-4 h-4" /> Register
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};
